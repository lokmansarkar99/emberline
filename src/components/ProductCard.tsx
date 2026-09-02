import { useEffect, useRef, useState } from "react";
import { fmt, roastName } from "../types";
import type { Product } from "../types";
import { IconArrowRight, IconCheck, IconPlus, RoastMeter } from "./icons";

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function ProductCard({ product, onOpen, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onOpen(product)}
      className="group cursor-pointer border border-ink/15 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[8px_10px_0_rgba(36,24,18,0.08)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b border-ink/15 bg-parch">
        <img
          src={product.image}
          alt={`${product.name} — ${product.tagline}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cream">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-cream/95 px-2.5 py-1.5 shadow-sm">
          <RoastMeter level={product.roast} />
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto flex w-max translate-y-2 items-center gap-1.5 rounded-full bg-ink/85 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cream opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Quick view <IconArrowRight size={12} />
        </span>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-clay">
          {product.categoryLabel}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[22px] font-semibold leading-tight transition-colors group-hover:text-leaf">
            {product.name}
          </h3>
          <span className="whitespace-nowrap font-display text-lg font-semibold">
            {fmt(product.price)}
          </span>
        </div>
        <p className="mt-1.5 text-[13px] font-medium text-cocoa">{product.notes.join(" · ")}</p>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink/15 pt-3.5">
          <span className="text-xs font-bold text-cocoa">
            {product.weight} · {roastName(product.roast)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            aria-label={`Add ${product.name} to bag`}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-all active:scale-95 ${
              added
                ? "bg-honey text-ink"
                : "bg-leaf text-cream hover:bg-leaf-deep"
            }`}
          >
            {added ? (
              <>
                <IconCheck size={13} strokeWidth={2.6} /> Added
              </>
            ) : (
              <>
                <IconPlus size={13} strokeWidth={2.6} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
