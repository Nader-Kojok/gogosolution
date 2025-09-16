import React from 'react';
import { motion } from 'framer-motion';
import { Question, FormData, Vehicle } from './types';
import VehicleSelector from './VehicleSelector';
import SummaryStep from './SummaryStep';

interface QuestionStepProps {
  question: Question;
  formData: FormData;
  onOptionSelect: (value: string) => void;
  onInputChange: (field: string, value: string) => void;
  calculatePrice: (vehicle: Vehicle) => number | string;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  errors: Record<string, string>;
}

const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  formData,
  onOptionSelect,
  onInputChange,
  calculatePrice,
  paymentMethod,
  setPaymentMethod,
  errors
}) => {
  const renderQuestionContent = () => {
    switch (question.type) {
      case "datetime":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onInputChange('date', e.target.value)}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                  errors.date ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                }`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Heure</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => onInputChange('time', e.target.value)}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                  errors.time ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                }`}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
            {(formData.serviceType === 'hourly' || formData.serviceType === 'daily') && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Durée {formData.serviceType === 'hourly' ? '(en heures)' : '(en jours)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => onInputChange('duration', e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-green-500"
                  placeholder={formData.serviceType === 'hourly' ? 'Nombre d\'heures' : 'Nombre de jours'}
                />
              </div>
            )}
          </div>
        );

      case "locations":
        return (
          <div className="space-y-4">
            {/* Pour les transferts aéroport pickup : seulement la destination */}
            {formData.serviceType === 'airport-pickup' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Destination</label>
                  <input
                    type="text"
                    value={formData.dropoff}
                    onChange={(e) => onInputChange('dropoff', e.target.value)}
                    className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                      errors.dropoff ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                    }`}
                    placeholder="Où souhaitez-vous aller ?"
                  />
                  {errors.dropoff && <p className="text-red-500 text-sm mt-1">{errors.dropoff}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Numéro de vol (optionnel)</label>
                  <input
                    type="text"
                    value={formData.flightNumber}
                    onChange={(e) => onInputChange('flightNumber', e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-green-500"
                    placeholder="Ex: AF 718"
                  />
                </div>
              </>
            )}
            
            {/* Pour les transferts aéroport dropoff : seulement le lieu de départ */}
            {formData.serviceType === 'airport-dropoff' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Lieu de départ</label>
                <input
                  type="text"
                  value={formData.pickup}
                  onChange={(e) => onInputChange('pickup', e.target.value)}
                  className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                    errors.pickup ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                  }`}
                  placeholder="D'où partez-vous ?"
                />
                {errors.pickup && <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>}
              </div>
            )}
            
            {/* Pour les locations (hourly/daily) : seulement l'adresse de départ */}
            {(formData.serviceType === 'hourly' || formData.serviceType === 'daily') && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Adresse de prise en charge</label>
                <input
                  type="text"
                  value={formData.pickup}
                  onChange={(e) => onInputChange('pickup', e.target.value)}
                  className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                    errors.pickup ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                  }`}
                  placeholder="Où souhaitez-vous récupérer le véhicule ?"
                />
                {errors.pickup && <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>}
              </div>
            )}
            
            {/* Pour les courses rapides : départ ET destination */}
            {formData.serviceType === 'city' && (
              <>
                <div>
                   <label className="block text-sm font-medium mb-2 text-gray-300">Lieu de départ</label>
                   <input
                     type="text"
                     value={formData.pickup}
                     onChange={(e) => onInputChange('pickup', e.target.value)}
                     className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                       errors.pickup ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                     }`}
                     placeholder="D'où partez-vous ?"
                   />
                   {errors.pickup && <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>}
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 text-gray-300">Destination</label>
                   <input
                     type="text"
                     value={formData.dropoff}
                     onChange={(e) => onInputChange('dropoff', e.target.value)}
                     className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                       errors.dropoff ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                     }`}
                     placeholder="Où souhaitez-vous aller ?"
                   />
                   {errors.dropoff && <p className="text-red-500 text-sm mt-1">{errors.dropoff}</p>}
                 </div>
              </>
            )}
          </div>
        );

      case "passengers":
        return (
          <div>
            <select
              value={formData.passengers}
              onChange={(e) => onInputChange('passengers', e.target.value)}
              className={`w-full p-3 border rounded-lg bg-gray-800 text-white ${
                errors.passengers ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
              }`}
            >
              <option value="" className="text-gray-400">Sélectionnez le nombre de passagers</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num} className="text-white">{num} passager{num > 1 ? 's' : ''}</option>
              ))}
            </select>
            {errors.passengers && <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>}
          </div>
        );

      case "vehicles":
        return (
          <VehicleSelector
            formData={formData}
            onVehicleSelect={onOptionSelect}
            calculatePrice={calculatePrice}
          />
        );

      case "summary":
        return (
          <SummaryStep
            formData={formData}
            calculatePrice={calculatePrice}
          />
        );

      case "personal":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Nom complet</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                  errors.name ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                }`}
                placeholder="Votre nom complet"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Numéro de téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                className={`w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 ${
                  errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-green-500'
                }`}
                placeholder="Ex: +221 77 123 45 67"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Mode de paiement</label>
              <div className="space-y-2">
                {[
                  { value: "cash", label: "Espèces" },
                  { value: "card", label: "Carte bancaire" },
                  { value: "mobile", label: "Paiement mobile" }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-green-500 focus:ring-green-500 bg-gray-800 border-gray-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
            </div>
            {formData.specialNeeds === 'yes' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Détails des besoins particuliers</label>
                <textarea
                  value={formData.specialNeedsDetails}
                  onChange={(e) => onInputChange('specialNeedsDetails', e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-green-500"
                  rows={3}
                  placeholder="Décrivez vos besoins particuliers..."
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 gap-3">
            {question.options?.map((option) => (
              <motion.button
              key={option.value}
              onClick={() => onOptionSelect(option.value)}
              className="flex items-center p-4 border-2 border-gray-600 rounded-lg hover:border-green-500 bg-gray-800 hover:bg-gray-700 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mr-3">{option.icon}</span>
              <span className="font-medium text-white">{option.label}</span>
            </motion.button>
            ))}
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-white">{question.title}</h2>
      <p className="text-gray-400 mb-6">{question.description}</p>
      {renderQuestionContent()}
    </div>
  );
};

export default QuestionStep;