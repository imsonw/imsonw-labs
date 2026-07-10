import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language State
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('blog_lang');
    return savedLang === 'en' ? 'en' : 'vi';
  });

  // Theme State (Default to Dark Mode for premium feel)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('blog_theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  // Handle language change
  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'vi' ? 'en' : 'vi';
      localStorage.setItem('blog_lang', next);
      return next;
    });
  };

  // Handle theme change
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('blog_theme', next);
      return next;
    });
  };

  // Apply theme class to document body/html
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Translation function
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
