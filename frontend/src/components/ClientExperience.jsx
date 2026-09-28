import { Reveal, Eyebrow } from "./Reveal";

export default function ClientExperience() {
  return (
    <section data-testid="client-experience-section" className="bg-paper text-ink">
      <div className="mx-auto max-w-4xl px-8 py-20 text-center sm:py-28 lg:py-32">
        <Reveal y={24}>
          <Eyebrow>Client Experience</Eyebrow>
        </Reveal>
        <Reveal delay={0.1} y={30}>
          <blockquote
            data-testid="client-experience-quote"
            className="mx-auto mt-10 max-w-2xl text-left text-[15px] font-light leading-[2] text-ink/70 sm:text-base"
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
            className="mt-8 text-left font-sans text-[11px] uppercase tracking-[0.3em] text-ink/60"
          >
            &mdash; Hayley Mason
          </p>
        </Reveal>
      </div>
    </section>
  );
}
