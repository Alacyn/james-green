import { Reveal } from "./Reveal";

const PHRASES = ["Local Expertise", "Global Network", "Personal Representation"];

export default function FeaturedStats() {
  return (
    <section data-testid="featured-stats-section" id="featured" className="bg-coal">
      <div className="mx-auto max-w-5xl px-6 py-14 text-center sm:py-16 lg:py-20">
        <Reveal y={20}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {PHRASES.map((phrase, i) => (
              <span key={phrase} className="flex items-center">
                <span className="font-sans text-xs font-light uppercase tracking-[0.3em] text-[#F1E6D7] sm:text-sm">
                  {phrase}
                </span>
                {i < PHRASES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-6 hidden h-4 w-px bg-bronze-light/60 sm:block"
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
