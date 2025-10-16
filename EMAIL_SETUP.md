# 📧 Configuration de l'Envoi d'Emails

Ce guide explique comment configurer le système d'envoi d'emails automatique pour les réservations.

## 🎯 Fonctionnalités

- ✅ Envoi automatique d'emails via API (pas de client email)
- ✅ Template HTML professionnel avec React Email
- ✅ Design responsive et moderne avec Tailwind CSS
- ✅ Gratuit jusqu'à 3000 emails/mois avec Resend

## 📋 Prérequis

1. Un compte Resend (gratuit)
2. Un domaine vérifié (ou utiliser le domaine de test)

## 🚀 Configuration Étape par Étape

### 1. Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit
3. Confirmez votre email

### 2. Obtenir une clé API

1. Connectez-vous à votre dashboard Resend
2. Allez dans **API Keys** : [https://resend.com/api-keys](https://resend.com/api-keys)
3. Cliquez sur **Create API Key**
4. Donnez-lui un nom (ex: "GOGOSOLUTION Production")
5. Copiez la clé (elle commence par `re_`)

### 3. Configurer les variables d'environnement

1. Créez un fichier `.env.local` à la racine du projet :
```bash
cp .env.example .env.local
```

2. Ajoutez votre clé API :
```env
RESEND_API_KEY=re_votre_cle_api_ici
```

### 4. Vérifier votre domaine (IMPORTANT)

#### Option A : Utiliser le domaine de test (développement)

Par défaut, Resend vous permet d'envoyer des emails depuis `onboarding@resend.dev` vers votre propre email pour tester.

**Limitation** : Vous ne pouvez envoyer qu'à votre propre email vérifié.

#### Option B : Vérifier votre propre domaine (production)

1. Allez dans **Domains** : [https://resend.com/domains](https://resend.com/domains)
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `gogosolution.sn`)
4. Suivez les instructions pour ajouter les enregistrements DNS :
   - **SPF** (TXT)
   - **DKIM** (TXT)
   - **DMARC** (TXT)

5. Attendez la vérification (peut prendre quelques minutes à 48h)

6. Une fois vérifié, mettez à jour le fichier API :

```typescript
// src/app/api/send-booking/route.ts
from: 'GOGOSOLUTION <reservations@gogosolution.sn>', // Votre domaine vérifié
```

### 5. Configurer Vercel (Production)

1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez :
   - **Name** : `RESEND_API_KEY`
   - **Value** : `re_votre_cle_api_ici`
   - **Environments** : Production, Preview, Development
4. Cliquez sur **Save**
5. Redéployez votre application

## 🧪 Tester l'envoi d'emails

### En local

1. Démarrez le serveur de développement :
```bash
npm run dev
```

2. Allez sur votre site : `http://localhost:3000`
3. Remplissez le formulaire de réservation
4. Cliquez sur **Réserver par Email**
5. Vérifiez votre boîte email (babambs@gogosolution.sn)

### En production

1. Déployez sur Vercel
2. Testez une réservation
3. Vérifiez la réception de l'email

## 📧 Template Email

Le template est situé dans : `src/emails/BookingConfirmation.tsx`

### Personnalisation

Vous pouvez modifier :
- Les couleurs (classes Tailwind)
- Le logo (ajoutez une image)
- Le texte
- La structure

Exemple pour ajouter un logo :

```tsx
import { Img } from '@react-email/components';

// Dans le template
<Img
  src="https://votredomaine.com/logo.png"
  alt="GOGOSOLUTION"
  width="150"
  height="50"
/>
```

## 🎨 Prévisualiser les emails

Pour voir le rendu du template pendant le développement :

1. Installez React Email CLI :
```bash
npm install react-email -D
```

2. Ajoutez ce script dans `package.json` :
```json
"scripts": {
  "email": "email dev --dir src/emails"
}
```

3. Lancez le serveur de prévisualisation :
```bash
npm run email
```

4. Ouvrez : `http://localhost:3000`

## 🔧 Dépannage

### Erreur : "API key is invalid"
- Vérifiez que la clé commence par `re_`
- Vérifiez qu'elle est bien dans `.env.local`
- Redémarrez le serveur de développement

### Erreur : "Domain not verified"
- Vérifiez que votre domaine est vérifié sur Resend
- En développement, utilisez `onboarding@resend.dev`

### Les emails n'arrivent pas
- Vérifiez les spams
- Vérifiez les logs Resend : [https://resend.com/logs](https://resend.com/logs)
- Vérifiez que l'email de destination est correct

### Erreur 500 sur l'API
- Vérifiez les logs dans la console Vercel
- Vérifiez que la variable d'environnement est bien configurée

## 📊 Limites du plan gratuit

- **3000 emails/mois** gratuits
- **100 emails/jour** maximum
- Envoi uniquement depuis des domaines vérifiés

Pour plus d'emails, consultez les plans payants : [https://resend.com/pricing](https://resend.com/pricing)

## 📚 Ressources

- [Documentation Resend](https://resend.com/docs)
- [Documentation React Email](https://react.email/docs)
- [Exemples de templates](https://react.email/examples)
- [Support Resend](https://resend.com/support)

## ✅ Checklist de déploiement

- [ ] Compte Resend créé
- [ ] Clé API obtenue
- [ ] Variable d'environnement configurée localement
- [ ] Test d'envoi réussi en local
- [ ] Domaine vérifié sur Resend
- [ ] Email "from" mis à jour avec votre domaine
- [ ] Variable d'environnement configurée sur Vercel
- [ ] Test d'envoi réussi en production
- [ ] Emails reçus correctement

---

**Besoin d'aide ?** Consultez la [documentation Resend](https://resend.com/docs) ou contactez leur support.
