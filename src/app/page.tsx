import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Collection } from "@/components/sections/collection";
import { About } from "@/components/sections/about";
import { Artisans } from "@/components/sections/artisans";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Collection />
      <About />
      <Artisans />
      <Contact />
      <Footer />
    </main>
  );
}
