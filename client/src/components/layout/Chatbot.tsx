import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Snowflex, Shanmukh's assistant. Ask me about projects, skills, or contact me!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // CONTACT FLOW STATE
  const [contactStep, setContactStep] = useState<
    "idle" | "name" | "email" | "phone" | "message"
  >("idle");

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // AUTO SCROLL
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // SCROLL TO SECTION
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // MAIN SEND HANDLER
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const trimmedInput = input.trim();
    const lowerInput = trimmedInput.toLowerCase();

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // ===============================
    // ABUSE FILTER
    // ===============================
    const abusiveWords = ["abuse", "offensive", "explicit"];
    if (abusiveWords.some((w) => lowerInput.includes(w))) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Let's keep things respectful 😊. Ask me anything about the portfolio!",
        },
      ]);
      setIsLoading(false);
      return;
    }

    // ===============================
    // CONTACT FLOW HANDLING
    // ===============================
    if (contactStep !== "idle") {
      let updated = { ...contactData };

      if (contactStep === "name") {
        updated.name = trimmedInput;
        setContactStep("email");

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Great! What's your email?" },
        ]);
      }

      else if (contactStep === "email") {
        updated.email = trimmedInput;
        setContactStep("phone");

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Nice! Your phone number?" },
        ]);
      }

      else if (contactStep === "phone") {
        updated.phone = trimmedInput;
        setContactStep("message");

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "What message would you like to send?" },
        ]);
      }

      else if (contactStep === "message") {
        updated.message = trimmedInput;
        setContactStep("idle");

        // SUBMIT FORM
        if ((window as any).submitContactForm) {
          await (window as any).submitContactForm(updated);
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "✅ Message sent successfully! Shanmukh will contact you soon.",
          },
        ]);
      }

      setContactData(updated);
      setIsLoading(false);
      return;
    }

    // ===============================
    // SMART LOCAL RESPONSES
    // ===============================
    let reply = "I'm here to help! 😊";

    if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
      reply = "Hey! How can I help you today?";
    }

    else if (lowerInput.includes("about")) {
      scrollToSection("about");
      reply = "Here's a bit about Shanmukh 👇";
    }

    else if (lowerInput.includes("project")) {
      scrollToSection("projects");
      reply = "Check out these projects 👇";
    }

    else if (lowerInput.includes("skill")) {
      scrollToSection("certifications");
      reply = "Here are the skills & certifications 👇";
    }

    else if (lowerInput.includes("contact")) {
      setContactStep("name");
      reply = "Let's get started! What's your name?";
    }

    else if (
      lowerInput.includes("resume") ||
      lowerInput.includes("cv")
    ) {
      window.open(
        "https://drive.google.com/file/d/1hWqV2b6pEA8zP9fTXWGztBZZFZctzWHJ/view",
        "_blank"
      );
      reply = "Opening resume...";
    }

    else if (lowerInput.includes("who are you")) {
      reply = "I'm Snowflex 🤖 — your guide to Shanmukh's portfolio!";
    }

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply },
    ]);

    setIsLoading(false);
  };

  // ===============================
  // UI
  // ===============================
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-background border rounded-2xl shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Bot />
                <span className="font-bold">SnowFlex</span>
              </div>
              <X
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* CHAT */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl text-sm max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-secondary"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="text-sm opacity-60">Typing...</div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
              />
              <Button onClick={handleSend}>
                <Send size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}