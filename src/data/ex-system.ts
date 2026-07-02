export const languages = ['en', 'ja', 'zh'] as const;
export type Lang = (typeof languages)[number];

export const exOrder = [
  'extreme',
  'experience',
  'execution',
  'example',
  'exchange',
  'excitation',
  'extra',
  'express',
] as const;

export type ExSlug = (typeof exOrder)[number];

type LocalCopy = {
  kicker: string;
  headline: string;
  summary: string;
  xLines: string[];
  readingTitle: string;
  reading: string;
  practiceTitle: string;
  practices: string[];
};

type ExEntry = {
  slug: ExSlug;
  title: string;
  symbol: string;
  sourceUrl?: string;
  content: Record<Lang, LocalCopy>;
};

export const videoWorks = [
  {
    title: 'Kardashev Type-II - Morning Whisper Blues Vol.01',
    url: 'https://x.com/Miragea_S/status/2000229459916681467?s=20',
    note: {
      en: 'Large video work hosted on X to avoid GitHub Pages file-size limits.',
      ja: 'GitHub Pagesの容量制限を避けるため、動画本体はX投稿で連携します。',
      zh: '为了避开 GitHub Pages 的文件大小限制，视频本体通过 X 帖子联动。',
    },
  },
  {
    title: 'If this lullaby becomes your nightly crave',
    url: 'https://x.com/Miragea_S/status/1966830399239450670?s=20',
    note: {
      en: 'Night voice, music, image, and desire connected as an external X work.',
      ja: '夜の声、音楽、映像、欲望をX外部作品として連携します。',
      zh: '夜的声音、音乐、影像与欲望，作为 X 外部作品联动。',
    },
  },
  {
    title: 'Fleeting dreams, hearts adrift',
    url: 'https://x.com/Miragea_S/status/1775247380688097359?s=20',
    note: {
      en: 'Original Miragea video and song work linked through X as the source host.',
      ja: '映像も歌もMiragea自作の作品として、X投稿を本体ホストにして連携します。',
      zh: '影像和歌曲都是 Miragea 自作，通过 X 原帖作为作品本体联动。',
    },
  },
];

export const exPages: Record<ExSlug, ExEntry> = {
  extreme: {
    slug: 'extreme',
    title: 'Extreme',
    symbol: 'E/X-01',
    content: {
      en: {
        kicker: 'Intensity as a sensor',
        headline: 'Extreme is the place where sensitivity refuses to become vague.',
        summary: 'Strong perception becomes a warning system for AI, civilization, media, power, and speed.',
        xLines: [
          'One step away from becoming slaves to AI?',
          "AI's pace meets another level of speed.",
          'Intense anger and heartbreak.',
        ],
        readingTitle: 'Miragea Reading',
        reading: 'Extreme is not noise. It is the nervous system refusing to flatten a signal that feels dangerous, beautiful, or urgent.',
        practiceTitle: 'Service Use',
        practices: ['Map risks before building.', 'Keep strong intuition visible.', 'Turn sharp perception into product judgment.'],
      },
      ja: {
        kicker: '強度をセンサーにする',
        headline: 'Extreme は、感受性を曖昧に終わらせない場所です。',
        summary: '強い知覚を、AI、文明、メディア、権力、速度への警告システムに変えます。',
        xLines: ['AIの奴隷になる一歩手前？', 'AIのペースに合う別次元の速度。', '強い怒りと胸の痛み。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Extremeはノイズではありません。危険、美しさ、緊急性を感じる信号を、神経が薄めることを拒む場所です。',
        practiceTitle: 'サービスへの使い方',
        practices: ['作る前にリスクを地図化する。', '強い直感を見える状態に保つ。', '鋭い知覚を商品判断へ変える。'],
      },
      zh: {
        kicker: '把强度变成传感器',
        headline: 'Extreme 是感受性不再被稀释的地方。',
        summary: '把强烈知觉转成对 AI、文明、媒体、权力和速度的预警系统。',
        xLines: ['离成为 AI 的奴隶只差一步？', '与 AI 节奏匹配的另一层速度。', '强烈愤怒与心痛。'],
        readingTitle: 'Miragea 解读',
        reading: 'Extreme 不是噪音，而是神经系统拒绝压平危险、美丽或紧急的信号。',
        practiceTitle: '服务用途',
        practices: ['在建设前绘制风险地图。', '让强烈直觉保持可见。', '把锋利知觉转成产品判断。'],
      },
    },
  },
  experience: {
    slug: 'experience',
    title: 'Experience',
    symbol: 'E/X-02',
    sourceUrl: videoWorks[1].url,
    content: {
      en: {
        kicker: 'Body, night, memory',
        headline: 'Experience is where sound, body, image, and memory become material.',
        summary: 'The X works around lullaby, nocturne, deep night, and daydreaming become the emotional core of Miragea.',
        xLines: ['Daydreaming', 'Dithered art & Muse & Flute Nocturne', 'If this lullaby...', 'Fleeting dreams, hearts adrift.'],
        readingTitle: 'Miragea Reading',
        reading: 'Experience is atmosphere before explanation: a room of night, voice, breath, image, and remembered touch.',
        practiceTitle: 'Service Use',
        practices: ['Use sensory notes as AI prompt briefs.', 'Turn music-video works into archive entries.', 'Let visitors feel before they understand.'],
      },
      ja: {
        kicker: '身体、夜、記憶',
        headline: 'Experience は、音、身体、映像、記憶が素材になる場所です。',
        summary: 'ララバイ、ノクターン、深夜、DaydreamingのX作品群を、Mirageaの感情的な核にします。',
        xLines: ['Daydreaming', 'Dithered art & Muse & Flute Nocturne', 'If this lullaby...', 'Fleeting dreams, hearts adrift.'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Experienceは説明より前にある空気です。夜、声、息、映像、記憶された触感でできた部屋です。',
        practiceTitle: 'サービスへの使い方',
        practices: ['感覚メモをAIプロンプトのブリーフにする。', '音楽動画作品をアーカイブ記事へ変える。', '理解より先に感じられる導線を作る。'],
      },
      zh: {
        kicker: '身体、夜晚、记忆',
        headline: 'Experience 是声音、身体、影像与记忆变成素材的地方。',
        summary: '关于摇篮曲、夜曲、深夜和 Daydreaming 的 X 作品，成为 Miragea 的情感核心。',
        xLines: ['Daydreaming', 'Dithered art & Muse & Flute Nocturne', 'If this lullaby...', 'Fleeting dreams, hearts adrift.'],
        readingTitle: 'Miragea 解读',
        reading: 'Experience 是解释之前的氛围：由夜、声音、呼吸、影像和被记住的触感构成的房间。',
        practiceTitle: '服务用途',
        practices: ['把感官笔记转成 AI 提示词简报。', '把音乐视频作品转成档案条目。', '让访客先感受，再理解。'],
      },
    },
  },
  execution: {
    slug: 'execution',
    title: 'Execution',
    symbol: 'E/X-03',
    content: {
      en: {
        kicker: 'Signal into workflow',
        headline: 'Execution turns sensitivity into an operating system.',
        summary: 'Speed, AI, 3DCG, tools, and local-first workflows move Miragea from dream to service.',
        xLines: ['Sci-fi dreams into reality.', 'Elon Speed.', 'I studied 3DCG.'],
        readingTitle: 'Miragea Reading',
        reading: 'Execution is where the dream stops floating and becomes a file, a canvas, a route, and a service.',
        practiceTitle: 'Service Use',
        practices: ['Build local-first tools.', 'Use Infinite Canvas as command surface.', 'Move archive fragments toward paid services.'],
      },
      ja: {
        kicker: '信号をワークフローへ',
        headline: 'Execution は、感受性を運用システムへ変えます。',
        summary: '速度、AI、3DCG、道具、ローカルファーストの流れで、Mirageaを夢からサービスへ進めます。',
        xLines: ['SFの夢を現実へ。', 'Elon Speed。', '3DCGを学んでいました。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Executionは夢を浮かせたままにしない場所です。ファイル、キャンバス、導線、サービスへ変えます。',
        practiceTitle: 'サービスへの使い方',
        practices: ['ローカルファーストの道具を作る。', 'Infinite Canvasを操作面にする。', 'アーカイブ断片を有料サービスへ進める。'],
      },
      zh: {
        kicker: '信号转成流程',
        headline: 'Execution 把感受性变成操作系统。',
        summary: '速度、AI、3DCG、工具与本地优先流程，让 Miragea 从梦走向服务。',
        xLines: ['科幻梦想变成现实。', 'Elon Speed。', '我学习过 3DCG。'],
        readingTitle: 'Miragea 解读',
        reading: 'Execution 是梦不再漂浮的地方，它变成文件、画布、路径和服务。',
        practiceTitle: '服务用途',
        practices: ['建立本地优先工具。', '把 Infinite Canvas 作为操作面。', '把档案碎片推向付费服务。'],
      },
    },
  },
  example: {
    slug: 'example',
    title: 'Example',
    symbol: 'E/X-04',
    content: {
      en: {
        kicker: 'Visible proof',
        headline: 'Example makes invisible patterns teachable.',
        summary: 'Tool questions, 3DCG learning traces, and design fragments become proofs of method.',
        xLines: ['What software or tool did you use?', 'Everything in Maya?', 'Transparent house designs.'],
        readingTitle: 'Miragea Reading',
        reading: 'Example is the bridge between admiration and practice: what tool, what workflow, what next attempt?',
        practiceTitle: 'Service Use',
        practices: ['Create case studies.', 'Show prompts and process notes.', 'Let each product teach how Miragea thinks.'],
      },
      ja: {
        kicker: '見える証拠',
        headline: 'Example は、見えないパターンを教えられる形にします。',
        summary: 'ツール質問、3DCG学習の痕跡、デザイン断片を、方法の証拠にします。',
        xLines: ['使用ソフトまたはtoolは？', '全てMayaですか？', '透明な家のデザイン。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Exampleは憧れと実践の橋です。どの道具で、どの手順で、次にどう作るか。',
        practiceTitle: 'サービスへの使い方',
        practices: ['ケーススタディを作る。', 'プロンプトと制作メモを見せる。', '商品そのものにMirageaの思考を入れる。'],
      },
      zh: {
        kicker: '可见证据',
        headline: 'Example 让看不见的模式变得可教学。',
        summary: '工具提问、3DCG 学习痕迹与设计片段，成为方法的证明。',
        xLines: ['使用的软件或工具？', '全部用 Maya 吗？', '透明房子设计。'],
        readingTitle: 'Miragea 解读',
        reading: 'Example 是欣赏与实践之间的桥：什么工具、什么流程、下一步如何尝试。',
        practiceTitle: '服务用途',
        practices: ['制作案例研究。', '展示提示词和过程笔记。', '让每个产品都教人理解 Miragea 的思考。'],
      },
    },
  },
  exchange: {
    slug: 'exchange',
    title: 'Exchange',
    symbol: 'E/X-05',
    content: {
      en: {
        kicker: 'Real people, real time',
        headline: 'Exchange is where perception becomes relationship.',
        summary: 'Gratitude, laughter, local culture, and real-time platforms become community routes.',
        xLines: ['Real people, real time, real news.', 'Fortune comes to those who smile.', 'Open your hearts.'],
        readingTitle: 'Miragea Reading',
        reading: 'Exchange is a feedback loop of people, culture, affection, disagreement, and presence.',
        practiceTitle: 'Service Use',
        practices: ['Build community routes.', 'Invite dialogue without losing voice.', 'Use workshops as product intelligence.'],
      },
      ja: {
        kicker: '本物の人、本物の時間',
        headline: 'Exchange は、知覚が関係性へ変わる場所です。',
        summary: '感謝、笑い、地域文化、リアルタイムの場を、コミュニティ導線へ変えます。',
        xLines: ['Real people, real time, real news.', '笑う門には福来たる。', '心を開けるように。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Exchangeは、人、文化、愛情、反論、その場にいることが循環するフィードバックループです。',
        practiceTitle: 'サービスへの使い方',
        practices: ['コミュニティ導線を作る。', '声を失わず対話を招く。', 'ワークショップを商品理解に使う。'],
      },
      zh: {
        kicker: '真实的人，真实时间',
        headline: 'Exchange 是知觉变成关系的地方。',
        summary: '感谢、笑声、地方文化与实时平台，变成社区路径。',
        xLines: ['Real people, real time, real news.', '笑口常开，好运自来。', '打开心。'],
        readingTitle: 'Miragea 解读',
        reading: 'Exchange 是人、文化、爱、分歧与现场感循环的反馈回路。',
        practiceTitle: '服务用途',
        practices: ['建立社区入口。', '邀请对话但保留声音。', '把工作坊变成产品洞察。'],
      },
    },
  },
  excitation: {
    slug: 'excitation',
    title: 'Excitation',
    symbol: 'E/X-06',
    content: {
      en: {
        kicker: 'Signal becomes charge',
        headline: 'Excitation is the charged moment before creation moves.',
        summary: 'Stars, Mars, applause, champagne, and multi-planet anticipation become creative voltage.',
        xLines: ['Stargazer’s Birthday.', 'Pretty excited and hopeful.', 'Multi-planetary life.'],
        readingTitle: 'Miragea Reading',
        reading: 'Excitation is the spark before the system: not yet a plan, but already a direction.',
        practiceTitle: 'Service Use',
        practices: ['Capture sparks in Infinite Canvas.', 'Tag useful excitement.', 'Turn celebration into launch energy.'],
      },
      ja: {
        kicker: '信号が帯電する',
        headline: 'Excitation は、創作が動く直前の帯電した瞬間です。',
        summary: '星、火星、拍手、シャンパン、多惑星への期待を、創作の電圧へ変えます。',
        xLines: ['Stargazer’s Birthday.', 'かなり興奮して希望を感じる。', '多惑星生命。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Excitationはシステムになる前の火花です。まだ計画ではないけれど、すでに方向を持っています。',
        practiceTitle: 'サービスへの使い方',
        practices: ['火花をInfinite Canvasへ置く。', '有用な興奮にタグを付ける。', '祝福をローンチのエネルギーへ変える。'],
      },
      zh: {
        kicker: '信号带电',
        headline: 'Excitation 是创作移动前的带电瞬间。',
        summary: '星、火星、掌声、香槟和多行星期待，成为创作电压。',
        xLines: ['Stargazer’s Birthday.', '非常兴奋，也有希望。', '多行星生命。'],
        readingTitle: 'Miragea 解读',
        reading: 'Excitation 是系统形成前的火花，还不是计划，但已经有方向。',
        practiceTitle: '服务用途',
        practices: ['把火花放进 Infinite Canvas。', '标记有用的兴奋。', '把庆祝变成发布能量。'],
      },
    },
  },
  extra: {
    slug: 'extra',
    title: 'Extra',
    symbol: 'E/X-07',
    content: {
      en: {
        kicker: 'Surplus becomes style',
        headline: 'Extra is what ordinary systems cannot classify.',
        summary: 'Sabi, silence, aura, transparent houses, humor, and mystery become Miragea’s signature.',
        xLines: ['Sabi describes beauty over time.', 'The cosmos is silent.', 'Chinese style.'],
        readingTitle: 'Miragea Reading',
        reading: 'Extra is the shimmer left after logic finishes: patina, silence, aura, mystery, and nuance.',
        practiceTitle: 'Service Use',
        practices: ['Keep visual surplus.', 'Use mystery as navigation.', 'Let multilingual nuance remain visible.'],
      },
      ja: {
        kicker: '余剰がスタイルになる',
        headline: 'Extra は、普通のシステムが分類しきれないものです。',
        summary: 'さび、沈黙、オーラ、透明な家、ユーモア、謎をMirageaの署名にします。',
        xLines: ['さびは時間の美。', '宇宙は沈黙している。', 'Chinese style。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Extraは論理が終わった後に残る光沢です。古び、沈黙、オーラ、謎、翻訳しきれないニュアンスです。',
        practiceTitle: 'サービスへの使い方',
        practices: ['視覚の余剰を残す。', 'ミステリーを導線にする。', '三言語のニュアンスを見せる。'],
      },
      zh: {
        kicker: '余量成为风格',
        headline: 'Extra 是普通系统无法分类的东西。',
        summary: '侘寂、沉默、气场、透明房子、幽默与神秘，成为 Miragea 的签名。',
        xLines: ['侘寂是时间之美。', '宇宙是沉默的。', 'Chinese style。'],
        readingTitle: 'Miragea 解读',
        reading: 'Extra 是逻辑结束后留下的微光：包浆、沉默、气场、神秘和无法完全翻译的细节。',
        practiceTitle: '服务用途',
        practices: ['保留视觉余量。', '用神秘感作为导航。', '让三语言细节保持可见。'],
      },
    },
  },
  express: {
    slug: 'express',
    title: 'Express',
    symbol: 'E/X-08',
    sourceUrl: videoWorks[0].url,
    content: {
      en: {
        kicker: 'Give the signal a face',
        headline: 'Express is the visible form: words, image, sound, and interface.',
        summary: 'Logo, music-video posts, visual words, and Stable Diffusion gratitude become public expression.',
        xLines: ['MIRAGEA', 'Morning Whisper Blues', 'Many stories to tell.'],
        readingTitle: 'Miragea Reading',
        reading: 'Express makes a door. It does not explain every secret; it gives the signal a body visitors can enter.',
        practiceTitle: 'Service Use',
        practices: ['Use the new Miragea logo as the archive mark.', 'Link large X videos instead of uploading them.', 'Turn words and images into Eliora pages.'],
      },
      ja: {
        kicker: '信号に顔を与える',
        headline: 'Express は、言葉、映像、音、UIとして現れる形です。',
        summary: 'ロゴ、音楽動画投稿、視覚と言葉、Stable Diffusionへの感謝を、公開表現にします。',
        xLines: ['MIRAGEA', 'Morning Whisper Blues', '語るべき物語はたくさんある。'],
        readingTitle: 'Mirageaとしての読み',
        reading: 'Expressは扉を作る場所です。すべての秘密を説明せず、訪問者が入れる身体を信号に与えます。',
        practiceTitle: 'サービスへの使い方',
        practices: ['新しいMirageaロゴをアーカイブの印にする。', '大きいX動画はアップロードせずリンク連携する。', '言葉と画像をElioraページへ変える。'],
      },
      zh: {
        kicker: '给信号一张脸',
        headline: 'Express 是文字、影像、声音与界面的可见形式。',
        summary: 'Logo、音乐视频帖、视觉文字和对 Stable Diffusion 的感谢，成为公开表达。',
        xLines: ['MIRAGEA', 'Morning Whisper Blues', '有很多故事可以讲。'],
        readingTitle: 'Miragea 解读',
        reading: 'Express 创造一扇门。它不解释所有秘密，而是给信号一个访客可以进入的身体。',
        practiceTitle: '服务用途',
        practices: ['把新的 Miragea logo 作为档案标记。', '大视频通过 X 链接联动，不上传到 GitHub。', '把文字和图像转成 Eliora 页面。'],
      },
    },
  },
};

export function getExCards(lang: Lang) {
  return exOrder.map((slug) => {
    const entry = exPages[slug];
    const content = entry.content[lang];
    return {
      slug,
      title: entry.title,
      symbol: entry.symbol,
      summary: content.summary,
    };
  });
}
