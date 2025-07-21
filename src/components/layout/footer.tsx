
export function Footer() {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-bold text-pharma-navy mb-2">
              Império Pharma - Assistente Especializado
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Tecnologia avançada de IA especializada em protocolos de suplementação, 
              oferecendo orientações personalizadas baseadas em seu perfil e objetivos.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span>✅ Orientação Profissional</span>
            <span>✅ Produtos Certificados</span>
            <span>✅ Atendimento 24/7</span>
            <span>✅ Consultas Gratuitas</span>
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              © 2024 Império Pharma. Assistente especializado em suplementação.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
