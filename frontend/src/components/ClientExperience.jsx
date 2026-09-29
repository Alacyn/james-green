import { Reveal, Eyebrow } from "./Reveal";

export default function ClientExperience() {
  return (
    <section data-testid="client-experience-section" className="bg-white text-ink">
      <div className="mx-auto max-w-4xl px-8 pt-14 pb-20 text-center sm:px-10 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
        <Reveal y={24}>
          <Eyebrow>Client Experience</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} y={30}>
          <h2 className="mt-8 font-sans text-xl font-light uppercase tracking-[0.3em] sm:text-3xl">
            In Their Words
          </h2>
        </Reveal>
        <Reveal delay={0.15} y={30}>
          <blockquote
            data-testid="client-experience-quote"
            className="mx-auto mt-10 max-w-2xl text-left text-[15px] font-light leading-[1.95] text-ink/60 sm:text-base"
          >
            &ldquo;James made my home search in Dallas so much easier, especially
            navigating it from out of state. He really listened to what I needed, was
            patient through the whole process, and helped me find a place in
            Knox-Henderson that I&rsquo;m genuinely excited about.&rdquo;
            <span
              data-testid="client-experience-author"
              className="whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.3em]"
            >
              &nbsp;&mdash;&nbsp;Hayley Mason
            </span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
