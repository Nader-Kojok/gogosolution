export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormData {
  needsDriver: string;
  location: string;
  serviceType: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  passengers: string;
  name: string;
  phone: string;
  vehicleId: string;
  duration: string;
  flightNumber: string;
  hasLuggage: string;
  specialNeeds: string;
  specialNeedsDetails: string;
  submissionMethod?: string;
  [key: string]: string | undefined; // Index signature pour permettre l'accès dynamique
}

export interface Question {
  title: string;
  description: string;
  options?: Array<{ value: string; label: string; icon: string }>;
  type?: "datetime" | "locations" | "passengers" | "vehicles" | "personal" | "summary";
}

export interface Questions {
  [key: number]: Question;
}

export interface Vehicle {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  prices: {
    dakar?: {
      "airport-pickup": number;
      "airport-dropoff": number;
      "hourly": number;
      "daily": number;
    };
    outside?: {
      "airport-pickup": number;
      "airport-dropoff": number;
      "hourly": number;
      "daily": number;
    };
    "airport-pickup"?: number;
    "airport-dropoff"?: number;
    "hourly"?: number;
    "daily"?: number;
  };
  category: string;
}

export type ServiceType = "airport-pickup" | "airport-dropoff" | "city" | "hourly" | "daily";
export type LocationType = "dakar" | "outside";