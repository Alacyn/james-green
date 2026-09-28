import { Reveal, Eyebrow } from "./Reveal";

export default function About() {
  return (
    <section data-testid="about-section" id="about" className="bg-paper text-ink">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-40">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.02] sm:text-5xl lg:text-6xl">
              The Rise of <span className="italic text-bronze">AKG</span>
            </h2>
            <span className="mt-9 block h-px w-24 bg-bronze" />
          </Reveal>
        </div>

        <div className="space-y-9 lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            <p className="text-lg font-light leading-relaxed text-black/75 sm:text-xl">
              Founded in the Spring of 2017, the Aaron Kirman Group (AKG) was created
              with a mission to foster collaboration, resource sharing, growth, and
              support among like-minded professionals. That vision evolved
              significantly in the Fall of 2022, when AKG transitioned into a
              brokerage and formed a landmark partnership with Christie&rsquo;s
              International Real Estate, resulting in the launch of the formerly named
              AKG | Christie&rsquo;s International Real Estate. What began as a team
              of 7 agents and staff has since grown into a brokerage of more than 300
              people, reflecting its rapid expansion and continued evolution within
              the luxury real estate industry.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg font-light leading-relaxed text-black/75 sm:text-xl">
              The brokerage was founded by Aaron Kirman, President and CEO of
              Christie&rsquo;s International Real Estate | Southern California, and is
              headquartered in Beverly Hills, California. Throughout his career, Aaron
              has consistently been recognized as one of the top agents in the world
              and was recently named the #1 Agent in Los Angeles.* With notable sales
              including &ldquo;The One,&rdquo; the Danny Thomas Estate, the Edie Goetz
              Estate, and many others, Aaron has represented more than $24 billion in
              luxury home sales.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-black/40">
              * 2023 Los Angeles Business Journal
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
