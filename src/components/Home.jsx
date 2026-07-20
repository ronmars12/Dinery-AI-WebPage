import React from 'react';
import { MapPin, Percent, Utensils, Clock, Users, ChefHat, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../App';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentLanguage } = useLanguage();

  // Content translations (keeping the same structure)
  const content = {
    US: {
      smartDining: 'Smart dining solutions',
      heroTitle: ['Meals, Only', 'Smarter'],
      heroDescription: 'Transform empty tables into memorable experiences. Connect with local restaurants offering exclusive deals while supporting your community.',
      startSaving: 'Start saving now!',
      howItWorks: 'How it works',
      howDineryWorks: ['How ', 'Dinery', ' Works'],
      threeSteps: 'Three simple steps to transform your dining experience',
      features: [
        {
          title: 'Find nearby deals',
          description: 'Discover exceptional restaurants with exclusive offers in your neighborhood.'
        },
        {
          title: 'Save up to 60%',
          description: 'Enjoy premium dining experiences at unbeatable prices.'
        },
        {
          title: 'Dine in or take home',
          description: 'Complete flexibility - eat in the restaurant or enjoy at home.'
        }
      ],
      benefitsCustomers: ['Benefits for ', 'Customers'],
      customerDescription: 'At Dinery.ai, we believe exceptional cuisine should be accessible to everyone. Join a community of food enthusiasts who discover hidden gems, support local businesses, and enjoy premium dining experiences at incredible prices.',
      benefitsRestaurants: ['Benefits for ', 'Restaurants'],
      restaurantDescription: 'Transform quiet hours into bustling dining experiences. Our platform connects you with eager customers during off-peak times, helping you maximize revenue while building lasting relationships with your community.',
      registerRestaurant: 'Register your restaurant',
      benefitsInvestors: ['Benefits for ', 'Investors'],
      investorDescription: 'Join the revolution in foodtech. Dinery.ai represents more than technology—it\'s a sustainable ecosystem that creates value for restaurants, delights customers, and generates meaningful returns for forward-thinking investors.',
      requestMoreInfo: 'Request more info'
    },
    FI: {
      smartDining: 'Älykkäitä ruokailuratkaisuja',
      heroTitle: ['Ateriat, Vain', 'Älykkäämmin'],
      heroDescription: 'Muuta tyhjät pöydät unohtumattomiksi kokemuksiksi. Löydä paikallisia ravintoloita, jotka tarjoavat eksklusiivisia tarjouksia samalla kun tuet yhteisöäsi.',
      startSaving: 'Aloita säästäminen nyt!',
      howItWorks: 'Näin se toimii',
      howDineryWorks: ['Näin ', 'Dinery', ' Toimii'],
      threeSteps: 'Kolme yksinkertaista askelta ruokailukokemuksesi muuttamiseksi',
      features: [
        {
          title: 'Löydä lähialueen tarjouksia',
          description: 'Löydä poikkeuksellisia ravintoloita eksklusiivisine tarjouksineen naapurustostasi.'
        },
        {
          title: 'Säästä jopa 60%',
          description: 'Nauti premium-ruokailukokemuksista lyömättömiin hintoihin.'
        },
        {
          title: 'Syö paikan päällä tai ota kotiin',
          description: 'Täydellinen joustavuus - syö ravintolassa tai nauti kotona.'
        }
      ],
      benefitsCustomers: ['Hyödyt ', 'Asiakkaille'],
      customerDescription: 'Dinery.ai:ssa uskomme, että poikkeuksellisen keittiön tulisi olla kaikkien saatavilla. Liity ruokaharrastajien yhteisöön, joka löytää piilotettuja helmiä, tukee paikallisia yrityksiä ja nauttii premium-ruokailukokemuksista uskomattomilla hinnoilla.',
      benefitsRestaurants: ['Hyödyt ', 'Ravintoloille'],
      restaurantDescription: 'Muuta hiljaiset tunnit vilkkaaksi ruokailukokemukseksi. Alustamme yhdistää sinut innokkaiden asiakkaiden kanssa hiljaisten aikojen aikana, auttaen sinua maksimoimaan tulosi ja rakentamaan pysyviä suhteita yhteisöösi.',
      registerRestaurant: 'Rekisteröi ravintolasi',
      benefitsInvestors: ['Hyödyt ', 'Sijoittajille'],
      investorDescription: 'Liity ruokateknologian vallankumoukseen. Dinery.ai edustaa enemmän kuin teknologiaa—se on kestävä ekosysteemi, joka luo arvoa ravintoloille, ilahduttaa asiakkaita ja tuottaa merkityksellisiä tuottoja tulevaisuuteen katsovilla sijoittajille.',
      requestMoreInfo: 'Pyydä lisätietoja'
    },
    NO: {
      smartDining: 'Smarte spiseopplösninger',
      heroTitle: ['Måltider, Bare', 'Smartere'],
      heroDescription: 'Forvandl tomme bord til minneverdige opplevelser. Koble til lokale restauranter som tilbyr eksklusive tilbud mens du støtter lokalsamfunnet ditt.',
      startSaving: 'Start å spare nå!',
      howItWorks: 'Slik fungerer det',
      howDineryWorks: ['Slik ', 'Dinery', ' Fungerer'],
      threeSteps: 'Tre enkle trinn for å forvandle spiseopplevelsen din',
      features: [
        {
          title: 'Finn tilbud i nærheten',
          description: 'Oppdag eksepsjonelle restauranter med eksklusive tilbud i nabolaget ditt.'
        },
        {
          title: 'Spar opptil 60%',
          description: 'Nyt premium spiseopplevelser til uslåelige priser.'
        },
        {
          title: 'Spis inne eller ta med hjem',
          description: 'Full fleksibilitet - spis på restauranten eller nyt hjemme.'
        }
      ],
      benefitsCustomers: ['Fordeler for ', 'Kunder'],
      customerDescription: 'Hos Dinery.ai tror vi at eksepsjonell mat bør være tilgjengelig for alle. Bli med i et fellesskap av matentusiaster som oppdager skjulte perler, støtter lokale bedrifter og nyter premium spiseopplevelser til utrolige priser.',
      benefitsRestaurants: ['Fordeler for ', 'Restauranter'],
      restaurantDescription: 'Forvandl rolige timer til travle spiseopplevelser. Vår plattform kobler deg til ivrige kunder i lavtrafikktider, og hjelper deg med å maksimere inntekter mens du bygger varige forhold til lokalsamfunnet ditt.',
      registerRestaurant: 'Registrer restauranten din',
      benefitsInvestors: ['Fordeler for ', 'Investorer'],
      investorDescription: 'Bli med i revolusjonen innen matteknologi. Dinery.ai representerer mer enn teknologi—det er et bærekraftig økosystem som skaper verdi for restauranter, gleder kunder og genererer meningsfulle avkastninger for fremtidsrettede investorer.',
      requestMoreInfo: 'Be om mer info'
    },
    SE: {
      smartDining: 'Smarta måltidslösningar',
      heroTitle: ['Måltider, Bara', 'Smartare'],
      heroDescription: 'Förvandla tomma bord till minnesvärda upplevelser. Anslut till lokala restauranger som erbjuder exklusiva erbjudanden samtidigt som du stödjer ditt samhälle.',
      startSaving: 'Börja spara nu!',
      howItWorks: 'Så fungerar det',
      howDineryWorks: ['Så ', 'Dinery', ' Fungerar'],
      threeSteps: 'Tre enkla steg för att förvandla din matupplevelse',
      features: [
        {
          title: 'Hitta erbjudanden i närheten',
          description: 'Upptäck exceptionella restauranger med exklusiva erbjudanden i ditt grannskap.'
        },
        {
          title: 'Spara upp till 60%',
          description: 'Njut av premium matupplevelser till oslagbara priser.'
        },
        {
          title: 'Ät inne eller ta med hem',
          description: 'Full flexibilitet - ät på restaurangen eller njut hemma.'
        }
      ],
      benefitsCustomers: ['Fördelar för ', 'Kunder'],
      customerDescription: 'På Dinery.ai tror vi att exceptionell mat ska vara tillgänglig för alla. Gå med i en gemenskap av matentusiaster som upptäcker dolda pärlor, stödjer lokala företag och njuter av premium matupplevelser till otroliga priser.',
      benefitsRestaurants: ['Fördelar för ', 'Restauranger'],
      restaurantDescription: 'Förvandla tysta timmar till livliga matupplevelser. Vår plattform kopplar dig till ivriga kunder under lågtrafiktider och hjälper dig att maximera intäkter samtidigt som du bygger varaktiga relationer med ditt samhälle.',
      registerRestaurant: 'Registrera din restaurang',
      benefitsInvestors: ['Fördelar för ', 'Investerare'],
      investorDescription: 'Gå med i revolutionen inom matteknologi. Dinery.ai representerar mer än teknologi—det är ett hållbart ekosystem som skapar värde för restauranger, gläder kunder och genererar meningsfulla avkastningar för framtidsinriktade investerare.',
      requestMoreInfo: 'Begär mer info'
    },
    DE: {
      smartDining: 'Intelligente Gastronomieerfahrungen',
      heroTitle: ['Mahlzeiten, Nur', 'Smarter'],
      heroDescription: 'Verwandeln Sie leere Tische in unvergessliche Erlebnisse. Verbinden Sie sich mit lokalen Restaurants, die exklusive Angebote anbieten, während Sie Ihre Gemeinde unterstützen.',
      startSaving: 'Jetzt sparen!',
      howItWorks: 'So funktioniert es',
      howDineryWorks: ['So ', 'Dinery', ' Funktioniert'],
      threeSteps: 'Drei einfache Schritte, um Ihr Gastronomie-Erlebnis zu verwandeln',
      features: [
        {
          title: 'Angebote in der Nähe finden',
          description: 'Entdecken Sie außergewöhnliche Restaurants mit exklusiven Angeboten in Ihrer Nachbarschaft.'
        },
        {
          title: 'Bis zu 60% sparen',
          description: 'Genießen Sie Premium-Gastronomie-Erlebnisse zu unschlagbaren Preisen.'
        },
        {
          title: 'Vor Ort essen oder mitnehmen',
          description: 'Vollständige Flexibilität - essen Sie im Restaurant oder genießen Sie zu Hause.'
        }
      ],
      benefitsCustomers: ['Vorteile für ', 'Kunden'],
      customerDescription: 'Bei Dinery.ai glauben wir, dass außergewöhnliche Küche für jeden zugänglich sein sollte. Werden Sie Teil einer Gemeinschaft von Foodenthusiasten, die versteckte Perlen entdecken, lokale Unternehmen unterstützen und Premium-Gastronomie-Erlebnisse zu unglaublichen Preisen genießen.',
      benefitsRestaurants: ['Vorteile für ', 'Restaurants'],
      restaurantDescription: 'Verwandeln Sie ruhige Stunden in lebhafte Gastronomie-Erlebnisse. Unsere Plattform verbindet Sie mit eifrigen Kunden in verkehrsarmen Zeiten und hilft Ihnen, Ihren Umsatz zu maximieren, während Sie dauerhafte Beziehungen zu Ihrer Gemeinde aufbauen.',
      registerRestaurant: 'Restaurant registrieren',
      benefitsInvestors: ['Vorteile für ', 'Investoren'],
      investorDescription: 'Werden Sie Teil der Revolution in der Foodtech-Branche. Dinery.ai repräsentiert mehr als nur Technologie—es ist ein nachhaltiges Ökosystem, das Wert für Restaurants schafft, Kunden erfreut und bedeutsame Renditen für zukunftsorientierte Investoren generiert.',
      requestMoreInfo: 'Weitere Informationen anfordern'
    }
  };

  const currentContent = content[currentLanguage] || content.US;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10 flex flex-col justify-center">
            <div className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full shadow-sm w-fit">
              <span className="font-medium">{currentContent.smartDining}</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-gray-900">
                {currentContent.heroTitle[0]}
                <br />
                <span className="text-orange-500">
                  {currentContent.heroTitle[1]}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                {currentContent.heroDescription}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Link
                to="/restaurants"
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-5 rounded-xl text-xl font-medium transition-colors duration-200 inline-flex items-center"
              >
                {currentContent.startSaving}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-3" />
              </Link>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative flex items-center justify-end lg:justify-end lg:translate-x-12">
            <img 
              src="/DineryApp.png" 
              alt="Dinery AI Mobile App" 
              className="w-full max-w-2xl lg:max-w-4xl h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* How Dinery Works */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              {currentContent.howDineryWorks[0]}
              <span className="text-orange-500">
                {currentContent.howDineryWorks[1]}
              </span>
              {currentContent.howDineryWorks[2]}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {currentContent.threeSteps}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: MapPin, color: 'bg-blue-500' },
              { icon: Percent, color: 'bg-green-500' },
              { icon: Utensils, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-md`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-medium text-sm">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-full h-1 bg-orange-500 rounded-full mb-6"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentContent.features[index].title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {currentContent.features[index].description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Customers */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual Element */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="w-full h-96 bg-orange-500 rounded-3xl shadow-lg transform -rotate-3"></div>
              <div className="absolute inset-6 bg-white rounded-2xl flex flex-col items-center justify-center p-8 shadow-sm">
                <div className="flex space-x-2 mb-4">
                  <Star className="w-8 h-8 text-orange-500 fill-current" />
                  <Star className="w-8 h-8 text-orange-500 fill-current" />
                  <Star className="w-8 h-8 text-orange-500 fill-current" />
                  <Star className="w-8 h-8 text-orange-500 fill-current" />
                  <Star className="w-8 h-8 text-orange-500 fill-current" />
                </div>
                <p className="text-center text-gray-700 font-medium text-lg">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-gray-900">{currentContent.benefitsCustomers[0]}</span>
              <span className="text-orange-500">
                {currentContent.benefitsCustomers[1]}
              </span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {currentContent.customerDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits for Restaurants */}
      <section className="py-32 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">{currentContent.benefitsRestaurants[0]}</span>
              <span className="text-orange-400">
                {currentContent.benefitsRestaurants[1]}
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {currentContent.restaurantDescription}
            </p>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="w-full h-96 bg-orange-500 rounded-3xl shadow-lg transform rotate-2"></div>
            <div className="absolute inset-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 font-medium">Restaurant Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Investors */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-full h-1 bg-[#fc8722] rounded-full mb-12"></div>
            
            <div className="text-center space-y-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-gray-900">{currentContent.benefitsInvestors[0]}</span>
                <span className="text-orange-500">
                  {currentContent.benefitsInvestors[1]}
                </span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {currentContent.investorDescription}
              </p>
              <Link
                to="/investors"
                className="bg-orange-500 hover:bg-orange-600 text-white px-16 py-6 rounded-xl text-xl font-medium transition-colors duration-200 inline-flex items-center"
              >
                {currentContent.requestMoreInfo}
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;