'use client';

import Image from "next/image";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80"
          alt="Voiture VTC professionnelle Mercedes"
          fill
          className="object-cover brightness-40"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
          Votre Chauffeur Privé Accessible à Dakar
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Service de chauffeur privé 24h/24 - Qualité professionnelle à prix accessible pour tous vos déplacements
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              // La logique d'ouverture de la modal sera gérée par le composant client wrapper
              document.dispatchEvent(new CustomEvent('openBookingModal'));
            }}
          >
            Réserver Maintenant
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Découvrir Nos Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 