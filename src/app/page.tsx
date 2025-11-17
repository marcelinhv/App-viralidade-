'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Target, 
  Upload,
  Check,
  Star,
  BarChart3,
  Lightbulb,
  Wand2
} from 'lucide-react';
import type { Plan } from '@/lib/types';

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 'R$ 0',
    priceValue: 0,
    features: [
      'Análise básica de viralidade',
      'Pontuação simples (0-100)',
      '5 análises por mês',
      'Relatório básico'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Dicas',
    price: 'R$ 9,90',
    priceValue: 9.90,
    popular: true,
    features: [
      'Tudo do Free',
      'Análises ilimitadas',
      'Sugestões detalhadas de melhorias',
      'Orientações sobre legendas e hashtags',
      'Análise de estilo e duração',
      'Suporte prioritário'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Inspirações + IA',
    price: 'R$ 19,90',
    priceValue: 19.90,
    features: [
      'Tudo do Pro Dicas',
      'Inspirações de vídeos virais',
      'Biblioteca de imagens de referência',
      'Ferramentas de edição com IA',
      'Ajuste automático de cores e áudio',
      'Geração de legendas com IA',
      'Sugestões de cortes e transições'
    ]
  }
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Análise com Inteligência Artificial
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Descubra o potencial viral
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              do seu conteúdo
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            IA avançada analisa seus vídeos, posts e stories para prever viralidade 
            e fornecer insights práticos para aumentar seu engajamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2 text-lg px-8"
            >
              <Upload className="w-5 h-5" />
              Analisar agora grátis
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
              <BarChart3 className="w-5 h-5" />
              Ver exemplo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Como funciona
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                1. Faça upload
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Envie seu vídeo, post ou story. Suportamos todos os formatos populares.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                2. IA analisa
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nossa IA avalia engajamento, originalidade, relevância e qualidade técnica.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                3. Receba insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Obtenha pontuação de viralidade e sugestões práticas para melhorar.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Recursos poderosos
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Tudo que você precisa para viralizar
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Pontuação de viralidade
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Score de 0 a 100 baseado em métricas comprovadas de engajamento.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Feedback personalizado
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Identifica pontos fortes e fracos com sugestões práticas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Ferramentas de edição com IA
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ajustes automáticos de cores, áudio e sugestões de cortes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">87</div>
                <div className="text-xl mb-6 opacity-90">Pontuação de Viralidade</div>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span>Engajamento</span>
                    <span className="font-bold">92/100</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '92%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Originalidade</span>
                    <span className="font-bold">85/100</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Relevância</span>
                    <span className="font-bold">88/100</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Escolha seu plano
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comece grátis e evolua conforme suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-6 hover:shadow-2xl transition-all duration-300 relative ${
                  plan.popular 
                    ? 'border-2 border-purple-500 scale-105' 
                    : 'border-2 hover:border-purple-300'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Mais popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white">
                    {plan.price}
                  </div>
                  {plan.priceValue > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      por mês
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.priceValue === 0 ? 'Começar grátis' : 'Assinar agora'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Pronto para viralizar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de criadores que já aumentaram seu engajamento
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 gap-2 text-lg px-8"
            >
              <Sparkles className="w-5 h-5" />
              Começar agora grátis
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-xl font-bold">TrendSpark</span>
          </div>
          <p className="text-gray-400">
            © 2024 TrendSpark. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
