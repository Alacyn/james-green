const ITEMS = [
  "Beverly Hills",
  "San Fernando Valley",
  "Santa Barbara",
  "Brentwood",
  "Orange County",
  "Christie\u2019s International Real Estate",
];

const Row = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {ITEMS.map((t, i) => (
      <span key={i} className="flex items-center">
        <span className="whitespace-nowrap px-8 font-serif text-2xl font-light italic text-white/85 sm:text-3xl md:text-4xl">
          {t}
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-bronze" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <section
      data-testid="editorial-marquee"
      className="overflow-hidden border-y border-white/10 bg-coal py-6 sm:py-8"
    >
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
