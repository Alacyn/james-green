import { Reveal } from "./Reveal";

const ITEMS = [
  "Leadership",
  "Brand",
  "Culture",
  "Marketing",
  "Empowerment",
  "Technology",
];

export default function IndexList() {
  return (
    <section id="culture" data-testid="index-list-section" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3 lg:gap-x-14">
          {ITEMS.map((title, i) => (
            <Reveal key={title} delay={0.05 * i} y={30}>
              <div
                data-testid={`index-row-${title.toLowerCase()}`}
                className="group flex cursor-default items-baseline gap-4 border-t border-black/15 py-6 sm:gap-6 sm:py-9"
              >
                <span className="font-sans text-[11px] tracking-[0.25em] text-bronze sm:text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl font-light leading-none text-ink transition-all duration-500 group-hover:italic group-hover:text-bronze sm:text-4xl lg:text-5xl">
                  {title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
