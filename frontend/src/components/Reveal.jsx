import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 40, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, light = false }) => (
  <p
    className={`font-sans text-[11px] uppercase tracking-[0.35em] ${
      light ? "text-bronze-light" : "text-bronze"
    }`}
  >
    {children}
  </p>
);

export const scrollToId = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
