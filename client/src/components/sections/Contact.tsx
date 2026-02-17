"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

/* ================================
   Validation Schema
================================ */

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/* ================================
   Contact Component
================================ */

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init("J6-Ng5lb6KGmbholI");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  /* ================================
     Submit Handler
  ================================= */

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const userEmail = values.email;
    const userPhone = values.phone;

    try {
      /* ================================
         1️⃣ Verify Email via MailboxLayer
      ================================= */

      const mailboxAPI = "f4fc95e2df9dda3405535446c83c86a0";

      const verifyResponse = await fetch(
        `https://apilayer.net/api/check?access_key=${mailboxAPI}&email=${userEmail}`
      );

      const emailData = await verifyResponse.json();

      if (!emailData.format_valid || !emailData.smtp_check) {
        toast({
          title: "Invalid Email",
          description:
            "The provided email address does not exist or cannot receive messages.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      /* ================================
         2️⃣ Verify Phone via NumVerify
      ================================= */

      if (userPhone) {
        const numVerifyAPI = "78c95356705a74edf974f3061a696550";

        const phoneResponse = await fetch(
          `https://apilayer.net/api/validate?access_key=${numVerifyAPI}&number=${userPhone}&country_code=IN&format=1`
        );

        const phoneData = await phoneResponse.json();

        if (!phoneData.valid) {
          toast({
            title: "Invalid Phone Number",
            description:
              "The provided phone number is invalid or does not exist.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      /* ================================
         3️⃣ Send Email (ONLY if all checks pass)
      ================================= */

      const adminParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone || "Not provided",
        message: values.message,
      };

      const userParams = {
        from_name: values.name,
        from_email: values.email,
      };

      await emailjs.send(
        "service_tdlc5cs",
        "template_7p5pu9k",
        adminParams
      );

      await emailjs.send(
        "service_tdlc5cs",
        "template_9zmkpir",
        userParams
      );

      toast({
        title: "Message Sent!",
        description:
          "Thanks for reaching out, Shanmukh will get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Something went wrong",
        description:
          "Could not verify details or send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ================================
     UI
  ================================= */

  return (
    <section
      id="contact"
      className="py-32 bg-background relative overflow-hidden"
    >
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT SIDE */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              Get in <br />
              <span className="text-primary">Touch.</span>
            </motion.h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              I'd love to hear from you! Whether you have a question, want to
              discuss a project, or just want to connect.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:shanmukhsrinadh01@gmail.com"
                className="flex items-center gap-4 text-lg hover:text-primary transition-colors"
              >
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
                Visakhapatnam, Andhra Pradesh, India
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/10 p-8 rounded-2xl border border-white/5"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="bg-background/50 border-white/10 h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className="bg-background/50 border-white/10 h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                          className="bg-background/50 border-white/10 h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          {...field}
                          className="bg-background/50 border-white/10 min-h-[150px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-medium"
                >
                  {isSubmitting ? "Validating & Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
