import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

export default function NetworkSales() {
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
              Drawing on more than two decades of diverse, client-centered professional
              experience, James Green brings a thoughtful, multidimensional perspective
              to real estate&mdash;one that extends well beyond the transaction.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              His background in financial services, lending, relocation, and client
              advocacy gives him a broader understanding of the decisions surrounding
              buying, selling, and moving. For James, real estate is ultimately about
              clarity: understanding your options, considering the bigger picture, and
              moving forward with confidence.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60 sm:text-base">
              Known for his calm presence and approachable style, James takes the time
              to listen, explain the process, and develop a strategy around the person
              in front of him. Whether guiding a first-time buyer, helping a family
              relocate to Dallas&ndash;Fort Worth, or advising an experienced homeowner
              on their next move, his approach remains personal, thoughtful, and
              grounded in genuine care.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 space-y-6">
              <button
                data-testid="meet-james-cta"
                onClick={() => (window.location.href = "mailto:JamesAGreen@eXpRealty.com")}
                className="bg-bronze px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-[#F1E6D7] transition-all duration-500 hover:opacity-90"
              >
                Begin a Conversation
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
              src="/images/james-portrait.png"
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
