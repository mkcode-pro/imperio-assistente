
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TermsStep } from "./terms-step";
import { ProfileFormStep, type ProfileData } from "./profile-form-step";
import { ChatStep } from "./chat-step";

interface AssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "terms" | "profile" | "chat";

export function AssistantModal({ open, onOpenChange }: AssistantModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("terms");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleTermsAccept = () => {
    setCurrentStep("profile");
  };

  const handleProfileSubmit = (data: ProfileData) => {
    setProfileData(data);
    setCurrentStep("chat");
  };

  const handleNewConsultation = () => {
    setCurrentStep("terms");
    setProfileData(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setCurrentStep("terms");
      setProfileData(null);
    }, 300);
  };

  const getStepNumber = () => {
    switch(currentStep) {
      case "terms": return 1;
      case "profile": return 2;
      case "chat": return 3;
      default: return 1;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-none !w-screen !h-screen !m-0 !p-0 !rounded-none !border-0 overflow-hidden !fixed !inset-0 !translate-x-0 !translate-y-0">
        <DialogTitle className="sr-only">Assistente Maromba - Império Pharma</DialogTitle>
        <DialogDescription className="sr-only">
          Assistente inteligente especializado em protocolos de suplementação
        </DialogDescription>
        
        <div className="relative flex flex-col h-screen w-full bg-background">
          {/* Progress Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-pharma-navy/5 to-pharma-blue/5 border-b border-border/50 p-3 sm:p-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-pharma-navy">
                    Império Pharma • Assistente IA
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>Etapa {getStepNumber()}/3</span>
                    <span>•</span>
                    <span className="capitalize text-pharma-blue font-medium">
                      {currentStep === "terms" ? "Termos" : 
                       currentStep === "profile" ? "Perfil" : "Consulta"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    GRATUITO
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3 w-full bg-border/30 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pharma-blue to-pharma-navy transition-all duration-500 ease-out"
                  style={{ width: `${(getStepNumber() / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 h-full overflow-auto">
            {currentStep === "terms" && (
              <TermsStep onAccept={handleTermsAccept} />
            )}
            
            {currentStep === "profile" && (
              <ProfileFormStep onSubmit={handleProfileSubmit} />
            )}
            
            {currentStep === "chat" && profileData && (
              <ChatStep 
                profileData={profileData} 
                onNewConsultation={handleNewConsultation}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
