// カテゴリID（アパレル・小物・特殊造形を網羅）
export type CategoryId =
  | "kids"
  | "womens"
  | "mens"
  | "pets"
  | "doll"
  | "cosplay"
  | "free";

// アイテムID（アパレル衣料を中心に全展開）
export type ItemId =
  // キッズ・一般定番小物
  | "lesson-bag"
  | "shoe-bag"
  | "pouch"
  | "tote"
  | "knapsack"
  | "bento-bag"
  | "drawstring"
  // 本格アパレル・ウェア系
  | "cultural-bodice" // 文化式新原型（身頃）
  | "basic-shirt" // 基本のシャツ・ブラウス
  | "basic-pants" // 基本のストレートパンツ
  | "basic-skirt" // 基本のタイト・フレアスカート
  | "one-piece" // クラシック・ワンピース
  | "tailored-jacket" // テーラードジャケット
  // ドール系 (1/1, 1/3, 1/4, 1/6)
  | "doll-dress"
  | "doll-blouse"
  | "doll-pants"
  // ペット系
  | "pet-tanktop"
  | "pet-coat"
  // コスプレ・造形
  | "full-circle-skirt"
  | "cone-armor"
  | "polyhedron-prop"
  // 自由作図
  | "free-drawing";

// モジュールID（機能・サブビュー・書き出し単位）
export type ModuleId =
  | "mod-auth" // ライセンス・認証モジュール
  | "mod-sidebar" // パラメータ・モード制御
  | "mod-canvas-2d" // 2D魔法の型紙エンジン
  | "mod-viewer-3d" // 3Dトルソー着せ替え
  | "mod-nesting" // 自動生地ネステイング（映画館風ビュー）
  | "mod-grading" // サイズ自動グレーディング
  | "mod-spec-sheet" // 縫製仕様書・レシピ自動生成
  | "mod-dxf-exporter" // DXFデータ変換
  | "mod-pdf-generator"; // PDF/SVG印刷・出力
