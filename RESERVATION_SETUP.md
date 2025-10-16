# Configuration des Réservations

## Vue d'ensemble

Le formulaire de réservation dispose maintenant de deux options d'envoi :
- **WhatsApp** : Envoie les informations formatées directement via WhatsApp
- **Email** : Ouvre le client email avec les informations pré-remplies

## Configuration requise

### 1. Configurer les informations de contact

Éditez le fichier `/src/config/contact.ts` :

```typescript
export const CONTACT_CONFIG = {
  // Numéro WhatsApp au format international (sans espaces ni caractères spéciaux)
  // Format: code pays + numéro (ex: 221771234567 pour le Sénégal)
  whatsappNumber: '221771234567', // À REMPLACER par votre vrai numéro
  
  // Email de contact pour les réservations
  email: 'contact@gogosolution.com', // À REMPLACER par votre vrai email
  
  // Nom de l'entreprise
  companyName: 'GOGOSOLUTION',
};
```

### 2. Numéro WhatsApp

Le numéro WhatsApp doit être au format international :
- **Sans** le signe `+`
- **Sans** espaces
- **Sans** tirets ou parenthèses
- Exemple pour le Sénégal : `221771234567` (221 = code pays, 771234567 = numéro)

### 3. Email

L'email sera utilisé comme destinataire par défaut pour les réservations par email.

## Fonctionnement

### Processus de réservation

1. L'utilisateur remplit le formulaire de réservation
2. À la dernière étape, deux boutons sont affichés :
   - **Réserver par WhatsApp** (bouton vert)
   - **Réserver par Email** (bouton secondaire)
3. Selon le choix :
   - **WhatsApp** : Ouvre WhatsApp Web/App avec un message pré-formaté
   - **Email** : Ouvre le client email avec le sujet et le corps pré-remplis
4. Un PDF de réservation est automatiquement téléchargé
5. Un message de confirmation s'affiche avec le numéro de réservation

### Format des messages

#### WhatsApp
Le message WhatsApp contient :
- Numéro de réservation
- Type de service
- Date et heure
- Itinéraire (départ/destination)
- Nombre de passagers
- Véhicule sélectionné
- Informations client
- Prix estimé

#### Email
L'email contient les mêmes informations dans un format texte structuré.

## Fichiers modifiés

- `/src/config/contact.ts` - Configuration des contacts (NOUVEAU)
- `/src/utils/bookingSubmission.ts` - Utilitaires d'envoi (NOUVEAU)
- `/src/components/modals/types.ts` - Types mis à jour
- `/src/components/modals/useBookingForm.ts` - Hook mis à jour
- `/src/components/modals/BookingModal.tsx` - Interface mise à jour

## Test

Pour tester :

1. Remplissez le formulaire de réservation
2. Arrivez à la dernière étape
3. Cliquez sur "Réserver par WhatsApp" :
   - Vérifiez que WhatsApp s'ouvre avec le bon numéro
   - Vérifiez que le message est correctement formaté
4. Cliquez sur "Réserver par Email" :
   - Vérifiez que votre client email s'ouvre
   - Vérifiez que le destinataire est correct
   - Vérifiez que le sujet et le corps sont pré-remplis

## Notes importantes

- Le PDF est toujours généré et téléchargé automatiquement
- Les utilisateurs peuvent re-télécharger le PDF depuis l'écran de confirmation
- Le numéro de réservation est unique et généré automatiquement
- Les messages sont encodés pour supporter les caractères spéciaux et accents
