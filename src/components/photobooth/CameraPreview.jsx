import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Upload } from 'lucide-react';
import { usePhotoboothStore } from '../../store/usePhotoboothStore';
import { PHOTO_FILTERS } from '../../utils/templatesData';
import toast from 'react-hot-toast';

export const CameraPreview = ({ onCaptureDone }) => {
  const webcamRef = useRef(null);
  const [countdownNum, setCountdownNum] = useState(null);
  const [useFallbackMode, setUseFallbackMode] = useState(false);

  const {
    selectedTemplate,
    selectedFilter,
    countdown,
    isMirrored,
    capturedPhotos,
    isCapturing,
    flashActive,
    addPhoto,
    setIsCapturing,
    setActivePhotoIndex,
    triggerFlash,
    soundEnabled
  } = usePhotoboothStore();

  const activeFilterClass = PHOTO_FILTERS.find(f => f.id === selectedFilter)?.class || 'filter-normal';

  const playCameraBeep = useCallback((freq = 600, duration = 0.1) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio Context error:', e);
    }
  }, [soundEnabled]);

  const playShutterSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Shutter sound error:', e);
    }
  }, [soundEnabled]);

  const captureSingleShot = useCallback(() => {
    let imageSrc = null;
    if (webcamRef.current && !useFallbackMode) {
      imageSrc = webcamRef.current.getScreenshot();
    }

    if (!imageSrc) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 28px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Pixora Sample Shot ${capturedPhotos.length + 1}`, 320, 230);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText('Mode Simulasi Kamera', 320, 270);
      imageSrc = canvas.toDataURL('image/jpeg');
    }

    triggerFlash();
    playShutterSound();
    addPhoto(imageSrc);
  }, [webcamRef, useFallbackMode, capturedPhotos.length, triggerFlash, playShutterSound, addPhoto]);

  const startCaptureSequence = useCallback(async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    const totalShotsNeeded = selectedTemplate.photoCount;

    for (let shot = 0; shot < totalShotsNeeded; shot++) {
      setActivePhotoIndex(shot + 1);

      for (let sec = countdown; sec > 0; sec--) {
        setCountdownNum(sec);
        playCameraBeep(800, 0.08);
        await new Promise(res => setTimeout(res, 1000));
      }
      
      setCountdownNum(null);

      captureSingleShot();

      if (shot < totalShotsNeeded - 1) {
        await new Promise(res => setTimeout(res, 1200));
      }
    }

    setIsCapturing(false);
    toast.success('Capture selesai! Semua foto berhasil diambil ✨');
    if (onCaptureDone) onCaptureDone();
  }, [isCapturing, selectedTemplate.photoCount, countdown, captureSingleShot, setIsCapturing, setActivePhotoIndex, playCameraBeep, onCaptureDone]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        addPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    });
    toast.success(`${files.length} foto berhasil diunggah!`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border-4 border-slate-800 flex flex-col items-center">
      <div className="w-full px-6 py-3 bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-white border-b border-slate-800 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
          Foto: {capturedPhotos.length} / {selectedTemplate.photoCount}
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden">
        {!useFallbackMode ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            onUserMedia={() => {}}
            onUserMediaError={() => {
              setUseFallbackMode(true);
            }}
            className={`w-full h-full object-cover transition-all ${
              isMirrored ? 'scale-x-[-1]' : ''
            } ${activeFilterClass}`}
            videoConstraints={{
              facingMode: 'user',
              width: 1280,
              height: 960
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-8 h-8" />
            </div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors">
              <Upload className="w-4 h-4" /> Unggah Foto
              <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        )}

        <AnimatePresence>
          {flashActive && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white z-30 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {countdownNum !== null && (
            <motion.div
              key={countdownNum}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="absolute z-20 w-32 h-32 rounded-full bg-slate-900/80 backdrop-blur-md border-4 border-amber-500 flex items-center justify-center text-amber-400 font-extrabold text-6xl shadow-2xl font-heading"
            >
              {countdownNum}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 border border-white/10 pointer-events-none grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-white/5" />
          ))}
        </div>
      </div>

      <div className="w-full p-5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-4">
        <div />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isCapturing}
          onClick={startCaptureSequence}
          className="relative px-8 py-3.5 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold font-heading text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          <Camera className="w-5 h-5" />
          <span>{isCapturing ? `Mengambil (${capturedPhotos.length}/${selectedTemplate.photoCount})...` : 'Ambil Foto'}</span>
        </motion.button>

        <button
          onClick={() => setUseFallbackMode(!useFallbackMode)}
          className="p-2.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors"
          title="Toggle Mode Simulasi Kamera"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
