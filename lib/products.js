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
    image: "/products/led-application-collage.jpg",
    gallery: [
      {
        src: "/products/led-application-collage.jpg",
        alt: "LED strip lighting used under cabinets, on stairs, and in a ceiling cove",
      },
      {
        src: "/products/generated-undercabinet-led-strip.png",
        alt: "Generated product scene of an under-cabinet LED strip installation",
      },
      {
        src: "/products/silver-led-channel-profile.jpg",
        alt: "Silver aluminum LED channel profile with diffuser",
      },
      {
        src: "/products/aluminum-strip-channel-leds.jpg",
        alt: "Aluminum LED strip channel with visible LED tape",
      },
    ],
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
    image: "/products/warm-wall-light-bars.jpg",
    gallery: [
      {
        src: "/products/warm-wall-light-bars.jpg",
        alt: "Warm vertical LED light bars mounted on a display wall",
      },
      {
        src: "/products/rgb-tube-triangle.jpg",
        alt: "RGB LED tube lights arranged as a triangular display",
      },
      {
        src: "/products/recessed-linear-profile-wall.jpg",
        alt: "Recessed linear LED profile for wall panel lighting",
      },
    ],
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
    image: "/products/custom-neon-sign-upscaled.png",
    gallery: [
      {
        src: "/products/custom-neon-sign-upscaled.png",
        alt: "Custom neon sign glowing in blue and pink against a city night backdrop",
      },
      {
        src: "/products/flexible-white-neon-loop.jpg",
        alt: "Flexible white neon LED tube bent into loops on a dark surface",
      },
      {
        src: "/products/neon-pendant-installation.jpg",
        alt: "Decorative flexible neon LED pendant installation",
      },
      {
        src: "/products/rgb-neon-top-bending.jpg",
        alt: "RGB flexible neon strip showing top bending color effects",
      },
      {
        src: "/products/generated-flex-neon-showroom.png",
        alt: "Generated product scene of flexible neon strip lighting in a showroom",
      },
      {
        src: "/products/generated-recessed-led-profile.png",
        alt: "Generated close-up of recessed aluminum LED profile lighting",
      },
      {
        src: "/products/profile-dimension-diagram.jpg",
        alt: "LED profile product dimension diagram",
      },
    ],
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
