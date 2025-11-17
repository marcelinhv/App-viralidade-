'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  TrendingUp, 
  BarChart3,
  DollarSign,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Download,
  Settings,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import type { User, AdminStats } from '@/lib/types';

// Mock data
const mockStats: AdminStats = {
  totalUsers: 1247,
  freeUsers: 892,
  proUsers: 284,
  premiumUsers: 71,
  totalAnalyses: 8934,
  conversionRate: 28.5,
  dailyAnalyses: [120, 145, 132, 178, 165, 189, 201]
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    plan: 'premium',
    joinDate: new Date('2024-01-10'),
    analysisCount: 45,
    status: 'active'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    plan: 'pro',
    joinDate: new Date('2024-01-12'),
    analysisCount: 28,
    status: 'active'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    plan: 'free',
    joinDate: new Date('2024-01-15'),
    analysisCount: 5,
    status: 'active'
  },
  {
    id: '4',
    name: 'João Pereira',
    email: 'joao.pereira@email.com',
    plan: 'pro',
    joinDate: new Date('2024-01-08'),
    analysisCount: 32,
    status: 'suspended'
  },
  {
    id: '5',
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    plan: 'premium',
    joinDate: new Date('2024-01-05'),
    analysisCount: 67,
    status: 'active'
  }
];

export default function Admin() {
  const [stats] = useState<AdminStats>(mockStats);
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = () => {
    // Criar CSV dos dados dos usuários
    const headers = ['Nome', 'Email', 'Plano', 'Análises', 'Status', 'Data de Cadastro'];
    const csvData = users.map(user => [
      user.name,
      user.email,
      user.plan,
      user.analysisCount.toString(),
      user.status,
      user.joinDate.toLocaleDateString('pt-BR')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Criar blob e fazer download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'pro':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Painel Administrativo
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Gerencie usuários, conteúdo e configurações do sistema
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={handleExport}>
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Settings className="w-4 h-4" />
                  Configurações
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total de usuários
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers}
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Análises totais
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalAnalyses}
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Taxa de conversão
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.conversionRate}%
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                    <UserCheck className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Usuários pagantes
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.proUsers + stats.premiumUsers}
                </p>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Users by Plan */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Usuários por plano
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Free</span>
                      <span className="font-bold text-gray-900 dark:text-white">{stats.freeUsers}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gray-500 rounded-full h-3" 
                        style={{ width: `${(stats.freeUsers / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Pro Dicas</span>
                      <span className="font-bold text-gray-900 dark:text-white">{stats.proUsers}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-blue-500 rounded-full h-3" 
                        style={{ width: `${(stats.proUsers / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Premium</span>
                      <span className="font-bold text-gray-900 dark:text-white">{stats.premiumUsers}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-3" 
                        style={{ width: `${(stats.premiumUsers / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Daily Analyses */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Análises diárias (última semana)
                </h3>
                <div className="flex items-end justify-between h-40 gap-2">
                  {stats.dailyAnalyses.map((count, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(count / Math.max(...stats.dailyAnalyses)) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Users Management */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Gestão de usuários
              </h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Usuário
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Plano
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Análises
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPlanBadgeColor(user.plan)}>
                          {user.plan === 'premium' ? 'Premium' : user.plan === 'pro' ? 'Pro' : 'Free'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900 dark:text-white">
                          {user.analysisCount}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status === 'active' ? 'Ativo' : 'Suspenso'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1">
                            {user.status === 'active' ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Content Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Biblioteca de inspirações
                </h3>
                <Button size="sm" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Vídeos virais - Moda</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">24 itens</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-pink-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Posts - Humor</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">18 itens</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Stories - Tecnologia</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">31 itens</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Configurações de planos
                </h3>
                <Button size="sm" variant="outline">
                  Editar preços
                </Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Free</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">R$ 0</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    5 análises/mês • Pontuação básica
                  </p>
                </div>

                <div className="p-4 border-2 border-blue-500 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Pro Dicas</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">R$ 9,90</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ilimitado • Sugestões detalhadas
                  </p>
                </div>

                <div className="p-4 border-2 border-purple-500 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">Premium</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">R$ 19,90</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tudo • Inspirações • Edição com IA
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
