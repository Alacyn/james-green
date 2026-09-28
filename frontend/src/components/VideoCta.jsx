import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Reveal, EASE } from "./Reveal";

const VIDEO_SRC =
  "https://res.cloudinary.com/luxuryp/videos/f_auto:video,q_auto/uey9v1nkbelmgwbeiczt/avc_recruitment-video-1";

export default function VideoCta() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <section
      ref={ref}
      id="video"
      data-testid="video-cta-section"
      className="relative flex h-[80vh] min-h-[520px] items-center justify-center overflow-hidden bg-black"
    >
      <motion.img
        src="/images/team.jpg"
        alt="The Aaron Kirman Group"
        style={{ y: imgY }}
        className="absolute -top-[10%] left-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Reveal y={30}>
          <h2 className="font-serif text-4xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Empowering Your <span className="italic text-bronze-light">Success</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} y={30}>
          <button
            data-testid="play-video-button"
            onClick={() => setOpen(true)}
            className="group mt-12 flex flex-col items-center gap-5"
            aria-label="Play video"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-500 group-hover:scale-110 group-hover:border-bronze group-hover:bg-bronze group-hover:text-black sm:h-24 sm:w-24">
              <Play className="h-5 w-5 fill-current pl-0.5" />
            </span>
            <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-white/70 transition-colors duration-500 group-hover:text-white">
              Play Video
            </span>
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.94, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-testid="close-video-modal"
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
              >
                Close
                <X className="h-4 w-4" />
              </button>
              <video
                data-testid="recruitment-video"
                src={VIDEO_SRC}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
