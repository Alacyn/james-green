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
      className="font-serif text-5xl font-light leading-none text-[#F5F0EA] sm:text-6xl lg:text-7xl"
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
    <section data-testid="featured-stats-section" id="featured" className="bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow light>Featured</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
              With over <span className="italic text-bronze-light">$24 Billion</span> in
              luxury home sales
            </h2>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/65 sm:text-lg">
              Aaron Kirman represents the finest estates across the globe and was
              ranked in the top 5 luxury real estate agents in the US by the Wall
              Street Journal.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.testid} delay={0.12 * i} data-testid={s.testid}>
              <div className="border-t border-white/15 pt-8 sm:pr-6">
                <Counter value={s.value} format={s.format} testid={s.testid} />
                <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.3em] text-white/50">
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
