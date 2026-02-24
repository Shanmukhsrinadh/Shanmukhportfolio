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
    { role: "assistant", content: "Hey! I'm Snowflex, Shanmukh's digital assistant. How's your day going? Feel free to ask me anything about my projects or design journey!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check for abusive content (basic filter)
    const abusiveWords = ["abuse", "offensive", "explicit"]; // Placeholder for actual list
    if (abusiveWords.some(word => input.toLowerCase().includes(word))) {
      setMessages(prev => [...prev, { role: "user", content: input }, { role: "assistant", content: "I'm sorry, but I cannot engage with abusive or inappropriate content. Let's keep things professional!" }]);
      setInput("");
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Scroll Logic
    const lowerInput = input.toLowerCase();
    let targetSection = "";
    if (lowerInput.includes("about") || lowerInput.includes("who is")) targetSection = "about";
    if (lowerInput.includes("project") || lowerInput.includes("work")) targetSection = "projects";
    if (lowerInput.includes("contact") || lowerInput.includes("message")) targetSection = "contact";
    if (lowerInput.includes("skill") || lowerInput.includes("certification")) targetSection = "certifications";
    if (lowerInput.includes("resume") || lowerInput.includes("cv")) targetSection = "about";

    // Check Local Storage for Sent Message
    const lastSentStr = localStorage.getItem("portfolio_message_last_sent");
    const now = Date.now();
    const fortyEightHours = 48 * 60 * 60 * 1000;

    if (lastSentStr) {
      const lastSent = parseInt(lastSentStr);
      if (now - lastSent < fortyEightHours) {
        setMessages(prev => [...prev, { role: "user", content: input }, { role: "assistant", content: "Your message has been sent already in less than 48hrs. Shanmukh will respond soon and please do not spam." }]);
        setInput("");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Shanmukh Portfolio Assistant"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            { 
              role: "system", 
              content: `You are Shanmukh Srinadh's personal assistant, Snowflex. 
              STRICTLY STICK TO THE PORTFOLIO CONTENT PROVIDED BELOW. Do not invent projects or details.
              
              PORTFOLIO DATA:
              - Projects: 
                * Timber Oak (Design): Figma proto for a timber related project.
                * M-Wallet (Design): Digital wallet app mockup.
                * Vaijayanta (Dev): Web Asset Manager.
                * Fashique (Dev): E-commerce store.
                * Legacyonwheels (Dev): Car clone project.
                * Earthquake Detection (Dev): ML/Data project.
                * Maply Travel & Gadgets WooCommerce (WordPress).
              - Certifications: UI/UX Design (Tech Mahindra), Graphic Design (InAmigos), Instruction Designer (Dr Reddy's), Azure AI (Microsoft).
              - About: UI/UX Designer & Web Dev from Visakhapatnam. Focuses on seamless digital stories.
              
              ASSISTANT CAPABILITIES:
              - You can send messages on behalf of the user.
              - If the user wants to send a message, you MUST collect: Name, Email, Phone Number, and Message.
              - Once you have ALL FOUR, respond with: "CONFIRMED_SEND: {name: '...', email: '...', phone: '...', message: '...'}"
              - STRICTLY prohibit abusive, adult, or offensive content.
              - Keep responses friendly, casual, and professional. No markdown bolding.`
            },
            ...messages,
            userMessage
          ]
        })
      });

      const data = await response.json();
      let assistantMessage = data.choices[0].message.content;
      
      // Perform scroll SIMULTANEOUSLY with message display
      if (targetSection) {
        scrollToSection(targetSection);
      }

      // Handle Automated Form Submission
      if (assistantMessage.includes("CONFIRMED_SEND:")) {
        try {
          const jsonStr = assistantMessage.split("CONFIRMED_SEND:")[1].trim();
          const formData = JSON.parse(jsonStr.replace(/'/g, '"'));
          
          if ((window as any).submitContactForm) {
            setIsLoading(true); // Ensure loading state while sending
            const success = await (window as any).submitContactForm(formData);
            
            if (success) {
              localStorage.setItem("portfolio_message_last_sent", Date.now().toString());
              assistantMessage = "I've sent your message successfully! Shanmukh will get back to you soon.";
            } else {
              assistantMessage = "The message couldn't be sent. Please double check your email and phone number details, or try the form manually.";
            }
          } else {
            assistantMessage = "I'm sorry, I'm having trouble connecting to the contact form right now. Please try filling it out manually below.";
          }
        } catch (e) {
          console.error("Parse Error:", e);
          assistantMessage = "I couldn't process the message details correctly. Could you please double check them?";
        }
      }

      assistantMessage = assistantMessage.replace(/\*\*/g, '').replace(/###/g, '').replace(/##/g, '').replace(/#/g, '');
      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops, something went wrong. Check your connection or try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:opacity-90 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
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
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-background/50"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-secondary text-foreground rounded-tl-none border border-border"
                  }`}>
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
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="bg-secondary/20 border-border focus:ring-1 focus:ring-primary"
              />
              <Button onClick={handleSend} size="icon" disabled={isLoading} className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
