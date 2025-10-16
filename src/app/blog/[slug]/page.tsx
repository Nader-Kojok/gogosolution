import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Types
type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
};

// Articles de blog (à remplacer par une vraie base de données)
const blogPosts: Record<string, BlogPost> = {
  'transfert-aeroport-dakar-guide-complet': {
    slug: 'transfert-aeroport-dakar-guide-complet',
    title: 'Guide Complet du Transfert Aéroport à Dakar',
    excerpt: 'Tout ce que vous devez savoir pour un transfert aéroport réussi depuis l\'aéroport international Blaise Diagne vers Dakar.',
    category: 'Guides',
    date: '2025-01-15',
    author: 'GOGOSOLUTION',
    readTime: '5 min',
    content: `
# Guide Complet du Transfert Aéroport à Dakar

L'aéroport international Blaise Diagne (AIBD) est situé à environ 50 km de Dakar. Un transfert bien organisé est essentiel pour commencer votre séjour dans les meilleures conditions.

## Pourquoi Choisir un VTC pour votre Transfert Aéroport ?

### 1. Confort et Sécurité
Nos véhicules premium sont climatisés, spacieux et parfaitement entretenus. Vous voyagez dans un confort optimal après votre vol.

### 2. Prix Fixe Garanti
Contrairement aux taxis traditionnels, nos tarifs sont fixes et transparents. Pas de mauvaises surprises à l'arrivée.

### 3. Chauffeur Professionnel
Nos chauffeurs sont expérimentés, ponctuels et connaissent parfaitement les routes de Dakar. Ils vous accueillent avec une pancarte à votre nom.

### 4. Disponibilité 24/7
Que votre vol arrive à 3h du matin ou à minuit, nous sommes toujours disponibles pour vous accueillir.

## Comment Réserver votre Transfert ?

1. **Réservez en ligne** - Utilisez notre formulaire de réservation
2. **Confirmez les détails** - Numéro de vol, heure d'arrivée, nombre de passagers
3. **Recevez la confirmation** - Vous recevez tous les détails par email/SMS
4. **Profitez du trajet** - Votre chauffeur vous attend à l'aéroport

## Tarifs Transfert Aéroport

- **Berline (1-3 passagers)** : À partir de 25 000 FCFA
- **SUV (1-6 passagers)** : À partir de 35 000 FCFA
- **Van (7+ passagers)** : Sur devis

## Conseils Pratiques

- Réservez au moins 24h à l'avance
- Communiquez votre numéro de vol pour un suivi en temps réel
- Prévoyez 45-60 minutes de trajet selon le trafic
- Nos chauffeurs vous aident avec vos bagages

## Réservez Maintenant

Ne laissez pas le stress du transport gâcher votre arrivée à Dakar. Réservez dès maintenant votre transfert aéroport avec GOGOSOLUTION.

[Réserver un Transfert](#contact)
    `,
  },
  'choisir-vtc-dakar-conseils': {
    slug: 'choisir-vtc-dakar-conseils',
    title: '5 Conseils pour Choisir le Meilleur VTC à Dakar',
    excerpt: 'Découvrez les critères essentiels pour sélectionner un service de VTC fiable et professionnel à Dakar.',
    category: 'Conseils',
    date: '2025-01-10',
    author: 'GOGOSOLUTION',
    readTime: '4 min',
    content: `
# 5 Conseils pour Choisir le Meilleur VTC à Dakar

Choisir un service de VTC fiable à Dakar est crucial pour vos déplacements. Voici nos 5 conseils essentiels.

## 1. Vérifiez la Réputation

Consultez les avis clients sur Google, Facebook et autres plateformes. Une entreprise sérieuse a des avis positifs et répond aux commentaires.

## 2. Assurez-vous de la Transparence des Tarifs

Un bon VTC affiche clairement ses tarifs. Méfiez-vous des prix trop bas qui cachent souvent des frais supplémentaires.

## 3. Examinez la Flotte de Véhicules

Des véhicules récents, propres et bien entretenus sont le signe d'un service de qualité. Demandez des photos de la flotte.

## 4. Vérifiez les Assurances

Tous les véhicules doivent être assurés. C'est votre sécurité qui est en jeu. N'hésitez pas à demander les justificatifs.

## 5. Testez le Service Client

Contactez le service avant de réserver. La réactivité et le professionnalisme sont des indicateurs clés de qualité.

## Pourquoi GOGOSOLUTION ?

Chez GOGOSOLUTION, nous cochons toutes ces cases :
- ⭐ Excellents avis clients
- 💰 Tarifs transparents et compétitifs
- 🚗 Flotte premium récente
- 🛡️ Assurances complètes
- 📞 Service client réactif 24/7

[Découvrir nos Services](#services)
    `,
  },
  'transport-entreprise-dakar-avantages': {
    slug: 'transport-entreprise-dakar-avantages',
    title: 'Les Avantages du Transport d\'Entreprise à Dakar',
    excerpt: 'Pourquoi les entreprises de Dakar choisissent GOGOSOLUTION pour leurs déplacements professionnels.',
    category: 'Entreprises',
    date: '2025-01-05',
    author: 'GOGOSOLUTION',
    readTime: '6 min',
    content: `
# Les Avantages du Transport d'Entreprise à Dakar

Le transport d'entreprise est devenu un élément clé de la productivité des sociétés à Dakar. Découvrez pourquoi.

## Optimisation du Temps

Vos collaborateurs peuvent travailler pendant les trajets grâce à nos véhicules confortables équipés de WiFi.

## Image Professionnelle

Accueillez vos clients et partenaires avec un service de transport premium qui reflète votre standing.

## Gestion Simplifiée

- Facturation mensuelle centralisée
- Reporting détaillé des courses
- Gestion des comptes utilisateurs
- Suivi en temps réel

## Économies Réalisées

Comparé à une flotte d'entreprise, nos services vous font économiser :
- Coûts d'achat et d'entretien des véhicules
- Salaires des chauffeurs
- Assurances et taxes
- Gestion administrative

## Flexibilité Totale

Adaptez le service selon vos besoins :
- Courses ponctuelles ou régulières
- Véhicules adaptés à chaque occasion
- Disponibilité 24/7
- Réservations de dernière minute

## Nos Forfaits Entreprise

Nous proposons des forfaits sur mesure pour les entreprises :
- Tarifs préférentiels
- Service prioritaire
- Compte dédié
- Support personnalisé

[Demander un Devis Entreprise](#contact)
    `,
  },
};

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} | Blog GOGOSOLUTION`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-green-600 hover:text-green-700">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/blog" className="text-green-600 hover:text-green-700">
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-1 rounded-full">
                {post.category}
              </span>
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-sm text-gray-500">• {post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Service de Transport Premium</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prêt à Réserver ?
              </h3>
              <p className="text-green-50 mb-6">
                Profitez dès maintenant de nos services de transport premium à Dakar
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
              >
                Réserver Maintenant
              </Link>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour au Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
