import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const allCertificates = [
  { 
    title: "UI/UX Developer", 
    issuer: "Tech Mahindra Foundation", 
    year: "2025",
    image: "https://shanmukhsrinadh.github.io/Shannuportfolio/img/Techmahindracert.png" 
  },
  { 
    title: "Graphic Design", 
    issuer: "InAmigos Foundation", 
    year: "2025",
    image: "https://shanmukhsrinadh.github.io/Shannuportfolio/img/internshala%20certificate.png" 
  },
  { 
    title: "Instruction Designer", 
    issuer: "Dr Reddy's Foundation", 
    year: "2025",
    image: "https://shanmukhsrinadh.github.io/Shannuportfolio/img/DrReddysFoundationcert.jpg" 
  },
  { 
    title: "Website UI/UX Designing", 
    issuer: "SimpliLearn", 
    year: "2025",
    image: "https://shanmukhsrinadh.github.io/Shannuportfolio/img/simplilern%20cert02.jpg" 
  },
  { 
    title: "Prompt Engineering", 
    issuer: "SimpliLearn", 
    year: "2025",
    image: "https://i.ibb.co/SXrxyMsx/Screenshot-2025-04-09-16-32-59-67-e2d5b3f32b79de1d45acd1fad96fbb0f.jpg" 
  },
  { 
    title: "Essentials of Cloud Computing", 
    issuer: "Infosys Springboard", 
    year: "2023",
    image: "https://i.ibb.co/s9p32c4C/Screenshot-2025-03-26-012554.png" 
  },
  { 
    title: "Digital Marketing", 
    issuer: "Verzeo", 
    year: "2022",
    image: "https://i.ibb.co/tpFcXJwf/693759316.jpg" 
  },
  { 
    title: "Azure AI Fundamentals", 
    issuer: "Microsoft", 
    year: "2022",
    image: "https://i.ibb.co/9QtdPj4/Whats-App-Image-2024-02-20-at-17-50-11-83a23df5.jpg" 
  },
  { 
    title: "HTML5 Application Development", 
    issuer: "Microsoft", 
    year: "2022",
    image: "https://i.ibb.co/m5CBxhWR/Whats-App-Image-2024-02-20-at-17-50-11-9ef3f995.jpg" 
  },
];

export default function Certifications() {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<typeof allCertificates[0] | null>(null);

  return (
    <section id="certifications" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-2 text-muted-foreground">Recognition</h2>
            <div className="h-1 w-20 bg-primary" />
        </motion.div>

        <div className="flex flex-col">
            {allCertificates.map((cert, index) => (
                <motion.div
                    key={cert.title + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredCert(index)}
                    onMouseLeave={() => setHoveredCert(null)}
                    onClick={() => setSelectedCert(cert)}
                    className="group relative border-t border-white/10 py-8 cursor-pointer flex justify-between items-center"
                >
                    <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-4">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-primary/50 group-hover:text-primary transition-colors">
                                {cert.year}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {cert.title}
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-12">{cert.issuer}</p>
                    </div>

                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white text-black">
                            <ZoomIn className="w-4 h-4" />
                         </div>
                    </div>

                    {/* Hover Image Preview */}
                    <AnimatePresence>
                        {hoveredCert === index && (
                             <motion.div 
                                className="absolute right-24 top-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-lg overflow-hidden pointer-events-none hidden lg:block z-20 shadow-2xl border border-white/20"
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                             >
                                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                             </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
            <div className="border-t border-white/10" />
        </div>

        {/* Full Image Modal */}
        <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/10">
                <div className="relative aspect-[4/3] w-full">
                    <img 
                        src={selectedCert?.image} 
                        alt={selectedCert?.title} 
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute top-4 right-4 z-50">
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/80 text-white">
                                <X className="w-6 h-6" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
                <div className="p-6 bg-black/90 border-t border-white/10">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{selectedCert?.title}</h3>
                    <p className="text-muted-foreground">{selectedCert?.issuer} • {selectedCert?.year}</p>
                </div>
            </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
import { Button } from "@/components/ui/button";
