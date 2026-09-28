import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TeamParallax from "@/components/TeamParallax";
import NetworkSales from "@/components/NetworkSales";
import FeaturedStats from "@/components/FeaturedStats";
import IndexList from "@/components/IndexList";
import VideoCta from "@/components/VideoCta";
import ConnectForm from "@/components/ConnectForm";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import StickyConnectBar from "@/components/StickyConnectBar";

export default function TeamPage() {
  return (
    <div className="bg-white font-sans text-ink antialiased">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TeamParallax />
        <NetworkSales />
        <FeaturedStats />
        <IndexList />
        <VideoCta />
        <ConnectForm />
        <InstagramFeed />
      </main>
      <Footer />
      <StickyConnectBar />
    </div>
  );
}
