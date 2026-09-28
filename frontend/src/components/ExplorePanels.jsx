import { scrollToId } from "./Reveal";

const PANELS = [
  {
    label: "Meet",
    href: "#about",
    img: "/images/hero.jpg",
    copy: "Two decades of client-first experience across financial services, lending, relocation, and advocacy.",
  },
  {
    label: "Buy",
    href: "#buy",
    img: "/images/interior.png",
    copy: "From first home to forever home — clear guidance through every step of the purchase.",
  },
  {
    label: "Sell",
    href: "#sell",
    img: "/images/network.jpg",
    copy: "Strategy, preparation, and market clarity to position your home at its best.",
  },
  {
    label: "Connect",
    href: "#contact",
    img: "/images/team.jpg",
    copy: "Tell James about your goals — he will personally follow up.",
  },
];

export default function ExplorePanels() {
  return (
    <section data-testid="explore-panels-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:h-[78vh] lg:min-h-[540px]">
      {PANELS.map((p) => (
        <button
          key={p.label}
          data-testid={`explore-panel-${p.label.toLowerCase()}`}
          onClick={() => scrollToId(p.href)}
          className="group relative block h-52 overflow-hidden text-left sm:h-64 lg:h-auto"
        >
          <img
            src={p.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/45 transition-all duration-700 group-hover:bg-black/15" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="font-sans text-lg font-light uppercase tracking-[0.3em] text-white transition-all duration-500 group-hover:opacity-0 sm:text-xl">
              {p.label}
            </span>
            <span className="pointer-events-none absolute flex flex-col items-center px-4 opacity-0 transition-all duration-500 group-hover:opacity-100 lg:px-8">
              <span className="font-sans text-base font-light uppercase tracking-[0.3em] text-white sm:text-lg">
                {p.label}
              </span>
              <span className="mt-4 max-w-[240px] text-xs font-light leading-relaxed text-white/85 lg:whitespace-normal">
                {p.copy}
              </span>
              <span className="mt-5 border-b border-bronze-light/80 pb-1.5 font-sans text-[10px] uppercase tracking-[0.3em] text-bronze-light">
                Explore
              </span>
            </span>
          </div>
        </button>
      ))}
    </section>
  );
}
