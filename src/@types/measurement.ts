export type UserMode = "beginner" | "pro";
export type UnitSystem = "mm" | "cm" | "inch";

// 人間用採寸
export interface HumanMeasurements {
  height: number; // 身長
  bust: number; // バスト
  waist: number; // ウエスト
  hip: number; // ヒップ
  backLength: number; // 背丈
  shoulderWidth: number; // 肩幅
  armhole: number; // アームホール
  sleeveLength: number; // 袖丈
  neckGirth: number; // 首周り
}

// ドール用採寸（1/1, 1/3, 1/4, 1/6対応）
export interface DollMeasurements {
  scale: "1:1" | "1:3" | "1:4" | "1:6";
  dollHeight: number;
  bust: number;
  waist: number;
  hip: number;
  shoulderWidth: number;
  armLength: number;
  legLength: number;
}

// ペット用採寸（犬猫対応）
export interface PetMeasurements {
  petType: "small-dog" | "medium-dog" | "large-dog" | "cat";
  neckGirth: number; // 首回り
  chestGirth: number; // 胸回り（一番太い部分）
  bodyLength: number; // 背の長さ（首の付け根から尻尾まで）
  weight: number; // 体重 (参考用)
}

// 統合採寸ステート
export interface MeasurementState {
  userMode: UserMode;
  unitSystem: UnitSystem;
  human: HumanMeasurements;
  doll: DollMeasurements;
  pet: PetMeasurements;
}
