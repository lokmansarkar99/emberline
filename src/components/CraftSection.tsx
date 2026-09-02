import Reveal from "./Reveal";
import { IconFlame } from "./icons";

const STEPS: [string, string, string][] = [
  ["01", "Source", "Green coffee bought directly from twelve farms we can name, at prices we publish."],
  ["02", "Roast", "Twelve-kilo drum batches, profiled by hand and logged curve by curve on Thursdays."],
  ["03", "Rest", "Every bag rests a minimum of 96 hours so CO₂ settles and the sugars settle in."],
  ["04", "Ship", "Sealed with the roast date, out the door Monday — four days off roast, never more."],
];

export default function CraftSection() {
  return (
    <section id="craft" className="relative scroll-mt-16 border-y border-ink/10 bg-cream/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.26em] text-clay">
              <span className="h-px w-10 bg-clay/70" /> The craft
            </p>
          </Reveal>
          <Reveal delay={90}>
            <blockquote className="mt-6 font-display text-[30px] font-light italic leading-snug tracking-tight sm:text-4xl lg:text-[40px]">
              “We roast by ear and by curve. First crack is a{" "}
              <span className="text-leaf">promise</span>, not a finish line.”
            </blockquote>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-cocoa">
              — Mara Voss, head roaster
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
              {STEPS.map(([n, t, d]) => (
                <div key={n} className="border-t-2 border-ink/80 pt-4">
                  <span className="font-display text-3xl font-semibold text-honey">{n}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold">{t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-cocoa">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-20">
          <Reveal delay={120}>
            <div className="border border-ink/15 bg-paper p-5 shadow-[10px_12px_0_rgba(36,24,18,0.06)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold">
                  Roast curve · <span className="italic font-light">Huila Dawn, lot 24-118</span>
                </h3>
                <span className="flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-clay">
                  <IconFlame size={12} /> 11:42 total
                </span>
              </div>

              <Reveal delay={200} className="mt-5">
                <svg viewBox="0 0 420 180" className="w-full" role="img" aria-label="Roast temperature curve rising over time with a turning point and a first crack marker">
                  {/* gridlines */}
                  {[40, 80, 120, 160].map((y) => (
                    <line key={y} x1="14" y1={y} x2="406" y2={y} stroke="#241812" strokeOpacity="0.07" strokeWidth="1" />
                  ))}
                  {/* axes */}
                  <line x1="14" y1="12" x2="14" y2="160" stroke="#241812" strokeOpacity="0.35" strokeWidth="1.4" />
                  <line x1="14" y1="160" x2="406" y2="160" stroke="#241812" strokeOpacity="0.35" strokeWidth="1.4" />
                  {/* the curve — charge, turning point, rise, drop */}
                  <path
                    className="draw"
                    pathLength={1}
                    d="M14 34 C 40 128, 62 150, 92 148 C 150 144, 210 116, 268 88 C 316 65, 362 46, 402 34"
                    fill="none"
                    stroke="#2e4636"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* turning point */}
                  <circle cx="92" cy="148" r="4.5" fill="#c9862b" stroke="#faf4e7" strokeWidth="2" />
                  <text x="98" y="143" fontSize="10" fontWeight="700" fill="#5f4c3e" fontFamily="Karla, sans-serif">
                    turning point 1:51
                  </text>
                  {/* first crack */}
                  <line x1="316" y1="66" x2="316" y2="160" stroke="#9c4a26" strokeWidth="1.4" strokeDasharray="4 4" strokeOpacity="0.65" />
                  <circle cx="316" cy="66" r="5" fill="#9c4a26" stroke="#faf4e7" strokeWidth="2" />
                  <text x="284" y="56" fontSize="10" fontWeight="800" fill="#9c4a26" fontFamily="Karla, sans-serif" letterSpacing="1.5">
                    FIRST CRACK 9:38
                  </text>
                  {/* labels */}
                  <text x="16" y="176" fontSize="9" fontWeight="700" fill="#5f4c3e" fontFamily="Karla, sans-serif" letterSpacing="2">
                    TIME →
                  </text>
                  <text x="20" y="24" fontSize="9" fontWeight="700" fill="#5f4c3e" fontFamily="Karla, sans-serif" letterSpacing="2" transform="rotate(90 20 24)">
                    TEMP →
                  </text>
                </svg>
              </Reveal>

              <div className="mt-5 grid gap-3 border-t border-dashed border-ink/20 pt-5 text-[13px] font-semibold text-cocoa sm:grid-cols-3">
                <p><span className="font-display text-lg font-semibold text-ink">204.4 °C</span><br />drop temperature</p>
                <p><span className="font-display text-lg font-semibold text-ink">+18.1 °C</span><br />rate of rise at drop</p>
                <p><span className="font-display text-lg font-semibold text-ink">14.8 %</span><br />weight loss, development</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
