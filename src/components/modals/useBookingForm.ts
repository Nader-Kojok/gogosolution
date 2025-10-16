import { useState } from 'react';
import { FormData, Vehicle } from './types';
import { vehicles } from './vehiclesData';
import { generateReceiptPDF, generateReservationNumber } from '../../utils/pdfGenerator';
import { sendWhatsAppBooking, sendEmailBooking } from '../../utils/bookingSubmission';

const initialFormData: FormData = {
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
  specialNeedsDetails: ""
};

export const useBookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isOutsideDakar, setIsOutsideDakar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState("");
  const [submissionMethod, setSubmissionMethod] = useState<string>("");



  const getCurrentField = (): keyof FormData => {
    const fieldMap: Record<number, keyof FormData> = {
      1: "serviceType",
      2: "location",
      3: "needsDriver",
      7: "hasLuggage",
      8: "specialNeeds",
      9: "vehicleId"
    };
    return fieldMap[step] || "serviceType";
  };

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
        if (formData.serviceType === "airport-pickup") {
          // Pour pickup aéroport : seulement la destination
          if (!formData.dropoff) newErrors.dropoff = "Veuillez indiquer la destination";
          delete newErrors.pickup; // Pas besoin du lieu de départ
        } else if (formData.serviceType === "airport-dropoff") {
          // Pour dropoff aéroport : seulement le lieu de départ
          if (!formData.pickup) newErrors.pickup = "Veuillez indiquer le lieu de départ";
          delete newErrors.dropoff; // Pas besoin de la destination
        } else if (formData.serviceType === "hourly" || formData.serviceType === "daily") {
          // Pour les locations : seulement l'adresse de prise en charge
          if (!formData.pickup) newErrors.pickup = "Veuillez indiquer l'adresse de prise en charge";
          delete newErrors.dropoff; // Pas besoin de la destination
        } else if (formData.serviceType === "city") {
          // Pour les courses rapides : départ ET destination
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

  const getActiveStepsWithData = (data: FormData = formData): number[] => {
    const activeSteps: number[] = [];

    // Étape 1: Type de service (toujours présente)
    activeSteps.push(1);
    
    // Étape 2: Localisation (seulement pour les locations)
    if (data.serviceType === "hourly" || data.serviceType === "daily") {
      activeSteps.push(2);
    }

    // Étape 3: Besoin de chauffeur (seulement pour les locations)
    if (data.serviceType === "hourly" || data.serviceType === "daily") {
      activeSteps.push(3);
    }

    // Étape 4: Date et heure (toujours présente)
    activeSteps.push(4);

    // Étape 5: Lieux de départ/arrivée (seulement pour les transports)
    if (data.serviceType === "airport-pickup" || data.serviceType === "airport-dropoff" || data.serviceType === "city") {
      activeSteps.push(5);
    }

    // Étapes finales (toujours présentes)
    activeSteps.push(6); // Combien de passagers serez-vous ?
    activeSteps.push(7); // Avez-vous des bagages ?
    activeSteps.push(8); // Avez-vous des besoins particuliers ?
    activeSteps.push(9); // Choisissez votre véhicule
    activeSteps.push(11); // Aperçu de la commande
    activeSteps.push(10); // Vos informations personnelles

    return activeSteps;
  };

  const handleNext = () => {
    if (validateStep()) {
      const activeSteps = getActiveStepsWithData();
      const currentIndex = activeSteps.indexOf(step);

      if (currentIndex < activeSteps.length - 1) {
        setStep(activeSteps[currentIndex + 1]);
      }
    }
  };

  const handleBack = () => {
    const activeSteps = getActiveStepsWithData();
    const currentIndex = activeSteps.indexOf(step);
    if (currentIndex > 0) {
      setStep(activeSteps[currentIndex - 1]);
    }
  };

  const handleOptionSelect = (value: string) => {
    const field = getCurrentField();
    
    // Mettre à jour les données du formulaire
    let updatedFormData = { ...formData, [field]: value };
    
    // Logique spécifique pour l'étape 1 (type de service)
    if (step === 1) {
      // Réinitialiser les champs qui ne sont plus pertinents
      if (value === "airport-pickup" || value === "airport-dropoff" || value === "city") {
        updatedFormData = { ...updatedFormData, location: "", needsDriver: "" };
      } else {
        updatedFormData = { ...updatedFormData, pickup: "", dropoff: "" };
      }
      setFormData(updatedFormData);
    }
    // Logique spécifique pour l'étape 2 (localisation)
    else if (step === 2) {
      setFormData(updatedFormData);
      setIsOutsideDakar(value === "outside");
    }
    // Pour toutes les autres étapes
    else {
      setFormData(updatedFormData);
    }
    
    // Effacer l'erreur pour le champ actuel immédiatement après la sélection
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    
    // Naviguer vers l'étape suivante en utilisant les données mises à jour
    setTimeout(() => {
      const activeSteps = getActiveStepsWithData(updatedFormData);
      const currentIndex = activeSteps.indexOf(step);
      
      if (currentIndex < activeSteps.length - 1) {
        setStep(activeSteps[currentIndex + 1]);
      }
    }, 0);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur pour ce champ
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const calculatePrice = (vehicle: Vehicle): number | string => {
    const serviceType = formData.serviceType;
    let basePrice = 0;
    
    // Vérifier que nous avons un serviceType valide
    if (!serviceType) {
      return "Prix à négocier";
    }
    
    // Calculer le prix de base
    if (vehicle.category === "berline" || vehicle.category === "suv") {
      const locationPrices = isOutsideDakar ? vehicle.prices.outside : vehicle.prices.dakar;
      
      if (locationPrices && typeof locationPrices === 'object') {
        // Vérifier chaque type de service possible
        if (serviceType === "airport-pickup" && locationPrices["airport-pickup"]) {
          basePrice = locationPrices["airport-pickup"];
        } else if (serviceType === "airport-dropoff" && locationPrices["airport-dropoff"]) {
          basePrice = locationPrices["airport-dropoff"];
        } else if (serviceType === "hourly" && locationPrices["hourly"]) {
          basePrice = locationPrices["hourly"];
        } else if (serviceType === "daily" && locationPrices["daily"]) {
          basePrice = locationPrices["daily"];
        }
        
        // Cas spécial pour SUV hors Dakar journalier
        if (basePrice === 0 && vehicle.category === "suv" && isOutsideDakar && serviceType === "daily") {
          return "Prix à négocier";
        }
      }
    } else {
      // Pour 4x4 et bus - tous les prix sont à négocier
      return "Prix à négocier";
    }
    
    if (basePrice === 0) {
      return "Prix à négocier";
    }
    
    // Appliquer la durée pour les services horaires et journaliers
    if (formData.serviceType === "hourly" || formData.serviceType === "daily") {
      const duration = parseInt(formData.duration) || 1;
      basePrice = basePrice * duration;
    }
    
    // Ajouter les frais supplémentaires
    let totalPrice = basePrice;
    
    // Frais de chauffeur (seulement pour les locations)
    if ((formData.serviceType === "hourly" || formData.serviceType === "daily") && formData.needsDriver === "yes") {
      totalPrice += 5000;
    }
    
    // Frais de bagages
    if (formData.hasLuggage === "yes") {
      totalPrice += 2000;
    }
    
    // Frais de besoins particuliers
    if (formData.specialNeeds === "yes") {
      totalPrice += 3000;
    }
    
    return totalPrice;
  };

  const handleSubmit = async (method: 'whatsapp' | 'email') => {
    if (validateStep()) {
      // Générer un numéro de réservation unique
      const reservationNum = generateReservationNumber();
      setReservationNumber(reservationNum);
      setSubmissionMethod(method);
      
      // Calculer le prix estimé
      const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
      const estimatedPrice = selectedVehicle ? calculatePrice(selectedVehicle) : 'Prix à négocier';
      
      const bookingData = {
        formData,
        reservationNumber: reservationNum,
        estimatedPrice,
        isOutsideDakar
      };
      
      // Générer et télécharger le PDF
      try {
        generateReceiptPDF(bookingData);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
      }
      
      // Envoyer via WhatsApp ou Email
      if (method === 'whatsapp') {
        sendWhatsAppBooking(bookingData);
        setIsSuccess(true);
      } else if (method === 'email') {
        const result = await sendEmailBooking(bookingData);
        if (result.success) {
          setIsSuccess(true);
        } else {
          alert(`Erreur lors de l'envoi de l'email: ${result.error}`);
        }
      }
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({});
    setPaymentMethod("");
    setIsOutsideDakar(false);
    setIsSuccess(false);
    setReservationNumber("");
    setSubmissionMethod("");
  };

  return {
    step,
    setStep,
    formData,
    setFormData,
    errors,
    setErrors,
    paymentMethod,
    setPaymentMethod,
    isOutsideDakar,
    setIsOutsideDakar,
    isSuccess,
    setIsSuccess,
    reservationNumber,
    setReservationNumber,
    submissionMethod,
    setSubmissionMethod,
    getActiveSteps: getActiveStepsWithData,
    getCurrentField,
    validateStep,
    handleNext,
    handleBack,
    handleOptionSelect,
    handleInputChange,
    calculatePrice,
    handleSubmit,
    resetForm
  };
};