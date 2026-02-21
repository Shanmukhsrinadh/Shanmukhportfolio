import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    if (document.documentElement.classList.contains("light")) {
        setTheme("light");
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  const handleResumeDownload = () => {
    window.open("https://drive.google.com/file/d/1QT1MQjPJK7pzxHusaM2NYgJe8AuMjo12/view", "_blank");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm border-b border-border/50" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity">
          SS<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <Button
            onClick={handleResumeDownload}
            variant="outline"
            size="sm"
            className="rounded-full border-primary/20 hover:border-primary/50 group"
          >
            <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Resume
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
            >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2">
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-display font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-4"
              >
                <Button
                  onClick={handleResumeDownload}
                  variant="outline"
                  className="w-full rounded-full py-6 text-lg border-primary/20"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
