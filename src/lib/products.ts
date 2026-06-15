export interface Product {
  slug: string;
  name: string;
  source: string;
  category: string;
  desc: string;
  longDesc: string;
  image: string;
  price: number;
  unit: string;
  weight: string;
  benefits: string[];
  brand: "amoohaa" | "powerpulz" | "harvestvita";
  powerpulzUrl?: string;
  tags: string[];
  nutritionHighlights: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    slug: "artisanal-makhana",
    name: "Artisanal Makhana",
    source: "Bihar — Makhana Belt",
    category: "Superfoods",
    desc: "Air-puffed lotus seeds, harvested by hand from freshwater lakes and sun-dried for peak crunch.",
    longDesc:
      "Our Artisanal Makhana is sourced exclusively from the freshwater lakes of Bihar, India's premier Makhana Belt. Each lotus seed is harvested by hand, sun-dried naturally, and air-puffed to achieve the signature light, crunchy texture. Rich in protein, low in fat, and packed with antioxidants — a true superfood with centuries of tradition behind it.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
    price: 349,
    unit: "pack",
    weight: "200g",
    benefits: [
      "High in plant protein",
      "Low glycaemic index",
      "Rich in antioxidants",
      "Gluten-free & vegan",
    ],
    brand: "amoohaa",
    tags: ["Superfoods", "Snacks", "Protein"],
    nutritionHighlights: [
      { label: "Protein", value: "9.7g / 100g" },
      { label: "Fat", value: "0.1g / 100g" },
      { label: "Carbs", value: "76g / 100g" },
      { label: "Calories", value: "347 kcal / 100g" },
    ],
  },
  {
    slug: "heritage-almonds",
    name: "Heritage Almonds",
    source: "Kashmir Valley",
    category: "Nuts",
    desc: "Cold-climate almonds with a rich, buttery depth from altitude-grown orchards in the valley.",
    longDesc:
      "Grown at altitude in the pristine orchards of Kashmir Valley, our Heritage Almonds develop a richer, butterier flavour than plains-grown varieties. Slow cold-climate maturation results in a denser nutrition profile — higher vitamin E, more omega-9, and a superior crunch. Sourced directly from family orchards with traceable harvest lots.",
    image:
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
    price: 599,
    unit: "pack",
    weight: "250g",
    benefits: [
      "High in Vitamin E",
      "Rich in healthy fats",
      "Heart-friendly",
      "Source of magnesium",
    ],
    brand: "amoohaa",
    tags: ["Nuts", "Heart Health", "Snacks"],
    nutritionHighlights: [
      { label: "Protein", value: "21g / 100g" },
      { label: "Fat", value: "50g / 100g" },
      { label: "Vitamin E", value: "26mg / 100g" },
      { label: "Calories", value: "579 kcal / 100g" },
    ],
  },
  {
    slug: "black-chia-gold",
    name: "Black Chia Gold",
    source: "Rajasthan Harvest",
    category: "Seeds",
    desc: "Dense omega-3 profile from sun-intensive Rajasthani soil. Clean, neutral flavour for any format.",
    longDesc:
      "Cultivated under the intense Rajasthani sun, our Black Chia Gold seeds carry one of the highest omega-3 concentrations available in plant-based ingredients. The dry, alkaline soil gives these seeds a uniquely clean, neutral flavour that integrates seamlessly into smoothies, bakes, or beverages. FSSAI tested for every batch.",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
    price: 299,
    unit: "pack",
    weight: "250g",
    benefits: [
      "Highest omega-3 in plant foods",
      "Excellent fibre source",
      "Complete amino acids",
      "Supports gut health",
    ],
    brand: "powerpulz",
    powerpulzUrl: "https://power-pulz.vercel.app/",
    tags: ["Seeds", "Omega-3", "Gut Health"],
    nutritionHighlights: [
      { label: "Protein", value: "16.5g / 100g" },
      { label: "Omega-3", value: "17.5g / 100g" },
      { label: "Fibre", value: "34g / 100g" },
      { label: "Calories", value: "486 kcal / 100g" },
    ],
  },
  {
    slug: "mountain-walnuts",
    name: "Mountain Walnuts",
    source: "Kashmir Groves",
    category: "Nuts",
    desc: "Hand-cracked Kashmiri walnuts with warm, earthy notes from slow mountain maturation.",
    longDesc:
      "Our Mountain Walnuts are sourced from high-altitude Kashmiri groves where long, cool summers allow the kernels to develop complex flavour and superior oil content. Hand-cracked and sorted to preserve whole kernel integrity, they deliver the distinctive warm, earthy character that mass-produced walnuts simply cannot match.",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
    price: 649,
    unit: "pack",
    weight: "200g",
    benefits: [
      "Brain-boosting DHA",
      "Anti-inflammatory omega-3",
      "Rich in melatonin",
      "Supports cognitive health",
    ],
    brand: "amoohaa",
    tags: ["Nuts", "Brain Health", "Omega-3"],
    nutritionHighlights: [
      { label: "Protein", value: "15.2g / 100g" },
      { label: "Omega-3", value: "9g / 100g" },
      { label: "Fat", value: "65g / 100g" },
      { label: "Calories", value: "654 kcal / 100g" },
    ],
  },
  {
    slug: "emerald-pepitas",
    name: "Emerald Pepitas",
    source: "Rajasthan Estates",
    category: "Seeds",
    desc: "Premium pumpkin seeds, cold-cleaned and sorted for consistent size, colour, and oil content.",
    longDesc:
      "Harvested from select Rajasthan estates, our Emerald Pepitas are cold-cleaned and triple-sorted by size and colour for exceptional consistency. Their vivid green hue signals high chlorophyll and zinc content — qualities our B2B partners in the food manufacturing sector rely on for premium product formulation.",
    image:
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
    price: 349,
    unit: "pack",
    weight: "200g",
    benefits: [
      "Excellent zinc source",
      "Rich in magnesium",
      "Supports prostate health",
      "Plant-based iron",
    ],
    brand: "powerpulz",
    powerpulzUrl: "https://power-pulz.vercel.app/",
    tags: ["Seeds", "Zinc", "Minerals"],
    nutritionHighlights: [
      { label: "Protein", value: "19g / 100g" },
      { label: "Zinc", value: "7.8mg / 100g" },
      { label: "Magnesium", value: "262mg / 100g" },
      { label: "Calories", value: "559 kcal / 100g" },
    ],
  },
  {
    slug: "prime-flax-seeds",
    name: "Prime Flax Seeds",
    source: "Punjab Fields",
    category: "Grains",
    desc: "Golden and brown flax from high-yield Punjab farms. Ideal for fortified food.",
    longDesc:
      "Our Prime Flax Seeds come from carefully managed Punjab farms that prioritise soil health and nutrient density. Available in golden and brown varieties, they carry a consistent lignan and ALA omega-3 profile suitable for direct consumption or food fortification. Each batch is FSSAI-compliant and third-party tested for purity.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    price: 199,
    unit: "pack",
    weight: "400g",
    benefits: [
      "Highest plant lignan source",
      "ALA omega-3 fatty acids",
      "Digestive health support",
      "Heart-protective",
    ],
    brand: "powerpulz",
    powerpulzUrl: "https://power-pulz.vercel.app/",
    tags: ["Grains", "Omega-3", "Digestive Health"],
    nutritionHighlights: [
      { label: "Protein", value: "18.3g / 100g" },
      { label: "ALA Omega-3", value: "22.8g / 100g" },
      { label: "Fibre", value: "27g / 100g" },
      { label: "Calories", value: "534 kcal / 100g" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
