// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('US');

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'US' || currentLanguage === 'UK',
    isFinnish: currentLanguage === 'FI',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};