import React, { createContext, useContext, useEffect } from 'react';
import { translations } from '../data/translations';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorageState('blog_lang', 'vi', {
    validate: (saved, fallback) => (saved === 'en' ? 'en' : fallback),
  });

  const [theme, setTheme] = useLocalStorageState('blog_theme', 'dark', {
    validate: (saved, fallback) => (saved === 'light' ? 'light' : fallback),
  });

  const toggleLanguage = () => setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'));
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Apply theme class to document root
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Translation function
  const t = (key) => translations[language][key] || key;

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
