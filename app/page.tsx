
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero}  from "@/components/Hero";
import { Navbar } from "@/components/Header";
import { Team } from "@/components/Team";
import Panels from "@/components/Features";
import { PremiumMarquee } from "@/components/marquee";
import ImageCenter from "@/components/image";
import YourData from "@/components/yourdata";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
        <Navbar />
      <Hero />
      <PremiumMarquee/>
      <About />
      <ImageCenter/>
      <Panels/>
      <Team />
      <FAQ />
      <YourData/>
      <Footer />
    </main>
  );
}