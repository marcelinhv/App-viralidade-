'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, Video, Sparkles, TrendingUp } from 'lucide-react';
import { addVideo } from '@/lib/supabase-hooks';
import { Navbar } from '@/components/custom/navbar';

export default function AddVideo() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Simular análise de IA
  const analyzeVideo = () => {
    return {
      visual_quality: Math.floor(Math.random() * 30) + 70,
      originality: Math.floor(Math.random() * 30) + 70,
      relevance: Math.floor(Math.random() * 30) + 70,
      engagement_potential: Math.floor(Math.random() * 30) + 70,
    };
  };

  const generateRecommendations = (analysis: any) => {
    const recommendations = [];
    
    if (analysis.visual_quality < 80) {
      recommendations.push('Melhore a iluminação e qualidade da câmera');
    }
    if (analysis.originality < 80) {
      recommendations.push('Adicione elementos únicos ao seu conteúdo');
    }
    if (analysis.relevance < 80) {
      recommendations.push('Use hashtags mais específicas do seu nicho');
    }
    if (analysis.engagement_potential < 80) {
      recommendations.push('Adicione uma call-to-action no início do vídeo');
    }

    if (recommendations.length === 0) {
      recommendations.push('Excelente! Continue com esse padrão de qualidade');
    }

    return recommendations;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simular análise
      const analysis = analyzeVideo();
      const recommendations = generateRecommendations(analysis);
      const viralityScore = Math.floor(
        (analysis.visual_quality + 
         analysis.originality + 
         analysis.relevance + 
         analysis.engagement_potential) / 4
      );

      // Adicionar ao Supabase
      const { data, error: supabaseError } = await addVideo({
        user_id: '00000000-0000-0000-0000-000000000000', // Substituir com ID real do usuário autenticado
        title,
        url,
        thumbnail_url: thumbnailUrl || undefined,
        virality_score: viralityScore,
        analysis,
        recommendations,
      });

      if (supabaseError) {
        throw new Error(supabaseError);
      }

      setSuccess(true);
      setTitle('');
      setUrl('');
      setThumbnailUrl('');

      // Redirecionar para análise após 2 segundos
      setTimeout(() => {
        window.location.href = '/analise';
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar vídeo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Adicionar Vídeo
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Faça upload do seu vídeo e receba análise completa de viralidade
            </p>
          </div>

          {/* Formulário */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título do Vídeo
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Dança viral do momento"
                  required
                  className="w-full"
                />
              </div>

              {/* URL do Vídeo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL do Vídeo
                </label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Suporta: YouTube, TikTok, Instagram, etc.
                </p>
              </div>

              {/* URL da Thumbnail (opcional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL da Thumbnail (opcional)
                </label>
                <Input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full"
                />
              </div>

              {/* Mensagens */}
              {success && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                    ✅ Vídeo adicionado com sucesso! Redirecionando para análise...
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                    ❌ {error}
                  </p>
                  <p className="text-red-600 dark:text-red-300 text-xs mt-1">
                    Dica: Conecte sua conta Supabase nas Configurações do Projeto
                  </p>
                </div>
              )}

              {/* Botão Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Analisar Vídeo
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="p-4 text-center">
              <Video className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold text-sm mb-1">Análise Instantânea</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                IA analisa em segundos
              </p>
            </Card>

            <Card className="p-4 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-pink-600" />
              <h3 className="font-semibold text-sm mb-1">Score de Viralidade</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Nota de 0 a 100
              </p>
            </Card>

            <Card className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold text-sm mb-1">Recomendações</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Dicas para melhorar
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
