
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="text-lg font-bold text-pharma-navy">
            Império Pharma
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-pharma-navy hover:text-pharma-blue">
            <MessageCircle className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Assistente</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
