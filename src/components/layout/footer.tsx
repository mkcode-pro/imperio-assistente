export function Footer() {
  return (
    <footer className="bg-pharma-dark-blue text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Império Pharma</h3>
            <p className="text-white/80 text-sm">
              Sua farmácia de suplementos com o melhor atendimento e produtos de qualidade.
            </p>
          </div>

          {/* Links úteis */}
          <div className="space-y-4">
            <h4 className="font-semibold">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-pharma-gold transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-pharma-gold transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-pharma-gold transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-pharma-gold transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className="space-y-4">
            <h4 className="font-semibold">Atendimento</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>📞 (11) 9999-9999</li>
              <li>📧 contato@imperiopharma.com.br</li>
              <li>⏰ Seg-Sex: 8h às 18h</li>
              <li>⏰ Sáb: 8h às 14h</li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-white/20" />
        
        <div className="text-center text-sm text-white/60">
          <p>&copy; 2024 Império Pharma. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}