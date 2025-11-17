'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Sparkles, Zap, Crown } from 'lucide-react';
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
      'Relatório básico',
      'Suporte por e-mail'
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
      'Estimativas de performance',
      'Melhor horário para postar',
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
      'Sugestões de cortes e transições',
      'Análise de concorrentes',
      'Relatórios exportáveis em PDF',
      'Suporte VIP 24/7'
    ]
  }
];

const faqs = [
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Seu plano continuará ativo até o final do período pago.'
  },
  {
    question: 'Como funciona o período de teste?',
    answer: 'Oferecemos 7 dias de teste grátis para os planos Pro e Premium. Você pode cancelar antes do fim do período sem ser cobrado.'
  },
  {
    question: 'Posso mudar de plano depois?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartão de crédito, débito, PIX e boleto bancário. Todos os pagamentos são processados de forma segura.'
  },
  {
    question: 'A IA realmente funciona?',
    answer: 'Sim! Nossa IA é treinada com milhões de vídeos virais e tem precisão de 87% nas previsões de viralidade. Melhoramos constantemente o algoritmo.'
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Sparkles className="w-6 h-6" />;
      case 'pro':
        return <Zap className="w-6 h-6" />;
      case 'premium':
        return <Crown className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              Planos e Preços
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Escolha o plano ideal
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                para você
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comece grátis e evolua conforme suas necessidades. Todos os planos incluem 7 dias de teste.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-gray-700 shadow-md text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-gray-700 shadow-md text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Anual
                <Badge className="ml-2 bg-green-500 text-white">-20%</Badge>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-8 hover:shadow-2xl transition-all duration-300 relative ${
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
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${
                    plan.id === 'premium' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : plan.id === 'pro'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {getPlanIcon(plan.id)}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-1">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {billingCycle === 'yearly' && plan.priceValue > 0
                        ? `R$ ${(plan.priceValue * 0.8 * 12).toFixed(2)}`
                        : plan.price
                      }
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.priceValue > 0 && (
                      billingCycle === 'yearly' ? 'por ano' : 'por mês'
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    alert(`Assinatura do plano ${plan.name} em desenvolvimento`);
                  }}
                >
                  {plan.priceValue === 0 ? 'Começar grátis' : 'Assinar agora'}
                </Button>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Compare os recursos
            </h2>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-900 dark:text-white font-semibold">
                        Recurso
                      </th>
                      <th className="text-center py-4 px-6 text-gray-900 dark:text-white font-semibold">
                        Free
                      </th>
                      <th className="text-center py-4 px-6 text-gray-900 dark:text-white font-semibold">
                        Pro
                      </th>
                      <th className="text-center py-4 px-6 text-gray-900 dark:text-white font-semibold">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">Análises mensais</td>
                      <td className="text-center py-4 px-6 text-gray-600 dark:text-gray-400">5</td>
                      <td className="text-center py-4 px-6 text-gray-600 dark:text-gray-400">Ilimitado</td>
                      <td className="text-center py-4 px-6 text-gray-600 dark:text-gray-400">Ilimitado</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">Pontuação de viralidade</td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">Sugestões detalhadas</td>
                      <td className="text-center py-4 px-6 text-gray-400">-</td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">Biblioteca de inspirações</td>
                      <td className="text-center py-4 px-6 text-gray-400">-</td>
                      <td className="text-center py-4 px-6 text-gray-400">-</td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">Edição com IA</td>
                      <td className="text-center py-4 px-6 text-gray-400">-</td>
                      <td className="text-center py-4 px-6 text-gray-400">-</td>
                      <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Perguntas frequentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
