import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

const LINKS = [
  { label: "Home", href: "top" },
  { label: "About", href: "#about" },
  { label: "Featured", href: "#featured" },
  { label: "Connect", href: "#connect" },
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

  const solid = scrolled && !open;

  return (
    <>
      <header
        data-testid="main-navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.05)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            data-testid="nav-logo-home"
            onClick={() => go("top")}
            aria-label="James Green — home"
            className="flex items-baseline gap-2"
          >
            <span className={`font-serif text-[20px] tracking-[0.08em] transition-colors duration-500 sm:text-[22px] ${solid ? "text-ink" : "text-white"}`}>
              JAMES GREEN
            </span>
            <span className={`hidden font-sans text-[9px] uppercase tracking-[0.4em] transition-colors duration-500 sm:block ${solid ? "text-ink/50" : "text-white/60"}`}>
              Global
            </span>
          </button>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 lg:flex">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-link-${l.label.toLowerCase()}`}
                  onClick={() => go(l.href)}
                  className={`font-sans text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    solid ? "text-ink/80 hover:text-ink" : "text-white/85 hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <button
              data-testid="nav-cta-begin"
              onClick={() => go("#connect")}
              className={`hidden border px-6 py-3 font-sans text-[10px] uppercase tracking-[0.28em] transition-all duration-500 md:block ${
                solid
                  ? "border-ink/60 text-ink hover:bg-ink hover:text-white"
                  : "border-white/70 text-white hover:bg-white/10"
              }`}
            >
              Begin a Conversation
            </button>
            <button
              data-testid="nav-toggle"
              className={`flex h-11 w-11 items-center justify-center transition-all duration-300 lg:hidden ${
                open ? "pointer-events-none opacity-0" : ""
              } ${solid ? "text-ink" : "text-white"}`}
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
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-coal/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col items-center gap-2">
                {LINKS.map((l, i) => (
                  <div key={l.href} className="overflow-hidden">
                    <motion.button
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, delay: 0.07 * i, ease: EASE }}
                      data-testid={`mobile-link-${l.label.toLowerCase()}`}
                      onClick={() => go(l.href)}
                      className="block py-2 text-center font-serif text-4xl font-light uppercase tracking-[0.06em] text-[#F5F0EA]"
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
                data-testid="mobile-cta-begin"
                onClick={() => go("#connect")}
                className="mt-10 border border-bronze-light/70 px-8 py-4 font-sans text-[11px] uppercase tracking-[0.28em] text-bronze-light"
              >
                Begin a Conversation
              </motion.button>
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
