import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "./data/products";
import Header from "./components/Header";
import OpeningBand from "./components/OpeningBand";
import ShopSection from "./components/ShopSection";
import CraftSection from "./components/CraftSection";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { IconCheck } from "./components/icons";
import type { CartItem, CartLine, Grind, Product } from "./types";

interface ToastMsg {
  id: number;
  msg: string;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const [pulse, setPulse] = useState(0);

  const lines: CartLine[] = useMemo(
    () =>
      cart.map((i) => ({
        ...i,
        product: PRODUCTS.find((p) => p.id === i.productId)!,
      })),
    [cart]
  );
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines]
  );
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = useCallback((p: Product, grind: Grind = "Whole bean", qty = 1) => {
    const key = `${p.id}|${grind}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      return existing
        ? prev.map((i) =>
            i.key === key ? { ...i, qty: Math.min(12, i.qty + qty) } : i
          )
        : [...prev, { key, productId: p.id, grind, qty }];
    });
    setPulse((n) => n + 1);
    setToast({ id: Date.now(), msg: `${p.name} added to your bag` });
  }, []);

  const changeQty = (key: string, delta: number) =>
    setCart((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, qty: Math.min(12, Math.max(1, i.qty + delta)) } : i
      )
    );

  const removeLine = (key: string) => setCart((prev) => prev.filter((i) => i.key !== key));

  const clearCart = useCallback(() => setCart([]), []);

  // toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // lock body scroll behind overlays
  useEffect(() => {
    const anyOpen = cartOpen || checkoutOpen || !!detail;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, checkoutOpen, detail]);

  const scrollToShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const focusSearch = () => {
    scrollToShop();
    setTimeout(() => {
      (document.getElementById("product-search") as HTMLInputElement | null)?.focus({
        preventScroll: true,
      });
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <div className="ambient" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Header
        cartCount={count}
        pulse={pulse}
        onCartOpen={() => setCartOpen(true)}
        onSearchClick={focusSearch}
      />

      <main>
        <OpeningBand
          featured={PRODUCTS[2]}
          onAdd={addToCart}
          onOpen={setDetail}
          onShop={scrollToShop}
        />
        <ShopSection products={PRODUCTS} onOpen={setDetail} onAdd={addToCart} />
        <CraftSection />
      </main>

      <Footer />

      <ProductModal product={detail} onClose={() => setDetail(null)} onAdd={addToCart} />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onBrowse={() => {
          setCartOpen(false);
          scrollToShop();
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        onClose={() => setCheckoutOpen(false)}
        onComplete={clearCart}
      />

      {toast && (
        <div
          key={toast.id}
          role="status"
          className="toast-in fixed bottom-6 left-1/2 z-[95] flex max-w-[92vw] items-center gap-2.5 rounded-full bg-ink py-3 pl-3.5 pr-4 text-sm font-bold text-cream shadow-xl"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey text-ink">
            <IconCheck size={13} strokeWidth={2.8} />
          </span>
          <span className="truncate">{toast.msg}</span>
          <button
            onClick={() => {
              setToast(null);
              setCartOpen(true);
            }}
            className="link-line ml-1 shrink-0 text-xs font-extrabold uppercase tracking-wide text-honey-soft"
          >
            View bag
          </button>
        </div>
      )}
    </div>
  );
}
