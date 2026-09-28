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
      className="font-sans text-3xl font-light tracking-[0.1em] text-[#F1E6D7] sm:text-4xl lg:text-5xl"
    >
      {format(v)}
    </h3>
  );
}

const STATS = [
  {
    testid: "stat-real-estate-sold",
    value: 24,
    format: (v) => `$${Math.round(v)}B+`,
    label: "Worth of Real Estate Sold",
  },
  {
    testid: "stat-top-agents",
    value: 0.01,
    format: (v) => `${v.toFixed(2).replace(/^0/, "")}%`,
    label: "Top Agents Nationwide",
  },
  {
    testid: "stat-total-sales",
    value: 1.7,
    format: (v) => `$${v.toFixed(1)}B+`,
    label: "Total Sales",
  },
];

export default function FeaturedStats() {
  return (
    <section data-testid="featured-stats-section" id="featured" className="bg-coal">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28 lg:py-32">
        <Reveal y={24}>
          <Eyebrow light>Featured</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} y={30}>
          <h2 className="mt-7 font-serif text-3xl font-normal uppercase leading-[1.15] tracking-[0.02em] text-[#F1E6D7] sm:text-5xl">
            With over <span className="text-bronze-light">$24 Billion</span> in luxury
            home sales
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] font-light leading-[1.9] text-white/55 sm:text-base">
            Aaron Kirman represents the finest estates across the globe and was ranked
            in the top 5 luxury real estate agents in the US by the Wall Street Journal.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.testid} delay={0.12 * i}>
              <div className="flex flex-col items-center">
                <Counter value={s.value} format={s.format} testid={s.testid} />
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
