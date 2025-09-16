import { Vehicle } from './types';

export const vehicles: Vehicle[] = [
  {
    id: "berline",
    name: "Berline Premium",
    description: "Confort et élégance pour vos déplacements",
    image: "/Berline.jpeg",
    features: ["Climatisation", "Sièges confortables", "Eau offerte", "Chauffeur qualifié"],
    prices: {
      dakar: {
        "airport-pickup": 25000,
        "airport-dropoff": 25000,
        "hourly": 10000,
        "daily": 125000
      },
      outside: {
        "airport-pickup": 25000,
        "airport-dropoff": 25000,
        "hourly": 10000,
        "daily": 150000
      }
    },
    category: "berline"
  },
  {
    id: "suv",
    name: "SUV Premium",
    description: "Espace et confort pour vos déplacements",
    image: "/SUV.jpeg",
    features: ["Climatisation", "Grand confort", "Eau offerte", "Chauffeur qualifié"],
    prices: {
      dakar: {
        "airport-pickup": 35000,
        "airport-dropoff": 35000,
        "hourly": 15000,
        "daily": 175000
      },
      outside: {
        "airport-pickup": 35000,
        "airport-dropoff": 35000,
        "hourly": 15000,
        "daily": 0 // Prix à négocier
      }
    },
    category: "suv"
  },
  {
    id: "4x4",
    name: "4x4 Tout-terrain",
    description: "Pour vos déplacements en tout terrain",
    image: "/4x4.webp",
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
    image: "/bus.jpg",
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