import Reveal from "./Reveal";
import {
  IconArrowRight,
  IconBean,
  IconFlame,
  IconLeaf,
  IconPlus,
  RoastMeter,
} from "./icons";
import { fmt, fmtDate, lastThursday, roastName } from "../types";
import type { Product } from "../types";

function SteamingCup() {
  return (
    <svg viewBox="0 0 80 84" className="w-full max-w-[120px]" aria-hidden="true">
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
      <path d="M27 47c3 2.4 23 2.4 26 0" fill="none" stroke="#5f4c3e" strokeWidth="2.2" />
      <path d="M34 60c2 1.6 10 1.6 12 0" fill="none" stroke="#c9862b" strokeWidth="2.2" />
    </svg>
  );
}

interface OpeningBandProps {
  featured: Product;
  onAdd: (p: Product) => void;
  onOpen: (p: Product) => void;
  onShop: () => void;
}

export default function OpeningBand({ featured, onAdd, onOpen, onShop }: OpeningBandProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* oversized bean outline, ambient */}
      <svg
        className="pointer-events-none absolute -right-28 -top-24 h-[440px] w-[440px] text-ink/[0.05]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.55"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="12" rx="6.2" ry="8.6" transform="rotate(28 12 12)" />
        <path d="M8.6 4.8c4.4 4 2.4 10.6 6.8 14.4" />
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
        {/* left — the counter pitch */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.26em] text-clay">
              <span className="h-px w-10 bg-clay/70" />
              Small-batch roastery — Portland, OR
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[46px] font-medium leading-[1.01] tracking-tight sm:text-6xl lg:text-[74px]">
              Coffee that
              <span className="block font-light italic text-leaf">tastes like</span>
              <span className="block font-light italic text-leaf">somewhere.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-cocoa">
              Six coffees on the shelf this week — three single farms, two blends, and one decaf
              that refuses to apologize. Roasted Thursday, rested four days, and sealed with the
              roast date on every bag.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button
                onClick={onShop}
                className="group flex items-center gap-2.5 rounded-full bg-leaf px-7 py-3.5 text-sm font-bold text-cream shadow-[5px_5px_0_rgba(36,24,18,0.12)] transition-all hover:-translate-y-0.5 hover:bg-leaf-deep active:translate-y-0 active:scale-[0.98]"
              >
                Browse the shelf
                <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a href="#craft" className="link-line text-sm font-bold text-ink">
                Read the roast log
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-ink/10 pt-7">
              {[
                ["12", "partner farms"],
                ["96 hr", "minimum rest"],
                ["Thurs.", "weekly roast day"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-semibold">{n}</dd>
                  <dd className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cocoa">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* right — this week's bar card */}
        <div className="relative lg:col-span-5">
          <img
            src={featured.image}
            alt={`${featured.name} bag`}
            className="floaty absolute -top-14 right-0 z-10 w-28 rotate-6 border border-ink/10 bg-cream p-1.5 shadow-[6px_8px_0_rgba(36,24,18,0.08)] sm:-right-6 sm:w-36 lg:-top-16"
          />

          <span className="floaty absolute -left-4 top-6 z-10 hidden items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink shadow-sm sm:flex">
            <IconBean size={11} className="text-clay" /> 96-hr rest
          </span>
          <span className="floaty-late absolute -left-7 bottom-12 z-10 hidden items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink shadow-sm sm:flex">
            <IconLeaf size={11} className="text-leaf" /> direct trade
          </span>

          <Reveal delay={150}>
            <article className="relative rotate-[1.2deg] border border-ink/15 bg-cream shadow-[10px_12px_0_rgba(36,24,18,0.07)] transition-transform duration-500 hover:rotate-0">
              <div className="flex items-center justify-between gap-2 border-b border-dashed border-ink/20 px-5 py-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-clay">
                  On the bar this week
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cocoa">
                  <IconFlame size={12} className="text-clay" />
                  Roasted {fmtDate(lastThursday())}
                </span>
              </div>

              <div className="grid grid-cols-[96px_1fr] items-center gap-4 p-5 sm:grid-cols-[116px_1fr] sm:gap-5 sm:p-6">
                <div className="grid place-items-center rounded-full bg-parch p-2">
                  <SteamingCup />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[28px]">
                    {featured.name}
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-cocoa">
                    {featured.tagline}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {featured.notes.map((n) => (
                      <span
                        key={n}
                        className="rounded-full border border-ink/15 bg-paper px-2.5 py-0.5 text-[11px] font-semibold text-ink/80"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-cocoa">
                    <RoastMeter level={featured.roast} />
                    <span>{roastName(featured.roast)} roast</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-dashed border-ink/20 px-5 py-4 sm:px-6">
                <div>
                  <span className="font-display text-[26px] font-semibold">{fmt(featured.price)}</span>
                  <span className="ml-1.5 text-xs font-semibold text-cocoa">/ {featured.weight}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpen(featured)}
                    className="link-line hidden text-xs font-bold text-ink sm:block"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onAdd(featured)}
                    className="flex items-center gap-1.5 rounded-full bg-honey px-5 py-2.5 text-sm font-extrabold text-ink transition-all hover:bg-honey-soft active:scale-95"
                  >
                    <IconPlus size={15} strokeWidth={2.4} /> Add
                  </button>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-5 text-center text-xs font-semibold italic text-cocoa">
              “Day five off roast is the fireworks show.” — cupping note, lot 24-118
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
