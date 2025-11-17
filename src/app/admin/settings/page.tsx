'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  DollarSign,
  Sliders,
  Bell,
  Save,
  ArrowLeft,
  Zap,
  Target,
  Hash,
  Eye,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSettings() {
  const [freePlanPrice, setFreePlanPrice] = useState('0');
  const [proPlanPrice, setProPlanPrice] = useState('9.90');
  const [premiumPlanPrice, setPremiumPlanPrice] = useState('19.90');
  
  const [aiWeights, setAiWeights] = useState({
    engagement: 30,
    originality: 25,
    relevance: 25,
    technicalQuality: 20
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState('50');
  const [promoDuration, setPromoDuration] = useState('30');

  const handleSaveSettings = () => {
    alert('Configurações salvas com sucesso!');
  };

  const handleCreatePromo = () => {
    if (!promoCode) {
      alert('Digite um código promocional');
      return;
    }
    alert(`Campanha "${promoCode}" criada com ${promoDiscount}% de desconto por ${promoDuration} dias!`);
    setPromoCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Dashboard
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Configurações do Sistema
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie preços, parâmetros da IA e campanhas promocionais
            </p>
          </div>

          {/* Pricing Settings */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Preços dos Planos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="free-price">Plano Free</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
                    R$
                  </span>
                  <Input
                    id="free-price"
                    type="number"
                    value={freePlanPrice}
                    onChange={(e) => setFreePlanPrice(e.target.value)}
                    className="pl-10"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Plano gratuito (não editável)
                </p>
              </div>

              <div>
                <Label htmlFor="pro-price">Plano Pro Dicas</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
                    R$
                  </span>
                  <Input
                    id="pro-price"
                    type="number"
                    step="0.01"
                    value={proPlanPrice}
                    onChange={(e) => setProPlanPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Preço mensal
                </p>
              </div>

              <div>
                <Label htmlFor="premium-price">Plano Premium</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
                    R$
                  </span>
                  <Input
                    id="premium-price"
                    type="number"
                    step="0.01"
                    value={premiumPlanPrice}
                    onChange={(e) => setPremiumPlanPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Preço mensal
                </p>
              </div>
            </div>
          </Card>

          {/* AI Parameters */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Parâmetros da IA
              </h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Ajuste o peso de cada métrica na pontuação final de viralidade (total deve ser 100%)
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <Label>Engajamento</Label>
                  </div>
                  <Badge>{aiWeights.engagement}%</Badge>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiWeights.engagement}
                  onChange={(e) => setAiWeights({...aiWeights, engagement: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Peso para curtidas, comentários e compartilhamentos
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <Label>Originalidade</Label>
                  </div>
                  <Badge>{aiWeights.originality}%</Badge>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiWeights.originality}
                  onChange={(e) => setAiWeights({...aiWeights, originality: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Peso para criatividade e inovação do conteúdo
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <Label>Relevância</Label>
                  </div>
                  <Badge>{aiWeights.relevance}%</Badge>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiWeights.relevance}
                  onChange={(e) => setAiWeights({...aiWeights, relevance: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Peso para tendências atuais e timing
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-green-600" />
                    <Label>Qualidade Técnica</Label>
                  </div>
                  <Badge>{aiWeights.technicalQuality}%</Badge>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiWeights.technicalQuality}
                  onChange={(e) => setAiWeights({...aiWeights, technicalQuality: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Peso para qualidade visual, áudio e edição
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Total:
                  </span>
                  <Badge 
                    className={
                      aiWeights.engagement + aiWeights.originality + aiWeights.relevance + aiWeights.technicalQuality === 100
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }
                  >
                    {aiWeights.engagement + aiWeights.originality + aiWeights.relevance + aiWeights.technicalQuality}%
                  </Badge>
                </div>
                {aiWeights.engagement + aiWeights.originality + aiWeights.relevance + aiWeights.technicalQuality !== 100 && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ O total deve ser exatamente 100%
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Promotional Campaigns */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-pink-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Campanhas Promocionais
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="promo-code">Código promocional</Label>
                  <div className="relative mt-1">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="promo-code"
                      placeholder="PROMO2024"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="promo-discount">Desconto (%)</Label>
                  <Input
                    id="promo-discount"
                    type="number"
                    min="1"
                    max="100"
                    value={promoDiscount}
                    onChange={(e) => setPromoDiscount(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="promo-duration">Duração (dias)</Label>
                  <Input
                    id="promo-duration"
                    type="number"
                    min="1"
                    value={promoDuration}
                    onChange={(e) => setPromoDuration(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button 
                className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={handleCreatePromo}
              >
                <Bell className="w-4 h-4" />
                Criar campanha promocional
              </Button>

              {/* Active Promos */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Campanhas ativas
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        WELCOME50
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        50% de desconto • Expira em 15 dias
                      </p>
                    </div>
                    <Badge className="bg-green-500 text-white">Ativa</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        PREMIUM20
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        20% de desconto • Expira em 7 dias
                      </p>
                    </div>
                    <Badge className="bg-blue-500 text-white">Ativa</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              size="lg"
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={handleSaveSettings}
            >
              <Save className="w-4 h-4" />
              Salvar todas as configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
