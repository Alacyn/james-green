import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE, scrollToId } from "./Reveal";

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
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex -translate-y-12 flex-col items-center px-6 text-center sm:-translate-y-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          data-testid="hero-advisor-line"
          className="whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.3em] text-white/95 sm:text-sm sm:tracking-[0.45em]"
        >
          Global Real Estate Advisor
        </motion.p>

        <h1
          data-testid="hero-title"
          className="mt-3 overflow-hidden whitespace-nowrap font-serif text-4xl font-normal uppercase tracking-[0.04em] text-white sm:mt-4 sm:text-6xl lg:text-7xl"
        >
          <motion.span
            className="block"
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.3, delay: 0.55, ease: EASE }}
          >
            James Green
          </motion.span>
        </h1>

        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: EASE }}
          data-testid="hero-explore-button"
          onClick={() => scrollToId("#about")}
          className="group mt-6 flex items-center gap-3 rounded-none border border-white/50 bg-[#654731]/50 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-md transition-all duration-500 hover:border-[#654731] hover:bg-[#654731]/85"
        >
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </motion.button>
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
