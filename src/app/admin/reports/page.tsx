'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Download,
  TrendingUp,
  Users,
  BarChart3,
  Calendar,
  ArrowLeft,
  FileSpreadsheet,
  Filter
} from 'lucide-react';
import Link from 'next/link';

type ReportType = 'users' | 'analyses' | 'revenue' | 'engagement';
type Period = '7days' | '30days' | '90days' | 'year';

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('users');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30days');

  const reports = [
    {
      id: 'users' as ReportType,
      title: 'Crescimento de Usuários',
      description: 'Novos cadastros, conversões e churn',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'analyses' as ReportType,
      title: 'Análises Realizadas',
      description: 'Volume de análises por período',
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 'revenue' as ReportType,
      title: 'Receita e Conversões',
      description: 'MRR, ARR e taxa de conversão',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'engagement' as ReportType,
      title: 'Engajamento Médio',
      description: 'Uso da plataforma e features',
      icon: FileText,
      color: 'pink'
    }
  ];

  const mockData = {
    users: {
      total: 1247,
      new: 89,
      growth: '+12.5%',
      conversions: 28.5,
      churn: 3.2
    },
    analyses: {
      total: 8934,
      daily: 298,
      growth: '+18.2%',
      avgScore: 79.5
    },
    revenue: {
      mrr: 'R$ 4.892,50',
      arr: 'R$ 58.710,00',
      growth: '+15.8%',
      conversionRate: 28.5
    },
    engagement: {
      avgAnalysesPerUser: 7.2,
      activeUsers: 892,
      retention: 87.3,
      avgSessionTime: '12min'
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
      green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
      pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    alert(`Exportando relatório em ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Dashboard
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Relatórios
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Estatísticas detalhadas e exportação de dados
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleExport('pdf')}
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => handleExport('excel')}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </Button>
              </div>
            </div>
          </div>

          {/* Period Filter */}
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Período
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: '7days', label: 'Últimos 7 dias' },
                { id: '30days', label: 'Últimos 30 dias' },
                { id: '90days', label: 'Últimos 90 dias' },
                { id: 'year', label: 'Último ano' }
              ].map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id as Period)}
                  className={selectedPeriod === period.id ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Report Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <Card
                  key={report.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedReport === report.id
                      ? 'border-2 border-purple-500'
                      : 'border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getColorClasses(report.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {report.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Report Content */}
          {selectedReport === 'users' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total de usuários
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {mockData.users.total}
                  </p>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {mockData.users.growth}
                  </Badge>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Novos usuários
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.users.new}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    neste período
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Taxa de conversão
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.users.conversions}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free → Pago
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Taxa de churn
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.users.churn}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    cancelamentos
                  </p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Crescimento de usuários (últimos 30 dias)
                </h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[42, 38, 45, 52, 48, 55, 61, 58, 64, 70, 67, 73, 78, 75, 82, 89].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(value / 89) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {selectedReport === 'analyses' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total de análises
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {mockData.analyses.total}
                  </p>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {mockData.analyses.growth}
                  </Badge>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Média diária
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.analyses.daily}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    análises/dia
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Score médio
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.analyses.avgScore}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    de viralidade
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Tipo mais popular
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    Vídeo
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    67% do total
                  </p>
                </Card>
              </div>
            </div>
          )}

          {selectedReport === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    MRR
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {mockData.revenue.mrr}
                  </p>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {mockData.revenue.growth}
                  </Badge>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    ARR
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.revenue.arr}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    receita anual
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Taxa de conversão
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.revenue.conversionRate}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free → Pago
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    LTV médio
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    R$ 287
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    por usuário
                  </p>
                </Card>
              </div>
            </div>
          )}

          {selectedReport === 'engagement' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Análises por usuário
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.engagement.avgAnalysesPerUser}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    média mensal
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Usuários ativos
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.engagement.activeUsers}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    últimos 30 dias
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Taxa de retenção
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.engagement.retention}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    retorno mensal
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Tempo médio
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockData.engagement.avgSessionTime}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    por sessão
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
