import CursorFollower from "@/components/layout/CursorFollower";
import Navbar from "@/components/layout/Navbar";
import Chatbot from "@/components/layout/Chatbot";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <CursorFollower />
      <Navbar />
      <Chatbot />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
