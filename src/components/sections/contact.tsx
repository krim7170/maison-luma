"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Nous contacter
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Parlons ensemble</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Pour toute demande de conseil, commande sur mesure ou partenariat, notre équipe est à
            votre écoute.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "contact@maisonluma.fr" },
              { icon: Phone, label: "Téléphone", value: "+33 1 42 60 XX XX" },
              { icon: MapPin, label: "Atelier", value: "12 Rue du Faubourg Saint-Honoré, Paris" },
            ].map(({ icon: Icon, label, value }) => (
              <Card key={label} className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-amber-700" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {["Nom", "Email"].map((field) => (
              <input
                key={field}
                type={field === "Email" ? "email" : "text"}
                placeholder={field}
                className="w-full border border-input rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            ))}
            <textarea
              placeholder="Votre message"
              rows={4}
              className="w-full border border-input rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background resize-none"
            />
            <Button type="submit" className="w-full">
              Envoyer le message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
