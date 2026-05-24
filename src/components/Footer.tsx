import React from 'react';
import { Zap, Instagram, Youtube, Phone, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0914] border-t border-[#251a37] text-gray-400 text-sm mt-16 relative overflow-hidden">
      
      {/* Visual Wing Accent (Lightning) in the middle/top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-2 flex justify-between px-10 pointer-events-none opacity-30">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#ef4444] -skew-x-12"></div>
        <div className="w-1/2 h-full bg-gradient-to-l from-transparent to-[#ef4444] skew-x-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Core Value Proportions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-b border-[#251a37] pb-10">
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-lg bg-[#211832] text-[#ef4444] shrink-0 shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Garansi Legal & Aman 100%</h4>
              <p className="text-xs text-gray-400">Seluruh produk bersumber dari penerbit/vendor resmi bergaransi aman bagi akun game Anda.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-lg bg-[#211832] text-[#ef4444] shrink-0 shadow-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Proses Instan Otomatis</h4>
              <p className="text-xs text-gray-400">Teknologi pengisian instan langsung masuk dalam hitungan detik setelah transaksi sukses.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-lg bg-[#211832] text-[#ef4444] shrink-0 shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">Harga Sangat Kompetitif</h4>
              <p className="text-xs text-gray-400">Kami menawarkan katalog top-up diamond dan jasa joki murah dengan diskon melimpah.</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & About column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#ef4444] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-extrabold text-white font-display">
                JOKI<span className="text-[#ef4444]">TIERS</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-justify">
              <strong>JOKITIERS</strong> merupakan tempat Penyedia Layanan Top Up Games termurah, tercepat, dan jasa bimbingan push rank Joki terpercaya Nomor 1 di Indonesia. Kami berdedikasi tinggi menyediakan pelayanan terbaik dan inovatif serta mengutamakan kenyamanan bagi para seluruh pegiat esports nasional. Open layanan otomatis 24 jam nonstop setiap hari!
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base border-l-2 border-[#ef4444] pl-2">Navigasi Utama</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              <li><a href="#nav-topup" className="hover:text-[#ef4444] transition-colors">Topup Catalog</a></li>
              <li><a href="#nav-cek-transaksi" className="hover:text-[#ef4444] transition-colors">Cek Status Transaksi</a></li>
              <li><a href="#nav-leaderboard" className="hover:text-[#ef4444] transition-colors">Top Spender Leaderboard</a></li>
              <li><a href="#nav-artikel" className="hover:text-[#ef4444] transition-colors">Artikel & Informan Game</a></li>
              <li><a href="#nav-kalkulator" className="hover:text-[#ef4444] transition-colors">Rank Star Calculator</a></li>
            </ul>
          </div>

          {/* Socials Connection Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-base border-l-2 border-[#ef4444] pl-2">Hubungi Kami</h4>
            <p className="text-xs text-gray-400">Jika mengalami kendala transaksi atau butuh bantuan admin, silakan hubungi saluran customer service resmi kami:</p>
            
            <div className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Instagram className="w-4 h-4 text-[#ef4444]" />
                <span className="hover:text-white cursor-pointer">@jokitiers_official</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Youtube className="w-4 h-4 text-[#ef4444]" />
                <span className="hover:text-white cursor-pointer">JOKITIERS Gaming</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Phone className="w-4 h-4 text-[#ef4444]" />
                <span className="hover:text-white cursor-pointer">WhatsApp Cs: +62 812-3456-7890</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright spacing */}
        <div className="border-t border-[#1d162a] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} <strong>JOKITIERS</strong>. All rights reserved. Powered by Midtrans API.</span>
          <div className="flex gap-4">
            <span className="hover:text-[#ef4444] cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-[#ef4444] cursor-pointer">Kebijakan Privasi</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
