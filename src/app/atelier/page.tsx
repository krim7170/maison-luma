"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CustomCursor } from "../../../components/ui/cursor";
import { Navbar } from "../../../components/ui/navbar";
import { Footer } from "../../../components/ui/footer";

const timeline = [
  { year: "2012", title: "Fondation", desc: "Création de Maison Luma dans un atelier du 11e arrondissement de Paris. La vision : marier le teck indonésien et les savoir-faire européens." },
  { year: "2015", title: "Premier Showroom", desc: "Ouverture du showroom parisien. Les premières collections outdoor reçoivent un accueil enthousiaste des architectes d'intérieur." },
  { year: "2018", title: "Certification FSC", desc: "Transition complète vers le teck FSC certifié. Partenariats avec des forêts gérées durablement en Indonésie et au Brésil." },
  { year: "2021", title: "Sunbrella® Partner", desc: "Maison Luma devient partenaire officiel Sunbrella®. L'intégralité de nos tissus outdoor répond aux plus hautes normes de résistance." },
  { year: "2024", title: "Édition Limitée", desc: "Lancement de la Collection 2024 : 12 pièces exclusives, numérotées et signées par notre équipe d'artisans." },
];

const team = [
  {
    name: "Antoine Lefèvre",
    role: "Fondateur & Directeur Artistique",
    bio: "Architecte d'intérieur de formation, Antoine a voulu créer des meubles qui résistent autant au temps qu'aux intempéries.",
    initials: "AL",
  },
  {
    name: "Sara Vidal",
    role: "Maître Ébéniste",
    bio: "20 ans de métier, spécialiste des assemblages traditionnels japonais. Sara supervise chaque joint, chaque finition.",
    initials: "SV",
  },
  {
    name: "Marco Di Luca",
    role: "Responsable Textile",
    bio: "Formé chez un sellier lyonnais, Marco choisit, coupe et assemble chaque tissu Sunbrella® à la main.",
    initials: "MD",
  },
];

const values = [
  { label: "Durabilité", desc: "Chaque décision de production est guidée par l'impact environnemental à long terme." },
  { label: "Précision", desc: "Aucune pièce ne quitte l'atelier sans une vérification minutieuse de chaque assemblage." },
  { label: "Intemporalité", desc: "Nous refusons les tendances éphémères. Nos designs sont conçus pour traverser les décennies." },
];

export default function AtelierPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen pt-20">
        {/* Hero */}
        <div
          ref={heroRef}
          className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-end"
        >
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600"
            alt="L'atelier Maison Luma"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-14 w-full"
          >
            <span
              className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              PARIS — DEPUIS 2012
            </span>
            <h1
              className="font-display font-bold text-white uppercase"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
            >
              L&apos;Atelier
            </h1>
          </motion.div>
        </div>

        {/* Timeline */}
        <section ref={timelineRef} className="py-24 md:py-36 border-t border-[#1a1a1a]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <span
                className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                NOTRE HISTOIRE
              </span>
              <h2
                className="font-display font-bold text-white uppercase"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
              >
                La Chronologie
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={timelineInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="absolute left-[90px] md:left-[120px] top-0 bottom-0 w-px bg-[#2a2a2a] origin-top"
              />

              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -30 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.12 + 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-8 md:gap-12 items-start"
                  >
                    <div className="w-[90px] md:w-[120px] shrink-0 text-right">
                      <span
                        className="text-[#c4a882] font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}
                      >
                        {item.year}
                      </span>
                    </div>
                    {/* Dot */}
                    <div className="relative flex-none">
                      <div className="w-2 h-2 rounded-full bg-[#ff3c00] mt-1 relative z-10" />
                    </div>
                    <div className="pb-4">
                      <h3 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process images */}
        <section className="py-8 md:py-12 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Process ${i + 1}`}
                    fill
                    className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                    sizes="33vw"
                    unoptimized
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section ref={teamRef} className="py-24 md:py-36 border-t border-[#1a1a1a]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <span
                className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                LES ARTISANS
              </span>
              <h2
                className="font-display font-bold text-white uppercase"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
              >
                Notre Équipe
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[#1a1a1a] p-8 hover:border-[#2a2a2a] transition-colors"
                >
                  <div
                    className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center font-display font-bold text-[#c4a882] text-lg mb-6"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-display text-white text-sm font-bold uppercase tracking-wide mb-1">
                    {member.name}
                  </h3>
                  <p
                    className="text-[#ff3c00] text-[10px] tracking-[0.2em] uppercase mb-4"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {member.role}
                  </p>
                  <p className="text-[#666] text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          ref={valuesRef}
          className="py-24 bg-[#050505] border-t border-[#1a1a1a]"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-14 text-center"
            >
              <h2
                className="font-display font-bold text-white uppercase"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
              >
                Nos Valeurs
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div className="w-px h-10 bg-[#ff3c00] mx-auto mb-6" />
                  <h3 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-3">
                    {v.label}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
