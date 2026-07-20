import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../App';
import dineryLogo from '../assets/dinery-logo.png';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items with translations
  const getNavigationItems = () => {
    switch (currentLanguage) {
      case 'FI':
        return [
          { name: 'Koti', href: '/' },
          { name: 'Asiakkaat', href: '/customers' },
          { name: 'Ravintolat', href: '/restaurants' },
          { name: 'Sijoittajat', href: '/investors' },
          { name: 'Laskurit', href: '/calculators' },
          { name: 'UKK', href: '/faq' },
          { name: 'Perustajien tarina', href: '/founders-story' },
          { name: 'Uutiset', href: '/news' },
        ];
      case 'NO':
        return [
          { name: 'Hjem', href: '/' },
          { name: 'Kunder', href: '/customers' },
          { name: 'Restauranter', href: '/restaurants' },
          { name: 'Investorer', href: '/investors' },
          { name: 'Kalkulatorer', href: '/calculators' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Grunnleggernes historie', href: '/founders-story' },
          { name: 'Nyheter', href: '/news' },
        ];
      case 'SE':
        return [
          { name: 'Hem', href: '/' },
          { name: 'Kunder', href: '/customers' },
          { name: 'Restauranger', href: '/restaurants' },
          { name: 'Investerare', href: '/investors' },
          { name: 'Kalkylatorer', href: '/calculators' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Grundarnas berättelse', href: '/founders-story' },
          { name: 'Nyheter', href: '/news' },
        ];
      case 'DE':
        return [
          { name: 'Startseite', href: '/' },
          { name: 'Kunden', href: '/customers' },
          { name: 'Restaurants', href: '/restaurants' },
          { name: 'Investoren', href: '/investors' },
          { name: 'Rechner', href: '/calculators' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Gründergeschichte', href: '/founders-story' },
          { name: 'Nachrichten', href: '/news' },
        ];
      default:
        return [
          { name: 'Home', href: '/' },
          { name: 'Customers', href: '/customers' },
          { name: 'Restaurants', href: '/restaurants' },
          { name: 'Investors', href: '/investors' },
          { name: 'Calculators', href: '/calculators' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Founders story', href: '/founders-story' },
          { name: 'News', href: '/news' },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  // Flag SVG components for each market
  const USFlag = () => (
    <svg className="w-6 h-4 rounded-sm" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="16" fill="#B22234"/>
      <rect y="1.23" width="24" height="1.23" fill="white"/>
      <rect y="3.69" width="24" height="1.23" fill="white"/>
      <rect y="6.15" width="24" height="1.23" fill="white"/>
      <rect y="8.62" width="24" height="1.23" fill="white"/>
      <rect y="11.08" width="24" height="1.23" fill="white"/>
      <rect y="13.54" width="24" height="1.23" fill="white"/>
      <rect width="9.6" height="8.62" fill="#3C3B6E"/>
    </svg>
  );

  const FinlandFlag = () => (
    <svg className="w-6 h-4 rounded-sm" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="16" fill="white"/>
      <rect x="6" y="0" width="3" height="16" fill="#003580"/>
      <rect x="0" y="6.5" width="24" height="3" fill="#003580"/>
    </svg>
  );

  const NorwayFlag = () => (
    <svg className="w-6 h-4 rounded-sm" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="16" fill="#EF2B2D"/>
      <rect x="6" y="0" width="4" height="16" fill="white"/>
      <rect x="0" y="6" width="24" height="4" fill="white"/>
      <rect x="7" y="0" width="2" height="16" fill="#002868"/>
      <rect x="0" y="7" width="24" height="2" fill="#002868"/>
    </svg>
  );

  const SwedenFlag = () => (
    <svg className="w-6 h-4 rounded-sm" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="16" fill="#006AA7"/>
      <rect x="6" y="0" width="3" height="16" fill="#FECC00"/>
      <rect x="0" y="6.5" width="24" height="3" fill="#FECC00"/>
    </svg>
  );

  const GermanyFlag = () => (
    <svg className="w-6 h-4 rounded-sm" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="5.33" fill="#000000"/>
      <rect y="5.33" width="24" height="5.34" fill="#DD0000"/>
      <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
    </svg>
  );

  const markets = [
    { flag: <USFlag />, code: 'US', label: 'United States' },
    { flag: <FinlandFlag />, code: 'FI', label: 'Finland' },
    { flag: <NorwayFlag />, code: 'NO', label: 'Norway' },
    { flag: <SwedenFlag />, code: 'SE', label: 'Sweden' },
    { flag: <GermanyFlag />, code: 'DE', label: 'Germany' },
  ];

  // Function to check if current path matches the navigation item
  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname === href;
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
  };

  return (
    <header className="bg-orange-500 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={dineryLogo} 
                alt="Dinery.AI Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback logo in case image doesn't load */}
              <div className="hidden items-center">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white font-bold text-3xl leading-none">×</span>
                </div>
                <div className="ml-4">
                  <span className="text-white font-bold text-2xl tracking-wider">
                    DINER
                  </span>
                  <span className="text-white font-light text-2xl">
                    .AI
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`relative text-base font-medium transition-all duration-300 hover:text-white ${
                  isActive(item.href) 
                    ? 'text-white' 
                    : 'text-white text-opacity-90'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Market Selector with Flags */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2">
              {markets.map((market, index) => (
                <React.Fragment key={market.code}>
                  <button
                    onClick={() => handleLanguageChange(market.code)}
                    className={`flex items-center hover:opacity-80 transition-all cursor-pointer group p-1 rounded ${
                      currentLanguage === market.code ? 'ring-2 ring-white ring-opacity-50' : ''
                    }`}
                    title={market.label}
                  >
                    <div className="transform group-hover:scale-110 transition-transform duration-200">
                      {market.flag}
                    </div>
                  </button>
                  {index < markets.length - 1 && (
                    <div className="w-px h-3 bg-white bg-opacity-30" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-white border-opacity-20 mt-2 pt-6">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-white bg-white bg-opacity-20'
                      : 'text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Market Selector */}
              <div className="pt-4 border-t border-white border-opacity-20 mt-4">
                <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
                  {markets.map((market, index) => (
                    <React.Fragment key={market.code}>
                      <button
                        onClick={() => handleLanguageChange(market.code)}
                        className={`flex items-center hover:opacity-80 transition-all cursor-pointer p-1 rounded ${
                          currentLanguage === market.code ? 'ring-2 ring-white ring-opacity-50' : ''
                        }`}
                        title={market.label}
                      >
                        <div className="transform hover:scale-110 transition-transform duration-200">
                          {market.flag}
                        </div>
                      </button>
                      {index < markets.length - 1 && index !== 2 && (
                        <div className="w-px h-3 bg-white bg-opacity-30" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;