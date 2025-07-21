import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  onAddToCart: () => void;
}

export function ProductCard({
  image,
  name,
  description,
  originalPrice,
  discountPrice,
  discountPercentage,
  onAddToCart
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border border-border bg-background hover:shadow-md transition-all duration-200 relative">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-24 object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-1 left-1 bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      
      <CardContent className="p-2.5">
        <h3 className="font-semibold text-xs text-card-foreground leading-tight mb-1 min-h-[2.5rem]">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">
          {description}
        </p>
        
        <div className="space-y-2">
          {originalPrice > discountPrice && (
            <div className="text-xs text-muted-foreground line-through">
              R$ {originalPrice.toFixed(2)}
            </div>
          )}
          <div className="text-sm font-bold text-primary mb-2">
            R$ {discountPrice.toFixed(2)}
          </div>
          
          <Button 
            onClick={onAddToCart}
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1.5 h-auto font-medium flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-3 h-3" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}