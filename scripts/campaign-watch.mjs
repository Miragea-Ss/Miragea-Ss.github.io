#!/usr/bin/env node
/**
 * Campaign Watcher — real auto-monitor (not manual-only)
 *
 * 1) Fetch open/upcoming creative/AI contests from public sources (Devpost API)
 * 2) Score: prize + Miragea fit (AI/creative/video) + open window
 * 3) Merge into agents/contests.yaml (dedupe by URL)
 * 4) Write agents/campaign-action-queue.json (join recommendations)
 * 5) Run: npm run agents:export after this (or npm run agents:sync)
 *
 * Participation: we auto-discover & rank. Actual registration/submit/prize KYC
 * still needs human account — queue lists exact next steps.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTESTS_PATH = join(ROOT, 'agents', 'contests.yaml');
const QUEUE_PATH = join(ROOT, 'agents', 'campaign-action-queue.json');
const UA = 'MirageaCampaignWatcher/1.0 (+https://miragea-ss.github.io; contest research)';

const FIT_THEME = /machine learning|ai\b|art|design|creative|video|music|media|generative|open ended|ar\/vr|gaming|web/i;
const FIT_TITLE = /ai|art|generat|video|music|film|image|creative|comfy|diffusion|runway|midjourney|visual|anime|design|hack/i;
const PRIZE_RE = /data-currency-value[^>]*>\s*([\d,]+)/i;

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function parsePrizeUsd(prizeHtml) {
  if (!prizeHtml) return 0;
  const m = String(prizeHtml).match(PRIZE_RE);
  if (!m) return 0;
  const n = Number(String(m[1]).replace(/,/g, ''));
  if (!Number.isFinite(n)) return 0;
  // crude: if looks like INR large and no $ — still use number as relative score
  return n;
}

function scoreHackathon(h) {
  let score = 0;
  const prize = parsePrizeUsd(h.prize_amount);
  if (prize >= 10000) score += 40;
  else if (prize >= 1000) score += 28;
  else if (prize >= 200) score += 16;
  else if (prize > 0) score += 8;

  const themes = (h.themes || []).map((t) => t.name || '').join(' ');
  if (FIT_THEME.test(themes)) score += 22;
  if (FIT_TITLE.test(h.title || '')) score += 18;
  if (/machine learning\/ai/i.test(themes)) score += 12;
  if (h.open_state === 'open') score += 10;
  if (h.featured) score += 5;
  if (h.invite_only) score -= 25;
  // prefer online/global
  const locRaw = h.displayed_location;
  const loc =
    typeof locRaw === 'string'
      ? locRaw
      : locRaw && typeof locRaw === 'object'
        ? JSON.stringify(locRaw)
        : '';
  if (/online|virtual|worldwide|global/i.test(loc)) score += 8;
  // Eliora policy: avoid China real-name heavy ecosystems as primary targets
  const org = `${h.organization_name || ''} ${h.title || ''}`;
  if (/qwen|alibaba|alibaba cloud|baidu|tencent|bytedance|volcengine|即梦|火山/i.test(org)) {
    score -= 35;
  }
  return { score, prize };
}

function periodFrom(h) {
  const dates = h.submission_period_dates || h.time_left_to_submission || 'Open';
  const s = String(dates).slice(0, 70);
  return { en: s, ja: s, zh: s };
}

function toContestEntry(h, scored) {
  const now = new Date().toISOString();
  return {
    at: now,
    type: 'devpost-auto',
    title: h.title,
    url: h.url,
    ongoing: h.open_state === 'open',
    period: periodFrom(h),
    sourceNote: `Devpost auto · prize~${scored.prize} · score ${scored.score} · ${h.organization_name || ''}`,
    auto: true,
    joinScore: scored.score,
    prizeHint: scored.prize,
    submitUrl: h.start_a_submission_url || h.url,
  };
}

async function fetchDevpost() {
  // pages of open + upcoming
  const urls = [
    'https://devpost.com/api/hackathons?order_by=recently-added&status[]=open&status[]=upcoming&per_page=50',
    'https://devpost.com/api/hackathons?order_by=prize_amount&status[]=open&status[]=upcoming&per_page=30',
  ];
  const map = new Map();
  for (const url of urls) {
    try {
      const data = await fetchJson(url);
      for (const h of data.hackathons || []) {
        if (!h?.url || !h?.title) continue;
        map.set(h.url, h);
      }
    } catch (err) {
      console.warn('Devpost fetch warn:', err.message);
    }
  }
  return [...map.values()];
}

function loadContests() {
  try {
    return parseYaml(readFileSync(CONTESTS_PATH, 'utf8')) ?? { contests: [] };
  } catch {
    return { contests: [] };
  }
}

function mergeContests(existing, discovered) {
  const byUrl = new Map();
  for (const c of existing.contests || []) {
    if (c.url) byUrl.set(c.url, c);
  }
  let added = 0;
  let updated = 0;
  for (const d of discovered) {
    const prev = byUrl.get(d.url);
    if (!prev) {
      byUrl.set(d.url, d);
      added += 1;
    } else if (prev.auto || prev.type === 'devpost-auto') {
      byUrl.set(d.url, { ...prev, ...d, at: prev.at || d.at });
      updated += 1;
    }
    // never overwrite manual verified entries without auto flag
  }
  // keep miragea signal + manual + auto, drop expired autos without ongoing
  const list = [...byUrl.values()].sort((a, b) => (b.joinScore || 0) - (a.joinScore || 0) || new Date(b.at) - new Date(a.at));
  return { contests: list.slice(0, 40), added, updated };
}

function buildQueue(contests) {
  // High bar: strong fit + real prize — we aim to join & win, not spam every open hackathon
  const recommended = contests
    .filter(
      (c) =>
        (c.joinScore || 0) >= 70 &&
        (c.prizeHint || 0) >= 1000 &&
        c.ongoing !== false &&
        !/qwen|alibaba|baidu|tencent|volcengine|即梦|火山/i.test(`${c.title} ${c.sourceNote || ''}`),
    )
    .slice(0, 8)
    .map((c) => ({
      title: c.title,
      url: c.url,
      submitUrl: c.submitUrl || c.url,
      joinScore: c.joinScore,
      prizeHint: c.prizeHint || 0,
      reason:
        c.prizeHint >= 1000
          ? 'Meaningful prize + AI/creative fit'
          : 'Strong AI/creative fit — prize secondary',
      nextSteps: [
        '1. Open submitUrl and confirm eligibility (region, team size, theme).',
        '2. Register with Miragea/Eliora identity (Devpost account).',
        '3. Draft entry with Infinite Canvas / ComfyUI / GeekSpell brand edge.',
        '4. Export stills + 30–90s demo from Eliora pipelines.',
        '5. Submit before deadline; track in publish-manifest after ship.',
      ],
      status: 'recommended', // human must approve registration
    }));

  return {
    generatedAt: new Date().toISOString(),
    policy: {
      en: 'Auto-watch finds & ranks. Human approves join. Prize KYC is manual.',
      ja: '自動監視で発見・採点。参加登録は人間が承認。賞金の本人確認は手動。',
      zh: '自动监视发现与打分；报名需人工确认；奖金实名领取为手动。',
    },
    recommended,
    note: 'Do not auto-submit to third-party contests without user approval (accounts + prize rules).',
  };
}

async function main() {
  console.log('Campaign watch: fetching Devpost…');
  const raw = await fetchDevpost();
  console.log(`Fetched ${raw.length} unique hackathons`);

  const scored = raw
    .map((h) => {
      const s = scoreHackathon(h);
      return { h, ...s };
    })
    .filter((x) => x.score >= 25)
    .sort((a, b) => b.score - a.score);

  const discovered = scored.map((x) => toContestEntry(x.h, x));
  const existing = loadContests();
  // Ensure permanent Miragea signal remains
  const hasMiragea = (existing.contests || []).some((c) => c.type === 'miragea');
  if (!hasMiragea) {
    existing.contests = existing.contests || [];
    existing.contests.push({
      at: new Date().toISOString(),
      type: 'miragea',
      title: 'Follow Miragea_S on X for live contest signals',
      url: 'https://x.com/Miragea_S/',
      ongoing: true,
      period: {
        en: 'Ongoing · live signals',
        ja: '継続 · ライブ信号',
        zh: '持续 · 实时信号',
      },
    });
  }

  const { contests, added, updated } = mergeContests(existing, discovered);
  const doc = {
    contests,
    meta: {
      lastWatch: new Date().toISOString(),
      source: 'devpost-auto+manual',
      added,
      updated,
      scanned: raw.length,
      kept: contests.length,
    },
  };

  writeFileSync(
    CONTESTS_PATH,
    `# campaign-watcher — auto + manual verified\n# lastWatch: ${doc.meta.lastWatch}\n${stringifyYaml(
      { contests: doc.contests, meta: doc.meta },
      { lineWidth: 0 },
    )}`,
    'utf8',
  );

  const queue = buildQueue(contests);
  writeFileSync(QUEUE_PATH, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${CONTESTS_PATH} (+${added} new, ~${updated} refreshed, total ${contests.length})`);
  console.log(`Wrote ${QUEUE_PATH} (${queue.recommended.length} join recommendations)`);
  if (queue.recommended[0]) {
    console.log('Top join candidate:', queue.recommended[0].title, 'score', queue.recommended[0].joinScore);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
