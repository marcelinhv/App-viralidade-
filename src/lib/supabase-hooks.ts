'use client';

import { useEffect, useState } from 'react';
import { supabase, type Video, type User, type Inspiration } from '@/lib/supabase';

// Hook para buscar vídeos do usuário
export function useVideos(userId?: string) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setVideos(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar vídeos');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [userId]);

  return { videos, loading, error };
}

// Hook para buscar inspirações
export function useInspirations(category?: string) {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInspirations() {
      try {
        let query = supabase
          .from('inspirations')
          .select('*')
          .order('views', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        setInspirations(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar inspirações');
      } finally {
        setLoading(false);
      }
    }

    fetchInspirations();
  }, [category]);

  return { inspirations, loading, error };
}

// Hook para buscar usuários (admin)
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}

// Função para adicionar vídeo
export async function addVideo(video: Omit<Video, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('videos')
      .insert([video])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'Erro ao adicionar vídeo' 
    };
  }
}

// Função para atualizar usuário
export async function updateUser(userId: string, updates: Partial<User>) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'Erro ao atualizar usuário' 
    };
  }
}

// Função para adicionar inspiração (admin)
export async function addInspiration(inspiration: Omit<Inspiration, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('inspirations')
      .insert([inspiration])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'Erro ao adicionar inspiração' 
    };
  }
}

// Função para deletar vídeo
export async function deleteVideo(videoId: string) {
  try {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', videoId);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    return { 
      error: err instanceof Error ? err.message : 'Erro ao deletar vídeo' 
    };
  }
}

// Função para buscar estatísticas (admin)
export async function getStats() {
  try {
    const [usersResult, videosResult, inspirationsResult] = await Promise.all([
      supabase.from('users').select('plan', { count: 'exact' }),
      supabase.from('videos').select('id', { count: 'exact' }),
      supabase.from('inspirations').select('id', { count: 'exact' })
    ]);

    const usersByPlan = {
      free: 0,
      pro: 0,
      premium: 0
    };

    if (usersResult.data) {
      usersResult.data.forEach((user: { plan: string }) => {
        if (user.plan in usersByPlan) {
          usersByPlan[user.plan as keyof typeof usersByPlan]++;
        }
      });
    }

    return {
      totalUsers: usersResult.count || 0,
      totalVideos: videosResult.count || 0,
      totalInspirations: inspirationsResult.count || 0,
      usersByPlan,
      error: null
    };
  } catch (err) {
    return {
      totalUsers: 0,
      totalVideos: 0,
      totalInspirations: 0,
      usersByPlan: { free: 0, pro: 0, premium: 0 },
      error: err instanceof Error ? err.message : 'Erro ao carregar estatísticas'
    };
  }
}
