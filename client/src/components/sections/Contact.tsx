import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate EmailJS call
    console.log("Sending email...", values);
    
    // Placeholder for actual EmailJS logic:
    // emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)...

    setTimeout(() => {
        setIsSubmitting(false);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
    }, 1500);
  }

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-display font-bold mb-8"
                >
                    Let's work <br /> <span className="text-primary">together.</span>
                </motion.h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-md">
                    Have a project in mind? Let's build something extraordinary.
                </p>

                <div className="space-y-6">
                    <a href="mailto:hello@alexmorgan.design" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                        </div>
                        hello@alexmorgan.design
                    </a>
                    <div className="flex items-center gap-4 text-lg text-muted-foreground">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            <MapPin className="w-5 h-5" />
                        </div>
                        San Francisco, CA
                    </div>
                </div>
            </div>

            {/* Form */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-secondary/10 p-8 rounded-2xl border border-white/5"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} className="bg-background/50 border-white/10 h-12 focus:border-primary/50 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} className="bg-background/50 border-white/10 h-12 focus:border-primary/50 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell me about your project..." {...field} className="bg-background/50 border-white/10 min-h-[150px] resize-none focus:border-primary/50 transition-colors" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-12 text-lg font-medium"
                        >
                            {isSubmitting ? "Sending..." : (
                                <span className="flex items-center gap-2">
                                    Send Message <Send className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </Form>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
