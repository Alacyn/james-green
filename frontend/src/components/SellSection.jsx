import ImagePanelSection from "@/components/ImagePanelSection";

export default function SellSection() {
  return (
    <ImagePanelSection
      id="sell"
      testid="sell-section"
      eyebrow="Sell"
      title="Positioned with Purpose"
      image="/images/sell.png"
      align="right"
      cta="Let's Talk"
      copy="Every home has something worth highlighting, and thoughtful preparation can shape the way it is experienced from the moment it enters the market. James works with sellers to consider pricing, presentation, and positioning as part of one cohesive strategy, tailored to the property and the goals behind the move. Clients also have access to a preferred network of vendors and trusted professionals who can help prepare and present the home at its best—creating a polished, considered experience from beginning to end."
    />
  );
}
