import React, { useState } from 'react';
import { Transaction } from '../types';
import { PAYMENT_METHODS } from '../gamesData';
import { Search, ShieldAlert, History, KeyRound, Copy, Check, Clock, ExternalLink } from 'lucide-react';

interface CekTransaksiProps {
  onSimulatePay: (tx: Transaction) => void;
}

export default function CekTransaksi({ onSimulatePay }: CekTransaksiProps) {
  const [searchId, setSearchId] = useState('');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Demo keys references
  const demoIds = ['JOKI-938210', 'JOKI-482931'];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setTransaction(null);

    try {
      const res = await fetch(`/api/transactions/${searchId.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setTransaction(data);
      } else {
        setErrorMsg('Nomor Invoice tidak ditemukan. Periksa kembali ID Anda atau buat pesanan baru.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Gagal menyambungkan ke server database JOKITIERS.');
    } finally {
      setLoading(false);
    }
  };

  const loadDemoTx = async (id: string) => {
    setSearchId(id);
    setLoading(true);
    setErrorMsg('');
    setTransaction(null);
    try {
      const res = await fetch(`/api/transactions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTransaction(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-emerald-500/15 text-emerald-450 border border-emerald-500/30';
      case 'PENDING':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse';
      case 'FAILED':
        return 'bg-rose-500/15 text-rose-450 border border-rose-500/30';
      default:
        return 'bg-gray-500/15 text-gray-400 border border-gray-500/30';
    }
  };

  const getPaymentMethodLabel = (id: string) => {
    const p = PAYMENT_METHODS.find(method => method.id === id);
    return p ? p.name : id.toUpperCase().replace('_', ' ');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 font-display">
          CEK STATUS TRANSAKSI
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium">
          Lacak status pembelian koin, diamond game Anda, atau status pengerjaan Booster Joki Rank 24 jam otomatis.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl shadow-xl space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Masukkan nomor invoice (contoh: JOKI-482931)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-[#3e2b5e] rounded-xl bg-[#211832] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef4444] text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#ef4444] hover:bg-[#dc2626] hover:shadow-red-500/10 text-white font-extrabold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer glow-red-btn shrink-0"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : 'Cari Invoice'}
          </button>
        </form>

        {/* Demo transactions helper badges */}
        <div className="text-xs text-gray-400 flex flex-wrap items-center gap-2 pt-1 font-medium">
          <span>Demo Invoice Percobaan:</span>
          {demoIds.map(dId => (
            <button
              key={dId}
              onClick={() => loadDemoTx(dId)}
              className="bg-[#211832] hover:bg-[#2e1f48] border border-[#30214c] text-slate-300 font-mono text-xs px-2.5 py-1 rounded cursor-pointer transition-colors"
            >
              {dId}
            </button>
          ))}
        </div>
      </div>

      {/* Validation Message display */}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl text-rose-450 text-xs sm:text-sm font-bold flex gap-2 items-center">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Detail Invoice Result */}
      {transaction && (
        <div className="bg-[#160f22]/90 border border-[#2d2146] rounded-2xl overflow-hidden shadow-2xl animate-scale-up">
          
          {/* Status Header strip */}
          <div className="bg-[#211832] border-b border-[#2d2146] px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div className="space-y-0.5">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-wider block">ID Transaksi / Invoice</span>
              <span className="text-white font-mono font-black text-lg sm:text-xl tracking-tight">{transaction.id}</span>
            </div>
            
            <div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-black shadow-inner uppercase tracking-wider ${getStatusColor(transaction.status)}`}>
                {transaction.status === 'SUCCESS' ? '✓ LUNAS' : transaction.status === 'PENDING' ? '⏳ MENUNGGU' : transaction.status}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left side column: shopping details */}
            <div className="md:col-span-7 space-y-5">
              <h3 className="text-sm font-semibold text-gray-350 border-b border-[#2d2146] pb-2 uppercase tracking-tight">Rincian Data Pesanan</h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 block font-bold mb-0.5">Produk Game</span>
                  <span className="text-white font-bold">{transaction.gameName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold mb-0.5">Item Pembelian</span>
                  <span className="text-[#ef4444] font-bold">{transaction.nominalName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold mb-0.5">User ID / Akun</span>
                  <span className="text-white font-mono font-bold">{transaction.targetId}</span>
                </div>
                {transaction.targetZone && (
                  <div>
                    <span className="text-gray-400 block font-bold mb-0.5">Server / Zone</span>
                    <span className="text-white font-mono font-bold">{transaction.targetZone}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 block font-bold mb-0.5">Waktu Transaksi</span>
                  <span className="text-white font-medium">{formatDate(transaction.createdAt)}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold mb-0.5">Saluran Pembayaran</span>
                  <span className="text-white font-semibold">{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                </div>
              </div>

              {/* Price Details Box */}
              <div className="bg-[#211832] border border-[#2d2146] p-4 rounded-xl space-y-2.5 text-xs sm:text-sm">
                <span className="font-bold text-gray-400 uppercase text-[11px] block tracking-normal">Skema Pembiayaan</span>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Harga Item:</span>
                  <span className="text-white">{formatPrice(transaction.price)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Biaya Admin:</span>
                  <span className="text-white">+{formatPrice(transaction.fee)}</span>
                </div>
                <div className="border-t border-[#3b2a5d] pt-2 mt-1.5 flex justify-between items-center text-sm font-extrabold text-[#ef4444]">
                  <span>Total Tagihan:</span>
                  <span className="text-base font-black text-[#ef4444]">{formatPrice(transaction.totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Right side column: Virtual Account / QR codes & actions */}
            <div className="md:col-span-5 space-y-5 border-t md:border-t-0 md:border-l border-[#2d2146] pt-5 md:pt-0 md:pl-6 text-left">
              <h3 className="text-sm font-semibold text-gray-350 border-b border-[#2d2146] pb-2 uppercase tracking-tight">Status Pembayaran</h3>
              
              {/* QRIS Channel View */}
              {transaction.status === 'PENDING' && transaction.paymentMethod === 'qris' && transaction.qrCodeUrl && (
                <div className="flex flex-col items-center space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                  <div className="w-40 h-40">
                    <img referrerPolicy="no-referrer" src={transaction.qrCodeUrl} alt="Simulated QRIS QR Code" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center text-black">
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded">QRIS SCAN</span>
                    <p className="text-[10px] text-gray-500 mt-1 max-w-[200px]">Pindai dengan e-wallet Anda.</p>
                  </div>
                </div>
              )}

              {/* Bank Virtual Accounts / Payment references */}
              {transaction.status === 'PENDING' && transaction.vaNumber && (
                <div className="bg-[#211832] p-4 rounded-xl border border-[#2d2146] space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold block">Kode VA / Bayar</span>
                    <span className="text-[#ef4444] font-black">{transaction.paymentMethod.toUpperCase().replace('_', ' ')}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 bg-[#110c1a] border border-[#3e2b5e] px-3 py-2 rounded-lg">
                    <span className="font-mono text-sm sm:text-base font-black text-white tracking-widest truncate">
                      {transaction.vaNumber}
                    </span>
                    <button
                      onClick={() => handleCopyText(transaction.vaNumber || '')}
                      className="p-1 px-2.5 rounded bg-[#ef4444] hover:bg-[#dc2626] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-md"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Salin
                    </button>
                  </div>
                </div>
              )}

              {/* If real checkout URL exists */}
              {transaction.status === 'PENDING' && transaction.paymentUrl && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 leading-normal">Membuka halaman pembayaran resmi Midtrans aman:</p>
                  <a
                    href={transaction.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-xs font-black text-center block transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    Bayar via Midtrans Snap <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* automatic payment verification trigger */}
              {transaction.status === 'PENDING' && (
                <div className="space-y-2.5">
                  <div className="bg-purple-500/10 border border-[#ef4444]/20 p-3 rounded-xl text-[11.5px] text-slate-300 leading-relaxed font-semibold">
                    💡 <strong>Verifikasi Otomatis:</strong> Setelah melakukan transfer ke nomor DANA/GoPay <strong className="text-[#ef4444]">089506740917</strong> atau scan QRIS, silakan jalankan modul validasi otomatis di bawah ini untuk mencantumkan nama pengirim/bukti transfer dan memproses pesanan Anda langsung lunas.
                  </div>
                  
                  <button
                    onClick={() => onSimulatePay(transaction)}
                    className="w-full bg-[#ef4444] hover:bg-[#dc2626] hover:shadow-red-500/15 text-white font-black text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md uppercase tracking-wider font-sans"
                  >
                    <Check className="w-4 h-4 text-white stroke-[3px]" />
                    Verifikasi Pembayaran Otomatis
                  </button>
                </div>
              )}

              {/* Success summary status details */}
              {transaction.status === 'SUCCESS' && (
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3px]" />
                    <span>Layanan Selesai Diproses!</span>
                  </div>
                  <p className="text-[11px] text-gray-350 leading-relaxed text-justify">
                    Pesanan Anda telah divalidasi dan langsung dikirim ke server game {transaction.gameName}. Jika Anda memesan Joki Rank, admin booster kami saat ini sedang login untuk mempercepat pengerjaan rank Anda. Terima kasih telah berbelanja di JOKITIERS!
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
