import { create } from 'zustand';
import { TEMPLATES_DATA } from '../utils/templatesData';

export const usePhotoboothStore = create((set) => ({
  // Core template state
  selectedTemplate: TEMPLATES_DATA[0],
  selectedFrameStyle: TEMPLATES_DATA[0].frameStyles[0],
  borderColor: TEMPLATES_DATA[0].defaultBorderColor || '#FFFFFF',
  
  // Customization state
  selectedFilter: 'normal',
  selectedStickers: [],
  countdown: 3, // 3s default
  isMirrored: true,
  showDateStamp: true,
  customTitle: 'Pixora Memory',
  soundEnabled: true,

  // Camera & Capture execution state
  capturedPhotos: [],
  activePhotoIndex: 0,
  isCapturing: false,
  flashActive: false,
  
  // Actions
  setTemplate: (template) => {
    set({
      selectedTemplate: template,
      selectedFrameStyle: template.frameStyles[0],
      borderColor: template.defaultBorderColor || '#FFFFFF',
      capturedPhotos: []
    });
  },

  setFrameStyle: (frameStyle) => {
    set({ selectedFrameStyle: frameStyle });
  },

  setBorderColor: (color) => {
    set({ borderColor: color });
  },

  setFilter: (filterId) => {
    set({ selectedFilter: filterId });
  },

  addSticker: (sticker) => {
    const newSticker = {
      ...sticker,
      instanceId: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      x: 50, // center x %
      y: 50, // center y %
      scale: 1,
      rotation: 0
    };
    set((state) => ({
      selectedStickers: [...state.selectedStickers, newSticker]
    }));
  },

  removeSticker: (instanceId) => {
    set((state) => ({
      selectedStickers: state.selectedStickers.filter((s) => s.instanceId !== instanceId)
    }));
  },

  updateSticker: (instanceId, updates) => {
    set((state) => ({
      selectedStickers: state.selectedStickers.map((s) =>
        s.instanceId === instanceId ? { ...s, ...updates } : s
      )
    }));
  },

  clearStickers: () => {
    set({ selectedStickers: [] });
  },

  setCountdown: (seconds) => {
    set({ countdown: seconds });
  },

  toggleMirror: () => {
    set((state) => ({ isMirrored: !state.isMirrored }));
  },

  toggleDateStamp: () => {
    set((state) => ({ showDateStamp: !state.showDateStamp }));
  },

  setCustomTitle: (title) => {
    set({ customTitle: title });
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  // Photos state
  setCapturedPhotos: (photos) => {
    set({ capturedPhotos: photos });
  },

  addPhoto: (photoDataUrl) => {
    set((state) => ({
      capturedPhotos: [...state.capturedPhotos, photoDataUrl]
    }));
  },

  deletePhotoIndex: (index) => {
    set((state) => ({
      capturedPhotos: state.capturedPhotos.filter((_, i) => i !== index)
    }));
  },

  setIsCapturing: (val) => set({ isCapturing: val }),
  setActivePhotoIndex: (index) => set({ activePhotoIndex: index }),
  triggerFlash: () => {
    set({ flashActive: true });
    setTimeout(() => set({ flashActive: false }), 400);
  },

  resetSession: () => {
    set({
      capturedPhotos: [],
      activePhotoIndex: 0,
      isCapturing: false,
      selectedStickers: [],
      selectedFilter: 'normal'
    });
  },

  retakePhotos: () => {
    set({
      capturedPhotos: [],
      activePhotoIndex: 0,
      isCapturing: false
    });
  }
}));
