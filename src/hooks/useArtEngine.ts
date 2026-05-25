import { useRef, useEffect, useCallback } from 'react';
import { ArtEngine } from '../features/generator/artEngine';
import { useGeneratorStore } from '../store';
import type { ArtParameters } from '../types';

export function useArtEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const engineRef = useRef<ArtEngine | null>(null);
  const { setGeneratorState, setCurrentArtwork } = useGeneratorStore();

  useEffect(() => {
    return () => { engineRef.current?.destroy(); };
  }, []);

  const generate = useCallback(async (p: ArtParameters) => {
    if (!canvasRef.current) return;

    setGeneratorState({ status: 'parsing', progress: 10 });
    await new Promise(r => setTimeout(r, 300));

    setGeneratorState({ status: 'generating', progress: 40 });
    await new Promise(r => setTimeout(r, 400));

    try {
      if (!engineRef.current) {
        engineRef.current = new ArtEngine(canvasRef.current);
      }

      setGeneratorState({ progress: 70 });
      engineRef.current.render(p);

      setGeneratorState({ progress: 100 });
      await new Promise(r => setTimeout(r, 200));

      const artwork = {
        id: crypto.randomUUID(),
        parameters: { ...p },
        createdAt: Date.now(),
      };
      setCurrentArtwork(artwork);
      setGeneratorState({ status: 'done', progress: 100 });
    } catch (err) {
      setGeneratorState({ status: 'error', error: String(err) });
    }
  }, [canvasRef, setGeneratorState, setCurrentArtwork]);

  const snapshot = useCallback(() => {
    return engineRef.current?.snapshot();
  }, []);

  return { generate, snapshot };
}
