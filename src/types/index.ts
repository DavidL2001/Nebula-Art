// ─── Art Generation ──────────────────────────────────────────────
export type ArtStyle =
  | 'cyberpunk'
  | 'impressionist'
  | 'surreal'
  | 'minimalist'
  | 'abstract'
  | 'neon-noir'
  | 'cosmic';

export type ArtMood =
  | 'energetic'
  | 'melancholic'
  | 'mysterious'
  | 'serene'
  | 'chaotic'
  | 'ethereal';

export interface ArtParameters {
  prompt: string;
  style: ArtStyle;
  mood: ArtMood;
  hue: number;           // 0–360
  complexity: number;    // 0–100
  animationIntensity: number; // 0–100
  saturation: number;    // 0–100
  brightness: number;    // 0–100
}

export interface GeneratedArtwork {
  id: string;
  parameters: ArtParameters;
  createdAt: number;
  thumbnail?: string;    // base64 PNG
}

export interface GeneratorState {
  status: 'idle' | 'parsing' | 'generating' | 'done' | 'error';
  progress: number;      // 0–100
  error?: string;
}

// ─── Gallery ─────────────────────────────────────────────────────
export interface GalleryItem extends GeneratedArtwork {
  title?: string;
  liked?: boolean;
}

// ─── UI ──────────────────────────────────────────────────────────
export type NeonColor = 'cyan' | 'magenta' | 'violet' | 'gold';
