import { Reveal } from "./Reveal";

export default function About() {
  return (
    <section data-testid="thoughtful-guidance-section" id="network" className="bg-white text-ink">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:py-32">
        <Reveal y={24}>
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-ink">
            Thoughtful Guidance
          </p>
          <span className="mt-5 block h-px w-16 bg-ink" />
          <h2 className="mt-9 font-sans text-2xl font-normal uppercase tracking-[0.2em] sm:text-4xl">
            What Comes <span className="text-bronze">Next</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-left text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
            A move is rarely just about a property. It&rsquo;s about where
            you&rsquo;re going, what matters to you, and making informed decisions
            along the way. James Green brings clarity, perspective, and a personal
            approach to every move&mdash;helping buyers, sellers, and those
            relocating throughout Dallas&ndash;Fort Worth understand their options
            and move forward with confidence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
