import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Now } from "@/components/sections/Now";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Testimonials } from "@/components/sections/Testimonials";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export function Home({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <>
      <Hero onOpenPalette={onOpenPalette} />
      <Marquee />
      <About />
      <Now />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Testimonials />
      <Writing />
      <Contact />
    </>
  );
}
