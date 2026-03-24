/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Calendar,
  Star,
  Menu,
  ArrowRight,
  Smartphone,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { View } from './types';

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-10"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-black italic tracking-tighter mb-12 text-center"
      >
        NIYA DIGITAL<span className="text-rose-accent">.</span>
      </motion.div>
      
      <div className="w-full max-w-xs bg-white/10 h-1 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="h-full bg-rose-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-rose-accent font-mono text-sm tabular-nums">
        {progress}%
      </div>
    </motion.div>
  );
};

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md glass rounded-full px-6 py-3 flex justify-center items-center">
      <button onClick={() => setView('home')} className={`p-2 rounded-full transition-colors ${currentView === 'home' ? 'text-rose-accent' : 'text-gray-400'}`}>
        <Home size={24} />
      </button>
    </nav>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
  const base = "px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-rose-accent text-white hover:bg-rose-dark shadow-[0_0_15px_rgba(255,45,85,0.3)]",
    secondary: "glass text-white border-white/10 hover:bg-white/10",
    outline: "border-2 border-rose-accent text-rose-accent hover:bg-rose-accent/10",
    ghost: "text-gray-400 hover:text-white"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

const GlassCard = ({ children, className = '', animate = true }: any) => {
  const content = (
    <div className={`glass rounded-2xl p-6 border border-white/10 ${className}`}>
      {children}
    </div>
  );
  if (!animate) return content;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
};

// --- Views ---

const HomeView = ({ setView }: { setView: (v: View) => void }) => {
  const whatsappConsulting = "https://wa.me/33756858255?text=bonjour%2C%20je%20me%20permets%20de%20vous%20%C3%A9crire%20afin%20d'avoir%20des%20renseignement%20sur%20la%20formation%20marketing%20digital.";
  
  return (
    <div className="space-y-8 pb-24">
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-accent/10 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6 p-1 rounded-full moving-light-yellow"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20">
            <img 
              src="https://image.noelshack.com/fichiers/2026/13/2/1774360328-taxi-23.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-4"
        >
          Formation <br />
          <span className="text-rose-accent">marketing digital</span>
        </motion.h1>
        <p className="text-gray-400 text-lg mb-8 font-medium">Consulting 100% gratuit, accompagnement</p>
        <Button onClick={() => { setView('discover'); window.scrollTo(0, 0); }} className="animate-pulse-rose">
          En savoir plus <ArrowRight size={20} />
        </Button>
      </section>

      <section className="px-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(whatsappConsulting)}
          className="w-full relative overflow-hidden group rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 bg-gradient-to-br from-rose-accent/20 to-rose-accent/5 border border-rose-accent/30 shadow-[0_0_30px_rgba(255,45,85,0.1)]"
        >
          <div className="absolute top-0 right-0 p-3">
            <div className="bg-rose-accent text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
              Gratuit
            </div>
          </div>
          
          <div className="p-4 rounded-full bg-rose-accent/10 text-rose-accent group-hover:scale-110 transition-transform duration-300">
            <Calendar size={32} />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-black text-xl uppercase italic tracking-tight">
              Prendre rendez-vous
            </h3>
            <p className="text-rose-accent/80 font-medium text-sm uppercase tracking-widest">
              Consulting offert
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
            <MessageCircle size={14} className="text-green-500" />
            Contact direct WhatsApp
          </div>
        </motion.button>
      </section>
    </div>
  );
};

const DiscoverFormationsView = ({ setView }: { setView: (v: View) => void }) => {
  const whatsappLink = "https://wa.me/33756858255?text=bonjour%2C%20je%20me%20permets%20de%20vous%20%C3%A9crire%20afin%20d'avoir%20des%20renseignement%20sur%20la%20formation%20marketing%20digital.";

  return (
    <div className="px-6 pt-12 pb-24 space-y-8">
      <div className="space-y-6">
        <h2 className="text-3xl font-black italic uppercase leading-tight">
          Maîtrisez le <span className="text-rose-accent">Digital</span>
        </h2>
        
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p className="font-medium text-white text-lg">
            J’aide les personnes motivées à comprendre les bases du marketing digital et à structurer un projet en ligne clair, organisé et durable, même en partant de zéro.
          </p>
          
          <p>
            L’objectif : te donner une base solide pour avancer avec clarté, confiance et méthode dans le digital.
          </p>

          <div className="space-y-2 py-4">
            <div className="flex items-start gap-3">
              <span className="text-rose-accent">✔️</span>
              <span>Comprendre les fondamentaux du marketing digital (sans jargon inutile)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-accent">✔️</span>
              <span>Structurer un projet en ligne étape par étape</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-accent">✔️</span>
              <span>Organiser son temps et rester discipliné sur la durée</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-accent">✔️</span>
              <span>Développer un mindset entrepreneurial solide et aligné</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-accent">✔️</span>
              <span>Éviter les erreurs courantes des débutants en ligne</span>
            </div>
          </div>

          <GlassCard className="bg-white/5 border-white/10 space-y-4">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Smartphone className="text-rose-accent" size={20} /> Tu débutes dans le digital 💻
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">• Tu veux comprendre avant d’investir partout</li>
              <li className="flex items-center gap-2">• Tu veux un cadre clair et structuré</li>
              <li className="flex items-center gap-2">• Tu es prêt(e) à travailler sérieusement</li>
            </ul>
          </GlassCard>

          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
            <h4 className="font-bold text-red-400 uppercase text-xs tracking-widest">Ce programme n’est PAS fait pour toi si :</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Tu cherches de l’argent rapide sans effort</li>
              <li>• Tu veux une solution magique</li>
            </ul>
          </div>

          <p className="italic text-sm text-gray-400 pt-4">
            Accès à une formation digitale complète et structurée, à suivre à ton rythme, conçue pour poser des bases solides.
          </p>
        </div>

        <Button onClick={() => window.open(whatsappLink)} className="w-full py-4 text-lg">
          <MessageCircle size={20} /> En savoir plus
        </Button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    if (isLoading) return null;
    switch (view) {
      case 'home': return <HomeView setView={setView} />;
      case 'discover': return <DiscoverFormationsView setView={setView} />;
      default: return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-rose-accent selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <header className="px-6 py-8 flex justify-between items-center sticky top-0 z-40 bg-black/80 backdrop-blur-md">
            <div className="text-2xl font-black italic tracking-tighter cursor-pointer" onClick={() => setView('home')}>
              NIYA DIGITAL<span className="text-rose-accent">.</span>
            </div>
            <button className="glass p-2 rounded-xl">
              <Menu size={24} />
            </button>
          </header>

          <main className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Navbar currentView={view} setView={setView} />
        </>
      )}
    </div>
  );
}
