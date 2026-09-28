import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./Reveal";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden bg-black"
    >
      <motion.div
        style={{ y: imgY }}
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: EASE }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero.jpg"
          alt="The Aaron Kirman Group"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="mb-7 flex items-center gap-4"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.45, ease: EASE }}
            className="hidden h-px w-16 origin-left bg-bronze sm:block"
          />
          <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/70 sm:text-[11px]">
            Christie&rsquo;s International Real Estate | Southern California
          </p>
        </motion.div>

        <h1
          className="font-serif font-light uppercase leading-[0.92] text-white"
          style={{ fontSize: "clamp(3.4rem, 10.5vw, 10rem)" }}
        >
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
            >
              Aaron Kirman
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.3, delay: 0.56, ease: EASE }}
            >
              <span className="italic text-bronze-light">Group</span>
              <span className="not-italic">.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 right-6 z-10 hidden flex-col items-center gap-4 sm:right-10 sm:flex lg:right-16"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [0, 1, 1, 0], opacity: [1, 1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="h-16 w-px origin-top bg-gradient-to-b from-white/70 via-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
