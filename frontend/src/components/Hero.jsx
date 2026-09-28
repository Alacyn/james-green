import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./Reveal";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="bg-white px-4 pb-12 pt-[88px] sm:px-[60px] sm:pb-[60px] sm:pt-[100px]"
    >
      <div className="relative h-[78vh] min-h-[440px] overflow-hidden sm:h-[82vh]">
        <motion.img
          src="/images/hero.jpg"
          alt="The Aaron Kirman Group"
          style={{ y: imgY }}
          className="absolute -top-[5%] left-0 h-[110%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="absolute bottom-7 left-6 z-10 sm:bottom-11 sm:left-11">
          <h1
            data-testid="hero-title"
            className="overflow-hidden font-serif text-[26px] font-normal uppercase leading-tight tracking-[0.02em] text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]"
          >
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
            >
              Aaron Kirman Group
            </motion.span>
          </h1>
        </div>
      </div>
    </section>
  );
}
