import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type User = {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'premium';
  created_at: string;
  status: 'active' | 'suspended';
};

export type Video = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  thumbnail_url?: string;
  virality_score: number;
  analysis: {
    visual_quality: number;
    originality: number;
    relevance: number;
    engagement_potential: number;
  };
  recommendations: string[];
  created_at: string;
};

export type Inspiration = {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
  category: string;
  views: number;
  engagement_rate: number;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan: 'free' | 'pro' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  started_at: string;
  expires_at?: string;
};
