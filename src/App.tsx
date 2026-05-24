import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BannerSlider from './components/BannerSlider';
import PopulerSekarang from './components/PopulerSekarang';
import GamesGrid from './components/GamesGrid';
import TopupDetails from './components/TopupDetails';
import CekTransaksi from './components/CekTransaksi';
import Leaderboard from './components/Leaderboard';
import Kalkulator from './components/Kalkulator';
import Artikel from './components/Artikel';
import AuthModal from './components/AuthModal';
import MidtransSnapMock from './components/MidtransSnapMock';
import Footer from './components/Footer';
import { Game, Transaction } from './types';
import { Zap, Headphones, MessageSquare, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  
  // Navigation & Interactive states
  const [activeTab, setActiveTab] = useState<string>('topup'); // topup, 'cek-transaksi', leaderboard, artikel, kalkulator
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>('1');

  // Authentication states
  const [authModal, setAuthModal] = useState<{ open: boolean; type: 'signin' | 'signup' }>({ open: false, type: 'signin' });
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Billing transaction states
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeCheckoutTransaction, setActiveCheckoutTransaction] = useState<Transaction | null>(null);
  const [showSnapDialog, setShowSnapDialog] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | null }>({ message: '', type: null });

  // Load Games list on initialization from fullstack API
  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch('/api/games');
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        } else {
          console.warn('API games fetch not ok field, importing static games fallback.');
          const fallback = await import('./gamesData');
          setGames(fallback.GAMES_DATA);
        }
      } catch (err) {
        console.warn('Gagal membaca API server, memuat salinan data static lokal.', err);
        const fallback = await import('./gamesData');
        setGames(fallback.GAMES_DATA);
      } finally {
        setLoadingGames(false);
      }
    }
    fetchGames();
  }, []);

  // Submit Order to backend API
  const handleSubmitOrder = async (payload: {
    gameId: string;
    nominalId: string;
    paymentMethodId: string;
    inputFields: Record<string, string>;
    whatsapp: string;
  }) => {
    setCheckoutLoading(true);
    setNotification({ message: '', type: null });
    
    try {
      const response = await fetch('/api/payment/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const transactionResult: Transaction = await response.json();
        
        setActiveCheckoutTransaction(transactionResult);
        setShowSnapDialog(true);
      } else {
        const errDetails = await response.json();
        setNotification({
          message: errDetails.error || 'Terjadi kesalahan sistem saat menghubungi gate pembayaran.',
          type: 'info'
        });
      }
    } catch (err) {
      console.error(err);
      setNotification({
        message: 'Gagal menghubungi server JOKITIERS. Periksa koneksi dev Anda.',
        type: 'info'
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePaymentCompleted = () => {
    setShowSnapDialog(false);
    setNotification({
      message: 'Yay! Pembayaran Anda terverifikasi lunas secara otomatis.',
      type: 'success'
    });

    // Clear detail view & switch to invoice tracker tab
    setSelectedGameId(null);
    setActiveTab('cek-transaksi');

    // Smooth scroll page to look at the invoice
    window.scrollTo({ top: 300, behavior: 'smooth' });

    // Toast auto fade
    setTimeout(() => {
      setNotification({ message: '', type: null });
    }, 5000);
  };

  const showAuth = (mode: 'signin' | 'signup') => {
    setAuthModal({ open: true, type: mode });
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    setAuthModal({ open: false, type: 'signin' });
    setNotification({
      message: `Login berhasil! Selamat datang kembali di JOKITIERS.`,
      type: 'success'
    });
    setTimeout(() => setNotification({ message: '', type: null }), 3000);
  };

  const handleLaunchSimulatePayFromCekStatus = (tx: Transaction) => {
    setActiveCheckoutTransaction(tx);
    setShowSnapDialog(true);
  };

  const selectedGameObj = games.find((g) => g.id === selectedGameId);

  return (
    <div className="min-h-screen bg-[#140e21] flex flex-col justify-between selection:bg-[#ef4444] selection:text-white font-sans relative">
      
      {/* Decorative lightning background glows */}
      <div className="absolute top-1/2 left-0 right-0 h-96 bg-radial-gradient from-purple-900/10 to-transparent pointer-events-none -translate-y-1/2 blur-3xl"></div>

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedGameId(null); // clear sub views if nav tabs clicked
        }}
        openAuth={showAuth}
        userEmail={userEmail}
        onSearch={(query) => {
          setSearchTerm(query);
          if (activeTab !== 'topup') setActiveTab('topup'); // redirect to topup grid on active searches
        }}
      />

      {/* Toast Notification Alert Overlay */}
      {notification.message && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-45 max-w-sm w-full bg-[#1e1531] border border-[#ef4444]/30 p-4 rounded-xl shadow-xl flex items-start gap-3 animate-slide-up text-left">
          <div className="shrink-0 mt-0.5">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-extrabold text-white">Informasi Sistem</p>
            <p className="text-xs text-gray-300 font-medium leading-relaxed mt-0.5">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Main Body Containers */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14 z-10 relative">
        
        {activeTab === 'topup' && (
          <>
            {/* 1. If Game details subpage is selected */}
            {selectedGameObj ? (
              <TopupDetails
                game={selectedGameObj}
                onBack={() => setSelectedGameId(null)}
                onSubmitOrder={handleSubmitOrder}
                loading={checkoutLoading}
              />
            ) : (
              <>
                {/* 2. Standard Topup Home Page view */}
                {/* Carousel Slider */}
                <BannerSlider />

                {/* Popular games banner lists row */}
                <PopulerSekarang onSelectGame={setSelectedGameId} />

                {/* Categories & Full list grids */}
                <div className="space-y-4">
                  <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-display select-none tracking-tight">
                      Semua Layanan Game & Voucher
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      Temukan ratusan opsi pengisian voucher termurah, membership bulanan, serta joki rank andalan.
                    </p>
                  </div>

                  {loadingGames ? (
                    <div className="py-24 text-center flex flex-col items-center justify-center space-y-4">
                      <div className="h-10 w-10 border-4 border-[#ef4444] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs text-gray-400 font-bold">Membuka database katalog JOKITIERS...</p>
                    </div>
                  ) : (
                    <GamesGrid
                      games={games}
                      searchTerm={searchTerm}
                      onSelectGame={setSelectedGameId}
                    />
                  )}
                </div>

                {/* Home Page Articles & Game News Block precisely matching Image 1 */}
                <Artikel 
                  isHomeView={true} 
                  onViewAll={() => {
                    setSelectedArticleId('1');
                    setActiveTab('artikel');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  onSelectGame={(gameId) => {
                    setSelectedGameId(gameId);
                    setActiveTab('topup');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectArticleGlobal={(articleId) => {
                    setSelectedArticleId(articleId);
                    setActiveTab('artikel');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  selectedArticleIdGlobal={selectedArticleId}
                  onBackToHome={() => {
                    setActiveTab('topup');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </>
            )}
          </>
        )}

        {/* 3. Invoice tracker section */}
        {activeTab === 'cek-transaksi' && (
          <CekTransaksi onSimulatePay={handleLaunchSimulatePayFromCekStatus} />
        )}

        {/* 4. Leaderboard Spender section */}
        {activeTab === 'leaderboard' && (
          <Leaderboard />
        )}

        {/* 5. Game guide tips articles section */}
        {activeTab === 'artikel' && (
          <Artikel 
            onSelectGame={(gameId) => {
              setSelectedGameId(gameId);
              setActiveTab('topup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticleGlobal={(articleId) => {
              setSelectedArticleId(articleId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedArticleIdGlobal={selectedArticleId}
            onBackToHome={() => {
              setActiveTab('topup');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 6. MLBB star Calculator section */}
        {activeTab === 'kalkulator' && (
          <Kalkulator />
        )}

      </main>

      {/* Pure Floating Contact Widget (CUSTOMER SERVICE) matching screens */}
      <div className="fixed bottom-6 right-6 z-40 group flex flex-col items-end gap-2.5">
        
        <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none md:pointer-events-auto bg-[#1a1226]/95 border border-[#ef4444]/30 px-3.5 py-2 rounded-xl text-left shadow-2xl relative max-w-[240px]">
          <p className="text-[10px] text-[#ef4444] font-black uppercase tracking-wider">Layanan Pelanggan</p>
          <p className="text-xs text-gray-200 mt-1 font-semibold leading-relaxed">Ada kendala transaksi? Hubungi CS WhatsApp JOKITIERS aktif 24 jam.</p>
          {/* arrow pointer decoration */}
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[#1a1226] border-r border-b border-[#ef4444]/20 rotate-45"></div>
        </div>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ef4444] hover:bg-red-600 text-white px-4.5 py-3.5 rounded-full flex items-center gap-2 font-black text-xs sm:text-sm shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1 hover:scale-103 transition-all duration-200"
        >
          <Headphones className="w-5 h-5 text-white animate-pulse" />
          <span className="font-sans uppercase tracking-wider">Customer Service</span>
        </a>
      </div>

      {/* Registration/Login Form Split-View Overlays Modal */}
      {authModal.open && (
        <AuthModal
          type={authModal.type}
          onClose={() => setAuthModal({ open: false, type: 'signin' })}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Midtrans Snap Popup frame sandbox simulation */}
      {showSnapDialog && activeCheckoutTransaction && (
        <MidtransSnapMock
          transaction={activeCheckoutTransaction}
          onClose={() => setShowSnapDialog(false)}
          onPaymentSuccess={handlePaymentCompleted}
        />
      )}

      {/* Standard brand footer element */}
      <Footer />

    </div>
  );
}
