import React from 'react';
import { TemplateGrid } from '../components/template/TemplateGrid';
import { LayoutGrid, Sparkles } from 'lucide-react';

export const TemplatePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Langkah 1/3: Pilih Tata Letak Foto
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Tentukan Tata Letak Foto Pilihanmu
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed">
            Pilih jumlah foto dan tata letak yang kamu sukai. Setelah memilih, kamu akan langsung diarahkan ke halaman kamera photobooth.
          </p>
        </div>

        {/* Template Grid */}
        <TemplateGrid />
      </div>
    </div>
  );
};
