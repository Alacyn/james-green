import { Reveal, Eyebrow } from "./Reveal";

export default function About() {
  return (
    <section data-testid="thoughtful-guidance-section" id="network" className="bg-white text-ink">
      <div className="mx-auto max-w-4xl px-8 py-20 text-center sm:px-10 sm:py-28 lg:py-32">
        <Reveal y={24}>
          <Eyebrow>Thoughtful Guidance</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} y={30}>
          <h2 className="mt-8 font-sans text-xl font-light uppercase tracking-[0.3em] sm:text-3xl">
            What Comes <span className="text-bronze-light">Next</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-10 max-w-2xl text-left text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
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
