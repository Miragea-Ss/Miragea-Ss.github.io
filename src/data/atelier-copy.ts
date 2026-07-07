export type AtelierLang = 'en' | 'ja' | 'zh';

export const atelierLanguages: AtelierLang[] = ['en', 'ja', 'zh'];

export interface AtelierCta {
  href: string;
  label: string;
  variant: 'primary' | 'agent' | 'secondary';
}

export interface AtelierCard {
  href?: string;
  title: string;
  description: string;
  external?: boolean;
}

export interface AtelierSeriesCard {
  ep: string;
  title: string;
  description: string;
}

export interface AtelierStudioTile {
  icon: string;
  title: string;
}

export interface AtelierNavItem {
  href: string;
  label: string;
}

export interface AtelierHomeCopy {
  meta: { title: string; description: string };
  brandSubtitle: string;
  nav: AtelierNavItem[];
  regionTags: Record<AtelierLang, string>;
  hero: {
    badge: string;
    title: { line1: string; emphasis: string; line2?: string };
    lead: string;
    ctas: AtelierCta[];
  };
  panel: {
    header: string;
    syncing: string;
    viewAll: string;
  };
  atelierSection: {
    staleBanner: string;
    label: string;
    title: string;
    description: string;
    cta: string;
  };
  works?: {
    id: string;
    label: string;
    title: string;
    cards: AtelierCard[];
  };
  bts?: {
    id: string;
    label: string;
    title: string;
    cards: AtelierCard[];
    channels: string[];
  };
  studio: {
    id: string;
    label: string;
    title: string;
    lead: string;
    tiles: AtelierStudioTile[];
    channels?: string[];
    cta?: AtelierCta;
  };
  series?: {
    id: string;
    label: string;
    title: string;
    cards: AtelierSeriesCard[];
    channels: string[];
  };
  worksRail?: {
    id: string;
    label: string;
    title: string;
    cards: AtelierSeriesCard[];
  };
  learn?: {
    id: string;
    label: string;
    title: string;
    cards: AtelierSeriesCard[];
  };
  enterprise?: {
    id: string;
    label: string;
    title: string;
    lead: string;
    cta: AtelierCta;
  };
  footer: {
    columns: { title: string; body: string; link?: { href: string; label: string } }[];
    links: { href: string; label: string }[];
  };
}

export interface AtelierHubCopy {
  meta: { title: string; description: string };
  brandSubtitle: string;
  nav: AtelierNavItem[];
  staleBanner: string;
  hero: {
    badge: string;
    title: string;
    lead: string;
    syncing: string;
  };
  workflow: {
    label: string;
    nodes: string[];
  };
  ctas: AtelierCta[];
  footer: { title: string; body: string }[];
}

const regionTags: Record<AtelierLang, string> = {
  en: 'Filmmaker',
  ja: 'Architect',
  zh: 'Creator',
};

export const atelierHomeCopy: Record<AtelierLang, AtelierHomeCopy> = {
  en: {
    meta: {
      title: 'Miragea · Eliora — AI Filmmaker & Systems Atelier',
      description:
        'Who Will Govern the Future? AI filmmaker, cosmic worldbuilder, and systems that run work through AI.',
    },
    brandSubtitle: 'Cosmic AI Atelier',
    nav: [
      { href: '#works', label: 'Works' },
      { href: '#studio', label: 'Studio' },
      { href: '/eliora/atelier/en/atelier/', label: 'Atelier Ops' },
      { href: '#series', label: 'Series' },
      { href: '#profile', label: 'Profile' },
    ],
    regionTags,
    hero: {
      badge: 'Atelier Operations · Live',
      title: { line1: 'Who Will', emphasis: 'Govern', line2: 'the Future?' },
      lead:
        'AI filmmaker, future civilization worldbuilder, and architect of systems that advance the next job — not commands waiting in a queue.',
      ctas: [
        {
          href: 'https://x.com/Miragea_S/status/2000229459916681467',
          label: 'Watch on X — Kardashev Type-II',
          variant: 'primary',
        },
        { href: '/eliora/atelier/en/atelier/', label: 'Open 4 Agents →', variant: 'agent' },
      ],
    },
    panel: {
      header: 'Atelier Ops — Preview',
      syncing: 'Syncing…',
      viewAll: 'View all 4 agents →',
    },
    atelierSection: {
      staleBanner: 'Agent status may be stale — check Atelier hub.',
      label: 'Core Differentiator',
      title: 'Atelier Operations — 4 Agents',
      description:
        "I don't only make works — I build systems that let AI run production, distribution, and opportunity scouting for me.",
      cta: 'Full Agent Hub — workflows, events, metrics',
    },
    works: {
      id: 'works',
      label: 'Works Mothership',
      title: 'Perception · Series · Archive',
      cards: [
        {
          href: 'https://x.com/Miragea_S/status/2000229459916681467',
          title: 'Kardashev Type-II',
          description: 'Morning Whisper Blues — civilization, music, and image as one work.',
          external: true,
        },
        {
          href: 'https://x.com/Miragea_S/status/1966830399239450670',
          title: 'If this lullaby becomes your nightly crave',
          description: 'Night voice, music, image — an external X work hosted at source.',
          external: true,
        },
        {
          href: '/en/ex/extreme/',
          title: 'EX System',
          description: 'Eight perception routes built from public X fragments.',
        },
      ],
    },
    studio: {
      id: 'studio',
      label: 'Eliora AI Studio',
      title: 'Seven Production Lines',
      lead: 'Reproducibility, control, batch production, API — not single images.',
      tiles: [
        { icon: '◈', title: 'Product Imaging' },
        { icon: '◇', title: 'Ad Workflows' },
        { icon: '◎', title: 'Video Pipeline' },
        { icon: '◉', title: 'Character Consistency' },
        { icon: '⬡', title: 'ComfyUI API' },
        { icon: '▣', title: 'Enterprise' },
        { icon: '◆', title: 'Workflow Market' },
      ],
    },
    series: {
      id: 'series',
      label: 'Continuing Series',
      title: 'Who Will Govern the Future?',
      cards: [
        { ep: 'EP.01 · 3:12', title: 'The Question', description: 'Who decides when machines decide?' },
        { ep: 'EP.02 · 2:58', title: 'The Archive', description: 'Memory, power, and what we keep.' },
        { ep: 'EP.03 · 3:05', title: 'The Pipeline', description: 'From prompt to policy — who governs?' },
        { ep: 'EP.04 · soon', title: 'The Agent', description: 'When AI advances the next job alone.' },
      ],
      channels: ['X', 'YouTube', 'Patreon', 'Gumroad', 'Substack', 'Product Hunt'],
    },
    footer: {
      columns: [
        { title: 'Miragea AI Lab', body: 'Perception archive · EX system · IPFS mirror' },
        { title: 'Eliora AI Studio', body: 'ComfyUI · local AI · enterprise workflows' },
        {
          title: 'Atelier Operations',
          body: '',
          link: { href: '/eliora/atelier/en/atelier/', label: '4 Agents →' },
        },
      ],
      links: [
        { href: '/eliora/index.html', label: 'Layer 2 · Service Map' },
        { href: '/en/', label: 'Miragea Archive' },
        { href: 'https://x.com/Miragea_S/', label: 'X' },
        { href: '/eliora/atelier/en/atelier/', label: 'Agent hub' },
      ],
    },
  },

  ja: {
    meta: {
      title: 'Miragea · Eliora — AIインフラ・ワークフローアーキテクト',
      description:
        '再現性・制御・量産・API化。ComfyUIで企業の制作業務を自動化するワークフローアーキテクト。',
    },
    brandSubtitle: 'Cosmic AI Atelier',
    nav: [
      { href: '#works', label: '作品' },
      { href: '#studio', label: 'スタジオ' },
      { href: '/eliora/atelier/ja/atelier/', label: 'アトリエ運用' },
      { href: '#learn', label: '講座' },
      { href: '#profile', label: 'プロフィール' },
    ],
    regionTags,
    hero: {
      badge: 'アトリエ運用 · 稼働中',
      title: { line1: '再現性ある', emphasis: 'AI制作インフラ', line2: 'を設計する' },
      lead:
        '画像一枚ではなく、企業の制作業務を自動化する仕組みを売る。ComfyUI・ローカルAI・API化で、制御・量産・再現性を実装するワークフローアーキテクト。',
      ctas: [
        { href: '#studio', label: 'ワークフローを見る', variant: 'primary' },
        { href: '/eliora/atelier/ja/atelier/', label: '4つのAgent →', variant: 'agent' },
        { href: '#enterprise', label: '企業相談', variant: 'secondary' },
      ],
    },
    panel: {
      header: 'アトリエ運用 — プレビュー',
      syncing: '同期中…',
      viewAll: '4つのAgentを見る →',
    },
    atelierSection: {
      staleBanner: 'Agentステータスが古い可能性があります。',
      label: '差別化の中核',
      title: 'アトリエ運用 — 4 Agent',
      description:
        '作品を作るだけでなく、AIに制作・配信・案件監視・事例分析を回させる実行システムを構築する。技術仕様はここで公開する。',
      cta: 'Agentハブ — イベント・メトリクス・ワークフロー',
    },
    works: {
      id: 'works',
      label: '作品の母艦',
      title: '世界観 · 信頼 · 継続シリーズ',
      cards: [
        {
          title: 'ComfyUI 業務自動化ケース',
          description: 'ノード操作ではなく、再現性とAPI化の実装記録。',
        },
        {
          title: '大容量VRAMワークフロー',
          description: 'ローカルAI・重い制作向けパイプライン設計。',
        },
        {
          title: 'EX System',
          description: '知覚アーカイブ — 8つのルート。',
        },
      ],
    },
    studio: {
      id: 'studio',
      label: 'Eliora AI Studio',
      title: '7つのプロダクションライン',
      lead: 'BOOTH・Zenn・note で販売。企業向けは PoC → 業務ワークフロー構築。',
      tiles: [
        { icon: '◈', title: '商品画像生成' },
        { icon: '◇', title: '広告WF' },
        { icon: '◎', title: '動画パイプライン' },
        { icon: '◉', title: 'キャラ一貫性' },
        { icon: '⬡', title: 'ComfyUI API' },
        { icon: '▣', title: '企業導入・研修' },
        { icon: '◆', title: 'Workflow販売' },
      ],
      channels: ['note', 'BOOTH', 'Zenn', 'Qiita', 'YouTube', 'FANBOX'],
    },
    learn: {
      id: 'learn',
      label: '講座 · ワークフロー',
      title: '学習プロダクト',
      cards: [
        {
          ep: '講座 · 準備中',
          title: 'ComfyUI 業務設計入門',
          description: '再現性のあるノード設計とAPI化の考え方。',
        },
        {
          ep: 'BOOTH',
          title: 'プロ向けワークフロー',
          description: '制御・量産・バッチ処理テンプレート。',
        },
        {
          ep: '企業向け',
          title: 'PoC ワークショップ',
          description: '制作部門の自動化フロー構築。',
        },
      ],
    },
    enterprise: {
      id: 'enterprise',
      label: 'Enterprise',
      title: '企業向け PoC · 業務自動化',
      lead: '売るのは画像ではなく、企業の制作業務を自動化する仕組み。事例資料はメールゲート後に共有（T2）。',
      cta: {
        href: 'mailto:contact@miragea.lab?subject=Enterprise%20PoC',
        label: '企業相談をする',
        variant: 'primary',
      },
    },
    footer: {
      columns: [
        { title: 'Miragea AI Lab', body: '知覚アーカイブ · EX · IPFS' },
        { title: 'Eliora AI Studio', body: 'ComfyUI · ローカルAI · 企業ワークフロー' },
        {
          title: 'アトリエ運用',
          body: '',
          link: { href: '/eliora/atelier/ja/atelier/', label: '4 Agent →' },
        },
      ],
      links: [
        { href: '/eliora/index.html', label: 'Layer 2 · サービスマップ' },
        { href: '/ja/', label: 'Miragea Archive' },
        { href: '/eliora/atelier/ja/atelier/', label: 'Agentハブ' },
      ],
    },
  },

  zh: {
    meta: {
      title: 'Miragea · Eliora — 用AI建造可控的未来文明',
      description: '人气创作者路线：3D+AI可控工作流、制作解说、世界观与制作过程同步展示。',
    },
    brandSubtitle: 'Cosmic AI Atelier',
    nav: [
      { href: '#works', label: '作品' },
      { href: '#studio', label: '工作室' },
      { href: '/eliora/atelier/zh/atelier/', label: '工坊运作' },
      { href: '#bts', label: '制作解说' },
      { href: '#profile', label: '关于' },
    ],
    regionTags,
    hero: {
      badge: '工坊运作 · 运行中',
      title: { line1: '用 AI 建造', emphasis: '可控的未来文明' },
      lead:
        '一边构建作品世界，一边把制作过程完整展示出来。把日本/英语圈的 AI 趋势翻译成中文创作者能用的工作流与解说。',
      ctas: [
        { href: '#bts', label: '观看制作解说', variant: 'primary' },
        { href: '/eliora/atelier/zh/atelier/', label: '打开 4 个 Agent →', variant: 'agent' },
        { href: '#studio', label: '获取工作流', variant: 'secondary' },
      ],
    },
    panel: {
      header: '工坊运作 — 预览',
      syncing: '同步中…',
      viewAll: '查看全部 4 个 Agent →',
    },
    atelierSection: {
      staleBanner: 'Agent 状态可能已过期。',
      label: '核心差异化',
      title: '工坊运作 — 4 个 Agent',
      description:
        '不只是做作品的人，而是让 AI 替你推进下一项工作的人。制作记录、竞赛监控、多平台分发、案例挖掘 — 全部可视化。',
      cta: '工坊运作中心 — 事件、指标、工作流',
    },
    bts: {
      id: 'bts',
      label: '制作解说 · 幕后',
      title: '人气创作者的「型」',
      cards: [
        {
          title: '3D + AI 可控工作流',
          description: 'B站/小红书向：完整制作过程 + 节点讲解。',
        },
        {
          title: 'AI 技术新闻速览',
          description: '海外趋势 → 中文解说视频 / 文章 / X 帖转换。',
        },
        {
          title: '幻想角色 · 宇宙文明',
          description: '世界观看板 + 角色一致性生成演示。',
        },
      ],
      channels: ['Bilibili', '小红书', '视频号', 'Gumroad', 'RunningHub', 'LiblibAI'],
    },
    worksRail: {
      id: 'works',
      label: '作品母舰',
      title: '人气 · 信任 · 世界观 · 系列',
      cards: [
        {
          ep: '系列 · 更新中',
          title: '未来文明编年',
          description: 'AI × 宇宙 × 幻想角色 × 音乐影像。',
        },
        {
          ep: '幕后',
          title: '制作工程全记录',
          description: '由制作工程记录 Agent 自动整理。',
        },
        {
          ep: '工作流',
          title: '大容量 VRAM 工作流',
          description: 'ComfyUI 本地重制作 — 可控、可复现。',
        },
      ],
    },
    studio: {
      id: 'studio',
      label: 'Eliora AI 工作室',
      title: '七大生产线',
      lead: '卖的不是单张图，是可控、可量产、可 API 化的工作流。',
      tiles: [
        { icon: '◈', title: '商品图生成' },
        { icon: '◇', title: '广告工作流' },
        { icon: '◎', title: '视频管线' },
        { icon: '◉', title: '角色一致性' },
        { icon: '⬡', title: 'ComfyUI API' },
        { icon: '▣', title: '企业导入' },
        { icon: '◆', title: '工作流商店' },
      ],
      cta: { href: '#studio', label: '获取 3D+AI 工作流', variant: 'primary' },
    },
    footer: {
      columns: [
        { title: 'Miragea AI Lab', body: '感知档案 · EX 系统' },
        { title: 'Eliora AI Studio', body: 'ComfyUI · 本地 AI · 工作流' },
        {
          title: '工坊运作',
          body: '',
          link: { href: '/eliora/atelier/zh/atelier/', label: '4 个 Agent →' },
        },
      ],
      links: [
        { href: '/eliora/index.html', label: 'Layer 2 · 服务地图' },
        { href: '/zh/', label: 'Miragea Archive' },
        { href: '/eliora/atelier/zh/atelier/', label: 'Agent 中心' },
      ],
    },
  },
};

export const atelierHubCopy: Record<AtelierLang, AtelierHubCopy> = {
  en: {
    meta: {
      title: 'Atelier Operations — 4 Agents | Miragea · Eliora',
      description:
        'Campaign Watcher, Production Recorder, Work Distributor, Idea Miner — systems that run work through AI.',
    },
    brandSubtitle: 'Atelier Operations',
    nav: [
      { href: '/eliora/atelier/en/', label: 'Home' },
      { href: '/eliora/atelier/en/#works', label: 'Works' },
      { href: '/eliora/atelier/en/#studio', label: 'Studio' },
      { href: '/eliora/atelier/en/atelier/', label: 'Atelier Ops' },
    ],
    staleBanner: 'Agent status may be stale.',
    hero: {
      badge: 'Systems · Not commands',
      title: 'Atelier Operations',
      lead:
        'Four agents that advance production, distribution, contests, and ideas — so AI runs the next job, not just waits for orders.',
      syncing: 'Syncing…',
    },
    workflow: {
      label: 'COMFYUI WORKFLOW PREVIEW (read-only)',
      nodes: ['Load Checkpoint', 'IP-Adapter', 'KSampler', 'VAE Decode', 'API Export'],
    },
    ctas: [
      { href: '/eliora/atelier/en/', label: '← Back to Home', variant: 'secondary' },
      { href: '/eliora/index.html', label: 'Layer 2 · Service Map', variant: 'primary' },
    ],
    footer: [
      { title: 'Data source', body: 'data/agents/status.json · weekly GH Action' },
      { title: 'Feed', body: 'Manual curation — real URLs only' },
      { title: 'Author', body: '@Miragea_S' },
    ],
  },

  ja: {
    meta: {
      title: 'アトリエ運用 — 4 Agent | Miragea · Eliora',
      description:
        'キャンペーン監視・制作工程記録・作品展開・Idea Miner — AIに仕事を回させる実行システム。',
    },
    brandSubtitle: 'アトリエ運用',
    nav: [
      { href: '/eliora/atelier/ja/', label: 'ホーム' },
      { href: '/eliora/atelier/ja/#works', label: '作品' },
      { href: '/eliora/atelier/ja/#studio', label: 'スタジオ' },
      { href: '/eliora/atelier/ja/atelier/', label: 'アトリエ運用' },
    ],
    staleBanner: 'Agentステータスが古い可能性があります。',
    hero: {
      badge: '実行システム',
      title: 'アトリエ運用',
      lead:
        '4つのAgentが、制作記録・配信・コンテスト監視・事例スコアリングを実行。命令待ちのAIではなく、次の仕事を進めるAIインフラ。',
      syncing: '同期中…',
    },
    workflow: {
      label: 'COMFYUI ワークフロー · 技術プレビュー',
      nodes: ['Checkpoint', 'ControlNet', 'バッチ処理', 'API出力', '企業PoC'],
    },
    ctas: [
      { href: '/eliora/atelier/ja/', label: '← ホームへ', variant: 'secondary' },
      { href: '/eliora/index.html', label: 'Layer 2 · サービス', variant: 'primary' },
    ],
    footer: [
      { title: 'データ', body: 'data/agents/status.json' },
      { title: '販売', body: 'BOOTH · Zenn · 企業PoC' },
      { title: '指標', body: '再現性 · 制御 · 量産 · API化' },
    ],
  },

  zh: {
    meta: {
      title: '工坊运作 — 4 Agent | Miragea · Eliora',
      description: '竞赛监控、制作工程记录、作品分发、Idea Miner — 让AI替你推进下一项工作。',
    },
    brandSubtitle: '工坊运作',
    nav: [
      { href: '/eliora/atelier/zh/', label: '首页' },
      { href: '/eliora/atelier/zh/#bts', label: '制作解说' },
      { href: '/eliora/atelier/zh/#studio', label: '工作室' },
      { href: '/eliora/atelier/zh/atelier/', label: '工坊运作' },
    ],
    staleBanner: 'Agent 状态可能已过期。',
    hero: {
      badge: '执行系统',
      title: '工坊运作中心',
      lead:
        '四个 Agent 负责：制作工程自动记录、竞赛与赏金监控、多平台作品分发、中日英 AI 案例挖掘评分。',
      syncing: '同步中…',
    },
    workflow: {
      label: '3D + AI 可控工作流 · 预览',
      nodes: ['3D资产', 'ComfyUI', '角色一致', 'B站导出', '小红书'],
    },
    ctas: [
      { href: '/eliora/atelier/zh/', label: '← 返回首页', variant: 'secondary' },
      { href: '/eliora/index.html', label: 'Layer 2 · 服务地图', variant: 'primary' },
    ],
    footer: [
      { title: '数据源', body: 'data/agents/status.json' },
      { title: '渠道', body: 'B站 · 小红书 · 视频号 · Gumroad' },
      { title: '社区', body: 'RunningHub · LiblibAI' },
    ],
  },
};

export function atelierBase(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/`;
}

export function atelierHubPath(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/atelier/`;
}