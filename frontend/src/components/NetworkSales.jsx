import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Reveal, Eyebrow } from "./Reveal";

export default function NetworkSales() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section data-testid="meet-james-section" id="about" className="bg-white text-ink">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32"
      >
        <div className="order-1 lg:col-span-6">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-6 font-sans text-xl font-light uppercase tracking-[0.3em] sm:text-3xl">
              Meet <span className="text-bronze">James Green</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              For more than two decades, James Green has built his career around people,
              decisions, and the moments when trusted guidance matters most. His
              professional background spans financial services, lending, relocation, and
              client advocacy&mdash;experiences that now shape the way he represents his
              real estate clients across Dallas&ndash;Fort Worth.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              James brings a calm presence to a process that can often feel anything but.
              He listens closely, communicates clearly, and has a natural ability to make
              complex decisions feel more manageable. His approach is measured and
              solutions-oriented, grounded in understanding not only the property or
              transaction at hand, but the priorities and circumstances of the person
              behind it.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              That perspective allows James to meet clients wherever they are in their
              journey. From a first-time buyer working toward homeownership to a family
              relocating to North Texas or an experienced homeowner preparing for what
              comes next, he believes exceptional representation should feel personal,
              informed, and genuinely invested.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 space-y-6">
              <button
                data-testid="meet-james-cta"
                onClick={() => navigate("/contact")}
                className="group flex items-center gap-3 bg-bronze/90 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-[#F1E6D7] transition-all duration-500"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <a
                data-testid="meet-james-follow-youtube"
                href="https://www.youtube.com/@JamesAGreenRealEstate"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60 transition-colors duration-300 hover:text-bronze"
              >
                Follow on YouTube
                <span className="h-px w-12 bg-ink/40 transition-all duration-500 group-hover:w-16 group-hover:bg-bronze" />
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/40 transition-colors duration-300 group-hover:border-bronze">
                  <Play className="h-3 w-3 fill-current" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="order-2 lg:col-span-6" y={50}>
          <div className="relative overflow-hidden" data-testid="meet-james-image">
            <motion.img
              src="/images/james-about-standing.png"
              alt="James Green — Global Real Estate Advisor"
              style={{ y: imgY }}
              className="h-[320px] w-full scale-[1.08] object-cover object-top sm:h-[480px] lg:h-[560px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
