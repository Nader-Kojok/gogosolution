import { FaPlane, FaCar, FaClock, FaUserTie } from "react-icons/fa";

const services = [
  {
    icon: FaPlane,
    title: "Transfert Aéroport",
    description: "Service de transport confortable entre l'aéroport et votre destination. À partir de 25.000 FCFA sur Dakar, 30.000 FCFA hors Dakar",
  },
  {
    icon: FaCar,
    title: "Location avec Chauffeur",
    description: "Chauffeur professionnel à votre disposition. Berline à partir de 25.000 FCFA, SUV à partir de 35.000 FCFA sur Dakar",
  },
  {
    icon: FaClock,
    title: "Service 24/7",
    description: "Disponible jour et nuit, 7 jours sur 7 pour tous vos besoins de transport. Chauffeurs qualifiés disponibles",
  },
  {
    icon: FaUserTie,
    title: "Service Business",
    description: "Transport professionnel pour vos rendez-vous d'affaires. Véhicules de luxe et chauffeurs expérimentés",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Nos Services
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Des solutions de transport adaptées à tous vos besoins, avec des tarifs transparents et des chauffeurs qualifiés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 