export const categories = [
  {
    id: "led-strips",
    name: "LED Strips",
    summary: "Flexible linear lighting for coves, shelves, signage, counters, and interior accents.",
  },
  {
    id: "led-bulbs",
    name: "LED Bulbs",
    summary: "Efficient replacement lighting for offices, retail interiors, hospitality, and homes.",
  },
  {
    id: "decorative-led",
    name: "Decorative LED",
    summary: "Ambient lighting options for brand spaces, displays, and commercial decoration.",
  },
];

export const products = [
  {
    slug: "flexline-led-strip",
    name: "FlexLine LED Strip",
    category: "led-strips",
    categoryName: "LED Strips",
    image:
      "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A flexible LED strip designed for clean indoor accent lighting, display shelves, counters, and ceiling coves.",
    features: [
      "Smooth linear illumination for decorative interiors",
      "Cuttable flexible format for varied installation lengths",
      "Warm, neutral, and cool white options",
      "Low-profile design for concealed mounting",
    ],
    specs: {
      "Typical voltage": "12V / 24V options",
      "Color temperature": "3000K / 4000K / 6000K",
      "Application": "Indoor decorative lighting",
      "Mounting": "Adhesive backing or channel mounting",
    },
    applications: ["Retail shelves", "Office coves", "Hotel counters", "Display furniture"],
  },
  {
    slug: "accent-led-bulb",
    name: "Accent LED Bulb",
    category: "led-bulbs",
    categoryName: "LED Bulbs",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    summary:
      "An efficient LED bulb range for comfortable indoor lighting in offices, shops, and hospitality spaces.",
    features: [
      "Energy-saving replacement for traditional bulbs",
      "Comfortable brightness for everyday interiors",
      "Multiple wattage and color temperature choices",
      "Suitable for commercial and residential use",
    ],
    specs: {
      "Typical wattage": "5W / 7W / 9W / 12W",
      "Base options": "E27 / B22 options",
      "Color temperature": "3000K / 4000K / 6500K",
      "Application": "Indoor general lighting",
    },
    applications: ["Offices", "Retail stores", "Restaurants", "Apartments"],
  },
  {
    slug: "decor-led-panel",
    name: "Decor LED Panel",
    category: "decorative-led",
    categoryName: "Decorative LED",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A clean decorative panel option for projects that need balanced light, slim profiles, and modern interiors.",
    features: [
      "Slim visual profile for commercial interiors",
      "Even light distribution for comfortable rooms",
      "Simple installation and maintenance",
      "Cost-conscious option for larger projects",
    ],
    specs: {
      "Form factor": "Panel / surface lighting options",
      "Color temperature": "3000K / 4000K / 6000K",
      "Application": "Indoor decorative and general lighting",
      "Best for": "Commercial fit-out projects",
    },
    applications: ["Showrooms", "Conference rooms", "Reception areas", "Studios"],
  },
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category) {
  if (!category || category === "all") return products;
  return products.filter((product) => product.category === category);
}
