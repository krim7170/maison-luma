export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold tracking-widest uppercase mb-4">Maison Luma</h3>
          <p className="text-sm text-background/60 leading-relaxed">
            L&apos;art de vivre à la française, réinventé pour les esprits contemporains.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-background/60">
            {["Collection", "À propos", "Artisans", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-background transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Contact</h4>
          <p className="text-sm text-background/60">contact@maisonluma.fr</p>
          <p className="text-sm text-background/60 mt-1">Paris, France</p>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-10 pt-6 border-t border-background/10 text-center text-xs text-background/40">
        © {new Date().getFullYear()} Maison Luma. Tous droits réservés.
      </div>
    </footer>
  );
}
