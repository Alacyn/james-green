import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

export default function TeamParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      data-testid="team-parallax-banner"
      className="relative h-[62vh] min-h-[420px] overflow-hidden bg-black sm:h-[78vh]"
    >
      <motion.img
        src="/images/team.jpg"
        alt="The Aaron Kirman Group team"
        style={{ y }}
        className="absolute -top-[10%] left-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-9 left-6 z-10 sm:left-10 lg:left-16">
        <Reveal y={24}>
          <p className="max-w-md font-sans text-[10px] uppercase leading-relaxed tracking-[0.32em] text-white/85 sm:text-[11px]">
            More than 300 agents &amp; staff — headquartered in Beverly Hills, California
          </p>
        </Reveal>
      </div>
    </section>
  );
}
