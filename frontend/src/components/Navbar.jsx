import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

const MENU = [
  { label: "Aaron Kirman Group", href: "#about" },
  { label: "Unmatched Sales", href: "#network" },
  { label: "Featured \u2014 $24B Sold", href: "#featured" },
  { label: "Our Culture", href: "#culture" },
  { label: "Find Your Place", href: "#connect" },
];

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
          scrolled ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.05)] backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="relative mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8">
          <nav className="hidden items-center gap-9 lg:flex">
            {["About", "Listings", "Media"].map((label) => (
              <button
                key={label}
                data-testid={`nav-link-${label.toLowerCase()}`}
                onClick={() => setOpen(true)}
                className="group flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.22em] text-ink/80 transition-colors duration-300 hover:text-ink"
              >
                {label}
                <ChevronDown className="h-3.5 w-3.5 text-ink/50 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            ))}
          </nav>

          <button
            data-testid="nav-logo-home"
            onClick={() =>
              window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Aaron Kirman — home"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <span className="font-serif text-[22px] tracking-[-0.01em] text-ink sm:text-[26px]">
              AARON<span className="tracking-[0.02em]">KIRMAN</span>
            </span>
          </button>

          <div className="flex items-center gap-5 sm:gap-7">
            <button
              data-testid="nav-link-contact"
              onClick={() => scrollToId("#connect")}
              className="hidden font-sans text-[11px] uppercase tracking-[0.22em] text-ink/80 transition-colors duration-300 hover:text-ink sm:block"
            >
              Contact
            </button>
            <button
              data-testid="nav-search-button"
              aria-label="Search"
              className="hidden text-ink/70 transition-colors hover:text-ink sm:block"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              data-testid="nav-toggle"
              className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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
            className="fixed inset-0 z-40 flex flex-col justify-center bg-coal/98 px-8 backdrop-blur-xl"
          >
            <button
              data-testid="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-5 flex h-11 w-11 items-center justify-center text-white lg:right-8"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col gap-2">
              {MENU.map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
                    data-testid={`menu-link-${i + 1}`}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => scrollToId(l.href), 60);
                    }}
                    className="block py-2 text-left font-serif text-3xl font-light uppercase tracking-wide text-[#F5F0EA] sm:text-4xl"
                  >
                    {l.label}
                  </motion.button>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
