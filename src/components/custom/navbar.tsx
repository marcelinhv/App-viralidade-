'use client';

import Link from 'next/link';
import { Sparkles, LayoutDashboard, Shield, DollarSign, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TrendSpark
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/adicionar-video">
              <Button variant="ghost" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Adicionar</span>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Planos</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
