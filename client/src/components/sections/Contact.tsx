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
import { Send, Mail, MapPin, Phone } from "lucide-react";

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
    setTimeout(() => {
        setIsSubmitting(false);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out, Shanmukh will get back to you soon.",
        });
        form.reset();
    }, 1500);
  }

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-display font-bold mb-8"
                >
                    Get in <br /> <span className="text-primary">Touch.</span>
                </motion.h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-md">
                    I'd love to hear from you! Whether you have a question, want to discuss a project, or just want to connect.
                </p>

                <div className="space-y-6">
                    <a href="mailto:shanmukhsrinadh01@gmail.com" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                        </div>
                        shanmukhsrinadh01@gmail.com
                    </a>
                    <div className="flex items-center gap-4 text-lg text-muted-foreground">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            <Phone className="w-5 h-5" />
                        </div>
                        (+91) 9550563283
                    </div>
                    <div className="flex items-center gap-4 text-lg text-muted-foreground">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            <MapPin className="w-5 h-5" />
                        </div>
                        Visakhapatnam, Andhra pradesh, India
                    </div>
                </div>
            </div>

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
                                        <Input placeholder="Your Name" {...field} className="bg-background/50 border-white/10 h-12" />
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
                                        <Input placeholder="your@email.com" {...field} className="bg-background/50 border-white/10 h-12" />
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
                                        <Textarea placeholder="How can I help you?" {...field} className="bg-background/50 border-white/10 min-h-[150px]" />
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
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </Form>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
