import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { IconChevronDown, IconClose, IconSearch } from "./icons";
import { CATEGORIES } from "../types";
import type { Category, Product } from "../types";

type SortKey = "featured" | "price-asc" | "price-desc" | "roast" | "name";

interface ShopSectionProps {
  products: Product[];
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function ShopSection({ products, onOpen, onAdd }: ShopSectionProps) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    for (const p of products) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [products]);

  const visible = useMemo(() => {
    let list = [...products];
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.origin, p.tagline, p.categoryLabel, ...p.notes]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "roast":
        list.sort((a, b) => b.roast - a.roast);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [products, cat, query, sort]);

  const reset = () => {
    setQuery("");
    setCat("all");
    setSort("featured");
  };

  return (
    <section id="shop" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.26em] text-clay">
              <span className="h-px w-10 bg-clay/70" /> The shelf
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Six bags, <span className="font-light italic text-leaf">zero filler.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-3 text-sm font-semibold text-cocoa" aria-live="polite">
              Showing {visible.length} of {products.length} coffees
              {query.trim() && (
                <>
                  {" "}for “<span className="text-clay">{query.trim()}</span>”
                </>
              )}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
              className="h-12 cursor-pointer appearance-none rounded-full border border-ink/15 bg-cream pl-5 pr-11 text-sm font-bold transition-colors hover:border-ink/40 focus:border-leaf focus:outline-none"
            >
              <option value="featured">Sort · Featured</option>
              <option value="price-asc">Price · Low to high</option>
              <option value="price-desc">Price · High to low</option>
              <option value="roast">Roast · Darkest first</option>
              <option value="name">Name · A → Z</option>
            </select>
            <IconChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cocoa" />
          </div>
        </Reveal>
      </div>

      {/* search + category filters */}
      <Reveal delay={120}>
        <div className="mt-8 flex flex-col gap-4 border-y border-ink/10 py-5 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <IconSearch size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-cocoa" />
            <input
              id="product-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search beans, tasting notes, origins…"
              className="h-12 w-full rounded-full border border-ink/15 bg-cream pl-11 pr-11 text-sm font-medium transition-colors placeholder:text-cocoa/60 focus:border-leaf focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-parch text-ink transition-colors hover:bg-line"
              >
                <IconClose size={14} />
              </button>
            )}
          </label>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2.5 text-[13px] font-bold transition-all active:scale-95 ${
                    active
                      ? "border-leaf bg-leaf text-cream shadow-[3px_3px_0_rgba(36,24,18,0.12)]"
                      : "border-ink/15 bg-cream text-ink/70 hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {c.label}
                  <span className={`ml-1.5 text-[11px] ${active ? "text-honey-soft" : "text-cocoa/80"}`}>
                    {counts[c.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 80}>
            <ProductCard product={p} onOpen={onOpen} onAdd={onAdd} />
          </Reveal>
        ))}

        {visible.length === 0 && (
          <div className="col-span-full border border-dashed border-ink/25 bg-cream/70 px-6 py-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-parch text-cocoa">
              <IconSearch size={24} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold">Nothing in the hopper.</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm font-medium text-cocoa">
              No coffees match{query.trim() ? ` “${query.trim()}”` : " those filters"}. Try a
              tasting note — “blueberry” works nicely.
            </p>
            <button
              onClick={reset}
              className="mt-6 rounded-full bg-leaf px-6 py-2.5 text-sm font-bold text-cream transition-all hover:bg-leaf-deep active:scale-95"
            >
              Clear search &amp; filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
