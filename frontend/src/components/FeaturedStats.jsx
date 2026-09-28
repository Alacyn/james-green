import { Reveal } from "./Reveal";

const PHRASES = ["Local Expertise", "Global Network", "Personal Representation"];

export default function FeaturedStats() {
  return (
    <section data-testid="featured-stats-section" id="featured" className="bg-coal">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-24 lg:py-28">
        <Reveal y={20}>
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-y-0">
            {PHRASES.map((phrase, i) => (
              <span key={phrase} className="flex items-center">
                <span className="font-sans text-xl font-light uppercase tracking-[0.3em] text-[#F1E6D7] sm:text-2xl">
                  {phrase}
                </span>
                {i < PHRASES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-8 hidden h-6 w-px bg-bronze-light/60 lg:block"
                  />
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
