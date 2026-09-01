export interface PlacedPart {
  instanceId: string;
  partId: string;
  partName: string;
  x: number;
  y: number;
  rotation: number;
  isFlipped: boolean;
  bounds: { width: number; height: number };
}

export interface FabricRoll {
  name: string;
  width: number;
  length: number;
}

export interface CinematicNestLayout {
  fabricWidth: number;
  totalEfficiency: number;
  placedParts: PlacedPart[];
  unplacedPartIds: string[];
}
