'use client';

import Button from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
const products = [
  {
    title: "GPS Tracker",
    description: "Suivez votre véhicule en temps réel avec notre système GPS de pointe",
    icon: "📍",
    features: ["Suivi en temps réel", "Historique des trajets", "Alertes de sécurité", "Application mobile"]
  },
  {
    title: "Système d'Alarme",
    description: "Protection avancée pour votre véhicule avec notre système d'alarme dernier cri",
    icon: "🔔",
    features: ["Détection de choc", "Capteurs de mouvement", "Télécommande", "Sirène puissante"]
  },
  {
    title: "Caméra de Recul",
    description: "Manœuvrez en toute sécurité avec notre caméra de recul haute définition",
    icon: "📹",
    features: ["Vision nocturne", "Grand angle", "Guide de stationnement", "Écran tactile"]
  }
];

export default function Products() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "221775334359"; // +221 77 533 43 59
    const message = "Bonjour, je suis intéressé par vos produits d&apos;équipement automobile.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Équipements & Accessoires
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme d&apos;équipements et d&apos;accessoires pour améliorer votre expérience de conduite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Demander un devis sur WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}