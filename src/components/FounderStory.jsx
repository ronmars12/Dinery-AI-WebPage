import React, { useState } from 'react';
import samuliImg from '../assets/samuli.png';
import { useLanguage } from '../App';

const FounderStory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { currentLanguage } = useLanguage();

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

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Hero */}
      <section className="relative py-16 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={samuliImg}
                    alt="Samuli Mikkola"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="inline-block px-4 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold mb-4">
                {currentContent.title}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                {currentContent.subtitle}
              </h1>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{currentContent.founderName}</h2>
                <p className="text-lg text-orange-500 font-semibold">{currentContent.founderTitle}</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {currentContent.founderIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{currentContent.theJourney}</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {currentContent.timeline.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {item.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {currentContent.timeline[activeTab].title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {currentContent.timeline[activeTab].content}
              </p>
              {currentContent.timeline[activeTab].quote && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                  <p className="text-xl italic text-gray-800">
                    {currentContent.timeline[activeTab].quote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-6xl text-orange-400 mb-4">"</div>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
            {currentContent.mainQuote}
          </p>
          <p className="text-xl text-orange-400 font-semibold">{currentContent.quoteAuthor}</p>
        </div>
      </section>

      {/* Dinery Birth */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-10 md:p-12 text-white text-center shadow-2xl">
            <h3 className="text-4xl font-bold mb-6">{currentContent.dineryBorn}</h3>
            <p className="text-xl leading-relaxed opacity-95">
              {currentContent.dineryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{currentContent.theVision}</h2>
              <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
                {currentContent.visionContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl font-bold">∞</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentContent.creatingValue}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {currentContent.valueDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderStory;