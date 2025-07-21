import { brands } from "@/data/products";
import { BrandCard } from "@/components/ui/brand-card";
interface BrandsSectionProps {
  selectedBrand?: string;
  onBrandSelect: (brandId: string | undefined) => void;
}
export function BrandsSection({
  selectedBrand,
  onBrandSelect
}: BrandsSectionProps) {
  return <section className="py-8 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Selecione o Laboratório
          </h2>
          <p className="text-sm text-muted-foreground">
            Máxima qualidade farmacêutica garantida
          </p>
        </div>
        
        {/* Grid responsivo das marcas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {brands.map(brand => <BrandCard key={brand.id} name={brand.name} logo={brand.logo} onClick={() => onBrandSelect(brand.id)} isSelected={false} />)}
        </div>
      </div>
    </section>;
}