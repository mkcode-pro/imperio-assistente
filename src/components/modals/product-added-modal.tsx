import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { ShoppingCart, Plus } from "lucide-react";

interface ProductAddedModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  onViewCart: () => void;
  onContinueShopping: () => void;
}

export function ProductAddedModal({ 
  isOpen, 
  onClose, 
  productId, 
  onViewCart, 
  onContinueShopping 
}: ProductAddedModalProps) {
  const product = productId ? products.find(p => p.id === productId) : null;
  
  if (!product) return null;

  const handleViewCart = () => {
    onViewCart();
    onClose();
  };

  const handleContinueShopping = () => {
    onContinueShopping();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <ShoppingCart className="h-6 w-6 text-green-600" />
          </div>
          <AlertDialogTitle className="text-xl font-semibold">
            Produto Adicionado!
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-foreground line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-sm font-semibold text-primary">
                    R$ {product.discountPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                O produto foi adicionado ao seu carrinho com sucesso.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Continuar Comprando
          </Button>
          <Button
            onClick={handleViewCart}
            className="w-full sm:w-auto"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ver Carrinho
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}