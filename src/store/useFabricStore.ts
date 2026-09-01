import { create } from "zustand";

export interface FabricMaterial {
  id: string;
  name: string;
  textureUrl: string | null;
  scaleFactor: number;
  roughness: number;
}

export interface FabricState {
  currentFabric: FabricMaterial;
  setFabricTexture: (url: string, name: string) => void;
  updateFabricProps: (props: Partial<FabricMaterial>) => void;
}

export const useFabricStore = create<FabricState>((set) => ({
  currentFabric: {
    id: "default-cotton",
    name: "小田原ミシン特選 生成りコットン",
    textureUrl: null,
    scaleFactor: 1.0,
    roughness: 0.5,
  },

  setFabricTexture: (textureUrl, name) =>
    set((state) => ({
      currentFabric: {
        ...state.currentFabric,
        textureUrl,
        name,
      },
    })),

  updateFabricProps: (props) =>
    set((state) => ({
      currentFabric: {
        ...state.currentFabric,
        ...props,
      },
    })),
}));
