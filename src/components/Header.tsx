import { IconBag, IconBean, IconSearch } from "./icons";

const TICKER = [
  "Roasted every Thursday",
  "Free U.S. shipping over $45",
  "Now roasting · Yirgacheffe Light",
  "Rested 96 hrs before dispatch",
  "12 kg drum batches",
  "Portland, OR — est. 2016",
];

interface HeaderProps {
  cartCount: number;
  pulse: number;
  onCartOpen: () => void;
  onSearchClick: () => void;
}

export default function Header({ cartCount, pulse, onCartOpen, onSearchClick }: HeaderProps) {
  return (
    <>
      {/* roast-day ticker */}
      <div className="overflow-hidden bg-leaf-deep text-cream">
        <div className="ticker-track py-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {TICKER.map((t, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-5">{t}</span>
                  <IconBean size={11} className="text-honey-soft" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf text-cream transition-transform duration-500 group-hover:rotate-[24deg]">
              <IconBean size={18} />
            </span>
            <span className="leading-none">
              <span className="font-display text-[22px] font-semibold tracking-tight">
                Cafe Orange
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.3em] text-cocoa">
                Roasters · PDX
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-ink/80 md:flex">
            <a href="#shop" className="link-line">
              Shop
            </a>
            <a href="#craft" className="link-line">
              Our craft
            </a>
            <a href="#visit" className="link-line">
              Visit
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onSearchClick}
              aria-label="Search the shelf"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-cream text-ink transition-all hover:border-ink/40 hover:bg-parch active:scale-95"
            >
              <IconSearch size={17} />
            </button>
            <button
              onClick={onCartOpen}
              className="relative flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-cream transition-all hover:bg-leaf active:scale-95"
            >
              <IconBag size={17} />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span
                  key={pulse}
                  className="pop absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-honey px-1 text-[11px] font-extrabold text-ink"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
