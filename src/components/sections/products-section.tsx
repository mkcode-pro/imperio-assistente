
import { useState } from "react";
import { products, brands } from "@/data/products";
import { ProductCard } from "@/components/ui/product-card";
import { useCartContext } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Pill, Shield } from "lucide-react";
import { ProductAddedModal } from "@/components/modals/product-added-modal";

interface ProductsSectionProps {
  selectedBrand?: string;
  onCartOpen?: () => void;
}

export function ProductsSection({ selectedBrand, onCartOpen }: ProductsSectionProps) {
  const { addToCart } = useCartContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, (id) => {
      setAddedProductId(id);
      setModalOpen(true);
    });
  };

  const handleViewCart = () => {
    setModalOpen(false);
    onCartOpen?.();
  };

  const handleContinueShopping = () => {
    // Apenas fecha o modal
  };

  if (!selectedBrand) {
    return (
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Selecione um Laboratório
          </h3>
          <p className="text-muted-foreground">
            Escolha uma marca acima para ver os produtos disponíveis
          </p>
        </div>
      </section>
    );
  }

  const selectedBrandData = brands.find(brand => brand.id === selectedBrand);
  const brandProducts = products.filter(product => product.brand === selectedBrand);
  
  if (!selectedBrandData) return null;

  // Categorizar produtos por tipo
  const injectableProducts = brandProducts.filter(p => p.type === 'injetavel');
  const oralProducts = brandProducts.filter(p => p.type === 'oral');
  const tpcProducts = brandProducts.filter(p => p.type === 'tpc');

  const renderProductGrid = (productList: typeof products) => {
    if (productList.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            originalPrice={product.originalPrice}
            discountPrice={product.discountPrice}
            discountPercentage={product.discountPercentage}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="products" className="py-8 px-4 bg-background">
      <div className="container mx-auto">
        {/* Cabeçalho da marca */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src={selectedBrandData.logo}
              alt={`Logo ${selectedBrandData.name}`}
              className="h-12 w-auto object-contain"
            />
            <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {selectedBrandData.name}
                  </h2>
            </div>
          </div>
        </div>

        {/* Acordeões por categoria */}
        <div className="max-w-4xl mx-auto space-y-4">
          <Accordion type="multiple" className="w-full">
            {/* Acordeão Produtos Injetáveis */}
            <AccordionItem value="injetaveis">
              <AccordionTrigger className="text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produtos Injetáveis
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {renderProductGrid(injectableProducts)}
              </AccordionContent>
            </AccordionItem>

            {/* Acordeão Produtos Orais */}
            <AccordionItem value="orais">
              <AccordionTrigger className="text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Produtos Orais
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {renderProductGrid(oralProducts)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <ProductAddedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productId={addedProductId}
        onViewCart={handleViewCart}
        onContinueShopping={handleContinueShopping}
      />
    </section>
  );
}
