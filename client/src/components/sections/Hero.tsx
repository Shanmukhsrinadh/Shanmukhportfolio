import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="w-full h-full"
        >
            <img 
              src={heroBg} 
              alt="Background" 
              className="w-full h-full object-cover opacity-40 dark:opacity-60"
            />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <div className="container relative z-10 px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-primary font-medium tracking-widest mb-4 uppercase"
          >
            Shanmukh Srinadh
          </motion.p>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-tight mb-8">
            <span className="block overflow-hidden">
                <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                >
                    SHAPING
                </motion.span>
            </span>
            <span className="block overflow-hidden text-white/50 dark:text-white/50">
                <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                >
                    MODERN
                </motion.span>
            </span>
            <span className="block overflow-hidden">
                <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                >
                    WEBSITES
                </motion.span>
            </span>
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-12"
          >
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
              I am a UI/UX Designer and Web Developer focused on building seamless digital experiences.
            </p>
            
            <a href="#projects" className="group flex items-center gap-4 text-foreground font-medium">
              <span className="relative">
                My Work
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all group-hover:w-full" />
              </span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowDown className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
