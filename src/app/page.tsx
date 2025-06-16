import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Fleet from "@/components/sections/Fleet";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";
import BookingClientWrapper from "@/components/BookingClientWrapper";
import Stats from "@/components/sections/Stats";
import Products from "@/components/sections/Products";

export default function Home() {
  // TODO: Gérer l'ouverture de la modal Booking côté client (via un composant client wrapper)
  return (
    <main className="relative">
      <Hero />
      <Services />
      <Fleet />
      <Products />
      <About />
      <Stats />
      <Testimonials />
      <Contact />
      {/* Les boutons et modals interactifs doivent être gérés dans un composant client wrapper */}
      <BookingClientWrapper />
    </main>
  );
}
