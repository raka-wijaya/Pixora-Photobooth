import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { PreviewStrip } from '../components/photobooth/PreviewStrip';
import { FrameSelector } from '../components/photobooth/FrameSelector';
import { StickerSelector } from '../components/photobooth/StickerSelector';
import { usePhotoboothStore } from '../store/usePhotoboothStore';
import { generatePhotoboothCanvas } from '../utils/canvasExporter';
import { Button } from '../components/common/Button';
import { Download, Home, Camera, Palette, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

export const PreviewPage = () => {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('frame');

  const {
    capturedPhotos,
    resetSession,
    retakePhotos,
    selectedTemplate,
    selectedFrameStyle,
    borderColor,
    selectedFilter,
    selectedStickers,
    showDateStamp
  } = usePhotoboothStore();

  // Export photobooth strip to high-resolution image matching DOM preview 100%
  const downloadPhotoStrip = async (format = 'png') => {
    setIsExporting(true);
    const toastId = toast.loading('Mengolah & mengunduh photo strip 4K resolusi tinggi...');

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const fileName = `Pixora_Photobooth_${selectedTemplate?.id || 'strip'}_${Date.now()}.${format}`;

    try {
      // 1. Primary method: html2canvas capture directly from DOM previewRef (100% exact match of screen)
      if (previewRef.current) {
        const domCanvas = await html2canvas(previewRef.current, {
          scale: 4, // 4x ultra high-definition resolution
          useCORS: true,
          allowTaint: false,
          backgroundColor: null,
          logging: false
        });

        const dataUrl = domCanvas.toDataURL(mimeType, 0.95);

        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Photo strip berhasil diunduh! 📸✨', { id: toastId });
        return;
      }
    } catch (domErr) {
      console.warn('DOM capture warning, trying canvas exporter fallback:', domErr);
    }

    // 2. Fallback method: HTML5 2D Canvas Exporter
    try {
      const canvas = await generatePhotoboothCanvas({
        photos: capturedPhotos,
        template: selectedTemplate,
        frameStyle: selectedFrameStyle,
        borderColor: borderColor,
        filterId: selectedFilter,
        stickers: selectedStickers,
        showDate: showDateStamp,
        dateStr: new Date().toLocaleDateString('id-ID')
      });

      const fallbackDataUrl = canvas.toDataURL(mimeType, 0.95);

      const link = document.createElement('a');
      link.download = fileName;
      link.href = fallbackDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Photo strip berhasil diunduh! 📸✨', { id: toastId });
    } catch (fallbackErr) {
      console.error('Export error:', fallbackErr);
      toast.error('Gagal mengunduh gambar. Silakan coba lagi.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const handleNewSession = () => {
    resetSession();
    navigate('/templates');
  };

  const handleRetake = () => {
    retakePhotos();
    navigate('/camera');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Preview & Unduh Photo Strip
          </h1>
        </div>

        {/* Main Result Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Result Card Preview */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-soft w-full flex items-center justify-center">
              <PreviewStrip previewRef={previewRef} />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <Button
                variant="accent"
                size="lg"
                icon={Download}
                disabled={isExporting}
                onClick={() => downloadPhotoStrip('png')}
                className="text-slate-950 font-black shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {isExporting ? 'Proses Unduh...' : 'Download PNG'}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Download}
                disabled={isExporting}
                onClick={() => downloadPhotoStrip('jpg')}
                className="cursor-pointer"
              >
                Download JPG
              </Button>
            </div>
          </div>

          {/* Right Customization Sidebar & Session Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Fine Tuning Customization Tabs */}
            <div className="space-y-4">
              <div className="flex gap-2 p-1 bg-slate-200/60 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setActiveTab('frame')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'frame' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-amber-500" /> Bingkai & Filter
                </button>
                <button
                  onClick={() => setActiveTab('stickers')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'stickers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smile className="w-3.5 h-3.5 text-amber-500" /> Tambah Stiker
                </button>
              </div>

              {activeTab === 'frame' && <FrameSelector />}
              {activeTab === 'stickers' && <StickerSelector />}
            </div>

            {/* Session Management Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="md"
                  icon={Camera}
                  onClick={handleRetake}
                  className="w-full justify-center cursor-pointer"
                >
                  Foto Ulang (Retake)
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  icon={Home}
                  onClick={handleNewSession}
                  className="w-full justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Sesi Baru & Pilih Tata Letak
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
