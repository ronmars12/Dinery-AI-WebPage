import React, { useState } from 'react';
import { useLanguage } from '../App';

const DineryCalculators = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const { currentLanguage } = useLanguage();
  
  // Customer Calculator State
  const [monthlyVisits, setMonthlyVisits] = useState('');
  const [avgBill, setAvgBill] = useState('');
  
  // Restaurant Calculator State
  const [avgSpendPerReservation, setAvgSpendPerReservation] = useState('');
  const [avgGuests, setAvgGuests] = useState('');
  const [weeklyReservations, setWeeklyReservations] = useState('');
  const [avgDiscount, setAvgDiscount] = useState('');

  // Translations
const translations = {
  US: {
    mainTitle: 'Calculate Your Savings & Revenue',
    mainSubtitle: 'See how much you can save as a customer or earn as a restaurant',
    customerTab: 'For Customers',
    restaurantTab: 'For Restaurants',
    // Customer Calculator
    customerTitle: 'Customer Yearly Savings Calculator',
    monthlyVisitsLabel: 'How many times do you eat out per month?',
    avgBillLabel: "What's your typical bill per visit?",
    currentSpendingLabel: 'Your current yearly spending',
    potentialSavingsTitle: 'Your Potential Yearly Savings with Dinery',
    savedPerYear: 'saved per year',
    disclaimer: '* Calculated using average restaurant discounts. Actual discounts vary by restaurant and offers.',
    // Restaurant Calculator
    restaurantTitle: 'Restaurant Incremental Revenue Calculator',
    restaurantSubtitle: 'Estimate the additional revenue Dinery.ai could bring from off-peak bookings.',
    avgSpendLabel: 'Average spend per Dinery reservation',
    avgSpendHelper: 'Total bill per reservation/order, incl. drinks',
    avgGuestsLabel: 'Average number of guests per reservation',
    avgGuestsHelper: 'Typical party size',
    weeklyReservationsLabel: 'Estimated Dinery reservations per week',
    weeklyReservationsHelper: 'Incremental bookings during off-peak hours',
    avgDiscountLabel: 'Average Dinery discount (%)',
    avgDiscountHelper: 'Typical discount you offer via Dinery.ai',
    projectedResultsTitle: 'Your Projected Results',
    avgRevenuePerReservation: 'Average revenue per reservation',
    weeklyGrossRevenue: 'Weekly gross revenue from Dinery',
    costOfDiscounts: 'Cost of discounts (per week)',
    netWeeklyRevenue: 'Net weekly incremental revenue',
    netAnnualRevenue: 'Net Annual Incremental Revenue',
    additionalRevenue: 'Additional revenue per year from off-peak bookings',
    note: 'Note:',
    noteText: 'This calculator estimates incremental revenue only. For best accuracy, use realistic off-peak reservation estimates and average spend figures.',
    currency: '£',
    placeholder1: 'e.g., 4',
    placeholder2: 'e.g., 50',
    placeholder3: 'e.g., 60',
    placeholder4: 'e.g., 2.5',
    placeholder5: 'e.g., 10',
    placeholder6: 'e.g., 25',
  },
  FI: {
    mainTitle: 'Laske säästösi ja tuottosi',
    mainSubtitle: 'Katso kuinka paljon voit säästää asiakkaana tai ansaita ravintolana',
    customerTab: 'Asiakkaille',
    restaurantTab: 'Ravintoloille',
    customerTitle: 'Asiakkaan vuotuinen säästölaskuri',
    monthlyVisitsLabel: 'Kuinka monta kertaa käyt ravintolassa kuukaudessa?',
    avgBillLabel: 'Mikä on tyypillinen laskusi per käynti?',
    currentSpendingLabel: 'Nykyinen vuosikulutuksesi',
    potentialSavingsTitle: 'Mahdolliset vuosisäästösi Dineryn kanssa',
    savedPerYear: 'säästetty vuodessa',
    disclaimer: '* Laskettu käyttäen keskimääräisiä ravintola-alennuksia. Todelliset alennukset vaihtelevat ravintolan ja tarjousten mukaan.',
    restaurantTitle: 'Ravintolan lisätuottolaskuri',
    restaurantSubtitle: 'Arvioi lisätulot, joita Dinery.ai voi tuoda hiljaisen ajan varauksista.',
    avgSpendLabel: 'Keskimääräinen kulutus per Dinery-varaus',
    avgSpendHelper: 'Kokonaislasku per varaus/tilaus, sis. juomat',
    avgGuestsLabel: 'Keskimääräinen vierasmäärä per varaus',
    avgGuestsHelper: 'Tyypillinen seurueen koko',
    weeklyReservationsLabel: 'Arvioidut Dinery-varaukset viikossa',
    weeklyReservationsHelper: 'Lisävaraukset hiljaisen ajan aikana',
    avgDiscountLabel: 'Keskimääräinen Dinery-alennus (%)',
    avgDiscountHelper: 'Tyypillinen alennus, jonka tarjoat Dinery.ai:n kautta',
    projectedResultsTitle: 'Ennustetut tuloksesi',
    avgRevenuePerReservation: 'Keskimääräinen tuotto per varaus',
    weeklyGrossRevenue: 'Viikkotuotto Dinerystä',
    costOfDiscounts: 'Alennusten kustannus (per viikko)',
    netWeeklyRevenue: 'Nettolisätuotto viikossa',
    netAnnualRevenue: 'Vuotuinen nettolisätuotto',
    additionalRevenue: 'Lisätuotto vuodessa hiljaisen ajan varauksista',
    note: 'Huomautus:',
    noteText: 'Tämä laskuri arvioi vain lisätuoton. Parhaan tarkkuuden saavuttamiseksi käytä realistisia hiljaisen ajan varausarvioita ja keskimääräisiä kulutustietoja.',
    currency: '€',
    placeholder1: 'esim. 4',
    placeholder2: 'esim. 50',
    placeholder3: 'esim. 60',
    placeholder4: 'esim. 2.5',
    placeholder5: 'esim. 10',
    placeholder6: 'esim. 25',
  },
  NO: {
    mainTitle: 'Beregn dine besparelser og inntekter',
    mainSubtitle: 'Se hvor mye du kan spare som kunde eller tjene som restaurant',
    customerTab: 'For kunder',
    restaurantTab: 'For restauranter',
    customerTitle: 'Kunde årlige besparelseskalkulator',
    monthlyVisitsLabel: 'Hvor mange ganger spiser du ute per måned?',
    avgBillLabel: 'Hva er din typiske regning per besøk?',
    currentSpendingLabel: 'Ditt nåværende årlige forbruk',
    potentialSavingsTitle: 'Dine potensielle årlige besparelser med Dinery',
    savedPerYear: 'spart per år',
    disclaimer: '* Beregnet ved hjelp av gjennomsnittlige restaurantrabatter. Faktiske rabatter varierer etter restaurant og tilbud.',
    restaurantTitle: 'Restaurant inkrementell inntektskalkulator',
    restaurantSubtitle: 'Estimer tilleggsinntekter Dinery.ai kan bringe fra reservasjoner utenfor rushtid.',
    avgSpendLabel: 'Gjennomsnittlig forbruk per Dinery-reservasjon',
    avgSpendHelper: 'Total regning per reservasjon/bestilling, inkl. drikke',
    avgGuestsLabel: 'Gjennomsnittlig antall gjester per reservasjon',
    avgGuestsHelper: 'Typisk partistørrelse',
    weeklyReservationsLabel: 'Estimerte Dinery-reservasjoner per uke',
    weeklyReservationsHelper: 'Tilleggsbestillinger i lavtrafikk-timer',
    avgDiscountLabel: 'Gjennomsnittlig Dinery-rabatt (%)',
    avgDiscountHelper: 'Typisk rabatt du tilbyr via Dinery.ai',
    projectedResultsTitle: 'Dine anslåtte resultater',
    avgRevenuePerReservation: 'Gjennomsnittlig inntekt per reservasjon',
    weeklyGrossRevenue: 'Ukentlig bruttoinntekt fra Dinery',
    costOfDiscounts: 'Kostnad for rabatter (per uke)',
    netWeeklyRevenue: 'Netto ukentlig tilleggsinntekt',
    netAnnualRevenue: 'Netto årlig tilleggsinntekt',
    additionalRevenue: 'Tilleggsinntekt per år fra reservasjoner utenfor rushtid',
    note: 'Merk:',
    noteText: 'Denne kalkulatoren estimerer kun tilleggsinntekt. For best nøyaktighet, bruk realistiske estimater for reservasjoner utenfor rushtid og gjennomsnittlige forbrukstall.',
    currency: 'kr',
    placeholder1: 'f.eks. 4',
    placeholder2: 'f.eks. 500',
    placeholder3: 'f.eks. 600',
    placeholder4: 'f.eks. 2.5',
    placeholder5: 'f.eks. 10',
    placeholder6: 'f.eks. 25',
  },
  SE: {
    mainTitle: 'Beräkna dina besparingar och intäkter',
    mainSubtitle: 'Se hur mycket du kan spara som kund eller tjäna som restaurang',
    customerTab: 'För kunder',
    restaurantTab: 'För restauranger',
    customerTitle: 'Kund årlig besparingskalkylator',
    monthlyVisitsLabel: 'Hur många gånger äter du ute per månad?',
    avgBillLabel: 'Vad är din typiska nota per besök?',
    currentSpendingLabel: 'Din nuvarande årliga konsumtion',
    potentialSavingsTitle: 'Dina potentiella årliga besparingar med Dinery',
    savedPerYear: 'sparat per år',
    disclaimer: '* Beräknat med genomsnittliga restaurangrabatter. Faktiska rabatter varierar efter restaurang och erbjudanden.',
    restaurantTitle: 'Restaurant inkrementell intäktskalkylator',
    restaurantSubtitle: 'Uppskatta ytterligare intäkter Dinery.ai kan ge från lågtrafikbokningar.',
    avgSpendLabel: 'Genomsnittlig konsumtion per Dinery-bokning',
    avgSpendHelper: 'Total nota per bokning/beställning, inkl. dryck',
    avgGuestsLabel: 'Genomsnittligt antal gäster per bokning',
    avgGuestsHelper: 'Typisk gruppstorlek',
    weeklyReservationsLabel: 'Uppskattade Dinery-bokningar per vecka',
    weeklyReservationsHelper: 'Ytterligare bokningar under lågtrafik-timmar',
    avgDiscountLabel: 'Genomsnittlig Dinery-rabatt (%)',
    avgDiscountHelper: 'Typisk rabatt du erbjuder via Dinery.ai',
    projectedResultsTitle: 'Dina beräknade resultat',
    avgRevenuePerReservation: 'Genomsnittlig intäkt per bokning',
    weeklyGrossRevenue: 'Veckovis bruttointäkt från Dinery',
    costOfDiscounts: 'Kostnad för rabatter (per vecka)',
    netWeeklyRevenue: 'Netto veckovis tilläggintäkt',
    netAnnualRevenue: 'Netto årlig tilläggintäkt',
    additionalRevenue: 'Tilläggintäkt per år från lågtrafikbokningar',
    note: 'Obs:',
    noteText: 'Denna kalkylator uppskattar endast tilläggintäkt. För bästa noggrannhet, använd realistiska uppskattningar för lågtrafikbokningar och genomsnittliga konsumtionssiffror.',
    currency: 'kr',
    placeholder1: 't.ex. 4',
    placeholder2: 't.ex. 500',
    placeholder3: 't.ex. 600',
    placeholder4: 't.ex. 2.5',
    placeholder5: 't.ex. 10',
    placeholder6: 't.ex. 25',
  },
  DE: {
    mainTitle: 'Berechnen Sie Ihre Ersparnisse und Einnahmen',
    mainSubtitle: 'Sehen Sie, wie viel Sie als Kunde sparen oder als Restaurant verdienen können',
    customerTab: 'Für Kunden',
    restaurantTab: 'Für Restaurants',
    customerTitle: 'Kunden jährlicher Sparkalkulator',
    monthlyVisitsLabel: 'Wie oft essen Sie pro Monat auswärts?',
    avgBillLabel: 'Was ist Ihre typische Rechnung pro Besuch?',
    currentSpendingLabel: 'Ihre aktuellen jährlichen Ausgaben',
    potentialSavingsTitle: 'Ihre potenziellen jährlichen Ersparnisse mit Dinery',
    savedPerYear: 'gespart pro Jahr',
    disclaimer: '* Berechnet mit durchschnittlichen Restaurant-Rabatten. Tatsächliche Rabatte variieren je nach Restaurant und Angeboten.',
    restaurantTitle: 'Restaurant inkrementeller Umsatzkalkulator',
    restaurantSubtitle: 'Schätzen Sie zusätzliche Einnahmen, die Dinery.ai durch Reservierungen außerhalb der Stoßzeiten bringen kann.',
    avgSpendLabel: 'Durchschnittliche Ausgaben pro Dinery-Reservierung',
    avgSpendHelper: 'Gesamtrechnung pro Reservierung/Bestellung, inkl. Getränke',
    avgGuestsLabel: 'Durchschnittliche Anzahl von Gästen pro Reservierung',
    avgGuestsHelper: 'Typische Gruppengröße',
    weeklyReservationsLabel: 'Geschätzte Dinery-Reservierungen pro Woche',
    weeklyReservationsHelper: 'Zusätzliche Buchungen außerhalb der Stoßzeiten',
    avgDiscountLabel: 'Durchschnittlicher Dinery-Rabatt (%)',
    avgDiscountHelper: 'Typischer Rabatt, den Sie über Dinery.ai anbieten',
    projectedResultsTitle: 'Ihre prognostizierten Ergebnisse',
    avgRevenuePerReservation: 'Durchschnittliche Einnahmen pro Reservierung',
    weeklyGrossRevenue: 'Wöchentliche Bruttoeinnahmen von Dinery',
    costOfDiscounts: 'Kosten für Rabatte (pro Woche)',
    netWeeklyRevenue: 'Netto wöchentliche Zusatzeinnahmen',
    netAnnualRevenue: 'Netto jährliche Zusatzeinnahmen',
    additionalRevenue: 'Zusätzliche Einnahmen pro Jahr durch Reservierungen außerhalb der Stoßzeiten',
    note: 'Hinweis:',
    noteText: 'Dieser Kalkulator schätzt nur zusätzliche Einnahmen. Für beste Genauigkeit verwenden Sie realistische Schätzungen für Reservierungen außerhalb der Stoßzeiten und durchschnittliche Ausgaben.',
    currency: '€',
    placeholder1: 'z.B. 4',
    placeholder2: 'z.B. 50',
    placeholder3: 'z.B. 60',
    placeholder4: 'z.B. 2.5',
    placeholder5: 'z.B. 10',
    placeholder6: 'z.B. 25',
  },
};

    const t = translations[currentLanguage] || translations.US;

  // Customer Calculator Logic
  const yearlySpend = monthlyVisits && avgBill ? monthlyVisits * avgBill * 12 : 0;
  const customerSavings = {
    bronze: yearlySpend * 0.25,
    silver: yearlySpend * 0.30,
    gold: yearlySpend * 0.35
  };

  // Restaurant Calculator Logic
  const avgRevenuePerReservation = avgSpendPerReservation && avgGuests 
    ? Number(avgSpendPerReservation) * Number(avgGuests) 
    : 0;
  const weeklyGrossRevenue = weeklyReservations && avgSpendPerReservation && avgGuests
    ? Number(weeklyReservations) * Number(avgSpendPerReservation) * Number(avgGuests)
    : 0;
  const costOfDiscounts = weeklyGrossRevenue && avgDiscount
    ? weeklyGrossRevenue * (Number(avgDiscount) / 100)
    : 0;
  const netWeeklyRevenue = weeklyGrossRevenue - costOfDiscounts;
  const netAnnualRevenue = netWeeklyRevenue * 52;

  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return `${t.currency}0`;
    return `${t.currency}${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Icon Components
  const Calculator = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="16" y1="14" x2="16" y2="18"/>
      <line x1="8" y1="14" x2="8" y2="18"/>
      <line x1="12" y1="14" x2="12" y2="18"/>
      <line x1="8" y1="10" x2="8" y2="10"/>
      <line x1="12" y1="10" x2="12" y2="10"/>
      <line x1="16" y1="10" x2="16" y2="10"/>
    </svg>
  );

  const TrendingUp = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  );

  const Users = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const Utensils = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
      <path d="M7 2v20"/>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t.mainTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {t.mainSubtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-orange-300 bg-orange-50 p-1">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'customer'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users />
                {t.customerTab}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'restaurant'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Utensils />
                {t.restaurantTab}
              </div>
            </button>
          </div>
        </div>

        {/* Customer Calculator */}
        {activeTab === 'customer' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <Calculator />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {t.customerTitle}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.monthlyVisitsLabel}
                </label>
                <input
                  type="number"
                  value={monthlyVisits}
                  onChange={(e) => setMonthlyVisits(e.target.value)}
                  placeholder={t.placeholder1}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all text-lg"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.avgBillLabel} ({t.currency})
                </label>
                <input
                  type="number"
                  value={avgBill}
                  onChange={(e) => setAvgBill(e.target.value)}
                  placeholder={t.placeholder2}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all text-lg"
                  min="0"
                />
              </div>
            </div>

            {yearlySpend > 0 && (
              <>
                <div className="bg-orange-50 rounded-xl p-5 mb-6 border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">{t.currentSpendingLabel}</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(yearlySpend)}
                  </p>
                </div>

                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  {t.potentialSavingsTitle}
                </h4>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border-2 border-amber-300">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-base font-bold text-amber-900">Bronze</h5>
                      <span className="bg-amber-200 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                        25% OFF
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-amber-900 mb-1">
                      {formatCurrency(customerSavings.bronze)}
                    </p>
                    <p className="text-xs text-amber-700">{t.savedPerYear}</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5 border-2 border-gray-300 md:transform md:scale-105 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-base font-bold text-gray-900">Silver</h5>
                      <span className="bg-gray-300 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
                        30% OFF
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {formatCurrency(customerSavings.silver)}
                    </p>
                    <p className="text-xs text-gray-700">{t.savedPerYear}</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-300">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-base font-bold text-yellow-900">Gold</h5>
                      <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                        35% OFF
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-yellow-900 mb-1">
                      {formatCurrency(customerSavings.gold)}
                    </p>
                    <p className="text-xs text-yellow-700">{t.savedPerYear}</p>
                  </div>
                </div>
              </>
            )}

            <p className="text-xs text-gray-500 mt-5 text-center">
              {t.disclaimer}
            </p>
          </div>
        )}

        {/* Restaurant Calculator */}
        {activeTab === 'restaurant' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <TrendingUp />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {t.restaurantTitle}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              {t.restaurantSubtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.avgSpendLabel} ({t.currency})
                </label>
                <input
                  type="number"
                  value={avgSpendPerReservation}
                  onChange={(e) => setAvgSpendPerReservation(e.target.value)}
                  placeholder={t.placeholder3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all text-lg"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">{t.avgSpendHelper}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.avgGuestsLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={avgGuests}
                  onChange={(e) => setAvgGuests(e.target.value)}
                  placeholder={t.placeholder4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all text-lg"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">{t.avgGuestsHelper}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.weeklyReservationsLabel}
                </label>
                <input
                  type="number"
                  value={weeklyReservations}
                  onChange={(e) => setWeeklyReservations(e.target.value)}
                  placeholder={t.placeholder5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all text-lg"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">{t.weeklyReservationsHelper}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.avgDiscountLabel}
                </label>
                <input
                  type="number"
                  value={avgDiscount}
                  onChange={(e) => setAvgDiscount(e.target.value)}
                  placeholder={t.placeholder6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all text-lg"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-500 mt-1">{t.avgDiscountHelper}</p>
              </div>
            </div>

            {avgSpendPerReservation && avgGuests && weeklyReservations && avgDiscount && (
              <>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-5">{t.projectedResultsTitle}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">{t.avgRevenuePerReservation}</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(avgRevenuePerReservation)}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">{t.weeklyGrossRevenue}</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(weeklyGrossRevenue)}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">{t.costOfDiscounts}</p>
                      <p className="text-xl font-bold text-red-600">-{formatCurrency(costOfDiscounts)}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1">{t.netWeeklyRevenue}</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(netWeeklyRevenue)}</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-lg p-5 border-4 border-orange-400 shadow-lg">
                    <p className="text-xs text-gray-600 mb-1">{t.netAnnualRevenue}</p>
                    <p className="text-3xl font-bold text-orange-600">{formatCurrency(netAnnualRevenue)}</p>
                    <p className="text-xs text-gray-500 mt-2">{t.additionalRevenue}</p>
                  </div>
                </div>

                <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>{t.note}</strong> {t.noteText}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DineryCalculators;
