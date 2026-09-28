import { Reveal } from "./Reveal";

export default function About() {
  return (
    <section data-testid="thoughtful-guidance-section" id="network" className="bg-white text-ink">
      <div className="mx-auto max-w-[1360px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="max-w-3xl">
          <Reveal y={24}>
            <h2 className="font-sans text-xl font-light uppercase tracking-[0.3em] sm:text-3xl">
              What Comes <span className="text-bronze">Next</span>
            </h2>
            <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.35em] text-bronze">
              Thoughtful Guidance
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-left text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
              A move is rarely just about a property. It&rsquo;s about where
              you&rsquo;re going, what matters to you, and making informed decisions
              along the way. James Green brings clarity, perspective, and a personal
              approach to every move&mdash;helping buyers, sellers, and those
              relocating throughout Dallas&ndash;Fort Worth understand their options
              and move forward with confidence.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
