/**
 * Prompt parser – extracts semantic signals from user text.
 * Phase 1: keyword-based. Phase 2: TF.js embeddings (scaffold ready).
 */

import type { ArtParameters, ArtStyle, ArtMood } from '../../types';

interface ParsedSignals {
  dominantColors: number[];   // hue values
  suggestedStyle?: ArtStyle;
  suggestedMood?: ArtMood;
  complexity: number;
  keywords: string[];
}

const STYLE_KEYWORDS: Record<ArtStyle, string[]> = {
  cyberpunk:      ['cyber', 'neon', 'city', 'urban', 'dystopia', 'tech', 'rain', 'tokyo', 'blade'],
  impressionist:  ['impressi', 'monet', 'brush', 'stroke', 'light', 'garden', 'soft'],
  surreal:        ['surreal', 'dream', 'dali', 'melting', 'strange', 'bizarre', 'fantasy'],
  minimalist:     ['minimal', 'simple', 'clean', 'zen', 'sparse', 'empty', 'void'],
  abstract:       ['abstract', 'chaos', 'pattern', 'geometric', 'fractal', 'shape'],
  'neon-noir':    ['noir', 'dark', 'shadow', 'mystery', 'detective', 'crime', 'gritty'],
  cosmic:         ['space', 'galaxy', 'star', 'nebula', 'cosmos', 'universe', 'planet', 'aurora'],
};

const MOOD_KEYWORDS: Record<ArtMood, string[]> = {
  energetic:   ['energi', 'power', 'explosion', 'fast', 'wild', 'intense', 'fire'],
  melancholic: ['sad', 'lonely', 'empty', 'melanchol', 'sorrow', 'rain', 'grey'],
  mysterious:  ['mystery', 'secret', 'hidden', 'dark', 'unknown', 'mist', 'fog'],
  serene:      ['calm', 'peace', 'still', 'quiet', 'gentle', 'soft', 'zen'],
  chaotic:     ['chaos', 'wild', 'random', 'storm', 'turbulent', 'explosion'],
  ethereal:    ['angel', 'heaven', 'light', 'glow', 'divine', 'spirit', 'float', 'cloud'],
};

const COLOR_MAP: [string[], number][] = [
  [['red','fire','blood','rose','crimson'],   0],
  [['orange','sunset','warm','amber'],        30],
  [['yellow','gold','sun','bright'],          55],
  [['green','forest','nature','emerald'],     120],
  [['cyan','teal','ocean','aqua'],            185],
  [['blue','sky','water','ice','cold'],       220],
  [['violet','purple','lavender','magenta'],  280],
  [['pink','rose','blossom','cherry'],        330],
];

function scoreKeywords(text: string, map: Record<string, string[]>): [string, number][] {
  const lower = text.toLowerCase();
  return Object.entries(map).map(([key, words]) => [
    key,
    words.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0),
  ]);
}

export function parsePrompt(prompt: string): ParsedSignals {
  const lower = prompt.toLowerCase();
  const words = lower.split(/\s+/);

  // Style
  const styleScores = scoreKeywords(prompt, STYLE_KEYWORDS as Record<string, string[]>);
  const topStyle = styleScores.sort((a, b) => (b[1] as number) - (a[1] as number))[0];
  const suggestedStyle = (topStyle[1] as number) > 0 ? topStyle[0] as ArtStyle : undefined;

  // Mood
  const moodScores = scoreKeywords(prompt, MOOD_KEYWORDS as Record<string, string[]>);
  const topMood = moodScores.sort((a, b) => (b[1] as number) - (a[1] as number))[0];
  const suggestedMood = (topMood[1] as number) > 0 ? topMood[0] as ArtMood : undefined;

  // Colors
  const dominantColors = COLOR_MAP
    .filter(([kws]) => kws.some((kw) => lower.includes(kw)))
    .map(([, hue]) => hue as number);

  // Complexity – longer, more detailed prompts → higher complexity
  const complexity = Math.min(100, 30 + words.length * 3);

  return {
    dominantColors: dominantColors.length ? dominantColors : [260],
    suggestedStyle,
    suggestedMood,
    complexity,
    keywords: words.filter((w) => w.length > 3),
  };
}

/** Apply parsed signals to current params (non-destructively) */
export function applySignals(
  params: ArtParameters,
  signals: ParsedSignals
): Partial<ArtParameters> {
  const patch: Partial<ArtParameters> = {};

  if (signals.suggestedStyle) patch.style = signals.suggestedStyle;
  if (signals.suggestedMood)  patch.mood  = signals.suggestedMood;
  if (signals.dominantColors.length) {
    patch.hue = signals.dominantColors[0];
  }
  patch.complexity = Math.round((params.complexity + signals.complexity) / 2);

  return patch;
}
const SURPRISE_COLORS = [
  'red', 'orange', 'golden', 'green', 'cyan', 'blue', 'violet', 'pink', 'white', 'crimson'
];

const SURPRISE_THEMES: Record<string, string[]> = {
  cyberpunk:     ['cyberpunk city', 'neon rain', 'tokyo night', 'blade runner'],
  cosmic:        ['deep space', 'galaxy spiral', 'nebula storm', 'aurora'],
  surreal:       ['melting clocks', 'dreamscape', 'impossible geometry', 'dali vision'],
  minimalist:    ['zen void', 'single light', 'empty horizon', 'pure form'],
  impressionist: ['golden sunset', 'monet garden', 'soft brushstrokes', 'warm light'],
  abstract:      ['chaos waves', 'electric flow', 'fractal energy', 'color explosion'],
  'neon-noir':   ['rainy detective', 'shadow figure', 'dark alley', 'film noir'],
};

export function generateSurprisePrompt(): { prompt: string; style: ArtStyle } {
  const styles = Object.keys(SURPRISE_THEMES) as ArtStyle[];
  const style  = styles[Math.floor(Math.random() * styles.length)];
  const themes = SURPRISE_THEMES[style];
  const theme  = themes[Math.floor(Math.random() * themes.length)];
  const color  = SURPRISE_COLORS[Math.floor(Math.random() * SURPRISE_COLORS.length)];
  return { prompt: `${color} ${theme}`, style };
}
