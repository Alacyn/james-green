import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

const MENU_COLS = [
  {
    groups: [
      { header: "Home", href: "top", links: [] },
      {
        header: "Aaron Kirman Group",
        href: "#about",
        links: [
          { label: "Aaron Kirman Group", href: "#about" },
          { label: "Our Culture", href: "#culture" },
          { label: "Find Your Place", href: "#connect" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        header: "Listings",
        href: "#featured",
        links: [
          { label: "Featured \u2014 $24B Sold", href: "#featured" },
          { label: "Unmatched Sales", href: "#network" },
        ],
      },
      {
        header: "Media",
        href: "#video",
        links: [{ label: "Empowering Your Success", href: "#video" }],
      },
    ],
  },
  {
    groups: [
      { header: "Market Insights", href: "#featured", links: [] },
      { header: "Contact", href: "#connect", links: [] },
    ],
  },
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
  const tone = solid ? "text-ink" : "text-white";

  return (
    <>
      <header
        data-testid="main-navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.05)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8">
          <nav className="hidden items-center gap-9 lg:flex">
            {["About", "Listings", "Media"].map((label) => (
              <button
                key={label}
                data-testid={`nav-link-${label.toLowerCase()}`}
                onClick={() => setOpen(true)}
                className={`group flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${tone} ${
                  solid ? "text-ink/80 hover:text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            ))}
          </nav>

          <button
            data-testid="nav-logo-home"
            onClick={() => go("top")}
            aria-label="Aaron Kirman — home"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <span className={`font-serif text-[22px] tracking-[-0.01em] transition-colors duration-500 sm:text-[26px] ${tone}`}>
              AARON<span className="tracking-[0.02em]">KIRMAN</span>
            </span>
          </button>

          <div className="flex items-center gap-5 sm:gap-7">
            <button
              data-testid="nav-link-contact"
              onClick={() => go("#connect")}
              className={`hidden font-sans text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 sm:block ${
                solid ? "text-ink/80 hover:text-ink" : "text-white/85 hover:text-white"
              }`}
            >
              Contact
            </button>
            <button
              data-testid="nav-search-button"
              aria-label="Search"
              className={`hidden transition-colors sm:block ${solid ? "text-ink/70 hover:text-ink" : "text-white/85 hover:text-white"}`}
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              data-testid="nav-toggle"
              className={`flex h-11 w-11 items-center justify-center transition-all duration-300 lg:hidden ${
                open ? "pointer-events-none opacity-0" : ""
              } ${tone}`}
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
              className="fixed inset-0 z-40 overflow-y-auto bg-[#8a8a8a]/60 backdrop-blur-2xl"
            >
            <div className="mx-auto flex min-h-full max-w-[1400px] flex-col justify-center px-8 pb-16 pt-28">
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
                {MENU_COLS.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-9">
                    {col.groups.map((group, gi) => (
                      <div key={gi} className="overflow-hidden">
                        <motion.button
                          initial={{ y: "110%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "110%", opacity: 0 }}
                          transition={{ duration: 0.7, delay: 0.05 * (ci + gi), ease: EASE }}
                          data-testid={`menu-group-${group.header.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => go(group.href)}
                          className="block text-left font-serif text-xl uppercase tracking-[0.08em] text-white sm:text-2xl"
                        >
                          {group.header}
                        </motion.button>
                        {group.links.length > 0 && (
                          <div className="mt-4 flex flex-col gap-3">
                            {group.links.map((l) => (
                              <button
                                key={l.label}
                                data-testid={`menu-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                onClick={() => go(l.href)}
                                className="block text-left font-sans text-sm font-light text-white/85 transition-colors duration-300 hover:text-white"
                              >
                                {l.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            </motion.div>
            <motion.button
              data-testid="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed right-6 top-5 z-[60] flex h-11 w-11 items-center justify-center text-white sm:right-8"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
