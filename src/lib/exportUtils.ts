/**
 * Export utilities – PNG download + clipboard copy
 */

export function downloadPng(dataUrl: string, filename = 'nebula-art'): void {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}-${timestamp}.png`;
  a.click();
}

export function copyToClipboard(dataUrl: string): Promise<void> {
  return fetch(dataUrl)
    .then(r => r.blob())
    .then(blob => {
      const item = new ClipboardItem({ 'image/png': blob });
      return navigator.clipboard.write([item]);
    });
}

/** Watermark-stamped export */
export function exportWithWatermark(sourceCanvas: HTMLCanvasElement): string {
  const out = document.createElement('canvas');
  out.width  = sourceCanvas.width;
  out.height = sourceCanvas.height;
  const ctx = out.getContext('2d')!;

  ctx.drawImage(sourceCanvas, 0, 0);

  // Subtle watermark
  ctx.font = `${Math.floor(out.width * 0.018)}px monospace`;
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.textAlign = 'right';
  ctx.fillText('✦ NEBULA ART', out.width - 16, out.height - 12);

  return out.toDataURL('image/png');
}
