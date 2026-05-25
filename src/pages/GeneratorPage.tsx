import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/ui/Navbar';
import GlassCard from '../components/ui/GlassCard';
import NeonButton from '../components/ui/NeonButton';
import PromptInput from '../components/controls/PromptInput';
import StylePicker from '../components/controls/StylePicker';
import NeonSlider from '../components/controls/NeonSlider';
import ArtCanvas from '../components/canvas/ArtCanvas';
import ParticleBackground from '../components/canvas/ParticleBackground';
import FullscreenModal from '../components/ui/FullscreenModal';
import { useGeneratorStore, useGalleryStore } from '../store';
import { useArtEngine } from '../hooks/useArtEngine';
import { parsePrompt, applySignals, generateSurprisePrompt } from '../lib/tfjs/promptParser';
import { downloadPng, exportWithWatermark } from '../lib/exportUtils';
import type { ArtStyle, ArtMood } from '../types';
import styles from './GeneratorPage.module.scss';

export default function GeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { params, setParam, setParams, generatorState, currentArtwork, randomize } = useGeneratorStore();
  const { addItem } = useGalleryStore();
  const { generate, snapshot } = useArtEngine(canvasRef);
  const [fullscreen, setFullscreen] = useState(false);

  const isGenerating = generatorState.status === 'parsing' || generatorState.status === 'generating';
  const isDone = generatorState.status === 'done';

  const handleGenerate = async () => {
    if (!params.prompt.trim()) return;
    const signals = parsePrompt(params.prompt);
    const patch = applySignals(params, signals);
    setParams(patch);
    await generate({ ...params, ...patch });
  };

  const handleSave = () => {
    if (!currentArtwork) return;
    const thumb = canvasRef.current ? exportWithWatermark(canvasRef.current) : snapshot();
    addItem({ ...currentArtwork, thumbnail: thumb });
  };

  const handleExport = () => {
    if (!canvasRef.current) return;
    downloadPng(exportWithWatermark(canvasRef.current), `nebula-${params.style}`);
  };

  const getThumbnail = () =>
    canvasRef.current ? canvasRef.current.toDataURL('image/png') : '';

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.bgGrid} />
      <ParticleBackground />

      <main className={styles.main}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>✦</span> NEBULA ART
          </h1>
          <p className={styles.subtitle}>AI-driven generativ konstgenerator</p>
        </motion.header>

        <div className={styles.layout}>
          {/* LEFT – Controls */}
          <motion.aside
            className={styles.controls}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard glow="cyan">
              <p className={styles.cardLabel}>PROMPT</p>
              <PromptInput
                value={params.prompt}
                onChange={(v) => setParam('prompt', v)}
                onGenerate={handleGenerate}
              />
            </GlassCard>

            <GlassCard glow="violet">
              <p className={styles.cardLabel}>STIL & MOOD</p>
              <StylePicker
                selectedStyle={params.style as ArtStyle}
                selectedMood={params.mood as ArtMood}
                onStyleChange={(s) => setParam('style', s)}
                onMoodChange={(m) => setParam('mood', m)}
              />
            </GlassCard>

            <GlassCard>
              <p className={styles.cardLabel}>PARAMETRAR</p>
              <div className={styles.sliders}>
                <NeonSlider label="Nyans (Hue)"          value={params.hue}               min={0} max={360} onChange={(v) => setParam('hue', v)}              color="cyan"    unit="°" />
                <NeonSlider label="Komplexitet"          value={params.complexity}                           onChange={(v) => setParam('complexity', v)}         color="magenta"         />
                <NeonSlider label="Animationsintensitet" value={params.animationIntensity}                   onChange={(v) => setParam('animationIntensity', v)} color="violet"          />
                <NeonSlider label="Mättnad"              value={params.saturation}                           onChange={(v) => setParam('saturation', v)}         color="gold"            />
                <NeonSlider label="Ljusstyrka"           value={params.brightness}                           onChange={(v) => setParam('brightness', v)}         color="cyan"            />
              </div>
            </GlassCard>
          </motion.aside>

          {/* RIGHT – Canvas */}
          <motion.section
            className={styles.canvasSection}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ArtCanvas canvasRef={canvasRef} />

            <div className={styles.actions}>
              <NeonButton color="cyan" size="lg" onClick={handleGenerate} loading={isGenerating} disabled={!params.prompt.trim()}>
                {isGenerating ? 'Genererar...' : '✦ Generera'}
              </NeonButton>

              <NeonButton color="violet" variant="outline" onClick={() => {
  const { prompt, style } = generateSurprisePrompt();
  randomize();
  setParams({ style, prompt });
}}disabled={isGenerating}>
                ◈ Surprise Me
              </NeonButton>

              {isDone && (
                <>
                  <NeonButton color="magenta" variant="outline" onClick={handleSave}>
                    ◎ Spara
                  </NeonButton>
                  <NeonButton color="gold" variant="outline" onClick={handleExport}>
                    ↓ PNG
                  </NeonButton>
                  <NeonButton color="cyan" variant="ghost" onClick={() => setFullscreen(true)}>
                    ⊕ Fullscreen
                  </NeonButton>
                </>
              )}
            </div>

            {isDone && (
              <motion.div
                className={styles.statsBar}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>Stil: <b>{params.style}</b></span>
                <span>Mood: <b>{params.mood}</b></span>
                <span>Hue: <b>{params.hue}°</b></span>
                <span>Komplexitet: <b>{params.complexity}</b></span>
              </motion.div>
            )}
          </motion.section>
        </div>
      </main>

      {fullscreen && isDone && (
        <FullscreenModal
          thumbnailUrl={getThumbnail()}
          artStyle={params.style}
          artMood={params.mood}
          prompt={params.prompt}
          onClose={() => setFullscreen(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
}
