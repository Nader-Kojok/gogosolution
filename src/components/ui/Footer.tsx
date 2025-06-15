import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full py-6 flex justify-center items-center bg-gray-50 border-t mt-12">
    <span className="text-sm text-gray-600">
      Développé avec <span role="img" aria-label="coeur vert" className="mx-1 align-middle">💚</span> par{' '}
      <a
        href="https://agencearcane.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 font-semibold hover:underline"
      >
        Agence Arcane
      </a>
    </span>
  </footer>
);

export { Footer }; 