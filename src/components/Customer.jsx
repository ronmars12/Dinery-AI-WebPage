import React, { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Sparkles, Store } from 'lucide-react';
import { useLanguage } from '../App';
import appStoreBadge from '../assets/appstore.png';
import playStoreBadge from '../assets/playstore.png';
import dineryApp from '../assets/DineryApp.png';

const translations = {
  US: {
    label: 'DINERY FOR DINERS',
    title1: 'Discover local dining.',
    title2: 'Choose what fits tonight.',
    description:
      'Dinery brings nearby restaurants and restaurant-led opportunities into one clear, easy-to-use experience.',
    appStoreTop: 'Download on the',
    appStore: 'App Store',
    comingSoon: 'COMING SOON',
    playStore: 'Google Play',
    note: 'Explore the iOS app today. Android support is on the way.',
    sectionLabel: 'WHY DINERY',
    sectionTitle: 'A simpler way to choose where to eat.',
    benefits: [
      {
        title: 'Discover nearby',
        description: 'Explore participating local restaurants in one focused place.',
      },
      {
        title: 'Choose with clarity',
        description: 'See restaurant-led availability and conditions before deciding.',
      },
      {
        title: 'Support local dining',
        description: 'Connect directly with restaurants in your community.',
      },
    ],
  },
  FI: {
    label: 'DINERY RUOKAILIJOILLE',
    title1: 'Löydä paikallisia ravintoloita.',
    title2: 'Valitse tämän illan suunnitelma.',
    description:
      'Dinery kokoaa lähiravintolat ja niiden omat mahdollisuudet yhteen selkeään kokemukseen.',
    appStoreTop: 'Lataa',
    appStore: 'App Storesta',
    comingSoon: 'TULOSSA PIAN',
    playStore: 'Google Play',
    note: 'Tutustu iOS-sovellukseen jo tänään. Android-tuki on tulossa.',
    sectionLabel: 'MIKSI DINERY',
    sectionTitle: 'Helpompi tapa valita ruokapaikka.',
    benefits: [
      {
        title: 'Löydä läheltä',
        description: 'Tutustu paikallisiin ravintoloihin yhdessä selkeässä paikassa.',
      },
      {
        title: 'Valitse selkeästi',
        description: 'Näe ravintolan saatavuus ja ehdot ennen valintaa.',
      },
      {
        title: 'Tue paikallisia',
        description: 'Luo suora yhteys oman alueesi ravintoloihin.',
      },
    ],
  },
  NO: {
    label: 'DINERY FOR GJESTER',
    title1: 'Oppdag lokale restauranter.',
    title2: 'Velg det som passer i kveld.',
    description:
      'Dinery samler restauranter i nærheten og restaurantstyrte muligheter i én tydelig opplevelse.',
    appStoreTop: 'Last ned på',
    appStore: 'App Store',
    comingSoon: 'KOMMER SNART',
    playStore: 'Google Play',
    note: 'Utforsk iOS-appen i dag. Android-støtte er på vei.',
    sectionLabel: 'HVORFOR DINERY',
    sectionTitle: 'En enklere måte å velge spisested.',
    benefits: [
      {
        title: 'Oppdag i nærheten',
        description: 'Utforsk lokale restauranter på ett oversiktlig sted.',
      },
      {
        title: 'Velg med klarhet',
        description: 'Se tilgjengelighet og vilkår før du bestemmer deg.',
      },
      {
        title: 'Støtt lokalt',
        description: 'Kom i direkte kontakt med restauranter i nærmiljøet.',
      },
    ],
  },
  SE: {
    label: 'DINERY FÖR GÄSTER',
    title1: 'Upptäck lokala restauranger.',
    title2: 'Välj det som passar ikväll.',
    description:
      'Dinery samlar restauranger i närheten och restaurangstyrda möjligheter i en tydlig upplevelse.',
    appStoreTop: 'Hämta i',
    appStore: 'App Store',
    comingSoon: 'KOMMER SNART',
    playStore: 'Google Play',
    note: 'Utforska iOS-appen idag. Android-stöd är på väg.',
    sectionLabel: 'VARFÖR DINERY',
    sectionTitle: 'Ett enklare sätt att välja restaurang.',
    benefits: [
      {
        title: 'Upptäck i närheten',
        description: 'Utforska lokala restauranger på en tydlig plats.',
      },
      {
        title: 'Välj med tydlighet',
        description: 'Se tillgänglighet och villkor innan du väljer.',
      },
      {
        title: 'Stöd lokalt',
        description: 'Skapa direkt kontakt med restauranger i ditt område.',
      },
    ],
  },
  DE: {
    label: 'DINERY FÜR GÄSTE',
    title1: 'Lokale Restaurants entdecken.',
    title2: 'Wählen, was heute passt.',
    description:
      'Dinery bündelt Restaurants in der Nähe und restaurantgeführte Möglichkeiten in einem klaren Erlebnis.',
    appStoreTop: 'Laden im',
    appStore: 'App Store',
    comingSoon: 'BALD VERFÜGBAR',
    playStore: 'Google Play',
    note: 'Entdecken Sie heute die iOS-App. Android-Unterstützung folgt.',
    sectionLabel: 'WARUM DINERY',
    sectionTitle: 'Ein einfacherer Weg zum passenden Restaurant.',
    benefits: [
      {
        title: 'In der Nähe entdecken',
        description: 'Lokale Restaurants übersichtlich an einem Ort finden.',
      },
      {
        title: 'Klar entscheiden',
        description: 'Verfügbarkeit und Bedingungen vor der Wahl sehen.',
      },
      {
        title: 'Lokal unterstützen',
        description: 'Direkt mit Restaurants in Ihrer Umgebung verbinden.',
      },
    ],
  },
};

const benefitIcons = [MapPin, Sparkles, Store];

const Customer = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.US;
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      setHeroVisible(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setHeroVisible(true), 70);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.customer-reveal');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [currentLanguage]);

  const heroTransition =
    'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

  return (
    <main className="overflow-hidden bg-[#fffdf9] text-[#101923] antialiased">
      <section className="relative overflow-hidden bg-[#101923] px-6 pt-16 text-white lg:pt-20">
        <div
          className={`pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[#ff6b22]/10 blur-3xl transition-opacity duration-[1400ms] motion-reduce:transition-none ${
            heroVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="pb-14 lg:pb-20">
            <p
              className={`mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff9b5e] ${heroTransition} ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '70ms' : '0ms' }}
            >
              {t.label}
            </p>

            <h1
              className={`max-w-2xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-6xl lg:text-7xl ${heroTransition} ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '150ms' : '0ms' }}
            >
              {t.title1}
              <br />
              <span className="text-[#ff6b22]">{t.title2}</span>
            </h1>

            <p
              className={`mt-6 max-w-xl text-sm leading-7 text-white/55 md:text-base ${heroTransition} ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '270ms' : '0ms' }}
            >
              {t.description}
            </p>

            <div
              className={`mt-7 flex flex-col gap-3 sm:flex-row sm:items-center ${heroTransition} ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '380ms' : '0ms' }}
            >
              <a
                href="https://apps.apple.com/app/id6749490375"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-48 items-center justify-center rounded-xl bg-white px-4 text-[#101923] shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Download Dinery on the App Store"
              >
                <img src={appStoreBadge} alt="" className="mr-3 h-8 w-auto" />
                <span className="text-left">
                  <span className="block text-[10px] leading-none opacity-55">
                    {t.appStoreTop}
                  </span>
                  <span className="mt-1 block text-lg font-bold leading-none">
                    {t.appStore}
                  </span>
                </span>
                <ArrowUpRight className="ml-2 h-4 w-4 opacity-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div
                className="flex h-14 w-48 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white/40"
                aria-label={`${t.playStore} ${t.comingSoon}`}
              >
                <img
                  src={playStoreBadge}
                  alt=""
                  className="mr-3 h-8 w-auto opacity-35"
                />
                <span className="text-left">
                  <span className="block text-[10px] leading-none">{t.comingSoon}</span>
                  <span className="mt-1 block text-lg font-bold leading-none">
                    {t.playStore}
                  </span>
                </span>
              </div>
            </div>

            <p
              className={`mt-4 text-[11px] text-white/35 ${heroTransition} ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: heroVisible ? '470ms' : '0ms' }}
            >
              {t.note}
            </p>
          </div>

          <div
            className={`relative mx-auto h-[350px] w-full max-w-lg overflow-hidden sm:h-[410px] lg:h-[470px] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              heroVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-8 scale-[0.97] opacity-0'
            }`}
            style={{ transitionDelay: heroVisible ? '220ms' : '0ms' }}
          >
            <div className="pointer-events-none absolute left-1/2 top-8 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full border border-[#ff6b22]/15" />
            <div className="pointer-events-none absolute left-1/2 top-24 h-[23rem] w-[23rem] -translate-x-1/2 rounded-full bg-[#ff6b22]/10 blur-3xl" />
            <img
              src={dineryApp}
              alt="Upper half of the Dinery iOS app"
              className="absolute left-1/2 top-4 h-auto w-[280px] -translate-x-1/2 object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.32)] sm:w-[330px] lg:w-[380px]"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="customer-reveal max-w-2xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff6b22]">
              {t.sectionLabel}
            </p>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-5xl">
              {t.sectionTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <article
                  key={benefit.title}
                  className="customer-reveal group rounded-2xl border border-black/[0.07] bg-[#f6f1e9] p-6 transition-[opacity,transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,25,35,0.08)]"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#ff6b22] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/50">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .customer-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition-duration: 800ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .customer-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .customer-reveal,
          .customer-reveal.is-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
};

export default Customer;