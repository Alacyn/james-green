import { Search, ChevronUp } from "lucide-react";
import { scrollToId } from "./Reveal";

export default function StickyConnectBar() {
  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3 sm:bottom-7 sm:left-7">
      <button
        data-testid="sticky-search-button"
        aria-label="Search"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-105"
      >
        <Search className="h-[18px] w-[18px]" />
      </button>
      <button
        data-testid="sticky-lets-connect"
        onClick={() => scrollToId("#connect")}
        className="flex items-center gap-2 bg-bronze px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.25em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:bg-ink"
      >
        Let&rsquo;s Connect
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
}
