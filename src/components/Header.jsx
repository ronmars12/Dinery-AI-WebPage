import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../App';
import dineryLogo from '../assets/dinery-logo.png';

const DEFAULT_LANGUAGE = 'NO';
const LANGUAGE_STORAGE_KEY = 'dinery-language';

const headerTranslations = {
  US: {
    navHome: 'Home',
    navCustomers: 'Customers',
    navRestaurants: 'Restaurants',
    navPricing: 'Pricing',
    navInvestors: 'Investors',
    navCalculators: 'Calculators',
    navFaq: 'FAQ',
    navFoundersStory: 'Founders story',
    navNews: 'News',
    navMore: 'More',
    navCta: 'Explore Dinery',
    languageTitle: 'Language',
  },
  FI: {
    navHome: 'Koti',
    navCustomers: 'Asiakkaat',
    navRestaurants: 'Ravintolat',
    navPricing: 'Hinnat',
    navInvestors: 'Sijoittajille',
    navCalculators: 'Laskurit',
    navFaq: 'UKK',
    navFoundersStory: 'Perustajien tarina',
    navNews: 'Uutiset',
    navMore: 'Lisää',
    navCta: 'Tutustu Dineryyn',
    languageTitle: 'Kieli',
  },
  NO: {
    navHome: 'Hjem',
    navCustomers: 'Kunder',
    navRestaurants: 'Restauranter',
    navPricing: 'Priser',
    navInvestors: 'Investorer',
    navCalculators: 'Kalkulatorer',
    navFaq: 'FAQ',
    navFoundersStory: 'Gründernes historie',
    navNews: 'Nyheter',
    navMore: 'Mer',
    navCta: 'Utforsk Dinery',
    languageTitle: 'Språk',
  },
  SE: {
    navHome: 'Hem',
    navCustomers: 'Kunder',
    navRestaurants: 'Restauranger',
    navPricing: 'Priser',
    navInvestors: 'Investerare',
    navCalculators: 'Kalkylatorer',
    navFaq: 'FAQ',
    navFoundersStory: 'Grundarnas berättelse',
    navNews: 'Nyheter',
    navMore: 'Mer',
    navCta: 'Utforska Dinery',
    languageTitle: 'Språk',
  },
  DE: {
    navHome: 'Startseite',
    navCustomers: 'Kunden',
    navRestaurants: 'Restaurants',
    navPricing: 'Preise',
    navInvestors: 'Investoren',
    navCalculators: 'Rechner',
    navFaq: 'FAQ',
    navFoundersStory: 'Gründerstory',
    navNews: 'Neuigkeiten',
    navMore: 'Mehr',
    navCta: 'Dinery entdecken',
    languageTitle: 'Sprache',
  },
};

const languages = [
  { code: 'NO', short: 'NO', label: 'Norsk' },
  { code: 'US', short: 'EN', label: 'English' },
  { code: 'FI', short: 'FI', label: 'Suomi' },
  { code: 'SE', short: 'SV', label: 'Svenska' },
  { code: 'DE', short: 'DE', label: 'Deutsch' },
];

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return languages.some((language) => language.code === storedLanguage)
    ? storedLanguage
    : DEFAULT_LANGUAGE;
};

const LanguageFlag = ({ code, className = 'h-4 w-6' }) => {
  const sharedClassName = `${className} overflow-hidden rounded-[3px] ring-1 ring-white/15`;

  if (code === 'FI') {
    return (
      <svg className={sharedClassName} viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#fff" />
        <rect x="6" width="3" height="16" fill="#003580" />
        <rect y="6.5" width="24" height="3" fill="#003580" />
      </svg>
    );
  }

  if (code === 'SE') {
    return (
      <svg className={sharedClassName} viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#006AA7" />
        <rect x="6" width="3" height="16" fill="#FECC00" />
        <rect y="6.5" width="24" height="3" fill="#FECC00" />
      </svg>
    );
  }

  if (code === 'DE') {
    return (
      <svg className={sharedClassName} viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="5.34" fill="#111" />
        <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
        <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
      </svg>
    );
  }

  if (code === 'US') {
    return (
      <svg className={sharedClassName} viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#B22234" />
        <path d="M0 2.45h24M0 4.92h24M0 7.38h24M0 9.85h24M0 12.31h24M0 14.77h24" stroke="#fff" strokeWidth="1.23" />
        <rect width="10.2" height="8.62" fill="#3C3B6E" />
      </svg>
    );
  }

  return (
    <svg className={sharedClassName} viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#EF2B2D" />
      <rect x="6" width="4" height="16" fill="#fff" />
      <rect y="6" width="24" height="4" fill="#fff" />
      <rect x="7" width="2" height="16" fill="#002868" />
      <rect y="7" width="24" height="2" fill="#002868" />
    </svg>
  );
};

const Header = () => {
  const { changeLanguage } = useLanguage();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const languageMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  const t = headerTranslations[selectedLanguage] || headerTranslations.NO;
  const currentMarket = languages.find((language) => language.code === selectedLanguage) || languages[0];

  const primaryNavItems = [
    { to: '/', label: t.navHome, end: true },
    { to: '/customers', label: t.navCustomers },
    { to: '/restaurants', label: t.navRestaurants },
    { to: '/price', label: t.navPricing },
    { to: '/investors', label: t.navInvestors },
  ];

  const moreNavItems = [
    { to: '/calculators', label: t.navCalculators },
    { to: '/faq', label: t.navFaq },
    { to: '/founders-story', label: t.navFoundersStory },
    { to: '/news', label: t.navNews },
  ];

  const moreIsActive = moreNavItems.some(
    (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
  );

  useEffect(() => {
    changeLanguage(selectedLanguage);

    const animationFrame = window.requestAnimationFrame(() => setHeaderVisible(true));
    return () => window.cancelAnimationFrame(animationFrame);
    // The stored/default language should only be applied once when the header mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setLanguageOpen(false);
        setMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
    setMoreOpen(false);
    setMobileMoreOpen(false);
  };

  const selectLanguage = (languageCode) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode);
    setLanguageOpen(false);
    setMenuOpen(false);
  };

  const navLinkClassName = ({ isActive }) =>
    `relative whitespace-nowrap py-2 text-[11px] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-[#ff6b22] after:transition-transform ${
      isActive
        ? 'text-white after:scale-x-100'
        : 'text-white/58 hover:text-white after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/[0.08] bg-[#101923]/95 text-white backdrop-blur-xl transition-all duration-500 ease-out ${
        headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-5 sm:px-8 lg:px-10 2xl:px-20">
        <Link to="/" aria-label="Dinery.ai home" className="group relative z-10 inline-flex shrink-0 items-center gap-3" onClick={closeMenu}>
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[#ff6b22] shadow-[0_8px_24px_rgba(255,107,34,0.25)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <img
              src={dineryLogo}
              alt="Dinery.ai"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextElementSibling.style.display = 'grid';
              }}
            />
            <span className="hidden h-full w-full place-items-center text-xs font-black text-white">D</span>
          </span>
          <span className="text-xs font-extrabold tracking-[-0.02em] text-white">
            DINERY<span className="text-[#ff6b22]">.</span>AI
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {primaryNavItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClassName}>
              {item.label}
            </NavLink>
          ))}

          <div ref={moreMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setMoreOpen((open) => !open);
                setLanguageOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className={`inline-flex items-center gap-1.5 py-2 text-[11px] font-semibold transition-colors ${
                moreIsActive || moreOpen ? 'text-white' : 'text-white/58 hover:text-white'
              }`}
            >
              {t.navMore}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
              role="menu"
              className={`absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#18232e] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.38)] transition-all duration-200 ease-out ${
                moreOpen
                  ? 'visible translate-y-0 scale-100 opacity-100'
                  : 'invisible pointer-events-none -translate-y-2 scale-[0.98] opacity-0'
              }`}
            >
              {moreNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  onClick={() => setMoreOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/[0.06] hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b22]" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="relative z-10 hidden items-center gap-3 xl:flex">
          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setLanguageOpen((open) => !open);
                setMoreOpen(false);
              }}
              aria-label={t.languageTitle}
              aria-haspopup="listbox"
              aria-expanded={languageOpen}
              className="group inline-flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[11px] font-bold text-white/78 transition-all duration-200 hover:border-[#ff6b22]/40 hover:bg-white/[0.08] hover:text-white"
            >
              <LanguageFlag code={currentMarket.code} />
              <span>{currentMarket.short}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:text-white/70 ${languageOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
              role="listbox"
              aria-label={t.languageTitle}
              className={`absolute right-0 top-full z-50 mt-3 w-52 rounded-2xl border border-white/10 bg-[#18232e] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.38)] transition-all duration-200 ease-out ${
                languageOpen
                  ? 'visible translate-y-0 scale-100 opacity-100'
                  : 'invisible pointer-events-none -translate-y-2 scale-[0.98] opacity-0'
              }`}
            >
              {languages.map((language) => {
                const selected = currentMarket.code === language.code;
                return (
                  <button
                    key={language.code}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => selectLanguage(language.code)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                      selected ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <LanguageFlag code={language.code} />
                    <span className="flex-1 font-semibold">{language.label}</span>
                    <span className="text-[9px] font-bold text-white/30">{language.short}</span>
                    {selected && <Check className="h-3.5 w-3.5 text-[#ff6b22]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <Link to="/restaurants" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#101923] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6b22] hover:text-white">
            {t.navCta}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((open) => !open);
            setLanguageOpen(false);
            setMoreOpen(false);
          }}
          className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/[0.06] xl:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/[0.08] bg-[#101923] transition-[max-height,opacity] duration-300 ease-out xl:hidden ${
          menuOpen ? 'max-h-[52rem] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav aria-label="Mobile navigation" className="px-5 py-5">
          <div className="mx-auto grid max-w-[1920px] gap-1 sm:grid-cols-2">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm transition-colors ${
                    isActive ? 'bg-white/[0.08] font-semibold text-white' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={() => setMobileMoreOpen((open) => !open)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                  moreIsActive ? 'bg-white/[0.08] font-semibold text-white' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                {t.navMore}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out sm:grid-cols-2 ${
                mobileMoreOpen ? 'mt-1 max-h-72 gap-1 opacity-100' : 'max-h-0 gap-0 opacity-0'
              }`}>
                {moreNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-6 py-3 text-sm transition-colors ${
                        isActive ? 'bg-white/[0.08] font-semibold text-white' : 'text-white/55 hover:bg-white/[0.05] hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mt-3 border-t border-white/[0.08] pt-4 sm:col-span-2">
              <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">{t.languageTitle}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {languages.map((language) => {
                  const selected = currentMarket.code === language.code;
                  return (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => selectLanguage(language.code)}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-all duration-200 ${
                        selected
                          ? 'border-[#ff6b22]/60 bg-[#ff6b22]/10 text-white'
                          : 'border-white/10 text-white/60 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      <LanguageFlag code={language.code} />
                      <span>{language.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Link to="/restaurants" onClick={closeMenu} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b22] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:col-span-2">
              {t.navCta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;