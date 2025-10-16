'use client';

import { useState } from 'react';
import { FAQSchema } from '@/components/StructuredData';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
};

export const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Réservation",
    question: "Combien de temps à l'avance dois-je réserver mon transport ?",
    answer: "Nous recommandons de réserver au moins 24 à 48 heures à l'avance pour garantir la disponibilité. Pour les événements spéciaux ou les périodes de forte affluence, une réservation anticipée est conseillée. Cependant, nous acceptons également les demandes de dernière minute selon les disponibilités."
  },
  {
    id: 2,
    category: "Réservation",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons tous les principaux modes de paiement : espèces, cartes bancaires, virements bancaires et paiements mobiles (Orange Money, Wave). Les clients professionnels peuvent également bénéficier de factures avec paiement différé sur approbation préalable."
  },
  {
    id: 3,
    category: "Services",
    question: "Quels types d'événements couvrez-vous ?",
    answer: "Nous couvrons une large gamme d'événements : transferts aéroport, déplacements professionnels, mariages, événements spéciaux, tours touristiques et transport VIP. Notre flotte peut accueillir aussi bien des particuliers que des groupes."
  },
  {
    id: 4,
    category: "Services",
    question: "Proposez-vous des services de chauffeur sur plusieurs jours ?",
    answer: "Oui, nous proposons des services de chauffeur privé sur plusieurs jours pour des événements, des tours ou des voyages d'affaires. Des forfaits personnalisés peuvent être arrangés selon vos besoins spécifiques et votre emploi du temps."
  },
  {
    id: 5,
    category: "Services",
    question: "Êtes-vous disponibles 24h/24 et 7j/7 ?",
    answer: "Oui, GOGOSOLUTION est disponible 24 heures sur 24, 7 jours sur 7, y compris les jours fériés. Nous assurons vos déplacements à tout moment, de jour comme de nuit, pour répondre à tous vos besoins de transport."
  },
  {
    id: 6,
    category: "Tarifs",
    question: "Comment sont calculés vos tarifs ?",
    answer: "Nos tarifs sont calculés en fonction de la distance, du type de véhicule choisi et de la durée du service. Nous proposons des tarifs transparents sans frais cachés. Demandez un devis gratuit pour connaître le prix exact de votre trajet."
  },
  {
    id: 7,
    category: "Tarifs",
    question: "Proposez-vous des forfaits pour les entreprises ?",
    answer: "Oui, nous proposons des forfaits spéciaux pour les entreprises avec des tarifs préférentiels, facturation mensuelle et service prioritaire. Contactez-nous pour discuter d'un partenariat adapté à vos besoins professionnels."
  },
  {
    id: 8,
    category: "Politique",
    question: "Quelle est votre politique d'annulation ?",
    answer: "Les annulations effectuées 24 heures ou plus avant le service prévu sont entièrement remboursables. Les annulations dans les 24 heures peuvent être soumises à des frais d'annulation. Veuillez nous contacter pour plus de détails."
  },
  {
    id: 9,
    category: "Sécurité",
    question: "Vos véhicules sont-ils assurés et vos chauffeurs qualifiés ?",
    answer: "Absolument. Tous nos véhicules sont entièrement assurés et régulièrement entretenus. Nos chauffeurs sont professionnels, expérimentés, possèdent tous les permis requis et connaissent parfaitement Dakar et ses environs."
  },
  {
    id: 10,
    category: "Sécurité",
    question: "Puis-je suivre mon trajet en temps réel ?",
    answer: "Oui, nous offrons un service de suivi en temps réel pour votre tranquillité d'esprit. Vous pouvez suivre votre véhicule et partager votre trajet avec vos proches pour plus de sécurité."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(id);
    }
  };

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <FAQSchema faqs={faqData.map(item => ({ question: item.question, answer: item.answer }))} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Questions Fréquentes
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur nos services de transport VTC à Dakar
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
              
              <div className="space-y-4">
                {faqData
                  .filter(item => item.category === category)
                  .map(item => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleToggle(item.id)}
                        onKeyDown={(e) => handleKeyDown(e, item.id)}
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        aria-expanded={openItems.includes(item.id)}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openItems.includes(item.id) ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      
                      <div
                        id={`faq-answer-${item.id}`}
                        className={`transition-all duration-200 ${
                          openItems.includes(item.id)
                            ? 'max-h-48 opacity-100'
                            : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <p className="p-4 text-gray-600 border-t border-gray-200">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 