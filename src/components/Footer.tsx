import { useState } from "react";
import type { FormEvent } from "react";
import { IconBean, IconCheck, IconClock, IconPin } from "./icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [err, setErr] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr(true);
      return;
    }
    setErr(false);
    setSubbed(true);
  };

  return (
    <footer id="visit" className="relative scroll-mt-16 overflow-hidden bg-leaf-deep text-cream">
      <p
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[16vw] font-semibold leading-[0.8] text-cream/[0.045]"
        aria-hidden="true"
      >
        Cafe Orange
      </p>

      <div className="mx-auto -mt-[6vw] max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:-mt-[4vw]">
        <div className="grid gap-12 border-t border-cream/15 pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-honey text-ink">
                <IconBean size={18} />
              </span>
              <span className="font-display text-2xl font-semibold">Cafe Orange</span>
            </p>
            <p className="mt-4 max-w-sm font-display text-[22px] font-light italic leading-snug text-honey-soft">
              Slow coffee, fast friends. The kettle's always on.
            </p>
            <div className="mt-6 space-y-3 text-sm font-medium text-cream/80">
              <p className="flex items-start gap-2.5">
                <IconPin size={16} className="mt-0.5 shrink-0 text-honey" />
                214 NW Flanders St, Portland, OR 97209
              </p>
              <p className="flex items-start gap-2.5">
                <IconClock size={16} className="mt-0.5 shrink-0 text-honey" />
                Tue – Sun · 7 am – 4 pm — cupping bar Fridays at 10 am
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-honey-soft">
              Roast days
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-cream/80">
              {[
                ["Thursday", "production roast day"],
                ["Friday", "public cupping + QC"],
                ["Sat – Sun", "96 hr rest, bags sealed"],
                ["Monday", "everything ships"],
              ].map(([d, w]) => (
                <li key={d} className="flex gap-3 border-l border-cream/20 pl-3">
                  <span className="w-20 shrink-0 font-bold text-cream">{d}</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-honey-soft">
              The roast letter
            </h3>
            <p className="mt-4 text-sm font-medium leading-relaxed text-cream/80">
              One email a week: what's on the drum, what's landing from origin, and first dibs on
              small lots before they hit the shelf.
            </p>
            {subbed ? (
              <p className="mt-4 flex items-center gap-2 rounded-[6px] border border-honey/40 bg-honey/10 px-4 py-3 text-sm font-bold text-honey-soft">
                <IconCheck size={16} strokeWidth={2.6} /> You're on the list — see you Thursday.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-4">
                <div className="flex overflow-hidden rounded-full border border-cream/25 bg-leaf focus-within:border-honey">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="h-12 min-w-0 flex-1 bg-transparent px-5 text-sm font-medium text-cream placeholder:text-cream/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-honey px-5 text-xs font-extrabold uppercase tracking-wide text-ink transition-colors hover:bg-honey-soft"
                  >
                    Join
                  </button>
                </div>
                {err && (
                  <p className="mt-2 text-xs font-bold text-honey-soft">
                    That email looks under-extracted — try again?
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs font-semibold text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Cafe Orange — a demo storefront, no real orders.</p>
          <p className="flex items-center gap-1.5">
            Roasted with patience in Portland <IconBean size={12} className="text-honey" />
          </p>
        </div>
      </div>
    </footer>
  );
}
