import { useState } from 'react';
import { usePhotoboothStore } from '../../store/usePhotoboothStore';
import { STICKERS_DATA } from '../../utils/stickersData';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const StickerSelector = () => {
  const [activeTab, setActiveTab] = useState(STICKERS_DATA[0].category);
  const { selectedStickers, addSticker, clearStickers } = usePhotoboothStore();

  const handleAddSticker = (sticker) => {
    addSticker(sticker);
    toast.success(`Stiker ${sticker.label || 'ditambahkan'} ke strip!`, { duration: 1500 });
  };

  const activeCategoryObj = STICKERS_DATA.find((cat) => cat.category === activeTab);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft space-y-4">
      {selectedStickers.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={clearStickers}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Hapus Semua
          </button>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {STICKERS_DATA.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(cat.category)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === cat.category
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
        {activeCategoryObj?.stickers.map((stk) => (
          <button
            key={stk.id}
            onClick={() => handleAddSticker(stk)}
            className="p-2.5 rounded-2xl border border-slate-200/80 hover:border-amber-500 hover:bg-amber-50/50 flex flex-col items-center justify-center transition-all cursor-pointer group relative"
          >
            {stk.icon && <span className="text-2xl group-hover:scale-110 transition-transform">{stk.icon}</span>}
            {stk.type === 'text' && (
              <span
                className="text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm"
                style={{ backgroundColor: stk.bg, color: stk.color }}
              >
                {stk.text}
              </span>
            )}
            {stk.type === 'stamp' && (
              <span
                className="text-[9px] font-black px-1 border uppercase rounded tracking-tighter"
                style={{ borderColor: stk.border, color: stk.color }}
              >
                {stk.text}
              </span>
            )}
            <span className="opacity-0 group-hover:opacity-100 absolute -top-1 -right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow transition-opacity">
              <Plus className="w-2.5 h-2.5" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
