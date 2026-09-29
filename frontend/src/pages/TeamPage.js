import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import NetworkSales from "@/components/NetworkSales";
import ExplorePanels from "@/components/ExplorePanels";
import ClientExperience from "@/components/ClientExperience";
import BuySection from "@/components/BuySection";
import SellSection from "@/components/SellSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";

export default function TeamPage() {
  return (
    <div className="bg-white font-sans text-ink antialiased">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <ExplorePanels />
        <NetworkSales />
        <FeaturedProperties />
        <ClientExperience />
        <BuySection />
        <SellSection />
      </main>
      <Footer />
    </div>
  );
}
