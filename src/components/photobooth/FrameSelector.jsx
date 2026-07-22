import { usePhotoboothStore } from '../../store/usePhotoboothStore';
import { FRAME_COLORS, PHOTO_FILTERS } from '../../utils/templatesData';
import { Palette, Wand2 } from 'lucide-react';

export const FrameSelector = () => {
  const {
    selectedTemplate,
    selectedFrameStyle,
    setFrameStyle,
    borderColor,
    setBorderColor,
    selectedFilter,
    setFilter
  } = usePhotoboothStore();

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Palette className="w-4 h-4 text-amber-500" />
        <h4 className="font-heading font-bold text-sm text-slate-900">Custom Bingkai & Filter</h4>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-600 block">Style Tema Bingkai</label>
        <div className="grid grid-cols-2 gap-2">
          {selectedTemplate.frameStyles?.map((style) => {
            const isSelected = selectedFrameStyle?.id === style.id;
            return (
              <button
                key={style.id}
                onClick={() => {
                  setFrameStyle(style);
                  setBorderColor(style.bg);
                }}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-lg border border-slate-300 shrink-0 shadow-sm"
                  style={{ backgroundColor: style.bg }}
                />
                <span className="text-xs font-bold text-slate-800 truncate">{style.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-600 flex items-center justify-between">
          <span>Warna Background Custom</span>
          <span className="text-[10px] font-mono text-slate-400">{borderColor}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {FRAME_COLORS.map((col) => (
            <button
              key={col.value}
              onClick={() => setBorderColor(col.value)}
              className={`w-7 h-7 rounded-xl border transition-all cursor-pointer ${
                borderColor === col.value
                  ? 'ring-2 ring-amber-500 ring-offset-2 scale-110 border-slate-900'
                  : 'border-slate-300 hover:scale-105'
              }`}
              style={{ backgroundColor: col.value }}
              title={col.name}
            />
          ))}

          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-7 h-7 rounded-xl border border-slate-300 p-0 cursor-pointer overflow-hidden"
            title="Pilih Warna Kustom"
          />
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-amber-500" /> Filter Efek Foto
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PHOTO_FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setFilter(filter.id)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span className="text-[11px] block truncate">{filter.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
