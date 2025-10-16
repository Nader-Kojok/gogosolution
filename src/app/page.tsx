import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Fleet from "@/components/sections/Fleet";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";
import BookingClientWrapper from "@/components/BookingClientWrapper";
import Stats from "@/components/sections/Stats";
import Products from "@/components/sections/Products";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Services />
      <Fleet />
      <Pricing />
      <Products />
      <About />
      <Stats />
      <Testimonials />
      <FAQ />
      <Contact />
      <BookingClientWrapper />
    </main>
  );
}
