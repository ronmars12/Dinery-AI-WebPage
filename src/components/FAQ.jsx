import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../App';

const FAQ = () => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('customers');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) =>
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));

  /** Base (US) content — default + fallback for other languages */
  const base = {
    title: 'Frequently Asked Questions',
    subtitle:
      "Find answers to common questions about Dinery.ai. If you need more help, feel free to contact us directly.",
    tabs: {
      customers: 'Customers',
      investors: 'Investors',
      restaurants: 'Restaurants',
    },
    stillHaveQuestions: 'Still have questions?',
    cantFind: "Can't find what you're looking for? We're here to help.",
    contactUs: 'Contact Us',
    customerFAQs: [
      { question: 'What is Dinery.ai?', answer: "Dinery.ai is a smart dining platform that helps you discover exclusive deals at local restaurants during off-peak hours. It's a way to eat better for less – no delivery app required." },
      { question: 'How does it work?', answer: 'You browse offers from nearby restaurants, choose a deal that suits your time and taste, and then dine in or pick up the meal. Simple, direct, and cost-effective.' },
      { question: 'How much can I save?', answer: 'You can save up to 60% on selected dine-in meals or takeaway orders, depending on the restaurant and time of day.' },
      { question: 'Is Dinery.ai a delivery service?', answer: "No. We're not a delivery app. We connect you directly with restaurants so you can enjoy meals in-house or pick them up yourself – with no extra delivery fees." },
      { question: 'Is it free to use?', answer: 'Yes, Dinery.ai is completely free for customers. There are no hidden charges, subscriptions, or service fees.' },
      { question: 'Do I need to create an account?', answer: 'To access personalized offers and join the waitlist, yes. Creating an account helps us match you with the best deals near you.' },
      { question: 'What kind of restaurants are included?', answer: "You'll find everything from family-owned local favorites to upscale bistros. We focus on quality independent restaurants that want to fill tables during quiet periods." },
      { question: 'When are offers usually available?', answer: 'Deals are typically available during off-peak hours – late lunches, early dinners, weekdays – when restaurants have more seating available.' },
      { question: 'Can I use it for takeaway?', answer: 'Yes. Many restaurants offer takeaway deals through Dinery.ai so you can enjoy discounts even when dining at home.' },
      { question: 'How do I redeem an offer?', answer: 'Just show the digital offer or QR code to the restaurant at the time of your visit or pickup. No printing or prepayment required.' },
      { question: 'Do I need to make a reservation?', answer: "Some offers may require a booking, but most are available for walk-ins. You'll see the conditions clearly before accepting any offer." },
      { question: 'Will I get spammed with emails or ads?', answer: 'Absolutely not. We only send relevant offers and updates — and you can unsubscribe anytime with one click.' },
      { question: 'How is this different from food delivery apps?', answer: "We help restaurants avoid high commission fees and give you the full savings. Plus, you get better food quality without third-party delays or packaging issues." },
      { question: 'Can I refer friends?', answer: 'Yes! Referral bonuses and free meals will be part of our rewards program once we launch.' },
      { question: 'When will Dinery.ai be available in my city?', answer: "We're launching city by city. Join the waitlist and we'll notify you when we go live in your area!" },
      {
        question: 'How does Dinery.ai handle my data and privacy?',
        answer:
          'We only collect the minimum information needed to run the service and never sell your data. You can read the full details in our Privacy Policy on the Dinery website.',
      },
    ],
    investorFAQs: [
      { question: 'What problem does Dinery.ai solve?', answer: 'It solves the inefficiency of underutilized capacity in the restaurant industry by dynamically matching supply with real-time local demand – without relying on delivery.' },
      { question: 'What is the market potential?', answer: 'The global foodservice market exceeds $4 trillion. Even a small share of this represents a billion-dollar opportunity.' },
      { question: 'What is your business model?', answer: 'We operate on a freemium and SaaS model with optional premium features and revenue-sharing for promoted offers.' },
      { question: 'How do you acquire restaurants?', answer: 'Through direct outreach, digital campaigns, and referrals. We focus on independent restaurants that want more control and profit.' },
      { question: 'How do you acquire customers?', answer: 'Via hyper-local marketing, social media, influencers, and geo-targeted deals to drive adoption and loyalty.' },
      { question: 'Do you charge restaurants a commission?', answer: "No. Unlike delivery platforms, we do not take a percentage of the restaurant's revenue. Restaurants keep 100%." },
      { question: 'Is there traction or proof of concept?', answer: 'We are building with early adopters and have positive feedback from both restaurants and customers during pilot outreach.' },
      { question: 'What makes you different from delivery apps?', answer: 'We empower direct relationships between restaurants and consumers, with lower operational cost, no couriers, and better profit margins.' },
      { question: 'What are the risks?', answer: 'As with any platform startup: market timing, user acquisition cost, and scaling. We mitigate with lean operations and strong early traction.' },
      { question: 'How much are you raising?', answer: "We're currently raising a pre-seed round of €250,000 to build the MVP, launch in target markets, and reach 1,000+ restaurants." },
      { question: 'What will the funds be used for?', answer: 'Product development, go-to-market operations, restaurant onboarding, and consumer acquisition.' },
      { question: 'Who is behind the project?', answer: 'A team of founders with backgrounds in hospitality, SaaS, and AI – with firsthand experience as restaurant owners.' },
      { question: 'How do investors benefit?', answer: 'Early-stage investors receive equity and future participation rights in one of the most scalable segments of foodtech.' },
      { question: 'How can I request more information?', answer: "Simply request a meeting on our website or contact us directly – we'd love to share our pitch deck and metrics." },
    ],
    restaurantFAQs: [
      { question: 'How does Dinery.ai help my restaurant?', answer: 'By connecting you directly with local diners during slow periods, you can boost revenue, reduce waste, and increase visibility without relying on food delivery apps.' },
      { question: 'Is there a fee to join?', answer: 'No, registration is completely free. We operate without commissions, so you keep 100% of your revenue.' },
      { question: 'Do I need new equipment or systems?', answer: 'No. Dinery.ai integrates seamlessly with your current workflow. You just need internet access and a staff member to verify redemptions.' },
      { question: 'Who decides the offers and prices?', answer: 'You do. You set the discount, the time window, and the conditions. Total flexibility.' },
      { question: 'Can I limit the number of redemptions?', answer: 'Yes. You can cap how many customers can use an offer during a time slot.' },
      { question: 'How do customers find our restaurant?', answer: 'We promote your offers to nearby users based on time, location, and interest – maximizing visibility.' },
      { question: 'Can I stop or pause my offers at any time?', answer: 'Absolutely. You have full control and can activate, pause, or modify offers anytime.' },
      { question: 'Do I need to train my staff?', answer: 'Only minimally. Staff will verify digital codes shown by customers – no complex systems involved.' },
      { question: 'What kinds of restaurants can join?', answer: 'All types are welcome – from cafés to fine dining. We focus on independent venues looking to grow.' },
      { question: 'Is there a contract?', answer: 'No long-term contract is required. You can try the platform and leave at any time.' },
      { question: 'Can I track performance?', answer: "Yes. You'll get basic analytics on redemptions, customer traffic, and campaign success." },
      { question: 'How is this different from delivery platforms?', answer: "Unlike delivery apps, we don't take a cut. You connect directly with customers and build loyalty in-house." },
      { question: 'Can I also promote takeaway?', answer: 'Yes. You can offer both dine-in and takeaway deals.' },
      { question: 'How do I get started?', answer: "Just pre-register through our website. We'll guide you through setup and let you know when we launch in your city." },
    ],
  };

  /** Overrides — FI (full content); NO/SE/DE (now with localized Q&A) */
  const overrides = {
    FI: {
      title: 'Usein kysytyt kysymykset',
      subtitle:
        'Löydä vastauksia yleisiin Dinery.ai-kysymyksiin. Jos tarvitset lisäapua, ota meihin yhteyttä suoraan.',
      tabs: { customers: 'Asiakkaat', investors: 'Sijoittajat', restaurants: 'Ravintolat' },
      stillHaveQuestions: 'Onko sinulla vielä kysymyksiä?',
      cantFind: 'Etkö löydä etsimääsi? Olemme täällä auttamassa.',
      contactUs: 'Ota yhteyttä',
      customerFAQs: [
        { question: 'Mikä on Dinery.ai?', answer: 'Dinery.ai on älykäs ruokailuliike, joka auttaa sinua löytämään eksklusiivisia tarjouksia paikallisista ravintoloista hiljaisten tuntien aikana. Se on tapa syödä paremmin vähemmällä rahalla – toimitussovellusta ei tarvita.' },
        { question: 'Miten se toimii?', answer: 'Selaat lähellä olevien ravintoloiden tarjouksia, valitset aikasi ja makusi mukaisen tarjouksen ja sitten syöt ravintolassa tai notat aterian. Yksinkertaista, suoraa ja kustannustehokasta.' },
        { question: 'Kuinka paljon voin säästää?', answer: 'Voit säästää jopa 60% valituista ravintola-aterioista tai noutoruoista riippuen ravintolasta ja vuorokaudenajasta.' },
        { question: 'Onko Dinery.ai kuljetuspalvelu?', answer: 'Ei. Emme ole kuljetussovellus. Yhdistämme sinut suoraan ravintoloihin, jotta voit nauttia aterioista paikan päällä tai noutaa ne itse – ilman ylimääräisiä toimituskuluja.' },
        { question: 'Onko sen käyttö ilmaista?', answer: 'Kyllä, Dinery.ai on täysin ilmainen asiakkaille. Ei ole piilotettuja maksuja, tilauksia tai palvelumaksuja.' },
        { question: 'Tarvitsenko luoda tilin?', answer: 'Päästäksesi yksilöllisiin tarjouksiin ja liittyäksesi jonotuslistalle, kyllä. Tilin luominen auttaa meitä yhdistämään sinut parhaimpiin tarjouksiin lähelläsi.' },
        { question: 'Millaisia ravintoloita mukana on?', answer: 'Löydät kaiken perheiden omistamista paikallisista suosikeista hienostoravintoloihin. Keskitymme laatua tarjoaviin itsenäisiin ravintoloihin, jotka haluavat täyttää pöytiä hiljaisten jaksojen aikana.' },
        { question: 'Milloin tarjouksia yleensä on saatavilla?', answer: 'Tarjoukset ovat tyypillisesti saatavilla hiljaisten tuntien aikana – myöhäiset lounaat, varhaiset illalliset, arkipäivät – kun ravintoloissa on enemmän paikkoja vapaana.' },
        { question: 'Voinko käyttää sitä noutoruokaan?', answer: 'Kyllä. Monet ravintolat tarjoavat noutoruokatarjouksia Dinery.ai:n kautta, jotta voit nauttia alennuksista myös syödessäsi kotona.' },
        { question: 'Kuinka lunastan tarjouksen?', answer: 'Näytä vain digitaalinen tarjous tai QR-koodi ravintolalle vierailusi tai noudon aikana. Tulostamista tai ennakkomaksua ei tarvita.' },
        { question: 'Tarvitsenko tehdä varauksen?', answer: 'Jotkut tarjoukset saattavat vaatia varauksen, mutta useimmat ovat saatavilla kävelyasiakkaille. Näet ehdot selkeästi ennen minkään tarjouksen hyväksymistä.' },
        { question: 'Saanko roskapostia tai mainoksia?', answer: 'Ehdottomasti ei. Lähetämme vain relevantteja tarjouksia ja päivityksiä — ja voit peruuttaa tilauksen milloin tahansa yhdellä klikkauksella.' },
        { question: 'Miten tämä eroaa ruoantoimitussovelluksista?', answer: 'Autamme ravintoloita välttämään korkeita välityspalkkioita ja annamme sinulle täydet säästöt. Lisäksi saat parempaa ruoan laatua ilman kolmannen osapuolen viiveitä tai pakkausongelmia.' },
        { question: 'Voinko suositella ystäviä?', answer: 'Kyllä! Suosittelubonukset ja ilmaiset ateriat ovat osa palkinto-ohjelmaramme lanseerauksen jälkeen.' },
        { question: 'Milloin Dinery.ai on saatavilla kaupungissani?', answer: 'Lanseeraamme kaupunki kerrallaan. Liity jonotuslistalle ja ilmoitamme sinulle, kun menemme liiviin alueellasi!' },
      ],
      investorFAQs: [
        { question: 'Minkä ongelman Dinery.ai ratkaisee?', answer: 'Se ratkaisee ravintola-alan vajaakäytetyn kapasiteetin tehottomuuden yhdistämällä dynaamisesti tarjonta reaaliaikaiseen paikalliseen kysyntään – ilman kuljetusten tuojaa.' },
        { question: 'Mikä on markkinapotentiaali?', answer: 'Globaalit ravintola- ja ruokapalvelumarkkinat ylittävät 4 biljoonaa dollaria. Jopa pieni osuus tästä edustaa miljardin dollarin mahdollisuutta.' },
        { question: 'Mikä on liiketoimintamallini?', answer: 'Toimimme freemium- ja SaaS-mallilla valinnaisilla premium-ominaisuuksilla ja tulojenjaolla promootiotarjouksille.' },
        { question: 'Miten hankitte ravintoloita?', answer: 'Suoran yhteydenoton, digitaalisten kampanjoiden ja suositusten kautta. Keskitymme itsenäisiin ravintoloihin, jotka haluavat enemmän kontrollia ja voittoa.' },
        { question: 'Miten hankitte asiakkaita?', answer: 'Hyperpaikalliset markkinointi, sosiaalisen median, vaikuttajien ja geograafisesti kohdistettujen tarjousten kautta ohjataksemme käyttöönotoa ja uskollisuutta.' },
        { question: 'Veloitteko ravintoloista välityspalkkion?', answer: 'Ei. Toisin kuin kuljetusalustat, emme ota prosenttia ravintolan tuloista. Ravintolat pitävät 100%.' },
        { question: 'Onko vetovoimaa tai konseptitodiste?', answer: 'Rakennamme varhaisten omaksujen kanssa ja olemme saaneet positiivista palautetta sekä ravintoloilta että asiakkailta pilottiyhteydenoton aikana.' },
        { question: 'Mikä tekee teistä erilaisen kuin kuljetussovellukset?', answer: 'Voimaannutamme suoria suhteita ravintoloiden ja kuluttajien välillä, alhaisemmilla toimintakustannuksilla, ei kuriireita ja paremmat voittomarginaalit.' },
        { question: 'Mitkä ovat riskit?', answer: 'Kuten minkä tahansa alustakäynnistyksen kanssa: markkinoiden ajoitus, asiakkaiden hankintakustannukset ja skaalaus. Lieventämme kevyillä toiminnoilla ja vahvalla varhaisella vetovoimalla.' },
        { question: 'Kuinka paljon kerätte?', answer: 'Keräämme parhaillaan pre-seed-kierrosta 250,000 €, rakentaaksemme MVP:n, lanseerataksemme kohdemarkkinoilla ja saavuttaaksemme 1,000+ ravintolaa.' },
        { question: 'Mihin varat käytetään?', answer: 'Tuotekehitys, markkinoille meno -operaatiot, ravintolan perehdyttäminen ja kuluttajahankinta.' },
        { question: 'Kuka on hankkeen takana?', answer: 'Perustajien tiimi, jolla on tausta majoitusliike-, SaaS- ja tekoälyalalta – ensikäden kokemuksella ravintolanomistajina.' },
        { question: 'Miten sijoittajat hyötyvät?', answer: 'Varhaisen vaiheen sijoittajat saavat osakkuutta ja tulevia osallistumisoikeuksia yhdessä ruokateknologian skaalautuvimmista segmenteistä.' },
        { question: 'Miten voin pyytää lisätietoja?', answer: 'Pyydä vain tapaamista verkkosivustomme kautta tai ota meihin yhteyttä suoraan – haluaisimme jakaa pitch deck -esityksemme ja mittarimme.' },
      ],
      restaurantFAQs: [
        { question: 'Miten Dinery.ai auttaa ravintolaani?', answer: 'Yhdistämällä sinut suoraan paikallisiin ruokailijoihin hiljaisten jaksojen aikana, voit lisätä tuloja, vähentää jätettä ja lisätä näkyvyyttä ilman ruoankuljetussovelluksia.' },
        { question: 'Onko liittymisestä maksua?', answer: 'Ei, rekisteröityminen on täysin ilmaista. Toimimme ilman välityspalkkioita, joten pidät 100% tuloistasi.' },
        { question: 'Tarvitsenko uusia laitteita tai järjestelmiä?', answer: 'Ei. Dinery.ai integroituu saumattomasti nykyiseen työnkulkuusi. Tarvitset vain internetyhteyden ja henkilökunnan jäsenen vahvistamaan lunastuksia.' },
        { question: 'Kuka päättää tarjoukset ja hinnat?', answer: 'Sinä päätät. Asetat alennuksen, aikaikkuna ja ehdot. Täydellinen joustavuus.' },
        { question: 'Voinko rajoittaa lunastusten määrää?', answer: 'Kyllä. Voit asettaa ylärajan sille, kuinka monta asiakasta voi käyttää tarjousta aikavälillä.' },
        { question: 'Miten asiakkaat löytävät ravintolaamme?', answer: 'Promoamme tarjouksiasi lähellä oleville käyttäjille ajan, sijainnin ja kiinnostuksen perusteella – maksimoimme näkyvyyden.' },
        { question: 'Voinko lopettaa tai keskeyttää tarjoukseni milloin tahansa?', answer: 'Ehdottomasti. Sinulla on täydellinen kontrolli ja voit aktivoida, keskeyttää tai muokata tarjouksia milloin tahansa.' },
        { question: 'Tarvitsenko kouluttaa henkilökuntatani?', answer: 'Vain minimaalisesti. Henkilökunta vahvistaa asiakkaiden näyttämiä digitaalisia koodeja – ei monimutkaisia järjestelmiä.' },
        { question: 'Millaisia ravintoloita voi liittyä?', answer: 'Kaikki tyypit ovat tervetulleita – kahviloista hienostoravintolaan. Keskitymme itsenäisiin paikkoihin, jotka haluavat kasvaa.' },
        { question: 'Onko sopimusta?', answer: 'Pitkäaikaista sopimusta ei vaadita. Voit kokeilla alustaa ja lähteä milloin tahansa.' },
        { question: 'Voinko seurata suorituskykyä?', answer: 'Kyllä. Saat perusanalytiikkaa lunastuksista, asiakasliikenteestä ja kampanjan menestyksestä.' },
        { question: 'Miten tämä eroaa kuljetusalustoista?', answer: 'Toisin kuin kuljetusalustat, emme ota osuutta. Yhdistyt suoraan asiakkaisiin ja rakennat uskollisuutta talon sisällä.' },
        { question: 'Voinko myös promoota noutoruokaa?', answer: 'Kyllä. Voit tarjota sekä ravintola- että noutoruokatarjouksia.' },
        { question: 'Miten pääsen alkuun?', answer: 'Vain esirekisteröidy verkkosivustomme kautta. Opastamme sinut asetuksissa ja kerromme, kun lanseeraamme kaupungissasi.' },
      ],
    },

    NO: {
      title: 'Ofte stilte spørsmål',
      subtitle:
        'Finn svar på vanlige spørsmål om Dinery.ai. Trenger du mer hjelp, kontakt oss gjerne.',
      tabs: { customers: 'Kunder', investors: 'Investorer', restaurants: 'Restauranter' },
      stillHaveQuestions: 'Har du fortsatt spørsmål?',
      cantFind: 'Finner du ikke det du leter etter? Vi hjelper gjerne.',
      contactUs: 'Kontakt oss',
      customerFAQs: [
        { question: 'Hva er Dinery.ai?', answer: 'Dinery.ai er en smart plattform som hjelper deg å finne eksklusive tilbud hos lokale restauranter i lavtrafikktider. Spis bedre for mindre – uten leveringsapp.' },
        { question: 'Hvordan fungerer det?', answer: 'Bla gjennom tilbud i nærheten, velg et som passer deg, og spis i restauranten eller hent maten selv. Enkelt og rimelig.' },
        { question: 'Hvor mye kan jeg spare?', answer: 'Opptil 60% på utvalgte måltider eller takeaway, avhengig av restaurant og tidspunkt.' },
        { question: 'Er Dinery.ai en leveringstjeneste?', answer: 'Nei. Vi er ikke en leveringsapp. Du kobles direkte til restauranter – ingen tillegg for levering.' },
        { question: 'Er det gratis å bruke?', answer: 'Ja, Dinery.ai er helt gratis for kunder. Ingen skjulte gebyrer.' },
        { question: 'Må jeg opprette konto?', answer: 'For personlige tilbud og venteliste, ja. Konto hjelper oss å matche deg med riktige tilbud.' },
        { question: 'Kan jeg bruke det til takeaway?', answer: 'Ja, mange restauranter tilbyr takeaway-tilbud via Dinery.ai.' },
        { question: 'Hvordan løser jeg inn et tilbud?', answer: 'Vis det digitale tilbudet eller QR-koden i restauranten ved besøk eller henting.' },
      ],
      investorFAQs: [
        { question: 'Hvilket problem løser Dinery.ai?', answer: 'Vi utnytter ledig kapasitet i restaurantbransjen ved å matche tilbud med lokal etterspørsel i sanntid – uten levering.' },
        { question: 'Hva er forretningsmodellen?', answer: 'Freemium/SaaS med valgfrie premium-funksjoner og inntektsdeling for promoterte tilbud.' },
        { question: 'Tar dere provisjon fra restauranter?', answer: 'Nei. I motsetning til leveringsplattformer tar vi ikke prosent av restaurantens inntekter.' },
        { question: 'Hvordan skiller dere dere fra leveringsapper?', answer: 'Direkte relasjon mellom restaurant og gjest, lavere kostnader og bedre marginer – uten bud.' },
      ],
      restaurantFAQs: [
        { question: 'Hvordan hjelper Dinery.ai min restaurant?', answer: 'Fyll stille perioder ved å nå gjester i nærheten, øk inntekter og reduser matsvinn – uten leveringskostnader.' },
        { question: 'Er det avgift for å bli med?', answer: 'Nei, registrering er gratis og uten provisjon.' },
        { question: 'Må jeg endre systemene mine?', answer: 'Nei. Du trenger bare internett og en ansatt som verifiserer innløsning.' },
        { question: 'Hvem bestemmer rabatter og tider?', answer: 'Du gjør. Full fleksibilitet i rabatt, tidsrom og vilkår.' },
      ],
    },

    SE: {
      title: 'Vanliga frågor',
      subtitle:
        'Hitta svar på vanliga frågor om Dinery.ai. Behöver du mer hjälp? Kontakta oss gärna.',
      tabs: { customers: 'Kunder', investors: 'Investerare', restaurants: 'Restauranger' },
      stillHaveQuestions: 'Har du fortfarande frågor?',
      cantFind: 'Hittar du inte det du söker? Vi hjälper gärna.',
      contactUs: 'Kontakta oss',
      customerFAQs: [
        { question: 'Vad är Dinery.ai?', answer: 'Dinery.ai är en smart plattform som hjälper dig hitta exklusiva erbjudanden hos lokala restauranger under lågtrafiktider. Bättre mat för mindre – utan leveransapp.' },
        { question: 'Hur fungerar det?', answer: 'Bläddra bland erbjudanden i närheten, välj något som passar och ät på plats eller hämta själv. Enkelt och prisvärt.' },
        { question: 'Hur mycket kan jag spara?', answer: 'Upp till 60% på utvalda måltider eller takeaway, beroende på restaurang och tid på dygnet.' },
        { question: 'Är Dinery.ai en leveranstjänst?', answer: 'Nej. Vi är ingen leveransapp. Du kopplas direkt till restaurangen – inga extra leveransavgifter.' },
        { question: 'Är det gratis att använda?', answer: 'Ja, Dinery.ai är helt gratis för kunder. Inga dolda avgifter.' },
        { question: 'Behöver jag skapa konto?', answer: 'För personliga erbjudanden och väntelista, ja. Kontot hjälper oss matcha dig med rätt erbjudanden.' },
        { question: 'Kan jag använda det för takeaway?', answer: 'Ja, många restauranger erbjuder takeaway via Dinery.ai.' },
        { question: 'Hur löser jag in ett erbjudande?', answer: 'Visa det digitala erbjudandet eller QR-koden i restaurangen vid besök eller upphämtning.' },
      ],
      investorFAQs: [
        { question: 'Vilket problem löser Dinery.ai?', answer: 'Vi utnyttjar outnyttjad kapacitet i restaurangbranschen genom att matcha utbud med lokal efterfrågan i realtid – utan leverans.' },
        { question: 'Vad är affärsmodellen?', answer: 'Freemium/SaaS med valbara premiumfunktioner och intäktsdelning för sponsrade erbjudanden.' },
        { question: 'Tar ni provision av restauranger?', answer: 'Nej. Till skillnad från leveransplattformar tar vi ingen procent av restaurangens intäkter.' },
        { question: 'Hur skiljer ni er från leveransappar?', answer: 'Direkt relation mellan restaurang och gäst, lägre kostnad och bättre marginaler – utan bud.' },
      ],
      restaurantFAQs: [
        { question: 'Hur hjälper Dinery.ai min restaurang?', answer: 'Fyll lugna perioder genom att nå gäster i närheten, öka intäkter och minska matsvinn – utan leveranskostnader.' },
        { question: 'Kostar det att gå med?', answer: 'Nej, registrering är gratis och utan provision.' },
        { question: 'Behöver jag nya system?', answer: 'Nej. Du behöver bara internet och personal som verifierar inlösen.' },
        { question: 'Vem bestämmer rabatter och tider?', answer: 'Du gör det. Full flexibilitet i rabatt, tidsfönster och villkor.' },
      ],
    },

    DE: {
      title: 'Häufig gestellte Fragen',
      subtitle:
        'Finden Sie Antworten auf häufige Fragen zu Dinery.ai. Wenn Sie weitere Hilfe benötigen, kontaktieren Sie uns gerne direkt.',
      tabs: { customers: 'Kunden', investors: 'Investoren', restaurants: 'Restaurants' },
      stillHaveQuestions: 'Noch Fragen?',
      cantFind: 'Nicht fündig geworden? Wir helfen gerne weiter.',
      contactUs: 'Kontakt',
      customerFAQs: [
        { question: 'Was ist Dinery.ai?', answer: 'Dinery.ai ist eine smarte Plattform, die exklusive Angebote lokaler Restaurants in Nebenzeiten sichtbar macht. Besser essen für weniger – ganz ohne Liefer-App.' },
        { question: 'Wie funktioniert das?', answer: 'Angebote in der Nähe durchstöbern, das Passende wählen und im Restaurant essen oder selbst abholen. Einfach und kostengünstig.' },
        { question: 'Wie viel kann ich sparen?', answer: 'Bis zu 60% auf ausgewählte Speisen oder Take-away – je nach Restaurant und Tageszeit.' },
        { question: 'Ist Dinery.ai ein Lieferdienst?', answer: 'Nein. Wir sind keine Liefer-App. Sie verbinden sich direkt mit dem Restaurant – ohne zusätzliche Liefergebühren.' },
        { question: 'Ist die Nutzung kostenlos?', answer: 'Ja, Dinery.ai ist für Kund:innen kostenlos. Keine versteckten Gebühren.' },
        { question: 'Brauche ich ein Konto?', answer: 'Für personalisierte Angebote und die Warteliste ja. So passen die Deals besser zu Ihnen.' },
        { question: 'Kann ich Take-away nutzen?', answer: 'Ja, viele Restaurants bieten Take-away-Angebote über Dinery.ai an.' },
        { question: 'Wie löse ich ein Angebot ein?', answer: 'Einfach das digitale Angebot oder den QR-Code beim Besuch bzw. Abholen vorzeigen.' },
      ],
      investorFAQs: [
        { question: 'Welches Problem löst Dinery.ai?', answer: 'Wir nutzen ungenutzte Kapazitäten der Gastronomie durch die Echtzeitvermittlung von Angebot und lokaler Nachfrage – ohne Lieferung.' },
        { question: 'Wie sieht das Geschäftsmodell aus?', answer: 'Freemium/SaaS mit optionalen Premium-Funktionen und Umsatzbeteiligung für promotete Angebote.' },
        { question: 'Nehmt ihr Provision von Restaurants?', answer: 'Nein. Im Gegensatz zu Lieferplattformen behalten Restaurants 100% ihrer Einnahmen.' },
        { question: 'Wodurch unterscheidet ihr euch von Liefer-Apps?', answer: 'Direkte Beziehung zwischen Restaurant und Gast, geringere Kosten, bessere Margen – ohne Kuriere.' },
      ],
      restaurantFAQs: [
        { question: 'Wie hilft Dinery.ai meinem Restaurant?', answer: 'Füllen Sie ruhige Zeiten, erreichen Sie Gäste in der Nähe, steigern Sie Umsatz und reduzieren Sie Verschwendung – ohne Lieferkosten.' },
        { question: 'Kostet die Teilnahme etwas?', answer: 'Nein, die Registrierung ist kostenlos und ohne Provisionen.' },
        { question: 'Brauche ich neue Systeme?', answer: 'Nein. Sie benötigen Internetzugang und Personal zur Code-Verifizierung.' },
        { question: 'Wer legt Rabatte und Zeiten fest?', answer: 'Sie. Volle Flexibilität bei Rabatt, Zeitfenster und Bedingungen.' },
      ],
    },
  };

  // Merge base + overrides for current language (arrays fall back to base)
  const lang = currentLanguage in overrides ? currentLanguage : 'US';
  const currentContent = {
    ...base,
    ...overrides[lang],
    tabs: { ...base.tabs, ...(overrides[lang]?.tabs || {}) },
    customerFAQs: overrides[lang]?.customerFAQs || base.customerFAQs,
    investorFAQs: overrides[lang]?.investorFAQs || base.investorFAQs,
    restaurantFAQs: overrides[lang]?.restaurantFAQs || base.restaurantFAQs,
  };

  const tabs = [
    { id: 'customers', label: currentContent.tabs.customers, data: currentContent.customerFAQs },
    { id: 'investors', label: currentContent.tabs.investors, data: currentContent.investorFAQs },
    { id: 'restaurants', label: currentContent.tabs.restaurants, data: currentContent.restaurantFAQs },
  ];

  const activeData = tabs.find((t) => t.id === activeTab)?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            {currentContent.title}
          </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setOpenItems({});
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-4">
          {activeData.map((faq, idx) => {
            const id = `${activeTab}-${idx}`;
            const open = !!openItems[id];
            return (
              <div key={id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleItem(id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-orange-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {open ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  )}
                </button>
                {open && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {currentContent.stillHaveQuestions}
            </h3>
            <p className="text-gray-600 mb-6">{currentContent.cantFind}</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              {currentContent.contactUs}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;