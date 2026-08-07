// App.jsx with inline language context
import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import News from './components/LatestNew';
import Customer from './components/Customer';
import Investor from './components/Investor';
import FAQ from './components/FAQ';
import FounderStory from './components/FounderStory';
import Footer from './components/Footer';
import RestaurantOnboarding from './components/Restaurant';
import DineryCalculators from './components/DineryCalculators';
import Price from './components/Price';
// Create Language Context inline
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  // If a component calls useLanguage outside of a LanguageProvider,
  // return a safe default instead of crashing the whole tree.
  if (!context) {
    return {
      currentLanguage: 'US',
      changeLanguage: () => {},
      isEnglish: true,
      isFinnish: false,
      isNorwegian: false,
      isSwedish: false,
      isGerman: false,
    };
  }

  return context;
};

const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('US');

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'US' || currentLanguage === 'UK',
    isFinnish: currentLanguage === 'FI',
    isNorwegian: currentLanguage === 'NO',
    isSwedish: currentLanguage === 'SE',
    isGerman: currentLanguage === 'DE',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/restaurants" element={<RestaurantOnboarding />} />
            <Route path="/investors" element={<Investor />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/founders-story" element={<FounderStory />} />
            <Route path="/news" element={<News />} />
            <Route path="/calculators" element={<DineryCalculators />} />
            <Route path="/price" element={<Price />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;