import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Camera,
  Sparkles,
  Zap,
  ShieldCheck,
  Download,
  Palette,
  ChevronDown,
  ArrowRight,
  Smile
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { TEMPLATES_DATA } from '../utils/templatesData';
import { Footer } from '../components/layout/Footer';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  const features = [
    {
      icon: Camera,
      title: 'Pengambilan Otomatis',
      desc: 'Siap berpose? Pixora akan menghitung mundur, menyalakan efek flash, dan mengambil setiap foto secara otomatis.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Palette,
      title: 'Frame & Border Custom',
      desc: 'Personalisasikan photo strip dengan berbagai pilihan frame, warna latar, dan filter klasik seperti Black & White maupun Sepia untuk hasil yang lebih estetik.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Smile,
      title: 'Stiker & Date Stamp',
      desc: 'Tambahkan stiker, emoji, dan cap tanggal untuk memberikan sentuhan personal pada setiap photo strip.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Download,
      title: 'Unduh Resolusi Tinggi',
      desc: 'Ekspor hasil strip foto beresolusi tinggi (PNG/JPG) yang siap langsung dibagikan ke media sosial.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: ShieldCheck,
      title: 'Privasi 100% Aman',
      desc: 'Proses foto berjalan penuh di browser Anda. Tidak ada server penyimpan foto pribadi.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Zap,
      title: 'Tanpa Perlu Akun',
      desc: 'Langsung pakai seketika. Bebas ribet tanpa perlu mendaftar atau masuk login.',
      color: 'from-yellow-400 to-amber-600'
    }
  ];

  const faqs = [
    {
      q: 'Apakah aplikasi Pixora benar-benar gratis?',
      a: 'Ya, 100% gratis tanpa biaya tersembunyi! Anda bisa mengambil foto dan mendownload hasilnya sepuasnya.'
    },
    {
      q: 'Apakah saya perlu mendaftar atau melakukan login?',
      a: 'Tidak perlu sama sekali. Aplikasi didesain tanpa proses login agar Anda bisa langsung mengambil foto kapan saja secara instan.'
    },
    {
      q: 'Bagaimana dengan keamanan foto pribadi saya?',
      a: 'Foto Anda sangat aman karena seluruh pemrosesan efek, penggabungan frame, hingga download berjalan sepenuhnya secara lokal di browser client (laptop/HP Anda). Foto tidak diunggah ke server mana pun.'
    },
    {
      q: 'Apakah bisa digunakan di smartphone / HP?',
      a: 'Bisa! Pixora mendukung penuh tampilan responsif untuk perangkat HP (iOS & Android) maupun tablet dan laptop.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between overflow-x-hidden">
      <section className="relative pt-12 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-purple-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 shadow-soft text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Pixora - Modern Online Photobooth</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15] tracking-tight">
              Abadikan Momen Cantik <br className="hidden sm:inline" />
              dengan <span className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">Pixora</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
              Pixora menghadirkan pengalaman photobooth modern secara online. Pilih frame, ambil beberapa jepretan, dan buat photo strip estetik yang siap disimpan atau dibagikan kapan saja.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="accent"
                size="xl"
                icon={Sparkles}
                onClick={() => navigate('/templates')}
                className="w-full sm:w-auto text-slate-950 font-black shadow-lg shadow-amber-500/20"
              >
                Mulai Foto Di Pixora Sekarang
              </Button>
              <Link to="/templates" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" icon={ArrowRight} iconPosition="right" className="w-full">
                  Lihat Pilihan Tata Letak
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Developer:</span>
              <a
                href="https://www.instagram.com/rakha_wijaya1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 text-pink-600 hover:text-pink-700 border border-pink-200/80 font-bold transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/salendrawijaya/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:text-blue-700 border border-blue-200/80 font-bold transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full max-w-sm"
            >
              <div className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-200/80 space-y-3 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-1">
                    <Camera className="w-4 h-4 text-amber-500" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{currentDate}</span>
                </div>

                <div className="space-y-2.5">
                  <div className="h-28 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 p-3 flex flex-col justify-end text-white relative overflow-hidden">
                    <span className="text-xs font-bold font-heading">✨ Abadikan Senyum Estetikmu</span>
                    <span className="text-[10px] text-amber-400">Shot #1</span>
                  </div>
                  <div className="h-28 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 p-3 flex flex-col justify-end text-slate-950 relative overflow-hidden">
                    <span className="text-xs font-bold font-heading">🎀 Sebarkan Energi Positif</span>
                    <span className="text-[10px] font-semibold text-slate-900">Shot #2</span>
                  </div>
                  <div className="h-28 rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 p-3 flex flex-col justify-end text-white relative overflow-hidden">
                    <span className="text-xs font-bold font-heading">💖 Abadikan Kenangan Bersama</span>
                    <span className="text-[10px] text-rose-200">Shot #3</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                    Pixora Photobooth
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
              Fitur Unggulan Pixora Photobooth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <Card key={i} hoverEffect padding="p-8" className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">{feat.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900">Lihat Pilihan Tata Letak</h2>
            </div>
            <Link to="/templates">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Lihat Pilihan Tata Letak
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES_DATA.slice(0, 3).map((tmpl) => (
              <Card key={tmpl.id} hoverEffect className="space-y-4 p-6">
                <div className="h-44 bg-slate-100 rounded-2xl flex items-center justify-center p-4 border border-slate-200">
                  <div className="w-24 bg-white rounded-xl shadow p-2 space-y-1">
                    {Array.from({ length: Math.min(tmpl.photoCount, 3) }).map((_, i) => (
                      <div key={i} className={`h-6 rounded bg-gradient-to-r ${tmpl.thumbnailColor}`} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900">{tmpl.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{tmpl.description}</p>
                </div>
                <Button variant="accent" size="sm" className="w-full" onClick={() => navigate('/camera')}>
                  Gunakan Tata Letak Ini
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-heading font-extrabold text-3xl text-slate-900">Pertanyaan Sering Diajukan (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left font-heading font-bold text-slate-900 text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-200/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Siap Mengabadikan Foto Cantikmu?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Langsung gunakan Pixora tanpa perlu mendaftar. Gratis & instan.
          </p>
          <div>
            <Button
              variant="accent"
              size="xl"
              icon={Sparkles}
              onClick={() => navigate('/templates')}
              className="text-slate-950 font-black shadow-lg"
            >
              Mulai Foto di Pixora Sekarang
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
