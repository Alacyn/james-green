import { ArrowUpRight } from "lucide-react";
import { Reveal, scrollToId } from "./Reveal";

const NAV = [
  { label: "Home", href: "top" },
  { label: "About", href: "#about" },
  { label: "Buy", href: "#featured" },
  { label: "Sell", href: "#network" },
  { label: "Contact", href: "#connect" },
];

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 sm:px-10 sm:pt-28 lg:px-16">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal y={24}>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
                  <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="#A8926E" strokeWidth="1.4" />
                  <text x="20" y="26" textAnchor="middle" fontFamily="Bodoni Moda, Didot, Georgia, serif" fontSize="15" letterSpacing="1" fill="#F5F0EA">
                    JG
                  </text>
                </svg>
                <div className="leading-none">
                  <p className="font-serif text-xl tracking-[0.14em] text-[#F5F0EA]">JAMES GREEN</p>
                  <p className="mt-1.5 font-sans text-[9px] uppercase tracking-[0.5em] text-bronze-light">
                    Global Real Estate Advisor
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <button
                  data-testid="footer-cta-begin"
                  onClick={() => scrollToId("#connect")}
                  className="group flex items-center gap-1 font-sans text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:text-bronze-light"
                >
                  Begin a Conversation
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <Reveal y={24} delay={0.1}>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light">Contact</p>
              <ul className="mt-6 space-y-4 text-sm font-light text-white/70">
                <li>James Green</li>
                <li>
                  <a data-testid="footer-phone-link" href="tel:4242497162" className="transition-colors hover:text-bronze-light">
                    (424) 249-7162
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal y={24} delay={0.2}>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light">Explore</p>
              <ul className="mt-6 space-y-4 text-sm font-light text-white/70">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <button
                      data-testid={`footer-link-${n.label.toLowerCase()}`}
                      onClick={() => {
                        if (n.href === "top") {
                          window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          scrollToId(n.href);
                        }
                      }}
                      className="transition-colors hover:text-bronze-light"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
            &copy; 2026 James Green
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
            Global Real Estate Advisor
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
            Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
}
