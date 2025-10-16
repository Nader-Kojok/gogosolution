import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Actualités et Conseils Transport VTC Dakar',
  description: 'Découvrez nos articles sur le transport VTC à Dakar, conseils de voyage, actualités et guides pour vos déplacements au Sénégal.',
  openGraph: {
    title: 'Blog GOGOSOLUTION - Actualités Transport VTC Dakar',
    description: 'Articles, conseils et actualités sur le transport premium à Dakar',
  },
};

// Articles de blog (à remplacer par une vraie base de données)
const blogPosts = [
  {
    id: 1,
    slug: 'transfert-aeroport-dakar-guide-complet',
    title: 'Guide Complet du Transfert Aéroport à Dakar',
    excerpt: 'Tout ce que vous devez savoir pour un transfert aéroport réussi depuis l\'aéroport international Blaise Diagne vers Dakar.',
    category: 'Guides',
    date: '2025-01-15',
    image: '/blog/airport-transfer.jpg',
    readTime: '5 min',
  },
  {
    id: 2,
    slug: 'choisir-vtc-dakar-conseils',
    title: '5 Conseils pour Choisir le Meilleur VTC à Dakar',
    excerpt: 'Découvrez les critères essentiels pour sélectionner un service de VTC fiable et professionnel à Dakar.',
    category: 'Conseils',
    date: '2025-01-10',
    image: '/blog/choose-vtc.jpg',
    readTime: '4 min',
  },
  {
    id: 3,
    slug: 'transport-entreprise-dakar-avantages',
    title: 'Les Avantages du Transport d\'Entreprise à Dakar',
    excerpt: 'Pourquoi les entreprises de Dakar choisissent GOGOSOLUTION pour leurs déplacements professionnels.',
    category: 'Entreprises',
    date: '2025-01-05',
    image: '/blog/corporate-transport.jpg',
    readTime: '6 min',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog GOGOSOLUTION
            </h1>
            <p className="text-xl text-green-50">
              Actualités, conseils et guides pour vos déplacements à Dakar
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">
                    Image à venir
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-green-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                    >
                      Lire plus
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-6 py-4">
              <p className="text-green-800 font-medium">
                📝 Plus d&apos;articles à venir prochainement !
              </p>
              <p className="text-green-600 text-sm mt-1">
                Revenez régulièrement pour découvrir nos nouveaux contenus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Besoin d&apos;un Transport Premium ?
          </h2>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant votre VTC avec GOGOSOLUTION et profitez d&apos;un service de qualité
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Réserver Maintenant
          </Link>
        </div>
      </section>
    </main>
  );
}
