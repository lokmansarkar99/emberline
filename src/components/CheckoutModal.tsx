import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { FREE_SHIPPING_AT, fmt, fmtDate, nextThursday } from "../types";
import type { CartLine } from "../types";
import {
  IconArrowRight,
  IconBean,
  IconCard,
  IconCheck,
  IconClose,
  IconLock,
  IconTruck,
} from "./icons";

type Step = "details" | "payment" | "review" | "processing" | "done";

const PROCESSING_MSGS = [
  "Contacting the roastery…",
  "Reserving bags from Thursday's roast…",
  "Writing your roast card…",
  "Order confirmed — receipt sent",
];

interface PlacedOrder {
  orderNo: string;
  email: string;
  firstName: string;
  lines: { name: string; qty: number; grind: string; total: number }[];
  subtotal: number;
  shipCost: number;
  total: number;
}

interface CheckoutModalProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cocoa">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs font-bold text-clay">{error}</span>}
    </label>
  );
}

const inputCls = (err?: string) =>
  `h-11 w-full rounded-[6px] border bg-cream px-3.5 text-sm font-medium transition-colors focus:outline-none ${
    err ? "border-clay" : "border-ink/20 focus:border-leaf"
  }`;

export default function CheckoutModal({ open, lines, onClose, onComplete }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    cardName: "",
    card: "",
    exp: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<"standard" | "express">("standard");
  const [progress, setProgress] = useState(0);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const snapshot = useRef<PlacedOrder | null>(null);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipCost =
    method === "express" ? 12 : subtotal >= FREE_SHIPPING_AT ? 0 : 4.95;
  const total = subtotal + shipCost;

  // reset when reopened
  useEffect(() => {
    if (open) {
      setStep("details");
      setErrors({});
      setMethod("standard");
      setProgress(0);
      setPlaced(null);
    }
  }, [open]);

  // esc to close (not mid-processing)
  useEffect(() => {
    if (!open || step === "processing") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  // simulated processing
  useEffect(() => {
    if (step !== "processing") return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setProgress(i);
      if (i >= PROCESSING_MSGS.length) {
        clearInterval(t);
        setTimeout(() => {
          setPlaced(snapshot.current);
          onComplete();
          setStep("done");
        }, 450);
      }
    }, 750);
    return () => clearInterval(t);
  }, [step, onComplete]);

  if (!open) return null;

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k]) return e;
      const next = { ...e };
      delete next[k];
      return next;
    });
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.name.trim().length < 2) e.name = "Required";
    if (form.address.trim().length < 4) e.address = "Enter a street address";
    if (form.city.trim().length < 2) e.city = "Required";
    if (form.zip.trim().length < 3) e.zip = "Invalid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (form.cardName.trim().length < 2) e.cardName = "Required";
    if (form.card.replace(/\s/g, "").length < 15) e.card = "Enter a full card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.exp)) e.exp = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const beginProcessing = () => {
    snapshot.current = {
      orderNo: `EMB-${Math.floor(1000 + Math.random() * 9000)}`,
      email: form.email,
      firstName: form.name.trim().split(/\s+/)[0] || "friend",
      lines: lines.map((l) => ({
        name: l.product.name,
        qty: l.qty,
        grind: l.grind,
        total: l.product.price * l.qty,
      })),
      subtotal,
      shipCost,
      total,
    };
    setStep("processing");
  };

  const cardFmt = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const expFmt = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const shipDate = nextThursday();
  const arriveDate = new Date(shipDate);
  arriveDate.setDate(arriveDate.getDate() + 4);

  const stepIdx = step === "details" ? 0 : step === "payment" ? 1 : 2;
  const closable = step !== "processing";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center transition-opacity duration-300 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <button
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
        onClick={() => closable && onClose()}
        aria-label="Close checkout"
      />

      <div className="nice-scroll relative z-10 max-h-[94vh] w-full max-w-lg overflow-y-auto border border-ink/15 bg-paper shadow-2xl">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-paper/95 px-6 py-4 backdrop-blur-sm">
          <h2 className="font-display text-2xl font-semibold">
            {step === "done" ? "Order confirmed" : "Checkout"}
          </h2>
          {closable && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-cream transition-all hover:rotate-90 hover:bg-parch active:scale-90"
            >
              <IconClose size={15} />
            </button>
          )}
        </div>

        {/* step indicator */}
        {step !== "done" && step !== "processing" && (
          <ol className="flex items-center gap-2 border-b border-dashed border-ink/15 px-6 py-3.5">
            {["Details", "Payment", "Review"].map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-extrabold transition-colors ${
                    i < stepIdx
                      ? "bg-leaf text-cream"
                      : i === stepIdx
                        ? "bg-honey text-ink"
                        : "bg-ink/10 text-cocoa"
                  }`}
                >
                  {i < stepIdx ? <IconCheck size={12} strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`text-xs font-bold ${
                    i === stepIdx ? "text-ink" : "text-cocoa/70"
                  }`}
                >
                  {label}
                </span>
                {i < 2 && <span className="h-px w-6 bg-ink/15 sm:w-10" />}
              </li>
            ))}
          </ol>
        )}

        <div className="p-6">
          {/* STEP 1 — details */}
          {step === "details" && (
            <div className="space-y-4">
              <Field label="Email" error={errors.email}>
                <input
                  className={inputCls(errors.email)}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                />
              </Field>
              <Field label="Full name" error={errors.name}>
                <input
                  className={inputCls(errors.name)}
                  placeholder="Sam Torres"
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                />
              </Field>
              <Field label="Street address" error={errors.address}>
                <input
                  className={inputCls(errors.address)}
                  placeholder="418 Alder St, Apt 2"
                  value={form.address}
                  onChange={(e) => set("address")(e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={errors.city}>
                  <input
                    className={inputCls(errors.city)}
                    placeholder="Portland"
                    value={form.city}
                    onChange={(e) => set("city")(e.target.value)}
                  />
                </Field>
                <Field label="ZIP" error={errors.zip}>
                  <input
                    className={inputCls(errors.zip)}
                    placeholder="97204"
                    inputMode="numeric"
                    value={form.zip}
                    onChange={(e) => set("zip")(e.target.value.replace(/[^\d-]/g, "").slice(0, 10))}
                  />
                </Field>
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cocoa">
                  Shipping method
                </p>
                <div className="mt-2 grid gap-2.5">
                  {(
                    [
                      [
                        "standard",
                        "Standard",
                        "3–5 business days",
                        subtotal >= FREE_SHIPPING_AT ? "Free" : "$4.95",
                      ],
                      ["express", "Express", "Next business day", "$12.00"],
                    ] as const
                  ).map(([id, title, sub, cost]) => (
                    <button
                      key={id}
                      onClick={() => setMethod(id)}
                      aria-pressed={method === id}
                      className={`flex items-center justify-between rounded-[6px] border p-3.5 text-left transition-all ${
                        method === id
                          ? "border-leaf bg-leaf/8 shadow-[3px_3px_0_rgba(46,70,54,0.15)]"
                          : "border-ink/15 bg-cream hover:border-ink/40"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <IconTruck size={18} className={method === id ? "text-leaf" : "text-cocoa"} />
                        <span>
                          <span className="block text-sm font-extrabold">{title}</span>
                          <span className="block text-xs font-semibold text-cocoa">{sub}</span>
                        </span>
                      </span>
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`text-sm font-extrabold ${
                            cost === "Free" ? "text-leaf" : ""
                          }`}
                        >
                          {cost}
                        </span>
                        <span
                          className={`grid h-4.5 w-4.5 place-items-center rounded-full border-2 ${
                            method === id ? "border-leaf" : "border-ink/25"
                          }`}
                          style={{ width: 18, height: 18 }}
                        >
                          {method === id && <span className="h-2 w-2 rounded-full bg-leaf" />}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="link-line text-sm font-bold text-ink"
                >
                  Back to bag
                </button>
                <button
                  onClick={() => validateDetails() && setStep("payment")}
                  className="group flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-extrabold text-cream transition-all hover:bg-leaf-deep active:scale-95"
                >
                  Continue to payment
                  <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — payment */}
          {step === "payment" && (
            <div className="space-y-4">
              <p className="flex items-center gap-2 rounded-[6px] border border-honey/50 bg-honey/10 px-4 py-3 text-xs font-bold text-ink">
                <IconLock size={15} className="shrink-0 text-clay" />
                Demo checkout — nothing is charged, no data leaves this page.
              </p>
              <Field label="Name on card" error={errors.cardName}>
                <input
                  className={inputCls(errors.cardName)}
                  placeholder="Sam Torres"
                  value={form.cardName}
                  onChange={(e) => set("cardName")(e.target.value)}
                />
              </Field>
              <Field label="Card number" error={errors.card}>
                <div className="relative">
                  <IconCard size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa" />
                  <input
                    className={`${inputCls(errors.card)} pl-10`}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    value={form.card}
                    onChange={(e) => set("card")(cardFmt(e.target.value))}
                  />
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" error={errors.exp}>
                  <input
                    className={inputCls(errors.exp)}
                    placeholder="MM/YY"
                    inputMode="numeric"
                    value={form.exp}
                    onChange={(e) => set("exp")(expFmt(e.target.value))}
                  />
                </Field>
                <Field label="CVC" error={errors.cvc}>
                  <input
                    className={inputCls(errors.cvc)}
                    placeholder="123"
                    inputMode="numeric"
                    value={form.cvc}
                    onChange={(e) => set("cvc")(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  />
                </Field>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button onClick={() => setStep("details")} className="link-line text-sm font-bold text-ink">
                  Back to details
                </button>
                <button
                  onClick={() => validatePayment() && setStep("review")}
                  className="group flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-extrabold text-cream transition-all hover:bg-leaf-deep active:scale-95"
                >
                  Review order
                  <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — review */}
          {step === "review" && (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[6px] border border-ink/15 bg-cream p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-clay">
                    Ship to
                  </p>
                  <p className="mt-1.5 text-sm font-bold">{form.name}</p>
                  <p className="text-[13px] font-medium text-cocoa">
                    {form.address}, {form.city} {form.zip}
                  </p>
                  <p className="text-[13px] font-medium text-cocoa">{form.email}</p>
                </div>
                <div className="rounded-[6px] border border-ink/15 bg-cream p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-clay">
                    Method
                  </p>
                  <p className="mt-1.5 text-sm font-bold capitalize">{method} shipping</p>
                  <p className="text-[13px] font-medium text-cocoa">
                    {method === "express"
                      ? "Arrives next business day"
                      : `Roasts ${fmtDate(shipDate)} · arrives ~${fmtDate(arriveDate)}`}
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-dashed divide-ink/15 border-y border-ink/15">
                {lines.map((l) => (
                  <li key={l.key} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="font-bold">
                      {l.qty} × {l.product.name}
                      <span className="ml-2 text-xs font-semibold text-cocoa">({l.grind})</span>
                    </span>
                    <span className="font-display font-semibold">
                      {fmt(l.product.price * l.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="space-y-1.5 text-sm font-semibold">
                <div className="flex justify-between text-cocoa">
                  <dt>Subtotal</dt>
                  <dd>{fmt(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-cocoa">
                  <dt>Shipping</dt>
                  <dd>{shipCost === 0 ? "Free" : fmt(shipCost)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink/15 pt-2 text-base font-extrabold text-ink">
                  <dt>Total</dt>
                  <dd className="font-display text-xl">{fmt(total)}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button onClick={() => setStep("payment")} className="link-line text-sm font-bold text-ink">
                  Back to payment
                </button>
                <button
                  onClick={beginProcessing}
                  className="group flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-extrabold text-cream transition-all hover:bg-leaf active:scale-95"
                >
                  Place order · {fmt(total)}
                  <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* PROCESSING */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-8 text-center">
              <IconBean size={38} className="spin-slow text-leaf" />
              <h3 className="mt-5 font-display text-2xl font-semibold">Brewing your order…</h3>
              <ul className="mt-6 w-full max-w-xs space-y-2.5 text-left">
                {PROCESSING_MSGS.map((m, i) => (
                  <li
                    key={m}
                    className={`flex items-center gap-2.5 text-sm font-bold transition-opacity duration-300 ${
                      i < progress ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        i < progress ? "bg-leaf text-cream" : "bg-ink/10 text-cocoa"
                      }`}
                    >
                      {i < progress ? (
                        <IconCheck size={11} strokeWidth={3} />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DONE */}
          {step === "done" && placed && (
            <div className="py-4 text-center">
              <svg viewBox="0 0 64 64" className="mx-auto h-20 w-20" aria-hidden="true">
                <circle cx="32" cy="32" r="29" fill="none" stroke="#2e4636" strokeWidth="3" />
                <path
                  className="check-draw"
                  d="M19 33.5 28.5 43 46 23.5"
                  fill="none"
                  stroke="#2e4636"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="mt-4 font-display text-3xl font-semibold">
                Thanks, {placed.firstName}.
              </h3>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-clay">
                Order {placed.orderNo}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-cocoa">
                A receipt is on its way to <span className="font-bold text-ink">{placed.email}</span>.
                Your coffee roasts <span className="font-bold text-ink">{fmtDate(shipDate)}</span>{" "}
                and lands around <span className="font-bold text-ink">{fmtDate(arriveDate)}</span> —
                four days off roast, right on schedule.
              </p>

              <ul className="mx-auto mt-6 max-w-sm divide-y divide-dashed divide-ink/15 border-y border-ink/15 text-left">
                {placed.lines.map((l, i) => (
                  <li key={i} className="flex justify-between gap-3 py-2 text-sm font-bold">
                    <span>
                      {l.qty} × {l.name}
                      <span className="ml-2 text-xs font-semibold text-cocoa">({l.grind})</span>
                    </span>
                    <span className="font-display">{fmt(l.total)}</span>
                  </li>
                ))}
                <li className="flex justify-between py-2 text-sm font-bold">
                  <span className="text-cocoa">Shipping</span>
                  <span>{placed.shipCost === 0 ? "Free" : fmt(placed.shipCost)}</span>
                </li>
                <li className="flex justify-between py-2 text-base font-extrabold">
                  <span>Total</span>
                  <span className="font-display">{fmt(placed.total)}</span>
                </li>
              </ul>

              <p className="mt-4 text-xs font-semibold text-cocoa">
                Demo checkout — no card was charged, no beans were harmed.
              </p>
              <button
                onClick={onClose}
                className="group mx-auto mt-6 flex items-center gap-2 rounded-full bg-leaf px-7 py-3 text-sm font-extrabold text-cream transition-all hover:bg-leaf-deep active:scale-95"
              >
                Back to the shelf
                <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
