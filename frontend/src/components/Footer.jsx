import { ArrowUpRight } from "lucide-react";
import { Reveal, scrollToId } from "./Reveal";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/aaronkirman/", testid: "footer-social-instagram" },
  { label: "YouTube", href: "https://www.youtube.com/c/AaronKirmanVlog/videos", testid: "footer-social-youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aaron-kirman-b48a6423", testid: "footer-social-linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/aaronkirmanpage", testid: "footer-social-facebook" },
  { label: "TikTok", href: "https://www.tiktok.com/@aaronkirman", testid: "footer-social-tiktok" },
  { label: "X", href: "https://twitter.com/aaronkirman", testid: "footer-social-x" },
];

const NAV = [
  { label: "About", href: "#about" },
  { label: "Network", href: "#network" },
  { label: "Featured", href: "#featured" },
  { label: "Culture", href: "#culture" },
  { label: "Connect", href: "#connect" },
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
                  <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="#B18463" strokeWidth="1.4" />
                  <text x="20" y="26" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" letterSpacing="1.5" fill="#F5F0EA">
                    AK
                  </text>
                </svg>
                <div className="leading-none">
                  <p className="font-serif text-xl tracking-[0.14em]">AARON KIRMAN</p>
                  <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.5em] text-bronze-light">Group</p>
                </div>
              </div>
              <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-white/55">
                A Christie&rsquo;s International Real Estate brokerage. Headquartered at
                433 N Camden Dr #600, Beverly Hills, CA 90210.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    data-testid={s.testid}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 font-sans text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:text-bronze-light"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <Reveal y={24} delay={0.1}>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze">Contact</p>
              <ul className="mt-6 space-y-4 text-sm font-light text-white/70">
                <li>Aaron Kirman</li>
                <li>CA DRE #01296524</li>
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
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze">Explore</p>
              <ul className="mt-6 space-y-4 text-sm font-light text-white/70">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <button
                      data-testid={`footer-link-${n.label.toLowerCase()}`}
                      onClick={() => scrollToId(n.href)}
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

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
            &copy; 2026 Aaron Kirman Group
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
            CA DRE #01296524
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
            Equal Housing Opportunity
          </p>
        </div>
        <p className="mt-4 font-sans text-[10px] tracking-[0.15em] text-white/25">
          * 2023 Los Angeles Business Journal
        </p>
      </div>
    </footer>
  );
}
