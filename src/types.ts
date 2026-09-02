export type Category = "single-origin" | "blend" | "decaf";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  categoryLabel: string;
  price: number;
  weight: string;
  roast: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  origin: string;
  process: string;
  elevation: string;
  varietal: string;
  description: string;
  roastersNote: string;
  image: string;
  badge?: string;
}

export interface CartItem {
  key: string;
  productId: string;
  grind: string;
  qty: number;
}

export interface CartLine extends CartItem {
  product: Product;
}

export const GRINDS = ["Whole bean", "Filter", "Espresso", "French press"] as const;
export type Grind = (typeof GRINDS)[number];

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All coffee" },
  { id: "single-origin", label: "Single origin" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const FREE_SHIPPING_AT = 45;

export const fmt = (n: number): string => `$${n.toFixed(2)}`;

export const roastName = (r: number): string =>
  ["", "Light", "Light-medium", "Medium", "Medium-dark", "Dark"][r] ?? "";

export function lastThursday(): Date {
  const d = new Date();
  const diff = (d.getDay() - 4 + 7) % 7 || 7;
  d.setDate(d.getDate() - diff);
  return d;
}

export function nextThursday(): Date {
  const d = new Date();
  const diff = (4 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d;
}

export const fmtDate = (d: Date): string =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
