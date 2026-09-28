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
            The Rise of <span className="text-bronze">AKG</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-11 text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
            Founded in the Spring of 2017, the Aaron Kirman Group (AKG) was created with
            a mission to foster collaboration, resource sharing, growth, and support
            among like-minded professionals. That vision evolved significantly in the
            Fall of 2022, when AKG transitioned into a brokerage and formed a landmark
            partnership with Christie&rsquo;s International Real Estate, resulting in
            the launch of the formerly named AKG | Christie&rsquo;s International Real
            Estate. What began as a team of 7 agents and staff has since grown into a
            brokerage of more than 300 people as of 2026, reflecting its rapid expansion
            and continued evolution within the luxury real estate industry.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mt-8 text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base">
            The brokerage was founded by Aaron Kirman, President and CEO of
            Christie&rsquo;s International Real Estate | Southern California, and is
            headquartered in Beverly Hills, California. Throughout his career, Aaron has
            consistently been recognized as one of the top agents in the world and was
            recently named the #1 Agent in Los Angeles.* With notable sales including
            &ldquo;The One,&rdquo; the Danny Thomas Estate, the Edie Goetz Estate, and
            many others, Aaron has represented more than $24 billion in luxury home
            sales.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
