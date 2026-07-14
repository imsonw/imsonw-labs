import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X } from 'lucide-react';
import NavActions from './NavActions';

export default function Navbar() {
  const { t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('navHome') },
    { path: '/projects', label: t('navProjects') },
    { path: '/blog', label: t('navBlog') },
    { path: '/contact', label: t('navContact') },
  ];

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkStyle = (path, fontSize) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize,
    transition: 'color var(--transition-fast)',
    textDecoration: 'none',
    color: isActive(path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
    fontWeight: isActive(path) ? 600 : 500,
  });

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
        <Link to="/" onClick={handleNavClick} style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
        }}>
          <span className="gradient-text">imsonw</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '0.05em' }}>-labs</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="no-print desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1.25rem', alignItems: 'center', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} onClick={handleNavClick} style={{ ...linkStyle(item.path, '0.95rem'), padding: '0.25rem 0.5rem' }}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ height: '20px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

          <NavActions variant="desktop" />
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
        <div className="mobile-drawer no-print" style={{
          position: 'absolute',
          top: '4.5rem',
          left: '0',
          width: '100%',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} onClick={handleNavClick} style={{ ...linkStyle(item.path, '1.1rem'), textAlign: 'left', width: '100%', padding: '0.5rem 0' }}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ height: '1px', width: '100%', backgroundColor: 'var(--border-color)' }}></div>

          <NavActions variant="mobile" />
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
