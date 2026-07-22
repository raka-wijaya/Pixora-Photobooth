import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { TemplatePage } from './pages/TemplatePage';
import { CameraPage } from './pages/CameraPage';
import { PreviewPage } from './pages/PreviewPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/templates" element={<TemplatePage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </main>

        <Footer />
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '12px 18px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif'
            }
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
