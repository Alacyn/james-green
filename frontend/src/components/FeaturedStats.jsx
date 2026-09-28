import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";

const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

function Counter({ value, format, testid }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const dur = 2100;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(value * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <h3
      ref={ref}
      data-testid={testid}
      className="font-serif text-4xl font-normal text-[#F1E6D7] sm:text-5xl lg:text-[56px]"
    >
      {format(v)}
    </h3>
  );
}

const STATS = [
  {
    testid: "stat-experience",
    value: 20,
    format: (v) => `${Math.round(v)}+`,
    label: "Years of Professional Experience",
  },
  {
    testid: "stat-real-estate",
    value: 3,
    format: (v) => `${Math.round(v)}`,
    label: "Years Dedicated to Real Estate",
  },
  {
    testid: "stat-market",
    value: null,
    format: () => "DFW",
    label: "Metroplex & North Texas",
  },
];

export default function FeaturedStats() {
  return (
    <section data-testid="featured-stats-section" id="featured" className="bg-coal">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28 lg:py-32">
        <Reveal y={24}>
          <Eyebrow light>Why James</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} y={30}>
          <h2 className="mt-7 font-serif text-3xl font-normal uppercase tracking-[0.04em] text-[#F1E6D7] sm:text-5xl">
            Two decades of experience behind every <span className="text-bronze-light">decision</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] font-light leading-[1.9] text-white/55 sm:text-base">
            A background in financial services, lending, relocation, and client
            advocacy — perspective that brings a broader view to buying, selling, and
            moving.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.testid} delay={0.12 * i}>
              <div className="flex flex-col items-center">
                {s.value === null ? (
                  <h3
                    data-testid={s.testid}
                    className="font-serif text-4xl font-normal text-[#F1E6D7] sm:text-5xl lg:text-[56px]"
                  >
                    {s.format(0)}
                  </h3>
                ) : (
                  <Counter value={s.value} format={s.format} testid={s.testid} />
                )}
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.28em] text-white/50">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
