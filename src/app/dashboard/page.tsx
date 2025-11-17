'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Eye,
  ThumbsUp,
  Share2,
  BarChart3
} from 'lucide-react';
import type { ContentAnalysis, ViralityScore } from '@/lib/types';

// Mock data
const mockAnalyses: ContentAnalysis[] = [
  {
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
      'Tema relevante e atual'
    ],
    weaknesses: [
      'Duração um pouco longa (3min)',
      'Falta de call-to-action no final'
    ],
    suggestions: [
      'Reduza para 90 segundos para melhor retenção',
      'Adicione "Salve este vídeo!" no final',
      'Use hashtags: #receitasrapidas #cozinhafacil'
    ],
    status: 'completed'
  },
  {
    id: '2',
    title: 'Post motivacional',
    type: 'post',
    uploadDate: new Date('2024-01-14'),
    viralityScore: {
      overall: 72,
      engagement: 78,
      originality: 65,
      relevance: 75,
      technicalQuality: 70
    },
    strengths: [
      'Mensagem inspiradora',
      'Boa formatação de texto'
    ],
    weaknesses: [
      'Imagem genérica',
      'Falta de originalidade no tema',
      'Legenda muito longa'
    ],
    suggestions: [
      'Use uma imagem mais autêntica e pessoal',
      'Reduza a legenda para 2-3 parágrafos',
      'Adicione uma pergunta para engajar comentários'
    ],
    status: 'completed'
  },
  {
    id: '3',
    title: 'Story de bastidores',
    type: 'story',
    uploadDate: new Date('2024-01-16'),
    viralityScore: {
      overall: 0,
      engagement: 0,
      originality: 0,
      relevance: 0,
      technicalQuality: 0
    },
    strengths: [],
    weaknesses: [],
    suggestions: [],
    status: 'analyzing'
  }
];

export default function Dashboard() {
  const [analyses] = useState<ContentAnalysis[]>(mockAnalyses);
  const [selectedAnalysis, setSelectedAnalysis] = useState<ContentAnalysis | null>(analyses[0]);

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Acompanhe suas análises e melhore seu conteúdo
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2">
                <Upload className="w-4 h-4" />
                Nova análise
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total de análises
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analyses.length}
                    </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Pontuação média
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      79.5
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Melhor score
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      87
                    </p>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Plano atual
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Pro
                    </p>
                  </div>
                  <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                    <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analysis List */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Suas análises
                </h2>
                <div className="space-y-3">
                  {analyses.map((analysis) => (
                    <button
                      key={analysis.id}
                      onClick={() => setSelectedAnalysis(analysis)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedAnalysis?.id === analysis.id
                          ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500'
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {analysis.title}
                        </h3>
                        {analysis.status === 'analyzing' ? (
                          <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
                        ) : analysis.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {analysis.type}
                        </Badge>
                        {analysis.status === 'completed' && (
                          <span className={`text-lg font-bold ${getScoreColor(analysis.viralityScore.overall)}`}>
                            {analysis.viralityScore.overall}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Analysis Details */}
            <div className="lg:col-span-2">
              {selectedAnalysis ? (
                <div className="space-y-6">
                  {selectedAnalysis.status === 'analyzing' ? (
                    <Card className="p-8 text-center">
                      <Clock className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-spin" />
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        Analisando seu conteúdo...
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Nossa IA está avaliando todos os aspectos. Isso leva cerca de 30 segundos.
                      </p>
                    </Card>
                  ) : (
                    <>
                      {/* Score Card */}
                      <Card className={`p-6 bg-gradient-to-r ${getScoreBgColor(selectedAnalysis.viralityScore.overall)} text-white`}>
                        <div className="text-center mb-6">
                          <div className="text-6xl font-bold mb-2">
                            {selectedAnalysis.viralityScore.overall}
                          </div>
                          <div className="text-xl opacity-90">
                            Pontuação de Viralidade
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Engajamento</span>
                              <span className="font-bold">{selectedAnalysis.viralityScore.engagement}/100</span>
                            </div>
                            <Progress value={selectedAnalysis.viralityScore.engagement} className="h-2 bg-white/20" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Originalidade</span>
                              <span className="font-bold">{selectedAnalysis.viralityScore.originality}/100</span>
                            </div>
                            <Progress value={selectedAnalysis.viralityScore.originality} className="h-2 bg-white/20" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Relevância</span>
                              <span className="font-bold">{selectedAnalysis.viralityScore.relevance}/100</span>
                            </div>
                            <Progress value={selectedAnalysis.viralityScore.relevance} className="h-2 bg-white/20" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Qualidade</span>
                              <span className="font-bold">{selectedAnalysis.viralityScore.technicalQuality}/100</span>
                            </div>
                            <Progress value={selectedAnalysis.viralityScore.technicalQuality} className="h-2 bg-white/20" />
                          </div>
                        </div>
                      </Card>

                      {/* Strengths */}
                      <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Pontos fortes
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {selectedAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      {/* Weaknesses */}
                      <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingDown className="w-5 h-5 text-red-600" />
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Pontos de melhoria
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {selectedAnalysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      {/* Suggestions */}
                      <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Sugestões de melhoria
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {selectedAnalysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1 gap-2" variant="outline">
                          <Eye className="w-4 h-4" />
                          Ver inspirações
                        </Button>
                        <Button className="flex-1 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                          <Sparkles className="w-4 h-4" />
                          Editar com IA
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Nenhuma análise selecionada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Selecione uma análise da lista ou faça upload de novo conteúdo
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
