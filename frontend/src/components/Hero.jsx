import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./Reveal";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-white"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img
          src="/images/interior.png"
          alt="Luxury estate interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <h1
          data-testid="hero-title"
          className="overflow-hidden font-serif text-5xl font-normal uppercase tracking-[0.04em] text-white sm:text-6xl lg:text-7xl"
        >
          <motion.span
            className="block"
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
          >
            James Green
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="mt-6 font-sans text-[11px] uppercase tracking-[0.42em] text-white/85 sm:text-xs"
        >
          Global Real Estate Advisor
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ scaleY: [0, 1, 1, 0], opacity: [1, 1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="block h-14 w-px origin-top bg-gradient-to-b from-white/80 via-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
