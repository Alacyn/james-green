import { ArrowRight } from "lucide-react";
import { Reveal, scrollToId } from "./Reveal";

export default function ImagePanelSection({ id, testid, eyebrow, title, copy, image, align = "left" }) {
  return (
    <section data-testid={testid} id={id} className="relative overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/25" />

      <div
        className={`relative z-10 flex min-h-[80vh] items-center px-6 py-20 sm:px-10 lg:px-16 ${
          align === "right" ? "justify-end" : "justify-start"
        }`}
      >
        <Reveal y={40} className="w-full max-w-xl">
          <div className="border border-white/25 bg-[#16100C]/35 px-8 py-12 backdrop-blur-xl sm:px-12 lg:px-14">
            <p className="inline-block border-b border-bronze-light/70 pb-2 font-sans text-[11px] uppercase tracking-[0.3em] text-white/85">
              {eyebrow}
            </p>
            <h2 className="mt-6 font-sans text-2xl font-light uppercase tracking-[0.25em] text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-white/85">{copy}</p>
            <button
              data-testid={`${testid}-cta`}
              onClick={() => scrollToId("#contact")}
              className="group mt-10 flex items-center gap-3 bg-bronze-light px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:opacity-90"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
