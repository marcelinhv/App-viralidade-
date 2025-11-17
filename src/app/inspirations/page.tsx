'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  Search,
  Heart,
  Eye,
  TrendingUp,
  Wand2,
  Filter,
  Play,
  Image as ImageIcon,
  Crown
} from 'lucide-react';

type Niche = 'all' | 'moda' | 'humor' | 'tecnologia' | 'musica' | 'culinaria' | 'fitness';

interface Inspiration {
  id: string;
  title: string;
  type: 'video' | 'image';
  niche: string;
  views: string;
  engagement: string;
  thumbnail: string;
  viralityScore: number;
}

const mockInspirations: Inspiration[] = [
  {
    id: '1',
    title: 'Tutorial de maquiagem rápida',
    type: 'video',
    niche: 'moda',
    views: '2.3M',
    engagement: '12.5%',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop',
    viralityScore: 94
  },
  {
    id: '2',
    title: 'Meme do momento - Reação',
    type: 'video',
    niche: 'humor',
    views: '5.1M',
    engagement: '18.2%',
    thumbnail: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400&h=600&fit=crop',
    viralityScore: 97
  },
  {
    id: '3',
    title: 'Review do novo iPhone',
    type: 'video',
    niche: 'tecnologia',
    views: '1.8M',
    engagement: '9.8%',
    thumbnail: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=600&fit=crop',
    viralityScore: 89
  },
  {
    id: '4',
    title: 'Receita em 60 segundos',
    type: 'video',
    niche: 'culinaria',
    views: '3.2M',
    engagement: '15.3%',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop',
    viralityScore: 92
  },
  {
    id: '5',
    title: 'Treino de 5 minutos',
    type: 'video',
    niche: 'fitness',
    views: '1.5M',
    engagement: '11.2%',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop',
    viralityScore: 88
  },
  {
    id: '6',
    title: 'Cover viral da música do momento',
    type: 'video',
    niche: 'musica',
    views: '4.7M',
    engagement: '16.8%',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=600&fit=crop',
    viralityScore: 95
  }
];

export default function Inspirations() {
  const [selectedNiche, setSelectedNiche] = useState<Niche>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const niches = [
    { id: 'all', label: 'Todos', icon: Sparkles },
    { id: 'moda', label: 'Moda', icon: Sparkles },
    { id: 'humor', label: 'Humor', icon: Sparkles },
    { id: 'tecnologia', label: 'Tecnologia', icon: Sparkles },
    { id: 'musica', label: 'Música', icon: Sparkles },
    { id: 'culinaria', label: 'Culinária', icon: Sparkles },
    { id: 'fitness', label: 'Fitness', icon: Sparkles }
  ];

  const filteredInspirations = mockInspirations.filter(item => {
    const matchesNiche = selectedNiche === 'all' || item.niche === selectedNiche;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesNiche && matchesSearch;
  });

  const toggleSave = (id: string) => {
    setSavedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-purple-600" />
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Premium
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Inspirações Virais
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore conteúdos virais similares ao seu nicho e adapte para seu estilo
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar inspirações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {niches.map((niche) => (
                <Button
                  key={niche.id}
                  variant={selectedNiche === niche.id ? 'default' : 'outline'}
                  onClick={() => setSelectedNiche(niche.id as Niche)}
                  className={selectedNiche === niche.id ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
                >
                  {niche.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total de inspirações
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filteredInspirations.length}
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Itens salvos
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {savedItems.length}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Score médio
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    92.5
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Inspirations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInspirations.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                {/* Thumbnail */}
                <div className="relative aspect-[9/16] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <Button 
                        className="w-full gap-2 bg-white text-gray-900 hover:bg-gray-100"
                        onClick={() => alert('Preview em desenvolvimento')}
                      >
                        <Play className="w-4 h-4" />
                        Ver preview
                      </Button>
                      <Button 
                        className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={() => alert('Edição com IA em desenvolvimento')}
                      >
                        <Wand2 className="w-4 h-4" />
                        Editar com IA
                      </Button>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <Badge className="absolute top-3 left-3 bg-black/60 text-white">
                    {item.type === 'video' ? (
                      <><Play className="w-3 h-3 mr-1" /> Vídeo</>
                    ) : (
                      <><ImageIcon className="w-3 h-3 mr-1" /> Imagem</>
                    )}
                  </Badge>

                  {/* Score Badge */}
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    {item.viralityScore}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => toggleSave(item.id)}
                      className="flex-shrink-0 ml-2"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-colors ${
                          savedItems.includes(item.id)
                            ? 'fill-pink-500 text-pink-500'
                            : 'text-gray-400 hover:text-pink-500'
                        }`}
                      />
                    </button>
                  </div>

                  <Badge variant="outline" className="mb-3">
                    {item.niche}
                  </Badge>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{item.engagement}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredInspirations.length === 0 && (
            <Card className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Nenhuma inspiração encontrada
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
