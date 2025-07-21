import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/contexts/cart-context";
import { products } from "@/data/products";
import { ChevronLeft, Upload, FileCheck, Copy, MessageCircle, Edit2, ShoppingBag, MapPin, Truck, Pencil } from "lucide-react";
import { toast } from "sonner";
import InputMask from "react-input-mask";
import { AdminStorage } from "@/utils/admin-storage";
import { Order, OrderItem, CustomerData } from "@/types/admin";

interface CheckoutStepsProps {
  isVisible: boolean;
}

interface FormData {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export function CheckoutSteps({ isVisible }: CheckoutStepsProps) {
  const { cartItems, selectedShipping } = useCartContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    cpf: "",
    phone: "",
    email: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const whatsappNumber = "5511999999999";

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.discountPrice || 0) * item.quantity;
  }, 0);

  const total = subtotal + (selectedShipping?.price || 0);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || ""
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const isStep1Valid = () => {
    return formData.fullName.trim() !== "" &&
           formData.cpf.replace(/\D/g, '').length === 11 &&
           formData.phone.trim() !== "" &&
           formData.email.trim() !== "" &&
           formData.cep.replace(/\D/g, '').length === 8 &&
           formData.address.trim() !== "" &&
           formData.number.trim() !== "" &&
           formData.neighborhood.trim() !== "" &&
           formData.city.trim() !== "" &&
           formData.state.trim() !== "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (validTypes.includes(file.type)) {
        setPaymentProof(file);
        toast.success("Comprovante anexado com sucesso!");
      } else {
        toast.error("Formato não suportado. Use JPG, PNG ou PDF.");
      }
    }
  };

  const createOrderForAdmin = (): Order => {
    const orderItems: OrderItem[] = cartItems.map(item => {
      const product = getProductById(item.productId);
      return {
        productId: item.productId,
        productName: product?.name || 'Produto não encontrado',
        productBrand: product?.brand || '',
        quantity: item.quantity,
        unitPrice: product?.discountPrice || 0,
        totalPrice: (product?.discountPrice || 0) * item.quantity,
        productImage: product?.image || ''
      };
    });

    const customerData: CustomerData = {
      fullName: formData.fullName,
      cpf: formData.cpf,
      phone: formData.phone,
      email: formData.email,
      address: {
        cep: formData.cep,
        street: formData.address,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state
      }
    };

    const orderId = Date.now().toString();
    const orderNumber = AdminStorage.generateOrderNumber();
    const now = new Date();

    return {
      id: orderId,
      orderNumber,
      status: 'PENDENTE',
      customer: customerData,
      items: orderItems,
      shipping: selectedShipping,
      subtotal,
      shippingCost: selectedShipping?.price || 0,
      total,
      createdAt: now,
      updatedAt: now,
      statusHistory: [{
        from: 'PENDENTE' as const,
        to: 'PENDENTE' as const,
        timestamp: now
      }],
      comments: [],
      tags: [],
      paymentProofName: paymentProof?.name
    };
  };

  const formatWhatsAppMessage = () => {
    const itemsList = cartItems.map(item => {
      const product = getProductById(item.productId);
      return `• ${product?.name} - Qtd: ${item.quantity} - R$ ${((product?.discountPrice || 0) * item.quantity).toFixed(2)}`;
    }).join('\n');

    const shippingInfo = selectedShipping 
      ? `\n🚚 *FRETE:*\nModalidade: ${selectedShipping.name}\nValor: R$ ${selectedShipping.price.toFixed(2)}\n`
      : '\n🚚 *FRETE:* A calcular\n';

    // Criar o pedido no admin antes de enviar WhatsApp
    const order = createOrderForAdmin();
    AdminStorage.saveOrder(order);

    const message = `🛒 *NOVO PEDIDO #${order.orderNumber} - IMPÉRIO PHARMA*

📋 *DADOS DO CLIENTE:*
Nome: ${formData.fullName}
CPF: ${formData.cpf}
Telefone: ${formData.phone}
E-mail: ${formData.email}

📍 *ENDEREÇO DE ENTREGA:*
${formData.address}, ${formData.number} ${formData.complement}
${formData.neighborhood} - ${formData.city}/${formData.state}
CEP: ${formData.cep}
${shippingInfo}
🛍️ *PRODUTOS:*
${itemsList}

💰 *SUBTOTAL: R$ ${subtotal.toFixed(2)}*
💰 *TOTAL: R$ ${total.toFixed(2)}*

✅ *COMPROVANTE DE PAGAMENTO ANEXADO*
📎 Arquivo: ${paymentProof?.name}

🔥 *PEDIDO REGISTRADO NO SISTEMA #${order.orderNumber}*`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppSend = () => {
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    
    // Notificar que o pedido foi salvo no admin
    toast.success("Pedido registrado no sistema administrativo!", {
      description: "O pedido foi salvo e está disponível no painel admin."
    });
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <section id="checkout" className="py-8 sm:py-16 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            Finalizar Pedido
          </h2>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ${
                      currentStep > step ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-lg border shadow-sm p-6">
            {/* Step 1: Dados do Cliente e Entrega */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Dados do Cliente e Entrega</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nome completo *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <InputMask
                        mask="999.999.999-99"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            id="cpf"
                            placeholder="Ex: 123.456.789-00"
                            className="mt-1"
                          />
                        )}
                      </InputMask>
                    </div>

                    <div>
                      <Label htmlFor="phone">Celular *</Label>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            id="phone"
                            placeholder="Ex: (11) 99999-8888"
                            className="mt-1"
                          />
                        )}
                      </InputMask>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Ex: seuemail@dominio.com"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <InputMask
                        mask="99999-999"
                        value={formData.cep}
                        onChange={(e) => handleInputChange("cep", e.target.value)}
                        onBlur={handleCepBlur}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            id="cep"
                            placeholder="Ex: 01001-000"
                            className="mt-1"
                          />
                        )}
                      </InputMask>
                    </div>

                    <div>
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Ex: Rua Exemplo"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => handleInputChange("number", e.target.value)}
                        placeholder="Ex: 123"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.complement}
                        onChange={(e) => handleInputChange("complement", e.target.value)}
                        placeholder="Ex: Apto 22"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                        placeholder="Ex: Centro"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Ex: São Paulo"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">Estado (UF) *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value.toUpperCase())}
                        placeholder="Ex: SP"
                        className="mt-1"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!isStep1Valid()}
                    className="w-full md:w-auto"
                  >
                    Avançar para Resumo
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Resumo */}
            {currentStep === 2 && (
              <div>
                <Card className="bg-card border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Seção de Produtos */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Produtos</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.location.href = '#products'}
                          className="text-muted-foreground hover:text-foreground text-sm h-8 px-3"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {cartItems.map((item) => {
                          const product = getProductById(item.productId);
                          if (!product) return null;
                          
                          return (
                            <div key={item.productId} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.brand}</p>
                                <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground">
                                  R$ {(product.discountPrice * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <Separator className="mt-4" />
                    </div>

                    {/* Seção de Dados de Entrega */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Dados de Entrega</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(1)}
                          className="text-muted-foreground hover:text-foreground text-sm h-8 px-3"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="font-semibold text-foreground">{formData.fullName}</p>
                        <p className="text-sm text-muted-foreground">CPF: {formData.cpf}</p>
                        <p className="text-sm text-foreground">{formData.address}, {formData.number} {formData.complement}</p>
                        <p className="text-sm text-foreground">{formData.neighborhood} - {formData.city}/{formData.state}</p>
                        <p className="text-sm text-muted-foreground">CEP: {formData.cep}</p>
                        <p className="text-sm text-muted-foreground">Telefone: {formData.phone}</p>
                        <p className="text-sm text-muted-foreground">E-mail: {formData.email}</p>
                      </div>
                      <Separator className="mt-4" />
                    </div>

                    {/* Seção de Frete */}
                    {selectedShipping && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">Frete</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.location.href = '#carrinho'}
                            className="text-muted-foreground hover:text-foreground text-sm h-8 px-3"
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-foreground">{selectedShipping.name}</span>
                            <span className="font-semibold text-foreground">R$ {selectedShipping.price.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-green-600 mt-2">✓ Frete habilitado com sucesso!</p>
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* Detalhamento de Custos */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">R$ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="font-medium text-foreground">R$ {(selectedShipping?.price || 0).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-foreground">Total</span>
                        <span className="text-lg font-bold text-primary">R$ {total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Avançar para Pagamento
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Pagamento */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Forma de Pagamento</h3>
                
                <div className="space-y-6">
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <p className="text-xl sm:text-2xl font-bold text-primary mb-2">
                      Total: R$ {total.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faça o pagamento via PIX e anexe o comprovante
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Chave PIX para Pagamento</Label>
                    <div className="flex gap-2">
                      <Input
                        value="imperio.pharma@email.com"
                        readOnly
                        className="font-mono text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText("imperio.pharma@email.com");
                          toast.success("Chave PIX copiada!");
                        }}
                        className="px-3"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="payment-proof">Comprovante de Pagamento *</Label>
                    <div className="mt-2">
                      <input
                        id="payment-proof"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('payment-proof')?.click()}
                        className="w-full h-12"
                      >
                        {paymentProof ? (
                          <>
                            <FileCheck className="h-4 w-4 mr-2 text-green-600" />
                            {paymentProof.name}
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Anexar Comprovante
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        Formatos aceitos: JPG, PNG, PDF
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse order-1 sm:order-2"
                    disabled={!paymentProof}
                    onClick={handleWhatsAppSend}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Finalizar e Enviar no WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
