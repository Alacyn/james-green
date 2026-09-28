import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function FeaturedProperties() {
  const trackRef = useRef(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get(`${API}/properties`)
      .then((res) => setProperties(res.data))
      .catch(() => setProperties([]));
  }, []);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * (track.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section data-testid="featured-properties-section" id="properties" className="bg-paper py-20 text-ink sm:py-28 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <Reveal y={24}>
          <h2 className="text-center font-sans text-xl font-light uppercase tracking-[0.35em] sm:text-3xl">
            Featured Properties
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15} y={40}>
        <div className="relative mt-12 lg:mt-16">
          <div
            ref={trackRef}
            data-testid="properties-track"
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:gap-6 sm:px-10 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {properties.map((p) => (
              <article
                key={p.id}
                data-testid="property-card"
                className="group relative w-[85%] shrink-0 snap-start overflow-hidden sm:w-[60%] lg:w-[42%]"
              >
                <div className="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-[520px]">
                  <img
                    src={p.image_url}
                    alt={p.address}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                    <h3
                      data-testid="property-address"
                      className="font-sans text-lg font-light uppercase tracking-[0.25em] text-white sm:text-2xl"
                    >
                      {p.address}
                    </h3>
                    <p className="mt-3 text-xs font-light tracking-[0.08em] text-white/85 sm:text-sm">
                      {p.beds} | {p.baths} | {p.sqft}
                    </p>
                    <p data-testid="property-price" className="mt-2 text-sm font-light tracking-[0.1em] text-bronze-light sm:text-base">
                      {p.price}
                    </p>
                  </div>
                </div>
              </article>
            ))}
            {properties.length === 0 && (
              <p className="w-full py-16 text-center text-sm font-light text-ink/50">
                Featured properties coming soon.
              </p>
            )}
          </div>

          {properties.length > 1 && (
            <>
              <button
                data-testid="properties-scroll-left"
                onClick={() => scrollBy(-1)}
                aria-label="Previous properties"
                className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/60 lg:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                data-testid="properties-scroll-right"
                onClick={() => scrollBy(1)}
                aria-label="Next properties"
                className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/60 lg:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
