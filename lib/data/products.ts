export type ProductConfig = {
  color: string;
  label: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "canapes" | "chaises" | "tables";
  price: number;
  image: string;
  images: string[];
  description: string;
  details: {
    dimensions: string;
    materials: string;
    maintenance: string;
    delivery: string;
  };
  configs: ProductConfig[];
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "canape-oural-xl",
    name: "Canapé Oural XL",
    subtitle: "Modulaire 7 places",
    category: "canapes",
    price: 8490,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    ],
    description:
      "Le Canapé Oural XL redéfinit l'art de vivre en extérieur. Sa structure en teck massif FSC certifié s'associe à des coussins en tissu Sunbrella® pour une résistance aux intempéries sans compromis sur le confort.",
    details: {
      dimensions: "L 320 × P 95 × H 70 cm — Profondeur assise : 62 cm",
      materials: "Structure : Teck massif FSC certifié — Coussins : Tissu Sunbrella® Grade A — Pieds : Inox brossé",
      maintenance: "Nettoyage tissu : eau savonneuse, rincer. Teck : huile de teck 1× /an. Stockage en hivernage recommandé.",
      delivery: "Livraison sur rendez-vous sous 6–8 semaines. Montage inclus en Île-de-France. Livraison nationale disponible.",
    },
    configs: [
      { color: "sable", label: "Sable", hex: "#c4a882" },
      { color: "anthracite", label: "Anthracite", hex: "#3a3a3a" },
      { color: "blanc", label: "Blanc Ivoire", hex: "#f0ece4" },
      { color: "terracotta", label: "Terracotta", hex: "#b85c38" },
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "meridienne-bora",
    name: "Méridienne Bora",
    subtitle: "Chaise longue",
    category: "chaises",
    price: 3290,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
    ],
    description:
      "La Méridienne Bora célèbre la flânerie. Sa silhouette épurée, inspirée des loungers des grandes villas méditerranéennes, offre une position d'allongement parfaite grâce à son inclinaison étudiée.",
    details: {
      dimensions: "L 195 × P 70 × H 35 cm — Hauteur dossier : 65 cm",
      materials: "Structure : Teck massif FSC certifié — Matelas : Mousse HR 40kg + Sunbrella® — Sangles : Élastique marine",
      maintenance: "Coussin amovible et lavable. Structure teck : entretien annuel recommandé.",
      delivery: "Sous 4–6 semaines. Livraison montée disponible.",
    },
    configs: [
      { color: "sable", label: "Sable", hex: "#c4a882" },
      { color: "anthracite", label: "Anthracite", hex: "#3a3a3a" },
      { color: "blanc", label: "Blanc Ivoire", hex: "#f0ece4" },
      { color: "vert", label: "Vert Olivier", hex: "#6b7c5c" },
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "set-ilot",
    name: "Set Îlot",
    subtitle: "Configuration U",
    category: "canapes",
    price: 12900,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
    ],
    description:
      "Le Set Îlot est notre pièce maîtresse. Configuration en U autour d'une table basse intégrée, il crée un espace de convivialité total, protégé du vent grâce à ses dossiers hauts structurants.",
    details: {
      dimensions: "Emprise au sol : 420 × 320 cm — Table basse : 120 × 60 × 30 cm",
      materials: "Teck massif + Coussins Sunbrella® Grade A — Table : Plateau verre trempé 10mm",
      maintenance: "Coussins déhoussables et lavables. Verre : produit non abrasif.",
      delivery: "Délai 8–10 semaines. Livraison et installation incluses France métropolitaine.",
    },
    configs: [
      { color: "sable", label: "Sable", hex: "#c4a882" },
      { color: "anthracite", label: "Anthracite", hex: "#3a3a3a" },
      { color: "blanc", label: "Blanc Ivoire", hex: "#f0ece4" },
      { color: "terracotta", label: "Terracotta", hex: "#b85c38" },
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "table-solstice",
    name: "Table Solstice",
    subtitle: "Table basse outdoor",
    category: "tables",
    price: 1890,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
    ],
    description:
      "La Table Solstice allie la chaleur du teck massif à la légèreté du verre trempé. Sa forme organique s'intègre à toutes les configurations outdoor.",
    details: {
      dimensions: "L 120 × P 60 × H 32 cm",
      materials: "Structure teck massif — Plateau verre trempé sécurit 10mm",
      maintenance: "Verre : produit vitres non abrasif. Teck : huile annuelle.",
      delivery: "Sous 3–5 semaines.",
    },
    configs: [
      { color: "naturel", label: "Teck Naturel", hex: "#c4a882" },
      { color: "grise", label: "Teck Grisé", hex: "#888888" },
    ],
    featured: false,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getProductsByCategory = (category: Product["category"]): Product[] =>
  products.filter((p) => p.category === category);
