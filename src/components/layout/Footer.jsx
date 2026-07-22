import { Camera, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
              <Camera className="w-5 h-5 text-slate-950" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
              Pixora<span className="text-amber-500">.</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Pixora menghadirkan pengalaman photobooth modern secara online. Pilih frame, ambil beberapa jepretan, dan buat photo strip estetik yang siap disimpan atau dibagikan kapan saja.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Diproses di Perangkat
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Tanpa Perlu Login
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Pilihan Frame & Stiker Estetik
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-white text-base mb-4">Navigasi Halaman</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">Beranda</Link>
            </li>
            <li>
              <Link to="/templates" className="hover:text-amber-400 transition-colors">Pilihan Template Frame</Link>
            </li>
            <li>
              <Link to="/camera" className="hover:text-amber-400 transition-colors">Kamera Photobooth</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold text-white text-base mb-4">Fitur Photobooth</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>• Pengambilan Foto Otomatis Berurutan</li>
            <li>• Kamera Cermin & Hitung Mundur</li>
            <li>• Filter Foto Vintage & Hitam Putih</li>
            <li>• Bingkai & Stiker Kustom</li>
            <li>• Ekspor PNG Resolusi Tinggi</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Pixora. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <span>Developer:</span>
          <a
            href="https://instagram.com/rakha_wijaya1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 font-semibold transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/salendrawijaya/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
