import { Questions } from './types';

export const questions: Questions = {
  1: {
    title: "Quel type de service recherchez-vous ?",
    description: "Choisissez le service qui correspond le mieux à vos besoins.",
    options: [
      { value: "airport-pickup", label: "Transfert Aéroport (Arrivée)", icon: "🛬" },
      { value: "airport-dropoff", label: "Transfert Aéroport (Départ)", icon: "🛫" },
      { value: "city", label: "Course rapide", icon: "🏛️" },
      { value: "hourly", label: "Location à l'heure", icon: "⏰" },
      { value: "daily", label: "Location à la journée", icon: "📅" }
    ]
  },
  2: {
    title: "Où souhaitez-vous vous rendre ?",
    description: "Choisissez votre zone de destination.",
    options: [
      { value: "dakar", label: "Dans Dakar", icon: "🏙️" },
      { value: "outside", label: "Hors de Dakar", icon: "🌴" }
    ]
  },
  3: {
    title: "Avez-vous besoin d'un chauffeur ?",
    description: "Nous pouvons vous proposer un chauffeur professionnel ou vous laisser conduire le véhicule.",
    options: [
      { value: "yes", label: "Oui, je veux un chauffeur", icon: "👨‍✈️" },
      { value: "no", label: "Non, je conduirai moi-même", icon: "🚗" }
    ]
  },
  4: {
    title: "Quand souhaitez-vous voyager ?",
    description: "Sélectionnez la date et l'heure de votre trajet.",
    type: "datetime"
  },
  5: {
    title: "Informations de localisation",
    description: "Indiquez les informations nécessaires selon votre type de service.",
    type: "locations"
  },
  6: {
    title: "Combien de passagers serez-vous ?",
    description: "Cela nous permettra de vous proposer le véhicule adapté.",
    type: "passengers"
  },
  7: {
    title: "Avez-vous des bagages ?",
    description: "Cela nous aide à mieux préparer votre véhicule.",
    options: [
      { value: "yes", label: "Oui, j'ai des bagages", icon: "🧳" },
      { value: "no", label: "Non, pas de bagages", icon: "🎒" }
    ]
  },
  8: {
    title: "Avez-vous des besoins particuliers ?",
    description: "Siège bébé, accessibilité, etc.",
    options: [
      { value: "yes", label: "Oui, j'ai des besoins spéciaux", icon: "♿" },
      { value: "no", label: "Non, aucun besoin particulier", icon: "✅" }
    ]
  },
  9: {
    title: "Choisissez votre véhicule",
    description: "Sélectionnez le véhicule qui vous convient le mieux.",
    type: "vehicles"
  },
  10: {
    title: "Vos informations personnelles",
    description: "Pour finaliser votre réservation.",
    type: "personal"
  },
  11: {
    title: "Récapitulatif de votre réservation",
    description: "Vérifiez les détails de votre commande et le prix estimé avant de confirmer.",
    type: "summary"
  }
};