import { useState, useEffect } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  needsDriver: string;
  location: string;
  serviceType: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  passengers: string;
  name: string;
  phone: string;
  vehicleId: string;
  duration: string;
  flightNumber: string;
  hasLuggage: string;
  specialNeeds: string;
  specialNeedsDetails: string;
  [key: string]: string; // Index signature pour permettre l'accès dynamique
}

interface Question {
  title: string;
  description: string;
  options?: Array<{ value: string; label: string; icon: string }>;
  type?: "datetime" | "locations" | "passengers" | "vehicles" | "personal";
}

interface Questions {
  [key: number]: Question;
}

const vehicles = [
  {
    id: "berline",
    name: "Berline Premium",
    description: "Confort et élégance pour vos déplacements",
    image: "https://images.unsplash.com/photo-1549925862-990ac5b34e35?auto=format&fit=crop&q=80",
    features: ["Climatisation", "Sièges confortables", "Eau offerte", "Chauffeur qualifié"],
    prices: {
      "airport-pickup": 30000,
      "airport-dropoff": 30000,
      "hourly": 25000,
      "daily": 125000
    },
    category: "berline"
  },
  {
    id: "suv",
    name: "SUV Premium",
    description: "Espace et confort pour vos déplacements",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80",
    features: ["Climatisation", "Grand confort", "Eau offerte", "Chauffeur qualifié"],
    prices: {
      "airport-pickup": 40000,
      "airport-dropoff": 40000,
      "hourly": 35000,
      "daily": 175000
    },
    category: "suv"
  },
  {
    id: "4x4",
    name: "4x4 Tout-terrain",
    description: "Pour vos déplacements en tout terrain",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
    features: ["Tout-terrain", "Grand confort", "Eau offerte", "Chauffeur qualifié"],
    prices: {
      "airport-pickup": 0, // Prix à négocier
      "airport-dropoff": 0, // Prix à négocier
      "hourly": 0, // Prix à négocier
      "daily": 0 // Prix à négocier
    },
    category: "4x4"
  },
  {
    id: "bus",
    name: "Bus de transport",
    description: "Transport de groupe confortable",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80",
    features: ["Grande capacité", "Climatisation", "Eau offerte", "Chauffeur qualifié"],
    prices: {
      "airport-pickup": 0, // Prix à négocier
      "airport-dropoff": 0, // Prix à négocier
      "hourly": 0, // Prix à négocier
      "daily": 0 // Prix à négocier
    },
    category: "bus"
  }
];

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState("");
  const [formData, setFormData] = useState<FormData>({
    needsDriver: "",
    location: "",
    serviceType: "",
    date: "",
    time: "",
    pickup: "",
    dropoff: "",
    passengers: "1",
    name: "",
    phone: "",
    vehicleId: "",
    duration: "1",
    flightNumber: "",
    hasLuggage: "",
    specialNeeds: "",
    specialNeedsDetails: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isOutsideDakar, setIsOutsideDakar] = useState(false);

  const getActiveSteps = (): number[] => {
    const activeSteps: number[] = [];

    // Always include initial steps
    activeSteps.push(1); // Avez-vous besoin d'un chauffeur ?
    activeSteps.push(2); // Où souhaitez-vous vous rendre ?
    activeSteps.push(3); // Quel type de service recherchez-vous ?

    activeSteps.push(4); // Quand souhaitez-vous voyager ? (Date/Heure)

    // Step 5 (locations) is conditional
    if (formData.serviceType === "airport" || formData.serviceType === "city") {
      activeSteps.push(5); // D'où partez-vous et où allez-vous ?
    }

    // Always include final steps
    activeSteps.push(6); // Combien de passagers serez-vous ?
    activeSteps.push(7); // Avez-vous des bagages ?
    activeSteps.push(8); // Avez-vous des besoins particuliers ?
    activeSteps.push(9); // Choisissez votre véhicule
    activeSteps.push(10); // Vos informations personnelles

    return activeSteps;
  };

  // Questions pour chaque étape
  const questions: Questions = {
    1: {
      title: "Avez-vous besoin d'un chauffeur ?",
      description: "Nous pouvons vous proposer un chauffeur professionnel ou vous laisser conduire le véhicule.",
      options: [
        { value: "yes", label: "Oui, je veux un chauffeur", icon: "👨‍✈️" },
        { value: "no", label: "Non, je conduirai moi-même", icon: "🚗" }
      ]
    },
    2: {
      title: "Où souhaitez-vous vous rendre ?",
      description: "Cela nous aidera à vous proposer le véhicule le plus adapté.",
      options: [
        { value: "dakar", label: "Dans Dakar", icon: "🏙️" },
        { value: "outside", label: "Hors de Dakar", icon: "🌴" }
      ]
    },
    3: {
      title: "Quel type de service recherchez-vous ?",
      description: "Choisissez le service qui correspond le mieux à vos besoins.",
      options: [
        { value: "airport", label: "Transfert Aéroport", icon: "✈️" },
        { value: "city", label: "Transport en ville", icon: "🏛️" },
        { value: "hourly", label: "Location à l'heure", icon: "⏰" },
        { value: "daily", label: "Location à la journée", icon: "📅" }
      ]
    },
    4: {
      title: "Quand souhaitez-vous voyager ?",
      description: "Sélectionnez la date et l'heure de votre trajet.",
      type: "datetime"
    },
    5: {
      title: "D'où partez-vous et où allez-vous ?",
      description: "Indiquez vos points de départ et d'arrivée.",
      type: "locations"
    },
    6: {
      title: "Combien de passagers serez-vous ?",
      description: "Cela nous permettra de vous proposer le véhicule adapté.",
      type: "passengers"
    },
    7: {
      title: "Avez-vous des bagages ?",
      description: "Cela nous aidera à choisir un véhicule avec suffisamment d'espace.",
      options: [
        { value: "yes", label: "Oui, j'ai des bagages", icon: "🧳" },
        { value: "no", label: "Non, pas de bagages", icon: "🎒" }
      ]
    },
    8: {
      title: "Avez-vous des besoins particuliers ?",
      description: "Par exemple : chaise bébé, accessibilité PMR, etc.",
      options: [
        { value: "yes", label: "Oui, j'ai des besoins particuliers", icon: "♿" },
        { value: "no", label: "Non, pas de besoins particuliers", icon: "✅" }
      ]
    },
    9: {
      title: "Choisissez votre véhicule",
      description: "Nous avons sélectionné les véhicules les plus adaptés à vos besoins.",
      type: "vehicles"
    },
    10: {
      title: "Vos informations personnelles",
      description: "Nous en avons besoin pour finaliser votre réservation.",
      type: "personal"
    }
  };

  // Fonction pour afficher les options de réponse
  const renderOptions = (options: Array<{ value: string; label: string; icon: string }> | undefined) => {
    if (!options) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionSelect(option.value)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 ${
              formData[getCurrentField()] === option.value
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className="text-left font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    );
  };

  // Fonction pour obtenir le champ actuel en fonction de l'étape
  const getCurrentField = (): keyof FormData => {
    const fieldMap: Record<number, keyof FormData> = {
      1: "needsDriver",
      2: "location",
      3: "serviceType",
      7: "hasLuggage",
      8: "specialNeeds"
    };
    return fieldMap[step] || "needsDriver";
  };

  // Fonction pour gérer la sélection d'une option
  const handleOptionSelect = (value: string) => {
    const field = getCurrentField();
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur pour le champ actuel immédiatement après la sélection
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    
    // Logique spécifique pour certaines étapes
    if (step === 2) {
      setIsOutsideDakar(value === "outside");
    }
    
    // Passer à l'étape suivante après un court délai pour permettre la mise à jour de l'état
    setTimeout(() => {
      handleNext();
    }, 0);
  };

  // Fonction pour valider l'étape actuelle
  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const currentField = getCurrentField();

    if (currentField && !formData[currentField]) {
      newErrors[currentField] = "Veuillez faire un choix";
    }

    // Validations spécifiques selon l'étape
    switch (step) {
      case 4: // Date et heure
        if (!formData.date) newErrors.date = "Veuillez sélectionner une date";
        if (!formData.time) newErrors.time = "Veuillez sélectionner une heure";
        break;
      case 5: // Lieux
        if (formData.serviceType === "airport" || formData.serviceType === "city") {
          if (!formData.pickup) newErrors.pickup = "Veuillez indiquer le lieu de départ";
          if (!formData.dropoff) newErrors.dropoff = "Veuillez indiquer la destination";
        } else {
          delete newErrors.pickup;
          delete newErrors.dropoff;
        }
        break;
      case 6: // Passagers
        if (!formData.passengers || parseInt(formData.passengers) < 1) {
          newErrors.passengers = "Veuillez indiquer le nombre de passagers";
        }
        break;
      case 9: // Véhicule
        if (!formData.vehicleId) newErrors.vehicleId = "Veuillez sélectionner un véhicule";
        break;
      case 10: // Informations personnelles
        if (!formData.name) newErrors.name = "Veuillez indiquer votre nom";
        if (!formData.phone) {
          newErrors.phone = "Veuillez indiquer votre numéro de téléphone";
        } else if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone)) {
          newErrors.phone = "Veuillez indiquer un numéro de téléphone valide";
        }
        if (!paymentMethod) newErrors.paymentMethod = "Veuillez sélectionner un moyen de paiement";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      const activeSteps = getActiveSteps();
      const currentIndex = activeSteps.indexOf(step);

      if (currentIndex < activeSteps.length - 1) {
        setStep(activeSteps[currentIndex + 1]);
      }
    }
  };

  const handleBack = () => {
    const activeSteps = getActiveSteps();
    const currentIndex = activeSteps.indexOf(step);
    if (currentIndex > 0) {
      setStep(activeSteps[currentIndex - 1]);
    } else {
      // Optionally close modal or do nothing if on first step
    }
  };

  // Fonction pour calculer le prix
  const calculatePrice = (vehicleId: string = formData.vehicleId) => {
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    if (!selectedVehicle) return 0;

    // Si c'est un 4x4 ou un bus, le prix est à négocier
    if (selectedVehicle.category === "4x4" || selectedVehicle.category === "bus") {
      return 0;
    }

    let basePrice = selectedVehicle.prices[formData.serviceType as keyof typeof selectedVehicle.prices] || 0;

    // Ajustements selon les besoins
    if (formData.needsDriver === "yes") {
      basePrice += 5000; // Frais de chauffeur
    }

    if (formData.hasLuggage === "yes") {
      basePrice += 2000; // Frais de bagages
    }

    if (formData.specialNeeds === "yes") {
      basePrice += 3000; // Frais de besoins particuliers
    }

    // Ajustement pour la durée
    if (formData.serviceType === "hourly") {
      basePrice = basePrice * parseInt(formData.duration);
    } else if (formData.serviceType === "daily") {
      basePrice = basePrice * parseInt(formData.duration);
    }

    return basePrice;
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Effacer l'erreur pour le champ actuel si une valeur est saisie
    setErrors(prev => {
      const newErrors = { ...prev };
      if (value) {
        delete newErrors[name];
      }
      return newErrors;
    });

    // Mise à jour de isOutsideDakar en fonction de la localisation
    if (name === "location") {
      setIsOutsideDakar(value === "outside");
    }

    // Validation du nombre de passagers
    if (name === "passengers") {
      const numPassengers = parseInt(value);
      if (numPassengers > 20) {
        setErrors(prev => ({ ...prev, passengers: "Maximum 20 passagers autorisés" }));
      } else {
        setErrors(prev => ({ ...prev, passengers: "" }));
      }
    }

    // Réinitialiser le véhicule sélectionné si le type de service change
    if (name === "serviceType") {
      setFormData(prev => ({ ...prev, vehicleId: "" }));
      // Clear location fields if service type changes to hourly or daily
      if (value === "hourly" || value === "daily") {
        setFormData(prev => ({ ...prev, pickup: "", dropoff: "" }));
      }
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Fonction pour sélectionner un véhicule
  const handleVehicleSelect = (vehicleId: string) => {
    setFormData(prev => ({ ...prev, vehicleId }));
    
    // Vérifier le nombre de passagers avec le nouveau véhicule
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    if (selectedVehicle) {
      const maxPassengers = selectedVehicle.category === "bus" ? 20 :
                          selectedVehicle.category === "4x4" ? 7 :
                          selectedVehicle.category === "suv" ? 6 : 4;
      
      if (parseInt(formData.passengers) > maxPassengers) {
        setErrors(prev => ({
          ...prev,
          passengers: `Ce véhicule ne peut accueillir que ${maxPassengers} passagers maximum`
        }));
      } else {
        setErrors(prev => ({ ...prev, passengers: "" }));
      }
    }

    // Effacer l'erreur de sélection de véhicule
    if (errors.vehicleId) {
      setErrors(prev => ({ ...prev, vehicleId: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random reservation number
    const newReservationNumber = `RES-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setReservationNumber(newReservationNumber);
    
    // Simulate API call
    try {
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      // You can use the reservation number in your success message or API response
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrors({ submit: 'Une erreur est survenue lors de la réservation.' });
    }
  };

  const handleClose = () => {
    onClose();
    // Réinitialiser l'état après la fermeture
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setFormData({
        needsDriver: "",
        location: "",
        serviceType: "",
        date: "",
        time: "",
        pickup: "",
        dropoff: "",
        passengers: "1",
        name: "",
        phone: "",
        vehicleId: "",
        duration: "1",
        flightNumber: "",
        hasLuggage: "",
        specialNeeds: "",
        specialNeedsDetails: "",
      });
      setPaymentMethod("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold font-poppins">
                        {questions[step].title}
                      </h2>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Fermer"
                      >
                        <FaTimes className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6">
                      {questions[step].description}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((getActiveSteps().indexOf(step) + 1) / getActiveSteps().length) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Étape {getActiveSteps().indexOf(step) + 1} sur {getActiveSteps().length}
                    </p>
                  </div>

                  <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                    {questions[step].type === "datetime" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Heure
                          </label>
                          <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          />
                        </div>
                      </div>
                    ) : questions[step].type === "locations" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Lieu de départ
                          </label>
                          <input
                            type="text"
                            name="pickup"
                            value={formData.pickup}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                            placeholder="Ex: Dakar, Sénégal"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Destination
                          </label>
                          <input
                            type="text"
                            name="dropoff"
                            value={formData.dropoff}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                            placeholder="Ex: Dakar, Sénégal"
                          />
                        </div>
                      </div>
                    ) : questions[step].type === "passengers" ? (
                      <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                          Nombre de passagers
                        </label>
                        <input
                          type="number"
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleChange}
                          min="1"
                          max="20"
                          className="w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    ) : questions[step].type === "vehicles" ? (
                      <div className="grid grid-cols-1 gap-4">
                        {vehicles
                          .filter(vehicle => {
                            // Filtrer les véhicules selon les besoins
                            const maxPassengers = vehicle.category === "bus" ? 20 :
                                               vehicle.category === "4x4" ? 7 :
                                               vehicle.category === "suv" ? 6 : 4;
                            return parseInt(formData.passengers) <= maxPassengers;
                          })
                          .map((vehicle) => (
                            <div
                              key={vehicle.id}
                              className={`relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                formData.vehicleId === vehicle.id
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-200 hover:border-green-300"
                              }`}
                              onClick={() => handleVehicleSelect(vehicle.id)}
                            >
                              <div className="flex flex-col md:flex-row">
                                <div className="relative h-48 md:h-32 md:w-48">
                                  <Image
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-4 flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="text-lg font-semibold text-gray-900">
                                        {vehicle.name}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {vehicle.description}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      {vehicle.category === "4x4" || vehicle.category === "bus" ? (
                                        <p className="text-lg font-bold text-green-600">
                                          Prix à négocier
                                        </p>
                                      ) : (
                                        <>
                                          <p className="text-lg font-bold text-green-600">
                                            {calculatePrice(vehicle.id).toLocaleString()} FCFA
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {formData.serviceType === "hourly" ? "par heure" :
                                             formData.serviceType === "daily" ? "par jour" :
                                             isOutsideDakar ? "hors Dakar" : "sur Dakar"}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {vehicle.features.map((feature, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : questions[step].type === "personal" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Votre nom"
                          />
                          {errors.name && (
                            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                            placeholder="+221 XX XXX XX XX"
                          />
                          {errors.phone && (
                            <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-3">
                            Moyen de paiement
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Wave", "Orange Money", "Moov Money", "Cash"].map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => {
                                  setPaymentMethod(method);
                                  setErrors(prev => {
                                    const newErrors = { ...prev };
                                    delete newErrors.paymentMethod;
                                    return newErrors;
                                  });
                                }}
                                className={`p-3 text-base border rounded-lg text-center transition-colors ${paymentMethod === method
                                    ? "border-green-500 bg-green-50 text-green-700"
                                    : errors.paymentMethod ? "border-red-500" : "border-gray-300 hover:border-green-500"
                                }`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                          {errors.paymentMethod && (
                            <p className="mt-2 text-sm text-red-500">{errors.paymentMethod}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      renderOptions(questions[step].options)
                    )}

                    <div className="flex gap-4 mt-8 pt-4 border-t border-gray-200">
                      {step > 1 && (
                        <Button
                          type="button"
                          onClick={handleBack}
                          variant="secondary"
                          fullWidth
                          className="py-3 text-base"
                        >
                          Retour
                        </Button>
                      )}
                      {true && (
                        <Button
                          type={getActiveSteps()[getActiveSteps().length - 1] === step ? "submit" : "button"}
                          onClick={getActiveSteps()[getActiveSteps().length - 1] === step ? undefined : handleNext}
                          variant="primary"
                          fullWidth
                          className="py-3 text-base"
                        >
                          {getActiveSteps()[getActiveSteps().length - 1] === step ? "Confirmer la réservation" : "Suivant"}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-8"
                  >
                    <FaCheckCircle className="w-20 h-20 text-green-500" />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                  >
                    Demande envoyée !
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg text-gray-600 mb-8"
                  >
                    Votre demande a été envoyée. Nous vous contacterons dans les plus brefs délais pour confirmer votre réservation.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-base text-gray-500 mb-10"
                  >
                    <p>Numéro de réservation: {reservationNumber}</p>
                    <p className="mt-2">Conservez ce numéro pour toute référence future.</p>
                  </motion.div>
                  <Button
                    onClick={handleClose}
                    variant="primary"
                    className="px-8 py-3"
                  >
                    Fermer
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal; 