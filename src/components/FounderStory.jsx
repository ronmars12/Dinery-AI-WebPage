import React, { useState, useEffect } from 'react';
import samuliImg from '../assets/samuli.png';
import { useLanguage } from '../App';

const FounderStory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { currentLanguage } = useLanguage();
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
    const elements = document.querySelectorAll('.founder-reveal');

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

  const content = {
    US: {
      title: 'Founder Story',
      subtitle: 'From engineer to restaurant owner to foodtech founder',
      founderName: 'Samuli Mikkola',
      founderTitle: 'Founder & CEO, Dinery.ai',
      founderIntro:
        'A personal journey that led to the creation of Dinery.ai and why solving restaurant inefficiencies became more than just a business opportunity.',
      theJourney: 'The Journey',
      timeline: [
        {
          title: '2023: The Big Move',
          content:
            'In 2023, Samuli made a life-changing decision to leave his home country of Finland to purchase a restaurant in Oslo. His journey to Norway was not just professional—it was personal. Together with his partner Judy, their then four-year-old son Aaro, and their mixed-breed dog Iita, Samuli packed up what little they could fit into their car and set off from Nuorgam, the northernmost village in Finland.'
        },
        {
          title: "The Engineer's Perspective",
          content:
            'Samuli is an engineer by background, with professional experience in mobile technologies. This gave him a natural entry point into the world of application development. However, it was the hands-on experience of managing a restaurant that truly shaped his thinking.'
        },
        {
          title: 'The Challenge Discovery',
          content:
            'Very early on, Samuli noticed an issue that many restaurant owners face: the unpredictable nature of customer flow. Weekends were reliably busy, but the rest of the week was a struggle to stay afloat.',
          quote:
            '"Saturday is when we make our profit, and from Sunday to Thursday we fight to avoid losses."'
        },
        {
          title: 'The Solution Emerges',
          content:
            'To address this, he began experimenting with dynamic pricing strategies in his own restaurant—creating limited-time offers to attract visitors on slower days. These efforts proved successful, showing that customers were willing to dine out mid-week if given the right incentives. It was this insight that sparked a bigger idea—what if this model could be offered as a digital service to all restaurants and customers?'
        }
      ],
      mainQuote:
        "I don't think this idea would have come to life without experiencing the daily realities of running a restaurant. The reason no one has successfully productized this idea before is, I believe, because app developers simply don't understand what restaurant owners face. They build with profit in mind, not operational insight.",
      quoteAuthor: '— Samuli Mikkola',
      dineryBorn: 'Dinery.ai is Born',
      dineryDescription:
        "A platform designed to offer flexible, intelligent pricing strategies for restaurants, while giving consumers real-time access to exclusive deals near them. The platform doesn't just help fill tables—it helps restaurants generate more revenue on days that would otherwise be financial dead zones.",
      theVision: 'The Vision',
      visionContent: [
        'Another key realization came from take-away orders. Samuli saw that traditional food delivery services often charged restaurants up to 30% in commission. With Dinery.ai, restaurants can connect directly with customers, offering pickup options at discounted rates—savings that can be passed on to the customer instead of large third-party platforms.',
        'Today, the team is focused on building the first working prototype of the Dinery.ai app. Initial onboarding of both restaurants and users has already begun, and interest is growing steadily.',
        "Through Dinery.ai, Samuli is not just launching a business—he's creating a win-win ecosystem that supports local economies, fosters community connections, and makes good food more accessible to everyone."
      ],
      creatingValue: 'Creating Value',
      valueDescription:
        'A sustainable ecosystem that creates value for restaurants, delights customers, and builds stronger communities.'
    },

    FI: {
      title: 'Perustajan tarina',
      subtitle: 'Insinööristä ravintoloitsijaksi ja foodtech-perustajaksi',
      founderName: 'Samuli Mikkola',
      founderTitle: 'Perustaja & toimitusjohtaja, Dinery.ai',
      founderIntro:
        'Henkilökohtainen matka, joka johti Dinery.ai:n syntyyn – ja miksi ravintola-alan tehottomuuksien ratkaiseminen on enemmän kuin pelkkä liiketoimintamahdollisuus.',
      theJourney: 'Matka',
      timeline: [
        {
          title: '2023: Suuri muutto',
          content:
            'Vuonna 2023 Samuli teki elämänmittaisen päätöksen: hän jätti Suomen ja osti ravintolan Oslosta. Muutto Norjaan ei ollut vain ammatillinen – se oli henkilökohtainen. Kumppani Judyn, nelivuotiaan Aaro-pojan ja sekarotuisen koira Iitan kanssa he pakkasivat autoon sen, mitä mahtui, ja lähtivät Nuorgamista, Suomen pohjoisimmasta kylästä.'
        },
        {
          title: 'Insinöörin näkökulma',
          content:
            'Samuli on koulutukseltaan insinööri ja työskennellyt mobiiliteknologioiden parissa. Tämä antoi luontevan sisäänkäynnin sovelluskehitykseen, mutta vasta käytännön työ ravintolassa muokkasi ajattelun todeksi.'
        },
        {
          title: 'Haasteen löytyminen',
          content:
            'Hyvin pian Samuli huomasi monille ravintoloille tutun ongelman: asiakasvirran arvaamattomuuden. Viikonloput olivat tasaisen kiireisiä, mutta arkipäivät olivat taistelua tappiota vastaan.',
          quote:
            '"Lauantaina teemme voiton, ja sunnuntaista torstaihin taistelemme tappiota vastaan."'
        },
        {
          title: 'Ratkaisu alkaa hahmottua',
          content:
            'Samuli alkoi kokeilla dynaamista hinnoittelua omassa ravintolassaan – rajattuja tarjouksia hiljaisille päiville. Tulokset olivat hyviä: asiakkaat tulivat myös keskelle viikkoa, kun kannustin oli oikea. Tästä syntyi suurempi ajatus: entä jos malli tarjottaisiin digitaalisena palveluna kaikille ravintoloille ja asiakkaille?'
        }
      ],
      mainQuote:
        'Ilman arkea ravintolan pyörittäjänä tämä idea ei olisi syntynyt. Uskon, että kukaan ei ole aiemmin tuotteistanut tätä onnistuneesti, koska sovelluskehittäjät eivät ymmärrä ravintoloitsijan todellisuutta. He rakentavat voitto edellä, eivät operatiivinen ymmärrys edellä.',
      quoteAuthor: '— Samuli Mikkola',
      dineryBorn: 'Dinery.ai syntyy',
      dineryDescription:
        'Alusta, joka tarjoaa ravintoloille joustavia ja älykkäitä hinnoittelustrategioita sekä kuluttajille reaaliaikaisen pääsyn eksklusiivisiin lähitarjouksiin. Alusta ei vain täytä pöytiä – se kasvattaa liikevaihtoa päivinä, jotka muuten olisivat taloudellisesti hiljaisia.',
      theVision: 'Visio',
      visionContent: [
        'Yksi oivallus liittyi noutotilauksiin: perinteiset toimituspalvelut veloittavat jopa 30 % komission. Dinery.ai mahdollistaa suoran yhteyden asiakkaisiin ja noudon alennettuun hintaan – säästöt jäävät ravintolalle ja asiakkaalle, eivät välittäjälle.',
        'Tänään tiimi rakentaa Dinery.ai-sovelluksen ensimmäistä toimivaa prototyyppiä. Ravintoloiden ja käyttäjien alkuvaiheen onboarding on jo käynnissä ja kiinnostus kasvaa.',
        'Dinery.ai ei ole vain yritys, vaan voittava ekosysteemi, joka tukee paikallistaloutta, vahvistaa yhteisöjä ja tekee hyvästä ruoasta saavutettavampaa.'
      ],
      creatingValue: 'Arvon luominen',
      valueDescription:
        'Kestävä ekosysteemi, joka luo arvoa ravintoloille, ilahduttaa asiakkaita ja vahvistaa yhteisöjä.'
    },

    NO: {
      title: 'Grunnleggerens historie',
      subtitle: 'Fra ingeniør til restauranteier til foodtech-gründer',
      founderName: 'Samuli Mikkola',
      founderTitle: 'Grunnlegger & CEO, Dinery.ai',
      founderIntro:
        'En personlig reise som førte til Dinery.ai – og hvorfor det å løse ineffektivitet i restaurantbransjen ble mer enn bare en forretningsmulighet.',
      theJourney: 'Reisen',
      timeline: [
        {
          title: '2023: Det store flyttet',
          content:
            'I 2023 tok Samuli et livsendrende valg: han forlot Finland og kjøpte en restaurant i Oslo. Reisen til Norge var ikke bare profesjonell – den var personlig. Sammen med partneren Judy, fire år gamle Aaro og hunden Iita pakket de bilen i Nuorgam, Finlands nordligste landsby, og satte kursen sørover.'
        },
        {
          title: 'Ingeniørens perspektiv',
          content:
            'Samuli er ingeniør med erfaring fra mobilteknologi. Det ga en naturlig inngang til app-utvikling, men det var driften av en restaurant i praksis som virkelig formet tankesettet.'
        },
        {
          title: 'Å oppdage utfordringen',
          content:
            'Tidlig så han et kjent problem: uforutsigbart kundetrykk. Helgene var stabile og travle, mens ukedagene var en kamp for å gå i pluss.',
          quote:
            '«På lørdager tjener vi penger – fra søndag til torsdag kjemper vi for å unngå tap.»'
        },
        {
          title: 'Løsningen tar form',
          content:
            'Han begynte å eksperimentere med dynamisk prising – tidsbegrensede tilbud for rolige dager. Resultatene var gode: gjester kom midt i uken når insentivet var riktig. Dermed kom ideen: hva om dette kunne tilbys digitalt til alle restauranter og gjester?'
        }
      ],
      mainQuote:
        'Uten å ha kjent restaurantdriften på kroppen hadde ikke ideen oppstått. Grunnen til at få har lykkes med å produktifisere dette, er at app-utviklere ofte ikke forstår hverdagen til en restauranteier. De bygger for profitt, ikke for operativ innsikt.',
      quoteAuthor: '— Samuli Mikkola',
      dineryBorn: 'Dinery.ai blir til',
      dineryDescription:
        'En plattform som gir restauranter fleksible og smarte prisstrategier, og som gir gjester sanntidstilgang til eksklusive tilbud i nærheten. Den fyller ikke bare bord – den øker omsetningen på ellers svake dager.',
      theVision: 'Visjonen',
      visionContent: [
        'Hentemat viste et annet poeng: tradisjonelle leveringsplattformer tar ofte opptil 30 % i kommisjon. Med Dinery.ai kan restauranter nå kunder direkte og tilby henting til lavere pris – verdien går til kunde og restaurant, ikke mellomledd.',
        'I dag bygger teamet den første fungerende prototypen av appen. De første restaurantene og brukerne er på vei inn, og interessen øker.',
        'Dinery.ai skaper et vinn-vinn-økosystem som styrker lokale økonomier, bygger fellesskap og gjør god mat mer tilgjengelig.'
      ],
      creatingValue: 'Skape verdi',
      valueDescription:
        'Et bærekraftig økosystem som skaper verdi for restauranter, gleder kunder og styrker lokalsamfunn.'
    },

    SE: {
      title: 'Grundarens berättelse',
      subtitle: 'Från ingenjör till restaurangägare till foodtech-grundare',
      founderName: 'Samuli Mikkola',
      founderTitle: 'Grundare & VD, Dinery.ai',
      founderIntro:
        'En personlig resa som ledde till Dinery.ai – och varför lösningen på restaurangbranschens ineffektivitet blev mer än bara ett affärsprojekt.',
      theJourney: 'Resan',
      timeline: [
        {
          title: '2023: Den stora flytten',
          content:
            'År 2023 tog Samuli ett livsavgörande beslut: han lämnade Finland och köpte en restaurang i Oslo. Resan var inte bara professionell utan också personlig. Tillsammans med partnern Judy, fyraårige Aaro och hunden Iita packade de bilen i Nuorgam, Finlands nordligaste by, och körde söderut.'
        },
        {
          title: 'Ingenjörens perspektiv',
          content:
            'Samuli är ingenjör med erfarenhet från mobilteknik. Det gav en naturlig väg in i apputveckling, men det var det praktiska arbetet i restaurangen som formade tänket på riktigt.'
        },
        {
          title: 'Utmaningen upptäcks',
          content:
            'Tidigt märkte han ett känt problem: oförutsägbart kundflöde. Helgerna var stabilt fulla, men vardagarna var en kamp för att undvika förlust.',
          quote:
            '"På lördag gör vi vinst – från söndag till torsdag kämpar vi för att gå runt."'
        },
        {
          title: 'Lösningen växer fram',
          content:
            'Han började testa dynamisk prissättning – tidsbegränsade erbjudanden för lugna dagar. Det fungerade: gäster kom mitt i veckan när incitamentet var rätt. Där föddes idén om en digital tjänst för alla restauranger och gäster.'
        }
      ],
      mainQuote:
        'Utan vardagen som restaurangägare hade idén inte fötts. Skälet till att få har produktifierat detta är att apputvecklare ofta saknar förståelse för restaurangens verklighet. Man bygger för vinst, inte för operativ insikt.',
      quoteAuthor: '— Samuli Mikkola',
      dineryBorn: 'Dinery.ai föds',
      dineryDescription:
        'En plattform som ger restauranger flexibla, smarta prisstrategier och som ger kunder realtidsåtkomst till exklusiva erbjudanden i närheten. Den fyller inte bara bord – den ökar intäkter på annars svaga dagar.',
      theVision: 'Visionen',
      visionContent: [
        'Hämtmat gav ytterligare en insikt: traditionella leveransplattformar tar ofta upp till 30 % i provision. Med Dinery.ai kan restauranger nå kunder direkt och erbjuda upphämtning till lägre pris – värdet stannar hos kund och restaurang.',
        'Idag bygger teamet den första fungerande prototypen av appen. Onboarding av restauranger och användare har startat och intresset växer.',
        'Dinery.ai skapar ett vinn-vinn-ekosystem som stärker lokala ekonomier, bygger gemenskap och gör god mat mer tillgänglig.'
      ],
      creatingValue: 'Skapa värde',
      valueDescription:
        'Ett hållbart ekosystem som skapar värde för restauranger, gläder kunder och stärker gemenskaper.'
    },

    DE: {
      title: 'Gründer-Geschichte',
      subtitle: 'Vom Ingenieur zum Restaurantbesitzer zum Foodtech-Gründer',
      founderName: 'Samuli Mikkola',
      founderTitle: 'Gründer & CEO, Dinery.ai',
      founderIntro:
        'Eine persönliche Reise, die zur Gründung von Dinery.ai führte – und warum die Lösung von Ineffizienzen in der Gastronomie mehr als nur eine Geschäftschance ist.',
      theJourney: 'Die Reise',
      timeline: [
        {
          title: '2023: Der große Umzug',
          content:
            '2023 traf Samuli eine lebensverändernde Entscheidung: Er verließ Finnland und kaufte ein Restaurant in Oslo. Die Reise nach Norwegen war nicht nur beruflich, sondern auch persönlich. Mit Partnerin Judy, dem vierjährigen Sohn Aaro und Hund Iita packten sie das Auto in Nuorgam, dem nördlichsten Dorf Finnlands, und fuhren los.'
        },
        {
          title: 'Die Perspektive des Ingenieurs',
          content:
            'Samuli ist Ingenieur mit Berufserfahrung in der mobilen Technologie. Das eröffnete den Weg in die App-Entwicklung, aber erst die praktische Führung eines Restaurants prägte sein Denken wirklich.'
        },
        {
          title: 'Die Entdeckung der Herausforderung',
          content:
            'Schon früh bemerkte er ein weitverbreitetes Problem: unvorhersehbare Gästezahlen. Am Wochenende war es regelmäßig voll, an Wochentagen hingegen ein Kampf gegen Verluste.',
          quote:
            '„Am Samstag machen wir unseren Gewinn – von Sonntag bis Donnerstag kämpfen wir gegen Verluste."'
        },
        {
          title: 'Die Lösung entsteht',
          content:
            'Er experimentierte mit dynamischer Preisgestaltung – zeitlich begrenzte Angebote für ruhige Tage. Das funktionierte: Gäste kamen auch unter der Woche, wenn der Anreiz stimmte. So entstand die Idee eines digitalen Dienstes für alle Restaurants und Gäste.'
        }
      ],
      mainQuote:
        'Ohne die täglichen Realitäten der Restaurantführung hätte diese Idee nicht das Licht der Welt erblickt. Der Grund, warum kaum jemand dies erfolgreich produktisiert hat, liegt darin, dass App-Entwickler die Realität der Gastronomen oft nicht kennen. Man baut mit dem Gewinn im Kopf, nicht mit operativer Einsicht.',
      quoteAuthor: '— Samuli Mikkola',
      dineryBorn: 'Dinery.ai entsteht',
      dineryDescription:
        'Eine Plattform, die Restaurants flexible, intelligente Preisstrategien bietet und Gästen Echtzeitzugang zu exklusiven Angeboten in ihrer Nähe verschafft. Sie füllt nicht nur Tische – sie steigert die Umsätze an sonst schwachen Tagen.',
      theVision: 'Die Vision',
      visionContent: [
        'Eine weitere Erkenntnis: Bei Abholungen kassieren klassische Lieferplattformen oft bis zu 30 % Provision. Mit Dinery.ai können Restaurants Kunden direkt erreichen und Abholung vergünstigt anbieten – der Mehrwert bleibt bei Restaurant und Gast, nicht beim Zwischenhändler.',
        'Heute arbeitet das Team an dem ersten funktionsfähigen Prototypen der App. Die ersten Restaurants und Nutzer werden bereits onboardet, das Interesse wächst.',
        'Dinery.ai schafft ein Win-Win-Ökosystem, das lokale Wirtschaft stärkt, Gemeinschaft fördert und gutes Essen zugänglicher macht.'
      ],
      creatingValue: 'Wert schaffen',
      valueDescription:
        'Ein nachhaltiges Ökosystem, das Restaurants Mehrwert bietet, Kunden begeistert und Gemeinschaften stärkt.'
    }
  };

  const currentContent = content[currentLanguage] || content.US;

  const heroTransition =
    'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b1018] text-white">
      {/* Compact Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07] px-6 py-12 lg:py-14">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl"></div>
        
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-5 lg:gap-12">
            <div className="flex justify-center md:col-span-2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-orange-400 to-orange-600 opacity-25 blur-xl"></div>
                <div className="relative h-56 w-56 overflow-hidden rounded-[28px] border border-white/15 shadow-2xl sm:h-64 sm:w-64">
                  <img
                    src={samuliImg}
                    alt="Samuli Mikkola"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div 
                className={`mb-4 inline-block rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-300 ${heroTransition} ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: heroVisible ? '70ms' : '0ms' }}
              >
                {currentContent.title}
              </div>
              <h1 
                className={`mb-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-5xl ${heroTransition} ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: heroVisible ? '150ms' : '0ms' }}
              >
                {currentContent.subtitle}
              </h1>
              <div 
                className={`mb-4 ${heroTransition} ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: heroVisible ? '220ms' : '0ms' }}
              >
                <h2 className="text-xl font-semibold text-white">{currentContent.founderName}</h2>
                <p className="text-sm font-semibold text-orange-400">{currentContent.founderTitle}</p>
              </div>
              <p 
                className={`max-w-xl text-sm leading-6 text-slate-400 sm:text-base ${heroTransition} ${
                  heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: heroVisible ? '300ms' : '0ms' }}
              >
                {currentContent.founderIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Timeline */}
      <section className="px-6 py-10 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="founder-reveal mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">From insight to platform</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">{currentContent.theJourney}</h2>
          </div>

          {/* Tab Navigation */}
          <div className="founder-reveal mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {currentContent.timeline.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  activeTab === index
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                    : 'border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                {item.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="founder-reveal rounded-[24px] border border-white/[0.09] bg-white/[0.045] p-5 shadow-xl sm:p-7">
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-3 text-2xl font-semibold text-white">
                {currentContent.timeline[activeTab].title}
              </h3>
              <p className="mb-4 text-sm leading-6 text-slate-400 sm:text-base">
                {currentContent.timeline[activeTab].content}
              </p>
              {currentContent.timeline[activeTab].quote && (
                <div className="rounded-r-xl border-l-2 border-orange-400 bg-orange-500/10 p-4">
                  <p className="text-base italic leading-6 text-orange-100">
                    {currentContent.timeline[activeTab].quote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-y border-white/[0.07] bg-white/[0.025] px-6 py-10 lg:py-12">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
          <div className="founder-reveal rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-6 text-left text-white sm:p-8">
            <div className="mb-2 text-4xl leading-none text-orange-400">“</div>
            <p className="text-lg font-medium leading-7 sm:text-xl">
              {currentContent.mainQuote}
            </p>
            <p className="mt-4 text-sm font-semibold text-orange-400">{currentContent.quoteAuthor}</p>
          </div>

          {/* Dinery Birth */}
          <div className="founder-reveal rounded-[24px] bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-2xl sm:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-100/70">The turning point</p>
            <h3 className="mb-4 text-3xl font-semibold">{currentContent.dineryBorn}</h3>
            <p className="text-sm leading-6 text-orange-50/90 sm:text-base">
              {currentContent.dineryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-10 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-6 md:grid-cols-[1.35fr_.65fr]">
            <div>
              <p className="founder-reveal mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">What comes next</p>
              <h2 className="founder-reveal mb-4 text-3xl font-semibold text-white">{currentContent.theVision}</h2>
              <div className="space-y-3 text-sm leading-6 text-slate-400 sm:text-base">
                {currentContent.visionContent.map((paragraph, index) => (
                  <p key={index} className="founder-reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="founder-reveal rounded-[24px] border border-white/[0.09] bg-white/[0.045] p-6 shadow-xl">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                  <span className="text-2xl font-bold text-white">∞</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {currentContent.creatingValue}
                </h3>
                <p className="text-sm leading-6 text-slate-400">
                  {currentContent.valueDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .founder-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition-duration: 800ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .founder-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .founder-reveal,
          .founder-reveal.is-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
};

export default FounderStory;