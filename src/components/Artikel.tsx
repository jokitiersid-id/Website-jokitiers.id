import React, { useState, useEffect } from 'react';
import { ARTICLES_DATA } from '../gamesData';
import { Article } from '../types';
import { 
  Calendar, 
  Clock, 
  X, 
  ArrowUpRight, 
  User, 
  Search, 
  Smartphone, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link2,
  Check,
  ChevronUp,
  Award,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface ArtikelProps {
  isHomeView?: boolean;
  onViewAll?: () => void;
  onSelectGame?: (gameId: string) => void;
  onSelectArticleGlobal?: (articleId: string) => void;
  selectedArticleIdGlobal?: string | null;
  onBackToHome?: () => void;
}

export default function Artikel({ 
  isHomeView = false, 
  onViewAll, 
  onSelectGame,
  onSelectArticleGlobal,
  selectedArticleIdGlobal,
  onBackToHome
}: ArtikelProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (isHomeView) return null;
    const initialId = selectedArticleIdGlobal || '1';
    const defaultArt = ARTICLES_DATA.find(a => a.id === initialId);
    return defaultArt || ARTICLES_DATA[0];
  });

  // Sync state with global input prop changes
  useEffect(() => {
    if (isHomeView) {
      setSelectedArticle(null);
    } else {
      const targetId = selectedArticleIdGlobal || '1';
      const targetArt = ARTICLES_DATA.find(a => a.id === targetId);
      setSelectedArticle(targetArt || ARTICLES_DATA[0]);
    }
  }, [selectedArticleIdGlobal, isHomeView]);
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Sliders automatic animation state
  const [activeSlide, setActiveSlide] = useState(0);

  // Copy link alert confirmation state
  const [copied, setCopied] = useState(false);

  // List of unique categories for category filters
  const categories = ['Semua', 'Mobile Legends', 'Panduan', 'Game News', 'Builds'];

  // Handle article clicks
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    if (onSelectArticleGlobal) {
      onSelectArticleGlobal(article.id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      setSelectedArticle(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract featured, popular and other articles
  const featuredArticles = ARTICLES_DATA.filter(a => a.isFeatured);
  const popularArticles = ARTICLES_DATA.filter(a => a.isPopular);

  // Fallbacks
  const mainFeatured = featuredArticles.length > 0 ? featuredArticles[activeSlide] : ARTICLES_DATA[0];
  
  // Popular Side List for sidebar
  const popularMain = popularArticles.length > 0 ? popularArticles[0] : ARTICLES_DATA[1];
  const popularList = popularArticles;

  // Filter newest articles by Search and Tab
  const filteredArticles = ARTICLES_DATA.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Semua' || 
                            article.category.toLowerCase() === selectedCategory.toLowerCase();
                            
    return matchesSearch && matchesCategory;
  });

  // Cycle through featured slider if multiple exist
  useEffect(() => {
    if (featuredArticles.length <= 1 || isHomeView || selectedArticle) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredArticles.length, isHomeView, selectedArticle]);

  // Render customizable card covers/vectors inside article blocks
  const renderArticleGraphicCover = (article: Article, isSmall = false) => {
    const textToShow = article.upperText || article.title.toUpperCase();
    
    let borderStyle = "border-[#3c2a5c]/55";
    let overlayGradient = "bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent";
    
    if (article.id === '1') {
      borderStyle = "border-[#552ca3]/60";
      overlayGradient = "bg-gradient-to-t from-indigo-950/90 via-slate-950/35 to-indigo-950/10";
    } else if (article.id === '2') {
      borderStyle = "border-[#ef4444]/40";
      overlayGradient = "bg-gradient-to-t from-red-950/85 via-slate-950/35 to-red-950/10";
    } else if (article.id === '3' || article.id === '4') {
      borderStyle = "border-yellow-500/40";
      overlayGradient = "bg-gradient-to-t from-amber-955/80 via-slate-950/35 to-amber-955/5";
    } else if (article.isFeatured) {
      borderStyle = "border-red-500/30";
      overlayGradient = "bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent";
    }

    return (
      <div className={`relative w-full overflow-hidden flex flex-col justify-between select-none ${isSmall ? 'h-32 sm:h-36' : 'h-48 sm:h-56 md:h-64'} border-b ${borderStyle}`}>
        
        {/* Poster backdrop with full opacity rendering */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            referrerPolicy="no-referrer"
            src={article.imageUrl || "/images/mlbb_banner_1779415720349.png"} 
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 scale-100 transform group-hover:scale-105 transition-all duration-750 duration-700"
            alt={article.title} 
          />
          <div className={`absolute inset-0 ${overlayGradient}`}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5))]"></div>
        </div>

        {/* Abstract vector overlays */}
        <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] opacity-25"></div>
          
          {/* Custom graphic elements based on IDs */}
          {article.id === '1' && (
            <div className="absolute inset-y-0 right-4 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity sm:right-10">
              <div className="w-20 h-32 border-2 border-indigo-400/50 rounded-2xl bg-slate-950/95 p-1 shadow-2xl relative rotate-6 transform group-hover:rotate-12 transition-transform duration-300">
                <div className="w-full h-full border border-indigo-500/25 rounded-xl bg-[#200e39]/80 flex flex-col justify-between p-1.5 overflow-hidden">
                  <div className="h-2 w-10 bg-indigo-500/60 rounded mx-auto"></div>
                  <div className="space-y-1 my-3">
                    <div className="h-1 text-[4px] text-gray-300 font-bold scale-90">TAKAPEDIA LOGIN</div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-xs"></div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-xs"></div>
                  </div>
                  <div className="h-3 w-full bg-[#ef4444] rounded-sm flex items-center justify-center">
                    <span className="text-[3.5px] font-black text-white scale-75">Daftar Akun</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {article.id === '2' && (
            <div className="absolute right-4 top-2 flex flex-col items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="relative w-22 h-20 flex items-center justify-center">
                <div className="absolute top-1 rotate-[-6deg] w-16 h-10 border border-purple-500/50 bg-purple-950/95 rounded shadow-md"></div>
                <div className="absolute top-2 w-16 h-10 border border-indigo-400 bg-indigo-950 rounded shadow-lg flex items-center justify-center gap-1">
                  <span className="text-[6px] text-[#ef4444] font-black italic scale-90">WDP</span>
                  <div className="w-2 h-2 bg-cyan-400 rotate-45 flex items-center justify-center"></div>
                </div>
              </div>
            </div>
          )}

          {article.id === '3' && (
            <div className="absolute right-6 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-all gap-1.5 scale-90 sm:scale-100">
              <div className="w-9 h-9 rounded-full bg-yellow-950/45 border-2 border-yellow-500 flex items-center justify-center relative shadow-lg">
                <span className="text-[10px] text-yellow-500">🛡️</span>
                <span className="absolute -top-1 -right-1 text-[8px] text-emerald-400 font-black">▲</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-950/45 border-2 border-emerald-500/85 flex items-center justify-center relative shadow-lg">
                <span className="text-[10px] text-emerald-400">⚔️</span>
                <span className="absolute -top-1 -right-1 text-[8px] text-emerald-400 font-black">▲</span>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 right-0 left-0 h-10 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        {/* Diagonal brand watermarks */}
        <div className="absolute top-3 left-4 z-10 select-none">
          <span className="bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase shadow">
            JOKITIERS VERIFIED
          </span>
          {isSmall && (
            <span className="text-[10px] text-gray-400 ml-2 font-bold select-none absolute left-3 w-5 bg-[#521dc4] rounded flex items-center justify-center">
              HLMNPEDIA
            </span>
          )}
        </div>

        {/* Small Left HLMNPEDIA overlay tag from mockup */}
        <div className="absolute bottom-6 left-2 z-10 select-none writing-mode-vertical rotate-180 flex items-center gap-1 opacity-60">
          <span className="text-[7.5px] font-black tracking-widest text-[#a69fc4] uppercase border-l border-[#4d367e] pl-1.5">HLMNPEDIA</span>
        </div>

        {/* Main large display graphic text display */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 z-10 text-center">
          <h4 className={`font-black uppercase tracking-tighter leading-tight font-display select-none ${
            isSmall 
              ? 'text-xs sm:text-sm text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-[200px] mx-auto' 
              : 'text-sm sm:text-base md:text-lg text-yellow-300 drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] max-w-[280px] mx-auto'
          }`}>
            {textToShow}
          </h4>
        </div>

        {/* Badge status sticker */}
        {article.badgeText && (
          <div className="absolute right-4 bottom-3 z-10">
            <span className="bg-[#ef4444] text-white font-extrabold text-[9px] px-2 py-0.5 rounded shadow-md uppercase tracking-wider scale-95 flex items-center gap-1 border border-red-400/20">
              <Sparkles className="w-2.5 h-2.5" />
              {article.badgeText}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-indigo-500"></div>

      </div>
    );
  };

  // Render the exquisite CSS-styled mock Takapedia dashboard 
  const renderMockTakapediaUI = () => {
    return (
      <div className="border border-[#3c256a]/60 rounded-xl overflow-hidden shadow-2xl bg-slate-950 flex flex-col w-full text-left my-6 relative select-none uppercase font-sans animate-fade-in">
        {/* Browser header simulator */}
        <div className="bg-[#171128] px-4 py-2 border-b border-[#2d1e4d] flex items-center justify-between">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/85"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/85"></div>
          </div>
          <div className="mx-auto max-w-xs md:max-w-md w-full bg-[#110c1f] rounded-md px-3 py-1 text-[9px] text-gray-400 text-center truncate border border-[#3e276b]/30 lowercase">
            https://www.takapedia.com
          </div>
          <div className="w-8"></div>
        </div>

        {/* Mock dashboard web panel */}
        <div className="p-4 bg-[#140e21] text-[#e0def2] space-y-4">
          
          {/* Mock Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#2d1e46] pb-3">
            {/* Logo brand */}
            <div className="flex items-center gap-1 font-black tracking-tighter text-yellow-400 text-xs italic sm:text-sm">
              <span className="text-[#ef4444] font-extrabold text-base">T</span>AKAPEDIA
            </div>

            {/* Input mock bar */}
            <div className="relative w-full sm:-mx-6 sm:max-w-xs md:max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center">
                <Search className="h-3 w-3 text-gray-500" />
              </div>
              <div className="block w-full pl-8 pr-3 py-1 bg-[#1e1530] border border-[#3d266a] rounded text-[8px] text-gray-500 text-left">
                Cari Game atau Voucher...
              </div>
            </div>

            {/* Custom actions */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] text-gray-300 hover:text-white cursor-pointer font-extrabold pr-1 tracking-wider">MASUK</span>
              <span className="bg-yellow-400 text-black font-black text-[9px] px-3 py-1 rounded shadow cursor-pointer tracking-wider">DAFTAR</span>
            </div>
          </div>

          {/* Starlight Bane Banner exactly matches mockups */}
          <div className="relative rounded-lg overflow-hidden border border-[#502f92]/40 h-36 flex flex-col justify-center p-4 bg-slate-950">
            {/* Real Graphic Background */}
            <div className="absolute inset-0 z-0 bg-[#120a22]">
              <img 
                referrerPolicy="no-referrer"
                src="/images/mlbb_banner_1779415720349.png" 
                className="w-full h-full object-cover opacity-65 mix-blend-normal transform scale-102"
                alt="November Starlight Bane" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-950/95 via-slate-950/70 to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5))]"></div>
            </div>
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_15px] opacity-20 pointer-events-none z-1"></div>

            <div className="z-10 max-w-sm space-y-1.5 md:space-y-2 text-left">
              <div className="flex items-center gap-1.5">
                <span className="bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] text-[6.5px] font-black px-1.5 py-0.2 rounded">MOBILE LEGENDS</span>
                <span className="text-[7.5px] text-yellow-400 font-extrabold">STARLIGHT</span>
              </div>

              <h3 className="text-xs md:text-base font-black text-white leading-tight font-display tracking-tight text-yellow-300 drop-shadow">
                NOVEMBER STARLIGHT BANE "LORD OF SCALDING SEAS"
              </h3>
              <p className="text-[7px] md:text-[8px] text-[#b3abc4] font-bold">
                DAPATKAN SKIN STARLIGHT BANE TERBARU DENGAN PROMO HARGA TERMURAH SEKARANG!
              </p>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="bg-yellow-400 text-black text-[8px] font-black px-2 py-0.5 rounded shadow">
                  HANYA 300 DIAMONDS
                </span>
                <span className="text-[6.5px] text-gray-400">PROMO VALID DAN AMAN</span>
              </div>
            </div>

            {/* Simulated game chest avatars */}
            <div className="absolute right-3 inset-y-0 flex items-center justify-center opacity-70">
              <div className="w-16 h-24 rounded-lg border border-yellow-500/25 bg-yellow-950/25 shadow-lg relative overflow-hidden rotate-3 flex items-center justify-center">
                <span className="text-xl rotate-[-3deg]">🧜‍♂️</span>
                <div className="absolute bottom-1 inset-x-1 h-3 bg-black/80 rounded flex items-center justify-center">
                  <span className="text-[5px] text-yellow-400 font-black">BANE SKIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Miniature quick select lists */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {[
              { name: 'Mobile Legends', icon: '⚔️', hot: true },
              { name: 'Free Fire', icon: '🔫' },
              { name: 'PUBG Mobile', icon: '🪂' },
              { name: 'Honor Of Kings', icon: '👑', hot: true },
              { name: 'Valorant', icon: '🎯' },
              { name: 'Genshin Impact', icon: '🍃' }
            ].slice(0, 5).map((g, idx) => (
              <div key={idx} className="bg-[#1d1430] border border-[#3e256a]/30 p-2 text-center rounded-lg flex flex-col items-center justify-center space-y-1 relative">
                <span className="text-xs">{g.icon}</span>
                <span className="text-[7px] font-black text-white truncate w-full">{g.name}</span>
                {g.hot && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[4px] font-black px-1 rounded-sm">HOT</span>
                )}
              </div>
            ))}
            <div className="bg-[#241738]/50 border border-dashed border-[#3e256a]/40 p-2 text-center rounded-lg flex items-center justify-center">
              <span className="text-[7px] font-extrabold text-gray-400">LAINNYA</span>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // Render weekly diamond pass layout visualization
  const renderWDPVisualizer = () => {
    return (
      <div className="border border-[#ef4444]/25 rounded-xl overflow-hidden shadow-2xl bg-[#140a23] p-4 sm:p-5 text-left my-6 space-y-4 relative select-none uppercase font-sans animate-fade-in">
        <div className="absolute top-2 right-2 flex gap-1">
          <span className="bg-yellow-400 text-black text-[7.5px] font-black px-1.5 py-0.5 rounded shadow">WDP ACTIVE</span>
          <span className="bg-[#ef4444] text-white text-[7.5px] font-black px-1.5 py-0.5 rounded shadow">REBATE 455%!</span>
        </div>

        <h3 className="text-sm font-black text-white border-b border-[#2d1e46] pb-2 mr-24">WEEKLY DIAMOND PASS MANAGEMENT CLIENT</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-[#1d1131] border border-[#3e236b]/50 p-3.5 rounded-lg space-y-2">
            <span className="text-[8px] text-gray-400 font-extrabold block">WEEKLY PROGRESS SUMMARY (STAKING)</span>
            <div className="text-white flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-yellow-300">45</span>
              <span className="text-sm text-gray-400">/ 70 HARI</span>
            </div>
            
            {/* Progress bar gauge */}
            <div className="w-full bg-[#110620] h-2.5 rounded-full overflow-hidden border border-[#3c226a] flex">
              <div className="bg-yellow-400 h-full border-r border-[#140a23]" style={{ width: '64.2%' }}></div>
              <div className="bg-transparent h-full flex-grow"></div>
            </div>
            <span className="text-[7px] text-emerald-400 font-bold block">✓ Status: Masih Aman di bawah batas stacking</span>
          </div>

          <div className="bg-[#1d1131] border border-[#3e236b]/50 p-3.5 rounded-lg flex flex-col justify-between">
            <span className="text-[8px] text-purple-400 font-black tracking-widest block">ATURAN MEMPUNYAI BATASAN</span>
            <ul className="text-[7.5px] text-gray-300 space-y-1 my-1 mt-2 lowercase normal-case">
              <li className="flex gap-1 items-start font-medium"><span className="text-[#ef4444]">✦</span> Maksimal masa simpan Weekly Pass MLBB adalah 70 hari.</li>
              <li className="flex gap-1 items-start font-medium"><span className="text-[#ef4444]">✦</span> Pengguna dilarang membeli lebih dari 10 kali pass sekaligus.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Render comparative table for item adjustment patch
  const renderItemPatchVisualizer = () => {
    return (
      <div className="border border-yellow-500/20 rounded-xl overflow-hidden shadow-2xl bg-[#141b16] p-4 my-6 text-left space-y-3 relative font-sans animate-fade-in uppercase">
        <h3 className="text-xs font-black text-yellow-400 border-b border-yellow-500/20 pb-2 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-yellow-400" />
          ITEM ADJUSTMENT STATS MATRIX (SEBELUM VS SESUDAH PATCH)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-[9px] text-gray-200">
            <thead>
              <tr className="border-b border-yellow-500/10 text-gray-400 select-none">
                <th className="py-1 px-2 text-left">Nama Peralatan</th>
                <th className="py-1 px-2 text-left">Fungsi Sebelum</th>
                <th className="py-1 px-2 text-left">Fungsi Sesudah</th>
                <th className="py-1 px-2 text-right">Penilaian Meta</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-yellow-500/5 hover:bg-black/20">
                <td className="py-2.5 px-2 text-white font-extrabold flex items-center gap-1">🛡️ TWILIGHT ARMOR</td>
                <td className="py-2.5 px-2 text-gray-400 font-medium">Batas pemicu reduksi damage di angka besar {">"} 800 HP</td>
                <td className="py-2.5 px-2 text-emerald-400 font-bold">Berasimilasi dengan Critical reduksi {">"} 600 HP</td>
                <td className="py-2.5 px-2 text-right"><span className="bg-emerald-500/15 text-emerald-400 text-[7px] px-1.5 py-0.5 rounded font-black">BUFFED ★</span></td>
              </tr>
              <tr className="border-b border-yellow-500/5 hover:bg-black/20">
                <td className="py-2.5 px-2 text-white font-extrabold">⚡ THUNDER BELT</td>
                <td className="py-2.5 px-2 text-gray-400 font-medium">Scaling True Damage didapat dari ekstra physical defense</td>
                <td className="py-2.5 px-2 text-yellow-400 font-bold">Cooldown efek lambat terdistribusi lebih merata</td>
                <td className="py-2.5 px-2 text-right"><span className="bg-yellow-500/15 text-yellow-400 text-[7px] px-1.5 py-0.5 rounded font-black">ADJUST ADJ</span></td>
              </tr>
              <tr className="hover:bg-black/20">
                <td className="py-2.5 px-2 text-white font-extrabold">🪄 MAGIC WANDS COMBO</td>
                <td className="py-2.5 px-2 text-gray-400 font-medium">Dua item terpisah dengan slot tak efisien</td>
                <td className="py-2.5 px-2 text-emerald-400 font-bold">Penyatuan stats debuff defense murni hemat ruang</td>
                <td className="py-2.5 px-2 text-right"><span className="bg-emerald-500/15 text-emerald-400 text-[7px] px-1.5 py-0.5 rounded font-black">BUFFED ★</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render hero dynamic charts
  const renderHeroPatchVisualizer = () => {
    return (
      <div className="border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl bg-[#16122d] p-4 my-6 text-left space-y-4 relative font-sans animate-fade-in uppercase">
        <h3 className="text-xs font-black text-purple-400 border-b border-[#2d1f56] pb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-purple-400" />
          HERO META SHIFT RATINGS (PATCH 2.1.30)
        </h3>

        <div className="space-y-3">
          {/* Nolan Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-black">
              <span className="text-white">NOLAN (JUNGLER ASSASSIN) - CLEAR POWER</span>
              <span className="text-red-400">NERFED (-15%)</span>
            </div>
            <div className="bg-black/40 h-2 rounded-full overflow-hidden border border-[#2b1d54]">
              <div className="bg-red-500 h-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Harith Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-black">
              <span className="text-white">HARITH (MAGE GOLDLANE) - REGENERATION SHIELD</span>
              <span className="text-emerald-400">BUFFED (+20%)</span>
            </div>
            <div className="bg-black/40 h-2 rounded-full overflow-hidden border border-[#2b1d54]">
              <div className="bg-emerald-400 h-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          {/* Joy Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-black">
              <span className="text-white">JOY (ASSASSIN) - CROWD CONTROL INTEGRITY</span>
              <span className="text-yellow-400">ADJUSTED BALANCE</span>
            </div>
            <div className="bg-black/40 h-2 rounded-full overflow-hidden border border-[#2b1d54]">
              <div className="bg-yellow-400 h-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Hero statistics pick chart
  const renderHeroStatsVisualizer = (isBanned = false) => {
    const data = isBanned
      ? [
          { name: 'Tigreal (Roamer Initiator)', rate: '82.4%', color: 'from-red-600 to-amber-500' },
          { name: 'Nolan (Fast Jungler)', rate: '75.1%', color: 'from-purple-600 to-indigo-500' },
          { name: 'Fanny (Assasin Maneuver)', rate: '64.8%', color: 'from-rose-500 to-red-400' }
        ]
      : [
          { name: 'Vexana (Midlane Controller)', rate: '45.2%', color: 'from-emerald-500 to-cyan-550' },
          { name: 'Karrie (Goldlane Tankbuster)', rate: '38.5%', color: 'from-yellow-500_to-amber-500' },
          { name: 'Ruby (Roamer Crowd Control)', rate: '32.1%', color: 'from-indigo-600 to-blue-500' }
        ];

    return (
      <div className={`border rounded-xl overflow-hidden shadow-2xl p-4 my-6 text-left space-y-4 relative font-sans animate-fade-in uppercase ${
        isBanned ? 'border-red-500/20 bg-[#1f1118]' : 'border-emerald-500/20 bg-[#101c18]'
      }`}>
        <h3 className={`text-xs font-black border-b pb-2 flex items-center gap-1.5 ${
          isBanned ? 'text-red-400 border-red-500/10' : 'text-emerald-400 border-emerald-500/10'
        }`}>
          <TrendingUp className="w-4 h-4" />
          {isBanned ? 'MOST BANNED HERO META AUGUST WEEK 2' : 'MOST PICKED HERO META AUGUST WEEK 2'}
        </h3>

        <div className="space-y-3">
          {data.map((h, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[8px] font-black text-gray-300">
                <span>{h.name}</span>
                <span className={isBanned ? 'text-red-400' : 'text-emerald-400'}>{h.rate} RATINGS</span>
              </div>
              <div className="bg-black/40 h-2 rounded-full overflow-hidden border border-slate-850">
                <div className={`h-full bg-gradient-to-r ${isBanned ? 'from-red-600 to-[#ef4444]' : 'from-emerald-500 to-teal-400'}`} style={{ width: h.rate }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renders the incredible modular full reading guide layout matching Image 2 exactly
  const renderFullArticlePage = (article: Article) => {
    // Custom formatted text nodes for layout steps
    const mainTitle = article.title;
    const isWdp = article.id === '2';
    const isManual = article.id === '1';
    const isPatchItem = article.id === '3';
    const isPatchHero = article.id === '4';
    const isMostPicked = article.id === '5' || article.id === 'f-1';
    const isMostBanned = article.id === '6' || article.id === 'p-1';

    // Top up listing sidebar game models
    const topUpSidebarList = [
      { name: 'Mobile Legends', id: 'mobile-legends' },
      { name: 'Joki Rank Mobile Legends', id: 'joki-rank' },
      { name: 'Jasa Mabar Push', id: 'joki-rank' }, // fallbacks
      { name: 'Free Fire', id: 'free-fire' },
      { name: 'PUBG Mobile', id: 'pubg-mobile' },
      { name: 'Honor Of Kings', id: 'honor-of-kings' }
    ];

    return (
      <div className="space-y-8 animate-fade-in text-left">
        
        {/* Breadcrumbs Row matching Screenshot */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#a09bb3] select-none py-1">
          <span className="hover:text-white cursor-pointer hover:underline transition-colors font-extrabold" onClick={() => handleBackToList()}>Home</span>
          <ChevronRight className="w-3 h-3 text-[#554772]" />
          <span className="hover:text-white cursor-pointer hover:underline transition-colors font-extrabold" onClick={() => handleBackToList()}>Artikel</span>
          <ChevronRight className="w-3 h-3 text-[#554772]" />
          <span className="text-gray-400 font-extrabold truncate max-w-[180px] sm:max-w-xs">{article.title}</span>
        </div>

        {/* Custom top heading alignment strip */}
        <div className="space-y-4">
          <div className="inline-block bg-yellow-400 text-black text-[9px] sm:text-[10px] font-black uppercase px-3 py-1 rounded tracking-wide font-sans shadow shadow-md select-none">
            {article.category}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-display tracking-tight text-left text-glow-indigo">
            {article.title}
          </h1>

          {/* Writer Info Strip precisely as depicted */}
          <p className="text-[10px] sm:text-xs text-slate-400 font-bold select-none">
            Ditulis Oleh <strong className="text-yellow-400">{article.author}</strong> Pada <span className="text-gray-300 font-black">{article.date} 06:24 PM</span>
          </p>
        </div>

        {/* Share Button Row precisely matched with custom hover colors */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#2d1e4d]/75 shrink-0 select-none">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-blue-600 text-white font-extrabold text-[9px] sm:text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 uppercase tracking-wider shadow transition-colors"
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook</span>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2] hover:bg-sky-500 text-white font-extrabold text-[9px] sm:text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 uppercase tracking-wider shadow transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>Twitter</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] hover:bg-blue-700 text-white font-extrabold text-[9px] sm:text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 uppercase tracking-wider shadow transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:?subject=Baca Artikel&body=https://www.takapedia.com"
            className="bg-[#EA4335] hover:bg-red-600 text-white font-extrabold text-[9px] sm:text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 uppercase tracking-wider shadow transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <button
            onClick={handleCopyLink}
            className="bg-[#4b5563] hover:bg-gray-655 text-white bg-slate-700 hover:bg-slate-600 font-extrabold text-[9px] sm:text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 uppercase tracking-wider shadow transition-colors relative cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Large custom widescreen poster */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#191129] border border-[#3e256a]/40 group select-none">
          {renderArticleGraphicCover(article)}
        </div>

        {/* Dynamic Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-2">
          
          {/* Left Body Content Section (Span 2 widths) */}
          <div className="lg:col-span-2 flex gap-6 md:gap-8 items-start relative">
            
            {/* 1. Left Vertical Share Strip exactly matching the Screenshot */}
            <div className="hidden md:flex flex-col gap-3 sticky top-28 select-none z-10 shrink-0">
              <button className="w-9 h-9 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all shadow hover:scale-105 cursor-pointer">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white flex items-center justify-center transition-all shadow hover:scale-105 cursor-pointer">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white flex items-center justify-center transition-all shadow hover:scale-105 cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#EA4335]/10 border border-[#EA4335]/20 hover:bg-[#EA4335] text-[#EA4335] hover:text-white flex items-center justify-center transition-all shadow hover:scale-105 cursor-pointer">
                <Mail className="w-4 h-4" />
              </button>
              <button onClick={handleCopyLink} className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white flex items-center justify-center transition-all shadow hover:scale-105 cursor-pointer">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
              </button>
            </div>

            {/* 2. Main Guide Tutorial Text content box */}
            <div className="flex-1 space-y-6 text-slate-300 font-medium font-sans bg-[#130d22] border border-[#2e204c]/70 p-6 sm:p-8 rounded-2xl relative">
              
              {/* Copy link overlay alert popups */}
              {copied && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-black font-black text-[9px] px-3 py-1 rounded shadow-lg animate-fade-in tracking-wider select-none uppercase">
                  Tautan Link berhasil disalin!
                </div>
              )}

              {/* Main detailed content details */}
              <div className="space-y-4">
                
                {/* Custom Subheader matching image: "Tutorial Cara Daftar dan..." */}
                <h2 className="text-base sm:text-xl font-black text-white leading-snug text-left border-l-4 border-yellow-400 pl-3 uppercase">
                  {isManual ? 'Tutorial Cara Daftar dan Aktivasi Akun di Website Takapedia' : `Panduan Praktis: ${article.title}`}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-justify">
                  {isManual 
                    ? 'Ada dua cara, yaitu dengan cara buat akun manual dan via Google.' 
                    : 'Pahami langkah-langkah di bawah ini untuk meningkatkan optimalisasi permainan, keamanan akun, serta strategi duel tim di lobi Ranked original server secara lengkap.'}
                </p>

                <hr className="border-[#2f204c] opacity-80" />

                <h3 className="text-sm sm:text-base font-black text-white uppercase text-left">
                  {isManual ? 'Cara Daftar dan Aktivasi Akun Takapedia via Manual:' : 'Rincian Panduan Lengkap & Penjelasan Skenario:'}
                </h3>
                
                {/* Lists content */}
                <div className="text-xs sm:text-sm space-y-3.5 pt-1 text-left">
                  {isManual && (
                    <div className="space-y-3">
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">1.</span> <strong>Pertama-tama, kunjungi official website Takapedia di alamat <span className="text-yellow-400 hover:underline cursor-pointer">www.takapedia.com</span></strong></p>
                      
                      {/* Gorgeous Live desktop dashboard mockup insert */}
                      {renderMockTakapediaUI()}

                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">2.</span> Di bar navigasi utama bagian kanan atas, klik tombol <strong className="text-yellow-300">Daftar Akun</strong>.</p>
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">3.</span> Masukkan alamat email Anda yang valid, nomor WhatsApp yang aktif untuk verifikasi instan, serta kombinasikan password yang kuat terenkripsi.</p>
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">4.</span> Cari kode OTP yang masuk ke dalam WhatsApp Anda, masukkan kode verifikasi 6 digit ke form aktivasi.</p>
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">5.</span> Selesai! Akun Takapedia / JOKITIERS Anda sekarang aktif dan dapat mengumpulkan poin keanggotaan istimewa untuk diskon top up jaminan termurah!</p>
                    </div>
                  )}

                  {isWdp && (
                    <div className="space-y-3">
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">1.</span> <strong>Lakukan login ke dalam aplikasi game Mobile Legends: Bang Bang Anda.</strong></p>
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">2.</span> Klik menu diamant penawaran di lobi utama lalu pilih menu Weekly Diamond Pass.</p>
                      
                      {/* Graphic overlay Pass summary */}
                      {renderWDPVisualizer()}

                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">3.</span> Perhatikan sisa tumpukan hari langganan Anda. Sebagaimana diperlihatkan pada ilustrasi dashboard di atas, pastikan hari tumpukan berada di bawah 70 hari sebelum memutuskan top up pass baru.</p>
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">4.</span> Jika masa aktif tersisa melebihi 70 hari (10 kali pass), pembelian tambahan berikutnya berisiko ditunda klaimnya.</p>
                    </div>
                  )}

                  {isPatchItem && (
                    <div className="space-y-3">
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">1.</span> <strong>Penyesuaian Twilight Armor:</strong> Item mutlak bagi tank yang digemari offlaner untuk memperkuat daya pertahanan menghadapi assassin berdamage kritikal kencang.</p>
                      
                      {/* Comparative Table */}
                      {renderItemPatchVisualizer()}

                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">2.</span> <strong>Thunder Belt:</strong> Atribut cooldown reduction beralih seimbang, sangat disarankan dipasangkan dengan hero inisiator tebal berkelanjutan.</p>
                      <p className="flex items-start gap-1.5"><span className="text-yellow-400 font-black">3.</span> <strong>Glowing/Genius Wand:</strong> Fleksibilitas build kian leluasa untuk hero Mage di midlane, menghemat satu slot pelindung lari.</p>
                    </div>
                  )}

                  {isPatchHero && (
                    <div className="space-y-3">
                      <p className="flex items-start gap-1.5"><span className="text-purple-400 font-black">✦</span> <strong>Nolan (Nerfed):</strong> Pengurangan tipis jarak draf retakan demi meredam agresi clear jungle di fase awal lobi.</p>
                      
                      {/* Hero statistics metrics */}
                      {renderHeroPatchVisualizer()}

                      <p className="flex items-start gap-1.5"><span className="text-purple-400 font-black">✦</span> <strong>Harith (Buffed):</strong> Shield penangkal burst magis dinaikkan, menjadikannya tumpuan lane handal kembali.</p>
                      <p className="flex items-start gap-1.5"><span className="text-purple-400 font-black">✦</span> <strong>Joy (Adjusted):</strong> Efek immune CC digeser menjadi penyaring shield raga, menuntut penempatan posisi insting yang lebih presisi sewaktu menari bayangan.</p>
                    </div>
                  )}

                  {isMostPicked && (
                    <div className="space-y-3">
                      <p className="flex items-start gap-1.5"><span className="text-emerald-400 font-extrabold">✓</span> <strong>Vexana (45.2%):</strong> Dominasi tinggi berkat penguasaan mini tank boneka andalan zoning.</p>
                      
                      {/* Pick rates visual chart */}
                      {renderHeroStatsVisualizer(false)}

                      <p className="flex items-start gap-1.5"><span className="text-emerald-400 font-extrabold">✓</span> <strong>Karrie (38.5%):</strong> Hero marksman andalan rontok pertahanan tangguh tank musuh dengan build semi perlindungan fisik.</p>
                      <p className="flex items-start gap-1.5"><span className="text-emerald-400 font-extrabold">✓</span> <strong>Ruby (32.1%):</strong> Fighter andalan penyerap HP musas dengan kombo lifesteal gesit.</p>
                    </div>
                  )}

                  {isMostBanned && (
                    <div className="space-y-3">
                      <p className="flex items-start gap-1.5"><span className="text-red-500 font-black">!</span> <strong>Tigreal (82.4%):</strong> Penyebab utama ban permanen lobi atas dikarenakan flicker kencang Ultimate areanya menyapu formasi tim.</p>
                      
                      {/* Ban rates visual chart */}
                      {renderHeroStatsVisualizer(true)}

                      <p className="flex items-start gap-1.5"><span className="text-red-500 font-black">!</span> <strong>Nolan (75.1%):</strong> Assassin pelopor snowballing tak terbendung jika dilepaskan bebas.</p>
                      <p className="flex items-start gap-1.5"><span className="text-red-500 font-black">!</span> <strong>Fanny (64.8%):</strong> Sangat berbahaya di tangan pemandu kabel profesional.</p>
                    </div>
                  )}
                </div>

                {/* Additional detailed descriptive context */}
                {!isManual && !isWdp && !isPatchItem && !isPatchHero && !isMostPicked && !isMostBanned && (
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-justify mt-4">
                    {article.content}
                  </p>
                )}

              </div>

              {/* Back to news button embedded below guide */}
              <div className="pt-6 border-t border-[#2d1e4d] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#a09bb3] select-none font-bold">
                  <Clock className="w-4 h-4 text-[#ef4444]" />
                  <span>Selesai dibaca dalam durasi {article.readTime}</span>
                </div>

                <button
                  onClick={handleBackToList}
                  className="bg-[#1b122c] hover:bg-[#281b42] text-gray-200 border border-[#3e256a] px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors duration-150 cursor-pointer shadow-md w-full sm:w-auto text-center"
                >
                  Kembali ke Daftar Berita
                </button>
              </div>

            </div>

          </div>

          {/* Right Sidebar Column matching Image 2 exactly */}
          <div className="space-y-6 lg:sticky lg:top-28 select-none z-10">
            
            {/* 1. Artikel Populer widget block */}
            <div className="bg-[#150d22] border border-[#2d1e4c] rounded-2xl p-4 space-y-4">
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight flex items-center gap-1.5 border-b border-[#2d1e4c] pb-2.5">
                <Flame className="w-4 h-4 text-yellow-500 animate-pulse" />
                Artikel Populer
              </h4>

              <div className="space-y-4">
                {popularList.slice(0, 3).map((pa) => (
                  <div
                    key={pa.id}
                    onClick={() => handleSelectArticle(pa)}
                    className="group flex gap-3 cursor-pointer hover:-translate-y-0.5 transition-all duration-150"
                  >
                    {/* Thumbnail decoration block */}
                    <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border border-[#3c256a]/80 shrink-0 relative bg-slate-950">
                      <img referrerPolicy="no-referrer" src={pa.imageUrl} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Metadata text */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                      <h5 className="font-extrabold text-white text-[10px] leading-snug tracking-tight line-clamp-2 group-hover:text-yellow-405 group-hover:text-yellow-400 transition-colors">
                        {pa.title}
                      </h5>
                      <span className="text-[8px] text-[#8170a4] font-black block mt-0.5 uppercase tracking-wide">
                        {pa.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Top Up Game block precisely styled with metallic list borders */}
            <div className="bg-[#150d22] border border-[#2d1e4c] rounded-2xl p-4 space-y-4">
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight flex items-center gap-1.5 border-b border-[#2d1e4c] pb-2.5">
                <FileText className="w-4 h-4 text-[#ef4444]" />
                Top Up Game
              </h4>

              <div className="flex flex-col gap-2">
                {topUpSidebarList.map((gObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onSelectGame) {
                        onSelectGame(gObj.id);
                      }
                    }}
                    className="w-full text-left bg-[#1d1430]/75 hover:bg-[#ef4444]/10 border border-[#2d1e4c] hover:border-[#ef4444] px-4 py-2.5 rounded-lg text-[10px] sm:text-xs font-black text-[#a09bb3] hover:text-white uppercase tracking-wider transition-all shadow duration-100 cursor-pointer flex justify-between items-center group/btn"
                  >
                    <span>{gObj.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover/btn:text-[#ef4444] transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  };

  if (selectedArticle) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 text-left animate-fade-in pb-12">
        {renderFullArticlePage(selectedArticle)}
      </div>
    );
  }

  if (isHomeView) {
    // ----------------------------------------------------
    // COMPACT HOME VIEW (Image 1 Layout)
    // ----------------------------------------------------
    const homeArticles = ARTICLES_DATA.slice(0, 3);
    return (
      <div className="border-t border-[#23173a] pt-12 space-y-8 text-left max-w-7xl mx-auto w-full">
        
        <div className="space-y-1.5 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 font-display uppercase">
            ARTIKEL TERBARU & BERITA GAME
          </h2>
          <p className="text-[11px] sm:text-xs text-[#a09bb3] font-bold leading-relaxed max-w-4xl">
            Dapatkan informasi terbaru seputar dunia game! Temukan panduan lengkap untuk meningkatkan pengalaman bermain, serta berita terkini mengenai promo, update top-up, dan komunitas gamer.
          </p>
        </div>

        {/* Grid 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleSelectArticle(article)}
              className="group flex flex-col justify-between bg-[#19112a] border border-[#2f1f4b]/80 hover:border-[#ef4444] rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-red-500/5 hover:-translate-y-1.5 transition-all duration-300 flex-1 text-left"
            >
              {renderArticleGraphicCover(article)}

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4 bg-[#140e21]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-[#8170a4] font-bold">•</span>
                    <span className="text-[10px] text-gray-400 font-extrabold">{article.author}</span>
                  </div>

                  <h3 className="font-extrabold text-white text-sm sm:text-base leading-snug group-hover:text-[#ef4444] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>

                <div className="pt-3.5 border-t border-[#221838] flex items-center justify-between text-xs text-[#ef4444] font-black">
                  <span className="group-hover:text-red-300 font-sans uppercase text-[10px] tracking-wider">Baca Panduan</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ef4444] group-hover:text-red-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={onViewAll}
            className="bg-[#120b21] hover:bg-[#1a1130] text-gray-200 hover:text-white border border-[#3e276b] px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors duration-150 shadow-md cursor-pointer"
          >
            Lihat Semua Artikel
          </button>
        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // STANDALONE ARTICLES DIRECTORY VIEW
  // ----------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto space-y-10 text-left animate-fade-in pb-12">
      
      {/* 1. Feature Carousels */}
      {mainFeatured && (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] bg-[#19122c] border border-[#302151]/50 group">
          <div className="flex flex-col md:flex-row min-h-[250px] sm:min-h-[360px]">
            
            <div className="flex-1 min-h-[180px] sm:min-h-0 relative select-none bg-indigo-950">
              {renderArticleGraphicCover(mainFeatured)}
              {featuredArticles.length > 1 && (
                <div className="absolute bottom-4 left-6 z-15 flex gap-2">
                  {featuredArticles.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setActiveSlide(idx); }}
                      className={`h-2 transition-all rounded-full ${idx === activeSlide ? 'w-5 bg-yellow-400' : 'w-2 bg-gray-500 hover:bg-white'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between space-y-6 text-left bg-gradient-to-br from-[#1b132a] via-[#150d21] to-[#0c0514]">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-400 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    {mainFeatured.category}
                  </span>
                  <span className="text-gray-400 text-[10px] font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#ef4444]" /> {mainFeatured.date}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white hover:text-yellow-400 transition-colors cursor-pointer leading-tight font-display tracking-tight" onClick={() => handleSelectArticle(mainFeatured)}>
                  {mainFeatured.title}
                </h2>
                
                <p className="text-xs text-gray-350 font-medium leading-relaxed line-clamp-3">
                  {mainFeatured.content}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#2c1d47]">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-black uppercase scale-90 border border-yellow-500/20">
                    {mainFeatured.author[0]}
                  </div>
                  <span>Diposting oleh: <strong className="text-yellow-400">{mainFeatured.author}</strong></span>
                </div>

                <button
                  onClick={() => handleSelectArticle(mainFeatured)}
                  className="bg-[#ef4444] hover:bg-red-650 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer shrink-0"
                >
                  Selesai Membaca <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. Popular Articles Grid */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white uppercase font-display tracking-tight flex items-center gap-2 select-none">
          <Flame className="w-5 h-5 text-yellow-500 animate-pulse" />
          Artikel Populer
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div 
            onClick={() => handleSelectArticle(popularMain)}
            className="lg:col-span-2 group flex flex-col justify-between bg-[#191129] border border-[#302150] rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-400 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
          >
            {renderArticleGraphicCover(popularMain)}

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#150e23] to-[#0e0719]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded font-sans tracking-wide">
                    {popularMain.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-[#ef4444]" /> {popularMain.author}
                  </span>
                  <span className="text-[10px] text-[#554a72] font-black">•</span>
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-yellow-500" /> {popularMain.date}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
                  {popularMain.title}
                </h4>
                
                <p className="text-xs text-gray-450 font-medium leading-relaxed line-clamp-3">
                  {popularMain.content}
                </p>
              </div>

              <div className="pt-3 border-t border-[#211737] flex items-center justify-between text-xs text-yellow-400 font-extrabold uppercase tracking-wider font-sans">
                <span>Pelajari Taktik Ban Hero</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Side List popular */}
          <div className="space-y-4 flex flex-col justify-between">
            {popularList.slice(1, 4).map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelectArticle(article)}
                className="group flex gap-3.5 bg-[#171128] border border-[#2f204c] rounded-xl p-3 cursor-pointer hover:border-[#ef4444] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden border border-[#311c57] shrink-0 relative bg-slate-950">
                  <img referrerPolicy="no-referrer" src={article.imageUrl} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 flex flex-col justify-between text-left min-w-0">
                  <div className="space-y-1.5">
                    <span className="bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 text-[8px] font-black uppercase px-2 py-0.5 rounded-sm">
                      {article.category}
                    </span>
                    <h5 className="font-extrabold text-white text-xs leading-normal line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold mt-1">
                    <span>{article.author}</span>
                    <span className="text-[#3b2d5a]">•</span>
                    <span>{article.date}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 3. Filter list grid */}
      <div className="space-y-6 pt-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2e214d] pb-4 select-none">
          <h3 className="text-lg sm:text-xl font-black text-white uppercase font-display tracking-tight">
            Artikel Terbaru
          </h3>

          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari berita & artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-1.5 border border-[#402a64] rounded-lg bg-[#211832] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-xs text-left"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                (selectedCategory === cat)
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'bg-[#1b122c] text-gray-300 hover:bg-[#2c1a4b] hover:text-white border border-[#3c2560]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-[#2f204c] rounded-2xl bg-[#140e21]">
            <p className="text-xs sm:text-sm text-gray-450 font-bold">Tidak menemukan artikel game matching kata kunci: "{searchTerm}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, visibleCount).map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelectArticle(article)}
                className="group flex flex-col justify-between bg-[#191129] border border-[#2e1d4d] hover:border-[#ef4444] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300 flex-1"
              >
                {renderArticleGraphicCover(article)}

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3.5 bg-[#140e21]">
                  <div className="space-y-1.5">
                    <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block">
                      {article.category}
                    </span>

                    <h4 className="font-extrabold text-white text-xs sm:text-sm leading-snug group-hover:text-[#ef4444] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-[#211737] flex items-center justify-between text-[10px] text-gray-400 font-extrabold">
                    <span className="capitalize">{article.author} • {article.date}</span>
                    <span className="text-[#ef4444] hover:underline uppercase text-[9px] tracking-wider shrink-0 font-extrabold">BACA</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {filteredArticles.length > visibleCount && (
          <div className="text-center pt-6 select-none">
            <button
              onClick={() => setVisibleCount(v => v + 3)}
              className="bg-[#10091d] hover:bg-[#1a0f30] border border-[#3f206e] text-gray-200 hover:text-[#ef4444] px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5 uppercase font-sans"
            >
              <span>Tampilkan Lainnya...</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
