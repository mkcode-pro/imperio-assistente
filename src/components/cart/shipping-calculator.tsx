import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2, Truck, Search } from "lucide-react";
import { fetchAddressByCep, getShippingOptions, type StateCode } from "@/utils/shipping";
import { useCartContext } from "@/contexts/cart-context";
import { toast } from "sonner";
import InputMask from "react-input-mask";

export function ShippingCalculator() {
  const { selectedShipping, setShipping } = useCartContext();
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [shippingOptions, setShippingOptions] = useState<Array<{name: string, price: number}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCepChange = (value: string) => {
    setCep(value);
    setShowResults(false);
  };

  const handleCalculateShipping = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      toast.error("CEP deve ter 8 dígitos");
      return;
    }
    
    setIsLoading(true);
    setShowResults(false);
    
    try {
      const addressData = await fetchAddressByCep(cep);
      if (addressData) {
        setAddress(addressData.logradouro);
        setCity(addressData.localidade);
        setState(addressData.uf);
        
        const options = getShippingOptions(addressData.uf as StateCode);
        setShippingOptions(options);
        setShowResults(true);
        
        // Scroll automático para mostrar resultados
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 100);
        
        if (options.length === 0) {
          toast.error("Não há opções de frete disponíveis para este estado.");
        }
      } else {
        toast.error("CEP não encontrado. Verifique e tente novamente.");
        setAddress("");
        setCity("");
        setState("");
        setShippingOptions([]);
      }
    } catch (error) {
      toast.error("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingChange = (value: string) => {
    const option = shippingOptions.find(opt => `${opt.name}-${opt.price}` === value);
    setShipping(option || null);
  };

  const canCalculate = cep.replace(/\D/g, '').length === 8;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="h-4 w-4 text-primary" />
        <h4 className="font-medium">Calcular Frete</h4>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="cep" className="text-sm">CEP</Label>
          <div className="flex gap-2">
            <InputMask
              mask="99999-999"
              value={cep}
              onChange={(e) => handleCepChange(e.target.value)}
              disabled={isLoading}
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  id="cep"
                  placeholder="00000-000"
                  className="flex-1"
                />
              )}
            </InputMask>
            <Button 
              size="sm"
              onClick={handleCalculateShipping}
              disabled={isLoading || !canCalculate}
              className="px-3"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {address && (
          <div className="text-sm text-muted-foreground">
            <p>{address}</p>
            <p>{city} - {state}</p>
          </div>
        )}

        {showResults && shippingOptions.length > 0 && (
          <div ref={resultsRef} className="space-y-3 p-3 bg-background rounded-lg border">
            <div className="text-sm text-green-600 font-medium">
              ✓ Frete habilitado com sucesso!
            </div>
            <Label className="text-sm block">Escolha a forma de entrega:</Label>
            <RadioGroup
              value={selectedShipping ? `${selectedShipping.name}-${selectedShipping.price}` : ""}
              onValueChange={handleShippingChange}
            >
              {shippingOptions.map((option) => (
                <div key={`${option.name}-${option.price}`} className="flex items-center space-x-2 p-2 rounded border bg-background hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={`${option.name}-${option.price}`} id={`${option.name}-${option.price}`} />
                  <Label 
                    htmlFor={`${option.name}-${option.price}`} 
                    className="flex-1 cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-medium">{option.name}</span>
                    <span className="text-primary font-semibold">R$ {option.price.toFixed(2)}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
}