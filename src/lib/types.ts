// Tipos do TrendSpark

export type PlanType = 'free' | 'pro' | 'premium';

export interface Plan {
  id: PlanType;
  name: string;
  price: string;
  priceValue: number;
  features: string[];
  popular?: boolean;
}

export interface ViralityScore {
  overall: number;
  engagement: number;
  originality: number;
  relevance: number;
  technicalQuality: number;
}

export interface ContentAnalysis {
  id: string;
  title: string;
  type: 'video' | 'post' | 'story';
  uploadDate: Date;
  viralityScore: ViralityScore;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  status: 'analyzing' | 'completed' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  joinDate: Date;
  analysisCount: number;
  status: 'active' | 'suspended';
}

export interface AdminStats {
  totalUsers: number;
  freeUsers: number;
  proUsers: number;
  premiumUsers: number;
  totalAnalyses: number;
  conversionRate: number;
  dailyAnalyses: number[];
}
