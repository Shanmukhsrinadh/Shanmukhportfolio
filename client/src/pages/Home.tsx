import CursorFollower from "@/components/layout/CursorFollower";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <CursorFollower />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Certifications />
        <Contact />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5">
        <p>© 2026 Shanmukh Srinadh. Crafted with Design Excellence.</p>
      </footer>
    </div>
  );
}
