// Services copy for the Atelier services page (ja / en / zh).
// Source: the reviewed customer-facing listing text; edit here to change the page.
export interface ServiceBlock { t: 'p' | 'ul' | 'ol' | 'cl'; l: string[] }
export interface ServiceSection { h: string; items: ServiceBlock[] }
export interface ServiceOffer {
  id: string;
  eyebrow: string;
  short: string;
  summary: string;
  title: string;
  catch: string;
  price: number;
  days: number;
  lead: string[];
  sections: ServiceSection[];
  reqLead: string[];
  reqSections: ServiceSection[];
  quote: string;
  options: { text: string; price: number }[];
  faq: { q: string; a: string }[];
}

export type ServicesLang = 'ja' | 'en' | 'zh';

export const servicesOffers: Record<ServicesLang, ServiceOffer[]> = {
  "ja": [
    {
      "id": "shindan",
      "eyebrow": "01 · DIAGNOSIS",
      "short": "AI業務自動化 診断",
      "summary": "どの業務をAI化すべきかを、作る前に見極める診断レポート。",
      "title": "AI業務自動化の診断レポートを作成します",
      "catch": "AI化しない判断も含めて、公平に診断します",
      "price": 30000,
      "days": 7,
      "lead": [
        "ご覧いただきありがとうございます。AI業務自動化に取り組むMiragea · Elioraです。",
        "「AIで業務を楽にしたいが、どこから手をつければいいか分からない」",
        "「社内資料や取引先の情報を、クラウドのAIに入れてよいか不安」",
        "そんな中小企業・個人事業主の方向けに、作る前に“やる価値があるか”を見極める診断レポートです。AI化しない方がよい業務は、見送りの提案もします。"
      ],
      "sections": [
        {
          "h": "レポートでお渡しするもの（PDF・12〜20ページ程度）",
          "items": [
            {
              "t": "cl",
              "l": [
                "① 業務の棚卸し表（対象は最大5業務）",
                "② AI化の優先順位：効果・定型性・データの準備度・リスク・ローカルAIとの相性の5観点で採点",
                "③ ローカルAI（社内のPC内で動くAI）とクラウドAIの、どちらが向くかの判定と理由",
                "④ 効果とコストの概算（月間件数×作業時間など、前提条件を明記した試算）",
                "⑤ 最優先の1業務について、導入後の業務の流れと、小さく試すPoC案",
                "⑥ 90日間の進め方"
              ]
            }
          ]
        },
        {
          "h": "進め方（お届けまで7日）",
          "items": [
            {
              "t": "ol",
              "l": [
                "ご依頼確定後、ヒアリングシートをお送りします",
                "業務の流れ・扱う書類の種類・件数をお答えください（実データは不要です）",
                "診断・レポート作成",
                "納品後、質疑応答1往復"
              ]
            },
            {
              "t": "p",
              "l": [
                "ヒアリングは文章で行うため、やり取りが記録に残り、社内で共有しやすい形です。構築をご希望の場合は、別途お見積りします。診断のみでも問題ありません。"
              ]
            }
          ]
        },
        {
          "h": "ローカルAIを前提にする理由",
          "items": [
            {
              "t": "p",
              "l": [
                "データをクラウドのAIサービスに送らず、手元のPCやサーバー内で処理する方式です。機密情報を外部のAIに入れずに済み、従量課金のAI利用料もかかりません。一方、クラウドの最新AIより精度や速度が劣る場面もあります。診断では、両方を公平に比べてお伝えします。"
              ]
            }
          ]
        },
        {
          "h": "実績・検証について（正直にお伝えします）",
          "items": [
            {
              "t": "ul",
              "l": [
                "AIの学習・実践歴は2022年から約4年です",
                "有償案件としての納品実績はまだありません",
                "自社検証（架空の合成データ）の結果：請求書の金額抽出24/24件、社内文書Q&A 13/13問、問い合わせ分類14/14件（重大な誤分類0件）。件数の少ない検証であり、お客様のデータでの精度を保証するものではありません"
              ]
            },
            {
              "t": "p",
              "l": [
                "すべてオンラインで完結します。ご訪問や、お客様のPC・ネットワークへの接続は行いません。"
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "ご依頼後にお知らせいただきたいこと",
          "items": [
            {
              "t": "ul",
              "l": [
                "自動化したい業務の内容と、現在の手順（箇条書きでOK）",
                "扱う書類・データの種類（例：PDFの請求書、メール、Excel）と月間のおおよその件数",
                "各業務にかかっている時間の目安（週あたり）",
                "現在お使いのPC・ソフト、AIツールの利用状況",
                "ご希望の納期"
              ]
            },
            {
              "t": "p",
              "l": [
                "分からない項目は「不明」で大丈夫です。ヒアリングしながら整理します。"
              ]
            }
          ]
        },
        {
          "h": "情報の取り扱い",
          "items": [
            {
              "t": "ul",
              "l": [
                "実データは不要です。サンプルが必要な場合も、個人情報・機密情報は黒塗りまたはダミーに置き換えてお送りください",
                "やり取りとファイルの受け渡し方法は、ご相談後に個別にご案内します",
                "お預かりした情報は、本サービスの目的以外には使用しません"
              ]
            }
          ]
        },
        {
          "h": "サービスの範囲",
          "items": [
            {
              "t": "ul",
              "l": [
                "本サービスは診断とレポートの納品までです。システムの構築は含みません",
                "費用や効果の数値は、お伺いした条件に基づく概算の試算であり、成果を保証するものではありません",
                "ビデオ会議・電話での打ち合わせは行いません（文章でのヒアリングです）",
                "診断する業務が6つ以上の場合は、有料オプションをご利用ください",
                "レポートの誤記・事実誤認は、納品後7日以内に修正します。方針の大幅な変更は別途ご相談ください"
              ]
            }
          ]
        },
        {
          "h": "キャンセルについて",
          "items": [
            {
              "t": "p",
              "l": [
                "キャンセルの条件は、お見積り時にご案内します。ヒアリング開始後の対応は、作業状況に応じてご相談とさせてください。"
              ]
            }
          ]
        }
      ],
      "quote": "診断は定額です。構築を伴う内容や、診断対象が6業務以上の場合はご相談ください。①目的 ②対象業務 ③扱うデータの種類と件数 ④ご希望時期をお知らせください。個人情報・機密情報は記載しないでください。",
      "options": [
        {
          "text": "診断する業務を1つ追加します（基本料金は5業務まで）",
          "price": 10000
        },
        {
          "text": "診断結果をもとに、動くデモを1業務分つくります（架空データ使用）",
          "price": 40000
        },
        {
          "text": "レポートの納品を3営業日以内に短縮します",
          "price": 10000
        },
        {
          "text": "レポートの内容について、追加で1往復の質疑に回答します",
          "price": 5000
        }
      ],
      "faq": [
        {
          "q": "実際のデータを送る必要はありますか？",
          "a": "不要です。業務の流れと、扱う書類・データの種類をお聞きして診断します。必要に応じてダミーや黒塗りのサンプルを1〜2点お願いすることがありますが、個人情報・機密情報はそのまま送らないでください。"
        },
        {
          "q": "ローカルAIとは何ですか？",
          "a": "クラウドのAIサービスにデータを送らず、手元のPCやサーバー内で動かすAIです。機密性の高い資料や個人情報を外に出したくない場合の選択肢になります。精度や速度ではクラウドAIが向く業務もあるため、診断で判定します。"
        },
        {
          "q": "「AI化しない方がいい」という結論になることもありますか？",
          "a": "あります。件数が少ない業務や、誤りの影響が大きい業務などは、AI化を見送る提案や、既存ツールの活用を優先する提案をします。診断の目的は、無駄な投資を避けることです。"
        },
        {
          "q": "診断だけのご依頼でも大丈夫ですか？",
          "a": "はい。診断のみでも問題ありません。構築のご案内は任意で、お断りいただいても構いません。"
        },
        {
          "q": "ビデオ会議での説明はありますか？",
          "a": "ありません。ヒアリングも説明も、文章（メール）で行います。記録が残るため、社内で共有しやすい形です。レポートの内容は、納品後の質疑応答で補足します。"
        }
      ]
    },
    {
      "id": "build",
      "eyebrow": "02 · BUILD",
      "short": "業務自動化の構築",
      "summary": "請求書・問い合わせ・社内文書の自動化を、手元のAIで構築。",
      "title": "請求書・問い合わせ・文書のAI自動化を構築します",
      "catch": "毎月のAI利用料なし。手元のPCで動くAI",
      "price": 150000,
      "days": 21,
      "lead": [
        "ご覧いただきありがとうございます。社内の「毎月くり返す手作業」を、AIで1つずつ自動化するMiragea · Elioraです。",
        "請求書の転記、問い合わせメールの振り分け、マニュアルを探す時間。小さな手作業でも、積み重なると毎月かなりの時間になります。本サービスは、その中から1つの業務に絞り、ローカルAI（クラウドにデータを送らず、手元のPC内で動くAI）で自動化するツールを構築します。"
      ],
      "sections": [
        {
          "h": "構築できる自動化（次の3タイプから1つ）",
          "items": [
            {
              "t": "p",
              "l": [
                "A. 請求書・帳票の項目抽出：PDF・画像から日付・取引先・金額などを読み取り、ExcelやCSVに出力。読み取りに自信がない項目・金額が合わない場合は「要確認」の印をつけます"
              ]
            },
            {
              "t": "p",
              "l": [
                "B. 問い合わせメールの分類・振り分け：カテゴリを判定し、クレーム・緊急などは「要確認」として別に表示"
              ]
            },
            {
              "t": "p",
              "l": [
                "C. 社内文書Q&A：PDF・Word等（100ファイル程度）の内容に、出典つきで回答。資料にないことは「資料にありません」と答える設計です"
              ]
            }
          ]
        },
        {
          "h": "お渡しするもの",
          "items": [
            {
              "t": "ul",
              "l": [
                "自動化ツール一式（設定ファイル・ソースを含む）",
                "お客様のサンプルでの精度検証レポート",
                "操作手順書",
                "納品後30日間の質問対応"
              ]
            },
            {
              "t": "p",
              "l": [
                "お客様側で運用する場合、AIの従量課金（API料金）は発生しません。"
              ]
            }
          ]
        },
        {
          "h": "進め方（お届けまで21日）",
          "items": [
            {
              "t": "ol",
              "l": [
                "ご依頼前のご相談：業務内容・データ形式・件数を伺い、対応可否と提供方式をご案内",
                "サンプル受領（20〜50件。個人情報は黒塗りまたはダミー）",
                "構築・テスト",
                "サンプルでの精度検証と報告",
                "納品・操作説明（修正は2回まで）"
              ]
            }
          ]
        },
        {
          "h": "2つの提供方式",
          "items": [
            {
              "t": "cl",
              "l": [
                "① 当方で処理：データをお送りいただき、当方のPC内で処理して結果を納品",
                "② セットアップ納品：ツールと手順書をお渡しし、お客様側で運用。当方がお客様のPC・ネットワークに接続することはありません（必要なPC条件は事前にご案内）"
              ]
            }
          ]
        },
        {
          "h": "なぜローカルAIか",
          "items": [
            {
              "t": "p",
              "l": [
                "取引先情報や個人情報を外部のAIサービスに入力せずに済みます。ただし、クラウドの最新AIより精度や速度が劣る場面があるため、サンプルで確かめてから納品します。"
              ]
            }
          ]
        },
        {
          "h": "実績・検証について",
          "items": [
            {
              "t": "p",
              "l": [
                "AIの学習・実践歴は2022年から約4年。有償案件としての納品実績はまだありません。自社検証（架空の合成データ）では、A：金額抽出24/24件、C：13/13問に正答、B：カテゴリ14/14件・重大な誤分類0件でした。少数の合成データでの結果であり、お客様のデータでの精度を保証するものではありません。"
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "ご依頼前に、お問い合わせをお願いします",
          "items": [
            {
              "t": "p",
              "l": [
                "サンプルの形式を確認し、対応可否と、推奨の提供方式をご案内します。次の内容をお知らせください。"
              ]
            },
            {
              "t": "ul",
              "l": [
                "自動化したい業務と、月間の処理件数",
                "データの形式（PDF・画像・メール・Excelなど）",
                "お客様のPC環境（提供方式②の場合）",
                "ご希望の納期"
              ]
            },
            {
              "t": "p",
              "l": [
                "※ご相談だけでも歓迎です。"
              ]
            }
          ]
        },
        {
          "h": "ご用意いただくもの",
          "items": [
            {
              "t": "ul",
              "l": [
                "サンプルデータ20〜50件（個人情報・機密情報は黒塗りまたはダミーに置き換え）",
                "期待する出力の例（正解のイメージ）"
              ]
            }
          ]
        },
        {
          "h": "情報の取り扱い",
          "items": [
            {
              "t": "ul",
              "l": [
                "ファイルの受け渡し方法は、ご相談後に個別にご案内します。個人情報・機密情報は、黒塗りまたはダミーに置き換えてください",
                "お預かりしたデータは本取引の処理のみに使用し、サポート期間の終了後に当方の環境から削除します",
                "個人情報・機密性の高いデータを扱う場合は、事前に範囲をご相談ください"
              ]
            }
          ]
        },
        {
          "h": "範囲と注意",
          "items": [
            {
              "t": "ul",
              "l": [
                "基本料金は、3タイプから1つ、サンプルでの検証までです",
                "複数機能、外部システムとの連携、手書き文字・特殊な書式への対応は、有料オプションまたは別途お見積りです",
                "AIの出力には誤りが含まれる場合があります。重要な業務では、人による最終確認を前提にご利用ください",
                "修正は仕様の範囲内で2回まで。仕様変更は別途お見積りです",
                "個人情報を大量に扱う案件、24時間運用・稼働保証が必要な案件、医療・法律などの専門判断は、お受けできません",
                "納品後の保守・改善（月額30,000円〜）は、別途お見積りでご案内します",
                "訪問や、お客様のPCへの遠隔接続は行いません"
              ]
            }
          ]
        }
      ],
      "quote": "サンプルの形式を確認し、対応可否と提供方式をご案内します。①自動化したい業務 ②月間の件数 ③データの形式（PDF・画像・メール等） ④ご希望の納期 ⑤お客様のPC環境（お客様側で運用する場合）をお知らせください。個人情報・機密情報は記載しないでください。",
      "options": [
        {
          "text": "追加機能：A・B・Cのうち、もう1タイプを追加します",
          "price": 60000
        },
        {
          "text": "出力項目・分類カテゴリ・回答形式を追加でカスタマイズします",
          "price": 20000
        },
        {
          "text": "操作手順書を、画面写真つきで作成します",
          "price": 10000
        },
        {
          "text": "納品後の質問対応を、30日から60日に延長します",
          "price": 15000
        },
        {
          "text": "短縮納期：14日以内に納品します",
          "price": 30000
        }
      ],
      "faq": [
        {
          "q": "データは外部のAIサービスに送られますか？",
          "a": "外部のクラウドAIサービスには送りません。提供方式①では、お預かりしたデータを当方のPC内のローカルAIで処理します（データは当方にお送りいただくことになります）。方式②では、お客様の環境で動かしていただきます。"
        },
        {
          "q": "毎月の費用はかかりますか？",
          "a": "お客様側で運用する場合（方式②）、AIの従量課金（API料金）やサーバー代は発生しません。お客様のPCの電気代などは別途かかります。納品後の保守・改善をご希望の場合のみ、月額30,000円〜でご案内します。"
        },
        {
          "q": "提供方式②で必要なPCの条件は？",
          "a": "機能や使うAIモデルによって異なります。GPU搭載のPCが望ましいケースが多く、ご依頼前のご相談で条件をご案内します。条件を満たさない場合は、方式①をご提案します。"
        },
        {
          "q": "手書きの書類や複雑な表も読み取れますか？",
          "a": "書式によって精度が下がります。基本料金は、きれいなPDF・画像を想定しています。サンプルで検証したうえで、対応可否を事前にご連絡します。"
        },
        {
          "q": "精度はどのくらいですか？",
          "a": "自社の合成データでは本文記載の結果でしたが、お客様のデータで同等になるとは限りません。サンプルでの検証結果を、数字でレポートにまとめてお渡しします。"
        }
      ]
    },
    {
      "id": "poc",
      "eyebrow": "03 · POC",
      "short": "社内文書AI PoC",
      "summary": "社内文書に答えるAIを、実データで測ってから導入判断。",
      "title": "社内文書に答えるAIの検証版（PoC）を構築します",
      "catch": "出典つき回答。「資料にない」も実測で確認",
      "price": 300000,
      "days": 45,
      "lead": [
        "ご覧いただきありがとうございます。Miragea · Elioraです。",
        "「社内の規程・マニュアル・過去資料をAIで検索できるようにしたい。でも、機密性のある文書をクラウドのAIに入れるのは不安」。そんな企業向けに、本番導入の前に“実際に使えるか”を数字で確かめる検証版（PoC）を、ローカルAIで構築します。"
      ],
      "sections": [
        {
          "h": "このPoCで行うこと",
          "items": [
            {
              "t": "ol",
              "l": [
                "対象業務・文書の整理（例：社内規程の問い合わせ対応）",
                "評価用の質問セット（30〜50問）をお客様と一緒に作成",
                "ローカルAI（llama.cpp＋オープンなAIモデル）で、文書を検索して出典つきで答えるAIを構築。資料にないことは「資料にありません」と答える設計です",
                "お客様の文書で精度を測定（正答・誤答・「資料にない」と答えるべき質問の扱い）",
                "評価レポート（誤答の傾向と改善案つき）と、本番導入する場合の構成・費用・運用案を提示。結果をもとに、本番導入・見送り・クラウドとの併用のどれが合うかをお伝えします"
              ]
            }
          ]
        },
        {
          "h": "基本料金に含まれるもの",
          "items": [
            {
              "t": "ul",
              "l": [
                "対象業務1つ、文書200ファイル程度まで（PDF・Word・テキスト等）",
                "ブラウザで使える簡易チャット画面",
                "評価レポート（PDF）と導入提案書",
                "構成・設定ファイル一式と手順書",
                "納品後30日間の質問対応"
              ]
            },
            {
              "t": "p",
              "l": [
                "お届けの目安は45日です。"
              ]
            }
          ]
        },
        {
          "h": "範囲を広げたい場合",
          "items": [
            {
              "t": "p",
              "l": [
                "対象業務や文書量の追加、請求書抽出・問い合わせ分類との組み合わせは、有料オプションで追加できます。大規模な構築や本番運用までを含む場合は、お問い合わせから個別にお見積りします。"
              ]
            }
          ]
        },
        {
          "h": "提供方式",
          "items": [
            {
              "t": "cl",
              "l": [
                "① 当方のPCで構築・評価し、結果と環境一式を納品",
                "② お客様側で動かせるセットアップと手順書を納品（PC条件は事前にご案内）"
              ]
            },
            {
              "t": "p",
              "l": [
                "いずれも、訪問や、お客様のPC・ネットワークへの接続は行いません。"
              ]
            }
          ]
        },
        {
          "h": "なぜローカルAIか",
          "items": [
            {
              "t": "ul",
              "l": [
                "社内文書を外部のAIサービスに入力しない構成にできます",
                "AIの従量課金（API料金）が発生しません",
                "一方で、クラウドの大規模AIより精度や速度が劣る場合があります。PoCで実測し、合わない場合はその旨をレポートに明記します"
              ]
            }
          ]
        },
        {
          "h": "実績・検証について",
          "items": [
            {
              "t": "p",
              "l": [
                "AIの学習・実践歴は2022年から約4年。有償案件としての納品実績はまだありません。自社検証（架空の合成データ）：社内文書Q&A 13/13問、請求書の金額抽出24/24件、問い合わせ分類14/14件（重大な誤分類0件）。件数の少ない検証であり、お客様の文書で同じ精度になることは保証できません。だからこそ、PoCでお客様の文書を使って測定します。"
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "ご依頼前に、必ずお問い合わせください",
          "items": [
            {
              "t": "p",
              "l": [
                "PoCの内容は、文書の量・種類・機密性で変わります。次の内容をお知らせください。"
              ]
            },
            {
              "t": "ul",
              "l": [
                "目的と対象業務（例：社内規程の問い合わせ対応）",
                "文書の種類・ファイル数・総容量、機密性の有無",
                "想定の利用者数、ご希望の時期・ご予算感",
                "提供方式②（お客様側で稼働）をご希望の場合は、PC・GPUなどの環境"
              ]
            }
          ]
        },
        {
          "h": "情報の取り扱い",
          "items": [
            {
              "t": "ul",
              "l": [
                "文書の受け渡し方法は、ご相談後に個別にご案内します。個人情報・機密情報は、黒塗りまたはダミーに置き換えてください",
                "文書は評価の目的のみに使用し、サポート期間の終了後に当方の環境から削除します",
                "個人情報や機密性の高い文書は、最初はダミーや一部の抜粋でのPoCをおすすめします",
                "機密保持契約（NDA）をご希望の場合は、事前にご相談ください"
              ]
            }
          ]
        },
        {
          "h": "範囲と注意",
          "items": [
            {
              "t": "ul",
              "l": [
                "本サービスは検証版（PoC）です。本番運用での稼働や可用性は保証しません",
                "AIの回答には誤りが含まれる場合があります。精度の数値は検証時点のものです",
                "修正は仕様の範囲内で2回まで。仕様変更・範囲の追加は別途お見積りです",
                "PoC後の保守・改善（月額30,000円〜）は、別途お見積りでご案内します",
                "個人情報を大量に扱う案件、24時間運用・稼働保証が必要な案件、医療・法律などの専門判断は、お受けできません",
                "訪問や、お客様のPCへの遠隔接続は行いません"
              ]
            }
          ]
        }
      ],
      "quote": "PoCは内容により費用が変わります。①目的と対象業務 ②文書の種類・ファイル数・総容量 ③機密性の有無 ④想定の利用者数 ⑤ご希望の時期・予算感をお知らせください。個人情報・機密情報そのものは記載しないでください。",
      "options": [
        {
          "text": "対象業務を1つ追加します（質問セット・精度評価を含む）",
          "price": 150000
        },
        {
          "text": "対象文書を200ファイル追加します",
          "price": 50000
        },
        {
          "text": "請求書抽出または問い合わせ分類の検証を、組み合わせて追加します",
          "price": 80000
        },
        {
          "text": "本番導入向けの設計書（構成・運用・セキュリティ）を作成します",
          "price": 50000
        },
        {
          "text": "納品後の質問対応を、30日から60日に延長します",
          "price": 25000
        },
        {
          "text": "短縮納期：30日以内に納品します",
          "price": 50000
        }
      ],
      "faq": [
        {
          "q": "PoCとは何ですか？",
          "a": "本格導入の前に、小さな範囲で実際に動かし、効果や精度を確かめる検証のことです。導入を進めるか見送るかを、数字をもとに判断できるようにします。"
        },
        {
          "q": "クラウドAIより精度は劣りませんか？",
          "a": "一般に、クラウド上の大規模AIより小さいモデルを使うため、業務によっては精度や速度に差が出ます。PoCではお客様の文書で測定し、ローカルAIが適さない場合は、その旨をレポートに明記します。"
        },
        {
          "q": "機密文書を送っても大丈夫ですか？",
          "a": "受け渡し方法は、ご相談後に個別にご案内します。機密性の高い文書は、最初はダミーや一部の抜粋でのPoCをおすすめします。お預かりした文書は評価の目的のみに使用します。"
        },
        {
          "q": "基本料金より金額が大きくなるのはどんな場合ですか？",
          "a": "対象業務・文書量の追加や、他の機能との組み合わせの場合です。有料オプションで追加できます。さらに大規模な場合は、お問い合わせからお見積りします。"
        },
        {
          "q": "PoCの後の保守は頼めますか？",
          "a": "はい。保守・改善（月額30,000円〜）を、別途お見積りでご案内します。"
        }
      ]
    }
  ],
  "en": [
    {
      "id": "shindan",
      "eyebrow": "01 · DIAGNOSIS",
      "short": "AI Automation Diagnosis",
      "summary": "A diagnosis report that tells you which tasks are worth automating, before you build anything.",
      "title": "A diagnosis report: which of your tasks should be automated with AI?",
      "catch": "Including the call not to automate. An honest assessment.",
      "price": 30000,
      "days": 7,
      "lead": [
        "Thanks for visiting. This is Miragea · Eliora, building private AI automation for business.",
        "“I want AI to take work off my plate, but I don’t know where to start.”",
        "“I’m not sure it is safe to put internal documents or client information into a cloud AI.”",
        "For small and mid-sized companies and independent professionals, this report decides whether a task is worth automating before anything is built. If a task is better left alone, I will say so."
      ],
      "sections": [
        {
          "h": "What the report contains (PDF, about 12–20 pages)",
          "items": [
            {
              "t": "cl",
              "l": [
                "① Task inventory (up to 5 tasks)",
                "② Priority ranking, scored on five points: impact, repeatability, data readiness, risk, and fit for local AI",
                "③ Local AI (runs on a PC inside your company) vs cloud AI: which suits each task, and why",
                "④ Rough estimate of benefit and cost, with every assumption stated (for example monthly volume × minutes per task)",
                "⑤ For the top task: the workflow after introduction, and a small proof-of-concept (PoC) plan",
                "⑥ A 90-day roadmap"
              ]
            }
          ]
        },
        {
          "h": "How it works (delivered in 7 days)",
          "items": [
            {
              "t": "ol",
              "l": [
                "After you confirm the request, I send a short hearing sheet",
                "You describe the workflow, the kinds of documents and the volumes (no real data needed)",
                "I analyse and write the report",
                "One round of follow-up questions after delivery"
              ]
            },
            {
              "t": "p",
              "l": [
                "The hearing is written, so everything is on record and easy to share inside your company. If you want a build afterwards, I quote it separately. A diagnosis on its own is perfectly fine."
              ]
            }
          ]
        },
        {
          "h": "Why local AI is the starting point",
          "items": [
            {
              "t": "p",
              "l": [
                "Data is processed on a PC or server you control instead of being sent to a cloud AI service. Confidential information stays out of external AI, and there are no pay-per-use AI fees. Cloud AI can still be more accurate or faster for some tasks, so the diagnosis compares both fairly."
              ]
            }
          ]
        },
        {
          "h": "Track record and verification (stated honestly)",
          "items": [
            {
              "t": "ul",
              "l": [
                "I have been studying and practising AI since 2022 (about 4 years)",
                "I have no paid delivery record yet",
                "In-house verification on synthetic data: invoice amount extraction 24/24, internal-document Q&A 13/13, inquiry classification 14/14 (0 critical misclassifications). These are small tests and do not guarantee accuracy on your data"
              ]
            },
            {
              "t": "p",
              "l": [
                "Everything is done online. I do not visit you and I do not connect to your PCs or network."
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "What to send after you request",
          "items": [
            {
              "t": "ul",
              "l": [
                "What you want to automate and how it is done today (bullet points are fine)",
                "The kinds of documents or data (e.g. PDF invoices, email, Excel) and the rough monthly volume",
                "Roughly how much time each task takes per week",
                "The PCs, software and AI tools you use now",
                "Your preferred timeline"
              ]
            },
            {
              "t": "p",
              "l": [
                "Unknown items can be marked “unknown”. We will sort them out in the hearing."
              ]
            }
          ]
        },
        {
          "h": "Handling of information",
          "items": [
            {
              "t": "ul",
              "l": [
                "No real data is needed. If a sample is useful, please redact personal and confidential details or replace them with dummy data",
                "How files are exchanged is agreed individually after the first conversation",
                "Information you provide is used only for this service"
              ]
            }
          ]
        },
        {
          "h": "Scope",
          "items": [
            {
              "t": "ul",
              "l": [
                "This service covers the diagnosis and the report only. It does not include building a system",
                "Cost and benefit figures are rough estimates based on the conditions you describe, not a guarantee of results",
                "No video or phone meetings; the hearing is written",
                "If more than 5 tasks are to be diagnosed, use the paid option",
                "Typos and factual errors in the report are corrected within 7 days after delivery. Major changes of direction are quoted separately"
              ]
            }
          ]
        },
        {
          "h": "Cancellation",
          "items": [
            {
              "t": "p",
              "l": [
                "Cancellation terms are given with the quote. Once the hearing has started, we will discuss it according to the work done."
              ]
            }
          ]
        }
      ],
      "quote": "The diagnosis is a fixed fee. For builds, or more than 5 tasks, please ask. Tell me ① your goal ② the tasks ③ the type and volume of data ④ your preferred timing. Please do not include personal or confidential information.",
      "options": [
        {
          "text": "Add one more task to the diagnosis (the base price covers 5 tasks)",
          "price": 10000
        },
        {
          "text": "Build a working demo for one task from the result (synthetic data)",
          "price": 40000
        },
        {
          "text": "Deliver the report within 3 business days",
          "price": 10000
        },
        {
          "text": "Answer one more round of questions about the report",
          "price": 5000
        }
      ],
      "faq": [
        {
          "q": "Do I need to send real data?",
          "a": "No. I diagnose from your workflow and the kinds of documents or data you handle. I may ask for one or two dummy or redacted samples, but please do not send personal or confidential information as it is."
        },
        {
          "q": "What is local AI?",
          "a": "AI that runs on a PC or server you control instead of sending data to a cloud AI service. It is an option when documents or personal data must not leave your premises. Cloud AI can be better for some tasks, so the diagnosis decides case by case."
        },
        {
          "q": "Can the conclusion be “don’t automate this”?",
          "a": "Yes. For low-volume tasks or tasks where an error is costly, I will recommend leaving them out or using existing tools first. The goal is to avoid wasted investment."
        },
        {
          "q": "Can I order only the diagnosis?",
          "a": "Yes. The diagnosis stands alone. Any build proposal is optional and you are free to decline."
        },
        {
          "q": "Is there a video call?",
          "a": "No. The hearing and the explanation are written (email). That keeps a record that is easy to share inside your company, and the report is supplemented by the follow-up Q&A."
        }
      ]
    },
    {
      "id": "build",
      "eyebrow": "02 · BUILD",
      "short": "Business Automation Build",
      "summary": "Automation for invoices, inquiries and internal documents, built on AI that runs on your own PC.",
      "title": "Build AI automation for invoices, inquiries and documents",
      "catch": "No monthly AI fees. AI that runs on your own PC.",
      "price": 150000,
      "days": 21,
      "lead": [
        "Thanks for visiting. This is Miragea · Eliora, automating repetitive in-house tasks with AI, one task at a time.",
        "Copying invoice data, sorting inquiry emails, hunting through manuals. Small chores add up to a lot of time every month. This service takes one of them and builds a tool that automates it with local AI (AI that runs on a PC inside your company, without sending data to the cloud)."
      ],
      "sections": [
        {
          "h": "Automations you can choose (one of three types)",
          "items": [
            {
              "t": "p",
              "l": [
                "A. Invoice and form field extraction: reads dates, vendors and amounts from PDFs or images and outputs Excel or CSV. Uncertain fields or mismatched totals are flagged “needs review”."
              ]
            },
            {
              "t": "p",
              "l": [
                "B. Inquiry email classification: assigns a category; complaints, urgent items and similar are flagged “needs review” and shown separately."
              ]
            },
            {
              "t": "p",
              "l": [
                "C. Internal document Q&A: answers from PDFs, Word files and the like (about 100 files), with sources. If the documents do not say, the system answers “not in the documents”."
              ]
            }
          ]
        },
        {
          "h": "What you receive",
          "items": [
            {
              "t": "ul",
              "l": [
                "The complete automation tool (including configuration files and source)",
                "An accuracy report on your own samples",
                "An operating manual",
                "30 days of Q&A support after delivery"
              ]
            },
            {
              "t": "p",
              "l": [
                "When you run it on your side, there are no pay-per-use AI (API) fees."
              ]
            }
          ]
        },
        {
          "h": "How it works (delivered in 21 days)",
          "items": [
            {
              "t": "ol",
              "l": [
                "Pre-request consultation: I review the task, data format and volume, and confirm feasibility and the delivery mode",
                "Receive samples (20–50 items; personal data redacted or dummy)",
                "Build and test",
                "Accuracy check on your samples and a report",
                "Delivery and walkthrough (up to 2 rounds of fixes)"
              ]
            }
          ]
        },
        {
          "h": "Two delivery modes",
          "items": [
            {
              "t": "cl",
              "l": [
                "① I process it: you send the data and I run it on my own PC and deliver the results",
                "② Setup delivery: I hand over the tool and manual and you run it yourself. I never connect to your PC or network (required PC specs are shared beforehand)"
              ]
            }
          ]
        },
        {
          "h": "Why local AI",
          "items": [
            {
              "t": "p",
              "l": [
                "Client and personal information never has to be typed into an external AI service. Because cloud AI can still be more accurate or faster in some cases, I check on your samples before delivery."
              ]
            }
          ]
        },
        {
          "h": "Track record and verification",
          "items": [
            {
              "t": "p",
              "l": [
                "I have been studying and practising AI since 2022 (about 4 years). I have no paid delivery record yet. In-house verification on synthetic data: A: amount extraction 24/24; C: 13/13 questions correct; B: category 14/14 with 0 critical misclassifications. These are results on a small synthetic set and do not guarantee accuracy on your data."
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "Please contact me before ordering",
          "items": [
            {
              "t": "p",
              "l": [
                "I check your sample format and confirm feasibility and the recommended delivery mode. Please tell me:"
              ]
            },
            {
              "t": "ul",
              "l": [
                "The task to automate and its monthly volume",
                "The data format (PDF, image, email, Excel, etc.)",
                "Your PC environment (for delivery mode ②)",
                "Your preferred timeline"
              ]
            },
            {
              "t": "p",
              "l": [
                "Questions alone are welcome."
              ]
            }
          ]
        },
        {
          "h": "What you provide",
          "items": [
            {
              "t": "ul",
              "l": [
                "20–50 sample items (personal and confidential information redacted or replaced with dummy data)",
                "An example of the output you expect (what a correct answer looks like)"
              ]
            }
          ]
        },
        {
          "h": "Handling of information",
          "items": [
            {
              "t": "ul",
              "l": [
                "How files are exchanged is agreed individually after the first conversation. Please redact personal and confidential details or use dummy data",
                "Data is used only to process this job and is deleted from my environment after the support period ends",
                "If personal or highly confidential data is involved, please discuss the scope first"
              ]
            }
          ]
        },
        {
          "h": "Scope and notes",
          "items": [
            {
              "t": "ul",
              "l": [
                "The base price covers one of the three types, with validation on samples",
                "Multiple functions, integration with other systems, and handwriting or unusual layouts need paid options or a separate quote",
                "AI output can contain errors. For important work, please keep a human final check",
                "Fixes: up to 2 within the agreed specification. Spec changes are quoted separately",
                "I cannot take work that handles large volumes of personal data, needs 24/7 operation or uptime guarantees, or requires medical or legal judgement",
                "Maintenance and improvements after delivery (from JPY 30,000 per month) are quoted separately",
                "I do not visit and I do not remotely connect to your PC"
              ]
            }
          ]
        }
      ],
      "quote": "I check your sample format and tell you whether it is feasible and which delivery mode fits. Please tell me ① the task ② monthly volume ③ data format (PDF, image, email, etc.) ④ timeline ⑤ your PC environment (if you run it yourself). Please do not include personal or confidential information.",
      "options": [
        {
          "text": "Additional function: add another of types A, B or C",
          "price": 60000
        },
        {
          "text": "Customise output fields, categories or answer format",
          "price": 20000
        },
        {
          "text": "Operating manual with screenshots",
          "price": 10000
        },
        {
          "text": "Extend post-delivery support from 30 to 60 days",
          "price": 15000
        },
        {
          "text": "Rush delivery: within 14 days",
          "price": 30000
        }
      ],
      "faq": [
        {
          "q": "Is my data sent to an external AI service?",
          "a": "No. It is not sent to any external cloud AI service. In delivery mode ①, I process your data with local AI on my own PC (so you send the data to me). In mode ②, you run it in your own environment."
        },
        {
          "q": "Are there monthly costs?",
          "a": "When you run it yourself (mode ②), there are no pay-per-use AI (API) fees or server fees. Electricity for your own PC is yours. Only if you want maintenance and improvement after delivery, it starts from JPY 30,000 per month."
        },
        {
          "q": "What PC do I need for mode ②?",
          "a": "It depends on the function and the AI model. A PC with a GPU is often preferable; I confirm requirements in the pre-request consultation. If your PC does not meet them, I will propose mode ①."
        },
        {
          "q": "Can it read handwriting or complex tables?",
          "a": "Accuracy drops with layout. The base price assumes clean PDFs and images. I validate on your samples and tell you beforehand whether it is feasible."
        },
        {
          "q": "How accurate is it?",
          "a": "The results above were on my own synthetic data; yours may differ. You receive the validation on your samples as numbers in the report."
        }
      ]
    },
    {
      "id": "poc",
      "eyebrow": "03 · POC",
      "short": "Internal Document AI PoC",
      "summary": "An AI that answers from your internal documents, measured on real data before you decide to adopt it.",
      "title": "Build a proof of concept for an AI that answers from your documents",
      "catch": "Answers with sources, and “not in the documents” is measured too.",
      "price": 300000,
      "days": 45,
      "lead": [
        "Thanks for visiting. This is Miragea · Eliora.",
        "“We want to search our rules, manuals and past documents with AI, but putting confidential documents into a cloud AI worries us.” For companies in that position, I build a proof of concept (PoC) with local AI, measuring on your own documents whether it really works before you commit to adoption."
      ],
      "sections": [
        {
          "h": "What this PoC does",
          "items": [
            {
              "t": "ol",
              "l": [
                "Organise the target task and documents (e.g. answering questions about internal regulations)",
                "Create a set of 30–50 evaluation questions together with you",
                "Build, with local AI (llama.cpp plus an open AI model), an assistant that searches the documents and answers with sources. If the documents do not say, it answers “not in the documents”",
                "Measure accuracy on your documents (correct and wrong answers, and how it handles questions that should be answered “not in the documents”)",
                "Deliver an evaluation report (with error tendencies and improvements) and a proposal for production (configuration, cost, operations). Based on the result I tell you whether adoption, passing, or a combination with cloud AI fits"
              ]
            }
          ]
        },
        {
          "h": "Included in the base price",
          "items": [
            {
              "t": "ul",
              "l": [
                "One task and up to about 200 documents (PDF, Word, text, etc.)",
                "A simple chat screen that runs in the browser",
                "Evaluation report (PDF) and adoption proposal",
                "Configuration files and a manual",
                "30 days of Q&A support after delivery"
              ]
            },
            {
              "t": "p",
              "l": [
                "Delivery takes about 45 days."
              ]
            }
          ]
        },
        {
          "h": "If you need more",
          "items": [
            {
              "t": "p",
              "l": [
                "Additional tasks or documents, or combining with invoice extraction or inquiry classification, are available as paid options. Large builds or production operation are quoted individually after you contact me."
              ]
            }
          ]
        },
        {
          "h": "Delivery modes",
          "items": [
            {
              "t": "cl",
              "l": [
                "① I build and evaluate on my own PC and deliver the results and environment",
                "② I deliver a setup and manual that you can run yourself (PC requirements shared beforehand)"
              ]
            },
            {
              "t": "p",
              "l": [
                "In both cases I do not visit and I do not connect to your PCs or network."
              ]
            }
          ]
        },
        {
          "h": "Why local AI",
          "items": [
            {
              "t": "ul",
              "l": [
                "Your internal documents never have to be entered into an external AI service",
                "No pay-per-use AI (API) fees",
                "Cloud-scale AI can still be more accurate or faster. I measure it in the PoC, and if local AI does not fit, the report says so"
              ]
            }
          ]
        },
        {
          "h": "Track record and verification",
          "items": [
            {
              "t": "p",
              "l": [
                "I have been studying and practising AI since 2022 (about 4 years). I have no paid delivery record yet. In-house verification on synthetic data: internal-document Q&A 13/13, invoice amount extraction 24/24, inquiry classification 14/14 (0 critical misclassifications). These are small tests and I cannot promise the same accuracy on your documents. That is exactly why the PoC measures it on your documents."
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "Please contact me before ordering",
          "items": [
            {
              "t": "p",
              "l": [
                "The PoC varies with the volume, type and sensitivity of the documents. Please tell me:"
              ]
            },
            {
              "t": "ul",
              "l": [
                "Your goal and the task (e.g. answering questions about internal regulations)",
                "Document types, number of files, total size, and whether they are confidential",
                "Expected number of users, timing and budget range",
                "If you want to run it yourself (mode ②): your PC and GPU environment"
              ]
            }
          ]
        },
        {
          "h": "Handling of information",
          "items": [
            {
              "t": "ul",
              "l": [
                "How documents are exchanged is agreed individually after the first conversation. Please redact personal and confidential details or use dummy data",
                "Documents are used only for the evaluation and are deleted from my environment after the support period ends",
                "For personal or highly confidential documents, I recommend starting the PoC with dummy data or an excerpt",
                "If you want a non-disclosure agreement (NDA), please ask beforehand"
              ]
            }
          ]
        },
        {
          "h": "Scope and notes",
          "items": [
            {
              "t": "ul",
              "l": [
                "This is a proof of concept. I do not guarantee production operation or availability",
                "AI answers can contain errors, and accuracy figures are valid at the time of validation",
                "Fixes: up to 2 within the agreed specification. Spec changes or additions are quoted separately",
                "Maintenance and improvements after the PoC (from JPY 30,000 per month) are quoted separately",
                "I cannot take work that handles large volumes of personal data, needs 24/7 operation or uptime guarantees, or requires medical or legal judgement",
                "I do not visit and I do not remotely connect to your PC"
              ]
            }
          ]
        }
      ],
      "quote": "The PoC cost depends on the content. Please tell me ① the goal and task ② document types, number of files and total size ③ whether they are confidential ④ expected number of users ⑤ timing and budget range. Please do not include personal or confidential information itself.",
      "options": [
        {
          "text": "Add one more task (includes question set and evaluation)",
          "price": 150000
        },
        {
          "text": "Add 200 more documents",
          "price": 50000
        },
        {
          "text": "Add validation of invoice extraction or inquiry classification",
          "price": 80000
        },
        {
          "text": "Design document for production use (architecture, operations, security)",
          "price": 50000
        },
        {
          "text": "Extend post-delivery support from 30 to 60 days",
          "price": 25000
        },
        {
          "text": "Rush delivery: within 30 days",
          "price": 50000
        }
      ],
      "faq": [
        {
          "q": "What is a PoC?",
          "a": "A proof of concept: a small, real trial before full adoption to check effect and accuracy. It lets you decide whether to proceed or pass, based on numbers."
        },
        {
          "q": "Will it be less accurate than cloud AI?",
          "a": "Generally, local models are smaller than large cloud AI, so accuracy and speed can differ by task. The PoC measures this on your documents. If local AI is not suitable, the report says so."
        },
        {
          "q": "Is it safe to send confidential documents?",
          "a": "How documents are exchanged is agreed individually after the first conversation. For highly confidential documents I recommend starting with dummy data or an excerpt. Documents are used only for the evaluation."
        },
        {
          "q": "When does the price go above the base price?",
          "a": "When you add tasks or documents, or combine other functions. These are paid options. Larger scope is quoted after you contact me."
        },
        {
          "q": "Can I ask for maintenance after the PoC?",
          "a": "Yes. Maintenance and improvements (from JPY 30,000 per month) are quoted separately."
        }
      ]
    }
  ],
  "zh": [
    {
      "id": "shindan",
      "eyebrow": "01 · DIAGNOSIS",
      "short": "AI 业务自动化诊断",
      "summary": "在动手搭建之前，先判断哪些业务值得用 AI 自动化的诊断报告。",
      "title": "出具 AI 业务自动化诊断报告",
      "catch": "包括“不建议 AI 化”的结论，客观公正地诊断",
      "price": 30000,
      "days": 7,
      "lead": [
        "感谢您的关注。我是 Miragea · Eliora，专注于企业私有 AI 自动化。",
        "“想用 AI 减轻工作量，但不知道从哪里开始。”",
        "“把内部资料和客户信息放进云端 AI，总觉得不放心。”",
        "面向中小企业和个体经营者，这份诊断报告会在搭建之前先判断“这件事值不值得做”。如果某项业务不适合 AI 化，我也会如实建议暂缓。"
      ],
      "sections": [
        {
          "h": "报告包含的内容（PDF，约 12–20 页）",
          "items": [
            {
              "t": "cl",
              "l": [
                "① 业务盘点表（最多 5 项业务）",
                "② AI 化优先级：按效果、规范性、数据准备度、风险、与本地 AI 的契合度五个维度打分",
                "③ 本地 AI（在公司内部 PC 上运行的 AI）与云端 AI 的适用判断及理由",
                "④ 效果与成本的概算（如月度件数 × 单件耗时，并写明前提条件）",
                "⑤ 针对最优先的一项业务：引入后的业务流程，以及小规模验证（PoC）方案",
                "⑥ 90 天推进计划"
              ]
            }
          ]
        },
        {
          "h": "流程（7 天交付）",
          "items": [
            {
              "t": "ol",
              "l": [
                "确认委托后，发送访谈表",
                "请回答业务流程、涉及文件类型和件数（无需提供真实数据）",
                "诊断并撰写报告",
                "交付后进行一轮问答"
              ]
            },
            {
              "t": "p",
              "l": [
                "访谈以书面形式进行，沟通记录会保留，便于在公司内部共享。如需后续搭建，会另行报价。只做诊断也完全可以。"
              ]
            }
          ]
        },
        {
          "h": "为什么以本地 AI 为前提",
          "items": [
            {
              "t": "p",
              "l": [
                "数据不发送到云端 AI 服务，而是在您自己的 PC 或服务器内处理。机密信息无需输入外部 AI，也没有按量计费的 AI 使用费。不过，某些场景下云端最新 AI 的精度和速度更好，诊断时会公平地对两者进行比较。"
              ]
            }
          ]
        },
        {
          "h": "经验与验证情况（如实说明）",
          "items": [
            {
              "t": "ul",
              "l": [
                "学习和实践 AI 自 2022 年起，约 4 年",
                "目前还没有付费项目的交付实绩",
                "自测结果（虚构的合成数据）：发票金额提取 24/24，内部文档问答 13/13，咨询分类 14/14（严重误分类 0 件）。样本量较小，不代表在您的数据上的精度"
              ]
            },
            {
              "t": "p",
              "l": [
                "全程在线完成。不上门拜访，也不会连接您的 PC 或网络。"
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "委托后请告知",
          "items": [
            {
              "t": "ul",
              "l": [
                "想自动化的业务内容及现行流程（要点式即可）",
                "涉及的文件、数据类型（例：PDF 发票、邮件、Excel）及月度大致件数",
                "各项业务每周大致耗时",
                "目前使用的 PC、软件和 AI 工具",
                "期望的交付时间"
              ]
            },
            {
              "t": "p",
              "l": [
                "不清楚的项目写“不明”即可，我们会在访谈中一起整理。"
              ]
            }
          ]
        },
        {
          "h": "信息处理",
          "items": [
            {
              "t": "ul",
              "l": [
                "无需提供真实数据。如需样本，请将个人信息、机密信息涂黑或替换为虚构数据",
                "文件的传递方式在初次沟通后单独约定",
                "所收到的信息仅用于本服务"
              ]
            }
          ]
        },
        {
          "h": "服务范围",
          "items": [
            {
              "t": "ul",
              "l": [
                "本服务仅包括诊断和报告交付，不含系统搭建",
                "费用与效果数字是基于您提供条件的概算，不保证实际成果",
                "不进行视频会议或电话沟通（以书面访谈为主）",
                "诊断业务超过 5 项时，请使用付费选项",
                "报告中的笔误或事实错误，交付后 7 日内免费修正；方向性的大幅调整另行商议"
              ]
            }
          ]
        },
        {
          "h": "取消",
          "items": [
            {
              "t": "p",
              "l": [
                "取消条件在报价时说明。访谈开始后的处理，请根据工作进展协商。"
              ]
            }
          ]
        }
      ],
      "quote": "诊断为固定价格。涉及搭建，或诊断业务超过 5 项时，请先咨询。请告知 ①目的 ②目标业务 ③数据类型与件数 ④期望时间。请勿填写个人信息和机密信息。",
      "options": [
        {
          "text": "增加 1 项诊断业务（基础价格包含 5 项）",
          "price": 10000
        },
        {
          "text": "基于诊断结果，为 1 项业务制作可运行的演示（使用虚构数据）",
          "price": 40000
        },
        {
          "text": "报告 3 个工作日内交付",
          "price": 10000
        },
        {
          "text": "就报告内容追加 1 轮问答",
          "price": 5000
        }
      ],
      "faq": [
        {
          "q": "需要发送真实数据吗？",
          "a": "不需要。我会根据业务流程以及涉及的文件、数据类型进行诊断。必要时可能请您提供 1–2 份虚构或涂黑的样本，请勿直接发送个人信息和机密信息。"
        },
        {
          "q": "什么是本地 AI？",
          "a": "不把数据发送到云端 AI 服务，而是在您自己的 PC 或服务器上运行的 AI。适用于机密资料或个人信息不能外传的场景。有些业务云端 AI 更合适，我们会在诊断中逐项判断。"
        },
        {
          "q": "会得出“不建议 AI 化”的结论吗？",
          "a": "会。对于件数很少、或出错代价很大的业务，我会建议暂缓 AI 化，或优先使用现有工具。诊断的目的是避免无谓的投入。"
        },
        {
          "q": "只购买诊断可以吗？",
          "a": "可以。仅诊断即可，后续搭建的介绍是可选的，您可以拒绝。"
        },
        {
          "q": "有视频会议说明吗？",
          "a": "没有。访谈和说明都以书面（邮件）进行，记录会保留，便于在公司内共享。报告内容可通过交付后的问答补充。"
        }
      ]
    },
    {
      "id": "build",
      "eyebrow": "02 · BUILD",
      "short": "业务自动化搭建",
      "summary": "把发票、咨询和内部文档的处理，用运行在您自己 PC 上的 AI 自动化。",
      "title": "搭建发票、咨询和文档的 AI 自动化",
      "catch": "没有每月 AI 使用费，AI 在您自己的 PC 上运行",
      "price": 150000,
      "days": 21,
      "lead": [
        "感谢您的关注。我是 Miragea · Eliora，用 AI 把公司里“每月重复的手工活”一项一项自动化。",
        "发票数据的转录、咨询邮件的分类、翻找手册的时间。每一项都很小，但积累起来每月会占用大量时间。本服务会从中选出一项业务，用本地 AI（不把数据发送到云端、在您自己 PC 内运行的 AI）搭建自动化工具。"
      ],
      "sections": [
        {
          "h": "可搭建的自动化（三种类型中任选一种）",
          "items": [
            {
              "t": "p",
              "l": [
                "A. 发票、单据的字段提取：从 PDF、图片中读取日期、客户、金额等并输出为 Excel 或 CSV。识别没把握的字段或金额不一致时，会标注“需确认”。"
              ]
            },
            {
              "t": "p",
              "l": [
                "B. 咨询邮件的分类与分派：判断类别，投诉、紧急等会单独标注为“需确认”。"
              ]
            },
            {
              "t": "p",
              "l": [
                "C. 内部文档问答：基于 PDF、Word 等（约 100 个文件）的内容，附出处回答。资料中没有的内容，会回答“资料中没有”。"
              ]
            }
          ]
        },
        {
          "h": "交付内容",
          "items": [
            {
              "t": "ul",
              "l": [
                "自动化工具整套（含配置文件和源代码）",
                "基于您的样本的精度验证报告",
                "操作手册",
                "交付后 30 天内的问题答疑"
              ]
            },
            {
              "t": "p",
              "l": [
                "由您自己运行时，不产生按量计费的 AI（API）费用。"
              ]
            }
          ]
        },
        {
          "h": "流程（21 天交付）",
          "items": [
            {
              "t": "ol",
              "l": [
                "委托前咨询：了解业务内容、数据格式、件数，说明是否可行及交付方式",
                "收取样本（20–50 件，个人信息涂黑或替换为虚构数据）",
                "搭建与测试",
                "用样本验证精度并报告",
                "交付与操作说明（最多修改 2 次）"
              ]
            }
          ]
        },
        {
          "h": "两种交付方式",
          "items": [
            {
              "t": "cl",
              "l": [
                "① 由我处理：您把数据发给我，我在自己的 PC 内处理并交付结果",
                "② 安装交付：交付工具和手册，由您自己运行。我不会连接您的 PC 或网络（所需 PC 条件会提前告知）"
              ]
            }
          ]
        },
        {
          "h": "为什么用本地 AI",
          "items": [
            {
              "t": "p",
              "l": [
                "客户信息和个人信息无需输入外部 AI 服务。不过，某些场景下云端最新 AI 的精度和速度更好，因此交付前会用样本验证。"
              ]
            }
          ]
        },
        {
          "h": "经验与验证情况",
          "items": [
            {
              "t": "p",
              "l": [
                "学习和实践 AI 自 2022 年起，约 4 年。目前还没有付费项目的交付实绩。自测结果（虚构的合成数据）：A：金额提取 24/24，C：13/13 问正确，B：类别 14/14、严重误分类 0 件。这是少量合成数据上的结果，不保证在您的数据上的精度。"
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "下单前请先咨询",
          "items": [
            {
              "t": "p",
              "l": [
                "我会确认样本格式，说明是否可行及推荐的交付方式。请告知："
              ]
            },
            {
              "t": "ul",
              "l": [
                "想自动化的业务及月度处理件数",
                "数据格式（PDF、图片、邮件、Excel 等）",
                "您的 PC 环境（交付方式②时）",
                "期望的交付时间"
              ]
            },
            {
              "t": "p",
              "l": [
                "只咨询也欢迎。"
              ]
            }
          ]
        },
        {
          "h": "请您准备",
          "items": [
            {
              "t": "ul",
              "l": [
                "样本数据 20–50 件（个人信息、机密信息涂黑或替换为虚构数据）",
                "期望的输出示例（正确答案的样子）"
              ]
            }
          ]
        },
        {
          "h": "信息处理",
          "items": [
            {
              "t": "ul",
              "l": [
                "文件的传递方式在初次沟通后单独约定。请将个人信息、机密信息涂黑或替换为虚构数据",
                "所收到的数据仅用于本次处理，支持期结束后会从我的环境中删除",
                "涉及个人信息或高机密数据时，请事先商议范围"
              ]
            }
          ]
        },
        {
          "h": "范围与注意事项",
          "items": [
            {
              "t": "ul",
              "l": [
                "基础价格包含三种类型中的一种，以及基于样本的验证",
                "多项功能、与外部系统对接、手写体和特殊版式的支持，属于付费选项或另行报价",
                "AI 的输出可能有误。重要业务请务必保留人工最终确认",
                "修改：在约定规格范围内最多 2 次，规格变更另行报价",
                "无法承接大量处理个人信息、需要 24 小时运行或可用性保证、涉及医疗或法律专业判断的业务",
                "交付后的维护与改进（每月 30,000 日元起）另行报价",
                "不上门，也不远程连接您的 PC"
              ]
            }
          ]
        }
      ],
      "quote": "我会确认样本格式，并说明是否可行及适合的交付方式。请告知 ①想自动化的业务 ②月度件数 ③数据格式（PDF、图片、邮件等）④期望时间 ⑤您的 PC 环境（自行运行时）。请勿填写个人信息和机密信息。",
      "options": [
        {
          "text": "追加功能：在 A、B、C 中再增加一种类型",
          "price": 60000
        },
        {
          "text": "追加定制输出字段、分类类别、回答格式",
          "price": 20000
        },
        {
          "text": "制作带截图的操作手册",
          "price": 10000
        },
        {
          "text": "交付后答疑从 30 天延长到 60 天",
          "price": 15000
        },
        {
          "text": "加急交付：14 天内交付",
          "price": 30000
        }
      ],
      "faq": [
        {
          "q": "数据会发送到外部 AI 服务吗？",
          "a": "不会发送到外部的云端 AI 服务。交付方式①中，我在自己的 PC 内用本地 AI 处理您的数据（因此需要把数据发给我）。方式②中由您在自己的环境里运行。"
        },
        {
          "q": "每月需要付费吗？",
          "a": "由您自行运行时（方式②），没有按量计费的 AI（API）费用和服务器费用。您自己 PC 的电费另计。只有需要交付后维护与改进时，才按每月 30,000 日元起另行报价。"
        },
        {
          "q": "方式②需要什么样的 PC？",
          "a": "取决于功能和所用 AI 模型。多数情况下建议配备 GPU，委托前咨询时会说明具体条件。如不满足，会建议采用方式①。"
        },
        {
          "q": "手写文件或复杂表格也能读取吗？",
          "a": "版式不同，精度会下降。基础价格以清晰的 PDF、图片为前提。我会先用样本验证，并提前告知能否处理。"
        },
        {
          "q": "精度如何？",
          "a": "正文中的结果来自自测的合成数据，不保证您的数据能达到同样水平。验证结果会以数字形式写入报告交付给您。"
        }
      ]
    },
    {
      "id": "poc",
      "eyebrow": "03 · POC",
      "short": "内部文档 AI 验证（PoC）",
      "summary": "基于您自己的文档实测，再决定是否引入的内部文档问答 AI。",
      "title": "搭建基于内部文档回答的 AI 验证版（PoC）",
      "catch": "附出处回答，“资料中没有”的情形也会实测",
      "price": 300000,
      "days": 45,
      "lead": [
        "感谢您的关注。我是 Miragea · Eliora。",
        "“想用 AI 检索公司的规章、手册和过往资料，但把机密文档放进云端 AI 不放心。”针对这样的企业，我用本地 AI 搭建验证版（PoC），在正式引入前用您自己的文档，以数字确认它是否真的可用。"
      ],
      "sections": [
        {
          "h": "本 PoC 的内容",
          "items": [
            {
              "t": "ol",
              "l": [
                "整理目标业务和文档（例：公司规章的咨询应答）",
                "与您一起制作评估用问题集（30–50 题）",
                "用本地 AI（llama.cpp＋开放 AI 模型）搭建检索文档并附出处回答的 AI；资料中没有的内容，回答“资料中没有”",
                "用您的文档测量精度（正确、错误，以及应回答“资料中没有”的问题的处理）",
                "提交评估报告（含错误倾向与改进建议）和正式引入时的架构、费用、运维方案；并根据结果告知适合“正式引入、暂缓，还是与云端并用”"
              ]
            }
          ]
        },
        {
          "h": "基础价格包含",
          "items": [
            {
              "t": "ul",
              "l": [
                "一项目标业务，约 200 个文件以内（PDF、Word、文本等）",
                "可在浏览器使用的简易聊天界面",
                "评估报告（PDF）和引入方案书",
                "配置文件整套与操作手册",
                "交付后 30 天内的问题答疑"
              ]
            },
            {
              "t": "p",
              "l": [
                "交付周期约为 45 天。"
              ]
            }
          ]
        },
        {
          "h": "想扩大范围时",
          "items": [
            {
              "t": "p",
              "l": [
                "追加目标业务或文档量、与发票提取或咨询分类组合，可通过付费选项追加。大规模搭建或包含正式运行的，请咨询后另行报价。"
              ]
            }
          ]
        },
        {
          "h": "交付方式",
          "items": [
            {
              "t": "cl",
              "l": [
                "① 在我的 PC 上搭建并评估，交付结果与环境整套",
                "② 交付可由您自行运行的安装包和手册（PC 条件会提前告知）"
              ]
            },
            {
              "t": "p",
              "l": [
                "无论哪种方式，我都不上门，也不会连接您的 PC 或网络。"
              ]
            }
          ]
        },
        {
          "h": "为什么用本地 AI",
          "items": [
            {
              "t": "ul",
              "l": [
                "可以做到不把内部文档输入外部 AI 服务",
                "没有按量计费的 AI（API）费用",
                "另一方面，云端大规模 AI 在精度和速度上可能更好。我会在 PoC 中实测，不适合时会在报告中写明"
              ]
            }
          ]
        },
        {
          "h": "经验与验证情况",
          "items": [
            {
              "t": "p",
              "l": [
                "学习和实践 AI 自 2022 年起，约 4 年。目前还没有付费项目的交付实绩。自测结果（虚构的合成数据）：内部文档问答 13/13，发票金额提取 24/24，咨询分类 14/14（严重误分类 0 件）。样本量较小，无法保证您的文档上会达到同样精度，所以才要在 PoC 中用您的文档来测量。"
              ]
            }
          ]
        }
      ],
      "reqLead": [],
      "reqSections": [
        {
          "h": "下单前请务必先咨询",
          "items": [
            {
              "t": "p",
              "l": [
                "PoC 的内容会因文档的数量、类型和机密程度而不同。请告知："
              ]
            },
            {
              "t": "ul",
              "l": [
                "目的与目标业务（例：公司规章的咨询应答）",
                "文档类型、文件数、总容量，是否机密",
                "预计使用人数、期望时间、预算范围",
                "如希望自行运行（方式②）：PC、GPU 等环境"
              ]
            }
          ]
        },
        {
          "h": "信息处理",
          "items": [
            {
              "t": "ul",
              "l": [
                "文档的传递方式在初次沟通后单独约定。请将个人信息、机密信息涂黑或替换为虚构数据",
                "文档仅用于评估，支持期结束后会从我的环境中删除",
                "涉及个人信息或高机密文档时，建议先用虚构数据或部分摘录做 PoC",
                "如需签订保密协议（NDA），请事先说明"
              ]
            }
          ]
        },
        {
          "h": "范围与注意事项",
          "items": [
            {
              "t": "ul",
              "l": [
                "本服务为验证版（PoC），不保证正式运行时的稳定性与可用性",
                "AI 的回答可能有误，精度数字仅为验证时点的结果",
                "修改：在约定规格范围内最多 2 次，规格变更或范围追加另行报价",
                "PoC 后的维护与改进（每月 30,000 日元起）另行报价",
                "无法承接大量处理个人信息、需要 24 小时运行或可用性保证、涉及医疗或法律专业判断的业务",
                "不上门，也不远程连接您的 PC"
              ]
            }
          ]
        }
      ],
      "quote": "PoC 的费用会因内容而异。请告知 ①目的与目标业务 ②文档类型、文件数、总容量 ③是否机密 ④预计使用人数 ⑤期望时间与预算范围。请勿填写个人信息和机密信息本身。",
      "options": [
        {
          "text": "追加 1 项目标业务（含问题集与精度评估）",
          "price": 150000
        },
        {
          "text": "追加 200 个目标文档",
          "price": 50000
        },
        {
          "text": "追加发票提取或咨询分类的验证（组合）",
          "price": 80000
        },
        {
          "text": "制作面向正式引入的设计文档（架构、运维、安全）",
          "price": 50000
        },
        {
          "text": "交付后答疑从 30 天延长到 60 天",
          "price": 25000
        },
        {
          "text": "加急交付：30 天内交付",
          "price": 50000
        }
      ],
      "faq": [
        {
          "q": "什么是 PoC？",
          "a": "PoC（概念验证）是在正式引入前，以小范围实际运行来确认效果和精度的验证。可以依据数字，判断是继续推进还是暂缓。"
        },
        {
          "q": "精度会不会不如云端 AI？",
          "a": "一般而言，本地 AI 使用的模型比云端的大规模 AI 小，不同业务在精度和速度上可能有差距。PoC 会用您的文档测量，如果本地 AI 不适合，会在报告中写明。"
        },
        {
          "q": "可以发送机密文档吗？",
          "a": "传递方式在初次沟通后单独约定。机密性高的文档，建议先用虚构数据或部分摘录做 PoC。收到的文档仅用于评估。"
        },
        {
          "q": "什么情况下金额会高于基础价格？",
          "a": "追加目标业务或文档量，或与其他功能组合时。可通过付费选项追加；更大规模的，咨询后另行报价。"
        },
        {
          "q": "PoC 之后可以委托维护吗？",
          "a": "可以。维护与改进（每月 30,000 日元起）另行报价。"
        }
      ]
    }
  ]
};
