"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CustomCursor } from "../../../components/ui/cursor";
import { Navbar } from "../../../components/ui/navbar";
import { Footer } from "../../../components/ui/footer";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const fields = [
  { id: "name", label: "Nom complet", type: "text", placeholder: "Jean Dupont" },
  { id: "email", label: "Adresse email", type: "email", placeholder: "jean@email.fr" },
  { id: "phone", label: "Téléphone", type: "tel", placeholder: "+33 6 XX XX XX XX" },
] as const;

const projectTypes = [
  "Résidence principale",
  "Résidence secondaire",
  "Projet hôtelier / restaurant",
  "Projet architectural",
  "Autre",
] as const;

const infos = [
  { icon: MapPin, label: "Showroom", value: "12 Rue du Faubourg\nSaint-Honoré, Paris 8e" },
  { icon: Phone, label: "Téléphone", value: "+33 1 42 60 00 00" },
  { icon: Mail, label: "Email", value: "contact@maisonluma.fr" },
  { icon: Clock, label: "Horaires", value: "Lun–Ven: 9h–18h\nSam: 10h–17h" },
] as const;

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true });
  const [projectType, setProjectType] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen pt-20">
        {/* Hero */}
        <div
          ref={heroRef}
          className="border-b border-[#1a1a1a] py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-[10px] tracking-[0.4em] text-[#c4a882] uppercase block mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              PRENONS CONTACT
            </span>
            <h1
              className="font-display font-bold text-white uppercase"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
            >
              Contact
            </h1>
          </motion.div>
        </div>

        <div
          ref={formRef}
          className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-16 md:gap-24"
        >
          {/* Form */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#666] text-sm leading-relaxed mb-10"
            >
              Pour toute demande de conseil, projet sur-mesure ou visite du showroom,
              remplissez ce formulaire. Notre équipe vous répond sous 48h.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-[#ff3c00]/30 bg-[#ff3c00]/05 p-8 text-center"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                <p
                  className="text-[#c4a882] text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  MESSAGE ENVOYÉ
                </p>
                <p className="text-[#888] text-sm">Nous vous répondrons dans les 48 heures.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="space-y-5">
                  {fields.map((field, i) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                    >
                      <label
                        htmlFor={field.id}
                        className="block text-[9px] tracking-[0.3em] text-[#555] uppercase mb-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.id !== "phone"}
                        className="w-full bg-transparent border border-[#2a2a2a] px-4 py-3 text-sm text-[#e0e0e0] placeholder-[#444] focus:outline-none focus:border-[#555] transition-colors"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      />
                    </motion.div>
                  ))}

                  {/* Project type */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.54 }}
                  >
                    <label
                      className="block text-[9px] tracking-[0.3em] text-[#555] uppercase mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Type de projet
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className="text-[10px] px-3 py-2 border transition-all"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            borderColor: projectType === type ? "#ff3c00" : "#2a2a2a",
                            color: projectType === type ? "#fff" : "#555",
                            background: projectType === type ? "rgba(255,60,0,0.1)" : "transparent",
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.62 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-[9px] tracking-[0.3em] text-[#555] uppercase mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Décrivez votre projet, vos besoins, vos contraintes..."
                      required
                      className="w-full bg-transparent border border-[#2a2a2a] px-4 py-3 text-sm text-[#e0e0e0] placeholder-[#444] focus:outline-none focus:border-[#555] transition-colors resize-none"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    />
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 py-4 text-xs tracking-[0.25em] uppercase text-white border border-[#ff3c00] bg-[#ff3c00]/10 hover:bg-[#ff3c00] transition-all duration-300"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Envoyer le message
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-8">
            {infos.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-5 items-start border-b border-[#1a1a1a] pb-8"
                >
                  <div className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[#c4a882] shrink-0 mt-0.5">
                    <Icon size={14} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p
                      className="text-[9px] tracking-[0.3em] text-[#444] uppercase mb-1.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {info.label}
                    </p>
                    <p className="text-[#888] text-sm whitespace-pre-line">{info.value}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="overflow-hidden border border-[#1a1a1a] aspect-[16/9]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.3097857!3d48.8697222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc27b7f52fb%3A0x76a3a96fca3c558d!2sRue%20du%20Faubourg%20Saint-Honor%C3%A9%2C%20Paris!5e0!3m2!1sfr!2sfr!4v1600000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)", opacity: 0.7 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Showroom Maison Luma"
              />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
