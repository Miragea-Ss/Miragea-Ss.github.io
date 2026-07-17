const state = { catalog: null, selected: null };
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

function filteredItems() {
  const query = $("#search").value.trim().toLowerCase();
  const provider = $("#provider").value;
  const verifiedOnly = $("#verified-only").checked;
  return state.catalog.items.filter((item) => {
    const haystack = `${displayName(item)} ${item.name} ${item.prompt} ${item.model} ${item.provider}`.toLowerCase();
    return (!query || haystack.includes(query)) &&
      (provider === "all" || item.provider === provider) &&
      (!verifiedOnly || item.verified);
  });
}

function renderList() {
  const list = $("#asset-list");
  const items = filteredItems();
  list.innerHTML = "";
  if (!items.length) {
    list.innerHTML = '<p class="verify-result">No assets match these filters.</p>';
    return;
  }
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `asset-card${state.selected?.id === item.id ? " active" : ""}`;
    button.innerHTML = `<img src="${escapeHtml(item.asset_url)}" alt="Generated media asset" />
      <span class="card-body"><strong>${escapeHtml(displayName(item))}</strong><p>${escapeHtml(item.prompt)}</p>
      <span class="tags"><span class="tag">${escapeHtml(item.provider)}</span><span class="tag">${item.verified ? "verified" : "unverified"}</span></span></span>`;
    button.addEventListener("click", () => selectItem(item));
    list.appendChild(button);
  });
}

function selectItem(item) {
  state.selected = item;
  $("#inspector-title").textContent = displayName(item);
  const b2Asset = item.b2_asset_url || item.asset_url;
  const b2Manifest = item.b2_manifest_url || item.manifest_url;
  $("#inspector-content").innerHTML = `<img class="preview" src="${escapeHtml(item.asset_url)}" alt="Selected generated asset" />
    <dl class="facts">
      <dt>Provider</dt><dd>${escapeHtml(item.provider)}</dd>
      <dt>Model</dt><dd>${escapeHtml(item.model)}</dd>
      <dt>Run</dt><dd>${escapeHtml(item.run_status)} / ${escapeHtml(item.step_status)}</dd>
      <dt>Run ID</dt><dd class="hash" title="${escapeHtml(item.run_id)}">${escapeHtml(shortHash(item.run_id))}</dd>
      <dt>Resolution</dt><dd>${item.width} x ${item.height}</dd>
      <dt>Size</dt><dd>${formatBytes(item.size_bytes)}</dd>
      <dt>Seed</dt><dd>${item.seed}</dd>
      <dt>Asset SHA-256</dt><dd class="hash" title="${escapeHtml(item.sha256)}">${escapeHtml(shortHash(item.sha256))}</dd>
      <dt>Manifest hash</dt><dd class="hash" title="${escapeHtml(item.canonical_hash)}">${escapeHtml(shortHash(item.canonical_hash))}</dd>
    </dl>
    <p class="object-links"><a href="${escapeHtml(b2Asset)}" target="_blank" rel="noopener">B2 asset object</a><a href="${escapeHtml(b2Manifest)}" target="_blank" rel="noopener">B2 manifest object</a></p>`;
  $("#verify-result").className = "verify-result";
  $("#verify-result").textContent = "Ready for browser-side SHA-256 verification.";
  renderList();
}

async function verifySelected() {
  if (!state.selected) return;
  const output = $("#verify-result");
  output.className = "verify-result";
  output.textContent = "Reading asset bytes and recomputing SHA-256...";
  try {
    const [assetResponse, manifestResponse] = await Promise.all([
      fetch(state.selected.asset_url, { cache: "no-store" }),
      fetch(state.selected.manifest_url, { cache: "no-store" })
    ]);
    if (!assetResponse.ok || !manifestResponse.ok) throw new Error("sample files are unavailable");
    const [bytes, manifest] = await Promise.all([assetResponse.arrayBuffer(), manifestResponse.json()]);
    const digest = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))]
      .map((value) => value.toString(16).padStart(2, "0")).join("");
    const expected = manifest.run.steps[0].assets[0].sha256;
    const matched = digest === expected;
    output.className = `verify-result ${matched ? "ok" : "bad"}`;
    output.textContent = matched
      ? `Verified. Browser SHA-256 matches the Genblaze asset hash: ${shortHash(digest)}`
      : `Verification failed. Expected ${shortHash(expected)}, received ${shortHash(digest)}.`;
  } catch (error) {
    output.className = "verify-result bad";
    output.textContent = `Verification could not run: ${error.message}. Serve this folder over HTTP rather than file://.`;
  }
}

async function init() {
  try {
    const response = await fetch("./sample_catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error("catalog unavailable");
    state.catalog = await response.json();
    $("#asset-count").textContent = state.catalog.count;
    $("#verified-count").textContent = state.catalog.verified_count;
    const providers = [...new Set(state.catalog.items.map((item) => item.provider))];
    providers.forEach((provider) => $("#provider").add(new Option(provider, provider)));
    ["#search", "#provider", "#verified-only"].forEach((selector) => {
      $(selector).addEventListener("input", renderList);
    });
    $("#verify-all").addEventListener("click", verifySelected);
    selectItem(state.catalog.items[0]);
  } catch (error) {
    $("#asset-list").innerHTML = `<p class="verify-result bad">${error.message}</p>`;
  }
}

async function loadB2Proof() {
  const status = $("#b2-proof-status");
  if (!status) return;
  try {
    const response = await fetch("./b2-proof.json", { cache: "no-store" });
    if (!response.ok) return;
    const proof = await response.json();
    if (proof.verified && proof.manifest_uri) {
      status.className = "ok";
      status.textContent = `Verified · ${shortHash(proof.manifest_hash)}`;
    }
  } catch (_) {
    // A missing proof file is an honest pending state, not a page failure.
  }
}

init();
loadB2Proof();
