import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

export default function NetworkSales() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section data-testid="network-sales-section" id="network" className="bg-white text-ink">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-20 lg:px-16 lg:py-40"
      >
        <Reveal className="lg:col-span-5" y={60}>
          <div className="relative overflow-hidden" data-testid="network-sales-image">
            <motion.img
              src="/images/network.jpg"
              alt="Landmark luxury estate represented by the brokerage"
              style={{ y: imgY }}
              className="h-[420px] w-full scale-[1.18] object-cover sm:h-[560px] lg:h-[640px]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>Unparalleled Network</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.02] sm:text-5xl lg:text-6xl">
              Unmatched <span className="italic text-bronze">Sales</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-lg font-light leading-relaxed text-black/75 sm:text-xl">
              With a remarkable track record of notable sales, including prestigious
              properties like John Lautner&rsquo;s Garcia House, Scott Johnson&rsquo;s
              The Wall House, Richard Landry&rsquo;s Brentwood Estate, and many more,
              the brokerage has amassed $19 billion in properties sold. These
              accomplished agents are revolutionizing one of the most dominant and
              competitive industries in the world. Their remarkable achievements have
              already earned them the distinguished title of the #1 Real Estate
              Company in Los Angeles,* solidifying their position as unrivaled
              industry leaders.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-lg font-light leading-relaxed text-black/75 sm:text-xl">
              With its recent expansion into the San Fernando Valley, Santa Barbara,
              Brentwood and the OC, this brokerage continues to soar to new heights.
              Through their unmatched industry knowledge, unparalleled network, and a
              steadfast commitment to excellence, Christie&rsquo;s International Real
              Estate | Southern California remains at the forefront of the industry,
              leaving an indelible mark on the world of luxury real estate.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-10 font-sans text-xs uppercase tracking-[0.25em] text-black/40">
              * 2023 Los Angeles Business Journal
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
