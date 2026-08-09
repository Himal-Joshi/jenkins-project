import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import ResearchLabs from './components/ResearchLabs';
import NoticesEvents from './components/NoticesEvents';
import AdmissionsGuide from './components/AdmissionsGuide';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { AdmissionModal, TourModal, SpecificationModal } from './components/Modals';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('acem_theme') || 'dark');
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [tourModalOpen,      setTourModalOpen]      = useState(false);
  const [specModalOpen,      setSpecModalOpen]      = useState(false);
  const [specModalTitle,     setSpecModalTitle]     = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('acem_theme', theme);
  }, [theme]);

  const toggleTheme  = () => setTheme(p => p === 'light' ? 'dark' : 'light');
  const openSpec = (title) => { setSpecModalTitle(title); setSpecModalOpen(true); };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
      />

      <main style={{ flex: 1 }}>
        <Hero
          onOpenTour={() => setTourModalOpen(true)}
          onOpenAdmission={() => setAdmissionModalOpen(true)}
        />
        <Programs    onSelectProgram={openSpec} />
        <ResearchLabs />
        <NoticesEvents onSelectNotice={openSpec} />
        <AdmissionsGuide />
        <ContactSection />
      </main>

      <Footer />

      <AdmissionModal    isOpen={admissionModalOpen} onClose={() => setAdmissionModalOpen(false)} />
      <TourModal         isOpen={tourModalOpen}      onClose={() => setTourModalOpen(false)}      />
      <SpecificationModal isOpen={specModalOpen} title={specModalTitle} onClose={() => setSpecModalOpen(false)} />
    </div>
  );
}
