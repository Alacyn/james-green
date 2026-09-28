import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

export default function NetworkSales() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section data-testid="approach-section" id="network" className="bg-white text-ink">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32"
      >
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Reveal>
            <Eyebrow>How James Works</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-normal uppercase tracking-[0.04em] sm:text-5xl">
              Listen. Educate. <span className="text-bronze">Advise.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              Whether guiding a first-time buyer through a process that once felt out
              of reach, helping a family relocate to Dallas-Fort Worth, or advising an
              experienced homeowner preparing for their next move, James takes the time
              to listen, educate, and develop a strategy tailored to the person in
              front of him.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              His brand is built around relationships, professionalism, integrity, and
              a high level of personal service — the kind of advisor who genuinely
              cares about the people he serves, before and long after closing.
            </p>
          </Reveal>
        </div>

        <Reveal className="order-1 lg:order-2 lg:col-span-6" y={50}>
          <div className="relative overflow-hidden" data-testid="approach-image">
            <motion.img
              src="/images/network.jpg"
              alt="Luxury home represented by James Green"
              style={{ y: imgY }}
              className="h-[320px] w-full scale-[1.12] object-cover sm:h-[480px] lg:h-[560px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
