import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const { t } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero setActiveTab={setActiveTab} />;
      case 'projects':
        return <Projects />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      {/* Background Decorative Glowing Blobs */}
      <div className="glowing-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header / Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Content Body */}
      <main style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '4rem' }}>
        {renderContent()}
      </main>

      {/* Footer Section */}
      <footer className="no-print" style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <p style={{ fontWeight: 500 }}>
            {t('footerText')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
            <span>Powered by React + Vite</span>
            <span>•</span>
            <span>Bilingual Support (EN/VI)</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
