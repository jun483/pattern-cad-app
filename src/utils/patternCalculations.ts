// src/utils/patternCalculations.ts
export const PATTERN_CONSTANTS = {
  APPAREL: {
    baseWidth: 220,
    standardBust: 88,
    multiplier: 4.0,
  },
  PET: {
    baseWidth: 160,
    standardBust: 88,
    multiplier: 2.5,
  },
  DEFAULT: {
    baseWidth: 250,
    standardBust: 88,
    multiplier: 4.5,
  },
} as const;

export function calculateBaseWidth(
  bust: number,
  activeCategory: string,
): number {
  const isPet = activeCategory.includes("pet");
  const isApparel = !isPet;

  if (isApparel) {
    return (
      PATTERN_CONSTANTS.APPAREL.baseWidth +
      (bust - PATTERN_CONSTANTS.APPAREL.standardBust) *
        PATTERN_CONSTANTS.APPAREL.multiplier
    );
  }
  if (isPet) {
    return (
      PATTERN_CONSTANTS.PET.baseWidth +
      (bust - PATTERN_CONSTANTS.PET.standardBust) *
        PATTERN_CONSTANTS.PET.multiplier
    );
  }
  return (
    PATTERN_CONSTANTS.DEFAULT.baseWidth +
    (bust - PATTERN_CONSTANTS.DEFAULT.standardBust) *
      PATTERN_CONSTANTS.DEFAULT.multiplier
  );
}
