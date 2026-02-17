import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const allCertificates = [
  { title: "UI/UX Developer", issuer: "Tech Mahindra Foundation", year: "2025" },
  { title: "Graphic Design", issuer: "InAmigos Foundation", year: "2025" },
  { title: "Instruction Designer", issuer: "Dr Reddy's Foundation", year: "2025" },
  { title: "Website UI/UX Designing", issuer: "SimpliLearn", year: "2025" },
  { title: "Prompt Engineering", issuer: "SimpliLearn", year: "2025" },
  { title: "Essentials of Cloud Computing", issuer: "Infosys Springboard", year: "2023" },
  { title: "Digital Marketing", issuer: "Verzeo", year: "2022" },
  { title: "Azure AI Fundamentals", issuer: "Microsoft", year: "2022" },
  { title: "HTML5 Application Development", issuer: "Microsoft", year: "2022" },
];

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll ? allCertificates : allCertificates.slice(0, 4);

  return (
    <section className="py-24 bg-background">
      <div className="container px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-2 text-muted-foreground">Recognition</h2>
            <div className="h-1 w-20 bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
                {visibleCertificates.map((cert, index) => (
                    <motion.div
                        key={cert.title + index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-display font-bold text-xl mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            </div>
                            <span className="text-xs font-mono border border-white/10 px-2 py-1 rounded text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors">
                                {cert.year}
                            </span>
                        </div>
                        <Award className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:text-white/10 transition-colors rotate-12" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {!showAll && (
            <div className="mt-8 flex justify-center">
                <Button 
                    variant="ghost" 
                    onClick={() => setShowAll(true)}
                    className="group"
                >
                    View All Certifications
                    <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
