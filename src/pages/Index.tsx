import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { ProductsSection } from "@/components/sections/products-section";
import { CheckoutSection } from "@/components/sections/checkout-section";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/contexts/cart-context";
import { useCartContext } from "@/contexts/cart-context";

function IndexContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const { getTotalItems } = useCartContext();

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutVisible(true);
    // Rolar suavemente para a seção de checkout
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleBackToShopping = () => {
    setIsCheckoutVisible(false);
    // Rolar para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandSelect = (brandId: string | undefined) => {
    setSelectedBrand(brandId);
    // Scroll suave para a seção de produtos quando uma marca for selecionada
    if (brandId) {
      setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          const headerHeight = 64; // altura do header fixo
          const elementPosition = productsSection.offsetTop;
          const offsetPosition = elementPosition - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  // Funções para navegação mobile
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBrands = () => {
    const brandsSection = document.querySelector('section');
    if (brandsSection) {
      brandsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      
      <main className="w-full pb-16 md:pb-0">
        {/* Seções principais - ocultar quando checkout estiver visível */}
        <div className={isCheckoutVisible ? 'hidden' : 'block'}>
          <HeroSection />
          <BrandsSection selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
          <div id="products">
            <ProductsSection 
              selectedBrand={selectedBrand} 
              onCartOpen={() => setIsCartOpen(true)}
            />
          </div>
        </div>

        {/* Seção de checkout */}
        <CheckoutSection isVisible={isCheckoutVisible} />
      </main>
      
      {!isCheckoutVisible && <Footer />}
      
      {/* Barra de navegação inferior para mobile */}
      <MobileBottomNav
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onBrandsClick={scrollToBrands}
        onProductsClick={scrollToProducts}
        onHomeClick={scrollToHome}
        isCheckoutVisible={isCheckoutVisible}
      />
      
      <CartDrawer 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
        onGoToCheckout={handleGoToCheckout}
      />
    </div>
  );
}

export default function Index() {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
}
