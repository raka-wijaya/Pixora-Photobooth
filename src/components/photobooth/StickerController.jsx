import React, { useRef, useState, useCallback } from 'react';
import { Trash2, RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { usePhotoboothStore } from '../../store/usePhotoboothStore';

export const StickerController = ({ sticker, containerRef }) => {
  const { updateSticker, removeSticker } = usePhotoboothStore();
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      stickerX: sticker.x,
      stickerY: sticker.y
    };
  }, [containerRef, sticker.x, sticker.y]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !dragStart.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((e.clientX - dragStart.current.mouseX) / rect.width) * 100;
    const dy = ((e.clientY - dragStart.current.mouseY) / rect.height) * 100;
    const newX = Math.max(2, Math.min(98, dragStart.current.stickerX + dx));
    const newY = Math.max(2, Math.min(98, dragStart.current.stickerY + dy));
    updateSticker(sticker.instanceId, { x: newX, y: newY });
  }, [isDragging, containerRef, sticker.instanceId, updateSticker]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    dragStart.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      stickerX: sticker.x,
      stickerY: sticker.y
    };
  }, [containerRef, sticker.x, sticker.y]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !dragStart.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((touch.clientX - dragStart.current.mouseX) / rect.width) * 100;
    const dy = ((touch.clientY - dragStart.current.mouseY) / rect.height) * 100;
    const newX = Math.max(2, Math.min(98, dragStart.current.stickerX + dx));
    const newY = Math.max(2, Math.min(98, dragStart.current.stickerY + dy));
    updateSticker(sticker.instanceId, { x: newX, y: newY });
  }, [isDragging, containerRef, sticker.instanceId, updateSticker]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className="absolute z-30 group"
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sticker content */}
      <div className="relative">
        {sticker.icon && (
          <span className="text-3xl filter drop-shadow-md select-none block leading-none">
            {sticker.icon}
          </span>
        )}
        {sticker.type === 'text' && (
          <span
            className="text-xs font-extrabold px-2 py-1 rounded shadow-md whitespace-nowrap block leading-none"
            style={{ backgroundColor: sticker.bg, color: sticker.color }}
          >
            {sticker.text}
          </span>
        )}
        {sticker.type === 'stamp' && (
          <span
            className="text-xs font-black px-2 py-0.5 border-2 uppercase rounded tracking-widest bg-white/90 shadow-md whitespace-nowrap block leading-none"
            style={{ borderColor: sticker.border, color: sticker.color }}
          >
            {sticker.text}
          </span>
        )}

        {/* Controls toolbar - visible on hover */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-0.5 bg-slate-900/90 rounded-xl px-1.5 py-1 shadow-xl backdrop-blur-sm z-50">
          <button
            onClick={(e) => { e.stopPropagation(); updateSticker(sticker.instanceId, { scale: Math.max(0.3, sticker.scale - 0.15) }); }}
            className="p-1 text-white hover:text-amber-400 transition-colors"
            title="Perkecil"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); updateSticker(sticker.instanceId, { scale: Math.min(5, sticker.scale + 0.15) }); }}
            className="p-1 text-white hover:text-amber-400 transition-colors"
            title="Perbesar"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); updateSticker(sticker.instanceId, { rotation: sticker.rotation - 15 }); }}
            className="p-1 text-white hover:text-amber-400 transition-colors"
            title="Putar Kiri"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); updateSticker(sticker.instanceId, { rotation: sticker.rotation + 15 }); }}
            className="p-1 text-white hover:text-amber-400 transition-colors"
            title="Putar Kanan"
          >
            <RotateCw className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); removeSticker(sticker.instanceId); }}
            className="p-1 text-rose-400 hover:text-rose-300 transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
