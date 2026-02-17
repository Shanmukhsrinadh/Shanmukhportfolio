import { motion } from "framer-motion";
import { PenTool, Laptop, Megaphone } from "lucide-react";

const services = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning interfaces that users love.",
    icon: PenTool,
  },
  {
    title: "Web Development",
    description: "Building fast, responsive, and scalable websites with modern tech.",
    icon: Laptop,
  },
  {
    title: "Digital Strategy",
    description: "Helping brands grow with data-driven marketing and SEO strategies.",
    icon: Megaphone,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-secondary/20">
      <div className="container px-6">
        <div className="text-center mb-20">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
                What I Do
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto text-muted-foreground"
            >
                I help ambitious brands elevate their digital presence through design and technology.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group relative p-8 rounded-2xl bg-background border border-white/5 hover:border-primary/50 transition-colors duration-300"
                >
                    {/* Hover Gradient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                            <service.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-display">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
