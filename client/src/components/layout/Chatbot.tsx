import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Snowflex, Shanmukh's digital assistant. How's your day going? Feel free to ask me anything about my projects or design journey!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [contactFormData, setContactFormData] = useState<Partial<FormData>>({});
  const [collectingContact, setCollectingContact] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ===============================
     Auto Scroll
  =============================== */

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  /* ===============================
     Scroll To Section
  =============================== */

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  /* ===============================
     Handle Contact Collection
  =============================== */

  const processContactCollection = (userInput: string) => {
    const updatedData = { ...contactFormData };
    
    // Determine which field to collect based on what's missing
    if (!updatedData.name) {
      updatedData.name = userInput;
      const assistantResponse = "Great! Now could you please provide your email address?";
      return { updatedData, assistantResponse };
    } 
    else if (!updatedData.email) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(userInput)) {
        updatedData.email = userInput;
        const assistantResponse = "Thanks! Now please share your phone number.";
        return { updatedData, assistantResponse };
      } else {
        const assistantResponse = "That doesn't look like a valid email. Please provide a valid email address.";
        return { updatedData, assistantResponse };
      }
    }
    else if (!updatedData.phone) {
      updatedData.phone = userInput;
      const assistantResponse = "Perfect! Finally, what message would you like to send to Shanmukh?";
      return { updatedData, assistantResponse };
    }
    else if (!updatedData.message) {
      updatedData.message = userInput;
      
      // All fields collected, send the message
      const formData = updatedData as FormData;
      
      // Check 48hr protection
      const lastSentStr = localStorage.getItem("portfolio_message_last_sent");
      const now = Date.now();
      const fortyEightHours = 48 * 60 * 60 * 1000;

      if (lastSentStr) {
        const lastSent = parseInt(lastSentStr);
        if (now - lastSent < fortyEightHours) {
          const assistantResponse = "You've already sent a message recently. Shanmukh will respond soon.";
          // Reset contact collection
          setCollectingContact(false);
          setContactFormData({});
          return { updatedData: {}, assistantResponse, reset: true };
        }
      }
      
      // Try to submit the form
      scrollToSection("contact");
      
      setTimeout(async () => {
        if ((window as any).submitContactForm) {
          try {
            const result = await (window as any).submitContactForm(formData);
            if (result === true || result?.success) {
              localStorage.setItem("portfolio_message_last_sent", Date.now().toString());
              const successMessage = "I've sent your message successfully! Shanmukh will get back to you soon.";
              setMessages(prev => [...prev, { role: "assistant", content: successMessage }]);
            } else {
              const errorMessage = result?.error || "The message couldn't be sent. Please double-check your details.";
              setMessages(prev => [...prev, { role: "assistant", content: errorMessage }]);
            }
          } catch (err) {
            console.error("Form submission error:", err);
            setMessages(prev => [...prev, { 
              role: "assistant", 
              content: "I'm having trouble connecting to the contact form. Please try manually below." 
            }]);
          }
        } else {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: "I'm having trouble connecting to the contact form. Please try manually below." 
          }]);
        }
      }, 600);
      
      const assistantResponse = "Thank you! I'm sending your message now...";
      setCollectingContact(false);
      return { updatedData: {}, assistantResponse, reset: true };
    }
    
    return { updatedData, assistantResponse: "" };
  };

  /* ===============================
     Handle Intent Actions
  =============================== */

  const handleIntentActions = (lowerInput: string): string | null => {
    // Resume shortcut
    if (
      lowerInput.includes("resume") ||
      lowerInput.includes("cv") ||
      lowerInput.includes("open resume") ||
      lowerInput.includes("open my resume")
    ) {
      window.open(
        "https://drive.google.com/file/d/1hWqV2b6pEA8zP9fTXWGztBZZFZctzWHJ/view?usp=sharing",
        "_blank"
      );
      return "Opening Shanmukh's resume in a new tab...";
    }

    // Section scrolling
    let targetSection = "";
    if (lowerInput.includes("about") || lowerInput.includes("who is"))
      targetSection = "about";
    if (lowerInput.includes("project") || lowerInput.includes("work"))
      targetSection = "projects";
    if (lowerInput.includes("contact"))
      targetSection = "contact";
    if (lowerInput.includes("skill") || lowerInput.includes("certification"))
      targetSection = "certifications";

    if (targetSection) {
      scrollToSection(targetSection);
      return `Scrolling to the ${targetSection} section for you!`;
    }

    // Start contact collection
    if (lowerInput.includes("send message") || lowerInput.includes("contact me") || lowerInput.includes("message shanmukh")) {
      setCollectingContact(true);
      setContactFormData({});
      return "I'd be happy to help you send a message to Shanmukh! First, what's your name?";
    }

    return null;
  };

  /* ===============================
     Predefined Responses
  =============================== */

  const getPredefinedResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    
    // Project-related queries
    if (lowerInput.includes("timber oak")) {
      return "Timber Oak is a UI/UX design project focused on creating a seamless e-commerce experience for a furniture brand. It features modern aesthetics and intuitive navigation.";
    }
    if (lowerInput.includes("m-wallet") || lowerInput.includes("m wallet")) {
      return "M-Wallet is a digital wallet UI/UX design project that focuses on secure and fast transactions with an elegant user interface.";
    }
    if (lowerInput.includes("vaijayanta")) {
      return "Vaijayanta is a development project that showcases modern web development practices with responsive design and efficient backend integration.";
    }
    if (lowerInput.includes("fashique")) {
      return "Fashique is a fashion e-commerce development project with features like product filtering, cart management, and secure checkout.";
    }
    if (lowerInput.includes("legacyonwheels")) {
      return "Legacyonwheels is a unique platform for classic car enthusiasts, developed with modern web technologies.";
    }
    if (lowerInput.includes("earthquake detection")) {
      return "The Earthquake Detection project uses data visualization and real-time API integration to display seismic activity worldwide.";
    }
    if (lowerInput.includes("maply") || lowerInput.includes("travel")) {
      return "Maply is a travel & gadgets WooCommerce site built with WordPress, featuring custom themes and plugin integration.";
    }
    
    // Certifications
    if (lowerInput.includes("certification") || lowerInput.includes("certified")) {
      return "Shanmukh holds certifications in UI/UX Design from Tech Mahindra, Graphic Design from InAmigos, Instruction Designer from Dr Reddy's, and Azure AI from Microsoft.";
    }
    
    // About
    if (lowerInput.includes("about") || lowerInput.includes("who is shanmukh")) {
      return "Shanmukh Srinadh is a UI/UX Designer & Web Developer from Visakhapatnam who focuses on creating seamless digital stories and user experiences.";
    }
    
    // Skills
    if (lowerInput.includes("skill") || lowerInput.includes("technologies")) {
      return "Shanmukh specializes in UI/UX design, web development, WordPress, and has experience with various modern frameworks and tools.";
    }
    
    // Greetings
    if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! How can I assist you today? Feel free to ask about Shanmukh's projects, skills, certifications, or you can even send him a message!";
    }
    
    // Help
    if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
      return "I can help you with:\n• Information about Shanmukh's projects\n• His certifications and skills\n• Opening his resume\n• Scrolling to different sections (about, projects, contact)\n• Sending a message to Shanmukh\n\nWhat would you like to know?";
    }
    
    return null;
  };

  /* ===============================
     Send Handler
  =============================== */

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const trimmedInput = input.trim();
    const lowerInput = trimmedInput.toLowerCase();

    // Basic abuse filter
    const abusiveWords = ["abuse", "offensive", "explicit", "hate", "violent"];
    if (abusiveWords.some(word => lowerInput.includes(word))) {
      setMessages(prev => [
        ...prev,
        { role: "user", content: trimmedInput },
        {
          role: "assistant",
          content:
            "I'm sorry, but I cannot engage with abusive or inappropriate content. Let's keep things professional!",
        },
      ]);
      setInput("");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Handle contact collection flow
    if (collectingContact) {
      const { updatedData, assistantResponse, reset } = processContactCollection(trimmedInput);
      setContactFormData(updatedData);
      
      if (reset) {
        setCollectingContact(false);
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: assistantResponse }]);
      setIsLoading(false);
      return;
    }

    // Check for intent actions first
    const intentResponse = handleIntentActions(lowerInput);
    if (intentResponse) {
      setMessages(prev => [...prev, { role: "assistant", content: intentResponse }]);
      setIsLoading(false);
      return;
    }

    // Get predefined response
    const predefinedResponse = getPredefinedResponse(trimmedInput);
    
    if (predefinedResponse) {
      // Add small delay for natural feel
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: predefinedResponse }]);
        setIsLoading(false);
      }, 300);
    } else {
      // Fallback response for unrecognized queries
      const fallbackResponse = "I'm not sure about that. You can ask me about Shanmukh's projects, certifications, skills, or use 'send message' to contact him. What would you like to know?";
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: fallbackResponse }]);
        setIsLoading(false);
      }, 300);
    }
  };

  /* ==============================
     UI (UNCHANGED DESIGN)
  =============================== */

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:opacity-90 transition-all"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 border-b border-border bg-secondary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">SnowFlex</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-background/50"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-secondary text-foreground rounded-tl-none border border-border"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary p-3 rounded-2xl rounded-tl-none border border-border animate-pulse">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border flex gap-2 bg-background">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="bg-secondary/20 border-border focus:ring-1 focus:ring-primary"
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={isLoading}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}