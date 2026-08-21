import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Tracks from "@/components/Tracks";
import AiStack from "@/components/AiStack";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StreetTrack from "@/components/scene/StreetTrack";
import BoardTrack from "@/components/scene/BoardTrack";
import { skills } from "@/lib/data";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <Nav />
      <main className="mx-2 border-x border-line sm:mx-5">
        <Hero />
        <StreetTrack />
        <div className="hatch-line" />
        <Marquee
          items={skills}
          className="band-plain font-mono text-sm uppercase tracking-widest text-muted"
        />
        <Manifesto />
        <Tracks />
        <Stats />
        <Timeline />
        <Marquee
          items={["ship it", "break it", "fix it", "ship it again"]}
          reverse
          className="band-plain font-sans text-2xl font-bold uppercase"
        />
        <Projects />
        <AiStack />
        <Contact />
        <BoardTrack />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
