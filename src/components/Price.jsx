import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  Headphones,
  LayoutDashboard,
  Link2,
  LineChart,
  Megaphone,
  Settings2,
  Sparkles,
  Store,
  Table2,
  Tag,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useLanguage } from '../App';

const translations = {
  US: {
    eyebrow: 'TRANSPARENT PRICING',
    title: 'Choose the plan that fits your restaurant.',
    description:
      'Start in beta, then scale when your restaurant is ready. Every plan keeps the pricing clear—with no commission cuts or hidden fees.',
    proof: ['0% commission', 'Monthly and annual options', 'No hidden fees'],
    perMonth: '/month',
    perYear: '/year',
    beta: 'During beta',
    afterBeta: '€49/month after beta',
    billedAnnually: 'Annual option',
    mostPopular: 'Most popular',
    available: 'Available in beta',
    comingSoon: 'Coming soon',
    start: 'Start with Starter',
    waitlist: 'Request early access',
    compareEyebrow: 'PLAN COMPARISON',
    compareTitle: 'Everything, side by side.',
    compareDescription: 'A compact view of the exact features included in each plan.',
    feature: 'Feature',
    notesTitle: 'Pricing at a glance',
    notes:
      'All prices are in EUR. Starter is €0 during beta and €49/month afterward. Annual options are €490, €990, and €1,490.',
    platformEyebrow: 'PLATFORM FEATURES',
    platformTitle: 'One connected workspace for restaurant operations.',
    platformDescription:
      'The dashboard brings everyday restaurant tools together, while the reservation system keeps bookings and tables organized.',
    dashboardTitle: 'Restaurant dashboard',
    dashboardDescription: 'Manage the core parts of your restaurant from one focused workspace.',
    dashboardModules: [
      'Analytics',
      'Restaurant',
      'Offers',
      'CRM',
      'Reservation software',
      'Table management',
      'Reservation link',
      'Timesheet',
      'Account settings',
    ],
    reservationTitle: 'Reservation system',
    reservationDescription:
      'A practical booking workspace for scheduled reservations, table planning, and walk-in service.',
    reservationIncluded: 'Included in every plan',
    reservationFeatures: [
      'Calendar and reservation timeline',
      'Table and list booking views',
      'Walk-in and quick-booking tools',
      'Time-based reservations and guest codes',
      'Day, week, and month planning',
      'Reservation links and booking imports',
    ],
    plans: {
      starter: { name: 'Starter', subtitle: 'Perfect for trying out Dinery' },
      growth: { name: 'Growth', subtitle: 'Ideal for growing restaurants' },
      professional: { name: 'Professional', subtitle: 'Complete restaurant optimization' },
    },
    features: {
      visibility: 'Visibility in the Dinery app',
      offers: 'Offers published per month',
      reservations: 'Time-based reservations and codes',
      analytics: 'Customer list and basic analytics',
      notifications: 'Push notifications to diners',
      reporting: 'Advanced reporting',
      points: 'Dinery Points System',
      support: '24/7 support',
      manager: 'Dedicated account manager',
      social: 'Social media promotion',
      unlimited: 'Unlimited',
      priority: 'Priority',
    },
  },
  FI: {
    eyebrow: 'SELKEÄ HINNOITTELU',
    title: 'Valitse ravintolallesi sopiva paketti.',
    description:
      'Aloita beta-vaiheessa ja laajenna, kun ravintolasi on valmis. Selkeä hinnoittelu ilman komissioita tai piilokuluja.',
    proof: ['0 % komissio', 'Kuukausi- ja vuosivaihtoehdot', 'Ei piilokuluja'],
    perMonth: '/kk',
    perYear: '/vuosi',
    beta: 'Beta-vaiheen ajan',
    afterBeta: '€49/kk beta-vaiheen jälkeen',
    billedAnnually: 'Vuosihinta',
    mostPopular: 'Suosituin',
    available: 'Saatavilla betassa',
    comingSoon: 'Tulossa pian',
    start: 'Aloita Starterilla',
    waitlist: 'Pyydä ennakkopääsyä',
    compareEyebrow: 'PAKETTIEN VERTAILU',
    compareTitle: 'Kaikki ominaisuudet rinnakkain.',
    compareDescription: 'Tiivis näkymä kunkin paketin ominaisuuksiin.',
    feature: 'Ominaisuus',
    notesTitle: 'Hinnoittelu lyhyesti',
    notes:
      'Kaikki hinnat ovat euroina. Starter maksaa beta-vaiheessa €0 ja sen jälkeen €49/kk. Vuosihinnat ovat €490, €990 ja €1 490.',
    platformEyebrow: 'ALUSTAN OMINAISUUDET',
    platformTitle: 'Yksi yhdistetty työtila ravintolan toimintaan.',
    platformDescription:
      'Hallintapaneeli kokoaa päivittäiset ravintolatyökalut yhteen, ja varausjärjestelmä pitää varaukset sekä pöydät järjestyksessä.',
    dashboardTitle: 'Ravintolan hallintapaneeli',
    dashboardDescription: 'Hallitse ravintolasi keskeisiä toimintoja yhdessä selkeässä työtilassa.',
    dashboardModules: [
      'Analytiikka',
      'Ravintola',
      'Tarjoukset',
      'CRM',
      'Varausohjelmisto',
      'Pöytien hallinta',
      'Varauslinkki',
      'Työajanseuranta',
      'Tiliasetukset',
    ],
    reservationTitle: 'Varausjärjestelmä',
    reservationDescription: 'Käytännöllinen työtila varauksille, pöytäsuunnittelulle ja walk-in-asiakkaille.',
    reservationIncluded: 'Sisältyy jokaiseen pakettiin',
    reservationFeatures: [
      'Kalenteri ja varausaikajana',
      'Pöytä- ja listanäkymät',
      'Walk-in- ja pikavaraustyökalut',
      'Aikaperusteiset varaukset ja vieraskoodit',
      'Päivä-, viikko- ja kuukausisuunnittelu',
      'Varauslinkit ja varausten tuonti',
    ],
    plans: {
      starter: { name: 'Starter', subtitle: 'Dineryn kokeilemiseen' },
      growth: { name: 'Growth', subtitle: 'Kasvaville ravintoloille' },
      professional: { name: 'Professional', subtitle: 'Kattava ravintolan optimointi' },
    },
    features: {
      visibility: 'Näkyvyys Dinery-sovelluksessa',
      offers: 'Julkaistut tarjoukset kuukaudessa',
      reservations: 'Aikaperusteiset varaukset ja koodit',
      analytics: 'Asiakaslista ja perusanalytiikka',
      notifications: 'Push-ilmoitukset ruokailijoille',
      reporting: 'Edistynyt raportointi',
      points: 'Dinery-pistejärjestelmä',
      support: '24/7-tuki',
      manager: 'Oma asiakkuuspäällikkö',
      social: 'Sosiaalisen median näkyvyys',
      unlimited: 'Rajoittamaton',
      priority: 'Etusija',
    },
  },
  NO: {
    eyebrow: 'TYDELIG PRISING',
    title: 'Velg planen som passer restauranten din.',
    description:
      'Start i beta og skaler når restauranten er klar. Tydelige priser uten provisjon eller skjulte kostnader.',
    proof: ['0 % provisjon', 'Måneds- og årsalternativer', 'Ingen skjulte kostnader'],
    perMonth: '/måned',
    perYear: '/år',
    beta: 'I betaperioden',
    afterBeta: '€49/måned etter beta',
    billedAnnually: 'Årsalternativ',
    mostPopular: 'Mest populær',
    available: 'Tilgjengelig i beta',
    comingSoon: 'Kommer snart',
    start: 'Start med Starter',
    waitlist: 'Be om tidlig tilgang',
    compareEyebrow: 'SAMMENLIGN PLANER',
    compareTitle: 'Alt, side om side.',
    compareDescription: 'En kompakt oversikt over hva som følger med hver plan.',
    feature: 'Funksjon',
    notesTitle: 'Prisoversikt',
    notes:
      'Alle priser er i EUR. Starter koster €0 i beta og deretter €49/måned. Årsprisene er €490, €990 og €1 490.',
    platformEyebrow: 'PLATTFORMFUNKSJONER',
    platformTitle: 'Én samlet arbeidsflate for restaurantdrift.',
    platformDescription:
      'Dashbordet samler de daglige restaurantverktøyene, mens reservasjonssystemet holder bestillinger og bord organisert.',
    dashboardTitle: 'Restaurantdashbord',
    dashboardDescription: 'Administrer restaurantens viktigste områder fra én oversiktlig arbeidsflate.',
    dashboardModules: [
      'Analyse',
      'Restaurant',
      'Tilbud',
      'CRM',
      'Reservasjonsprogramvare',
      'Bordadministrasjon',
      'Reservasjonslenke',
      'Timeliste',
      'Kontoinnstillinger',
    ],
    reservationTitle: 'Reservasjonssystem',
    reservationDescription: 'En praktisk arbeidsflate for reservasjoner, bordplanlegging og drop-in-gjester.',
    reservationIncluded: 'Inkludert i alle planer',
    reservationFeatures: [
      'Kalender og reservasjonstidslinje',
      'Bord- og listevisning',
      'Verktøy for drop-in og hurtigbestilling',
      'Tidsbaserte reservasjoner og gjestekoder',
      'Dag-, uke- og månedsplanlegging',
      'Reservasjonslenker og import av bestillinger',
    ],
    plans: {
      starter: { name: 'Starter', subtitle: 'For å prøve Dinery' },
      growth: { name: 'Growth', subtitle: 'For restauranter i vekst' },
      professional: { name: 'Professional', subtitle: 'Komplett restaurantoptimalisering' },
    },
    features: {
      visibility: 'Synlighet i Dinery-appen',
      offers: 'Publiserte tilbud per måned',
      reservations: 'Tidsbaserte reservasjoner og koder',
      analytics: 'Kundeliste og grunnleggende analyse',
      notifications: 'Push-varsler til gjester',
      reporting: 'Avansert rapportering',
      points: 'Dinery-poengsystem',
      support: 'Døgnåpen støtte',
      manager: 'Dedikert kontaktperson',
      social: 'Promotering i sosiale medier',
      unlimited: 'Ubegrenset',
      priority: 'Prioritet',
    },
  },
  SE: {
    eyebrow: 'TYDLIG PRISSÄTTNING',
    title: 'Välj planen som passar din restaurang.',
    description:
      'Börja i beta och skala när restaurangen är redo. Tydliga priser utan provision eller dolda avgifter.',
    proof: ['0 % provision', 'Månads- och årsalternativ', 'Inga dolda avgifter'],
    perMonth: '/månad',
    perYear: '/år',
    beta: 'Under betaperioden',
    afterBeta: '€49/månad efter beta',
    billedAnnually: 'Årsalternativ',
    mostPopular: 'Mest populär',
    available: 'Tillgänglig i beta',
    comingSoon: 'Kommer snart',
    start: 'Börja med Starter',
    waitlist: 'Begär tidig åtkomst',
    compareEyebrow: 'JÄMFÖR PLANER',
    compareTitle: 'Allt, sida vid sida.',
    compareDescription: 'En kompakt översikt över funktionerna i varje plan.',
    feature: 'Funktion',
    notesTitle: 'Priser i korthet',
    notes:
      'Alla priser är i EUR. Starter kostar €0 under beta och därefter €49/månad. Årspriserna är €490, €990 och €1 490.',
    platformEyebrow: 'PLATTFORMSFUNKTIONER',
    platformTitle: 'En samlad arbetsyta för restaurangdriften.',
    platformDescription:
      'Instrumentpanelen samlar restaurangens dagliga verktyg, medan bokningssystemet håller bokningar och bord organiserade.',
    dashboardTitle: 'Restaurangpanel',
    dashboardDescription: 'Hantera restaurangens viktigaste delar från en tydlig arbetsyta.',
    dashboardModules: [
      'Analys',
      'Restaurang',
      'Erbjudanden',
      'CRM',
      'Bokningssystem',
      'Bordshantering',
      'Bokningslänk',
      'Tidrapportering',
      'Kontoinställningar',
    ],
    reservationTitle: 'Bokningssystem',
    reservationDescription: 'En praktisk arbetsyta för bokningar, bordsplanering och drop-in-gäster.',
    reservationIncluded: 'Ingår i alla planer',
    reservationFeatures: [
      'Kalender och bokningstidslinje',
      'Bords- och listvyer',
      'Verktyg för drop-in och snabbokning',
      'Tidsbaserade bokningar och gästkoder',
      'Dag-, vecko- och månadsplanering',
      'Bokningslänkar och import av bokningar',
    ],
    plans: {
      starter: { name: 'Starter', subtitle: 'För att prova Dinery' },
      growth: { name: 'Growth', subtitle: 'För växande restauranger' },
      professional: { name: 'Professional', subtitle: 'Komplett restaurangoptimering' },
    },
    features: {
      visibility: 'Synlighet i Dinery-appen',
      offers: 'Publicerade erbjudanden per månad',
      reservations: 'Tidsbaserade bokningar och koder',
      analytics: 'Kundlista och grundläggande analys',
      notifications: 'Pushnotiser till gäster',
      reporting: 'Avancerad rapportering',
      points: 'Dinery-poängsystem',
      support: 'Support dygnet runt',
      manager: 'Dedikerad kontaktperson',
      social: 'Marknadsföring i sociala medier',
      unlimited: 'Obegränsat',
      priority: 'Prioritet',
    },
  },
  DE: {
    eyebrow: 'TRANSPARENTE PREISE',
    title: 'Wählen Sie den passenden Tarif für Ihr Restaurant.',
    description:
      'Starten Sie in der Beta und skalieren Sie, wenn Ihr Restaurant bereit ist. Klare Preise ohne Provisionen oder versteckte Gebühren.',
    proof: ['0 % Provision', 'Monats- und Jahresoptionen', 'Keine versteckten Gebühren'],
    perMonth: '/Monat',
    perYear: '/Jahr',
    beta: 'Während der Beta',
    afterBeta: '€49/Monat nach der Beta',
    billedAnnually: 'Jahresoption',
    mostPopular: 'Am beliebtesten',
    available: 'In der Beta verfügbar',
    comingSoon: 'Demnächst',
    start: 'Mit Starter beginnen',
    waitlist: 'Frühzugang anfragen',
    compareEyebrow: 'TARIFE VERGLEICHEN',
    compareTitle: 'Alles im direkten Vergleich.',
    compareDescription: 'Eine kompakte Übersicht der enthaltenen Funktionen.',
    feature: 'Funktion',
    notesTitle: 'Preise auf einen Blick',
    notes:
      'Alle Preise sind in EUR. Starter kostet während der Beta €0 und danach €49/Monat. Die Jahrespreise betragen €490, €990 und €1.490.',
    platformEyebrow: 'PLATTFORMFUNKTIONEN',
    platformTitle: 'Ein vernetzter Arbeitsbereich für den Restaurantbetrieb.',
    platformDescription:
      'Das Dashboard bündelt die täglichen Restaurantwerkzeuge, während das Reservierungssystem Buchungen und Tische organisiert.',
    dashboardTitle: 'Restaurant-Dashboard',
    dashboardDescription: 'Verwalten Sie die wichtigsten Bereiche Ihres Restaurants in einer übersichtlichen Arbeitsumgebung.',
    dashboardModules: [
      'Analysen',
      'Restaurant',
      'Angebote',
      'CRM',
      'Reservierungssoftware',
      'Tischverwaltung',
      'Reservierungslink',
      'Zeiterfassung',
      'Kontoeinstellungen',
    ],
    reservationTitle: 'Reservierungssystem',
    reservationDescription: 'Ein praktischer Arbeitsbereich für Reservierungen, Tischplanung und Laufkundschaft.',
    reservationIncluded: 'In jedem Tarif enthalten',
    reservationFeatures: [
      'Kalender und Reservierungszeitleiste',
      'Tisch- und Listenansichten',
      'Werkzeuge für Laufkundschaft und Schnellbuchungen',
      'Zeitbasierte Reservierungen und Gästecodes',
      'Tages-, Wochen- und Monatsplanung',
      'Reservierungslinks und Buchungsimporte',
    ],
    plans: {
      starter: { name: 'Starter', subtitle: 'Zum Ausprobieren von Dinery' },
      growth: { name: 'Growth', subtitle: 'Für wachsende Restaurants' },
      professional: { name: 'Professional', subtitle: 'Vollständige Restaurantoptimierung' },
    },
    features: {
      visibility: 'Sichtbarkeit in der Dinery-App',
      offers: 'Veröffentlichte Angebote pro Monat',
      reservations: 'Zeitbasierte Reservierungen und Codes',
      analytics: 'Kundenliste und Basisanalysen',
      notifications: 'Push-Benachrichtigungen an Gäste',
      reporting: 'Erweiterte Berichte',
      points: 'Dinery-Punktesystem',
      support: '24/7-Support',
      manager: 'Persönlicher Account Manager',
      social: 'Social-Media-Promotion',
      unlimited: 'Unbegrenzt',
      priority: 'Priorität',
    },
  },
};

const iconByFeature = {
  visibility: Eye,
  offers: BarChart3,
  reservations: Clock3,
  analytics: LineChart,
  notifications: Bell,
  reporting: BarChart3,
  points: Award,
  support: Headphones,
  manager: UserCheck,
  social: Megaphone,
};

const dashboardIcons = [
  LayoutDashboard,
  Store,
  Tag,
  Users,
  CalendarDays,
  Table2,
  Link2,
  Clock3,
  Settings2,
];

const Price = () => {
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
    const elements = document.querySelectorAll('.price-reveal');

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

  const plans = [
    {
      id: 'starter',
      monthly: '€0',
      annual: '€490',
      afterBeta: t.afterBeta,
      status: t.available,
      available: true,
      popular: false,
      values: {
        visibility: true,
        offers: '2',
        reservations: true,
        analytics: false,
        notifications: false,
        reporting: false,
        points: true,
        support: true,
        manager: false,
        social: false,
      },
    },
    {
      id: 'growth',
      monthly: '€99',
      annual: '€990',
      status: t.comingSoon,
      available: false,
      popular: true,
      values: {
        visibility: true,
        offers: t.features.unlimited,
        reservations: true,
        analytics: true,
        notifications: true,
        reporting: false,
        points: true,
        support: true,
        manager: false,
        social: false,
      },
    },
    {
      id: 'professional',
      monthly: '€149',
      annual: '€1,490',
      status: t.comingSoon,
      available: false,
      popular: false,
      values: {
        visibility: true,
        offers: t.features.unlimited,
        reservations: true,
        analytics: true,
        notifications: t.features.priority,
        reporting: true,
        points: true,
        support: true,
        manager: true,
        social: true,
      },
    },
  ];

  const featureKeys = Object.keys(iconByFeature);

  const renderValue = (value, inverse = false) => {
    if (value === true) {
      return (
        <span className={`inline-grid h-6 w-6 place-items-center rounded-full ${inverse ? 'bg-white/14 text-white' : 'bg-[#fff0e7] text-[#ff6b22]'}`}>
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      );
    }

    if (value === false) {
      return <X className={`h-4 w-4 ${inverse ? 'text-white/28' : 'text-black/20'}`} />;
    }

    return <span className={`text-xs font-bold ${inverse ? 'text-white' : 'text-[#101923]'}`}>{value}</span>;
  };

  const heroTransition =
    'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

  return (
    <main className="overflow-hidden bg-[#fffdf9] text-[#101923] antialiased">
      <section className="relative bg-[#101923] px-6 pb-36 pt-20 text-white lg:pb-44 lg:pt-24">
        <div className="pointer-events-none absolute -right-44 -top-44 h-[38rem] w-[38rem] rounded-full border border-[#ff6b22]/20" />
        <div className="pointer-events-none absolute right-20 top-16 h-52 w-52 rounded-full bg-[#ff6b22]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div
            className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff9b5e] ${heroTransition} ${
              heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: heroVisible ? '70ms' : '0ms' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.eyebrow}
          </div>
          <h1
            className={`mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-6xl lg:text-7xl ${heroTransition} ${
              heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: heroVisible ? '150ms' : '0ms' }}
          >
            {t.title}
          </h1>
          <p
            className={`mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/55 md:text-base ${heroTransition} ${
              heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
            style={{ transitionDelay: heroVisible ? '270ms' : '0ms' }}
          >
            {t.description}
          </p>
          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${heroTransition} ${
              heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
            style={{ transitionDelay: heroVisible ? '380ms' : '0ms' }}
          >
            {t.proof.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-xs font-semibold text-white/60">
                <Check className="h-4 w-4 text-[#ff6b22]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-24 px-6 pb-20 lg:-mt-28 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const planCopy = t.plans[plan.id];
            const featuredKeys = ['visibility', 'offers', 'reservations', 'points', 'support'];

            return (
              <article
                key={plan.id}
                className={`price-reveal relative flex min-h-[34rem] flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_20px_70px_rgba(16,25,35,0.09)] sm:p-8 ${
                  plan.popular
                    ? 'border-[#ff6b22] bg-[#ff6b22] text-white'
                    : 'border-black/[0.07] bg-white'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-[#ff6b22]">
                    {t.mostPopular}
                  </span>
                )}

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${plan.popular ? 'text-white/65' : 'text-black/38'}`}>
                    {plan.status}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">{planCopy.name}</h2>
                  <p className={`mt-2 min-h-12 text-sm leading-6 ${plan.popular ? 'text-white/70' : 'text-black/48'}`}>
                    {planCopy.subtitle}
                  </p>
                </div>

                <div className={`mt-6 border-y py-6 ${plan.popular ? 'border-white/18' : 'border-black/[0.07]'}`}>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-[-0.06em]">{plan.monthly}</span>
                    <span className={`pb-1.5 text-xs ${plan.popular ? 'text-white/60' : 'text-black/40'}`}>
                      {plan.id === 'starter' ? t.beta : t.perMonth}
                    </span>
                  </div>
                  {plan.afterBeta && (
                    <p className={`mt-2 text-xs font-semibold ${plan.popular ? 'text-white/65' : 'text-black/46'}`}>
                      {plan.afterBeta}
                    </p>
                  )}
                  <p className={`mt-3 text-xs ${plan.popular ? 'text-white/60' : 'text-black/40'}`}>
                    {t.billedAnnually}: <strong className={plan.popular ? 'text-white' : 'text-[#101923]'}>{plan.annual}{t.perYear}</strong>
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-4">
                  {featuredKeys.map((key) => {
                    const Icon = iconByFeature[key];
                    return (
                      <li key={key} className="flex items-center justify-between gap-4">
                        <span className={`flex items-center gap-3 text-sm ${plan.popular ? 'text-white/78' : 'text-black/58'}`}>
                          <Icon className="h-4 w-4 shrink-0" />
                          {t.features[key]}
                        </span>
                        {renderValue(plan.values[key], plan.popular)}
                      </li>
                    );
                  })}
                </ul>

                <a
                  href={`/restaurants?plan=${plan.id}`}
                  className={`group mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
                    plan.popular
                      ? 'bg-white text-[#101923]'
                      : plan.available
                        ? 'bg-[#101923] text-white'
                        : 'border border-black/10 bg-[#f6f1e9] text-[#101923]'
                  }`}
                >
                  {plan.available ? t.start : t.waitlist}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="price-reveal max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6b22]">
              {t.platformEyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-5xl">
              {t.platformTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/48">
              {t.platformDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="price-reveal rounded-[1.75rem] bg-[#101923] p-6 text-white sm:p-8" style={{ transitionDelay: '100ms' }}>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ff9b5e]">
                    Dashboard
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.035em]">{t.dashboardTitle}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">{t.dashboardDescription}</p>
                </div>
                <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ff6b22] sm:grid">
                  <LayoutDashboard className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {t.dashboardModules.map((module, index) => {
                  const Icon = dashboardIcons[index];
                  return (
                    <div
                      key={module}
                      className="flex min-h-20 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.045] px-3 py-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#ff6b22]/12 text-[#ff8a4c]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold leading-4 text-white/72">{module}</span>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="price-reveal relative overflow-hidden rounded-[1.75rem] border border-[#ff6b22]/18 bg-[#fff4ec] p-6 sm:p-8" style={{ transitionDelay: '200ms' }}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#ff6b22]/18" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ff6b22] text-white">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#ff6b22]">
                    {t.reservationIncluded}
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-bold tracking-[-0.04em]">{t.reservationTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-black/50">{t.reservationDescription}</p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {t.reservationFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs font-semibold leading-5 text-black/62">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[#ff6b22]">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe7] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div className="price-reveal">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6b22]">{t.compareEyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-none tracking-[-0.05em] md:text-5xl">{t.compareTitle}</h2>
            </div>
            <p className="price-reveal max-w-xl text-sm leading-7 text-black/48 lg:ml-auto" style={{ transitionDelay: '100ms' }}>
              {t.compareDescription}
            </p>
          </div>

          <div className="price-reveal mt-10 overflow-x-auto rounded-[1.5rem] border border-black/[0.07] bg-white" style={{ transitionDelay: '150ms' }}>
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/[0.07]">
                  <th className="w-[43%] px-6 py-5 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">{t.feature}</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="px-5 py-5 text-sm font-bold">{t.plans[plan.id].name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureKeys.map((key, index) => {
                  const Icon = iconByFeature[key];
                  return (
                    <tr key={key} className={index < featureKeys.length - 1 ? 'border-b border-black/[0.06]' : ''}>
                      <th className="px-6 py-4 text-sm font-medium text-black/58">
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-[#ff6b22]" />
                          {t.features[key]}
                        </span>
                      </th>
                      {plans.map((plan) => (
                        <td key={plan.id} className="px-5 py-4">{renderValue(plan.values[key])}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="price-reveal mt-6 flex flex-col gap-3 rounded-2xl border border-[#ff6b22]/15 bg-[#fff8f2] p-5 sm:flex-row sm:items-start sm:gap-5" style={{ transitionDelay: '200ms' }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff6b22] text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold">{t.notesTitle}</h3>
              <p className="mt-1 text-xs leading-6 text-black/48">{t.notes}</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .price-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition-duration: 800ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .price-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .price-reveal,
          .price-reveal.is-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
};

export default Price;