import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal, EASE } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function FeaturedProperties() {
  const trackRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    axios.get(`${API}/properties`)
      .then((res) => setProperties(res.data))
      .catch(() => setProperties([]));
  }, []);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const openListing = (p) => {
    setSelected(p);
    setPhotoIndex(0);
  };

  const gallery = selected
    ? selected.photos?.length
      ? selected.photos
      : [selected.image_url]
    : [];
  const stepPhoto = (dir) =>
    setPhotoIndex((i) => (i + dir + gallery.length) % gallery.length);

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
            Currently Representing
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15} y={40}>
        <div className="relative mt-12 lg:mt-16">
          <div
            ref={trackRef}
            data-testid="properties-track"
            className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:gap-6 sm:px-10 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${properties.length === 1 ? "justify-center" : ""}`}
          >
            {properties.map((p, i) => (
              <article
                key={p.id}
                data-testid="property-card"
                role="button"
                tabIndex={0}
                aria-label={`View details for ${p.address}`}
                onClick={() => openListing(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openListing(p);
                }}
                className={`group relative ${i === 0 ? "w-[90%] sm:w-[78%] lg:w-[64%]" : "w-[85%] sm:w-[60%] lg:w-[42%]"} shrink-0 cursor-pointer snap-start overflow-hidden`}
              >
                <div className={`relative overflow-hidden ${i === 0 ? "h-[340px] sm:h-[480px] lg:h-[640px]" : "h-[300px] sm:h-[420px] lg:h-[520px]"}`}>
                  {p.image_url ? (
                    <>
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
                        {(p.beds || p.baths || p.sqft) && (
                          <p className="mt-3 text-xs font-light tracking-[0.08em] text-white/85 sm:text-sm">
                            {[p.beds, p.baths, p.sqft].filter(Boolean).join(" | ")}
                          </p>
                        )}
                        {p.price && (
                          <p data-testid="property-price" className="mt-2 text-sm font-light tracking-[0.1em] text-bronze-light sm:text-base">
                            {p.price}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-coal px-8 text-center">
                      <h3
                        data-testid="property-address"
                        className="font-sans text-xl font-light uppercase tracking-[0.3em] text-[#F1E6D7] sm:text-3xl"
                      >
                        {p.address}
                      </h3>
                      <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light sm:text-xs">
                        {p.city}, {p.state}
                      </p>
                    </div>
                  )}
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

      <AnimatePresence>
        {selected && (
          <motion.div
            data-testid="property-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-coal lg:flex-row"
            >
              <button
                data-testid="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close listing details"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/50 text-white transition-all duration-300 hover:bg-black/80"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="lg:w-[55%] lg:shrink-0">
                <div className="relative">
                  <img
                    data-testid="modal-photo"
                    src={gallery[photoIndex]}
                    alt={`${selected.address} photo ${photoIndex + 1}`}
                    className="h-64 w-full object-cover sm:h-80 lg:h-[540px]"
                  />
                  {gallery.length > 1 && (
                    <>
                      <button
                        data-testid="modal-photo-prev"
                        onClick={() => stepPhoto(-1)}
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        data-testid="modal-photo-next"
                        onClick={() => stepPhoto(1)}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <span
                        data-testid="modal-photo-count"
                        className="absolute bottom-3 right-3 border border-white/25 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm"
                      >
                        {photoIndex + 1} / {gallery.length}
                      </span>
                    </>
                  )}
                </div>
                {gallery.length > 1 && (
                  <div data-testid="modal-thumbs" className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        data-testid={`modal-thumb-${i}`}
                        onClick={() => setPhotoIndex(i)}
                        aria-label={`Photo ${i + 1}`}
                        className={`h-14 w-20 shrink-0 overflow-hidden border transition-all duration-300 ${i === photoIndex ? "border-bronze-light opacity-100" : "border-transparent opacity-50 hover:opacity-90"}`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-10 lg:max-h-[92vh]">
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-bronze-light">
                  Currently Representing
                </p>
                <h3
                  data-testid="modal-address"
                  className="mt-4 font-sans text-xl font-light uppercase tracking-[0.25em] text-[#F1E6D7] sm:text-2xl"
                >
                  {selected.address}
                </h3>
                <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.3em] text-white/60">
                  {selected.city}, {selected.state}
                </p>
                {selected.price && (
                  <p data-testid="modal-price" className="mt-6 font-sans text-lg font-light tracking-[0.1em] text-bronze-light sm:text-xl">
                    {selected.price}
                  </p>
                )}
                {(selected.beds || selected.baths || selected.sqft) && (
                  <p className="mt-2 text-xs font-light tracking-[0.08em] text-white/75 sm:text-sm">
                    {[selected.beds, selected.baths, selected.sqft].filter(Boolean).join(" | ")}
                  </p>
                )}
                {selected.description && (
                  <p data-testid="property-description" className="mt-6 text-[13px] font-light leading-[1.9] text-white/70 sm:text-sm">
                    {selected.description}
                  </p>
                )}
                <button
                  data-testid="modal-cta"
                  onClick={() => (window.location.href = "mailto:JamesAGreen@eXpRealty.com")}
                  className="group mt-8 flex items-center gap-3 bg-bronze/90 px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-[#F1E6D7] transition-all duration-500"
                >
                  Inquire About This Home
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
