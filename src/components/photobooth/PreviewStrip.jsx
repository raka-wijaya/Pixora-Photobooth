import { useRef } from 'react';
import { usePhotoboothStore } from '../../store/usePhotoboothStore';
import { PHOTO_FILTERS } from '../../utils/templatesData';
import { Camera, Calendar } from 'lucide-react';
import { StickerController } from './StickerController';

export const PreviewStrip = ({ previewRef }) => {
  const localRef = useRef(null);
  const {
    selectedTemplate,
    selectedFrameStyle,
    borderColor,
    selectedFilter,
    selectedStickers,
    showDateStamp,
    capturedPhotos,
  } = usePhotoboothStore();

  const filterClass = PHOTO_FILTERS.find((f) => f.id === selectedFilter)?.class || 'filter-normal';
  const currentDateStr = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const decorativeStyle = selectedFrameStyle?.decorative;

  const totalSlots = selectedTemplate.photoCount;
  const photoSlots = Array.from({ length: totalSlots }).map((_, idx) => capturedPhotos[idx] || null);

  const getLayoutClass = () => {
    switch (selectedTemplate.id) {
      case 'grid-2x2':
        return 'grid grid-cols-2 gap-4 w-[340px]';
      case 'collage-6':
        return 'grid grid-cols-2 gap-4 w-[340px]';
      case 'polaroid-frame':
        return 'flex flex-col gap-4 w-[320px] pb-12';
      default:
        return 'flex flex-col gap-5 w-[290px]';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={(el) => {
          localRef.current = el;
          if (previewRef) previewRef.current = el;
        }}
        id="photobooth-strip-canvas"
        className="relative shadow-2xl rounded-3xl p-5 transition-all duration-300 select-none overflow-hidden"
        style={{
          backgroundColor: borderColor || selectedFrameStyle?.bg || '#800020',
          color: selectedFrameStyle?.text || '#FFFFFF',
          border: `2px solid ${selectedFrameStyle?.border || '#800020'}`
        }}
      >
        {decorativeStyle === 'red-gingham-bow' && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(45deg, #D32F2F 25%, transparent 25%), linear-gradient(-45deg, #D32F2F 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #D32F2F 75%), linear-gradient(-45deg, transparent 75%, #D32F2F 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          />
        )}
        {decorativeStyle === 'kawaii-doodle' && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(#FDE047 25%, transparent 25%)',
              backgroundSize: '24px 24px'
            }}
          />
        )}
        {decorativeStyle === 'pink-sanrio-gingham' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #FECDD3 25%, transparent 25%),
                linear-gradient(-45deg, #FECDD3 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #FECDD3 75%),
                linear-gradient(-45deg, transparent 75%, #FECDD3 75%)
              `,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              opacity: 0.35
            }}
          />
        )}

        <div className={`relative z-10 ${getLayoutClass()}`}>
          {photoSlots.map((imgSrc, index) => {
            const isMiddle = index === 1;

            return (
              <div
                key={index}
                className={`relative rounded-2xl overflow-visible bg-white p-2 border-2 border-white shadow-md aspect-[4/3] flex items-center justify-center ${
                  selectedTemplate.id === 'polaroid-frame' ? 'aspect-square' : ''
                } ${decorativeStyle === 'kawaii-doodle' && isMiddle ? 'border-emerald-500 bg-emerald-500/10' : ''}`}
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-100 flex items-center justify-center">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={`Shot ${index + 1}`}
                      className={`w-full h-full object-cover ${filterClass}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-slate-400 space-y-1">
                      <Camera className="w-6 h-6 stroke-[1.5]" />
                      <span className="text-[10px] font-bold">Foto {index + 1}</span>
                    </div>
                  )}
                </div>

                {decorativeStyle === 'pearl-ribbon' && (
                  <>
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                      style={{
                        boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.9), 0 0 0 2px rgba(255,255,255,0.8)',
                        outline: '4px dotted #FFFFFF',
                        outlineOffset: '-5px'
                      }}
                    />
                    <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-md">
                      <svg width="44" height="26" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 30 C30 5, 5 15, 10 35 C15 50, 45 40, 50 30 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
                        <path d="M50 30 C70 5, 95 15, 90 35 C85 50, 55 40, 50 30 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
                        <path d="M44 32 C35 48, 25 58, 18 55 C25 45, 38 38, 44 32 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                        <path d="M56 32 C65 48, 75 58, 82 55 C75 45, 62 38, 56 32 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                        <ellipse cx="50" cy="30" rx="7" ry="8" fill="#FB7185" stroke="#9F1239" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {decorativeStyle === 'ruby-scrapbook' && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">

            <div className="absolute top-0 right-0 bg-red-950/90 text-rose-300 px-2.5 py-1.5 rounded-bl-2xl border-b-2 border-l-2 border-rose-500/50 text-right shadow-md">
              <span className="text-lg leading-none block">💋💋</span>
              <span className="bg-red-700 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full inline-block uppercase tracking-wider mt-0.5 border border-white leading-none">
                GIRLS
              </span>
            </div>

            <div className="absolute top-3 left-3 text-2xl leading-none filter drop-shadow">🧷</div>

            <div className="absolute top-[32%] right-2 bg-amber-100 text-red-950 font-black text-xs px-2.5 py-1 rounded-lg shadow-md border-2 border-amber-900 leading-none">
              Favorite Person ⤵
            </div>

            <div className="absolute top-[60%] left-1.5 text-3xl text-red-900 leading-none filter drop-shadow">
              ★
            </div>

            <div className="absolute bottom-3 left-2 bg-red-800/90 text-white p-2 rounded-lg border border-red-400/50 max-w-[140px] shadow-md">
              <p className="text-[9px] font-semibold leading-tight font-serif italic m-0">
                "nothing can stop me from living the life of my dreams."
              </p>
            </div>

            <div className="absolute bottom-3 right-3 text-4xl leading-none filter drop-shadow-lg">
              🧸
            </div>
          </div>
        )}

        {decorativeStyle === 'red-gingham-bow' && (
          <div className="absolute inset-0 pointer-events-none z-20">

            <div className="absolute top-2 left-3 text-2xl text-red-600 leading-none filter drop-shadow">⚡</div>

            <div className="absolute top-[33%] left-1 text-4xl leading-none filter drop-shadow-lg">
              🎀
            </div>

            <div className="absolute top-[30%] right-2 bg-red-700 text-white font-black text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow leading-none">
              !
            </div>

            <div className="absolute top-[64%] left-1.5 text-3xl text-rose-600 leading-none filter drop-shadow">
              🏹
            </div>

            <div className="absolute top-[63%] right-2 text-3xl text-red-700 leading-none filter drop-shadow">
              ★
            </div>

            <div className="absolute bottom-3 left-4 text-2xl leading-none filter drop-shadow">
              💋
            </div>
          </div>
        )}

        {decorativeStyle === 'pink-sanrio-gingham' && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">

            <div className="absolute top-1 right-3 text-4xl leading-none filter drop-shadow-lg">🎀</div>

            <div className="absolute top-3 left-2 text-2xl text-pink-500 leading-none filter drop-shadow">✦</div>
            <div className="absolute top-[32%] left-1 text-3xl leading-none filter drop-shadow">🌸</div>
            <div className="absolute top-[30%] right-1 text-3xl text-pink-500 font-black leading-none filter drop-shadow">⭐</div>
            
            <div className="absolute top-[64%] left-1 text-3xl leading-none filter drop-shadow">📷</div>
            <div className="absolute top-[63%] right-1 text-3xl leading-none filter drop-shadow">🐰</div>
            
            <div className="absolute bottom-2 left-2 text-4xl leading-none filter drop-shadow-lg">🐻</div>
            <div className="absolute bottom-2 right-4 text-4xl leading-none filter drop-shadow-lg">🐾</div>
          </div>
        )}

        {decorativeStyle === 'kawaii-doodle' && (
          <div className="absolute inset-0 pointer-events-none z-20">

            <div className="absolute top-2 right-4 text-xs font-black text-pink-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm leading-none">
              CUTE!!
            </div>
            <div className="absolute top-12 left-4 text-2xl text-amber-300 leading-none">⭐</div>

            <div className="absolute top-[36%] right-3 text-2xl leading-none">🌸</div>

            <div className="absolute bottom-10 left-3 text-3xl text-amber-300 leading-none">⭐</div>
            <div className="absolute bottom-2 left-6 text-xs font-bold text-pink-800 bg-white/90 px-2 py-0.5 rounded-full shadow-sm leading-none">
              wink! 😉
            </div>
            <div className="absolute bottom-2 right-4 text-3xl leading-none">☁️</div>
          </div>
        )}

        <div className="relative z-10 pt-4 pb-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 font-heading font-black text-xs uppercase opacity-90 leading-none">
            <span className="text-amber-400 text-sm"><Camera/></span>
            <span className="tracking-wider">PIXORA • PHOTOBOOTH</span>
          </div>

          {showDateStamp && (
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono opacity-80 font-semibold mt-1 leading-none">
              <span><Calendar className="w-3.5 h-3.5 text-amber-500" /></span>
              <span>{currentDateStr}</span>
            </div>
          )}
        </div>

        {/* Render Active Stickers with Drag/Resize/Rotate */}
        {selectedStickers.map((stk) => (
          <StickerController key={stk.instanceId} sticker={stk} containerRef={localRef} />
        ))}
      </div>
    </div>
  );
};
