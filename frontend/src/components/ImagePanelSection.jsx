import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function ImagePanelSection({ id, testid, eyebrow, title, copy, image, align = "left" }) {
  const imageSide = align === "right" ? "lg:order-2" : "lg:order-1";
  const contentSide = align === "right" ? "lg:order-1" : "lg:order-2";

  return (
    <section data-testid={testid} id={id} className="bg-white text-ink">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className={`${imageSide} h-72 sm:h-96 lg:h-auto`}>
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className={`${contentSide} flex items-center px-8 py-20 sm:px-10 lg:px-24 lg:py-32`}>
          <Reveal y={40} className="w-full max-w-xl">
            <p className="inline-block border-b border-bronze pb-2 font-sans text-[11px] uppercase tracking-[0.3em] text-ink/60">
              {eyebrow}
            </p>
            <h2 className="mt-6 font-sans text-2xl font-light uppercase tracking-[0.25em] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-7 text-[15px] font-light leading-[1.9] text-ink/60">{copy}</p>
            <button
              data-testid={`${testid}-cta`}
              onClick={() => (window.location.href = "mailto:JamesAGreen@eXpRealty.com")}
              className="group mt-10 flex items-center gap-3 bg-bronze px-8 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-[#F1E6D7] transition-all duration-500 hover:opacity-90"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
