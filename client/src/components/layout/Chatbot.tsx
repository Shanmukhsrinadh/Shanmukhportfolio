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
        "Hey! I'm Snowflex, Shanmukh's digital assistant. How's your day going? Feel free to ask me anything about my projects or design journey!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
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
     Send Handler
  =============================== */

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const trimmedInput = input.trim();
    const lowerInput = trimmedInput.toLowerCase();

    // Basic abuse filter
    const abusiveWords = ["abuse", "offensive", "explicit"];
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

    /* ===============================
       Resume Shortcut (Before API)
    =============================== */

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

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Opening Shanmukh's resume in a new tab...",
        },
      ]);

      setIsLoading(false);
      return;
    }

    /* ===============================
       Section Scroll Detection
    =============================== */

    let targetSection = "";
    if (lowerInput.includes("about") || lowerInput.includes("who is"))
      targetSection = "about";
    if (lowerInput.includes("project") || lowerInput.includes("work"))
      targetSection = "projects";
    if (lowerInput.includes("contact"))
      targetSection = "contact";
    if (lowerInput.includes("skill") || lowerInput.includes("certification"))
      targetSection = "certifications";



    /* ===============================
       AI API CALL
    =============================== */

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
            "HTTP-Referer": window.location.origin,
            "X-Title": "Shanmukh Portfolio Assistant",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [
              {
                role: "system",
                content: `
You are Shanmukh Srinadh's personal AI assistant, Snowflex.

STRICTLY STICK TO THE PORTFOLIO CONTENT PROVIDED BELOW. Do not invent projects or details.

PORTFOLIO DATA:
- Projects: 
  Timber Oak (Design), M-Wallet (Design), Vaijayanta (Dev), 
  Fashique (Dev), Legacyonwheels (Dev), Earthquake Detection (Dev), 
  Maply Travel & Gadgets WooCommerce (WordPress).
- Certifications: UI/UX Design (Tech Mahindra), Graphic Design (InAmigos), Instruction Designer (Dr Reddy's), Azure AI (Microsoft).
- About: UI/UX Designer & Web Dev from Visakhapatnam. Focuses on seamless digital stories.

If user wants to send a message:
1. Collect Name
2. Collect Email
3. Collect Phone Number
4. Collect Message

Rules:
- Ask ONE missing field at a time.
- Do NOT repeat already collected fields.
- Do NOT use markdown.
- When ALL FOUR are collected respond EXACTLY:

CONFIRMED_SEND: {"name":"...","email":"...","phone":"...","message":"..."}

Do not add extra text before or after CONFIRMED_SEND.

Prohibit abusive or adult content.
Keep tone friendly and professional.
`,
              },
              ...messages,
              userMessage,
            ],
          }),
        }
      );

      const data = await response.json();
      let assistantMessage =
        data?.choices?.[0]?.message?.content ||
        "Something went wrong.";

      /* ===============================
         Scroll While Showing Reply
      =============================== */

      if (targetSection) {
        scrollToSection(targetSection);
      }

      /* ===============================
         CONFIRMED_SEND Handling
      =============================== */


      if (assistantMessage.includes("CONFIRMED_SEND:")) {
        try {
          const match = assistantMessage.match(
            /CONFIRMED_SEND:\s*(\{[\s\S]*\})/
          );

          if (!match) throw new Error("Invalid JSON format");

          const formData = JSON.parse(match[1]);

          if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.message
          ) {
            throw new Error("Missing required fields");
          }
          // 48hr protection (ONLY for contact submission)
          const lastSentStr = localStorage.getItem("portfolio_message_last_sent");
          const now = Date.now();
          const fortyEightHours = 48 * 60 * 60 * 1000;

          if (lastSentStr) {
            const lastSent = parseInt(lastSentStr);
            if (now - lastSent < fortyEightHours) {
              assistantMessage =
                "You've already sent a message recently. Shanmukh will respond soon.";
              setIsLoading(false);
              setMessages(prev => [
                ...prev,
                { role: "assistant", content: assistantMessage },
              ]);
              return;
            }
          }
          scrollToSection("contact");
          await new Promise(res => setTimeout(res, 600));

          if ((window as any).submitContactForm) {
            const result = await (window as any).submitContactForm(formData);

            if (result === true || result?.success) {
              localStorage.setItem(
                "portfolio_message_last_sent",
                Date.now().toString()
              );

              assistantMessage =
                "I've sent your message successfully! Shanmukh will get back to you soon.";
            } else {
              assistantMessage =
                result?.error ||
                "The message couldn't be sent. Please double-check your details.";
            }
          } else {
            assistantMessage =
              "I'm having trouble connecting to the contact form. Please try manually below.";
          }
        } catch (err) {
          console.error("CONFIRMED_SEND error:", err);
          assistantMessage =
            "I couldn't process your details properly. Please recheck them.";
        }
      }

      assistantMessage = assistantMessage
        .replace(/\*\*/g, "")
        .replace(/###/g, "")
        .replace(/##/g, "")
        .replace(/#/g, "");

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops, something went wrong. Check your connection or try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ===============================
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