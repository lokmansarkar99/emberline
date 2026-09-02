import { useEffect, useRef, useState } from "react";
import { GRINDS, fmt, fmtDate, lastThursday, roastName } from "../types";
import type { Grind, Product } from "../types";
import { IconBag, IconCheck, IconClose, IconMinus, IconPlus, IconTruck, RoastMeter } from "./icons";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, grind: Grind, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const open = !!product;
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (product) {
      setGrind("Whole bean");
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  if (!product) return null;

  const handleAdd = () => {
    onAdd(product, grind, qty);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  const specs: [string, string][] = [
    ["Origin", product.origin],
    ["Process", product.process],
    ["Elevation", product.elevation],
    ["Varietal", product.varietal],
  ];

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center transition-opacity duration-300 sm:items-center sm:p-6 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <button
        className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close product details"
      />

      <div
        className={`relative z-10 grid max-h-[94vh] w-full max-w-4xl grid-cols-1 overflow-hidden border border-ink/15 bg-cream shadow-2xl transition-all duration-300 md:grid-cols-2 ${
          open ? "translate-y-0 scale-100" : "translate-y-8 scale-[0.98]"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-cream/95 text-ink transition-all hover:rotate-90 hover:bg-parch active:scale-90"
        >
          <IconClose size={16} />
        </button>

        {/* image side */}
        <div className="relative min-h-[220px] border-b border-ink/15 bg-parch md:min-h-full md:border-b-0 md:border-r">
          <img
            src={product.image}
            alt={`${product.name} bag`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-ink px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cream">
              {product.badge}
            </span>
          )}
        </div>

        {/* details side */}
        <div className="nice-scroll overflow-y-auto p-6 sm:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-clay">
            {product.categoryLabel}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.12em] text-cocoa">
            {product.tagline}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-dashed border-ink/20 py-4">
            <div>
              <span className="font-display text-3xl font-semibold">{fmt(product.price)}</span>
              <span className="ml-2 text-xs font-bold text-cocoa">/ {product.weight}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-cocoa">
              <RoastMeter level={product.roast} />
              {roastName(product.roast)} roast
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-bold text-ink/80"
              >
                {n}
              </span>
            ))}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-cocoa">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
            {specs.map(([k, v]) => (
              <div key={k} className="border-t border-ink/15 pt-2.5">
                <dt className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-clay">{k}</dt>
                <dd className="mt-1 text-[13px] font-bold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <blockquote className="mt-6 border-l-[3px] border-honey bg-paper px-4 py-3.5">
            <p className="font-display text-[15px] font-light italic leading-relaxed">
              “{product.roastersNote}”
            </p>
            <cite className="mt-1.5 block text-[10px] font-extrabold uppercase not-italic tracking-[0.2em] text-cocoa">
              Roaster's note
            </cite>
          </blockquote>

          {/* grind picker */}
          <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.22em] text-cocoa">Grind</p>
          <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Choose grind">
            {GRINDS.map((g) => (
              <button
                key={g}
                onClick={() => setGrind(g)}
                aria-pressed={grind === g}
                className={`rounded-full border px-4 py-2 text-[13px] font-bold transition-all active:scale-95 ${
                  grind === g
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 bg-cream text-ink/70 hover:border-ink/50 hover:text-ink"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* qty + add */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center rounded-full border border-ink/20 bg-cream">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="grid h-12 w-11 place-items-center text-ink transition-colors hover:text-clay disabled:opacity-30"
              >
                <IconMinus size={15} strokeWidth={2.4} />
              </button>
              <span className="w-8 text-center font-display text-lg font-semibold" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                disabled={qty >= 12}
                aria-label="Increase quantity"
                className="grid h-12 w-11 place-items-center text-ink transition-colors hover:text-leaf disabled:opacity-30"
              >
                <IconPlus size={15} strokeWidth={2.4} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold uppercase tracking-wide transition-all active:scale-[0.98] ${
                added ? "bg-honey text-ink" : "bg-leaf text-cream hover:bg-leaf-deep"
              }`}
            >
              {added ? (
                <>
                  <IconCheck size={16} strokeWidth={2.6} /> In the bag
                </>
              ) : (
                <>
                  <IconBag size={16} /> Add to bag · {fmt(product.price * qty)}
                </>
              )}
            </button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-cocoa">
            <IconTruck size={15} className="text-leaf" />
            Free shipping over $45 · roasted {fmtDate(lastThursday())}, ships at peak rest
          </p>
        </div>
      </div>
    </div>
  );
}
