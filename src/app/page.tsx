import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollMarquee from "@/components/ScrollMarquee";
import Services from "@/components/Services";
import VideoShowcase from "@/components/VideoShowcase";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen overflow-x-hidden">
      {/* Noise overlay for entire page */}
      <div className="fixed inset-0 pointer-events-none noise-overlay z-50" />

      {/* Main content */}
      <Header />
      <Hero />
      <ScrollMarquee />
      <Services />
      <VideoShowcase />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
