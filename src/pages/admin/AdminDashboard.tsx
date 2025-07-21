
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/use-orders';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import type { OrderStats } from '@/types/admin';
import { 
  ShoppingCart, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Users,
  Package,
  LogOut,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig = {
  PENDENTE: { color: 'bg-yellow-500', icon: Clock, label: 'Pendentes' },
  CONFIRMADO: { color: 'bg-green-500', icon: CheckCircle, label: 'Confirmados' },
  CANCELADO: { color: 'bg-red-500', icon: XCircle, label: 'Cancelados' }
};

export default function AdminDashboard() {
  const { orders, stats, loading } = useOrders();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const recentOrders = orders
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Império Pharma - Gestão de Pedidos</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/orders')}
              >
                <Package className="h-4 w-4 mr-2" />
                Ver Todos os Pedidos
              </Button>
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
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalToday}</div>
              <p className="text-xs text-muted-foreground">
                R$ {stats.salesToday.toFixed(2)} em vendas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWeek}</div>
              <p className="text-xs text-muted-foreground">
                R$ {stats.salesWeek.toFixed(2)} em vendas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMonth}</div>
              <p className="text-xs text-muted-foreground">
                R$ {stats.salesMonth.toFixed(2)} em vendas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                Todos os períodos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = stats[`${status.toLowerCase()}Count` as keyof OrderStats] as number;
            const Icon = config.icon;
            
            return (
              <Card key={status}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{config.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="flex items-center mt-2">
                    <div className={`w-2 h-2 rounded-full ${config.color} mr-2`}></div>
                    <span className="text-xs text-muted-foreground">
                      Status {status.toLowerCase()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>
                  Últimos 5 pedidos realizados
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/orders')}
              >
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum pedido encontrado</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">#{order.orderNumber}</span>
                        <Badge variant={
                          order.status === 'PENDENTE' ? 'secondary' :
                          order.status === 'CONFIRMADO' ? 'default' :
                          'destructive'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium">{order.customer.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(order.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{order.items.length} itens</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
