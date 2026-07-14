import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const baseButtonStyle = {
  background: 'none',
  border: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
};

export default function NavActions({ variant = 'desktop' }) {
  const { language, toggleLanguage, theme, toggleTheme, t } = useApp();
  const isMobile = variant === 'mobile';
  const iconSize = isMobile ? 18 : 16;

  return (
    <div style={{
      display: 'flex',
      gap: isMobile ? undefined : '0.75rem',
      justifyContent: isMobile ? 'space-between' : undefined,
      alignItems: 'center',
    }}>
      <button
        onClick={toggleLanguage}
        title={t('navChangeLanguage')}
        style={{
          ...baseButtonStyle,
          gap: isMobile ? '0.5rem' : '0.4rem',
          fontSize: isMobile ? '1rem' : '0.85rem',
          fontWeight: 600,
          padding: isMobile ? '0.5rem 1rem' : '0.4rem 0.6rem',
        }}
      >
        <Globe size={iconSize} />
        <span>{language.toUpperCase()}</span>
      </button>

      <button
        onClick={toggleTheme}
        title={t('navToggleTheme')}
        style={{
          ...baseButtonStyle,
          justifyContent: 'center',
          gap: isMobile ? '0.5rem' : 0,
          padding: isMobile ? '0.5rem 1rem' : '0.4rem',
        }}
      >
        {theme === 'dark' ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
        {isMobile && (
          <span style={{ fontSize: '0.95rem' }}>
            {theme === 'dark' ? t('navLightMode') : t('navDarkMode')}
          </span>
        )}
      </button>
    </div>
  );
}
