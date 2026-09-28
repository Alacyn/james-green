import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

const LINKS = [
  { label: "Home", href: "top" },
  { label: "About", href: "#about" },
  { label: "Buy", href: "#properties" },
  { label: "Sell", href: "#network" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const go = (href) => {
    setOpen(false);
    setTimeout(() => {
      if (href === "top") {
        window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToId(href);
      }
    }, 60);
  };

  return (
    <>
      <header
        data-testid="main-navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "bg-[#16100C]/55 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            data-testid="nav-logo-home"
            onClick={() => go("top")}
            aria-label="eXp Luxury — home"
            className="flex items-center"
          >
            <img src="/images/exp-luxury-white.webp" alt="eXp Luxury" className="h-8 w-auto sm:h-9" />
          </button>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 lg:flex">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-link-${l.label.toLowerCase()}`}
                  onClick={() => go(l.href)}
                  className="font-sans text-[11px] uppercase tracking-[0.22em] text-white/85 transition-colors duration-300 hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <button
              data-testid="nav-toggle"
              className={`flex h-11 w-11 items-center justify-center text-white transition-all duration-300 lg:hidden ${
                open ? "pointer-events-none opacity-0" : ""
              }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              data-testid="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-0 z-40 flex flex-col items-start justify-center bg-[#16100C]/95 px-10 backdrop-blur-xl"
            >
              <nav className="flex flex-col items-start gap-1.5">
                {LINKS.map((l, i) => (
                  <div key={l.href} className="overflow-hidden">
                    <motion.button
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, delay: 0.07 * i, ease: EASE }}
                      data-testid={`mobile-link-${l.label.toLowerCase()}`}
                      onClick={() => go(l.href)}
                      className="block py-1.5 text-left font-sans text-sm font-light uppercase tracking-[0.3em] text-[#F1E6D7]/85"
                    >
                      {l.label}
                    </motion.button>
                  </div>
                ))}
              </nav>
            </motion.div>
            <motion.button
              data-testid="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed right-5 top-4 z-[60] flex h-11 w-11 items-center justify-center text-white sm:right-8"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
