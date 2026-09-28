import { Reveal } from "./Reveal";

const ITEMS = [
  "Relationships",
  "Professionalism",
  "Integrity",
  "Personal Service",
  "Clarity",
  "Strategy",
];

export default function IndexList() {
  return (
    <section id="culture" data-testid="index-list-section" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1360px] px-6 py-20 sm:py-28 lg:px-16 lg:py-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3 lg:gap-x-12">
          {ITEMS.map((title, i) => (
            <Reveal key={title} delay={0.05 * i} y={30}>
              <div
                data-testid={`index-row-${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex cursor-default items-center justify-center border-t border-ink/10 py-8 sm:py-10"
              >
                <h3 className="text-center font-serif text-2xl font-normal uppercase tracking-[0.04em] text-ink transition-all duration-500 group-hover:italic group-hover:text-bronze sm:text-3xl lg:text-4xl">
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
