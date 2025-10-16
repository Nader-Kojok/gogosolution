import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface BookingConfirmationProps {
  customerName: string;
  reservationNumber: string;
  serviceType: string;
  date: string;
  time: string;
  pickup?: string;
  dropoff?: string;
  passengers: number;
  vehicleName?: string;
  estimatedPrice: string;
  phone: string;
  flightNumber?: string;
  duration?: string;
  location?: string;
  needsDriver?: string;
}

const serviceTypeLabels: Record<string, string> = {
  'airport-pickup': '✈️ Transfert Aéroport (Arrivée)',
  'airport-dropoff': '✈️ Transfert Aéroport (Départ)',
  'city': '🏛️ Course rapide',
  'hourly': '⏰ Location à l\'heure',
  'daily': '📅 Location à la journée'
};

export const BookingConfirmation = ({
  customerName,
  reservationNumber,
  serviceType,
  date,
  time,
  pickup,
  dropoff,
  passengers,
  vehicleName,
  estimatedPrice,
  phone,
  flightNumber,
  duration,
  location,
  needsDriver,
}: BookingConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nouvelle réservation GOGOSOLUTION - {reservationNumber}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-gray-200 rounded-lg my-10 mx-auto p-5 max-w-2xl bg-white shadow-lg">
            {/* Header */}
            <Section className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-lg p-6 -mt-5 -mx-5 mb-6">
              <Heading className="text-white text-3xl font-bold text-center m-0">
                🚗 GOGOSOLUTION
              </Heading>
              <Text className="text-green-100 text-center text-sm mt-2 mb-0">
                Service de Transport VTC Premium à Dakar
              </Text>
            </Section>

            {/* Confirmation Message */}
            <Section className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-6">
              <Heading className="text-green-800 text-xl font-semibold m-0 mb-2">
                ✅ Nouvelle Réservation Reçue
              </Heading>
              <Text className="text-green-700 text-sm m-0">
                Numéro de réservation: <strong>{reservationNumber}</strong>
              </Text>
            </Section>

            {/* Customer Info */}
            <Section className="mb-6">
              <Heading className="text-gray-800 text-lg font-semibold border-b-2 border-gray-200 pb-2 mb-4">
                👤 Informations Client
              </Heading>
              <Text className="text-gray-700 text-sm my-2">
                <strong>Nom:</strong> {customerName}
              </Text>
              <Text className="text-gray-700 text-sm my-2">
                <strong>Téléphone:</strong> {phone}
              </Text>
            </Section>

            {/* Service Details */}
            <Section className="mb-6">
              <Heading className="text-gray-800 text-lg font-semibold border-b-2 border-gray-200 pb-2 mb-4">
                📋 Détails du Service
              </Heading>
              <Text className="text-gray-700 text-sm my-2">
                <strong>Type de service:</strong> {serviceTypeLabels[serviceType] || serviceType}
              </Text>
              {location && (
                <Text className="text-gray-700 text-sm my-2">
                  <strong>Localisation:</strong> {location}
                </Text>
              )}
              {needsDriver && (
                <Text className="text-gray-700 text-sm my-2">
                  <strong>Chauffeur:</strong> {needsDriver === 'yes' ? 'Oui' : 'Non'}
                </Text>
              )}
              <Text className="text-gray-700 text-sm my-2">
                <strong>Date:</strong> {date}
              </Text>
              <Text className="text-gray-700 text-sm my-2">
                <strong>Heure:</strong> {time}
              </Text>
              {duration && (
                <Text className="text-gray-700 text-sm my-2">
                  <strong>Durée:</strong> {duration}
                </Text>
              )}
            </Section>

            {/* Itinerary */}
            {(pickup || dropoff) && (
              <Section className="mb-6">
                <Heading className="text-gray-800 text-lg font-semibold border-b-2 border-gray-200 pb-2 mb-4">
                  🗺️ Itinéraire
                </Heading>
                {pickup && (
                  <Text className="text-gray-700 text-sm my-2">
                    <strong>Départ:</strong> {pickup}
                  </Text>
                )}
                {dropoff && (
                  <Text className="text-gray-700 text-sm my-2">
                    <strong>Destination:</strong> {dropoff}
                  </Text>
                )}
              </Section>
            )}

            {/* Additional Info */}
            <Section className="mb-6">
              <Heading className="text-gray-800 text-lg font-semibold border-b-2 border-gray-200 pb-2 mb-4">
                ℹ️ Informations Complémentaires
              </Heading>
              <Text className="text-gray-700 text-sm my-2">
                <strong>Nombre de passagers:</strong> {passengers}
              </Text>
              {vehicleName && (
                <Text className="text-gray-700 text-sm my-2">
                  <strong>Véhicule:</strong> {vehicleName}
                </Text>
              )}
              {flightNumber && (
                <Text className="text-gray-700 text-sm my-2">
                  <strong>Numéro de vol:</strong> {flightNumber}
                </Text>
              )}
            </Section>

            {/* Price */}
            <Section className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <Text className="text-gray-700 text-sm m-0 mb-2">
                <strong>Prix Estimé:</strong>
              </Text>
              <Text className="text-green-600 text-2xl font-bold m-0">
                {estimatedPrice}
              </Text>
            </Section>

            {/* Action Required */}
            <Section className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <Text className="text-yellow-800 text-sm font-semibold m-0 mb-2">
                ⚠️ Action Requise
              </Text>
              <Text className="text-yellow-700 text-sm m-0">
                Veuillez contacter le client au <strong>{phone}</strong> pour confirmer la réservation.
              </Text>
            </Section>

            <Hr className="border border-solid border-gray-300 my-6 mx-0 w-full" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-gray-600 text-xs mb-2">
                <strong>GOGOSOLUTION</strong> - Service de Transport VTC Premium
              </Text>
              <Text className="text-gray-500 text-xs mb-2">
                📞 +221 77 588 85 55 | 📧 babambs@gogosolution.sn
              </Text>
              <Text className="text-gray-400 text-xs m-0">
                Ce message a été envoyé automatiquement depuis le formulaire de réservation en ligne.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingConfirmation;
