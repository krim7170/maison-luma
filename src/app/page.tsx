"use client";

import { CustomCursor } from "../../components/ui/cursor";
import { Navbar } from "../../components/ui/navbar";
import { HalideLanding } from "../../components/ui/halide-topo-hero";
import { Philosophy } from "../../components/ui/philosophy";
import { CollectionsGrid } from "../../components/ui/collections-grid";
import { SavoirFaire } from "../../components/ui/savoir-faire";
import { Gallery } from "../../components/ui/gallery";
import { ConfiguratorTeaser } from "../../components/ui/configurator-teaser";
import { Testimonials } from "../../components/ui/testimonials";
import { Footer } from "../../components/ui/footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HalideLanding
          title="MAISON"
          titleLine2="LUMA"
          subtitle="[ COLLECTION 2024 ]"
          tagline="MOBILIER OUTDOOR · ÉDITION LIMITÉE"
          ctaText="DÉCOUVRIR LA COLLECTION"
          onCtaClick={() => router.push("/collection")}
          coordLabel1="LATITUDE"
          coordValue1="43.2965° N"
          coordLabel2="MATIÈRE"
          coordValue2="TECK NATUREL"
          layer1Src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
          layer2Src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200"
          layer3Src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200"
        />
        <Philosophy />
        <CollectionsGrid />
        <SavoirFaire />
        <Gallery />
        <ConfiguratorTeaser />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
