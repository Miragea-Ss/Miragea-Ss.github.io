(function () {
  'use strict';

  var ATELIER_BASE = '/eliora/atelier';
  var STATUS_URL = ATELIER_BASE + '/data/agents/status.json';

  var AGENT_META = {
    'campaign-watcher': {
      icon: '◎',
      names: { en: 'Campaign Watcher', ja: 'キャンペーン監視Agent', zh: '竞赛监控Agent' },
      desc: {
        en: 'Monitors X prize contests, investor posts, and AI competitions. Weekly curated list.',
        ja: 'Xの賞金企画・投資家投稿・AIコンテストを監視。週次キュレーション一覧。',
        zh: '监控X赏金企划、投资帖与AI竞赛。每周整理可参赛列表。'
      }
    },
    'production-recorder': {
      icon: '▣',
      names: { en: 'Production Recorder', ja: '制作工程記録Agent', zh: '制作工程记录Agent' },
      desc: {
        en: 'Auto-documents video editing pipeline → articles for Substack / site.',
        ja: '動画編集工程を自動記録 → note/Zenn/サイト記事へ変換。',
        zh: '自动记录视频剪辑流程 → 转为小红书/文章/解说视频脚本。'
      }
    },
    'work-distributor': {
      icon: '◇',
      names: { en: 'Work Distributor', ja: '作品展開Agent', zh: '作品分发Agent' },
      desc: {
        en: 'One work → X, Bilibili, JP revenue sites, official site variants.',
        ja: '1作品を X・Bilibili・日本収益サイト・公式向けに変換配信。',
        zh: '一件作品 → X、B站、小红书、视频号、官网多版本分发。'
      }
    },
    'idea-miner': {
      icon: '◈',
      names: { en: 'Idea Miner', ja: 'Idea Miner Agent', zh: 'Idea Miner Agent' },
      desc: {
        en: 'Scores CN/JP/EN AI cases: buildable app? investor appeal? Bilibili viral?',
        ja: '中日英AI事例をスコアリング：PoC適合・再現性・量産可能性。',
        zh: '阅读中日英AI案例：能做成app吗？B站能火吗？值得跟吗？'
      }
    }
  };

  var ORDER = ['campaign-watcher', 'production-recorder', 'work-distributor', 'idea-miner'];

  function getLocale() {
    return document.documentElement.lang || 'en';
  }

  function atelierLocalePath(locale, sub) {
    return ATELIER_BASE + '/' + locale + '/' + (sub || '');
  }

  function formatRelative(iso) {
    var d = new Date(iso);
    var h = Math.floor((Date.now() - d) / 3600000);
    if (h < 1) return '<1h';
    if (h < 48) return h + 'h';
    return Math.floor(h / 24) + 'd';
  }

  function statusLabel(status, locale) {
    var map = {
      en: { active: 'active', queued: 'queued', idle: 'idle', error: 'error' },
      ja: { active: '稼働中', queued: '待機', idle: '待機中', error: 'エラー' },
      zh: { active: '运行中', queued: '排队', idle: '空闲', error: '错误' }
    };
    return (map[locale] || map.en)[status] || status;
  }

  function renderAgentCards(data, container, locale, compact) {
    if (!container || !data) return;
    var hub = atelierLocalePath(locale, 'atelier/');

    container.innerHTML = ORDER.map(function (key) {
      var meta = AGENT_META[key];
      var agent = data.agents[key];
      if (!agent) return '';
      var name = meta.names[locale] || meta.names.en;
      var summary = agent.summary[locale] || agent.summary.en;
      var st = agent.status;
      var pill = statusLabel(st, locale);

      if (compact) {
        return '<div class="agent-card-sm"><h4>' + meta.icon + ' ' + name + '</h4><p>' + summary + '</p><div class="status">● ' + pill + '</div></div>';
      }

      var metrics = agent.metrics || {};
      var metricStr = '';
      if (key === 'campaign-watcher' && metrics.contestsFlagged != null) {
        metricStr = metrics.contestsFlagged + (locale === 'zh' ? ' 项' : locale === 'ja' ? ' 件' : ' flagged');
      } else if (key === 'idea-miner' && metrics.buildableAvg != null) {
        metricStr = (locale === 'zh' ? '可开发 ' : locale === 'ja' ? '開発適合 ' : 'buildable ') + metrics.buildableAvg + '%';
      } else if (metrics.stepsRecorded != null) {
        metricStr = metrics.stepsRecorded + (locale === 'ja' ? ' ステップ' : locale === 'zh' ? ' 步骤' : ' steps');
      } else if (metrics.lastPublishChannels != null) {
        metricStr = metrics.lastPublishChannels + (locale === 'zh' ? ' 渠道' : locale === 'ja' ? ' チャネル' : ' channels');
      }

      var detail = locale === 'zh' ? '查看详情 →' : locale === 'ja' ? '詳細を見る →' : 'View details →';
      return '<article class="agent-card-lg" id="agent-' + key + '"><div class="agent-icon">' + meta.icon + '</div><div class="agent-id">' + key + '</div><h3>' + name + '</h3><p class="summary">' + summary + '</p><div class="agent-meta"><span class="status-pill ' + st + '">' + pill + '</span><span>' + metricStr + '</span></div><a class="agent-link" href="' + hub + '#' + key + '">' + detail + '</a></article>';
    }).join('');
  }

  function renderAgentDetails(data, container, locale) {
    if (!container || !data) return;
    container.innerHTML = ORDER.map(function (key) {
      var meta = AGENT_META[key];
      var agent = data.agents[key];
      if (!agent) return '';
      var name = meta.names[locale] || meta.names.en;
      var desc = meta.desc[locale] || meta.desc.en;
      var st = agent.status;
      var pill = statusLabel(st, locale);
      var latest = locale === 'zh' ? '最近状态：' : locale === 'ja' ? '最新ステータス：' : 'Latest: ';
      var events = (agent.events || []).slice(0, 5).map(function (ev) {
        var t = new Date(ev.at).toISOString().slice(0, 16).replace('T', ' ');
        var external = ev.url && /^https?:\/\//.test(ev.url);
        var title = ev.url
          ? '<a href="' + ev.url + '"' + (external ? ' target="_blank" rel="noopener"' : '') + ' style="color:var(--champagne)">' + ev.title + '</a>'
          : ev.title;
        return '<li><span class="ev-time">' + t + ' · ' + ev.type + '</span>' + title + '</li>';
      }).join('');
      return '<article class="agent-detail" id="' + key + '"><div class="detail-head"><span class="status-pill ' + st + '">' + pill + '</span><h2>' + meta.icon + ' ' + name + '</h2><div class="agent-id" style="margin-top:6px">' + key + '</div></div><div class="detail-body"><p>' + desc + '</p><p><strong style="color:var(--moonlight)">' + latest + '</strong>' + (agent.summary[locale] || agent.summary.en) + '</p><ul class="event-list">' + events + '</ul></div></article>';
    }).join('');
  }

  function updateSyncLabels(data, locale) {
    var rel = formatRelative(data.generatedAt);
    var labels = {
      en: { synced: 'Synced ', ago: ' ago' },
      ja: { synced: '同期 ', ago: '前' },
      zh: { synced: '同步于 ', ago: '前' }
    };
    var L = labels[locale] || labels.en;
    document.querySelectorAll('[data-sync-label]').forEach(function (el) {
      el.textContent = L.synced + rel + L.ago;
    });
    document.querySelectorAll('[data-sync-time]').forEach(function (el) {
      el.textContent = data.generatedAt.replace('T', ' ').replace('Z', ' UTC');
    });
    var stale = (Date.now() - new Date(data.generatedAt)) > 48 * 3600000;
    document.querySelectorAll('.stale-banner').forEach(function (el) {
      el.classList.toggle('visible', stale);
    });
  }

  function initAgents() {
    var locale = getLocale();
    fetch(STATUS_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        renderAgentCards(data, document.getElementById('agent-grid-home'), locale, false);
        renderAgentCards(data, document.getElementById('agent-grid-mini'), locale, true);
        renderAgentDetails(data, document.getElementById('agent-detail-grid'), locale);
        updateSyncLabels(data, locale);
      })
      .catch(function () {
        document.querySelectorAll('.stale-banner').forEach(function (el) {
          el.classList.add('visible');
        });
      });
  }

  document.addEventListener('DOMContentLoaded', initAgents);
})();