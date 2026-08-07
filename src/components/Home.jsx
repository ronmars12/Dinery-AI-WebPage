// Dinery.ai premium homepage component
import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  Percent,
  ShoppingBag,
} from 'lucide-react';
import { useLanguage } from '../App';
import { Link } from 'react-router-dom';

/**
 * NOTE: These are placeholder food photos from Unsplash — swap the URLs for your own later.
 */
const FOOD_IMAGE_HERO =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80';
const FOOD_IMAGE_FLAVOR =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80';

/**
 * All copy lives here. Only the US (English) locale is filled in for the new layout —
 * other languages fall back to US, so nothing breaks. Add FI / NO / SE / DE keys the
 * same way you had them before whenever you're ready to translate.
 */
const translations = {
  US: {
    heroTag: 'Smarter dining, better business',
    heroTitle1: 'Great tables',
    heroTitle2: 'should never',
    heroTitleAccent: 'go empty.',
    heroDesc:
      'Dinery connects spontaneous diners with remarkable restaurants—unlocking exclusive offers when they matter most.',
    heroCta1: 'Find your next table',
    heroCta2: 'I run a restaurant',
    heroStatus: 'Pre-launch · Early access opening soon',
    heroStatusSub: 'Be among the first diners and restaurant partners to shape Dinery.',
    savedBadge: 'Restaurant-led offers',
    savedBadgeSub: 'Flexible timing and availability',
    liveTitle: 'A simpler way to dine',
    liveTag: 'PREVIEW',
    liveRestaurant: 'Discover local restaurant offers',
    liveMeta: 'Dine in or collect directly',

    statsLabel: 'WHAT DINERY IS BUILDING',
    stats: [
      { value: 'Pre-launch', label: 'building with early feedback' },
      { value: 'Local first', label: 'independent restaurant discovery' },
      { value: 'Direct', label: 'restaurant-to-diner connection' },
      { value: 'Flexible', label: 'restaurant-controlled offers' },
    ],

    howLabel: 'EFFORTLESS BY DESIGN',
    howTitle1: 'From empty table to',
    howTitleAccent: 'your new favorite place.',
    howSub: 'Three simple steps. One exceptional evening.',
    steps: [
      {
        title: 'Discover nearby tables',
        desc: 'Explore participating restaurants and clearly presented availability around you.',
      },
      {
        title: 'Unlock a better price',
        desc: 'Choose restaurant-defined offers designed for quieter dining hours.',
      },
      {
        title: 'Dine your way',
        desc: 'Enjoy the experience in the restaurant or bring something special home.',
      },
    ],

    dinersLabel: 'FOR CURIOUS DINERS',
    dinersTitle1: 'More flavor.',
    dinersTitleAccent: 'Less compromise.',
    dinersDesc:
      'Explore local restaurant options, compare clearly presented offers, and plan a dining experience that fits your evening.',
    dinersFeatures: [
      {
        title: 'Offers worth going out for',
        desc: 'Access clearly presented offers without compromising on quality.',
      },
      {
        title: 'Restaurant-led by design',
        desc: 'Restaurants present their own availability and offer conditions.',
      },
      {
        title: 'Flexible by nature',
        desc: 'Dine in or take home—whatever the evening calls for.',
      },
    ],
    dinersCta: 'Start discovering',
    dinnersBadge: 'Made for discovery',
    dinnersBadgeSub: 'Local restaurants, better-timed dining',
    discoveryDescription: 'Find quality local dining when restaurants have room to welcome you.',
    discoveryTitle: 'Dinery experience',
    discoveryLabel: 'Product vision · Pre-launch',

    restLabel: 'FOR AMBITIOUS RESTAURANTS',
    restTitle1: 'Turn quiet hours into',
    restTitleAccent: 'your next regulars.',
    restDesc:
      'Dinery helps great restaurants fill the right tables at the right time—without diluting the brand they worked hard to build.',
    restStats: [
      { value: 'Stay in control', label: 'Set availability, timing, and offer conditions.' },
      { value: 'Build direct demand', label: 'Reach diners without relying on delivery logistics.' },
    ],
    restCta: 'Become a partner',
    partnerPreviewTitle: 'Partner workspace',
    partnerPreviewSub: 'A preview of the tools we are building',
    partnerFeatures: [
      'Create and schedule off-peak offers',
      'Control availability and redemption limits',
      'Understand offer activity from one place',
      'Pause or update campaigns when needed',
    ],
    partnerNote: 'Interface preview — live performance data will appear only after launch.',

    bigLabel: 'THE BIGGER PICTURE',
    bigTitle1: 'Less waste.',
    bigTitle2: 'More vibrant cities.',
    bigTitleAccent: 'Better business.',
    bigDesc:
      'Dinery is building the intelligent demand layer for hospitality—creating sustainable value for restaurants, diners, and the cities they share.',
    bigCta: 'Explore the investment story',

    ctaLabel: 'YOUR NEXT TABLE IS WAITING',
    ctaTitle1: 'Make tonight',
    ctaTitleAccent: 'taste better.',
    ctaSub: 'Local restaurants. Flexible offers. One simple experience.',
    ctaButton: 'Discover Dinery',
  },
};

const Home = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.US;
  const [heroVisible, setHeroVisible] = useState(false);

  // Let the first frame paint before revealing the hero so the entrance is visible.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setHeroVisible(true);
      return undefined;
    }

    const revealTimer = window.setTimeout(() => setHeroVisible(true), 70);
    return () => window.clearTimeout(revealTimer);
  }, []);

  // Scroll-reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('animate-in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#101923] overflow-hidden font-sans antialiased selection:bg-[#ff6b22] selection:text-white">
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden bg-[#101923] px-6 py-20 text-white lg:py-24">
        {/* ambient glows */}
        <div
          className={`absolute -right-24 -top-24 h-[44rem] w-[44rem] rounded-full bg-[#ff6b22]/10 blur-3xl pointer-events-none transition-opacity duration-[1400ms] motion-reduce:transition-none ${
            heroVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute -bottom-52 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[#ff6b22]/5 blur-3xl pointer-events-none transition-opacity duration-[1400ms] motion-reduce:transition-none ${
            heroVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] xl:gap-24">
          {/* left */}
          <div className="space-y-8">
            <div
              className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff9b5e] transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '80ms' : '0ms' }}
            >
              <span className="h-2 w-2 rounded-full bg-[#ff6b22] shadow-[0_0_0_6px_rgba(255,107,34,0.12)]" />
              {t.heroTag}
            </div>

            <h1
              className={`text-[3.75rem] font-semibold leading-[0.92] tracking-[-0.065em] transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:text-7xl lg:text-[5.75rem] xl:text-[6.5rem] ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '150ms' : '0ms' }}
            >
              {t.heroTitle1}
              <br />
              {t.heroTitle2}
              <br />
              <span className="text-[#ff6b22]">{t.heroTitleAccent}</span>
            </h1>

            <p
              className={`max-w-xl text-base leading-8 text-white/58 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:text-lg ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '270ms' : '0ms' }}
            >
              {t.heroDesc}
            </p>

            <div
              className={`flex flex-wrap items-center gap-6 pt-2 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '380ms' : '0ms' }}
            >
              <Link
                to="/restaurants"
                className="group inline-flex min-h-14 items-center gap-5 rounded-full bg-[#ff6b22] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_36px_rgba(255,107,34,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f45d16]"
              >
                {t.heroCta1}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-semibold text-white/85 transition-colors hover:border-[#ff6b22] hover:text-[#ff9b5e]"
              >
                {t.heroCta2}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* honest pre-launch status */}
            <div
              className={`max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '480ms' : '0ms' }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#ff6b22]" />
                {t.heroStatus}
              </div>
              <p className="mt-1 pl-4 text-xs leading-5 text-white/45">{t.heroStatusSub}</p>
            </div>
          </div>

          {/* right visual */}
          <div
            className={`relative transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              heroVisible
                ? 'translate-x-0 scale-100 opacity-100'
                : 'translate-x-8 scale-[0.98] opacity-0'
            }`}
            style={{ transitionDelay: heroVisible ? '220ms' : '0ms' }}
          >
            {/* orbital rings */}
            <div className="pointer-events-none absolute -inset-6 rounded-[3rem] border border-[#ff6b22]/10" />
            <div className="pointer-events-none absolute -right-16 top-1/2 hidden h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border border-[#ff6b22]/15 lg:block" />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.35)] lg:rounded-[13rem_13rem_2rem_2rem]">
              <img
                src={FOOD_IMAGE_HERO}
                alt="Plated fine-dining dish"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* saved badge */}
              <div className="absolute right-5 top-5 flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <Percent className="h-4 w-4 text-[#f2600c]" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-gray-900">{t.savedBadge}</p>
                  <p className="text-[11px] text-gray-500">{t.savedBadgeSub}</p>
                </div>
              </div>
            </div>

            {/* floating live card */}
            <div className="absolute -bottom-6 left-4 w-[20rem] max-w-[86%] rounded-2xl border border-white/70 bg-white/95 p-5 shadow-2xl backdrop-blur-xl lg:-left-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-900">{t.liveTitle}</span>
                <span className="text-[10px] font-bold tracking-widest text-[#f2600c]">
                  {t.liveTag}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#101923] text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-1 leading-tight">
                  <p className="text-sm font-semibold text-gray-900">
                    {t.liveRestaurant}
                  </p>
                  <p className="text-xs text-gray-500">{t.liveMeta}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#ff6b22]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS BAR ===================== */}
      <section className="border-y border-black/5 bg-[#f6f1e9] px-6 py-9">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0d1526]/50 uppercase lg:w-64">
            {t.statsLabel}
          </p>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((s, i) => (
              <div key={i} className="lg:pl-8 lg:border-l border-black/10">
                <p className="text-2xl md:text-3xl font-extrabold text-[#0d1526]">
                  {s.value}
                </p>
                <p className="text-sm text-[#0d1526]/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="bg-[#fffdf9] px-6 py-24 sm:py-28 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-sm font-bold tracking-[0.2em] text-[#f2600c] mb-5">
              {t.howLabel}
            </p>
            <h2 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#101923] md:text-6xl lg:text-7xl">
              {t.howTitle1}
              <br />
              <span className="text-[#f2600c]">{t.howTitleAccent}</span>
            </h2>
            <p className="text-lg text-[#0d1526]/50 mt-6">{t.howSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.steps.map((step, i) => {
              const highlighted = i === 1;
              return (
                <div
                  key={i}
                  className={`animate-on-scroll min-h-[30rem] rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                    highlighted
                      ? 'bg-[#f6f1e9] border-black/10 shadow-xl md:-translate-y-3'
                      : 'bg-white border-black/5 shadow-sm hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        highlighted ? 'bg-[#f2600c]' : 'bg-[#0d1526]'
                      }`}
                    >
                      {i === 0 && <MapPin className="w-5 h-5 text-white" />}
                      {i === 1 && <Percent className="w-5 h-5 text-white" />}
                      {i === 2 && <ShoppingBag className="w-5 h-5 text-white" />}
                    </div>
                    <span className="text-sm font-semibold text-[#0d1526]/30">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold tracking-[-0.025em] text-[#101923]">
                    {step.title}
                  </h3>
                  <p className="text-[#0d1526]/60 leading-relaxed mb-8">
                    {step.desc}
                  </p>

                  {/* mini visual */}
                  {i === 0 && (
                    <div className="relative h-32 rounded-xl bg-[#f5f1e8] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 rotate-[25deg]" />
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -rotate-[25deg]" />
                      </div>
                      <div className="relative w-10 h-10 rounded-full bg-[#f2600c] flex items-center justify-center text-white text-[11px] font-semibold shadow-lg">
                        You
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="h-32 rounded-xl bg-[#0d1526] p-4 flex flex-col justify-between">
                      <span className="text-xs text-gray-400">Tonight</span>
                      <span className="text-2xl font-extrabold text-[#f2600c]">
                        Flexible offer
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Set by the restaurant
                      </span>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="h-32 rounded-xl overflow-hidden flex">
                      <div className="flex-1 bg-[#f5f1e8] flex items-center justify-center text-sm font-semibold text-[#0d1526]">
                        At table
                      </div>
                      <div className="flex-1 bg-[#0d1526] flex items-center justify-center text-sm font-semibold text-white">
                        Takeaway
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== MORE FLAVOR ===================== */}
      <section className="grid lg:grid-cols-2">
        {/* left image */}
        <div className="relative min-h-[38rem] bg-[#101923] lg:min-h-[46rem]">
          <img
            src={FOOD_IMAGE_FLAVOR}
            alt="Chef's plated dish"
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* dinners badge */}
          <div className="absolute top-8 right-8 bg-[#0d1526] rounded-2xl px-5 py-3 shadow-xl">
            <p className="text-xl font-extrabold text-white">{t.dinnersBadge}</p>
            <p className="text-[11px] text-gray-400">{t.dinnersBadgeSub}</p>
          </div>
          {/* pre-launch product positioning */}
          <div className="absolute bottom-6 left-6 max-w-[calc(100%-3rem)] rounded-2xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-8 sm:max-w-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f2600c]">{t.discoveryLabel}</p>
            <p className="mt-3 text-lg font-semibold leading-snug text-[#0d1526]">{t.discoveryTitle}</p>
            <p className="mt-2 text-sm leading-6 text-[#0d1526]/60">{t.discoveryDescription}</p>
          </div>
        </div>

        {/* right content */}
        <div className="animate-on-scroll flex flex-col justify-center bg-[#f6f1e9] px-7 py-20 sm:px-10 lg:px-16 xl:px-24">
          <p className="text-sm font-bold tracking-[0.2em] text-[#f2600c] mb-5">
            {t.dinersLabel}
          </p>
          <h2 className="mb-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl">
            <span className="text-[#0d1526]">{t.dinersTitle1}</span>
            <br />
            <span className="text-[#f2600c]">{t.dinersTitleAccent}</span>
          </h2>
          <p className="text-lg text-[#0d1526]/60 leading-relaxed max-w-md mb-10">
            {t.dinersDesc}
          </p>

          <div className="space-y-6 mb-10">
            {t.dinersFeatures.map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#f2600c]/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#f2600c]" />
                </div>
                <div>
                  <p className="font-bold text-[#0d1526]">{f.title}</p>
                  <p className="text-[#0d1526]/50 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/restaurants"
            className="group inline-flex items-center gap-2 bg-[#0d1526] hover:bg-black text-white px-7 py-4 rounded-full font-semibold w-fit transition-all duration-300 hover:-translate-y-0.5"
          >
            {t.dinersCta}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ===================== FOR RESTAURANTS ===================== */}
      <section className="overflow-hidden bg-[#101923] px-6 py-24 text-white sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div className="animate-on-scroll">
            <p className="text-sm font-bold tracking-[0.2em] text-[#f2600c] mb-5">
              {t.restLabel}
            </p>
            <h2 className="mb-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl">
              <span className="text-white">{t.restTitle1}</span>
              <br />
              <span className="text-[#f2600c]">{t.restTitleAccent}</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md mb-10">
              {t.restDesc}
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              {t.restStats.map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-[#f2600c] hover:bg-[#d9540a] text-white px-7 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-orange-900/40 hover:-translate-y-0.5"
            >
              {t.restCta}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* honest pre-launch partner workspace preview */}
          <div className="animate-on-scroll animation-delay-200">
            <div className="rounded-3xl border border-white/70 bg-[#f6f1e9] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.32)] transition-transform duration-500 hover:rotate-0 sm:p-8 lg:rotate-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm font-extrabold tracking-wide text-[#0d1526]">
                    DINERY<span className="text-[#f2600c]">.</span>AI
                  </p>
                  <p className="text-xs text-[#0d1526]/50">{t.partnerPreviewSub}</p>
                </div>
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-medium text-[#f2600c]">
                  Preview
                </span>
              </div>

              <div className="border-b border-black/10 pb-5">
                <p className="text-2xl font-bold tracking-tight text-[#0d1526]">{t.partnerPreviewTitle}</p>
                <p className="mt-2 text-sm leading-6 text-[#0d1526]/55">Manage the offer experience while keeping pricing, capacity, and timing in your hands.</p>
              </div>

              <div className="mt-5 space-y-3">
                {t.partnerFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white/55 p-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2600c]/10">
                      <Check className="h-3.5 w-3.5 text-[#f2600c]" />
                    </span>
                    <span className="text-sm font-medium text-[#0d1526]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[#0d1526] p-4">
                <p className="text-xs leading-5 text-white/60">{t.partnerNote}</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THE BIGGER PICTURE ===================== */}
      <section className="bg-[#fffdf9] px-6 py-24 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:items-start">
          <div className="animate-on-scroll">
            <p className="text-sm font-bold tracking-[0.2em] text-[#f2600c] mb-6">
              {t.bigLabel}
            </p>
            <h2 className="text-5xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-6xl lg:text-7xl">
              <span className="text-[#0d1526]">{t.bigTitle1}</span>
              <br />
              <span className="text-[#0d1526]">{t.bigTitle2}</span>
              <br />
              <span className="text-[#f2600c]">{t.bigTitleAccent}</span>
            </h2>
          </div>
          <div className="animate-on-scroll animation-delay-200 lg:pt-4">
            <p className="text-lg text-[#0d1526]/60 leading-relaxed mb-6">
              {t.bigDesc}
            </p>
            <Link
              to="/investors"
              className="group inline-flex items-center gap-2 font-bold text-[#0d1526] border-b-2 border-[#0d1526] pb-1 hover:text-[#f2600c] hover:border-[#f2600c] transition-colors"
            >
              {t.bigCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-[#ff6b22] px-6 py-24 text-white sm:py-28 lg:py-32">
        {/* concentric rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center animate-on-scroll">
          <p className="text-sm font-bold tracking-[0.25em] text-white/70 mb-6">
            {t.ctaLabel}
          </p>
          <h2 className="mb-6 text-6xl font-semibold leading-[0.94] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            <span className="text-white">{t.ctaTitle1}</span>
            <br />
            <span className="text-[#0d1526]">{t.ctaTitleAccent}</span>
          </h2>
          <p className="text-lg text-white/80 mb-10">{t.ctaSub}</p>
          <Link
            to="/restaurants"
            className="group inline-flex items-center gap-2 bg-white text-[#0d1526] px-8 py-4 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
          >
            {t.ctaButton}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* animations */}
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .animation-delay-200 {
          transition-delay: 200ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll,
          .animate-on-scroll.animate-in {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;