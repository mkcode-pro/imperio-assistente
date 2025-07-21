
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Clock } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";
export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }
        return {
          hours: 23,
          minutes: 59,
          seconds: 59
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleChatClick = () => {
    setIsModalOpen(true);
  };
  return <section className="bg-pharma-dark-blue text-white pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Urgency Banner */}
      <div className="bg-destructive text-destructive-foreground py-2 px-4 mb-4">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
          <Zap className="h-4 w-4 animate-pulse" />
          <span className="hidden sm:inline">OFERTA RELÂMPAGO:</span>
          <span>TEMPO LIMITADO</span>
          <div className="flex items-center gap-1 ml-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-pharma-gold/20 text-pharma-gold px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            PROMOÇÃO ESPECIAL
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            <span className="text-pharma-gold">BOT INTELIGENTE</span> com IA
          </h1>
          
          
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <Button onClick={handleChatClick} size="lg" className="bg-pharma-gold text-pharma-dark-blue hover:bg-pharma-gold/90 shadow-button text-base px-6 py-3 h-auto w-full sm:w-auto font-semibold">
              <MessageCircle className="mr-2 h-5 w-5" />
              MONTE SEU PROTOCOLO
            </Button>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-pharma-gold rounded-full"></div>
                <span>Entrega Discreta</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-pharma-gold rounded-full"></div>
                <span>Qualidade Garantida</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-pharma-gold mb-2">
              Conheça o Assistente Maromba!
            </h2>
            <p className="text-white/90 mb-4">
              Sua nova ferramenta de IA para criar protocolos com base em seus objetivos.
            </p>
            <div className="rounded-lg h-48 w-48 mx-auto my-4 flex items-center justify-center overflow-hidden">
              <img 
                src="/src/assets/robozinho-maromba.png" 
                alt="Robô Maromba - Assistente IA" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      <AssistantModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>;
}
