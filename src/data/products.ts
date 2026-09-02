import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "orange-no-9",
    name: "Orange No. 9",
    tagline: "House espresso · Brazil + Colombia",
    category: "blend",
    categoryLabel: "Espresso blend",
    price: 18.5,
    weight: "340 g",
    roast: 5,
    notes: ["Dark chocolate", "Brown sugar", "Toasted hazelnut"],
    origin: "Cerrado, Brazil + Huila, Colombia",
    process: "Pulped natural & washed",
    elevation: "1,100 – 1,750 m",
    varietal: "Mundo Novo · Castillo",
    description:
      "Our house espresso, built for milk but bold enough black. A pulped-natural Brazil and a washed Colombia, roasted deep and rested two full weeks so the sugars settle heavy and round in the cup.",
    roastersNote:
      "Pull it long, pour it slow — this is the cup that built our counter.",
    image:
      "https://image.qwenlm.ai/generated-images/4e9187cb-f5c4-4b3a-8ed4-62c37ba88aa1/_result.png",
    badge: "Best seller",
  },
  {
    id: "huila-dawn",
    name: "Huila Dawn",
    tagline: "Single origin · Huila, Colombia",
    category: "single-origin",
    categoryLabel: "Single origin",
    price: 21,
    weight: "250 g",
    roast: 3,
    notes: ["Caramel", "Red apple", "Panela"],
    origin: "Finca La Esperanza, Pitalito",
    process: "Washed, 18 hr fermentation",
    elevation: "1,750 m",
    varietal: "Caturra · Pink Bourbon",
    description:
      "From the Vergara family's finca outside Pitalito, picked at peak ripeness across two passes. A washed profile that drinks like sunlight through a kitchen window — clean, sweet, gently bright.",
    roastersNote:
      "The panela sweetness shows best just off boil — brew around 94 °C.",
    image:
      "https://image.qwenlm.ai/generated-images/768f7b9e-c5bd-42a5-b1c5-aad3228bcca8/_result.png",
    badge: "Harvest fresh",
  },
  {
    id: "yirgacheffe-light",
    name: "Yirgacheffe Light",
    tagline: "Single origin · Gedeo, Ethiopia",
    category: "single-origin",
    categoryLabel: "Single origin",
    price: 23,
    weight: "250 g",
    roast: 2,
    notes: ["Bergamot", "Wild blueberry", "Jasmine"],
    origin: "Gedeb smallholders, Gedeo Zone",
    process: "Natural, 21-day raised beds",
    elevation: "1,900 – 2,200 m",
    varietal: "Ethiopian heirloom",
    description:
      "A natural heirloom lot from smallholders around Gedeb, dried slowly on raised beds. Unapologetically floral — expect bergamot before the cup stops steaming, then blueberry as it cools.",
    roastersNote:
      "We dropped this roast fifteen seconds after first crack. Trust it.",
    image:
      "https://image.qwenlm.ai/generated-images/8aa884a7-cc4d-44e2-adaa-e67fcb4c73f5/_result.png",
    badge: "Limited lot",
  },
  {
    id: "morning-ritual",
    name: "Morning Ritual",
    tagline: "Everyday filter blend",
    category: "blend",
    categoryLabel: "Filter blend",
    price: 16.5,
    weight: "340 g",
    roast: 3,
    notes: ["Toffee", "Roasted almond", "Cocoa nib"],
    origin: "Cajamarca, Peru + Intibucá, Honduras",
    process: "Fully washed",
    elevation: "1,400 – 1,800 m",
    varietal: "Typica · Lempira",
    description:
      "The everyday pot — a blend we re-balance every season so the cup never changes. Soft toffee sweetness, a whisper of almond skin, and enough cocoa to carry you clean through to noon.",
    roastersNote: "Built for the 1 : 16 crowd. Diner-proof, desk-proof.",
    image:
      "https://image.qwenlm.ai/generated-images/47d2e694-0869-4f32-beaa-8fdd9127bbd4/_result.png",
  },
  {
    id: "cloud-forest",
    name: "Cloud Forest",
    tagline: "Single origin · Huehuetenango",
    category: "single-origin",
    categoryLabel: "Single origin",
    price: 22,
    weight: "250 g",
    roast: 3,
    notes: ["Wild honey", "Orange zest", "White florals"],
    origin: "Sierra de los Cuchumatanes, Guatemala",
    process: "Honey process, shade-dried",
    elevation: "1,850 m",
    varietal: "Bourbon · Catuaí",
    description:
      "Grown under shade canopy at the edge of the Huehuetenango cloud forest and honey-processed on site. A syrupy body with orange-zest lift — the rare cup that manages to be both heavy and high.",
    roastersNote:
      "Let it rest the full four days. Day five is the fireworks show.",
    image:
      "https://image.qwenlm.ai/generated-images/d01a5115-8ea2-4b7f-b2d8-961aaf52cd97/_result.png",
    badge: "New crop",
  },
  {
    id: "midnight-decaf",
    name: "Midnight Decaf",
    tagline: "Swiss Water® decaf · Cajamarca",
    category: "decaf",
    categoryLabel: "Decaf",
    price: 19,
    weight: "250 g",
    roast: 4,
    notes: ["Maple", "Pecan", "Milk chocolate"],
    origin: "Jaén, Cajamarca, Peru",
    process: "Swiss Water® decaffeination",
    elevation: "1,600 m",
    varietal: "Caturra",
    description:
      "Swiss Water® decaffeinated before it ever meets our roaster, so what's left is all coffee: maple and pecan over a milk-chocolate base. Decaf by conviction, not by compromise.",
    roastersNote:
      "Our most-reordered bag, usually by people who swear they never drink decaf.",
    image:
      "https://image.qwenlm.ai/generated-images/443a79f7-cdcb-4a46-9adc-16e4a561ad95/_result.png",
    badge: "Fan favorite",
  },
];
