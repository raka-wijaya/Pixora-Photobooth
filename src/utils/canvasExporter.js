/**
 * Pixel-Perfect HTML5 2D Canvas Exporter for Photobooth Strip
 * Renders all rich aesthetic frame themes (Ruby Scrapbook, Red Gingham Bow, Kawaii Doodle, Pearl Coquette).
 */

export const generatePhotoboothCanvas = async ({
  photos = [],
  template,
  frameStyle,
  borderColor,
  filterId = 'normal',
  stickers = [],
  showDate = true,
  dateStr = new Date().toLocaleDateString('id-ID')
}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const photoCount = template.photoCount || 3;
  const isGrid2x2 = template.id === 'grid-2x2';
  const isCollage6 = template.id === 'collage-6';
  const decorativeStyle = frameStyle?.decorative;

  let canvasWidth = 800;
  let canvasHeight = 2400;

  if (isGrid2x2) {
    canvasWidth = 1200;
    canvasHeight = 1350;
  } else if (isCollage6) {
    canvasWidth = 1200;
    canvasHeight = 1800;
  } else if (photoCount === 4) {
    canvasHeight = 3100;
  } else if (photoCount === 3) {
    canvasHeight = 2400;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // 1. Draw Background Color / Base
  const bg = borderColor || frameStyle?.bg || '#800020';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Background Pattern overlays (Gingham or Polka dots)
  if (decorativeStyle === 'red-gingham-bow') {
    ctx.save();
    ctx.fillStyle = '#D32F2F1F';
    const checkSize = 40;
    for (let x = 0; x < canvasWidth; x += checkSize * 2) {
      for (let y = 0; y < canvasHeight; y += checkSize * 2) {
        ctx.fillRect(x, y, checkSize, checkSize);
        ctx.fillRect(x + checkSize, y + checkSize, checkSize, checkSize);
      }
    }
    ctx.restore();
  } else if (decorativeStyle === 'kawaii-doodle') {
    ctx.save();
    ctx.fillStyle = '#FDE04740';
    const radius = 10;
    for (let x = 30; x < canvasWidth; x += 60) {
      for (let y = 30; y < canvasHeight; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  } else if (decorativeStyle === 'pink-sanrio-gingham') {
    // Pink gingham checkered background
    ctx.save();
    ctx.fillStyle = '#FECDD380';
    const checkSize = 28;
    for (let x = 0; x < canvasWidth; x += checkSize * 2) {
      for (let y = 0; y < canvasHeight; y += checkSize * 2) {
        ctx.fillRect(x, y, checkSize, checkSize);
        ctx.fillRect(x + checkSize, y + checkSize, checkSize, checkSize);
      }
    }
    ctx.restore();
  }

  // 2. Load Photos
  const loadedImages = await Promise.all(
    photos.map((src) => {
      return new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    })
  );

  const getFilterStyle = (fId) => {
    switch (fId) {
      case 'bw': return 'grayscale(100%) contrast(110%)';
      case 'sepia': return 'sepia(60%) contrast(105%)';
      case 'vintage': return 'sepia(30%) contrast(120%) brightness(90%)';
      case 'warm': return 'sepia(20%) saturate(140%)';
      case 'cool': return 'hue-rotate(15deg) saturate(110%)';
      case 'soft-glow': return 'brightness(108%) contrast(92%)';
      case 'cyberpunk': return 'contrast(130%) saturate(180%) hue-rotate(290deg)';
      default: return 'none';
    }
  };

  // 3. Render Photo Cards
  const padding = 50;
  const gap = 45;
  const footerHeight = 220;

  if (isGrid2x2 || isCollage6) {
    const cols = 2;
    const rows = isCollage6 ? 3 : 2;
    const cardW = (canvasWidth - padding * 2 - gap) / cols;
    const cardH = (canvasHeight - padding * 2 - footerHeight - gap * (rows - 1)) / rows;

    for (let i = 0; i < photoCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = padding + col * (cardW + gap);
      const y = padding + row * (cardH + gap);

      drawSinglePhotoCard(ctx, loadedImages[i], x, y, cardW, cardH, getFilterStyle(filterId), decorativeStyle, i);
    }
  } else {
    const cardW = canvasWidth - padding * 2;
    const cardH = (canvasHeight - padding * 2 - footerHeight - gap * (photoCount - 1)) / photoCount;

    for (let i = 0; i < photoCount; i++) {
      const x = padding;
      const y = padding + i * (cardH + gap);

      drawSinglePhotoCard(ctx, loadedImages[i], x, y, cardW, cardH, getFilterStyle(filterId), decorativeStyle, i);
    }
  }

  // 4. Render Decorative Overlays
  drawFrameDecorations(ctx, decorativeStyle, canvasWidth, canvasHeight);

  // 5. Render Footer Text & Date Stamp
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const footerY = canvasHeight - 110;
  ctx.fillStyle = frameStyle?.text || '#FFFFFF';
  ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('PIXORA • PHOTOBOOTH', canvasWidth / 2, footerY - 20);

  if (showDate) {
    ctx.font = '500 24px monospace';
    ctx.fillStyle = (frameStyle?.text || '#FFFFFF') + 'DD';
    ctx.fillText(`📅 ${dateStr}`, canvasWidth / 2, footerY + 30);
  }
  ctx.restore();

  // 6. Render Active Stickers
  stickers.forEach((stk) => {
    const sx = (stk.x / 100) * canvasWidth;
    const sy = (stk.y / 100) * canvasHeight;

    ctx.save();
    ctx.translate(sx, sy);
    if (stk.rotation) ctx.rotate((stk.rotation * Math.PI) / 180);
    const scale = stk.scale || 1;

    if (stk.icon) {
      ctx.font = `${Math.round(80 * scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stk.icon, 0, 0);
    } else if (stk.type === 'text') {
      ctx.font = `bold ${Math.round(28 * scale)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textWidth = ctx.measureText(stk.text).width + 30;
      ctx.fillStyle = stk.bg || '#F43F5E';
      ctx.beginPath();
      ctx.roundRect(-textWidth / 2, -25 * scale, textWidth, 50 * scale, 12);
      ctx.fill();

      ctx.fillStyle = stk.color || '#FFFFFF';
      ctx.fillText(stk.text, 0, 0);
    }
    ctx.restore();
  });

  return canvas;
};

// Draw Photo Frame Box
function drawSinglePhotoCard(ctx, img, x, y, width, height, filterStr, decorativeStyle, index) {
  ctx.save();

  // Card Background
  ctx.fillStyle = decorativeStyle === 'kawaii-doodle' && index === 1 ? '#10B981' : '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;

  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 28);
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Inner Image Clip Area
  const innerPad = 18;
  const ix = x + innerPad;
  const iy = y + innerPad;
  const iw = width - innerPad * 2;
  const ih = height - innerPad * 2;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(ix, iy, iw, ih, 20);
  ctx.clip();

  if (img) {
    ctx.filter = filterStr;
    const imgRatio = img.width / img.height;
    const boxRatio = iw / ih;
    let renderW = iw;
    let renderH = ih;
    let renderX = ix;
    let renderY = iy;

    if (imgRatio > boxRatio) {
      renderW = ih * imgRatio;
      renderX = ix - (renderW - iw) / 2;
    } else {
      renderH = iw / imgRatio;
      renderY = iy - (renderH - ih) / 2;
    }

    ctx.drawImage(img, renderX, renderY, renderW, renderH);
  } else {
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(ix, iy, iw, ih);
  }
  ctx.restore();

  // Pearl Ring & Ribbon
  if (decorativeStyle === 'pearl-ribbon') {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.roundRect(ix - 4, iy - 4, iw + 8, ih + 8, 22);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

// Draw Rich Decorative Badges & Corner Graphics
function drawFrameDecorations(ctx, style, width, height) {
  ctx.save();

  if (style === 'ruby-scrapbook') {
    // 1. Top-Right Kiss Mark Badge
    ctx.fillStyle = '#450A0AE6';
    ctx.beginPath();
    ctx.roundRect(width - 180, 0, 180, 75, [0, 0, 0, 24]);
    ctx.fill();

    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('💋💋', width - 90, 10);

    // GIRLS Pill Badge
    ctx.fillStyle = '#B91C1C';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(width - 135, 42, 90, 24, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GIRLS', width - 90, 54);

    // 2. Top-Left Safety Pin
    ctx.font = '55px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('🧷', 35, 30);

    // 3. Middle-Right "Favorite Person ⤵" Badge
    ctx.fillStyle = '#FEF3C7';
    ctx.strokeStyle = '#78350F';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(width - 310, 730, 270, 56, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#450A0A';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Favorite Person ⤵', width - 175, 758);

    // 4. Middle-Left Burgundy Star
    ctx.fillStyle = '#7F1D1D';
    ctx.font = 'bold 70px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', 35, 1440);

    // 5. Bottom-Left Quote Scrap Box
    ctx.fillStyle = '#991B1BE6';
    ctx.strokeStyle = '#F8717180';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(40, height - 230, 360, 95, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'italic 18px serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('"nothing can stop me from living', 55, height - 215);
    ctx.fillText('the life of my dreams."', 55, height - 185);

    // 6. Bottom-Right Teddy Bear
    ctx.font = '100px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('🧸', width - 40, height - 120);

  } else if (style === 'red-gingham-bow') {
    ctx.font = '60px sans-serif';
    ctx.fillText('⚡', 80, 90);
    ctx.font = '90px sans-serif';
    ctx.fillText('🎀', 40, 750);
    ctx.font = '70px sans-serif';
    ctx.fillText('🏹', 60, height - 600);
    ctx.font = '65px sans-serif';
    ctx.fillText('💋', 90, height - 120);
    ctx.font = '70px sans-serif';
    ctx.fillText('★', width - 100, height - 600);

  } else if (style === 'kawaii-doodle') {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(width - 220, 40, 160, 45, 20);
    ctx.fill();
    ctx.fillStyle = '#BE185D';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('CUTE!!', width - 140, 65);
    ctx.font = '60px sans-serif';
    ctx.fillText('⭐', 80, 160);
    ctx.fillText('🌸', width - 90, 750);
    ctx.fillText('☁️', width - 120, height - 120);
    ctx.fillStyle = '#9D174D';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('wink! 😉', 180, height - 120);

  } else if (style === 'pink-sanrio-gingham') {
    // Top Right: Big pink bow
    ctx.font = '90px sans-serif';
    ctx.fillText('🎀', width - 120, 80);
    // Top Left: Pink star
    ctx.font = '60px sans-serif';
    ctx.fillText('✦', 60, 90);
    // Gap 1 (between photo 1 & 2)
    ctx.font = '75px sans-serif';
    ctx.fillText('🌸', 20, 735);
    ctx.fillText('⭐', width - 70, 735);
    // Gap 2 (between photo 2 & 3)
    ctx.fillText('📷', 20, 1445);
    ctx.fillText('🐰', width - 70, 1445);
    // Bottom plushies
    ctx.font = '100px sans-serif';
    ctx.fillText('🐻', 50, height - 120);
    ctx.fillText('🐾', width - 100, height - 120);
  }

  ctx.restore();
}
