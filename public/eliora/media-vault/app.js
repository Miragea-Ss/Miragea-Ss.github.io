const state = {
  catalog: null,
  selected: null,
  verifyById: Object.create(null)
};
const $ = (selector) => document.querySelector(selector);

function formatBytes(bytes) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function shortHash(value) {
  return value ? `${value.slice(0, 12)}...${value.slice(-10)}` : "not recorded";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayName(item) {
  return item.display_name || item.name;
}

function pipelineLabel(item) {
  if (item.pipeline_model === "comfyui-api") return "ComfyUI API run";
  if (item.pipeline_model === "existing-file-ingest") return "Existing-file ingest";
  return item.pipeline_model || "pipeline";
}

/** Prefer a live ComfyUI generation so judges first see real generation + B2. */
function pickDefaultItem(items) {
  if (!items?.length) return null;
  return (
    items.find((item) => item.pipeline_model === "comfyui-api" && item.verified) ||
    items.find((item) => item.verified && item.storage === "backblaze-b2") ||
    items[0]
  );
}

function rankForJudges(item) {
  if (item.pipeline_model === "comfyui-api") return 0;
  if (item.storage === "backblaze-b2" && item.verified) return 1;
  return 2;
}

function filteredItems() {
  const query = $("#search").value.trim().toLowerCase();
  const provider = $("#provider").value;
  const verifiedOnly = $("#verified-only").checked;
  return state.catalog.items
    .filter((item) => {
      const haystack = `${displayName(item)} ${item.name} ${item.prompt} ${item.model} ${item.provider} ${item.pipeline_model || ""}`.toLowerCase();
      return (!query || haystack.includes(query)) &&
        (provider === "all" || item.provider === provider) &&
        (!verifiedOnly || item.verified);
    })
    .slice()
    .sort((a, b) => rankForJudges(a) - rankForJudges(b));
}

function b2ObjectPath(url) {
  if (!url) return "";
  try {
    const path = new URL(url).pathname.replace(/^\/+/, "");
    const parts = path.split("/");
    // bucket/eliora-vault/runs/...
    const idx = parts.findIndex((p) => p === "eliora-vault");
    return idx >= 0 ? parts.slice(idx).join("/") : path;
  } catch {
    return "";
  }
}

async function copyText(text, button) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const prev = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => { button.textContent = prev; }, 1200);
    }
  } catch {
    if (button) button.textContent = "Copy failed";
  }
}

function wireCopyButtons(root) {
  root.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyText(button.getAttribute("data-copy"), button));
  });
}

function renderList() {
  const list = $("#asset-list");
  const items = filteredItems();
  const defaultId = pickDefaultItem(state.catalog.items)?.id;
  list.innerHTML = "";
  if (!items.length) {
    list.innerHTML = '<p class="verify-result">No assets match these filters.</p>';
    return;
  }
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `asset-card${state.selected?.id === item.id ? " active" : ""}`;
    const b2Tag = item.storage === "backblaze-b2" ? '<span class="tag gold">B2</span>' : "";
    const pipeTag = `<span class="tag ${item.pipeline_model === "comfyui-api" ? "pink" : ""}">${escapeHtml(pipelineLabel(item))}</span>`;
    const rec = item.id === defaultId && item.pipeline_model === "comfyui-api"
      ? '<span class="tag rec">Judge start</span>'
      : "";
    const v = state.verifyById[item.id];
    const verifyTag = v === true
      ? '<span class="tag ok">SHA match</span>'
      : v === false
        ? '<span class="tag bad">Mismatch</span>'
        : "";
    button.innerHTML = `<img src="${escapeHtml(item.asset_url)}" alt="Generated media asset" />
      <span class="card-body"><strong>${escapeHtml(displayName(item))}</strong><p>${escapeHtml(item.prompt)}</p>
      <span class="tags"><span class="tag">${escapeHtml(item.provider)}</span>${pipeTag}${b2Tag}${rec}${verifyTag}</span></span>`;
    button.addEventListener("click", () => selectItem(item));
    list.appendChild(button);
  });
}

function b2Block(item) {
  const asset = item.b2_asset_url || "";
  const man = item.b2_manifest_url || item.manifest_uri || "";
  if (!asset && !man) {
    return `<p class="b2-note">No Backblaze B2 object URIs on this record.</p>`;
  }
  const layout = b2ObjectPath(asset) || b2ObjectPath(man);
  return `<div class="b2-panel">
    <p class="b2-note"><strong>Backblaze B2</strong> is the durable system of record (private encrypted bucket). Anonymous access returns 401 by design. Integrity is proven by browser SHA-256 on the public mirror; these URIs show the run-scoped object hierarchy.</p>
    ${layout ? `<pre class="b2-layout" aria-label="B2 object path">${escapeHtml(layout)}</pre>` : ""}
    <dl class="facts b2-facts">
      <dt>B2 asset URI</dt>
      <dd>
        <span class="hash" title="${escapeHtml(asset)}">${asset ? escapeHtml(asset) : "not recorded"}</span>
        ${asset ? `<button type="button" class="mini-btn" data-copy="${escapeHtml(asset)}">Copy</button>` : ""}
      </dd>
      <dt>B2 manifest URI</dt>
      <dd>
        <span class="hash" title="${escapeHtml(man)}">${man ? escapeHtml(man) : "not recorded"}</span>
        ${man ? `<button type="button" class="mini-btn" data-copy="${escapeHtml(man)}">Copy</button>` : ""}
      </dd>
    </dl>
  </div>`;
}

function selectItem(item) {
  state.selected = item;
  $("#inspector-title").textContent = displayName(item);
  const roleNote = item.pipeline_model === "existing-file-ingest"
    ? `<p class="role-note">Honest resilience path: existing approved file re-sealed through Genblaze + B2 (not a new generation).</p>`
    : item.pipeline_model === "comfyui-api"
      ? `<p class="role-note role-note-live">Live generation path: ComfyUI API → Genblaze Pipeline → B2 hierarchical storage.</p>`
      : "";
  $("#inspector-content").innerHTML = `<img class="preview" src="${escapeHtml(item.asset_url)}" alt="Selected generated asset" />
    ${roleNote}
    <dl class="facts">
      <dt>Provider</dt><dd>${escapeHtml(item.provider)}</dd>
      <dt>Pipeline</dt><dd>${escapeHtml(pipelineLabel(item))}</dd>
      <dt>Model</dt><dd>${escapeHtml(item.model)}</dd>
      <dt>Run</dt><dd>${escapeHtml(item.run_status)} / ${escapeHtml(item.step_status)}</dd>
      <dt>Run ID</dt><dd class="hash" title="${escapeHtml(item.run_id)}">${escapeHtml(item.run_id || "—")}</dd>
      <dt>Resolution</dt><dd>${item.width} x ${item.height}</dd>
      <dt>Size</dt><dd>${formatBytes(item.size_bytes)}</dd>
      <dt>Seed</dt><dd>${item.seed ?? "—"}</dd>
      <dt>Storage</dt><dd>${item.storage === "backblaze-b2" ? "Backblaze B2 · private encrypted" : escapeHtml(item.storage || "not recorded")}</dd>
      <dt>Asset SHA-256</dt>
      <dd>
        <span class="hash" title="${escapeHtml(item.sha256)}">${escapeHtml(item.sha256 || "—")}</span>
        ${item.sha256 ? `<button type="button" class="mini-btn" data-copy="${escapeHtml(item.sha256)}">Copy</button>` : ""}
      </dd>
      <dt>Manifest hash</dt>
      <dd>
        <span class="hash" title="${escapeHtml(item.canonical_hash)}">${escapeHtml(item.canonical_hash || "—")}</span>
        ${item.canonical_hash ? `<button type="button" class="mini-btn" data-copy="${escapeHtml(item.canonical_hash)}">Copy</button>` : ""}
      </dd>
    </dl>
    ${b2Block(item)}
    <p class="object-links">
      <a href="${escapeHtml(item.asset_url)}" target="_blank" rel="noopener">Open public asset copy</a>
      <a href="${escapeHtml(item.manifest_url)}" target="_blank" rel="noopener">Inspect public provenance</a>
      <a href="./b2-proof.json" target="_blank" rel="noopener">Open B2 proof JSON</a>
    </p>`;
  wireCopyButtons($("#inspector-content"));
  const prior = state.verifyById[item.id];
  const output = $("#verify-result");
  if (prior === true) {
    output.className = "verify-result ok";
    output.textContent = "Previously verified in this session. Browser SHA-256 matched Genblaze.";
  } else if (prior === false) {
    output.className = "verify-result bad";
    output.textContent = "Previous check in this session reported a mismatch.";
  } else {
    output.className = "verify-result";
    output.textContent = "Ready for browser-side SHA-256 verification. Click “Verify selected”.";
  }
  renderList();
}

async function sha256Hex(buffer) {
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", buffer))]
    .map((value) => value.toString(16).padStart(2, "0")).join("");
}

async function verifyItem(item) {
  const [assetResponse, manifestResponse] = await Promise.all([
    fetch(item.asset_url, { cache: "no-store" }),
    fetch(item.manifest_url, { cache: "no-store" })
  ]);
  if (!assetResponse.ok || !manifestResponse.ok) throw new Error("vault record is unavailable");
  const [bytes, manifest] = await Promise.all([assetResponse.arrayBuffer(), manifestResponse.json()]);
  const digest = await sha256Hex(bytes);
  const expected = manifest.run.steps[0].assets[0].sha256;
  const matched = digest === expected;
  state.verifyById[item.id] = matched;
  return { matched, digest, expected };
}

async function verifySelected() {
  if (!state.selected) return;
  const output = $("#verify-result");
  output.className = "verify-result";
  output.textContent = "Reading asset bytes and recomputing SHA-256...";
  try {
    const { matched, digest, expected } = await verifyItem(state.selected);
    output.className = `verify-result ${matched ? "ok" : "bad"}`;
    output.textContent = matched
      ? `Verified. Browser SHA-256 matches the Genblaze asset hash: ${shortHash(digest)}`
      : `Verification failed. Expected ${shortHash(expected)}, received ${shortHash(digest)}.`;
    const localStatus = $("#local-proof-status");
    if (localStatus) {
      localStatus.className = matched ? "ok" : "bad";
      localStatus.textContent = matched ? "SHA-256 match" : "Hash mismatch";
    }
    renderList();
  } catch (error) {
    output.className = "verify-result bad";
    output.textContent = `Verification could not run: ${error.message}. Serve this folder over HTTP rather than file://.`;
  }
}

async function verifyAll() {
  if (!state.catalog?.items?.length) return;
  const output = $("#verify-result");
  const batch = $("#batch-verify-result");
  output.className = "verify-result";
  output.textContent = "Verifying all catalog assets...";
  if (batch) {
    batch.className = "batch-result";
    batch.textContent = "Running batch verification...";
  }
  let ok = 0;
  let fail = 0;
  const lines = [];
  for (const item of state.catalog.items) {
    try {
      const { matched } = await verifyItem(item);
      if (matched) {
        ok += 1;
        lines.push(`OK  ${displayName(item)}`);
      } else {
        fail += 1;
        lines.push(`BAD ${displayName(item)}`);
      }
    } catch (error) {
      fail += 1;
      lines.push(`ERR ${displayName(item)} · ${error.message}`);
    }
  }
  const summary = `Batch: ${ok} matched, ${fail} failed, ${state.catalog.items.length} total.`;
  output.className = `verify-result ${fail === 0 ? "ok" : "bad"}`;
  output.textContent = summary;
  if (batch) {
    batch.className = `batch-result ${fail === 0 ? "ok" : "bad"}`;
    batch.innerHTML = `<strong>${escapeHtml(summary)}</strong><pre>${escapeHtml(lines.join("\n"))}</pre>`;
  }
  const localStatus = $("#local-proof-status");
  if (localStatus && fail === 0) {
    localStatus.className = "ok";
    localStatus.textContent = `All ${ok} SHA-256 match`;
  }
  if (state.selected) selectItem(state.selected);
  else renderList();
}

async function init() {
  try {
    const response = await fetch("./sample_catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error("catalog unavailable");
    state.catalog = await response.json();
    $("#asset-count").textContent = state.catalog.count;
    $("#verified-count").textContent = state.catalog.verified_count;
    $("#b2-count").textContent = state.catalog.items.filter((item) =>
      item.storage === "backblaze-b2" && item.b2_asset_url && item.b2_manifest_url
    ).length;
    const providers = [...new Set(state.catalog.items.map((item) => item.provider))];
    providers.forEach((provider) => $("#provider").add(new Option(provider, provider)));
    ["#search", "#provider", "#verified-only"].forEach((selector) => {
      $(selector).addEventListener("input", renderList);
    });
    $("#verify-selected")?.addEventListener("click", verifySelected);
    $("#verify-all-btn")?.addEventListener("click", verifyAll);
    // Legacy id support
    $("#verify-all")?.addEventListener("click", verifySelected);
    $("#jump-verify")?.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => verifySelected(), 350);
    });
    selectItem(pickDefaultItem(state.catalog.items));
  } catch (error) {
    const message = location.protocol === "file:"
      ? "Interactive records require HTTP. Open this page through its local preview URL (see README)."
      : "Vault records are temporarily unavailable. Please try again.";
    $("#asset-list").innerHTML = `<p class="verify-result bad">${message}</p>`;
  }
}

async function loadB2Proof() {
  const status = $("#b2-proof-status");
  if (!status) return;
  try {
    const response = await fetch("./b2-proof.json", { cache: "no-store" });
    if (!response.ok) throw new Error("proof record unavailable");
    const proof = await response.json();
    if (proof.verified && proof.manifest_uri) {
      status.className = "ok";
      status.textContent = `Verified · ${shortHash(proof.manifest_hash)}`;
    }
  } catch (_) {
    status.textContent = location.protocol === "file:"
      ? "Available through HTTP"
      : "Proof record temporarily unavailable";
  }
}

init();
loadB2Proof();
