import React from 'react';
import { FlipHorizontal, Timer, Calendar, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { usePhotoboothStore } from '../../store/usePhotoboothStore';

export const CameraToolbar = () => {
  const {
    countdown,
    setCountdown,
    isMirrored,
    toggleMirror,
    showDateStamp,
    toggleDateStamp,
    soundEnabled,
    toggleSound,
    resetSession,
    capturedPhotos
  } = usePhotoboothStore();

  const countdownOptions = [3, 5, 10];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Pengaturan Kamera
        </h4>

        {capturedPhotos.length > 0 && (
          <button
            onClick={resetSession}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Foto
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Countdown Timer Selector */}
        <div className="col-span-2 sm:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 space-y-2">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-amber-500" /> Hitung Mundur
          </label>
          <div className="flex gap-1.5">
            {countdownOptions.map((sec) => (
              <button
                key={sec}
                onClick={() => setCountdown(sec)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  countdown === sec
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {sec} Detik
              </button>
            ))}
          </div>
        </div>

        {/* Mirror Toggle */}
        <button
          onClick={toggleMirror}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
            isMirrored
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-900'
              : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FlipHorizontal className={`w-4 h-4 mb-1 ${isMirrored ? 'text-amber-600' : 'text-slate-500'}`} />
          <span className="text-[11px] font-bold">Mirror ({isMirrored ? 'Aktif' : 'Off'})</span>
        </button>

        {/* Date Stamp Toggle */}
        <button
          onClick={toggleDateStamp}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
            showDateStamp
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-900'
              : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className={`w-4 h-4 mb-1 ${showDateStamp ? 'text-amber-600' : 'text-slate-500'}`} />
          <span className="text-[11px] font-bold">Tanggal ({showDateStamp ? 'Ada' : 'Sembunyi'})</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
            soundEnabled
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100'
          }`}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 mb-1 text-amber-400" />
          ) : (
            <VolumeX className="w-4 h-4 mb-1 text-slate-400" />
          )}
          <span className="text-[11px] font-bold">Suara ({soundEnabled ? 'On' : 'Off'})</span>
        </button>
      </div>
    </div>
  );
};
