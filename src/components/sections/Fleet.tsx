import Image from "next/image";

const vehicles = [
  {
    name: "Berline Premium",
    description: "Confort et élégance à partir de 25.000 FCFA sur Dakar",
    image: "/Berline.jpeg",
    features: ["Prix transparent", "Climatisation", "Sièges confortables", "Chauffeur qualifié"]
  },
  {
    name: "SUV Premium",
    description: "Espace et confort à partir de 35.000 FCFA sur Dakar",
    image: "/SUV.jpeg",
    features: ["Tarifs abordables", "Climatisation", "Grand confort", "Chauffeur qualifié"]
  },
  {
    name: "4x4 Tout-terrain",
    description: "Pour vos déplacements en tout terrain, prix à négocier",
    image: "/4x4.webp",
    features: ["Tout-terrain", "Grand confort", "Chauffeur qualifié", "Prix sur mesure"]
  },
  {
    name: "Bus de transport",
    description: "Transport de groupe confortable, prix à négocier",
    image: "/bus.jpg",
    features: ["Grande capacité", "Climatisation", "Chauffeur qualifié", "Prix sur mesure"]
  }
];

const Fleet = () => {
  return (
    <section id="fleet" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Notre Flotte Pour Tous
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de véhicules pour tous vos besoins de transport, avec des chauffeurs qualifiés disponibles 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {vehicle.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;