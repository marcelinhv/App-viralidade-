'use client';

import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Wand2,
  Eye,
  Download,
  Share2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AnalysisDetail() {
  // Mock data - em produção viria do banco de dados via params.id
  const analysis = {
    id: '1',
    title: 'Vídeo de receita rápida',
    type: 'video',
    uploadDate: new Date('2024-01-15'),
    viralityScore: {
      overall: 87,
      engagement: 92,
      originality: 85,
      relevance: 88,
      technicalQuality: 84
    },
    strengths: [
      'Conteúdo altamente engajador',
      'Qualidade visual excelente',
      'Tema relevante e atual',
      'Boa iluminação e enquadramento',
      'Ritmo adequado para retenção'
    ],
    weaknesses: [
      'Duração um pouco longa (3min)',
      'Falta de call-to-action no final',
      'Hashtags pouco específicas',
      'Áudio de fundo poderia ser mais envolvente'
    ],
    suggestions: [
      'Reduza a duração em 10 segundos',
      'Use hashtags mais específicas',
      'Adicione uma legenda mais chamativa',
      'Inclua call-to-action nos primeiros 3 segundos',
      'Adicione música de fundo mais energética',
      'Use transições mais dinâmicas entre cenas'
    ],
    metrics: {
      estimatedViews: '50k - 150k',
      estimatedEngagement: '8% - 12%',
      bestTimeToPost: 'Terça-feira, 19h-21h',
      targetAudience: 'Mulheres 25-35 anos, interessadas em culinária'
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Dashboard
              </Button>
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {analysis.title}
                </h1>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{analysis.type}</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {analysis.uploadDate.toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>

          {/* Main Score Card */}
          <Card className={`p-8 mb-6 bg-gradient-to-r ${getScoreBgColor(analysis.viralityScore.overall)} text-white`}>
            <div className="text-center mb-6">
              <div className="text-7xl font-bold mb-2">
                {analysis.viralityScore.overall}
              </div>
              <div className="text-2xl opacity-90 mb-4">
                Pontuação de Viralidade
              </div>
              <p className="text-lg opacity-80">
                Seu vídeo tem alto potencial em engajamento, mas pode melhorar em hashtags
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Engajamento</span>
                  <span className="font-bold">{analysis.viralityScore.engagement}/100</span>
                </div>
                <Progress value={analysis.viralityScore.engagement} className="h-2 bg-white/20" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Originalidade</span>
                  <span className="font-bold">{analysis.viralityScore.originality}/100</span>
                </div>
                <Progress value={analysis.viralityScore.originality} className="h-2 bg-white/20" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Relevância</span>
                  <span className="font-bold">{analysis.viralityScore.relevance}/100</span>
                </div>
                <Progress value={analysis.viralityScore.relevance} className="h-2 bg-white/20" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Qualidade</span>
                  <span className="font-bold">{analysis.viralityScore.technicalQuality}/100</span>
                </div>
                <Progress value={analysis.viralityScore.technicalQuality} className="h-2 bg-white/20" />
              </div>
            </div>
          </Card>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                Estimativas de Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Visualizações estimadas
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.metrics.estimatedViews}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Taxa de engajamento
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.metrics.estimatedEngagement}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                Recomendações de Publicação
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Melhor horário
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {analysis.metrics.bestTimeToPost}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Público-alvo
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {analysis.metrics.targetAudience}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Strengths */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Pontos fortes
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Weaknesses */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Pontos de melhoria
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggestions */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Sugestões de melhoria
              </h3>
            </div>
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow">
                  <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 flex-1">{suggestion}</span>
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="gap-2 h-12" variant="outline">
              <Eye className="w-4 h-4" />
              Ver inspirações similares
            </Button>
            <Button className="gap-2 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Wand2 className="w-4 h-4" />
              Aplicar dicas com IA
            </Button>
            <Button className="gap-2 h-12" variant="outline">
              <Download className="w-4 h-4" />
              Baixar relatório PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
