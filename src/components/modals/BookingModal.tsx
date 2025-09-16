import React, { useEffect } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { BookingModalProps } from "./types";
import { questions } from "./questionsData";
import { useBookingForm } from "./useBookingForm";
import QuestionStep from "./QuestionStep";
import { vehicles } from "./vehiclesData";
import { generateReceiptPDF } from "../../utils/pdfGenerator";

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const {
    step,
    formData,
    errors,
    paymentMethod,
    setPaymentMethod,
    isOutsideDakar,
    isSuccess,
    reservationNumber,
    getActiveSteps,
    handleNext,
    handleBack,
    handleOptionSelect,
    handleInputChange,
    calculatePrice,
    handleSubmit,
    resetForm
  } = useBookingForm();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function pour rétablir le scroll quand le composant se démonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeSteps = getActiveSteps();
  const currentStepIndex = activeSteps.indexOf(step);
  const isLastStep = currentStepIndex === activeSteps.length - 1;
  const currentQuestion = questions[step];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {isSuccess ? (
             <div className="p-8 text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4 text-white">Réservation confirmée !</h2>
                <p className="text-gray-300 mb-4">
                  Votre numéro de réservation est : <strong className="text-green-400">{reservationNumber}</strong>
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Votre reçu PDF a été téléchargé automatiquement.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Nous vous contacterons bientôt pour confirmer les détails.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                     onClick={() => {
                       const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
                       const estimatedPrice = selectedVehicle ? calculatePrice(selectedVehicle) : 'Prix à négocier';
                       
                       generateReceiptPDF({
                         formData,
                         reservationNumber,
                         estimatedPrice,
                         isOutsideDakar
                       });
                     }}
                     variant="secondary"
                     className="text-sm"
                   >
                     Télécharger le reçu PDF
                   </Button>
                  <Button onClick={handleClose} variant="primary">
                    Fermer
                  </Button>
                </div>
              </div>
          ) : (
            <>
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                  <div>
                    <h1 className="text-xl font-bold text-white">Réservation de véhicule</h1>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-400">
                        Étape {currentStepIndex + 1} sur {activeSteps.length}
                      </p>
                      {formData.serviceType && step > 1 && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                            {formData.serviceType === 'airport-pickup' && '✈️ Transfert Aéroport (Arrivée)'}
                            {formData.serviceType === 'airport-dropoff' && '✈️ Transfert Aéroport (Départ)'}
                            {formData.serviceType === 'city' && '🏛️ Course rapide'}
                            {formData.serviceType === 'hourly' && '⏰ Location à l\'heure'}
                            {formData.serviceType === 'daily' && '📅 Location à la journée'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

              <div className="p-6">
                <div className="mb-6">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-sm text-gray-400">Progression</span>
                     <span className="text-sm text-gray-400">
                       {Math.round(((currentStepIndex + 1) / activeSteps.length) * 100)}%
                     </span>
                   </div>
                   <div className="w-full bg-gray-700 rounded-full h-2">
                     <div
                       className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full transition-all duration-300"
                       style={{
                         width: `${((currentStepIndex + 1) / activeSteps.length) * 100}%`
                       }}
                     />
                   </div>
                 </div>

                <QuestionStep
                  question={currentQuestion}
                  formData={formData}
                  onOptionSelect={handleOptionSelect}
                  onInputChange={handleInputChange}
                  calculatePrice={calculatePrice}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  errors={errors}
                />
              </div>

              <div className="flex justify-between p-6 border-t border-gray-700 bg-gray-800/50">
                 <Button
                   onClick={handleBack}
                   disabled={currentStepIndex === 0}
                   variant="secondary"
                   className="disabled:opacity-50"
                 >
                   Précédent
                 </Button>
                 
                 {isLastStep ? (
                   <Button
                     onClick={handleSubmit}
                     variant="primary"
                   >
                     Confirmer la réservation
                   </Button>
                 ) : step === 11 ? (
                   <Button
                     onClick={handleNext}
                     variant="primary"
                   >
                     Suivant
                   </Button>
                 ) : (
                   <Button
                     onClick={handleNext}
                     variant="primary"
                   >
                     Suivant
                   </Button>
                 )}
               </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;