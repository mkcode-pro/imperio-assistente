
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrders } from '@/hooks/use-orders';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { OrderFilters, OrderStatus } from '@/types/admin';
import { 
  Search, 
  Filter, 
  Eye, 
  ArrowLeft, 
  LogOut,
  Calendar,
  Package,
  User,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig = {
  PENDENTE: { variant: 'secondary' as const, color: 'text-yellow-600' },
  CONFIRMADO: { variant: 'default' as const, color: 'text-green-600' },
  CANCELADO: { variant: 'destructive' as const, color: 'text-red-600' }
};

export default function OrdersList() {
  const { orders, loading, updateOrderStatus } = useOrders();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<OrderFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'ALL' | ''>('ALL');

  const filteredOrders = orders.filter(order => {
    // Filtro por termo de busca (nome do cliente ou número do pedido)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesName = order.customer.fullName.toLowerCase().includes(searchLower);
      const matchesOrder = order.orderNumber.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesOrder) return false;
    }

    // Filtro por status
    if (selectedStatus && selectedStatus !== 'ALL' && order.status !== selectedStatus) return false;

    return true;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando pedidos...</p>
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
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestão de Pedidos</h1>
                <p className="text-muted-foreground">{filteredOrders.length} pedidos encontrados</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>Use os filtros para encontrar pedidos específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome do cliente ou número do pedido..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as OrderStatus | 'ALL' | "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Todos os status</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Pedidos */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm || (selectedStatus && selectedStatus !== 'ALL') ? 'Tente ajustar os filtros para ver mais resultados.' : 'Ainda não há pedidos realizados.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Mobile Layout */}
                  <div className="block sm:hidden space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg">#{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(order.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                      <Badge variant={statusConfig[order.status].variant}>
                        {order.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.customer.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{order.items.length} itens</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold text-primary">R$ {order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDENTE">Pendente</SelectItem>
                          <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                          <SelectItem value="CANCELADO">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="font-semibold text-lg">#{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(order.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium">{order.customer.fullName}</p>
                        <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">{order.items.length} itens</p>
                        <p className="font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant={statusConfig[order.status].variant}>
                        {order.status}
                      </Badge>
                      
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className="w-36">
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
                        size="sm"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
