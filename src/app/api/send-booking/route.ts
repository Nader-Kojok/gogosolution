import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import BookingConfirmation from '@/emails/BookingConfirmation';
import { CONTACT_CONFIG } from '@/config/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json();

    // Validation des données requises
    if (!bookingData.customerName || !bookingData.reservationNumber || !bookingData.phone) {
      return NextResponse.json(
        { error: 'Données de réservation incomplètes' },
        { status: 400 }
      );
    }

    // Envoi de l'email avec le template React
    const { data, error } = await resend.emails.send({
      from: 'GOGOSOLUTION <onboarding@resend.dev>', // Remplacer par votre domaine vérifié
      to: [CONTACT_CONFIG.email], // Email de l'entreprise
      replyTo: bookingData.phone ? `${bookingData.customerName} <${bookingData.phone}>` : undefined,
      subject: `🚗 Nouvelle Réservation - ${bookingData.reservationNumber}`,
      react: BookingConfirmation({
        customerName: bookingData.customerName,
        reservationNumber: bookingData.reservationNumber,
        serviceType: bookingData.serviceType,
        date: bookingData.date,
        time: bookingData.time,
        pickup: bookingData.pickup,
        dropoff: bookingData.dropoff,
        passengers: bookingData.passengers,
        vehicleName: bookingData.vehicleName,
        estimatedPrice: bookingData.estimatedPrice,
        phone: bookingData.phone,
        flightNumber: bookingData.flightNumber,
        duration: bookingData.duration,
        location: bookingData.location,
        needsDriver: bookingData.needsDriver,
      }),
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email envoyé avec succès',
        emailId: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
