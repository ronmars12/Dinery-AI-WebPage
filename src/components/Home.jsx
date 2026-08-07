// Dinery.ai — compact premium homepage using local project assets.
import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  Check,
  MapPin,
  Percent,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';
import image1 from '../assets/image1.png';
import dineryApp from '../assets/DineryApp.png';
import dashboard from '../assets/dashboard.png';

const translations = {
  US: {
    heroTag: 'Smarter dining, better business',
    heroTitle1: 'Great tables',
    heroTitle2: 'should never',
    heroTitleAccent: 'go empty.',
    heroDesc:
      'Dinery connects diners with quality local restaurants and restaurant-led offers—making quieter hours more rewarding for everyone.',
    heroCta: 'Find your next table',
    heroStatus: 'Pre-launch · Early access opening soon',
    heroStatusSub: 'A new way to discover local dining is taking shape.',
    offerBadge: 'Restaurant-led offers',
    offerBadgeSub: 'Clear timing and availability',
    previewTitle: 'A simpler way to dine',
    previewTag: 'PREVIEW',
    previewItem: 'Discover nearby restaurant offers',
    previewMeta: 'Choose what fits your evening',

    principlesLabel: 'WHAT DINERY BRINGS TOGETHER',
    principles: [
      {
        title: 'Local discovery',
        text: 'Find participating restaurants around you.',
      },
      {
        title: 'Restaurant-led offers',
        text: 'Availability and conditions stay in restaurant control.',
      },
      {
        title: 'Flexible dining',
        text: 'Choose the experience that fits your plans.',
      },
    ],

    productLabel: 'THE DINERY EXPERIENCE',
    productTitle1: 'Better-timed dining,',
    productTitleAccent: 'made simple.',
    productDesc:
      'Dinery is designed to make restaurant discovery clear and effortless—from seeing nearby opportunities to choosing an offer that works for you.',
    productFeatures: [
      'Browse local restaurant availability in one place',
      'See offer timing and conditions before choosing',
      'Enjoy a direct, restaurant-focused experience',
    ],
    productNote: 'Responsive product vision · Desktop and mobile preview',

    howLabel: 'HOW DINERY WORKS',
    howTitle: 'Three steps. One better evening.',
    howDesc: 'A focused journey without unnecessary complexity.',
    steps: [
      {
        title: 'Discover',
        text: 'Explore participating restaurants and available offers nearby.',
      },
      {
        title: 'Choose',
        text: 'Review the timing and conditions, then choose what suits you.',
      },
      {
        title: 'Enjoy',
        text: 'Experience quality local dining while supporting hospitality.',
      },
    ],

    ecosystemLabel: 'ONE CONNECTED DINING ECOSYSTEM',
    ecosystemTitle1: 'Good for diners.',
    ecosystemTitle2: 'Useful for restaurants.',
    ecosystemDesc:
      'Dinery brings discovery, timing, and restaurant-controlled opportunities into one thoughtful experience.',
    ecosystem: [
      {
        title: 'For diners',
        text: 'A clearer way to discover quality local dining.',
      },
      {
        title: 'For restaurants',
        text: 'A flexible way to present quieter-hour opportunities.',
      },
      {
        title: 'For local communities',
        text: 'More reasons to support independent hospitality nearby.',
      },
    ],
  },
};

const Home = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.US;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document
      .querySelectorAll('.animate-on-scroll')
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const stepIcons = [MapPin, Percent, ShoppingBag];
  const ecosystemIcons = [Users, Store, Sparkles];

  return (
    <main className="overflow-hidden bg-[#101923] font-sans antialiased selection:bg-[#ff6b22] selection:text-white">
      {/* HERO */}
      <section className="relative flex min-h-[calc(100svh-64px)] items-center overflow-hidden bg-[#101923] px-5 py-12 text-white sm:px-8 lg:px-16 lg:py-14 xl:px-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[44rem] w-[44rem] rounded-full bg-[#ff6b22]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[#ff6b22]/5 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-[1880px] items-center gap-10 lg:grid-cols-[0.94fr_1.26fr] xl:gap-16">
          <div className="animate-on-scroll max-w-[620px] space-y-7">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff9b5e]">
              <span className="h-2 w-2 rounded-full bg-[#ff6b22] shadow-[0_0_0_6px_rgba(255,107,34,0.12)]" />
              {t.heroTag}
            </div>

            <h1 className="text-[3.4rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-7xl lg:text-[5.35rem] xl:text-[6rem] 2xl:text-[6.4rem]">
              {t.heroTitle1}
              <br />
              {t.heroTitle2}
              <br />
              <span className="text-[#ff6b22]">{t.heroTitleAccent}</span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
              {t.heroDesc}
            </p>

            <Link
              to="/restaurants"
              className="group inline-flex min-h-12 items-center gap-5 rounded-full bg-[#ff6b22] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_36px_rgba(255,107,34,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f45d16]"
            >
              {t.heroCta}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <div className="max-w-xl rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#ff6b22]" />
                {t.heroStatus}
              </div>
              <p className="mt-1 pl-4 text-[11px] leading-5 text-white/40">
                {t.heroStatusSub}
              </p>
            </div>
          </div>

          <div className="relative animate-on-scroll animation-delay-150 lg:-mr-4 xl:-mr-10">
            <div className="pointer-events-none absolute -inset-5 rounded-[2.5rem] border border-[#ff6b22]/10" />
            <div className="pointer-events-none absolute -right-28 top-1/2 hidden h-[42rem] w-[42rem] -translate-y-1/2 rounded-full border border-[#ff6b22]/20 lg:block" />

            <div className="relative aspect-[16/10] min-h-[360px] overflow-hidden rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.35)] sm:min-h-[440px] lg:min-h-[500px] lg:rounded-[9rem_9rem_2rem_2rem] xl:min-h-[550px]">
              <img
                src={image1}
                alt="A refined local restaurant dining experience"
                className="h-full w-full object-cover object-center"
              />

              <div className="absolute right-4 top-4 flex max-w-[13rem] items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:right-6 sm:top-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <Percent className="h-4 w-4 text-[#f2600c]" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-gray-900">{t.offerBadge}</p>
                  <p className="text-[11px] text-gray-500">{t.offerBadgeSub}</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-3 w-[20rem] max-w-[88%] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:left-6 lg:bottom-6 lg:-left-16">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">{t.previewTitle}</span>
                <span className="text-[10px] font-bold tracking-widest text-[#f2600c]">{t.previewTag}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#101923] text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-sm font-semibold text-gray-900">{t.previewItem}</p>
                  <p className="text-xs text-gray-500">{t.previewMeta}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DINERY PRINCIPLES */}
      <section className="border-y border-black/5 bg-[#f6f1e9] px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d1526]/45">
            {t.principlesLabel}
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {t.principles.map((item) => (
              <div key={item.title} className="border-black/10 sm:border-l sm:pl-5">
                <p className="font-bold text-[#101923]">{item.title}</p>
                <p className="mt-1 text-sm leading-5 text-[#0d1526]/50">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT EXPLAINER — inspired by the supplied side-by-side reference */}
      <section id="for-diners" className="scroll-mt-16 bg-[#fffdf9] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14 xl:gap-20">
          <div className="relative animate-on-scroll pb-16 pr-8 sm:pb-24 sm:pr-20 lg:-ml-4 xl:-ml-8">
            {/* dashboard.png already contains the complete desktop interface. */}
            <img
              src={dashboard}
              alt="Dinery reservation and restaurant management dashboard"
              className="relative z-0 h-auto w-full object-contain"
            />

            {/* DineryApp.png already contains the complete iPhone frame. */}
            <img
              src={dineryApp}
              alt="Dinery mobile experience on iPhone"
              className="absolute bottom-0 right-0 z-10 h-auto w-[35%] min-w-[138px] max-w-[225px] object-contain drop-shadow-[0_28px_30px_rgba(16,25,35,0.32)] sm:w-[36%] lg:-right-2 xl:-right-4"
            />
          </div>

          <div className="animate-on-scroll animation-delay-150">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#f2600c]">
              {t.productLabel}
            </p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#101923] sm:text-5xl lg:text-6xl">
              {t.productTitle1}
              <br />
              <span className="text-[#f2600c]">{t.productTitleAccent}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#0d1526]/60">
              {t.productDesc}
            </p>

            <div className="mt-8 space-y-4">
              {t.productFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2600c]/10">
                    <Check className="h-3.5 w-3.5 text-[#f2600c]" />
                  </span>
                  <p className="text-sm font-medium leading-6 text-[#101923]/75">{feature}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs font-medium text-[#0d1526]/35">{t.productNote}</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-16 bg-[#f6f1e9] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="animate-on-scroll mb-10 grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#f2600c]">{t.howLabel}</p>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#101923] sm:text-5xl">
                {t.howTitle}
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#0d1526]/50 lg:justify-self-end">
              {t.howDesc}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {t.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <article key={step.title} className="animate-on-scroll rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101923] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold tracking-[0.16em] text-[#101923]/25">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#101923]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#0d1526]/50">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DINERY ECOSYSTEM */}
      <section className="bg-[#101923] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="animate-on-scroll mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff8b4a]">{t.ecosystemLabel}</p>
            <h2 className="text-4xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {t.ecosystemTitle1}
              <br />
              <span className="text-[#ff6b22]">{t.ecosystemTitle2}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50">{t.ecosystemDesc}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.ecosystem.map((item, index) => {
              const Icon = ecosystemIcons[index];
              return (
                <article key={item.title} className="animate-on-scroll rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <Icon className="h-5 w-5 text-[#ff6b22]" />
                  <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .animation-delay-150 {
          transition-delay: 150ms;
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
    </main>
  );
};

export default Home;