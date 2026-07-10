import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { language, toggleLanguage, theme, toggleTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome') },
    { id: 'projects', label: t('navProjects') },
    { id: 'blog', label: t('navBlog') },
    { id: 'contact', label: t('navContact') },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    
    // Smooth scroll to top when changing tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar glass-panel" style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 2rem)',
      maxWidth: '1000px',
      zIndex: 100,
      padding: '0.75rem 1.5rem',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    }}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo / Brand Name */}
        <a href="#home" onClick={() => handleNavClick('home')} style={{ 
          fontFamily: "'Outfit', sans-serif", 
          fontWeight: 800, 
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span className="gradient-text">imsonw</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '0.05em' }}>-labs</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-menu">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1.25rem', alignItems: 'center', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === item.id ? 600 : 500,
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'color var(--transition-fast)',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div style={{ height: '20px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

          {/* Action Buttons (Lang & Theme) */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="Change Language"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="mobile-toggle no-print" 
          style={{
            display: 'none', // Controlled by CSS below
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="mobile-drawer glass-panel no-print" style={{
          position: 'absolute',
          top: '4.5rem',
          left: '0',
          width: '100%',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid var(--border-color)',
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: activeTab === item.id ? 600 : 500,
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    textAlign: 'left',
                    width: '100%',
                    padding: '0.5rem 0'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div style={{ height: '1px', width: '100%', backgroundColor: 'var(--border-color)' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                gap: '0.5rem'
              }}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} />
                  <span style={{ fontSize: '0.95rem' }}>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={18} />
                  <span style={{ fontSize: '0.95rem' }}>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Embedded CSS for responsive navbar styling */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
