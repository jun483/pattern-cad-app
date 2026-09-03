// src/constants/copywriting.ts
//初心者用解説、プロ用専門用語、UIのステータス文言を統一
export type UserMode = "beginner" | "pro";
export type CategoryType = "human" | "doll" | "pet" | "cosplay";

export interface UIOMessage {
  title: string;
  description: string;
  actionLabel: string;
}

/**
 * 小田原ミシン プロフェッショナル・スイートの言語化定義（コピードキュメント）
 */
export const APP_COPYWRITING = {
  brand: {
    name: "小田原ミシン Professional Suite",
    subtitle: "Odawara Sewing Cinema CAD",
    version: "v1.0.0",
    storeName: "小田原ミシン",
  },

  // カテゴリー別の表示名とコンセプト説明
  categories: {
    human: {
      label: "人間用 (Human)",
      tagline:
        "文化式新原型をベースにした、身体に美しく沿う本格アパレルパターン",
      defaultItem: "テーラードジャケット / シャツ / パンツ",
    },
    doll: {
      label: "ドール服 (Doll CAD)",
      tagline: "1/1〜1/16スケール対応。微細な縫い代と精密なスケール縮小設計",
      defaultItem: "1/6ドール用 ワンピース / コート",
    },
    pet: {
      label: "ペット服 (Pet CAD)",
      tagline: "犬種ごとの胸囲・着丈の体型特徴に合わせた立体カーブ設計",
      defaultItem: "小型犬用 タンク / 立体立体コート",
    },
    cosplay: {
      label: "コスプレ造形 (CosForm)",
      tagline: "全円スカート・サーキュラー、EVAフォーム用の展開図・多面体計算",
      defaultItem: "全円パニエ / 3Dアーマー展開図",
    },
  },

  // モード別のUIガイドメッセージ
  modeGuides: {
    beginner: {
      title: "はじめてのパターン作図サポート",
      hint: "「バスト」や「背丈」などの簡単な数字を入れるだけで、定番の型紙が自動で完成します。迷ったらまずはこのモードから！",
    },
    pro: {
      title: "プロ仕様 高精度CADグリッド＆アパレルエンジニアリング",
      hint: "ミリ単位の自由作図、ダーツ移動、合印（ノッチ）制御、JUKI工業用ミシン対応の縫い代・コーナー処理を完全制御。",
    },
  },

  // 自動生成される「縫製仕様書（Spec Sheet）」のテンプレート文言
  specSheetDefaults: {
    header: "【アパレル生産・縫製仕様書】",
    notes:
      "※小田原ミシン自動計算エンジンによる算出値です。縫製前に実際の生地でのトワル組み（仮縫い）を推奨します。",
    threads: "推奨糸：スパン糸 #60（一般的な布地用） / 厚手の場合は #30",
    seamAllowance:
      "標準縫い代：直線部分 1.0cm / 衿・曲線部分 0.8cm（工業用自動ノッチ付与）",
  },
};

/**
 * 現在のモードや状況に応じたダイナミックメッセージを取得するヘルパー
 */
export function getLocalizedGuide(mode: UserMode, category: CategoryType) {
  const catInfo = APP_COPYWRITING.categories[category];
  const modeInfo = APP_COPYWRITING.modeGuides[mode];

  return {
    categoryLabel: catInfo.label,
    categoryTagline: catInfo.tagline,
    modeTitle: modeInfo.title,
    modeHint: modeInfo.hint,
  };
}
