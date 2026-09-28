import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "./Reveal";

const YT_URL = "https://www.youtube.com/@JamesAGreenRealEstate";

export default function YouTubeSection() {
  return (
    <section data-testid="youtube-section" className="relative overflow-hidden bg-[#4A3423]">
      <img
        src="/images/youtube-bg.png"
        alt="North Texas living — James Green YouTube series"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#4A3423]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E2013]/85 via-[#4A3423]/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1600px] items-center px-6 py-24 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <Reveal y={24}>
            <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-white/80">
              North Texas with James
            </p>
          </Reveal>
          <Reveal delay={0.1} y={30}>
            <h2 className="mt-6 font-sans text-3xl font-light uppercase leading-[1.15] text-white sm:text-5xl">
              Neighborhood tours,
              <br />
              architectural
              <br />
              spotlights{" "}
              <span className="text-bronze-light">&amp; the journey home.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-white/85 sm:text-base">
              Follow the YouTube series exploring life across North Texas&mdash;one
              community, one story at a time.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              data-testid="youtube-watch-button"
              href={YT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 border border-white/60 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-white/10"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Watch on YouTube
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="ml-auto hidden lg:block">
          <a
            data-testid="youtube-play-circle"
            href={YT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch on YouTube"
            className="flex h-28 w-28 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-500 hover:scale-105 hover:bg-white/10"
          >
            <Play className="h-6 w-6 fill-current pl-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
