
interface BrandCardProps {
  name: string;
  logo: string;
  onClick: () => void;
  isSelected?: boolean;
}

export function BrandCard({
  name,
  logo,
  onClick,
  isSelected = false
}: BrandCardProps) {
  return (
    <div 
      onClick={onClick} 
      className="cursor-pointer rounded-lg border border-border transition-all duration-300 bg-background active:scale-95"
    >
      <div className="aspect-[4/3] p-1.5">
        <div className="flex flex-col h-full">
          {/* Logo container - ocupa quase todo o espaço */}
          <div className="flex-1 flex items-center justify-center mb-1">
            <img 
              src={logo} 
              alt={`Logo ${name}`} 
              className="max-w-full max-h-full object-contain" 
              loading="lazy" 
            />
          </div>
          
          {/* Nome da marca - muito compacto */}
          <div className="flex-shrink-0 px-1">
            <h3 className="text-[10px] sm:text-xs font-medium text-center leading-tight text-foreground">
              {name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
