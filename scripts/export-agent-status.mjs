import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import { validateAgentStatus } from './agent-schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const AGENTS_DIR = join(ROOT, 'agents');
const OUT_PATH = join(ROOT, 'public/eliora/atelier/data/agents/status.json');

function loadYaml(filename) {
  const path = join(AGENTS_DIR, filename);
  return parseYaml(readFileSync(path, 'utf8')) ?? {};
}

function pickEvent(item, now = new Date()) {
  const event = { at: item.at, type: item.type, title: item.title };
  if (item.url) event.url = item.url;
  if (item.startsAt) event.startsAt = item.startsAt;
  if (item.deadline) event.deadline = item.deadline;
  if (item.ongoing) {
    event.ongoing = true;
  } else if (item.deadline && new Date(item.deadline) < now) {
    event.expired = true;
  }
  if (item.period) event.period = item.period;
  return event;
}

function isContestActive(item, now) {
  if (item.ongoing) return true;
  if (item.deadline) return new Date(item.deadline) >= now;
  if (item.startsAt) return new Date(item.startsAt) >= now;
  return false;
}

function latestIso(dates) {
  const sorted = dates.filter(Boolean).sort((a, b) => new Date(b) - new Date(a));
  return sorted[0] ?? new Date().toISOString();
}

function buildCampaignWatcher(data) {
  const contests = data.contests ?? [];
  const now = new Date();
  const active = contests.filter((item) => isContestActive(item, now));

  const events = [...contests]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 10)
    .map((item) => pickEvent(item, now));

  const count = active.length;
  return {
    status: count > 0 ? 'active' : 'idle',
    lastRun: latestIso(contests.map((item) => item.at)),
    summary: {
      en: `${count} creative contest${count === 1 ? '' : 's'} curated this week (manual feed)`,
      ja: `今週${count}件の創作コンテストを手動キュレーション`,
      zh: `本周整理 ${count} 个可跟进的创作赛事（手动キュレーション）`,
    },
    metrics: { contestsFlagged: count },
    events,
  };
}

function buildProductionRecorder(data) {
  const logs = data.logs ?? [];
  const events = [...logs]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 10)
    .map(pickEvent);

  const latest = logs[0] ?? {};
  const steps = latest.stepsRecorded ?? logs.reduce((max, item) => Math.max(max, item.stepsRecorded ?? 0), 0);
  const drafts = latest.draftArticles ?? logs.reduce((max, item) => Math.max(max, item.draftArticles ?? 0), 0);

  return {
    status: data.status ?? (events.length > 0 ? 'queued' : 'idle'),
    lastRun: latestIso(logs.map((item) => item.at)),
    summary: {
      en: 'Large X work production notes → explainer draft',
      ja: '大型X作品の制作メモ → 解説記事ドラフト',
      zh: '大型 X 作品の制作メモ → 解説記事ドラフト',
    },
    metrics: {
      stepsRecorded: steps,
      ...(drafts > 0 ? { draftArticles: drafts } : {}),
    },
    events,
  };
}

function buildWorkDistributor(data) {
  const publishes = data.publishes ?? [];
  const events = [...publishes]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 10)
    .map(pickEvent);

  const latest = publishes[0];
  const channels = latest?.channels?.length ?? 0;

  return {
    status: data.status ?? (events.length > 0 ? 'idle' : 'idle'),
    lastRun: latestIso(publishes.map((item) => item.at)),
    summary: {
      en: channels > 0 ? `Last publish: ${channels} channel${channels === 1 ? '' : 's'}` : 'Awaiting next publish run',
      ja: channels > 0 ? `前回配信：${channels}チャネル` : '次の配信を待機中',
      zh: channels > 0 ? `上次分发：${channels} 个渠道` : '等待下次分发',
    },
    metrics: { lastPublishChannels: channels },
    events,
  };
}

function buildIdeaMiner(data) {
  const ideas = data.ideas ?? [];
  const events = [...ideas]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 10)
    .map(pickEvent);

  const scores = ideas.map((item) => item.buildable).filter((value) => typeof value === 'number');
  const avg = scores.length
    ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length)
    : null;

  return {
    status: data.status ?? (ideas.length > 0 ? 'active' : 'idle'),
    lastRun: latestIso(ideas.map((item) => item.at)),
    summary: {
      en: 'Workflow leads extracted from public AI cases',
      ja: '公開AI事例から再現可能なWorkflow手がかりを抽出',
      zh: '从公开 AI 案例中提取可制作的工作流线索',
    },
    metrics: {
      ideasScored: ideas.length,
      ...(avg != null ? { buildableAvg: avg } : {}),
    },
    events,
  };
}

const payload = {
  generatedAt: new Date().toISOString(),
  agents: {
    'campaign-watcher': buildCampaignWatcher(loadYaml('contests.yaml')),
    'production-recorder': buildProductionRecorder(loadYaml('production-log.yaml')),
    'work-distributor': buildWorkDistributor(loadYaml('publish-manifest.yaml')),
    'idea-miner': buildIdeaMiner(loadYaml('ideas.yaml')),
  },
};

validateAgentStatus(payload);

writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${OUT_PATH}`);
console.log(`generatedAt: ${payload.generatedAt}`);