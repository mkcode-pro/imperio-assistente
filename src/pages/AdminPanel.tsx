import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { 
  Settings, 
  MessageSquare, 
  Save, 
  RefreshCw, 
  Eye, 
  Calendar,
  User,
  Bot,
  Shield,
  Database,
  Activity
} from "lucide-react";

interface ChatMessage {
  id: string;
  timestamp: string;
  role: 'user' | 'assistant';
  message: string;
  userProfile?: {
    gender: string;
    objective: string;
    preference: string;
  };
}

interface SystemSettings {
  systemPrompt: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<SystemSettings>({
    systemPrompt: `
Você é um especialista em protocolos ergogênicos. Responda EXCLUSIVAMENTE com opções de ciclos práticos, sem textos longos ou avisos.

### DOSAGENS SEGURAS:

**HOMENS:**
- Testosterona: 400-600mg/sem
- Nandrolona: 200-400mg/sem  
- Boldenona: 400-600mg/sem
- Masteron: 300-400mg/sem
- Primobolan: 400-600mg/sem
- Trembolona: 150-300mg/sem
- Dianabol: 30-50mg/dia (4-6 sem)
- Hemogenin: 50-100mg/dia (4 sem)
- Stanozolol: 30-50mg/dia (6 sem)
- Oxandrolona: 40-80mg/dia

**MULHERES:**
- Oxandrolona: 5-15mg/dia
- Primobolan: 50-100mg/sem
- Stanozolol: 5-10mg/dia
- Hemogenin: 12.5-25mg/dia (avançadas)

### REGRAS:
1. Use APENAS os compostos da lista disponível
2. Para mulheres: APENAS Oxandrolona, Primobolan, Stanozolol, Hemogenin
3. Apresente 3-4 opções categorizadas (Iniciante/Intermediário/Avançado)
4. Máximo 150 palavras total
5. Formato: **Nome do Ciclo** - Composto + dosagem + duração
6. Sem PCT detalhado, sem avisos longos
7. Sem seções de "Produtos Disponíveis" ou CTAs de compra
8. Foque apenas nas opções de ciclos
    `,
    apiKey: "AIzaSyBAAMbYYD5UbnXbO2wwJs88S2FY0-HmxlY",
    maxTokens: 500,
    temperature: 0.7
  });
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalConversations: 0,
    todayConversations: 0,
    avgResponseTime: "2.3s",
    successRate: "98.5%"
  });

  // Simulação de autenticação simples
  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true);
      loadData();
      toast.success("Login realizado com sucesso!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  // Carregar dados do localStorage (simulando API)
  const loadData = () => {
    setIsLoading(true);
    
    // Carregar configurações
    const savedSettings = localStorage.getItem('admin_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Carregar histórico de conversas
    const savedHistory = localStorage.getItem('chat_history');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setChatHistory(history);
      
      // Calcular estatísticas
      const today = new Date().toDateString();
      const todayChats = history.filter((msg: ChatMessage) => 
        new Date(msg.timestamp).toDateString() === today
      );
      
      setStats(prev => ({
        ...prev,
        totalConversations: history.length,
        todayConversations: todayChats.length
      }));
    }
    
    setIsLoading(false);
  };

  // Salvar configurações
  const handleSaveSettings = () => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    toast.success("Configurações salvas com sucesso!");
  };

  // Limpar histórico
  const handleClearHistory = () => {
    localStorage.removeItem('chat_history');
    setChatHistory([]);
    setStats(prev => ({
      ...prev,
      totalConversations: 0,
      todayConversations: 0
    }));
    toast.success("Histórico limpo com sucesso!");
  };

  // Exportar dados
  const handleExportData = () => {
    const data = {
      settings,
      chatHistory,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imperio-pharma-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Dados exportados com sucesso!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pharma-light to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pharma-navy to-pharma-blue rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-pharma-navy">
              Painel Administrativo
            </CardTitle>
            <CardDescription>
              Império Pharma - Acesso Restrito
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha de Acesso</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg">
              <Shield className="w-4 h-4 mr-2" />
              Entrar no Painel
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Senha padrão: admin123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-pharma-navy/5 to-pharma-blue/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pharma-navy to-pharma-blue rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-pharma-navy">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-muted-foreground">
                  Império Pharma - Assistente IA
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                Voltar ao Site
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-pharma-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Total de Conversas</p>
                  <p className="text-2xl font-bold text-pharma-navy">{stats.totalConversations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Hoje</p>
                  <p className="text-2xl font-bold text-green-600">{stats.todayConversations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.avgResponseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.successRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Configurações do Assistente IA</span>
                </CardTitle>
                <CardDescription>
                  Configure o comportamento e as instruções do assistente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemPrompt">Prompt do Sistema</Label>
                  <Textarea
                    id="systemPrompt"
                    placeholder="Instruções para o assistente..."
                    value={settings.systemPrompt}
                    onChange={(e) => setSettings(prev => ({ ...prev, systemPrompt: e.target.value }))}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Chave da API Gemini</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={settings.apiKey}
                      onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Máximo de Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={settings.temperature}
                      onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Salvar Configurações</span>
                  </Button>
                  <Button variant="outline" onClick={loadData}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recarregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>Histórico de Conversas</span>
                    </CardTitle>
                    <CardDescription>
                      Todas as interações com o assistente IA
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      Exportar Dados
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleClearHistory}>
                      Limpar Histórico
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma conversa registrada ainda</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((message, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {message.role === 'user' ? (
                                <User className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Bot className="w-4 h-4 text-green-600" />
                              )}
                              <Badge variant={message.role === 'user' ? 'default' : 'secondary'}>
                                {message.role === 'user' ? 'Usuário' : 'Assistente'}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          
                          {message.userProfile && (
                            <div className="mb-2 p-2 bg-muted rounded text-xs">
                              <strong>Perfil:</strong> {message.userProfile.gender} | 
                              <strong> Objetivo:</strong> {message.userProfile.objective} | 
                              <strong> Preferência:</strong> {message.userProfile.preference}
                            </div>
                          )}
                          
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Analytics e Relatórios</span>
                </CardTitle>
                <CardDescription>
                  Métricas de uso e performance do assistente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics em desenvolvimento</p>
                  <p className="text-xs">Gráficos e relatórios detalhados serão adicionados em breve</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}