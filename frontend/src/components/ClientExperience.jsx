import { Reveal } from "./Reveal";

export default function ClientExperience() {
  return (
    <section data-testid="client-experience-section" className="bg-coal">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:py-28">
        <Reveal y={24}>
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light sm:text-xs">
            Client Experience
          </p>
          <span aria-hidden="true" className="mx-auto mt-4 block h-px w-24 bg-bronze-light/70" />
        </Reveal>
        <Reveal delay={0.12} y={30}>
          <blockquote
            data-testid="client-experience-quote"
            className="mx-auto mt-10 max-w-3xl text-lg font-light leading-[1.9] text-[#F1E6D7] sm:text-2xl sm:leading-[1.85]"
          >
            &ldquo;James made my apartment search in Dallas so much easier, especially
            navigating it from out of state. He really listened to what I needed, was
            patient through the whole process, and helped me find a place in
            Knox-Henderson that I&rsquo;m genuinely excited about.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            data-testid="client-experience-author"
            className="mt-10 font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light sm:text-xs"
          >
            &mdash;&nbsp;&nbsp;Hayley Mason
          </p>
        </Reveal>
      </div>
    </section>
  );
}
