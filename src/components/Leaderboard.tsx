import React from 'react';
import { LEADERBOARD_USERS } from '../gamesData';
import { Trophy, Award, Crown, Gift } from 'lucide-react';

export default function Leaderboard() {
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-red-400 to-rose-600 border-red-300 shadow-red-500/20';
      case 2: return 'from-slate-300 to-slate-500 border-slate-200 shadow-slate-500/20';
      case 3: return 'from-amber-600 via-amber-700 to-amber-800 border-amber-500 shadow-amber-700/20';
      default: return 'from-[#2e234c] to-[#1f1636] border-[#3c2a68] shadow-transparent';
    }
  };

  const getAvatarInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 font-display">
          LEADERBOARD TOP SPENDER
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium font-sans">
          Apresiasi tertinggi bagi para loyalis gamers setia JOKITIERS. Update data dihitung kumulasi otomatis setiap akhir bulan.
        </p>
      </div>

      {/* Top 3 Spenders Highlight Columns (Podium) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        
        {/* SECOND PLACE (Rank 2) */}
        <div className="order-2 md:order-1 bg-[#1a1228]/85 border border-[#2d2146] p-6 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-slate-300 flex items-center justify-center text-white font-mono font-black text-lg shadow-lg">
              {getAvatarInitials(LEADERBOARD_USERS[1].username)}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-500 text-white font-black text-xs px-2 py-0.5 rounded-full border border-slate-300">
              #2
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-white text-sm sm:text-base truncate">{LEADERBOARD_USERS[1].username}</h3>
            <p className="text-xs text-[#ef4444] font-black">{formatPrice(LEADERBOARD_USERS[1].totalSpends)}</p>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Gamer Elite</span>
        </div>

        {/* FIRST PLACE CHAMPION (Rank 1) */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-[#231a3d] to-[#120a20] border-2 border-[#ef4444] p-8 rounded-2xl text-center space-y-4 shadow-2xl transform md:-translate-y-4 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] animate-bounce">
            <Crown className="w-10 h-10 fill-red-550 fill-red-500 text-red-500" />
          </div>
          <div className="relative inline-block pt-1">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 border-2 border-red-300 flex items-center justify-center text-white font-mono font-black text-2xl shadow-lg ring-4 ring-red-500/20">
              {getAvatarInitials(LEADERBOARD_USERS[0].username)}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full border border-red-300">
              #1
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-white text-base sm:text-lg truncate">{LEADERBOARD_USERS[0].username}</h3>
            <p className="text-sm text-[#ef4444] font-black tracking-wide">{formatPrice(LEADERBOARD_USERS[0].totalSpends)}</p>
          </div>
          <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-550/20 px-2.5 py-1 rounded font-bold uppercase tracking-widest inline-block">SULTAN UTAMA</span>
        </div>

        {/* THIRD PLACE (Rank 3) */}
        <div className="order-3 bg-[#1a1228]/85 border border-[#2d2146] p-6 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-500 flex items-center justify-center text-white font-mono font-black text-lg shadow-lg">
              {getAvatarInitials(LEADERBOARD_USERS[2].username)}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-black text-xs px-2 py-0.5 rounded-full border border-amber-500">
              #3
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-white text-sm sm:text-base truncate">{LEADERBOARD_USERS[2].username}</h3>
            <p className="text-xs text-[#ef4444] font-black">{formatPrice(LEADERBOARD_USERS[2].totalSpends)}</p>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Gamer Pro</span>
        </div>

      </div>

      {/* Spender List Table module */}
      <div className="bg-[#160f22]/90 border border-[#2d2146] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 sm:px-6 py-4 border-b border-[#2d2146] flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 uppercase font-[#ef4444]">
            <Award className="w-4 h-4 text-[#ef4444]" /> Detail Peringkat Bulan Ini No. 4 - No. 5
          </h3>
          <span className="text-[10px] text-gray-400 font-medium font-sans">Bulan: Mei 2026</span>
        </div>

        <div className="divide-y divide-[#2d2146]">
          {LEADERBOARD_USERS.slice(3).map((user) => (
            <div key={user.rank} className="px-5 sm:px-6 py-4.5 flex items-center justify-between hover:bg-[#201833]/30 transition-all">
              <div className="flex items-center gap-4">
                {/* rank tag */}
                <span className="font-mono font-black text-sm text-gray-400 w-5">#{user.rank}</span>
                
                {/* Avatar sphere */}
                <div className="w-10 h-10 rounded-full bg-[#271c3c] border border-gray-600 flex items-center justify-center text-white text-xs font-mono font-bold">
                  {getAvatarInitials(user.username)}
                </div>

                <div className="text-left">
                  <span className="font-bold text-white text-xs sm:text-sm block">{user.username}</span>
                  <span className="text-[10px] text-gray-400 font-semibold block">Member Terdaftar</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs sm:text-sm font-black text-[#ef4444]">{formatPrice(user.totalSpends)}</span>
                <span className="text-[9px] text-gray-400 block font-bold uppercase">Total Spend</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prize promo campaign banner card */}
      <div className="bg-gradient-to-r from-[#211734] via-[#2a1d48] to-[#211734] border border-[#ef4444]/20 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 text-left shadow-xl">
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
            <Gift className="w-5 h-5 text-red-400" /> EVENT TOP SPENDER JOKITIERS!
          </h3>
          <p className="text-xs text-gray-300 max-w-xl leading-relaxed font-sans font-medium">
            Menangkan hadiah saldo tunai Rp 1.500.000 + Merchandise eksklusif JOKITIERS Gaming untuk 3 orang beruntung di akhir bulan dengan transaksi terbanyak! Daftar akun dan raih winstreak topup Anda sekarang juga.
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#ef4444] hover:bg-[#dc2626] hover:shadow-red-500/10 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg shrink-0 transition-all glow-red-btn cursor-pointer uppercase flex items-center gap-1"
        >
          Top Up Sekarang
        </button>
      </div>

    </div>
  );
}
