import { Link, useLocation } from 'react-router-dom';
import { Camera, LayoutGrid, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-900 shadow-md group-hover:scale-105 transition-transform">
            <Camera className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
              Pixora<span className="text-amber-500">.</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              isActive('/')
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/templates"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              isActive('/templates')
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-amber-500" />
            <span>Pilih Tata Letak</span>
          </Link>
          <Link
            to="/camera"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              isActive('/camera')
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-500" />
            <span>Photobooth</span>
          </Link>
        </nav>

        {/* Quick CTA */}
        <div className="flex items-center gap-3">
          <Link to="/templates">
            <Button variant="accent" size="md" icon={Sparkles}>
              Mulai Foto
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
