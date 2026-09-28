import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section data-testid="meet-james-section" id="about" className="bg-white text-ink">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32"
      >
        <Reveal className="order-1 lg:col-span-6" y={50}>
          <div className="relative overflow-hidden" data-testid="meet-james-image">
            <motion.img
              src="/images/hero.jpg"
              alt="James Green — Global Real Estate Advisor"
              style={{ y: imgY }}
              className="h-[320px] w-full scale-[1.12] object-cover sm:h-[480px] lg:h-[560px]"
            />
          </div>
        </Reveal>

        <div className="order-2 lg:col-span-6">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-normal uppercase tracking-[0.04em] sm:text-5xl">
              Meet <span className="text-bronze">James Green</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              Drawing on more than two decades of diverse, client-centered professional
              experience, James Green brings a thoughtful, multidimensional approach to
              real estate that goes well beyond the transaction. His background in
              financial services, lending, relocation, and client advocacy gives him a
              broader perspective on the decisions that surround buying, selling, and
              moving.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              For James, real estate is ultimately about clarity. He believes clients
              make their best decisions when they understand their options, the
              financial considerations behind them, and what each step means for their
              bigger picture. That philosophy shapes the way he works with every
              client.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
