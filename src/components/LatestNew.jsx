import React, { useState } from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useLanguage } from '../App';
import dineryLogo from '../assets/dinery-logo.png';

const LatestNews = () => {
  const { currentLanguage } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const content = {
    US: {
      title: 'Latest News',
      subtitle: "Stay up to date with the latest developments, insights, and stories from Dinery.ai. Discover how we're revolutionizing the dining experience for restaurants and customers alike.",
      backToNews: 'Back to News',
      readMore: 'Read More',
      articles: [
        {
          id: 1,
          title: "Why the Next Big Food Tech Win Won't Be About Delivery",
          excerpt: "The past decade saw an explosion of delivery startups — with promises of convenience, efficiency, and innovation. But the shine is fading...",
          content: `
            <h2>The Delivery Problem</h2>
            <p>The past decade saw an explosion of delivery startups — with promises of convenience, efficiency, and innovation. Companies like Uber Eats, DoorDash, and Deliveroo became household names, reshaping how people think about dining. But the shine is fading.</p>
            
            <p>Restaurants are now waking up to a hard truth: <strong>delivery platforms take too much</strong>. Commissions can range from 15% to 30% per order — eating into already thin margins. For many small and mid-sized restaurants, these fees mean the difference between profit and loss.</p>
            
            <p>Meanwhile, customers are growing tired of inflated prices, hidden fees, and meals that arrive cold or late. The convenience that once seemed revolutionary now feels like a compromise.</p>
            
            <h2>A New Approach: Value Over Logistics</h2>
            <p>Enter <strong>Dinery.ai</strong> — a platform built not around logistics, but around <strong>value</strong>.</p>
            
            <p>Instead of competing on delivery speed or network size, Dinery.ai focuses on helping restaurants fill empty tables and connect directly with customers. The platform uses intelligent pricing strategies to offer exclusive deals during off-peak hours, turning slow Monday evenings into profit opportunities.</p>
            
            <h2>Why This Matters</h2>
            <p>The next big win in food tech won't be about who can deliver fastest. It will be about who can create the most value for both restaurants and diners.</p>
            
            <ul>
              <li><strong>For restaurants:</strong> Better margins, direct customer relationships, and tools to optimize revenue throughout the week</li>
              <li><strong>For diners:</strong> Real savings, support for local businesses, and better dining experiences</li>
              <li><strong>For communities:</strong> Stronger local economies and thriving neighborhood restaurants</li>
            </ul>
            
            <p>Delivery isn't going away — but it's no longer the only game in town. Smart dining platforms like Dinery.ai are proving that the future of food tech is about creating sustainable value, not just moving food from A to B.</p>
            
            <p>The revolution isn't in the logistics. It's in the economics.</p>
          `,
          date: "December 15, 2024",
          author: "Dinery.ai Team"
        },
        {
          id: 2,
          title: "How Smarter Dining Can Help Save Local Restaurants",
          excerpt: "The restaurant industry is facing a quiet crisis. While global delivery apps rake in billions, thousands of small eateries are struggling...",
          content: `
            <h2>The Quiet Crisis</h2>
            <p>The restaurant industry is facing a quiet crisis. While global delivery apps rake in billions, thousands of small eateries are struggling to survive. Rising costs, unpredictable customer flow, and razor-thin margins have created a perfect storm.</p>
            
            <p>The pandemic accelerated changes that were already underway: more customers ordering online, higher expectations for convenience, and increased competition from chains and delivery-only concepts. For independent restaurants, the pressure has never been greater.</p>
            
            <h2>The Real Challenge: Empty Tables</h2>
            <p>Ask any restaurant owner about their biggest challenge, and you'll hear the same story: <strong>inconsistent customer traffic</strong>.</p>
            
            <p>Weekends are packed. But Monday through Thursday? It's a struggle to break even. Staff still need to be paid, lights still need to be on, and ingredients still need to be fresh — whether there are 10 customers or 50.</p>
            
            <p>This is where traditional marketing falls short. Social media posts and email campaigns can help, but they're not designed to solve the real problem: getting customers through the door on slow days.</p>
            
            <h2>Enter Smart Dining Technology</h2>
            <p><strong>Dinery.ai</strong> connects local diners directly with restaurants, offering exclusive dine-in and takeaway deals that are intelligently timed to fill empty tables.</p>
            
            <p>The platform works by:</p>
            <ul>
              <li><strong>Dynamic pricing:</strong> Restaurants can offer limited-time deals during off-peak hours to attract customers</li>
              <li><strong>Direct connections:</strong> No middleman taking 30% — restaurants keep more of their revenue</li>
              <li><strong>Real-time notifications:</strong> Customers discover great deals at nearby restaurants exactly when they're available</li>
              <li><strong>Community building:</strong> Local diners support local businesses, strengthening neighborhood economies</li>
            </ul>
            
            <h2>A Win-Win Model</h2>
            <p>What makes this approach powerful is that everyone wins:</p>
            
            <p><strong>Restaurants</strong> fill tables that would otherwise be empty, turning potential losses into profit while building customer loyalty.</p>
            
            <p><strong>Diners</strong> get access to exclusive deals at quality local restaurants, saving money while supporting their community.</p>
            
            <p><strong>Communities</strong> benefit from thriving local businesses that provide jobs, character, and gathering spaces.</p>
            
            <h2>The Future Is Local</h2>
            <p>The solution to the restaurant crisis isn't more delivery apps or venture capital. It's smarter technology that creates value for everyone involved.</p>
            
            <p>By helping restaurants optimize their revenue and connecting them directly with customers, platforms like Dinery.ai are proving that the future of dining is both high-tech and deeply local.</p>
            
            <p>The restaurants that survive and thrive won't be the ones with the most delivery partnerships — they'll be the ones that build strong relationships with their communities and use technology to work smarter, not harder.</p>
          `,
          date: "December 10, 2024",
          author: "Dinery.ai Team"
        }
      ]
    },
    FI: {
      title: 'Uusimmat uutiset',
      subtitle: 'Pysy ajan tasalla Dinery.ai:n uusimmista kehityksistä, oivalluksista ja tarinoista.',
      backToNews: 'Takaisin uutisiin',
      readMore: 'Lue lisää',
      articles: [
        {
          id: 1,
          title: "Miksi seuraava suuri ruokateknologia-menestys ei ole kuljetuksista",
          excerpt: "Viime vuosikymmen näki kuljetusalan startupien räjähdyksen. Mutta kiilto on hiipumassa...",
          content: `<p>Viime vuosikymmen näki kuljetusalan startup-yritysten räjähdyksen...</p>`,
          date: "15. joulukuuta 2024",
          author: "Dinery.ai tiimi"
        },
        {
          id: 2,
          title: "Kuinka älykkäämpi ruokailu voi pelastaa paikalliset ravintolat",
          excerpt: "Ravintola-ala kohtaa hiljaisen kriisin. Monet pienet ravintolat kamppailevat selviytyäkseen...",
          content: `<p>Ravintola-ala kohtaa hiljaisen kriisin...</p>`,
          date: "10. joulukuuta 2024",
          author: "Dinery.ai tiimi"
        }
      ]
    },
    NO: {
      title: 'Siste nytt',
      subtitle: 'Hold deg oppdatert med de siste nyhetene og historiene fra Dinery.ai.',
      backToNews: 'Tilbake til nyheter',
      readMore: 'Les mer',
      articles: [
        {
          id: 1,
          title: "Hvorfor neste store foodtech-suksess ikke handler om levering",
          excerpt: "Det siste tiåret eksploderte leveringstjenester, men nå mister de glansen...",
          content: `<p>Leveringstjenester har dominert, men høye gebyrer presser restauranter...</p>`,
          date: "15. desember 2024",
          author: "Dinery.ai-teamet"
        },
        {
          id: 2,
          title: "Hvordan smartere matopplevelser kan redde lokale restauranter",
          excerpt: "Mange små restauranter sliter mens leveringsappene tjener milliarder...",
          content: `<p>Lokale restauranter er samfunnets sjel. Dinery.ai hjelper dem å nå gjester direkte...</p>`,
          date: "10. desember 2024",
          author: "Dinery.ai-teamet"
        }
      ]
    },
    SE: {
      title: 'Senaste nytt',
      subtitle: 'Håll dig uppdaterad med de senaste nyheterna från Dinery.ai.',
      backToNews: 'Tillbaka till nyheter',
      readMore: 'Läs mer',
      articles: [
        {
          id: 1,
          title: "Varför nästa stora foodtech-framgång inte handlar om leverans",
          excerpt: "Leveransappar har dominerat, men problemen växer...",
          content: `<p>Leverans har sina gränser. Dinery.ai fokuserar istället på värde...</p>`,
          date: "15 december 2024",
          author: "Dinery.ai-teamet"
        },
        {
          id: 2,
          title: "Hur smartare matupplevelser kan rädda lokala restauranger",
          excerpt: "Många små restauranger kämpar medan apparna tjänar stort...",
          content: `<p>Lokala restauranger är viktiga för gemenskapen. Dinery.ai hjälper dem fylla borden...</p>`,
          date: "10 december 2024",
          author: "Dinery.ai-teamet"
        }
      ]
    },
    DE: {
      title: 'Neueste Nachrichten',
      subtitle: 'Bleiben Sie auf dem Laufenden mit den neuesten Entwicklungen von Dinery.ai.',
      backToNews: 'Zurück zu den Nachrichten',
      readMore: 'Weiterlesen',
      articles: [
        {
          id: 1,
          title: "Warum der nächste große Foodtech-Erfolg nicht Lieferung sein wird",
          excerpt: "Lieferdienste wachsen, doch die Probleme häufen sich...",
          content: `<p>Hohe Provisionen belasten Restaurants. Dinery.ai setzt auf direkte Gästeverbindungen...</p>`,
          date: "15. Dezember 2024",
          author: "Dinery.ai-Team"
        },
        {
          id: 2,
          title: "Wie smarteres Essen lokale Restaurants retten kann",
          excerpt: "Viele kleine Restaurants kämpfen ums Überleben, während Apps Milliarden verdienen...",
          content: `<p>Dinery.ai gibt Restaurants Werkzeuge, um effizienter zu arbeiten und Gäste anzusprechen...</p>`,
          date: "10. Dezember 2024",
          author: "Dinery.ai-Team"
        }
      ]
    }
  };

  const currentContent = content[currentLanguage] || content.US;
  const articles = currentContent.articles;

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setSelectedArticle(null)} 
              className="flex items-center text-orange-500 hover:text-orange-600 mb-8 text-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {currentContent.backToNews}
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-15"></div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-block px-4 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold mb-4">
            News & Updates
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>
      </section>

      {/* Compact News Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-5"></div>
                  <img 
                    src={dineryLogo} 
                    alt="Dinery.ai Logo" 
                    className="w-24 h-24 object-contain relative z-10" 
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">{article.date}</div>
                    <button 
                      onClick={() => setSelectedArticle(article.id)} 
                      className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
                    >
                      {currentContent.readMore} →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestNews;