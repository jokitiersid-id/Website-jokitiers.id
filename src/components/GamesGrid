import React, { useState } from 'react';
import { Game } from '../types';
import { Sparkles, Zap } from 'lucide-react';

interface GamesGridProps {
  games: Game[];
  searchTerm: string;
  onSelectGame: (gameId: string) => void;
}

// Custom typography, brand highlights, and inline SVG logos precisely matching the user's MLBB/FreeFire/HOK screenshot
const getCustomCardStyles = (id: string, name: string) => {
  switch (id) {
    case 'mobile-legends':
      return {
        bigTitle: 'MOBILE LEGENDS',
        highlightWord: 'TOPUP',
        accentClass: 'text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]',
        tagColor: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <path d="M10 4 L28 4 L34 20 L28 36 L10 36 L4 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="19,10 24,19 19,28 14,19" fill="currentColor" opacity="0.8" />
            <text x="42" y="24" className="text-[12px] font-black tracking-[0.2em] fill-white font-sans">MOBILE LEGENDS</text>
            <text x="42" y="32" className="text-[7px] font-bold tracking-[0.1em] fill-gray-300 font-sans">B A N G   B A N G</text>
          </svg>
        )
      };
    case 'joki-rank':
      return {
        bigTitle: 'JOKI RANK',
        highlightWord: 'MOBILE LEGENDS',
        accentClass: 'text-red-500 drop-shadow-[0_2px_10px_rgba(239,68,68,0.7)]',
        tagColor: 'border-red-500/50 bg-red-500/10 text-red-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <path d="M10 4 L28 4 L34 20 L28 36 L10 36 L4 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="19,10 24,19 19,28 14,19" fill="currentColor" opacity="0.8" />
            <text x="42" y="24" className="text-[12px] font-black tracking-[0.2em] fill-white font-sans">MOBILE LEGENDS</text>
            <text x="42" y="32" className="text-[7px] font-bold tracking-[0.1em] fill-gray-300 font-sans">B A N G   B A N G</text>
          </svg>
        )
      };
    case 'jasa-mabar':
      return {
        bigTitle: 'JASA MABAR',
        highlightWord: 'PUSH',
        accentClass: 'text-sky-400 drop-shadow-[0_2px_10px_rgba(56,189,248,0.7)]',
        tagColor: 'border-sky-500/50 bg-sky-500/10 text-sky-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <path d="M10 4 L28 4 L34 20 L28 36 L10 36 L4 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="19,10 24,19 19,28 14,19" fill="currentColor" opacity="0.8" />
            <text x="42" y="24" className="text-[12px] font-black tracking-[0.2em] fill-white font-sans">MOBILE LEGENDS</text>
            <text x="42" y="32" className="text-[7px] font-bold tracking-[0.1em] fill-gray-300 font-sans">B A N G   B A N G</text>
          </svg>
        )
      };
    case 'free-fire':
      return {
        bigTitle: 'GARENA',
        highlightWord: 'FREE FIRE',
        accentClass: 'text-orange-500 drop-shadow-[0_2px_8px_rgba(249,115,22,0.6)]',
        tagColor: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <path d="M10 6 L22 10 L26 3 L30 12 L35 5 L33 22 L24 35 L12 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="42" y="26" className="text-[13px] font-extrabold tracking-[0.15em] fill-white font-sans">FREE FIRE</text>
          </svg>
        )
      };
    case 'pubg-mobile':
      return {
        bigTitle: 'PUBG',
        highlightWord: 'MOBILE',
        accentClass: 'text-red-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.6)]',
        tagColor: 'border-red-500/50 bg-red-500/10 text-red-400',
        svgLogo: (
          <svg className="h-4 sm:h-5 shrink-0 text-white fill-current" viewBox="0 0 200 35">
            <rect x="5" y="3" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <text x="12" y="23" className="text-[13px] font-black fill-white font-sans">P</text>
            <text x="40" y="18" className="text-[11px] font-black tracking-[0.2em] fill-white font-sans">PUBG</text>
            <text x="40" y="28" className="text-[8px] font-bold tracking-[0.15em] fill-gray-300 font-sans">MOBILE</text>
          </svg>
        )
      };
    case 'honor-of-kings':
      return {
        bigTitle: 'HONOR',
        highlightWord: 'OF KINGS',
        accentClass: 'text-cyan-400 drop-shadow-[0_2px_8px_rgba(34,211,238,0.6)]',
        tagColor: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <polygon points="20,4 34,14 30,34 10,34 6,14" fill="none" stroke="currentColor" strokeWidth="2" />
            <polyline points="20,11 25,18 20,25 15,18" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="42" y="26" className="text-[11.5px] font-black tracking-[0.1em] fill-white font-sans">HONOR OF KINGS</text>
          </svg>
        )
      };
    case 'magic-chess':
      return {
        bigTitle: 'MAGIC CHESS:',
        highlightWord: 'GO GO',
        accentClass: 'text-purple-400 drop-shadow-[0_2px_8px_rgba(168,85,247,0.6)]',
        tagColor: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <path d="M12 30 L12 26 C12 26 10 22 14 16 L16 8 C16 8 20 4 24 8 L26 16 C30 22 28 26 28 26 L28 30 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="42" y="20" className="text-[11px] font-black tracking-[0.15em] fill-white font-sans">MAGIC CHESS</text>
            <text x="42" y="30" className="text-[8px] font-bold tracking-[0.1em] fill-gray-300 font-sans">GO GO</text>
          </svg>
        )
      };
    case 'arena-breakout':
      return {
        bigTitle: 'ARENA',
        highlightWord: 'BREAKOUT',
        accentClass: 'text-gray-300 drop-shadow-[0_2px_8px_rgba(156,163,175,0.4)]',
        tagColor: 'border-gray-500/50 bg-gray-500/10 text-gray-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3, 2" />
            <text x="42" y="20" className="text-[11px] font-black tracking-[0.15em] fill-white font-sans">ARENA</text>
            <text x="42" y="30" className="text-[8px] font-bold tracking-[0.1em] fill-gray-300 font-sans">BREAKOUT</text>
          </svg>
        )
      };
    case 'valorant':
      return {
        bigTitle: 'VALO',
        highlightWord: 'RANT',
        accentClass: 'text-red-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.6)]',
        tagColor: 'border-red-500/50 bg-red-500/10 text-red-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <path d="M8 10 L18 10 L24 24 L16 30 Z" fill="currentColor" />
            <path d="M24 10 L28 10 L23 30 Z" fill="currentColor" />
            <text x="42" y="26" className="text-[13px] font-black tracking-[0.2em] fill-white font-sans">VALORANT</text>
          </svg>
        )
      };
    case 'genshin':
      return {
        bigTitle: 'GENSHIN',
        highlightWord: 'IMPACT',
        accentClass: 'text-sky-300 drop-shadow-[0_2px_8px_rgba(14,165,233,0.6)]',
        tagColor: 'border-sky-500/50 bg-sky-500/10 text-sky-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <polygon points="20,4 24,16 36,20 24,24 20,36 16,24 4,20 16,16" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="42" y="26" className="text-[12px] font-black tracking-[0.1em] fill-white font-sans">GENSHIN IMPACT</text>
          </svg>
        )
      };
    case 'star-rail':
      return {
        bigTitle: 'HONKAI',
        highlightWord: 'STAR RAIL',
        accentClass: 'text-indigo-400 drop-shadow-[0_2px_8px_rgba(129,140,248,0.6)]',
        tagColor: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <text x="42" y="26" className="text-[12px] font-black tracking-[0.1em] fill-white font-sans">STAR RAIL</text>
          </svg>
        )
      };
    case 'roblox':
      return {
        bigTitle: 'ROBLOX',
        highlightWord: 'BOOST',
        accentClass: 'text-red-400 drop-shadow-[0_2px_8px_rgba(248,113,113,0.5)]',
        tagColor: 'border-gray-600/50 bg-gray-700/20 text-gray-300',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <rect x="10" y="10" width="20" height="20" transform="rotate(15 20 20)" fill="none" stroke="currentColor" strokeWidth="3" />
            <rect x="18" y="18" width="4" height="4" fill="currentColor" />
            <text x="42" y="26" className="text-[14px] font-black tracking-[0.15em] fill-white font-sans">ROBLOX</text>
          </svg>
        )
      };
    default:
      const firstWord = name.split(' ')[0] || 'TOPUP';
      const secondWord = name.split(' ').slice(1).join(' ') || 'GAME';
      return {
        bigTitle: firstWord.toUpperCase(),
        highlightWord: secondWord.toUpperCase(),
        accentClass: 'text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]',
        tagColor: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
        svgLogo: (
          <svg className="h-5 sm:h-6 shrink-0 text-white fill-current" viewBox="0 0 200 40">
            <polygon points="10,6 30,6 20,34" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="42" y="26" className="text-[12px] font-bold tracking-[0.1em] fill-white font-sans">{name.toUpperCase()}</text>
          </svg>
        )
      };
  }
};

export default function GamesGrid({ games, searchTerm, onSelectGame }: GamesGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Top Up Games' },
    { id: 'specialist_mlbb', label: 'Specialist MLBB' },
    { id: 'specialist_roblox', label: 'Specialist Roblox' },
    { id: 'specialist_ff', label: 'Specialist Free Fire' },
    { id: 'specialist_pubg', label: 'Specialist PUBGM' },
    { id: 'specialist_magicchess', label: 'Specialist Magic Chess : Go Go' },
    { id: 'specialist_hok', label: 'Specialist HOK' },
    { id: 'voucher', label: 'Voucher' }
  ];

  // Filter strategy
  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.developer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === 'all') {
      return matchesSearch;
    }
    return game.category === activeCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Scrollable Categories Navigation Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-red-500 max-w-full">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-btn-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-tight shrink-0 transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#ef4444] text-white shadow-lg shadow-red-500/25 scale-102 font-extrabold'
                : 'bg-[#211832] text-gray-300 hover:bg-[#2c1f44] border border-[#2e2145]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout of Horizontal Esports Card banners exactly matching custom screenshot layout */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {filteredGames.map((game) => {
            const styles = getCustomCardStyles(game.id, game.name);
            return (
              <div
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className="group relative w-full h-[150px] sm:h-[185px] md:h-[210px] rounded-2.5xl overflow-hidden cursor-pointer border border-[#2d2146] bg-[#0c0716] hover:border-[#ef4444]/80 transition-all duration-300 shadow-xl hover:shadow-[0_12px_45px_rgba(239,68,68,0.22)] transform hover:-translate-y-1"
              >
                {/* 1. Raw Character Full Illustration background on the right side */}
                <div className="absolute inset-y-0 right-0 w-1/2 sm:w-3/5 h-full overflow-hidden z-0 bg-slate-950">
                  <img
                    referrerPolicy="no-referrer"
                    src={game.bannerImage}
                    alt={game.name}
                    className="w-full h-full object-cover object-center transform scale-102 group-hover:scale-108 transition-all duration-500 filter brightness-95 group-hover:brightness-110"
                  />
                  {/* Smooth horizontal blending from deep slate on the left to transparency */}
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0716] to-transparent z-10 pointer-events-none"></div>
                </div>

                {/* 2. Pure Black/Vignette fading cover block covering the Left Side for maximum brand reading */}
                <div className="absolute inset-y-0 left-0 w-3/5 h-full bg-gradient-to-r from-black via-black/95 to-[#0c0716]/0 z-10 pointer-events-none"></div>

                {/* 3. Outer Red border glow panel style when group hover triggers */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#ef4444]/50 rounded-2.5xl pointer-events-none z-30 transition-all duration-300"></div>

                {/* 4. Glowing Hot Header indicator tag precisely in the upper-right */}
                <div className="absolute top-3.5 right-3.5 z-30 pointer-events-none">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black tracking-widest border transition-all ${
                    game.isHot 
                      ? 'border-red-500/60 bg-red-950/85 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse' 
                      : 'border-slate-700 bg-slate-900/80 text-slate-400'
                  }`}>
                    {game.isHot ? 'HOT' : 'PROMO'}
                  </span>
                </div>

                {/* 5. Inset absolute layout for left-oriented text overlay and svg logos */}
                <div className="absolute inset-0 p-4 sm:p-6 md:p-7 flex flex-col justify-between h-full z-20 pointer-events-none select-none">
                  
                  {/* Top: Massive bold typography representing Esports header details with text shadows */}
                  <div className="flex flex-col space-y-0 text-left max-w-[55%]">
                    <h2 className="font-extrabold text-[#f3f4f6]/95 text-base sm:text-2xl md:text-[27px] tracking-tighter uppercase italic leading-none drop-shadow-md">
                      {styles.bigTitle}
                    </h2>
                    <h3 className={`font-black uppercase italic tracking-tighter text-sm sm:text-xl md:text-[22px] leading-tight ${styles.accentClass}`}>
                      {styles.highlightWord}
                    </h3>
                  </div>

                  {/* Bottom: Aligned game icon SVG (representing official gaming brand badge) */}
                  <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center">
                      {styles.svgLogo}
                    </div>
                  </div>

                </div>

                {/* Subtle bottom red accent pulse bar */}
                <div className="absolute bottom-0 left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#ef4444] to-transparent z-25 opacity-40 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#1a1228] rounded-2xl border border-dashed border-[#3e2a5d] space-y-3">
          <span className="text-4xl text-gray-500">🎮</span>
          <p className="text-gray-400 font-bold">Produk atau Game "{searchTerm}" tidak ditemukan.</p>
          <p className="text-xs text-gray-500">Cobalah cari nama game yang populer, atau periksa ejaan Anda.</p>
        </div>
      )}

    </div>
  );
}
GamesGrid
