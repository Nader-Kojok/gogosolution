import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
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
        <Body className="bg-gray-900 my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-gray-700 rounded-lg my-10 mx-auto p-0 max-w-2xl bg-gray-800 shadow-2xl">
            {/* Header avec logo */}
            <Section className="bg-gray-900 rounded-t-lg p-6">
              <div style={{ textAlign: 'center' }}>
                <Img
                  src="https://www.gogosolution.sn/logo.svg"
                  alt="GOGOSOLUTION"
                  width="120"
                  height="40"
                  style={{ margin: '0 auto' }}
                />
              </div>
              <Text className="text-gray-400 text-center text-xs mt-3 mb-0">
                Service de Transport VTC Premium à Dakar
              </Text>
            </Section>

            {/* Confirmation Message */}
            <Section className="bg-green-900 bg-opacity-30 border-l-4 border-green-500 p-4 mx-6 mt-6 rounded">
              <Heading className="text-green-400 text-xl font-bold m-0 mb-2">
                ✅ Nouvelle Réservation Reçue
              </Heading>
              <Text className="text-white text-sm m-0">
                Numéro de réservation: <strong className="text-green-400">{reservationNumber}</strong>
              </Text>
            </Section>

            {/* Customer Info */}
            <Section className="mx-6 mt-6">
              <Heading className="text-white text-base font-bold border-b border-gray-700 pb-2 mb-3">
                👤 Informations Client
              </Heading>
              <Text className="text-gray-300 text-sm my-1">
                <strong className="text-white">Nom:</strong> {customerName}
              </Text>
              <Text className="text-gray-300 text-sm my-1">
                <strong className="text-white">Téléphone:</strong> {phone}
              </Text>
            </Section>

            {/* Service Details */}
            <Section className="mx-6 mt-5">
              <Heading className="text-white text-base font-bold border-b border-gray-700 pb-2 mb-3">
                📋 Détails du Service
              </Heading>
              <Text className="text-gray-300 text-sm my-1">
                <strong className="text-white">Type de service:</strong> {serviceTypeLabels[serviceType] || serviceType}
              </Text>
              {location && (
                <Text className="text-gray-300 text-sm my-1">
                  <strong className="text-white">Localisation:</strong> {location}
                </Text>
              )}
              {needsDriver && (
                <Text className="text-gray-300 text-sm my-1">
                  <strong className="text-white">Chauffeur:</strong> {needsDriver === 'yes' ? 'Oui' : 'Non'}
                </Text>
              )}
              <Text className="text-gray-300 text-sm my-1">
                <strong className="text-white">Date:</strong> {date}
              </Text>
              <Text className="text-gray-300 text-sm my-1">
                <strong className="text-white">Heure:</strong> {time}
              </Text>
              {duration && (
                <Text className="text-gray-300 text-sm my-1">
                  <strong className="text-white">Durée:</strong> {duration}
                </Text>
              )}
            </Section>

            {/* Itinerary */}
            {(pickup || dropoff) && (
              <Section className="mx-6 mt-5">
                <Heading className="text-white text-base font-bold border-b border-gray-700 pb-2 mb-3">
                  🗺️ Itinéraire
                </Heading>
                {pickup && (
                  <Text className="text-gray-300 text-sm my-1">
                    <strong className="text-white">Départ:</strong> {pickup}
                  </Text>
                )}
                {dropoff && (
                  <Text className="text-gray-300 text-sm my-1">
                    <strong className="text-white">Destination:</strong> {dropoff}
                  </Text>
                )}
              </Section>
            )}

            {/* Additional Info */}
            <Section className="mx-6 mt-5">
              <Heading className="text-white text-base font-bold border-b border-gray-700 pb-2 mb-3">
                ℹ️ Informations Complémentaires
              </Heading>
              <Text className="text-gray-300 text-sm my-1">
                <strong className="text-white">Nombre de passagers:</strong> {passengers}
              </Text>
              {vehicleName && (
                <Text className="text-gray-300 text-sm my-1">
                  <strong className="text-white">Véhicule:</strong> {vehicleName}
                </Text>
              )}
              {flightNumber && (
                <Text className="text-gray-300 text-sm my-1">
                  <strong className="text-white">Numéro de vol:</strong> {flightNumber}
                </Text>
              )}
            </Section>

            {/* Price */}
            <Section className="bg-gray-900 border border-gray-700 rounded-lg p-4 mx-6 mt-5">
              <Text className="text-gray-400 text-sm m-0 mb-2">
                Prix Estimé:
              </Text>
              <Text className="text-green-400 text-3xl font-bold m-0">
                {estimatedPrice}
              </Text>
            </Section>

            {/* Action Required */}
            <Section className="bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-500 p-4 mx-6 mt-5 rounded">
              <Text className="text-yellow-400 text-sm font-bold m-0 mb-2">
                ⚠️ Action Requise
              </Text>
              <Text className="text-yellow-200 text-sm m-0">
                Veuillez contacter le client au <strong>{phone}</strong> pour confirmer la réservation.
              </Text>
            </Section>

            <Hr className="border border-solid border-gray-700 my-6 mx-6" />

            {/* Footer */}
            <Section className="text-center pb-6 px-6">
              <Text className="text-gray-400 text-xs mb-2">
                <strong className="text-white">GOGOSOLUTION</strong> - Service de Transport VTC Premium
              </Text>
              <Text className="text-gray-500 text-xs mb-2">
                📞 +221 77 588 85 55 | 📧 babambs@gogosolution.sn
              </Text>
              <Text className="text-gray-600 text-xs m-0">
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
