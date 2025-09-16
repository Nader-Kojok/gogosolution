import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Vehicle, FormData } from './types';
import { vehicles } from './vehiclesData';

interface VehicleSelectorProps {
  formData: FormData;
  onVehicleSelect: (vehicleId: string) => void;
  calculatePrice: (vehicle: Vehicle) => number | string;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  formData,
  onVehicleSelect,
  calculatePrice
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vehicles.map((vehicle) => {
        const price = calculatePrice(vehicle);
        const isSelected = formData.vehicleId === vehicle.id;
        
        return (
          <motion.div
            key={vehicle.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              isSelected
                ? "border-green-500 bg-green-900/30"
                : "border-gray-600 hover:border-green-500 bg-gray-800"
            }`}
            onClick={() => onVehicleSelect(vehicle.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative h-32 mb-3">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-white">{vehicle.name}</h3>
            <p className="text-gray-400 text-sm mb-3">{vehicle.description}</p>
            
            <div className="mb-3">
              <h4 className="font-medium text-sm mb-1 text-gray-300">Équipements :</h4>
              <ul className="text-xs text-gray-400">
                {vehicle.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {typeof price === 'number' && price > 0 ? `${price.toLocaleString()} FCFA` : 'Prix à négocier'}
              </div>
              {formData.serviceType === 'hourly' && typeof price === 'number' && price > 0 && (
                <div className="text-xs text-gray-500">par heure</div>
              )}
              {formData.serviceType === 'daily' && typeof price === 'number' && price > 0 && (
                <div className="text-xs text-gray-500">par jour</div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VehicleSelector;