
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { AssistantModal } from "@/components/assistant/assistant-modal";

export function FloatingAssistantButton() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 animate-pulse">
        <div className="relative">
          <Button
            size="lg"
            onClick={() => setAssistantOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-pharma-navy to-pharma-blue hover:from-pharma-navy/90 hover:to-pharma-blue/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 p-0"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
          
          {/* Badge BETA no canto superior direito */}
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 animate-bounce">
            BETA
          </Badge>
          
          {/* Efeito de ondas/pulso ao redor */}
          <div className="absolute inset-0 rounded-full bg-pharma-blue/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-pharma-blue/20 animate-ping animation-delay-75"></div>
        </div>
      </div>

      <AssistantModal 
        open={assistantOpen} 
        onOpenChange={setAssistantOpen} 
      />
    </>
  );
}
