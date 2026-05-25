import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArtParameters, GeneratedArtwork, GeneratorState, GalleryItem } from '../types';

// ─── Default parameters ──────────────────────────────────────────
const DEFAULT_PARAMS: ArtParameters = {
  prompt: '',
  style: 'cyberpunk',
  mood: 'mysterious',
  hue: 260,
  complexity: 60,
  animationIntensity: 50,
  saturation: 75,
  brightness: 65,
};

// ─── Generator store ─────────────────────────────────────────────
interface GeneratorStore {
  params: ArtParameters;
  generatorState: GeneratorState;
  currentArtwork: GeneratedArtwork | null;

  setParam: <K extends keyof ArtParameters>(key: K, value: ArtParameters[K]) => void;
  setParams: (params: Partial<ArtParameters>) => void;
  setGeneratorState: (state: Partial<GeneratorState>) => void;
  setCurrentArtwork: (artwork: GeneratedArtwork | null) => void;
  randomize: () => void;
}

export const useGeneratorStore = create<GeneratorStore>()((set) => ({
  params: DEFAULT_PARAMS,
  generatorState: { status: 'idle', progress: 0 },
  currentArtwork: null,

  setParam: (key, value) =>
    set((s) => ({ params: { ...s.params, [key]: value } })),

  setParams: (params) =>
    set((s) => ({ params: { ...s.params, ...params } })),

  setGeneratorState: (state) =>
    set((s) => ({ generatorState: { ...s.generatorState, ...state } })),

  setCurrentArtwork: (artwork) => set({ currentArtwork: artwork }),

  randomize: () =>
    set({
      params: {
        ...DEFAULT_PARAMS,
        hue: Math.floor(Math.random() * 360),
        complexity: Math.floor(Math.random() * 100),
        animationIntensity: Math.floor(Math.random() * 100),
        saturation: 50 + Math.floor(Math.random() * 50),
        brightness: 40 + Math.floor(Math.random() * 50),
        style: (['cyberpunk','impressionist','surreal','minimalist','abstract','neon-noir','cosmic'] as const)[
          Math.floor(Math.random() * 7)
        ],
        mood: (['energetic','melancholic','mysterious','serene','chaotic','ethereal'] as const)[
          Math.floor(Math.random() * 6)
        ],
      },
    }),
}));

// ─── Gallery store (persisted) ───────────────────────────────────
interface GalleryStore {
  items: GalleryItem[];
  addItem: (item: GeneratedArtwork) => void;
  removeItem: (id: string) => void;
  toggleLike: (id: string) => void;
  updateTitle: (id: string, title: string) => void;
}

export const useGalleryStore = create<GalleryStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((s) => ({ items: [{ ...item }, ...s.items].slice(0, 50) })),

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      toggleLike: (id) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, liked: !i.liked } : i)),
        })),

      updateTitle: (id, title) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, title } : i)),
        })),
    }),
    { name: 'nebula-gallery' }
  )
);
