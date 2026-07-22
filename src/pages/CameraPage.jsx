import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraPreview } from '../components/photobooth/CameraPreview';
import { CameraToolbar } from '../components/photobooth/CameraToolbar';
import { FrameSelector } from '../components/photobooth/FrameSelector';
import { StickerSelector } from '../components/photobooth/StickerSelector';
import { PreviewStrip } from '../components/photobooth/PreviewStrip';
import { usePhotoboothStore } from '../store/usePhotoboothStore';
import { Button } from '../components/common/Button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export const CameraPage = () => {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('settings');

  const { selectedTemplate, capturedPhotos, retakePhotos } = usePhotoboothStore();

  const isComplete = capturedPhotos.length >= selectedTemplate.photoCount;

  const handleCaptureDone = () => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Foto selesai! Lanjut ke preview?</span>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            navigate('/preview');
          }}
          className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
        >
          Ya, Preview
        </button>
      </div>
    ), { duration: 4000 });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20">
                Tata Letak: {selectedTemplate.name} ({selectedTemplate.photoCount} Foto)
              </span>
              <button
                onClick={() => navigate('/templates')}
                className="text-xs text-slate-500 hover:text-slate-900 underline font-medium cursor-pointer"
              >
                Ganti Tata Letak
              </button>
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
              Photobooth Studio Live
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {capturedPhotos.length > 0 && (
              <Button variant="secondary" size="md" icon={RefreshCw} onClick={retakePhotos}>
                Foto Ulang
              </Button>
            )}
            <Button
              variant={isComplete ? 'accent' : 'primary'}
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/preview')}
            >
              {isComplete ? 'Lihat Hasil & Download ✨' : 'Lanjut ke Preview'}
            </Button>
          </div>
        </div>

        {/* Main Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tools & Customization Tabs */}
          <div className="lg:col-span-4 space-y-4">
            {/* Customization Navigation Tabs */}
            <div className="flex gap-1.5 p-1 bg-slate-200/60 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pengaturan
              </button>
              <button
                onClick={() => setActiveTab('frame')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'frame' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bingkai & Filter
              </button>
              <button
                onClick={() => setActiveTab('stickers')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'stickers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Stiker
              </button>
            </div>

            {/* Active Tab Component */}
            {activeTab === 'settings' && <CameraToolbar />}
            {activeTab === 'frame' && <FrameSelector />}
            {activeTab === 'stickers' && <StickerSelector />}
          </div>

          {/* Middle Column: Main Live Camera View */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <CameraPreview onCaptureDone={handleCaptureDone} />
          </div>

          {/* Right Column: Live Photo Strip Preview */}
          <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft flex flex-col items-center space-y-4">
            <div className="w-full text-center border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-sm text-slate-900">Pratinjau Foto Langsung</h3>
              <p className="text-[11px] text-slate-400">Hasil Gabungan Foto dan Stiker</p>
            </div>

            {/* Live Strip Container */}
            <div className="transform scale-[0.85] origin-top">
              <PreviewStrip previewRef={previewRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
