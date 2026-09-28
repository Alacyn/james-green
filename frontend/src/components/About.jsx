import { Reveal, Eyebrow } from "./Reveal";

export default function About() {
  return (
    <section data-testid="about-section" id="about" className="bg-paper text-ink">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28 lg:py-32">
        <Reveal y={24}>
          <Eyebrow>About</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} y={30}>
          <h2 className="mt-7 font-serif text-3xl font-normal uppercase tracking-[0.04em] sm:text-5xl">
            The James Green <span className="text-bronze">Approach</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-11 text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
            Drawing on more than two decades of diverse, client-centered professional
            experience, James Green brings a thoughtful, multidimensional approach to
            real estate that goes well beyond the transaction. His background in
            financial services, lending, relocation, and client advocacy gives him a
            broader perspective on the decisions that surround buying, selling, and
            moving.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mt-8 text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
            For James, real estate is ultimately about clarity. He believes clients
            make their best decisions when they understand their options, the financial
            considerations behind them, and what each step means for their bigger
            picture. That philosophy shapes the way he works with every client.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
