import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

export default function NetworkSales() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section data-testid="network-sales-section" id="network" className="bg-white text-ink">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32"
      >
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Reveal>
            <Eyebrow>Unparalleled Network</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-normal uppercase tracking-[0.04em] sm:text-5xl">
              Unmatched <span className="text-bronze">Sales</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              With a remarkable track record of notable sales, including prestigious
              properties like John Lautner&rsquo;s Garcia House, Scott Johnson&rsquo;s
              The Wall House, Richard Landry&rsquo;s Brentwood Estate, and many more,
              the brokerage has amassed $19 billion in properties sold. These
              accomplished agents are revolutionizing one of the most dominant and
              competitive industries in the world. Their remarkable achievements have
              already earned them the distinguished title of the #1 Real Estate Company
              in Los Angeles,* solidifying their position as unrivaled industry leaders.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              With its recent expansion into the San Fernando Valley, Santa Barbara,
              Brentwood and the OC, this brokerage continues to soar to new heights.
              Through their unmatched industry knowledge, unparalleled network, and a
              steadfast commitment to excellence, Christie&rsquo;s International Real
              Estate | Southern California remains at the forefront of the industry,
              leaving an indelible mark on the world of luxury real estate.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-9 font-sans text-[11px] uppercase tracking-[0.25em] text-ink/40">
              * 2023 Los Angeles Business Journal
            </p>
          </Reveal>
        </div>

        <Reveal className="order-1 lg:order-2 lg:col-span-6" y={50}>
          <div className="relative overflow-hidden" data-testid="network-sales-image">
            <motion.img
              src="/images/network.jpg"
              alt="Landmark luxury estate represented by the brokerage"
              style={{ y: imgY }}
              className="h-[320px] w-full scale-[1.12] object-cover sm:h-[480px] lg:h-[560px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
