import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TeamParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      data-testid="team-parallax-banner"
      className="relative h-[60vh] min-h-[380px] overflow-hidden bg-white sm:h-[75vh]"
    >
      <motion.img
        src="/images/team.jpg"
        alt="Luxury real estate team"
        style={{ y }}
        className="absolute -top-[8%] left-0 h-[116%] w-full object-cover"
      />
    </section>
  );
}
