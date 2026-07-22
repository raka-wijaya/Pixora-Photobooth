import { motion } from 'framer-motion';
import { Camera, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { usePhotoboothStore } from '../../store/usePhotoboothStore';
import { useNavigate } from 'react-router-dom';

export const TemplateCard = ({ template, onSelect }) => {
  const navigate = useNavigate();
  const { selectedTemplate, setTemplate } = usePhotoboothStore();

  const isSelected = selectedTemplate?.id === template.id;

  const handleUseTemplate = () => {
    setTemplate(template);
    if (onSelect) onSelect(template);
    navigate('/camera');
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className={`relative bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
        isSelected
          ? 'border-amber-500 shadow-hover ring-2 ring-amber-500/20'
          : 'border-slate-200/80 shadow-soft hover:border-slate-300 hover:shadow-hover'
      }`}
    >
      {/* Badge */}
      {template.badge && (
        <span className="absolute top-4 right-4 z-10 text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-amber-400 shadow-sm">
          {template.badge}
        </span>
      )}

      {/* Frame Visual Preview Mockup */}
      <div className="w-full h-56 rounded-2xl bg-slate-100 p-4 flex flex-col items-center justify-center relative overflow-hidden group mb-5 border border-slate-200/60">
        <div className={`w-32 bg-white rounded-xl shadow-md p-2 flex flex-col gap-1.5 transition-transform duration-300 group-hover:scale-105 border border-slate-200`}>
          {Array.from({ length: Math.min(template.photoCount, 4) }).map((_, idx) => (
            <div
              key={idx}
              className={`w-full h-8 rounded-md bg-linear-to-r ${template.thumbnailColor} opacity-80 flex items-center justify-center`}
            >
              <Camera className="w-3.5 h-3.5 text-white/90" />
            </div>
          ))}
          <div className="w-full text-[9px] text-center text-slate-400 font-bold tracking-widest uppercase pt-1">
            Pixora Strip
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <Button variant="accent" size="sm" icon={Camera} onClick={handleUseTemplate}>
            Gunakan Tata Letak Ini
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-slate-900">{template.name}</h3>
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
            <Layers className="w-3.5 h-3.5" />
            {template.photoCount} Foto
          </span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed">{template.description}</p>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant={isSelected ? 'accent' : 'primary'}
            size="md"
            className="w-full"
            icon={isSelected ? CheckCircle2 : Sparkles}
            onClick={handleUseTemplate}
          >
            {isSelected ? 'Sedang Dipakai - Buka Kamera' : 'Gunakan Tata Letak Ini'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
