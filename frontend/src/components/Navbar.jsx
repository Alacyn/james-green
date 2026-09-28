import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Network", href: "#network" },
  { label: "Featured", href: "#featured" },
  { label: "Culture", href: "#culture" },
  { label: "Connect", href: "#connect" },
];

const go = (href, after) => {
  if (after) after();
  setTimeout(() => scrollToId(href), 60);
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <header
        data-testid="main-navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <button
            data-testid="nav-logo-home"
            onClick={() => window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
            aria-label="Aaron Kirman Group — home"
          >
            <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
              <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="#B18463" strokeWidth="1.4" />
              <text x="20" y="26" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" letterSpacing="1.5" fill="#F5F0EA">
                AK
              </text>
            </svg>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-lg tracking-[0.14em]">AARON KIRMAN</span>
              <span className="font-sans text-[9px] uppercase tracking-[0.5em] text-bronze-light">Group</span>
            </span>
          </button>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                onClick={() => go(l.href)}
                className="group relative font-sans text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-bronze transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
            <button
              data-testid="nav-cta-join"
              onClick={() => go("#connect")}
              className="border border-bronze/70 px-6 py-3 font-sans text-[11px] uppercase tracking-[0.3em] text-bronze-light transition-all duration-500 hover:bg-bronze hover:text-black"
            >
              Join AKG
            </button>
          </nav>

          <button
            data-testid="nav-toggle"
            className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-coal/98 px-8 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
                    data-testid={`mobile-link-${l.label.toLowerCase()}`}
                    onClick={() => go(l.href, () => setOpen(false))}
                    className="block py-2 text-left font-serif text-5xl font-light uppercase text-[#F5F0EA]"
                  >
                    {l.label}
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              data-testid="mobile-cta-join"
              onClick={() => go("#connect", () => setOpen(false))}
              className="mt-10 w-full border border-bronze px-6 py-4 font-sans text-xs uppercase tracking-[0.3em] text-bronze-light"
            >
              Join AKG
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
