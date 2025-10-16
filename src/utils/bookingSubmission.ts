import { FormData } from '../components/modals/types';
import { vehicles } from '../components/modals/vehiclesData';
import { CONTACT_CONFIG } from '../config/contact';

export interface BookingData {
  formData: FormData;
  reservationNumber: string;
  estimatedPrice: number | string;
  isOutsideDakar: boolean;
}

/**
 * Formate les données de réservation pour WhatsApp
 */
export const formatWhatsAppMessage = (data: BookingData): string => {
  const { formData, reservationNumber, estimatedPrice, isOutsideDakar } = data;
  
  // Trouver le véhicule sélectionné
  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
  
  // Formater le type de service
  const serviceTypeLabels: Record<string, string> = {
    'airport-pickup': '✈️ Transfert Aéroport (Arrivée)',
    'airport-dropoff': '✈️ Transfert Aéroport (Départ)',
    'city': '🏛️ Course rapide',
    'hourly': '⏰ Location à l\'heure',
    'daily': '📅 Location à la journée'
  };
  
  let message = `🚗 *NOUVELLE RÉSERVATION*\n\n`;
  message += `📋 *Numéro de réservation:* ${reservationNumber}\n\n`;
  
  message += `*📌 TYPE DE SERVICE*\n`;
  message += `${serviceTypeLabels[formData.serviceType] || formData.serviceType}\n\n`;
  
  // Localisation (pour les locations)
  if (formData.location) {
    message += `*📍 LOCALISATION*\n`;
    message += `${isOutsideDakar ? 'Hors Dakar' : 'Dakar'}\n\n`;
  }
  
  // Besoin de chauffeur (pour les locations)
  if (formData.needsDriver) {
    message += `*👨‍✈️ CHAUFFEUR*\n`;
    message += `${formData.needsDriver === 'yes' ? 'Oui' : 'Non'}\n\n`;
  }
  
  message += `*📅 DATE ET HEURE*\n`;
  message += `Date: ${formData.date}\n`;
  message += `Heure: ${formData.time}\n\n`;
  
  // Lieux de départ/arrivée
  if (formData.pickup || formData.dropoff) {
    message += `*🗺️ ITINÉRAIRE*\n`;
    if (formData.pickup) message += `Départ: ${formData.pickup}\n`;
    if (formData.dropoff) message += `Destination: ${formData.dropoff}\n`;
    message += `\n`;
  }
  
  // Durée (pour les locations)
  if ((formData.serviceType === 'hourly' || formData.serviceType === 'daily') && formData.duration) {
    message += `*⏱️ DURÉE*\n`;
    message += `${formData.duration} ${formData.serviceType === 'hourly' ? 'heure(s)' : 'jour(s)'}\n\n`;
  }
  
  message += `*👥 PASSAGERS*\n`;
  message += `${formData.passengers} personne(s)\n\n`;
  
  // Numéro de vol (si applicable)
  if (formData.flightNumber) {
    message += `*✈️ NUMÉRO DE VOL*\n`;
    message += `${formData.flightNumber}\n\n`;
  }
  
  // Bagages
  if (formData.hasLuggage) {
    message += `*🧳 BAGAGES*\n`;
    message += `${formData.hasLuggage === 'yes' ? 'Oui' : 'Non'}\n\n`;
  }
  
  // Besoins particuliers
  if (formData.specialNeeds === 'yes' && formData.specialNeedsDetails) {
    message += `*♿ BESOINS PARTICULIERS*\n`;
    message += `${formData.specialNeedsDetails}\n\n`;
  }
  
  // Véhicule
  if (selectedVehicle) {
    message += `*🚙 VÉHICULE*\n`;
    message += `${selectedVehicle.name}\n\n`;
  }
  
  message += `*👤 INFORMATIONS CLIENT*\n`;
  message += `Nom: ${formData.name}\n`;
  message += `Téléphone: ${formData.phone}\n\n`;
  
  message += `*💰 PRIX ESTIMÉ*\n`;
  message += `${typeof estimatedPrice === 'number' ? `${estimatedPrice.toLocaleString('fr-FR')} FCFA` : estimatedPrice}\n\n`;
  
  message += `---\n`;
  message += `_Message envoyé via le formulaire de réservation ${CONTACT_CONFIG.companyName}_`;
  
  return message;
};

/**
 * Ouvre WhatsApp avec le message pré-rempli
 */
export const sendWhatsAppBooking = (data: BookingData): void => {
  const message = formatWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodedMessage}`;
  
  // Ouvrir WhatsApp dans un nouvel onglet
  window.open(whatsappUrl, '_blank');
};

/**
 * Formate les données de réservation pour email
 */
export const formatEmailContent = (data: BookingData): { subject: string; body: string } => {
  const { formData, reservationNumber, estimatedPrice, isOutsideDakar } = data;
  
  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
  
  const serviceTypeLabels: Record<string, string> = {
    'airport-pickup': 'Transfert Aéroport (Arrivée)',
    'airport-dropoff': 'Transfert Aéroport (Départ)',
    'city': 'Course rapide',
    'hourly': 'Location à l\'heure',
    'daily': 'Location à la journée'
  };
  
  const subject = `Nouvelle réservation - ${reservationNumber}`;
  
  let body = `NOUVELLE RÉSERVATION\n\n`;
  body += `Numéro de réservation: ${reservationNumber}\n\n`;
  body += `--- DÉTAILS DE LA RÉSERVATION ---\n\n`;
  
  body += `Type de service: ${serviceTypeLabels[formData.serviceType] || formData.serviceType}\n`;
  
  if (formData.location) {
    body += `Localisation: ${isOutsideDakar ? 'Hors Dakar' : 'Dakar'}\n`;
  }
  
  if (formData.needsDriver) {
    body += `Chauffeur: ${formData.needsDriver === 'yes' ? 'Oui' : 'Non'}\n`;
  }
  
  body += `Date: ${formData.date}\n`;
  body += `Heure: ${formData.time}\n`;
  
  if (formData.pickup) body += `Lieu de départ: ${formData.pickup}\n`;
  if (formData.dropoff) body += `Destination: ${formData.dropoff}\n`;
  
  if ((formData.serviceType === 'hourly' || formData.serviceType === 'daily') && formData.duration) {
    body += `Durée: ${formData.duration} ${formData.serviceType === 'hourly' ? 'heure(s)' : 'jour(s)'}\n`;
  }
  
  body += `Nombre de passagers: ${formData.passengers}\n`;
  
  if (formData.flightNumber) {
    body += `Numéro de vol: ${formData.flightNumber}\n`;
  }
  
  if (formData.hasLuggage) {
    body += `Bagages: ${formData.hasLuggage === 'yes' ? 'Oui' : 'Non'}\n`;
  }
  
  if (formData.specialNeeds === 'yes' && formData.specialNeedsDetails) {
    body += `Besoins particuliers: ${formData.specialNeedsDetails}\n`;
  }
  
  if (selectedVehicle) {
    body += `Véhicule: ${selectedVehicle.name}\n`;
  }
  
  body += `\n--- INFORMATIONS CLIENT ---\n\n`;
  body += `Nom: ${formData.name}\n`;
  body += `Téléphone: ${formData.phone}\n`;
  
  body += `\n--- TARIFICATION ---\n\n`;
  body += `Prix estimé: ${typeof estimatedPrice === 'number' ? `${estimatedPrice.toLocaleString('fr-FR')} FCFA` : estimatedPrice}\n`;
  
  body += `\n---\n`;
  body += `Message envoyé via le formulaire de réservation ${CONTACT_CONFIG.companyName}`;
  
  return { subject, body };
};

/**
 * Envoie la réservation par email via l'API
 */
export const sendEmailBooking = async (data: BookingData): Promise<{ success: boolean; error?: string }> => {
  const { formData, reservationNumber, estimatedPrice, isOutsideDakar } = data;
  
  try {
    const response = await fetch('/api/send-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: formData.name,
        reservationNumber: reservationNumber,
        serviceType: formData.serviceType,
        date: formData.date,
        time: formData.time,
        pickup: formData.pickup,
        dropoff: formData.dropoff,
        passengers: formData.passengers,
        vehicleName: formData.vehicleId,
        estimatedPrice: typeof estimatedPrice === 'number' 
          ? `${estimatedPrice.toLocaleString('fr-FR')} FCFA` 
          : estimatedPrice,
        phone: formData.phone,
        flightNumber: formData.flightNumber,
        duration: formData.duration 
          ? `${formData.duration} ${formData.serviceType === 'hourly' ? 'heure(s)' : 'jour(s)'}`
          : undefined,
        location: formData.location 
          ? (isOutsideDakar ? 'Hors Dakar' : 'Dakar')
          : undefined,
        needsDriver: formData.needsDriver,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erreur lors de l\'envoi de l\'email');
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
};
