import React, { useState } from 'react';
import { CheckCircle, Star, Users, Utensils, Clock, Shield, Gift, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../App';
import appStoreBadge from '../assets/appstore.png';
import playStoreBadge from '../assets/playstore.png';

const Customer = () => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Content translations
  const content = {
    US: {
      earlyAccess: 'Early Access Available',
      joinWaitlist: 'Download Now',
      description: 'At Dinery.ai, we believe that great food should be accessible, affordable, and community-driven. As a customer, you\'re not just saving money – you\'re participating in something bigger. Whether you\'re dining in or picking up takeaway, you\'ll enjoy exclusive offers from local restaurants that care about quality and service. By choosing Dinery.ai, you\'re helping small businesses thrive, reducing dependence on costly delivery platforms, and putting more value back into your neighborhood. Join the waitlist and be part of a smarter dining future.',
      benefits: [
        {
          number: "1",
          title: "Save up to 60% on selected meals",
          description: "Get exclusive discounts on dine-in and takeaway meals at quality local restaurants."
        },
        {
          number: "2", 
          title: "Support local businesses",
          description: "Help independent restaurants thrive by choosing them over multinational delivery chains."
        },
        {
          number: "3",
          title: "Enjoy better food experiences",
          description: "Discover hidden gems and eat fresher food without third-party delivery delays."
        },
        {
          number: "4",
          title: "Take control of your dining costs",
          description: "Skip expensive delivery apps and enjoy direct deals from restaurants."
        },
        {
          number: "5",
          title: "Be part of a smarter food movement",
          description: "Join a platform that prioritizes fairness, transparency, and community impact."
        },
        {
          number: "6",
          title: "Customize your experience",
          description: "You decide when, where and what kind of offers you wish to receive."
        }
      ],
      getEarlyAccess: 'Get Early Access',
      firstName: 'First Name',
      email: 'Email',
      firstNamePlaceholder: 'First Name',
      emailPlaceholder: 'Email',
      notRobot: 'I\'m not a robot',
      joinWaitlistBtn: 'Join the Waitlist',
      successMessage: 'Successfully Submitted!',
      securePrivate: 'Secure & Private',
      earlyAccessBenefits: 'Early Access Benefits',
      additionalInfo: 'Be among the first to experience smarter dining. No spam, just exclusive early access.'
    },
    FI: {
      earlyAccess: 'Ennakkopääsy saatavilla',
      joinWaitlist: 'Liity jonotuslistalle',
      description: 'Dinery.ai:ssa uskomme, että hyvän ruoan tulisi olla saavutettavaa, edullista ja yhteisöllistä. Asiakkaana et vain säästä rahaa – osallistut johonkin suurempaan. Olipa kyse ravintolassa syömisestä tai noutoruoasta, nautit paikallisten ravintoloiden eksklusiivisista tarjouksista, jotka välittävät laadusta ja palvelusta. Valitsemalla Dinery.ai:n autat pieniä yrityksiä menestymään, vähennät riippuvuutta kalliista toimitusalustoista ja tuot lisää arvoa takaisin naapurustoosi. Liity jonotuslistalle ja ole osa älykkäämpää ruokailun tulevaisuutta.',
      benefits: [
        {
          number: "1",
          title: "Säästä jopa 60% valituista aterioista",
          description: "Hanki eksklusiivisia alennuksia ravintola- ja noutoaterioista laadukkailta paikallisilta ravintoloilta."
        },
        {
          number: "2", 
          title: "Tue paikallisia yrityksiä",
          description: "Auta itsenäisiä ravintoloita menestymään valitsemalla ne monikansallisten toimitusketjujen sijaan."
        },
        {
          number: "3",
          title: "Nauti paremmista ruokakokemuksista",
          description: "Löydä piilotettuja helmiä ja syö tuoreempaa ruokaa ilman kolmannen osapuolen toimitusviiveitä."
        },
        {
          number: "4",
          title: "Hallitse ruokailukustannuksiasi",
          description: "Ohita kalliit toimitus-sovellukset ja nauti suorista tarjouksista ravintoloista."
        },
        {
          number: "5",
          title: "Ole osa älykkäämpää ruokaliikettä",
          description: "Liity alustaan, joka asettaa oikeudenmukaisuuden, läpinäkyvyyden ja yhteisövaikutuksen etusijalle."
        },
        {
          number: "6",
          title: "Mukauta kokemuksesi",
          description: "Sinä päätät milloin, missä ja millaisia tarjouksia haluat vastaanottaa."
        }
      ],
      getEarlyAccess: 'Hanki ennakkopääsy',
      firstName: 'Etunimi',
      email: 'Sähköposti',
      firstNamePlaceholder: 'Etunimi',
      emailPlaceholder: 'Sähköposti',
      notRobot: 'En ole robotti',
      joinWaitlistBtn: 'Liity jonotuslistalle',
      successMessage: 'Lähetetty onnistuneesti!',
      securePrivate: 'Turvallinen ja yksityinen',
      earlyAccessBenefits: 'Ennakkopääsyn edut',
      additionalInfo: 'Ole ensimmäisten joukossa kokemassa älykkäämpää ruokailua. Ei roskapostia, vain eksklusiivinen ennakkopääsy.'
    },
    NO: {
      earlyAccess: 'Tidlig tilgang tilgjengelig',
      joinWaitlist: 'Bli med på ventelisten',
      description: 'Hos Dinery.ai tror vi at god mat skal være tilgjengelig, rimelig og samfunnsdrevet. Som kunde sparer du ikke bare penger – du deltar i noe større. Enten du spiser inne eller henter takeaway, vil du nyte eksklusive tilbud fra lokale restauranter som bryr seg om kvalitet og service. Ved å velge Dinery.ai hjelper du små bedrifter med å blomstre, reduserer avhengigheten av kostbare leveringsplattformer, og setter mer verdi tilbake i nabolaget ditt. Bli med på ventelisten og vær en del av en smartere spisefremtid.',
      benefits: [
        {
          number: "1",
          title: "Spar opptil 60% på utvalgte måltider",
          description: "Få eksklusive rabatter på spise-inn og takeaway måltider på kvalitets lokale restauranter."
        },
        {
          number: "2", 
          title: "Støtt lokale bedrifter",
          description: "Hjelp uavhengige restauranter å blomstre ved å velge dem over multinasjonale leveringskjeder."
        },
        {
          number: "3",
          title: "Nyt bedre matopplevelser",
          description: "Oppdag skjulte perler og spis friskere mat uten tredjeparts leveringsforsinkelser."
        },
        {
          number: "4",
          title: "Ta kontroll over spisekostnadene dine",
          description: "Hopp over dyre leveringsapper og nyt direkte tilbud fra restauranter."
        },
        {
          number: "5",
          title: "Vær en del av en smartere matbevegelse",
          description: "Bli med i en plattform som prioriterer rettferdighet, åpenhet og samfunnspåvirkning."
        },
        {
          number: "6",
          title: "Tilpass opplevelsen din",
          description: "Du bestemmer når, hvor og hvilken type tilbud du ønsker å motta."
        }
      ],
      getEarlyAccess: 'Få tidlig tilgang',
      firstName: 'Fornavn',
      email: 'E-post',
      firstNamePlaceholder: 'Fornavn',
      emailPlaceholder: 'E-post',
      notRobot: 'Jeg er ikke en robot',
      joinWaitlistBtn: 'Bli med på ventelisten',
      successMessage: 'Sendt inn!',
      securePrivate: 'Sikker og privat',
      earlyAccessBenefits: 'Tidlig tilgangsfordeler',
      additionalInfo: 'Vær blant de første som opplever smartere spising. Ingen spam, bare eksklusiv tidlig tilgang.'
    },
    SE: {
      earlyAccess: 'Tidig åtkomst tillgänglig',
      joinWaitlist: 'Gå med på väntelistan',
      description: 'På Dinery.ai tror vi att bra mat ska vara tillgänglig, prisvärd och gemenskapsdriven. Som kund sparar du inte bara pengar – du deltar i något större. Oavsett om du äter inne eller hämtar takeaway kommer du att njuta av exklusiva erbjudanden från lokala restauranger som bryr sig om kvalitet och service. Genom att välja Dinery.ai hjälper du små företag att blomstra, minskar beroendet av dyra leveransplattformar och för mer värde tillbaka till ditt grannskap. Gå med på väntelistan och var en del av en smartare matframtid.',
      benefits: [
        {
          number: "1",
          title: "Spara upp till 60% på utvalda måltider",
          description: "Få exklusiva rabatter på äta-inne och takeaway måltider på kvalitets lokala restauranger."
        },
        {
          number: "2", 
          title: "Stöd lokala företag",
          description: "Hjälp oberoende restauranger att blomstra genom att välja dem framför multinationella leveranskedjor."
        },
        {
          number: "3",
          title: "Njut av bättre matupplevelser",
          description: "Upptäck dolda pärlor och ät färskare mat utan tredjepartsleveransförseningar."
        },
        {
          number: "4",
          title: "Ta kontroll över dina matkostnader",
          description: "Hoppa över dyra leveransappar och njut av direkta erbjudanden från restauranger."
        },
        {
          number: "5",
          title: "Var en del av en smartare matrörelse",
          description: "Gå med i en plattform som prioriterar rättvisa, transparens och samhällspåverkan."
        },
        {
          number: "6",
          title: "Anpassa din upplevelse",
          description: "Du bestämmer när, var och vilken typ av erbjudanden du vill ta emot."
        }
      ],
      getEarlyAccess: 'Få tidig åtkomst',
      firstName: 'Förnamn',
      email: 'E-post',
      firstNamePlaceholder: 'Förnamn',
      emailPlaceholder: 'E-post',
      notRobot: 'Jag är inte en robot',
      joinWaitlistBtn: 'Gå med på väntelistan',
      successMessage: 'Framgångsrikt skickat!',
      securePrivate: 'Säker och privat',
      earlyAccessBenefits: 'Tidig åtkomstfördelar',
      additionalInfo: 'Var bland de första som upplever smartare matupplevelser. Ingen spam, bara exklusiv tidig åtkomst.'
    },
    DE: {
      earlyAccess: 'Früher Zugang verfügbar',
      joinWaitlist: 'Zur Warteliste beitreten',
      description: 'Bei Dinery.ai glauben wir, dass gutes Essen zugänglich, erschwinglich und gemeinschaftsorientiert sein sollte. Als Kunde sparen Sie nicht nur Geld – Sie nehmen an etwas Größerem teil. Ob Sie vor Ort speisen oder Takeaway abholen, Sie genießen exklusive Angebote von lokalen Restaurants, die sich um Qualität und Service kümmern. Durch die Wahl von Dinery.ai helfen Sie kleinen Unternehmen zu gedeihen, reduzieren die Abhängigkeit von teuren Lieferplattformen und bringen mehr Wert zurück in Ihre Nachbarschaft. Treten Sie der Warteliste bei und seien Sie Teil einer smarteren Gastronomie-Zukunft.',
      benefits: [
        {
          number: "1",
          title: "Sparen Sie bis zu 60% bei ausgewählten Mahlzeiten",
          description: "Erhalten Sie exklusive Rabatte auf Speisen vor Ort und Takeaway-Mahlzeiten in hochwertigen lokalen Restaurants."
        },
        {
          number: "2", 
          title: "Unterstützen Sie lokale Unternehmen",
          description: "Helfen Sie unabhängigen Restaurants zu gedeihen, indem Sie sie multinationalen Lieferketten vorziehen."
        },
        {
          number: "3",
          title: "Genießen Sie bessere Gastronomie-Erlebnisse",
          description: "Entdecken Sie versteckte Perlen und essen Sie frischeres Essen ohne Lieferverzögerungen durch Dritte."
        },
        {
          number: "4",
          title: "Übernehmen Sie die Kontrolle über Ihre Gastronomiekosten",
          description: "Überspringen Sie teure Lieferapps und genießen Sie direkte Angebote von Restaurants."
        },
        {
          number: "5",
          title: "Seien Sie Teil einer smarteren Gastronomie-Bewegung",
          description: "Treten Sie einer Plattform bei, die Fairness, Transparenz und Gemeinschaftseinfluss priorisiert."
        },
        {
          number: "6",
          title: "Passen Sie Ihre Erfahrung an",
          description: "Sie entscheiden, wann, wo und welche Art von Angeboten Sie erhalten möchten."
        }
      ],
      getEarlyAccess: 'Frühen Zugang erhalten',
      firstName: 'Vorname',
      email: 'E-Mail',
      firstNamePlaceholder: 'Vorname',
      emailPlaceholder: 'E-Mail',
      notRobot: 'Ich bin kein Roboter',
      joinWaitlistBtn: 'Zur Warteliste beitreten',
      successMessage: 'Erfolgreich eingereicht!',
      securePrivate: 'Sicher und privat',
      earlyAccessBenefits: 'Früher Zugang Vorteile',
      additionalInfo: 'Seien Sie unter den Ersten, die smarteres Speisen erleben. Kein Spam, nur exklusiver früher Zugang.'
    }
  };

  const currentContent = content[currentLanguage] || content.US;
  const benefits = currentContent.benefits;

  const benefitIcons = [Gift, Users, Star, Shield, Utensils, MapPin];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Early Access Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-orange-100 border border-orange-200 rounded-full mb-12">
            <Sparkles className="w-5 h-5 text-orange-600 mr-3" />
            <span className="text-orange-700 font-semibold text-sm">{currentContent.earlyAccess}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
          </div>


          {/* Download Now */}
          <p className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
            {currentContent.joinWaitlist}
          </p>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands who are already transforming their dining experience
          </p>

          {/* Store Badges - Same Size */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="https://apps.apple.com/app/id6749490375"
              className="transition-all duration-300 transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <div className="bg-black text-white rounded-xl flex items-center justify-center w-52 h-16 px-4">
                <img src={appStoreBadge} alt="App Store" className="h-8 w-auto mr-3" />
                <div className="text-left">
                  <div className="text-xs opacity-80 leading-none">Download on the</div>
                  <div className="text-xl font-bold leading-none mt-1">App Store</div>
                </div>
              </div>
            </a>
            
            <div className="relative">
              <div className="bg-gray-400 text-white rounded-xl flex items-center justify-center w-52 h-16 px-4 cursor-not-allowed opacity-60">
                <img src={playStoreBadge} alt="Google Play" className="h-8 w-auto mr-3 opacity-50" />
                <div className="text-left">
                  <div className="text-xs opacity-80 leading-none">GET IT ON</div>
                  <div className="text-xl font-bold leading-none mt-1">Google Play</div>
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm font-semibold text-orange-600">Coming Soon for Android</span>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-lg mt-16">
            <p className="text-xl text-gray-700 leading-relaxed">
              {currentContent.description}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefitIcons[index];
            return (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{benefit.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 italic">{benefit.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg">
            {currentContent.additionalInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customer;