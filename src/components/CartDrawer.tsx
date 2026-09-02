import { useEffect } from "react";
import { FREE_SHIPPING_AT, fmt } from "../types";
import type { CartLine } from "../types";
import { IconArrowRight, IconClose, IconMinus, IconPlus, IconTrash, IconTruck } from "./icons";

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  onClose: () => void;
  onQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}

export default function CartDrawer({
  open,
  lines,
  subtotal,
  onClose,
  onQty,
  onRemove,
  onCheckout,
  onBrowse,
}: CartDrawerProps) {
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const remaining = FREE_SHIPPING_AT - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close bag"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink/15 bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,0.9,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            Your bag
            {count > 0 && (
              <span className="ml-2.5 inline-grid h-6 min-w-6 place-items-center rounded-full bg-honey px-1.5 align-middle text-xs font-extrabold text-ink">
                {count}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-cream transition-all hover:rotate-90 hover:bg-parch active:scale-90"
          >
            <IconClose size={15} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <svg viewBox="0 0 80 84" className="w-24 opacity-80" aria-hidden="true">
              <g stroke="#9c4a26" strokeWidth="2.6" strokeLinecap="round" fill="none">
                <path className="steam" d="M31 32c-3-4 3-7 0-12" />
                <path className="steam steam-2" d="M40 30c-3-5 3-8 0-14" />
                <path className="steam steam-3" d="M49 32c-3-4 3-7 0-12" />
              </g>
              <ellipse cx="40" cy="74" rx="27" ry="4.5" fill="#eaddc4" />
              <path
                d="M22 42h36v8.5A17.5 17.5 0 0 1 40.5 68h-1A17.5 17.5 0 0 1 22 50.5V42Z"
                fill="#faf4e7"
                stroke="#241812"
                strokeWidth="2.6"
              />
              <path d="M58 44h3.5a6 6 0 0 1 0 12H56" fill="none" stroke="#241812" strokeWidth="2.6" />
            </svg>
            <h3 className="font-display text-2xl font-semibold">Your bag is empty.</h3>
            <p className="text-sm font-medium text-cocoa">
              The shelf is six bags deep and everything left the roaster Thursday. Go pick a
              favorite.
            </p>
            <button
              onClick={onBrowse}
              className="group mt-2 flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-bold text-cream transition-all hover:bg-leaf-deep active:scale-95"
            >
              Browse the shelf
              <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <>
            {/* free shipping meter */}
            <div className="border-b border-dashed border-ink/15 bg-cream px-5 py-4">
              <p className="flex items-center gap-2 text-xs font-bold">
                <IconTruck size={15} className={remaining <= 0 ? "text-leaf" : "text-clay"} />
                {remaining <= 0 ? (
                  <span className="text-leaf">Free shipping unlocked — nice.</span>
                ) : (
                  <>
                    <span className="text-honey">{fmt(remaining)}</span>
                    <span className="text-cocoa">away from free shipping</span>
                  </>
                )}
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                    remaining <= 0 ? "bg-leaf" : "bg-honey"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* lines */}
            <ul className="nice-scroll flex-1 overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3.5 border-b border-dashed border-ink/15 py-4">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-21 w-17 shrink-0 border border-ink/10 bg-cream object-cover"
                    style={{ width: "68px", height: "84px" }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="truncate font-display text-[17px] font-semibold">
                        {l.product.name}
                      </h3>
                      <span className="whitespace-nowrap font-display text-[15px] font-semibold">
                        {fmt(l.product.price * l.qty)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-cocoa">
                      {l.grind} grind · {l.product.weight} · {fmt(l.product.price)} each
                    </p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/20 bg-cream">
                        <button
                          onClick={() => onQty(l.key, -1)}
                          disabled={l.qty <= 1}
                          aria-label={`Decrease quantity of ${l.product.name}`}
                          className="grid h-8 w-8 place-items-center transition-colors hover:text-clay disabled:opacity-30"
                        >
                          <IconMinus size={13} strokeWidth={2.4} />
                        </button>
                        <span className="w-6 text-center text-sm font-extrabold" aria-live="polite">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => onQty(l.key, 1)}
                          disabled={l.qty >= 12}
                          aria-label={`Increase quantity of ${l.product.name}`}
                          className="grid h-8 w-8 place-items-center transition-colors hover:text-leaf disabled:opacity-30"
                        >
                          <IconPlus size={13} strokeWidth={2.4} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(l.key)}
                        aria-label={`Remove ${l.product.name} from bag`}
                        className="grid h-8 w-8 place-items-center rounded-full text-cocoa transition-colors hover:bg-clay/10 hover:text-clay"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="border-t border-ink/15 bg-cream p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-[0.14em] text-cocoa">
                  Subtotal
                </span>
                <span className="font-display text-2xl font-semibold">{fmt(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-cocoa">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-leaf py-3.5 text-sm font-extrabold uppercase tracking-wide text-cream transition-all hover:bg-leaf-deep active:scale-[0.99]"
              >
                Checkout · {fmt(subtotal)}
                <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onBrowse}
                className="link-line mx-auto mt-3 block text-xs font-bold text-ink"
              >
                Keep shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
