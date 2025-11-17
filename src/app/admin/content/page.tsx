'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Image as ImageIcon,
  Video,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Upload,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

type ContentType = 'all' | 'video' | 'image';
type Niche = 'all' | 'moda' | 'humor' | 'tecnologia' | 'musica' | 'culinaria' | 'fitness';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'image';
  niche: string;
  views: number;
  engagement: number;
  uploadDate: Date;
  thumbnail: string;
  status: 'active' | 'inactive';
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Tutorial de maquiagem rápida',
    type: 'video',
    niche: 'moda',
    views: 2300000,
    engagement: 12.5,
    uploadDate: new Date('2024-01-10'),
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    status: 'active'
  },
  {
    id: '2',
    title: 'Meme do momento - Reação',
    type: 'video',
    niche: 'humor',
    views: 5100000,
    engagement: 18.2,
    uploadDate: new Date('2024-01-12'),
    thumbnail: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400&h=300&fit=crop',
    status: 'active'
  },
  {
    id: '3',
    title: 'Review do novo iPhone',
    type: 'video',
    niche: 'tecnologia',
    views: 1800000,
    engagement: 9.8,
    uploadDate: new Date('2024-01-08'),
    thumbnail: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
    status: 'active'
  },
  {
    id: '4',
    title: 'Receita em 60 segundos',
    type: 'video',
    niche: 'culinaria',
    views: 3200000,
    engagement: 15.3,
    uploadDate: new Date('2024-01-15'),
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    status: 'active'
  },
  {
    id: '5',
    title: 'Treino de 5 minutos',
    type: 'image',
    niche: 'fitness',
    views: 1500000,
    engagement: 11.2,
    uploadDate: new Date('2024-01-11'),
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c1f69419868d?w=400&h=300&fit=crop',
    status: 'active'
  },
  {
    id: '6',
    title: 'Cover viral da música',
    type: 'video',
    niche: 'musica',
    views: 4700000,
    engagement: 16.8,
    uploadDate: new Date('2024-01-09'),
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    status: 'inactive'
  }
];

export default function AdminContent() {
  const [content] = useState<ContentItem[]>(mockContent);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ContentType>('all');
  const [selectedNiche, setSelectedNiche] = useState<Niche>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesNiche = selectedNiche === 'all' || item.niche === selectedNiche;
    return matchesSearch && matchesType && matchesNiche;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Gestão de Conteúdo
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Gerencie a biblioteca de inspirações e conteúdos virais
                </p>
              </div>
              <Button 
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setShowUploadModal(true)}
              >
                <Plus className="w-4 h-4" />
                Adicionar conteúdo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total de itens
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {content.length}
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Vídeos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {content.filter(c => c.type === 'video').length}
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Imagens
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {content.filter(c => c.type === 'image').length}
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Ativos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {content.filter(c => c.status === 'active').length}
              </p>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as ContentType)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="video">Vídeos</option>
                  <option value="image">Imagens</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value as Niche)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos os nichos</option>
                  <option value="moda">Moda</option>
                  <option value="humor">Humor</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="musica">Música</option>
                  <option value="culinaria">Culinária</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-800">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Type Badge */}
                  <Badge className="absolute top-2 left-2 bg-black/60 text-white">
                    {item.type === 'video' ? (
                      <><Video className="w-3 h-3 mr-1" /> Vídeo</>
                    ) : (
                      <><ImageIcon className="w-3 h-3 mr-1" /> Imagem</>
                    )}
                  </Badge>

                  {/* Status Badge */}
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      item.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {item.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{item.niche}</Badge>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.uploadDate.toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(item.views)}</span>
                    </div>
                    <div>
                      <span>{item.engagement}% eng.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Eye className="w-3 h-3" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Edit className="w-3 h-3" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <Card className="p-12 text-center">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Nenhum conteúdo encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tente ajustar os filtros ou adicione novo conteúdo
              </p>
              <Button 
                className="gap-2"
                onClick={() => setShowUploadModal(true)}
              >
                <Plus className="w-4 h-4" />
                Adicionar conteúdo
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Upload Modal (Simplified) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Adicionar novo conteúdo
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Digite o título" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="type">Tipo</Label>
                <select
                  id="type"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-1"
                >
                  <option value="video">Vídeo</option>
                  <option value="image">Imagem</option>
                </select>
              </div>

              <div>
                <Label htmlFor="niche">Nicho</Label>
                <select
                  id="niche"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-1"
                >
                  <option value="moda">Moda</option>
                  <option value="humor">Humor</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="musica">Música</option>
                  <option value="culinaria">Culinária</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>

              <div>
                <Label>Arquivo</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Clique ou arraste o arquivo aqui
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => {
                    alert('Upload em desenvolvimento');
                    setShowUploadModal(false);
                  }}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
