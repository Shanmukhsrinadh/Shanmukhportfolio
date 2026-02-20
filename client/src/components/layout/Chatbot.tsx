import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Snowflex, Shanmukh's digital assistant. How can I help you explore the portfolio today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSentSuccessfulMessage, setHasSentSuccessfulMessage] = useState(false);
  const [formState, setFormState] = useState<{
    step: 'none' | 'name' | 'email' | 'phone' | 'message' | 'confirm';
    data: { name: string; email: string; phone: string; message: string };
  }>({
    step: 'none',
    data: { name: "", email: "", phone: "", message: "" }
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: Message = { role: "user", content: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let botResponse = "";
      const lowerInput = userText.toLowerCase();

      // Form Collection Logic
      if (formState.step !== 'none') {
        const nextState = { ...formState };
        
        if (formState.step === 'name') {
          nextState.data.name = userText;
          nextState.step = 'email';
          botResponse = `Got it, ${userText}. What's your email address?`;
        } else if (formState.step === 'email') {
          nextState.data.email = userText;
          nextState.step = 'phone';
          botResponse = "Thanks! And your phone number?";
        } else if (formState.step === 'phone') {
          nextState.data.phone = userText;
          nextState.step = 'message';
          botResponse = "Great. Finally, what would you like to say to Shanmukh?";
        } else if (formState.step === 'message') {
          nextState.data.message = userText;
          nextState.step = 'confirm';
          botResponse = `Ready to send this message?\n\nName: ${nextState.data.name}\nEmail: ${nextState.data.email}\nPhone: ${nextState.data.phone}\nMessage: ${userText}\n\nType 'yes' to send!`;
        } else if (formState.step === 'confirm') {
          if (lowerInput.includes('yes')) {
            if (hasSentSuccessfulMessage) {
              botResponse = "You've already sent a message successfully! To prevent spam, I can only send one message per session. You can use the contact form directly if you need to send another.";
              nextState.step = 'none';
            } else {
              // Simulate form submission
              botResponse = "Sending your message now...";
              
              // Trigger the actual contact form logic if possible or just show success
              setTimeout(() => {
                setMessages(prev => [...prev, { role: "assistant", content: "Success! Your message has been sent to Shanmukh. He'll get back to you soon!" }]);
                setHasSentSuccessfulMessage(true);
                toast({
                  title: "Message Sent via Chat!",
                  description: "Shanmukh will get back to you soon.",
                });
              }, 1500);
              nextState.step = 'none';
            }
          } else {
            botResponse = "Cancelled. How else can I help you navigate?";
            nextState.step = 'none';
          }
        }
        setFormState(nextState);
      } 
      // Navigation & Keyword Logic
      else if (lowerInput.match(/\b(hi|hello|hey|greetings)\b/)) {
        botResponse = "Hello there! 😊 I'm Snowflex. I can help you navigate the portfolio or even help you send a message to Shanmukh. What's on your mind?";
      } else if (lowerInput.match(/\b(contact|message|reach out|get in touch|mail)\b/)) {
        if (hasSentSuccessfulMessage) {
          botResponse = "You've already sent a message! Taking you to the contact section if you want to see Shanmukh's details.";
          setTimeout(() => scrollToSection('#contact'), 500);
        } else {
          botResponse = "I can help you with that! Let's start with your name.";
          setFormState({ ...formState, step: 'name' });
        }
      } else if (lowerInput.match(/\b(services|service|offerings)\b/)) {
        botResponse = "Taking you to the Services section...";
        setTimeout(() => scrollToSection('#services'), 500);
      } else if (lowerInput.match(/\b(about|skills|who is he)\b/)) {
        botResponse = "Taking you to the About section...";
        setTimeout(() => scrollToSection('#about'), 500);
      } else if (lowerInput.match(/\b(projects|works|work|project)\b/)) {
        botResponse = "Showing you some of Shanmukh's best work...";
        setTimeout(() => scrollToSection('#projects'), 500);
      } else if (lowerInput.match(/\b(certifications|certificate)\b/)) {
        botResponse = "Heading over to Certifications...";
        setTimeout(() => scrollToSection('#certifications'), 500);
      } else if (lowerInput.match(/\b(resume|cv)\b/)) {
        botResponse = "Opening Shanmukh's resume for you!";
        window.open('https://drive.google.com/file/d/1QT1MQjPJK7pzxHusaM2NYgJe8AuMjo12/view?usp=sharing', '_blank');
      } else {
        botResponse = "I can help you navigate! Try asking about: Projects, About, Services, Certifications, or say 'Contact' to send a message.";
      }

      if (botResponse) {
        setMessages(prev => [...prev, { role: "assistant", content: botResponse }]);
      }
      setIsLoading(false);
    }, 800);
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
                  <p className="text-sm font-bold">Snowflex</p>
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
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
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
