import React from 'react';
import Image from 'next/image';
import { FormData, Vehicle } from './types';
import { vehicles } from './vehiclesData';

interface SummaryStepProps {
  formData: FormData;
  calculatePrice: (vehicle: Vehicle) => number | string;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  formData,
  calculatePrice
}) => {
  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
  const estimatedPrice = selectedVehicle ? calculatePrice(selectedVehicle) : 0;

  const getServiceTypeLabel = () => {
    switch (formData.serviceType) {
      case 'airport-pickup': return 'Transfert Aéroport (Arrivée)';
      case 'airport-dropoff': return 'Transfert Aéroport (Départ)';
      case 'city': return 'Course rapide';
      case 'hourly': return 'Location à l\'heure';
      case 'daily': return 'Location à la journée';
      default: return formData.serviceType;
    }
  };

  const getLocationLabel = () => {
    if (formData.location === 'dakar') return 'Dans Dakar';
    if (formData.location === 'outside') return 'Hors de Dakar';
    return '';
  };

  const formatDateTime = () => {
    if (!formData.date || !formData.time) return 'Non spécifié';
    const date = new Date(formData.date + 'T' + formData.time);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Détails du service */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Détails du service</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Type de service :</span>
            <span className="text-white font-medium">{getServiceTypeLabel()}</span>
          </div>
          {formData.location && (
            <div className="flex justify-between">
              <span className="text-gray-400">Zone :</span>
              <span className="text-white">{getLocationLabel()}</span>
            </div>
          )}
          {(formData.serviceType === 'hourly' || formData.serviceType === 'daily') && formData.needsDriver && (
            <div className="flex justify-between">
              <span className="text-gray-400">Chauffeur :</span>
              <span className="text-white">{formData.needsDriver === 'yes' ? 'Avec chauffeur' : 'Sans chauffeur'}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-400">Date et heure :</span>
            <span className="text-white">{formatDateTime()}</span>
          </div>
          {formData.duration && (formData.serviceType === 'hourly' || formData.serviceType === 'daily') && (
            <div className="flex justify-between">
              <span className="text-gray-400">Durée :</span>
              <span className="text-white">
                {formData.duration} {formData.serviceType === 'hourly' ? 'heure(s)' : 'jour(s)'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Lieux */}
      {(formData.pickup || formData.dropoff) && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Lieux</h3>
          <div className="space-y-2 text-sm">
            {formData.pickup && (
              <div className="flex justify-between">
                <span className="text-gray-400">Départ :</span>
                <span className="text-white">{formData.pickup}</span>
              </div>
            )}
            {formData.dropoff && (
              <div className="flex justify-between">
                <span className="text-gray-400">Destination :</span>
                <span className="text-white">{formData.dropoff}</span>
              </div>
            )}
            {formData.flightNumber && (
              <div className="flex justify-between">
                <span className="text-gray-400">Numéro de vol :</span>
                <span className="text-white">{formData.flightNumber}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Détails passagers */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Détails passagers</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Nombre de passagers :</span>
            <span className="text-white">{formData.passengers} personne(s)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Bagages :</span>
            <span className="text-white">{formData.hasLuggage === 'yes' ? 'Oui' : (formData.hasLuggage === 'no' ? 'Non' : 'Non spécifié')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Besoins particuliers :</span>
            <span className="text-white">{formData.specialNeeds === 'yes' ? 'Oui' : (formData.specialNeeds === 'no' ? 'Non' : 'Non spécifié')}</span>
          </div>
          {formData.specialNeeds === 'yes' && formData.specialNeedsDetails && (
            <div className="mt-2">
              <span className="text-gray-400 block">Détails :</span>
              <span className="text-white text-xs">{formData.specialNeedsDetails}</span>
            </div>
          )}
        </div>
      </div>

      {/* Véhicule sélectionné */}
      {selectedVehicle && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Véhicule sélectionné</h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 relative rounded-lg overflow-hidden">
              <Image
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">{selectedVehicle.name}</h4>
              <p className="text-gray-400 text-sm">{selectedVehicle.description}</p>
              <p className="text-green-400 text-xs mt-1">Type: {selectedVehicle.category.toUpperCase()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Prix estimé */}
      <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Prix estimé</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">
            {typeof estimatedPrice === 'number' && estimatedPrice > 0
              ? `${estimatedPrice.toLocaleString()} FCFA` 
              : 'Prix à négocier'
            }
          </div>
          {typeof estimatedPrice === 'number' && estimatedPrice > 0 && (
            <p className="text-gray-400 text-sm mt-1">
              {formData.serviceType === 'hourly' && 'Prix pour la durée sélectionnée'}
              {formData.serviceType === 'daily' && 'Prix pour la durée sélectionnée'}
              {(formData.serviceType === 'airport-pickup' || formData.serviceType === 'airport-dropoff' || formData.serviceType === 'city') && 'Prix du trajet'}
            </p>
          )}
        </div>
      </div>

      {/* Note importante */}
      <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4">
        <p className="text-yellow-200 text-sm">
          <strong>Note :</strong> Ce prix est une estimation. Le prix final pourra être ajusté selon les conditions réelles du trajet.
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;