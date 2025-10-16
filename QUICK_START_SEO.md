# ⚡ Quick Start SEO - 1 Heure pour Être Prêt

## 🚀 4 Étapes Rapides

### Étape 1: Images (30 min)
Créer 5 images dans `/public/`:

```
1. og-image.jpg (1200x630px)
2. twitter-image.jpg (1200x600px)  
3. icon-192.png (192x192px)
4. icon-512.png (512x512px)
5. apple-icon.png (180x180px)
```

**Outil rapide**: Canva.com (gratuit)
**Détails**: Voir `IMAGE_SPECS.md`

---

### Étape 2: Infos Réelles (10 min)

#### Dans `src/components/StructuredData.tsx`:

**Ligne 23** - Téléphone:
```tsx
"telephone": "+221-77-XXX-XXXX",  // ← Votre numéro
```

**Ligne 24** - Email:
```tsx
"email": "contact@votredomaine.com",  // ← Votre email
```

**Lignes 72-76** - Réseaux sociaux:
```tsx
"sameAs": [
  "https://www.facebook.com/votrepage",
  "https://www.instagram.com/votrepage",
  "https://twitter.com/votrepage"
]
```

---

### Étape 3: Domaine (10 min)

Remplacer `GOGOSOLUTION.com` dans:

1. **src/app/layout.tsx** (ligne 15)
2. **src/app/sitemap.ts** (ligne 4)
3. **src/components/StructuredData.tsx** (toutes les URLs)
4. **public/robots.txt** (ligne 7)

**Commande rapide**:
```bash
# Chercher toutes les occurrences
grep -r "GOGOSOLUTION.com" src/ public/
```

---

### Étape 4: Google Search Console (15 min)

1. **Créer compte**: https://search.google.com/search-console
2. **Ajouter propriété**: Votre domaine
3. **Vérifier**: Méthode HTML tag
4. **Copier code** de vérification
5. **Coller** dans `src/app/layout.tsx` ligne 76:
   ```tsx
   google: "votre-code-ici",
   ```
6. **Rebuild**: `npm run build`
7. **Déployer**
8. **Soumettre sitemap**: `https://votredomaine.com/sitemap.xml`

---

## ✅ Checklist Finale

Avant de déployer:

- [ ] 5 images créées et dans `/public/`
- [ ] Téléphone mis à jour
- [ ] Email mis à jour
- [ ] URLs réseaux sociaux ajoutées
- [ ] Domaine remplacé partout
- [ ] Google Search Console configuré
- [ ] Build réussi: `npm run build`
- [ ] Test local: `npm run dev`

---

## 🎯 Après Déploiement

### Jour 1
- [ ] Vérifier sitemap: `https://votredomaine.com/sitemap.xml`
- [ ] Vérifier robots: `https://votredomaine.com/robots.txt`
- [ ] Test Lighthouse (score > 90)
- [ ] Soumettre sitemap dans Search Console

### Semaine 1
- [ ] Créer Google My Business
- [ ] Publier 3 posts réseaux sociaux
- [ ] S'inscrire dans 3 annuaires locaux
- [ ] Vérifier indexation Google

---

## 📊 Tests Rapides

```bash
# Build
npm run build

# Test local
npm run dev

# Vérifier sitemap
curl http://localhost:3000/sitemap.xml

# Test Lighthouse
npx lighthouse https://votredomaine.com --view
```

---

## 🆘 Problèmes Courants

### Build échoue
```bash
# Nettoyer et rebuild
rm -rf .next
npm run build
```

### Images ne s'affichent pas
- Vérifier noms de fichiers (minuscules)
- Vérifier emplacement: `/public/`
- Vérifier dimensions exactes

### Sitemap vide
- Vérifier `src/app/sitemap.ts`
- Rebuild: `npm run build`
- Vérifier URL de base

---

## 📚 Documentation Complète

- **Guide détaillé**: `SEO_GUIDE.md`
- **Checklist complète**: `SEO_CHECKLIST.md`
- **Specs images**: `IMAGE_SPECS.md`
- **Résumé**: `SEO_SUMMARY.md`

---

## 🎉 C'est Tout!

En 1 heure, votre site sera **100% optimisé SEO** et prêt à être bien référencé sur Google! 🚀

**Questions?** Consultez `SEO_GUIDE.md` pour tous les détails.
