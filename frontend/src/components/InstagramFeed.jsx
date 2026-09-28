import { Reveal } from "./Reveal";

const IG_URL = "https://www.instagram.com/jamesagreenrealestate";
const TILES = ["/images/team.jpg", "/images/hero.jpg", "/images/network.jpg"];

export default function InstagramFeed() {
  return (
    <section data-testid="instagram-feed-section" className="border-t border-white/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light">
                Follow
              </p>
              <a
                data-testid="instagram-feed-link"
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-block"
              >
                <h2 className="font-serif text-4xl font-light text-[#F5F0EA] transition-colors duration-300 group-hover:text-bronze-light sm:text-5xl">
                  @jamesagreenrealestate
                </h2>
              </a>
            </div>
            <a
              data-testid="instagram-follow-cta"
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-6 py-3 font-sans text-[11px] uppercase tracking-[0.3em] text-white/70 transition-all duration-500 hover:border-bronze hover:bg-bronze hover:text-black"
            >
              Follow on Instagram
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
          {TILES.map((src, i) => (
            <Reveal key={i} delay={0.08 * i} y={24}>
              <a
                data-testid={`instagram-tile-${i + 1}`}
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden"
              >
                <img
                  src={src}
                  alt="James Green Real Estate on Instagram"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
