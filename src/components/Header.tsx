import React, { useState } from 'react';
import { Search, History, Trophy, FileText, Calculator, AlignJustify, X, LogIn, UserPlus, Zap } from 'lucide-react';

const logoImg = '/images/jokitiers_logo_1779412799309.png';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuth: (tab: 'signin' | 'signup') => void;
  userEmail: string | null;
  onSearch: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, openAuth, userEmail, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navItems = [
    { id: 'topup', label: 'Topup', icon: Zap },
    { id: 'cek-transaksi', label: 'Cek Transaksi', icon: History },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'artikel', label: 'Artikel', icon: FileText },
    { id: 'kalkulator', label: 'Kalkulator', icon: Calculator },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#130d1d] border-b border-[#251a37] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => handleNavClick('topup')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#ef4444]/50 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.35)] transform hover:scale-105 transition-transform duration-200 bg-[#171124]">
              <img src={logoImg} alt="JOKITIERS Logo" className="w-full h-full object-cover scale-102 select-none" referrerPolicy="no-referrer" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-white font-display">
              JOKI<span className="text-[#ef4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">TIERS</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari Game atau Voucher..."
              value={searchVal}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 sm:py-2.5 border border-[#3c2a57] rounded-lg bg-[#211832] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent text-sm transition-all duration-150"
            />
          </div>

          {/* Nav Items - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#ef4444] text-white shadow-md shadow-red-500/20'
                      : 'text-gray-300 hover:bg-[#251a37] hover:text-[#ef4444]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Actions / Auth - Desktop */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {userEmail ? (
              <div className="flex items-center gap-2 bg-[#211832] border border-[#3e2b5e] px-4 py-2 rounded-lg text-sm text-[#eee]">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-mono text-xs">{userEmail.split('@')[0]}</span>
              </div>
            ) : (
              <>
                <button
                  id="btn-sign-in"
                  onClick={() => openAuth('signin')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </button>
                <button
                  id="btn-sign-up"
                  onClick={() => openAuth('signup')}
                  className="flex items-center gap-1.5 bg-[#ef4444] text-white px-4 py-2 rounded-lg text-sm font-extrabold shadow-md hover:bg-[#dc2626] hover:shadow-red-500/10 cursor-pointer glow-red-btn"
                >
                  <UserPlus className="w-4 h-4" />
                  Daftar
                </button>
              </>
            )}
          </div>

          {/* Burger Menu Button - Tablet/Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#211832] focus:outline-none focus:ring-2 focus:ring-[#ef4444] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <AlignJustify className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar & Menu Dropdown */}
      <div className={`lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-3 bg-[#171221] border-t border-[#251a37]">
          {/* Search Bar - Mobile */}
          <div className="relative md:hidden">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari Game atau Voucher..."
              value={searchVal}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-[#3c2a57] rounded-lg bg-[#211832] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-sm"
            />
          </div>

          {/* Nav Items - Mobile */}
          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`m-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive ? 'bg-[#ef4444] text-white shadow-lg' : 'text-gray-300 bg-[#211832] hover:bg-[#251a37]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Auth Info - Mobile */}
          <div className="pt-2 border-t border-[#251a37] flex items-center justify-between gap-4">
            {userEmail ? (
              <div className="flex items-center gap-1.5 py-1 text-gray-300 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                ID Member: <span className="font-mono text-[#ef4444]">{userEmail.split('@')[0]}</span>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                <button
                  id="m-btn-login"
                  onClick={() => { openAuth('signin'); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-[#3c2a57] text-gray-300 py-2 rounded-lg text-xs font-bold hover:bg-[#211832]"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Masuk
                </button>
                <button
                  id="m-btn-register"
                  onClick={() => { openAuth('signup'); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#ef4444] text-white py-2 rounded-lg text-xs font-extrabold shadow-md hover:bg-[#dc2626]"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
