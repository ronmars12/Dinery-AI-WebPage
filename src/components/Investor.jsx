import React, { useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguage } from '../App';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

// Firebase configuration - add your config here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Investor = () => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    investmentLevel: 'Exploring',
    focusArea: 'SaaS',
    message: '',
    dataConsent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // reCAPTCHA state and ref
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dataConsent) {
      alert('Please fill in all required fields and accept the data consent.');
      return;
    }
    
    // Require CAPTCHA completion if site key is set
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      alert('Please complete the CAPTCHA before submitting.');
      return;
    }
    
    setSubmitting(true);
    setSubmitError('');
    
    try {
      console.log('🚀 Starting email sending process...');
      console.log('📧 Form submission details:', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        investmentLevel: formData.investmentLevel,
        language: currentLanguage
      });

      // Get admin emails from AdminEmail collection
      console.log('📋 Fetching admin emails from AdminEmail collection...');
      const adminEmailQuery = await getDocs(collection(db, 'AdminEmail'));
      
      console.log('📄 Raw AdminEmail documents:', adminEmailQuery.docs.length);
      
      // Debug: Log each document
      adminEmailQuery.docs.forEach((doc, index) => {
        console.log(`📝 AdminEmail doc ${index}:`, doc.data());
      });
      
      const adminEmails = adminEmailQuery.docs.map(doc => {
        const data = doc.data();
        // Try different possible field names
        return data.Email || data.email || data.EmailAddress || data.emailAddress;
      }).filter(email => email); // Remove any undefined/null values
      
      console.log('👥 Processed admin emails:', adminEmails);
      
      if (adminEmails.length === 0) {
        console.warn('⚠️ No admin emails found! Using fallback...');
        // You can add fallback emails here for testing
        // adminEmails.push('your-test-email@example.com');
        throw new Error('No admin emails found in AdminEmail collection. Please add documents with Email field.');
      }

      const emailData = {
        to: adminEmails, // Array of email strings
        // Use extension-configured FROM; just set replyTo to the submitter
        replyTo: `${formData.firstName} ${formData.lastName} <${formData.email}>`,
        message: {
          subject: `New Investor Inquiry from ${formData.firstName} ${formData.lastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ea580c;">New Investor Inquiry - Dinery.ai</h2>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f2937;">Contact Information</h3>
                <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
                <p><strong>Phone:</strong> ${formData.phoneNumber || 'Not provided'}</p>
                <p><strong>Company/Background:</strong> ${formData.company || 'Not provided'}</p>
              </div>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f2937;">Investment Details</h3>
                <p><strong>Investment Level:</strong> ${formData.investmentLevel}</p>
                <p><strong>Focus Area:</strong> ${formData.focusArea}</p>
              </div>
              
              ${formData.message ? `
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1f2937;">Message</h3>
                  <p style="white-space: pre-wrap;">${formData.message}</p>
                </div>
              ` : ''}
              
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  This inquiry was submitted on ${new Date().toLocaleString()} via the Dinery.ai investor portal.
                </p>
                <p style="color: #ea580c; font-weight: bold; margin: 10px 0 0 0;">
                  Reply to: ${formData.email}
                </p>
              </div>
            </div>
          `,
          text: `New Investor Inquiry - Dinery.ai

Contact Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneNumber || 'Not provided'}
Company/Background: ${formData.company || 'Not provided'}

Investment Details:
Investment Level: ${formData.investmentLevel}
Focus Area: ${formData.focusArea}

${formData.message ? `Message:\n${formData.message}\n` : ''}
This inquiry was submitted on ${new Date().toLocaleString()} via the Dinery.ai investor portal.

Reply to: ${formData.email}`
        }
      };

      console.log('📝 Final email data structure:', {
        from: emailData.from,
        to: emailData.to,
        messageSubject: emailData.message.subject,
        hasHtml: !!emailData.message.html,
        hasText: !!emailData.message.text,
        emailDataKeys: Object.keys(emailData)
      });

      // Save to 'mail' collection - this will trigger the email extension
      console.log('💾 Saving email document to Firestore mail collection...');
      const docRef = await addDoc(collection(db, 'mail'), emailData);
      await addDoc(collection(db, 'investorInquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        language: currentLanguage,
        adminRecipients: adminEmails,
      });
      
      console.log('✅ EMAIL DOCUMENT CREATED SUCCESSFULLY!');
      console.log('📄 Document ID:', docRef.id);
      console.log('📬 Email should be sent to:', adminEmails.join(', '));
      console.log('🔄 Firebase extension should now process this document');
      console.log('');
      console.log('🔍 NEXT STEPS TO DEBUG:');
      console.log('1. Check Firebase Console → Firestore → mail collection for the new document');
      console.log('2. Check Firebase Console → Functions → Logs for extension execution');
      console.log('3. Check your email spam folder');
      console.log('4. Verify SMTP configuration in extension settings');
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          company: '',
          investmentLevel: 'Exploring',
          focusArea: 'SaaS',
          message: '',
          dataConsent: false
        });
        setCaptchaToken("");
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }, 3000);
      
    } catch (error) {
      console.error('❌ EMAIL SENDING FAILED!');
      console.error('🚨 Error details:', error);
      console.error('📊 Error breakdown:', {
        errorMessage: error.message,
        errorCode: error.code,
        timestamp: new Date().toISOString(),
        formData: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email
        }
      });
      
      if (error.message.includes('AdminEmail')) {
        console.error('🔍 AdminEmail collection issue - check if collection exists and has Email fields');
      } else if (error.message.includes('permission')) {
        console.error('🔒 Permission denied - check Firestore security rules');
      } else if (error.message.includes('network')) {
        console.error('🌐 Network error - check internet connection');
      }
      
      setSubmitError('There was an error submitting the form. Please try again.');
      
      // Show error for 5 seconds
      setTimeout(() => {
        setSubmitError('');
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  // Content translations (same as before)
  const content = {
    US: {
      investmentOpportunity: 'Investment Opportunity',
      requestMoreInfo: 'Request more info',
      heroDescription: 'Dinery.ai isn\'t just another foodtech startup – it\'s a movement built around fairness, efficiency, and local impact. We\'re addressing a real need in the restaurant industry: how to balance capacity, reduce delivery costs, and empower both restaurants and consumers. With our lean, AI-driven model, we offer a scalable solution with strong margins and viral growth potential. Investors who join early get access to a rapidly expanding customer base and the chance to support a platform that creates real-world economic value. Request a meeting and discover more.',
      forInvestors: 'For investors',
      fiveReasons: 'Five compelling reasons to invest in Dinery.ai',
      investmentBenefits: [
        {
          number: "1",
          title: "Addressing a global pain point in dining",
          description: "Dinery.ai solves real inefficiencies in the restaurant industry by connecting supply and demand during off-peak hours – a scalable model with international potential."
        },
        {
          number: "2",
          title: "Massive and growing market",
          description: "The global restaurant and food tech market exceeds $3 trillion, with increasing demand for smarter, local-first alternatives to delivery giants."
        },
        {
          number: "3",
          title: "Lean, data-driven business model",
          description: "The platform is built with low fixed costs, strong automation potential, and AI-driven targeting that optimizes both customer engagement and restaurant profitability."
        },
        {
          number: "4",
          title: "Social and economic impact",
          description: "Dinery.ai empowers local businesses, reduces dependence on multinational platforms, and redirects value directly to communities – an ESG-aligned opportunity."
        },
        {
          number: "5",
          title: "Early-mover advantage with viral potential",
          description: "Investors can join at a pre-seed stage before launch, gaining early exposure to a brand with high virality potential and clear network effects."
        }
      ],
      getInTouch: 'Get in Touch',
      getInTouchDescription: 'Ready to learn more? Fill out the form below and we\'ll be in touch.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      companyBackground: 'Company / Background',
      investmentLevel: 'Investment Interest Level',
      focusArea: 'Preferred Focus Area',
      message: 'Message',
      messagePlaceholder: 'Tell us more about your investment interests and how we can help...',
      dataConsent: 'I accept that my data is stored for early access and updates.',
      notRobot: 'I\'m not a robot',
      sendMessage: 'Send Message',
      successMessage: 'Successfully Submitted!',
      investmentLevels: [
        'Exploring',
        'Angel Investor',
        'Seed Stage',
        'Series A+',
        'Strategic Investor'
      ],
      focusAreas: [
        'SaaS',
        'FoodTech',
        'Consumer Tech',
        'Enterprise',
        'FinTech',
        'HealthTech',
        'Other'
      ]
    },
    FI: {
      investmentOpportunity: 'Sijoitusmahdollisuus',
      requestMoreInfo: 'Pyydä lisätietoja',
      heroDescription: 'Dinery.ai ei ole vain yksi ruokateknologia-startup lisää – se on liike, joka rakentuu oikeudenmukaisuuden, tehokkuuden ja paikallisen vaikutuksen ympärille. Käsittelemme todellista tarvetta ravintola-alalla: kuinka tasapainottaa kapasiteetti, vähentää toimituskustannuksia ja voimaannuttaa sekä ravintoloita että kuluttajia. Kevyellä, tekoälyvetoisella malliamme tarjoamme skaalautuvan ratkaisun vahvoilla marginaaleilla ja viraali kasvupotentiaalilla. Varhaiset sijoittajat saavat pääsyn nopeasti laajenevaan asiakaskuntaan ja mahdollisuuden tukea alustaa, joka luo todellista taloudellista arvoa. Pyydä tapaaminen ja tutustu tarkemmin.',
      forInvestors: 'Sijoittajille',
      fiveReasons: 'Viisi vakuuttavaa syytä sijoittaa Dinery.ai:hin',
      investmentBenefits: [
        {
          number: "1",
          title: "Globaalin kipupisteen ratkaiseminen ruokailussa",
          description: "Dinery.ai ratkaisee todellisia tehottomuuksia ravintola-alalla yhdistämällä kysyntä ja tarjonta hiljaisten tuntien aikana – skaalautuva malli kansainvälisellä potentiaalilla."
        },
        {
          number: "2",
          title: "Massiivinen ja kasvava markkina",
          description: "Globaalit ravintola- ja ruokateknologiamarkkinat ylittävät 3 biljoonaa dollaria, kasvavalla kysynnällä älykkäimmille, paikallisuutta suosiville vaihtoehdoille toimitusjättiläisille."
        },
        {
          number: "3",
          title: "Kevyt, datavetoinen liiketoimintamalli",
          description: "Alusta on rakennettu alhaisilla kiinteillä kustannuksilla, vahvalla automaatiopotentiaalilla ja tekoälyvetoisella kohdistamisella, joka optimoi sekä asiakkaiden sitoutumista että ravintoloiden kannattavuutta."
        },
        {
          number: "4",
          title: "Sosiaalinen ja taloudellinen vaikutus",
          description: "Dinery.ai voimaannuttaa paikallisia yrityksiä, vähentää riippuvuutta monikansallisista alustoista ja ohjaa arvoa suoraan yhteisöihin – ESG-yhteensopiva mahdollisuus."
        },
        {
          number: "5",
          title: "Ensiliikkujan etu viraalipotentiaalilla",
          description: "Sijoittajat voivat liittyä pre-seed vaiheessa ennen lanseerausta, saaden varhaisen altistuksen brändille, jolla on korkea viraaliuspotentiaali ja selkeät verkostovaikutukset."
        }
      ],
      getInTouch: 'Ota yhteyttä',
      getInTouchDescription: 'Valmis oppimaan lisää? Täytä alla oleva lomake ja otamme sinuun yhteyttä.',
      firstName: 'Etunimi',
      lastName: 'Sukunimi',
      email: 'Sähköposti',
      phoneNumber: 'Puhelinnumero',
      companyBackground: 'Yritys / Tausta',
      investmentLevel: 'Sijoituskiinnostuksen taso',
      focusArea: 'Ensisijainen painopistealue',
      message: 'Viesti',
      messagePlaceholder: 'Kerro meille lisää sijoituskiinnostuksestasi ja kuinka voimme auttaa...',
      dataConsent: 'Hyväksyn, että tietoni tallennetaan ennakkopääsyä ja päivityksiä varten.',
      notRobot: 'En ole robotti',
      sendMessage: 'Lähetä viesti',
      successMessage: 'Lähetetty onnistuneesti!',
      investmentLevels: [
        'Tutustumassa',
        'Enkelisijoittaja',
        'Siemenvaihe',
        'Sarja A+',
        'Strateginen sijoittaja'
      ],
      focusAreas: [
        'SaaS',
        'Ruokateknologia',
        'Kuluttajateknologia',
        'Yritysratkaisut',
        'Fintech',
        'Terveysteknologia',
        'Muu'
      ]
    },
    NO: {
      investmentOpportunity: 'Investeringsmulighet',
      requestMoreInfo: 'Be om mer info',
      heroDescription: 'Dinery.ai er ikke bare en annen foodtech startup – det er en bevegelse bygget rundt rettferdighet, effektivitet og lokal påvirkning. Vi adresserer et reelt behov i restaurantbransjen: hvordan balansere kapasitet, redusere leveringskostnader og styrke både restauranter og forbrukere. Med vår slanke, AI-drevne modell tilbyr vi en skalerbar løsning med sterke marginer og viralt vekstpotensial. Investorer som blir med tidlig får tilgang til en raskt voksende kundebase og muligheten til å støtte en plattform som skaper virkelig økonomisk verdi. Be om et møte og oppdag mer.',
      forInvestors: 'For investorer',
      fiveReasons: 'Fem overbevisende grunner til å investere i Dinery.ai',
      investmentBenefits: [
        {
          number: "1",
          title: "Adresserer et globalt smertepunkt innen spising",
          description: "Dinery.ai løser reelle ineffektiviteter i restaurantbransjen ved å koble tilbud og etterspørsel i lavtrafikktider – en skalerbar modell med internasjonalt potensial."
        },
        {
          number: "2",
          title: "Massivt og voksende marked",
          description: "Det globale restaurant- og matteknologimarkedet overstiger 3 billioner dollar, med økende etterspørsel etter smartere, lokal-første alternativer til leveringsgiganter."
        },
        {
          number: "3",
          title: "Slank, datadrevet forretningsmodell",
          description: "Plattformen er bygget med lave faste kostnader, sterkt automasjonspotensial og AI-drevet målretting som optimaliserer både kundeengasjement og restaurantlønnsomhet."
        },
        {
          number: "4",
          title: "Sosial og økonomisk påvirkning",
          description: "Dinery.ai styrker lokale bedrifter, reduserer avhengigheten av multinasjonale plattformer og omdirigerer verdi direkte til lokalsamfunn – en ESG-tilpasset mulighet."
        },
        {
          number: "5",
          title: "Tidlig-beveger fordel med viralt potensial",
          description: "Investorer kan bli med i pre-seed-fasen før lansering, og få tidlig eksponering til et merke med høyt viralitetspotensial og klare nettverkseffekter."
        }
      ],
      getInTouch: 'Kom i kontakt',
      getInTouchDescription: 'Klar til å lære mer? Fyll ut skjemaet nedenfor så tar vi kontakt.',
      firstName: 'Fornavn',
      lastName: 'Etternavn',
      email: 'E-post',
      phoneNumber: 'Telefonnummer',
      companyBackground: 'Selskap / Bakgrunn',
      investmentLevel: 'Investeringsinteressenivå',
      focusArea: 'Foretrukket fokusområde',
      message: 'Melding',
      messagePlaceholder: 'Fortell oss mer om dine investeringsinteresser og hvordan vi kan hjelpe...',
      dataConsent: 'Jeg aksepterer at mine data lagres for tidlig tilgang og oppdateringer.',
      notRobot: 'Jeg er ikke en robot',
      sendMessage: 'Send melding',
      successMessage: 'Sendt inn!',
      investmentLevels: [
        'Utforsker',
        'Engelinvestor',
        'Såkornfase',
        'Serie A+',
        'Strategisk investor'
      ],
      focusAreas: [
        'SaaS',
        'MatTeknologi',
        'ForbrukerTeknologi',
        'Bedrift',
        'FinTech',
        'HelseTeknologi',
        'Annet'
      ]
    },
    SE: {
      investmentOpportunity: 'Investeringsmöjlighet',
      requestMoreInfo: 'Begär mer info',
      heroDescription: 'Dinery.ai är inte bara en till foodtech startup – det är en rörelse byggd kring rättvisa, effektivitet och lokal påverkan. Vi adresserar ett verkligt behov inom restaurangbranschen: hur man balanserar kapacitet, minskar leveranskostnader och stärker både restauranger och konsumenter. Med vår smidiga, AI-drivna modell erbjuder vi en skalbar lösning med starka marginaler och viral tillväxtpotential. Investerare som ansluter sig tidigt får tillgång till en snabbt expanderande kundbas och chansen att stödja en plattform som skapar verkligt ekonomiskt värde. Begär ett möte och upptäck mer.',
      forInvestors: 'För investerare',
      fiveReasons: 'Fem övertygande skäl att investera i Dinery.ai',
      investmentBenefits: [
        {
          number: "1",
          title: "Adresserar en global smärtpunkt inom matupplevelser",
          description: "Dinery.ai löser verkliga ineffektiviteter inom restaurangbranschen genom att koppla utbud och efterfrågan under lågtrafiktimmar – en skalbar modell med internationell potential."
        },
        {
          number: "2",
          title: "Massiv och växande marknad",
          description: "Den globala restaurang- och matteknologimarknaden överstiger 3 biljoner dollar, med ökande efterfrågan på smartare, lokal-först alternativ till leveransjättar."
        },
        {
          number: "3",
          title: "Smidig, datadriven affärsmodell",
          description: "Plattformen är byggd med låga fasta kostnader, stark automationspotential och AI-driven målgruppsanpassning som optimerar både kundengagemang och restauranglönsamhet."
        },
        {
          number: "4",
          title: "Social och ekonomisk påverkan",
          description: "Dinery.ai stärker lokala företag, minskar beroendet av multinationella plattformar och omdirigerar värde direkte till gemenskaper – en ESG-anpassad möjlighet."
        },
        {
          number: "5",
          title: "Tidig-rörare fördel med viral potential",
          description: "Investerare kan ansluta sig i pre-seed-fasen före lansering, vilket ger tidig exponering mot ett varumärke med hög viralitetspotential och tydliga nätverkseffekter."
        }
      ],
      getInTouch: 'Kom i kontakt',
      getInTouchDescription: 'Redo att lära dig mer? Fyll i formuläret nedan så hör vi av oss.',
      firstName: 'Förnamn',
      lastName: 'Efternamn',
      email: 'E-post',
      phoneNumber: 'Telefonnummer',
      companyBackground: 'Företag / Bakgrund',
      investmentLevel: 'Investeringsintressenivå',
      focusArea: 'Föredraget fokusområde',
      message: 'Meddelande',
      messagePlaceholder: 'Berätta mer om dina investeringsintressen och hur vi kan hjälpa...',
      dataConsent: 'Jag accepterar att mina uppgifter lagras för tidig åtkomst och uppdateringar.',
      notRobot: 'Jag är inte en robot',
      sendMessage: 'Skicka meddelande',
      successMessage: 'Framgångsrikt skickat!',
      investmentLevels: [
        'Utforskar',
        'Ängelinvesterare',
        'Såddstadium',
        'Serie A+',
        'Strategisk investerare'
      ],
      focusAreas: [
        'SaaS',
        'MatTeknologi',
        'KonsumentTeknologi',
        'Företag',
        'FinTech',
        'HälsoTeknologi',
        'Övrigt'
      ]
    },
    DE: {
      investmentOpportunity: 'Investitionsmöglichkeit',
      requestMoreInfo: 'Weitere Informationen anfordern',
      heroDescription: 'Dinery.ai ist nicht nur ein weiteres Foodtech-Startup – es ist eine Bewegung, die auf Fairness, Effizienz und lokaler Wirkung basiert. Wir adressieren einen echten Bedarf in der Restaurantbranche: wie man Kapazitäten ausbalanciert, Lieferkosten reduziert und sowohl Restaurants als auch Verbraucher stärkt. Mit unserem schlanken, KI-gesteuerten Modell bieten wir eine skalierbare Lösung mit starken Margen und viralem Wachstumspotential. Investoren, die früh einsteigen, erhalten Zugang zu einer schnell wachsenden Kundenbasis und die Chance, eine Plattform zu unterstützen, die echten wirtschaftlichen Wert schafft. Fordern Sie ein Meeting an und entdecken Sie mehr.',
      forInvestors: 'Für Investoren',
      fiveReasons: 'Fünf überzeugende Gründe, in Dinery.ai zu investieren',
      investmentBenefits: [
        {
          number: "1",
          title: "Adressiert einen globalen Schmerzpunkt beim Essen",
          description: "Dinery.ai löst echte Ineffizienzen in der Restaurantbranche, indem es Angebot und Nachfrage während schwacher Zeiten verbindet – ein skalierbares Modell mit internationalem Potenzial."
        },
        {
          number: "2",
          title: "Massiver und wachsender Markt",
          description: "Der globale Restaurant- und Foodtech-Markt übersteigt 3 Billionen Dollar, mit steigender Nachfrage nach intelligenteren, lokal-first Alternativen zu Lieferriesen."
        },
        {
          number: "3",
          title: "Schlankes, datengetriebenes Geschäftsmodell",
          description: "Die Plattform ist mit niedrigen Fixkosten, starkem Automatisierungspotenzial und KI-gesteuerte Zielgruppenansprache aufgebaut, die sowohl Kundenengagement als auch Restaurantprofitabilität optimiert."
        },
        {
          number: "4",
          title: "Soziale und wirtschaftliche Auswirkungen",
          description: "Dinery.ai stärkt lokale Unternehmen, reduziert die Abhängigkeit von multinationalen Plattformen und leitet Wert direkt an Gemeinschaften weiter – eine ESG-konforme Gelegenheit."
        },
        {
          number: "5",
          title: "Frühe-Beweger-Vorteil mit viralem Potenzial",
          description: "Investoren können in der Pre-Seed-Phase vor dem Launch einsteigen und frühe Exposition gegenüber einer Marke mit hohem Viralitätspotenzial und klaren Netzwerkeffekten erhalten."
        }
      ],
      getInTouch: 'Kontakt aufnehmen',
      getInTouchDescription: 'Bereit, mehr zu erfahren? Füllen Sie das untenstehende Formular aus und wir melden uns bei Ihnen.',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phoneNumber: 'Telefonnummer',
      companyBackground: 'Unternehmen / Hintergrund',
      investmentLevel: 'Investitionsinteresse-Level',
      focusArea: 'Bevorzugter Fokusbereich',
      message: 'Nachricht',
      messagePlaceholder: 'Erzählen Sie uns mehr über Ihre Investitionsinteressen und wie wir helfen können...',
      dataConsent: 'Ich akzeptiere, dass meine Daten für frühen Zugang und Updates gespeichert werden.',
      notRobot: 'Ich bin kein Roboter',
      sendMessage: 'Nachricht senden',
      successMessage: 'Erfolgreich eingereicht!',
      investmentLevels: [
        'Erkundend',
        'Angel-Investor',
        'Seed-Phase',
        'Serie A+',
        'Strategischer Investor'
      ],
      focusAreas: [
        'SaaS',
        'FoodTech',
        'VerbraucherTech',
        'Unternehmen',
        'FinTech',
        'GesundheitsTech',
        'Sonstiges'
      ]
    }
  };

  const currentContent = content[currentLanguage] || content.US;

  // Get current language investment levels and focus areas
  const investmentLevels = currentContent.investmentLevels;
  const focusAreas = currentContent.focusAreas;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-8">
            <span className="text-orange-700 font-semibold text-sm">{currentContent.investmentOpportunity}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            {currentContent.requestMoreInfo}
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed text-justify max-w-4xl mx-auto">
            {currentContent.heroDescription}
          </p>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.forInvestors}
            </h2>
            <p className="text-lg text-gray-600">
              {currentContent.fiveReasons}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.investmentBenefits.map((benefit, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-200 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">{benefit.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentContent.getInTouch}
            </h2>
            <p className="text-lg text-gray-600">
              {currentContent.getInTouchDescription}
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl">
            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {currentContent.firstName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={currentContent.firstName}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {currentContent.lastName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={currentContent.lastName}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {currentContent.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={currentContent.email}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {currentContent.phoneNumber}
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder={currentContent.phoneNumber}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                  />
                </div>
              </div>

              {/* Company and Investment Level */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {currentContent.companyBackground}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={currentContent.companyBackground}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {currentContent.investmentLevel}
                  </label>
                  <select
                    name="investmentLevel"
                    value={formData.investmentLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                  >
                    {investmentLevels.map((level, index) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Focus Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {currentContent.focusArea}
                </label>
                <select
                  name="focusArea"
                  value={formData.focusArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                >
                  {focusAreas.map((area, index) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {currentContent.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={currentContent.messagePlaceholder}
                  rows="5"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical bg-white"
                ></textarea>
              </div>

              {/* Consent and reCAPTCHA */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="dataConsent"
                    checked={formData.dataConsent}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 mt-1"
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    {currentContent.dataConsent} <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Real reCAPTCHA */}
                {RECAPTCHA_SITE_KEY ? (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => setCaptchaToken(token || "")}
                      onExpired={() => setCaptchaToken("")}
                      onError={() => setCaptchaToken("")}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-amber-600 mb-4">
                      reCAPTCHA site key is not set. Add VITE_RECAPTCHA_SITE_KEY to your .env for bot protection.
                    </p>
                    {/* Fallback fake reCAPTCHA for development */}
                    <div className="inline-flex bg-white border border-gray-300 rounded-lg p-4 items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-orange-500" 
                        onChange={(e) => setCaptchaToken(e.target.checked ? "development-token" : "")}
                      />
                      <span className="text-sm text-gray-700">{currentContent.notRobot}</span>
                      <div className="text-xs text-gray-500 ml-4">reCAPTCHA</div>
                    </div>
                  </div>
                )}

                {RECAPTCHA_SITE_KEY && (
                  <p className="text-xs text-gray-500 text-center">
                    This form is protected by reCAPTCHA and the Google{" "}
                    <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || (RECAPTCHA_SITE_KEY && !captchaToken) || !formData.dataConsent}
                className={`w-full py-5 px-8 rounded-xl text-xl font-semibold transition-all duration-200 ${
                  isSubmitted 
                    ? 'bg-green-500 text-white' 
                    : submitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'
                }`}
                title={RECAPTCHA_SITE_KEY && !captchaToken ? "Please complete the CAPTCHA" : undefined}
              >
                {isSubmitted ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-6 h-6" />
                    <span>{currentContent.successMessage}</span>
                  </div>
                ) : submitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  currentContent.sendMessage
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investor;