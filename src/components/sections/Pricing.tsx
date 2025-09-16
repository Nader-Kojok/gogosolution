'use client';

import { FaCar, FaMapMarkerAlt, FaHandshake } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

const pricingData = [
  {
    type: "Berline",
    icon: FaCar,
    prices: [
      {
        location: "À Dakar",
        price: "25 000 FCFA",
        icon: MdLocationCity,
        description: "Service dans la région de Dakar"
      },
      {
        location: "Hors de Dakar",
        price: "30 000 FCFA",
        icon: FaMapMarkerAlt,
        description: "Service en dehors de Dakar"
      }
    ]
  },
  {
    type: "SUV",
    icon: FaCar,
    prices: [
      {
        location: "À Dakar",
        price: "35 000 FCFA",
        icon: MdLocationCity,
        description: "Service dans la région de Dakar"
      },
      {
        location: "Hors de Dakar",
        price: "À négocier",
        icon: FaHandshake,
        description: "Tarif sur devis selon la destination"
      }
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Nos Tarifs
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez nos tarifs transparents pour nos services de transport avec chauffeur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingData.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <vehicle.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-center">{vehicle.type}</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {vehicle.prices.map((priceInfo, priceIndex) => (
                    <div
                      key={priceIndex}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <priceInfo.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{priceInfo.location}</h4>
                          <p className="text-sm text-gray-600">{priceInfo.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {priceInfo.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-blue-900 mb-2">Informations importantes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Tarifs valables pour un trajet simple</li>
              <li>• Chauffeur professionnel inclus</li>
              <li>• Véhicules climatisés et entretenus</li>
              <li>• Réservation recommandée à l&apos;avance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}