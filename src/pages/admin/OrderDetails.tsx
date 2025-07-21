
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useOrders } from '@/hooks/use-orders';
import { Order, OrderStatus } from '@/types/admin';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  Truck,
  Calendar,
  MessageSquare,
  Tag,
  History,
  FileText,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

const statusConfig = {
  PENDENTE: { variant: 'secondary' as const, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  CONFIRMADO: { variant: 'default' as const, color: 'text-green-600', bg: 'bg-green-50' },
  CANCELADO: { variant: 'destructive' as const, color: 'text-red-600', bg: 'bg-red-50' }
};

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus, addComment, updateTags } = useOrders();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id) {
      const foundOrder = getOrderById(id);
      setOrder(foundOrder || null);
    }
  }, [id, getOrderById]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (!order) return;
    
    const updatedOrder = updateOrderStatus(order.id, newStatus);
    if (updatedOrder) {
      setOrder(updatedOrder);
      toast.success(`Status alterado para ${newStatus}`);
    }
  };

  const handleAddComment = () => {
    if (!order || !newComment.trim()) return;
    
    const updatedOrder = addComment(order.id, newComment.trim());
    if (updatedOrder) {
      setOrder(updatedOrder);
      setNewComment('');
      toast.success('Comentário adicionado com sucesso');
    }
  };

  const handleAddTag = () => {
    if (!order || !newTag.trim()) return;
    
    const newTags = [...order.tags, newTag.trim()];
    const updatedOrder = updateTags(order.id, newTags);
    if (updatedOrder) {
      setOrder(updatedOrder);
      setNewTag('');
      toast.success('Tag adicionada com sucesso');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!order) return;
    
    const newTags = order.tags.filter(tag => tag !== tagToRemove);
    const updatedOrder = updateTags(order.id, newTags);
    if (updatedOrder) {
      setOrder(updatedOrder);
      toast.success('Tag removida com sucesso');
    }
  };

  const formatWhatsAppMessage = () => {
    if (!order) return '';

    const itemsList = order.items.map(item => 
      `• ${item.productName} - Qtd: ${item.quantity} - R$ ${item.totalPrice.toFixed(2)}`
    ).join('\n');

    const shippingInfo = order.shipping 
      ? `\n🚚 *FRETE:*\nModalidade: ${order.shipping.name}\nValor: R$ ${order.shipping.price.toFixed(2)}\n`
      : '\n🚚 *FRETE:* A calcular\n';

    return `🛒 *PEDIDO #${order.orderNumber} - IMPÉRIO PHARMA*

📋 *DADOS DO CLIENTE:*
Nome: ${order.customer.fullName}
CPF: ${order.customer.cpf}
Telefone: ${order.customer.phone}
E-mail: ${order.customer.email}

📍 *ENDEREÇO DE ENTREGA:*
${order.customer.address.street}, ${order.customer.address.number} ${order.customer.address.complement}
${order.customer.address.neighborhood} - ${order.customer.address.city}/${order.customer.address.state}
CEP: ${order.customer.address.cep}
${shippingInfo}
🛍️ *PRODUTOS:*
${itemsList}

💰 *SUBTOTAL: R$ ${order.subtotal.toFixed(2)}*
💰 *TOTAL: R$ ${order.total.toFixed(2)}*

✅ *Status: ${order.status}*`;
  };

  const handleSendWhatsApp = () => {
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Pedido não encontrado</h2>
          <p className="text-muted-foreground mb-4">O pedido solicitado não existe ou foi removido.</p>
          <Button onClick={() => navigate('/admin/orders')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/orders')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Pedido #{order.orderNumber}</h1>
                <p className="text-muted-foreground">
                  Criado em {format(order.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={statusConfig[order.status].variant} className="text-sm">
                {order.status}
              </Badge>
              <Button
                variant="outline"
                onClick={handleSendWhatsApp}
                className="hidden sm:flex"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Enviar WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome Completo</p>
                    <p className="font-medium">{order.customer.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CPF</p>
                    <p className="font-medium">{order.customer.cpf}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {order.customer.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {order.customer.email}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço de Entrega
                  </p>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium">
                      {order.customer.address.street}, {order.customer.address.number} {order.customer.address.complement}
                    </p>
                    <p>
                      {order.customer.address.neighborhood} - {order.customer.address.city}/{order.customer.address.state}
                    </p>
                    <p className="text-sm text-muted-foreground">CEP: {order.customer.address.cep}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Produtos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Produtos ({order.items.length} itens)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">{item.productBrand}</p>
                        <p className="text-sm">Quantidade: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {item.totalPrice.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.unitPrice.toFixed(2)} cada
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Resumo de Valores */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Frete
                    </span>
                    <span>R$ {order.shippingCost.toFixed(2)}</span>
                  </div>
                  {order.shipping && (
                    <p className="text-xs text-muted-foreground">
                      Modalidade: {order.shipping.name}
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Status */}
            {order.statusHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Histórico de Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.statusHistory.map((change, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm">
                            Status alterado de <Badge variant="outline" className="text-xs">{change.from}</Badge> para{' '}
                            <Badge variant={statusConfig[change.to].variant} className="text-xs">{change.to}</Badge>
                          </p>
                          {change.note && (
                            <p className="text-xs text-muted-foreground mt-1">Nota: {change.note}</p>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {format(change.timestamp, "dd/MM 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Controle de Status */}
            <Card>
              <CardHeader>
                <CardTitle>Controle de Status</CardTitle>
                <CardDescription>Altere o status do pedido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={order.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:hidden"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Enviar WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
                <CardDescription>Organize com etiquetas personalizadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {order.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                  {order.tags.length === 0 && (
                    <p className="text-sm text-muted-foreground">Nenhuma tag adicionada</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nova tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} disabled={!newTag.trim()}>
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comentários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comentários Internos
                </CardTitle>
                <CardDescription>Anotações visíveis apenas no admin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {order.comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">{comment.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(comment.timestamp, "dd/MM 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  ))}
                  {order.comments.length === 0 && (
                    <p className="text-sm text-muted-foreground">Nenhum comentário adicionado</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Adicionar comentário interno..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button 
                    onClick={handleAddComment} 
                    disabled={!newComment.trim()}
                    className="w-full"
                  >
                    Adicionar Comentário
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID do Pedido:</span>
                  <span className="font-mono text-xs">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data de Criação:</span>
                  <span>{format(order.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Última Atualização:</span>
                  <span>{format(order.updatedAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
                {order.paymentProofName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comprovante:</span>
                    <span className="text-xs">{order.paymentProofName}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
