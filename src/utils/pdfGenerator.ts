import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { FormData } from '../components/modals/types';
import { vehicles } from '../components/modals/vehiclesData';

interface ReceiptData {
  formData: FormData;
  reservationNumber: string;
  estimatedPrice: number | string;
  isOutsideDakar: boolean;
}

export const generateReceiptPDF = (data: ReceiptData) => {
  const { formData, reservationNumber, estimatedPrice } = data;
  
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  
  // Couleurs du thème (très adoucies)
  const darkGray: [number, number, number] = [60, 60, 60]; // Gris moyen pour le header
  const backgroundGray: [number, number, number] = [80, 80, 80]; // Gris clair pour le fond
  const lightText: [number, number, number] = [255, 255, 255]; // Blanc pour le texte
  const grayText: [number, number, number] = [200, 200, 200]; // Gris clair pour le texte secondaire
  const primaryGreen: [number, number, number] = [0, 209, 100]; // Vert pour les accents
  
  // Configuration de base
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;
  let yPosition = 25;
  
  // Fond gris foncé pour toute la page
  doc.setFillColor(...backgroundGray);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.height, 'F');
  
  // Header gris très foncé
  doc.setFillColor(...darkGray);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  // Logo du reçu
  try {
    doc.addImage('/logo_recu.png', 'PNG', margin, 8, 40, 15);
  } catch {
    // Fallback au texte si le logo ne peut pas être chargé
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('BALLAGO', margin, 20);
  }
  
  doc.setTextColor(...lightText);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Reçu de Réservation', pageWidth - margin - 50, 20);
  
  yPosition = 40;
  
  // Numéro de réservation et date sur la même ligne
  doc.setTextColor(...lightText);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('N° Réservation:', margin, yPosition);
  
  doc.setTextColor(...lightText);
  doc.setFontSize(14);
  doc.text(reservationNumber, margin + 50, yPosition);
  
  // Date de génération à droite
  doc.setTextColor(...grayText);
  doc.setFontSize(8);
  doc.text(`${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR')}`, pageWidth - margin - 40, yPosition);
  
  yPosition += 20;
  
  // Informations client (titre plus compact)
  doc.setTextColor(...lightText);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT', margin, yPosition);
  
  yPosition += 10;
  
  const clientInfo = [
    ['Nom', formData.name || 'Non spécifié'],
    ['Téléphone', formData.phone || 'Non spécifié'],
    ['Nombre de passagers', `${formData.passengers} personne(s)`]
  ];
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Information', 'Détail']],
    body: clientInfo,
    theme: 'grid',
    headStyles: {
        fillColor: primaryGreen,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
        cellPadding: 2
      },
    bodyStyles: {
      fontSize: 8,
      textColor: lightText,
      fillColor: [100, 100, 100],
      cellPadding: 2
    },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 80 }
    },
    margin: { left: margin, right: margin }
  });
  
  yPosition += (clientInfo.length + 1) * 8 + 10; // Estimation de la hauteur réduite
  
  // Détails du service (titre plus compact)
  doc.setTextColor(...lightText);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('SERVICE', margin, yPosition);
  
  yPosition += 10;
  
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
  
  const serviceInfo = [
    ['Type de service', getServiceTypeLabel()],
    ['Date et heure', formData.date && formData.time ? 
      new Date(formData.date + 'T' + formData.time).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Non spécifié'
    ]
  ];
  
  // Ajouter la zone si applicable
  if (formData.location) {
    const locationLabel = formData.location === 'dakar' ? 'Dans Dakar' : 'Hors de Dakar';
    serviceInfo.push(['Zone', locationLabel]);
  }
  
  // Ajouter la durée si applicable
  if (formData.duration && (formData.serviceType === 'hourly' || formData.serviceType === 'daily')) {
    const durationLabel = formData.serviceType === 'hourly' ? 'heure(s)' : 'jour(s)';
    serviceInfo.push(['Durée', `${formData.duration} ${durationLabel}`]);
  }
  
  // Ajouter le chauffeur si applicable
  if (formData.needsDriver && (formData.serviceType === 'hourly' || formData.serviceType === 'daily')) {
    serviceInfo.push(['Chauffeur', formData.needsDriver === 'yes' ? 'Avec chauffeur' : 'Sans chauffeur']);
  }
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Service', 'Détail']],
    body: serviceInfo,
    theme: 'grid',
    headStyles: {
          fillColor: primaryGreen,
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
    bodyStyles: {
          fontSize: 10,
          textColor: lightText,
          fillColor: [100, 100, 100]
        },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 100 }
    },
    margin: { left: margin, right: margin }
  });
  
  yPosition += (serviceInfo.length + 1) * 8 + 10; // Estimation de la hauteur réduite
  
  // Lieux si applicable (plus compact)
  if (formData.pickup || formData.dropoff) {
    doc.setTextColor(...lightText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('LIEUX', margin, yPosition);
    
    yPosition += 10;
    
    const locationInfo = [];
    if (formData.pickup) {
      locationInfo.push(['Départ', formData.pickup]);
    }
    if (formData.dropoff) {
      locationInfo.push(['Destination', formData.dropoff]);
    }
    if (formData.flightNumber) {
      locationInfo.push(['Numéro de vol', formData.flightNumber]);
    }
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Lieu', 'Adresse']],
      body: locationInfo,
      theme: 'grid',
      headStyles: {
          fillColor: primaryGreen,
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
      bodyStyles: {
        fontSize: 10,
        textColor: lightText,
        fillColor: [100, 100, 100]
      },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold' },
        1: { cellWidth: 100 }
      },
      margin: { left: margin, right: margin }
    });
    
    yPosition += (locationInfo.length + 1) * 8 + 10; // Estimation de la hauteur réduite
  }
  
  // Véhicule sélectionné (plus compact)
  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
  if (selectedVehicle) {
    doc.setTextColor(...lightText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('VÉHICULE', margin, yPosition);
    
    yPosition += 10;
    
    const vehicleInfo = [
      ['Véhicule', selectedVehicle.name],
      ['Type', selectedVehicle.category.toUpperCase()]
    ];
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Caractéristique', 'Détail']],
      body: vehicleInfo,
      theme: 'grid',
      headStyles: {
        fillColor: primaryGreen,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: {
          fontSize: 10,
          textColor: lightText,
          fillColor: [100, 100, 100]
        },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold' },
        1: { cellWidth: 100 }
      },
      margin: { left: margin, right: margin }
    });
    
    yPosition += (vehicleInfo.length + 1) * 8 + 10; // Estimation de la hauteur réduite
  }
  
  // Prix estimé (plus compact)
  doc.setFillColor(...primaryGreen);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Prix Estimé', margin + 5, yPosition + 12);
  
  const priceText = typeof estimatedPrice === 'number' && estimatedPrice > 0 
    ? `${estimatedPrice.toLocaleString('fr-FR')} FCFA` 
    : 'Prix à négocier';
  
  // Gestion intelligente de l'affichage du prix
  let fontSize = 12; // Taille plus petite par défaut
  doc.setFontSize(fontSize);
  let textWidth = doc.getTextWidth(priceText);
  const availableWidth = pageWidth - 2 * margin - 60; // Plus d'espace disponible
  
  // Si le texte est trop long, le diviser en deux lignes
  if (textWidth > availableWidth) {
    // Essayer de couper au niveau de l'espace ou du nombre
    const words = priceText.split(' ');
    if (words.length > 1) {
      // Afficher sur deux lignes
      const firstLine = words[0];
      const secondLine = words.slice(1).join(' ');
      
      doc.setFontSize(11);
      const firstLineWidth = doc.getTextWidth(firstLine);
      const secondLineWidth = doc.getTextWidth(secondLine);
      
      doc.text(firstLine, pageWidth - margin - firstLineWidth, yPosition + 12);
      doc.text(secondLine, pageWidth - margin - secondLineWidth, yPosition + 18);
    } else {
      // Réduire la taille de police si un seul mot
      while (textWidth > availableWidth && fontSize > 8) {
        fontSize -= 1;
        doc.setFontSize(fontSize);
        textWidth = doc.getTextWidth(priceText);
      }
      doc.text(priceText, pageWidth - margin - textWidth, yPosition + 15);
    }
  } else {
    // Affichage normal sur une ligne
    doc.text(priceText, pageWidth - margin - textWidth, yPosition + 15);
  }
  
  yPosition += 30;
  
  // Informations de contact (très compact)
  doc.setTextColor(...lightText);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACT', margin, yPosition);
  
  yPosition += 8;
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Tél: +221 77 588 85 55 | Email: babambs@gogosolution.sn | www.gogosolution.com', margin, yPosition);
  
  yPosition += 10;
  
  // Note importante (très compacte)
  doc.setTextColor(...grayText);
  doc.setFontSize(6);
  doc.text('Ce reçu confirme votre réservation. Prix estimé sous réserve de modifications.', margin, yPosition);
  
  // Générer le nom du fichier
  const fileName = `Ballago_Recu_${reservationNumber}.pdf`;
  
  // Télécharger le PDF
  doc.save(fileName);
  
  return fileName;
};

// Fonction pour générer un numéro de réservation unique
export const generateReservationNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  // Format: BLG + YYMMDD + HHMMSS
  return `BLG${year}${month}${day}${hours}${minutes}${seconds}`;
};