import React, { useState } from 'react';
import { Game, PaymentGateway, NominalItem } from '../types';
import { PAYMENT_METHODS } from '../gamesData';
import { ChevronLeft, ShieldCheck, HelpCircle, ArrowRight, Smartphone, Landmark, CheckCircle, Store, QrCode } from 'lucide-react';

interface TopupDetailsProps {
  game: Game;
  onBack: () => void;
  onSubmitOrder: (orderPayload: {
    gameId: string;
    nominalId: string;
    paymentMethodId: string;
    inputFields: Record<string, string>;
    whatsapp: string;
  }) => void;
  loading: boolean;
}

export default function TopupDetails({ game, onBack, onSubmitOrder, loading }: TopupDetailsProps) {
  const [inputFields, setInputFields] = useState<Record<string, string>>({});
  const [selectedNominal, setSelectedNominal] = useState<NominalItem | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentGateway | null>(null);
  const [whatsapp, setWhatsapp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (key: string, value: string) => {
    setInputFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleBuyNow = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Verification
    // Check account inputs
    const missingFields = game.inputFields.filter(f => !inputFields[f.key]?.trim());
    if (missingFields.length > 0) {
      setErrorMsg(`Silakan lengkapi data akun Anda (${missingFields.map(m => m.label).join(', ')}).`);
      return;
    }

    // Check Nominal Selected
    if (!selectedNominal) {
      setErrorMsg('Pilih nominal / item top-up terlebih dahulu.');
      return;
    }

    // Check Payment Method
    if (!selectedPayment) {
      setErrorMsg('Silakan pilih metode pembayaran Anda.');
      return;
    }

    // Check Whatsapp
    if (!whatsapp.trim() || whatsapp.length < 9) {
      setErrorMsg('Nomor WhatsApp wajib diisi dengan valid (minimal 9 digit) untuk menerima rincian invoice.');
      return;
    }

    // Call submit handler
    onSubmitOrder({
      gameId: game.id,
      nominalId: selectedNominal.id,
      paymentMethodId: selectedPayment.id,
      inputFields,
      whatsapp
    });
  };

  // Grouped Payment Gateways
  const paymentGroups = {
    'QR Code': PAYMENT_METHODS.filter(p => p.group === 'QR Code'),
    'E-Wallet': PAYMENT_METHODS.filter(p => p.group === 'E-Wallet'),
    'Virtual Account': PAYMENT_METHODS.filter(p => p.group === 'Virtual Account'),
    'Convenience Store': PAYMENT_METHODS.filter(p => p.group === 'Convenience Store')
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'QR Code': return <QrCode className="w-5 h-5 text-red-500" />;
      case 'E-Wallet': return <Smartphone className="w-5 h-5 text-red-500" />;
      case 'Virtual Account': return <Landmark className="w-5 h-5 text-red-500" />;
      default: return <Store className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Detail Header / Brand Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0d0716] border border-[#2d2146] shadow-xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-black/40 hover:bg-[#ef4444] hover:text-white border border-white/10 hover:border-transparent text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer z-20"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </button>

        {/* Grayed background banner */}
        <div className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none" style={{ backgroundImage: `url(${game.bannerImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0818]/95 via-[#0e0818]/70 to-[#0e0818]/45 pointer-events-none"></div>

        {/* Text information column */}
        <div className="text-center md:text-left space-y-2.5 z-10 w-full md:pl-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            {game.name}
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm">
            Publisher Resmi: <strong className="text-gray-200">{game.developer}</strong> &bull; Layanan Aktif Otomatis 24 Jam
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
            <span className="bg-[#ef4444]/10 text-[#ef4444] text-[10px] font-bold px-2.5 py-1 rounded border border-[#ef4444]/20 uppercase">Proses Instan</span>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-500/20 uppercase">Legal & Aman</span>
            <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded border border-blue-500/20 uppercase">Midtrans Gateway</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleBuyNow} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Columns 1, 2, 3 panels */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Akun User Data */}
          <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-[#2d2146] pb-3">
              <div className="w-7 h-7 rounded-full bg-[#ef4444] text-white font-extrabold text-sm flex items-center justify-center">1</div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display">Masukkan Data Akun</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {game.inputFields.map((field) => (
                <div key={field.key} className="space-y-1.5 text-left">
                  <label className="text-xs sm:text-sm font-bold text-gray-300 flex items-center gap-1">
                    {field.label}
                    <span className="text-red-500">*</span>
                  </label>

                  {field.type === 'select' && field.options ? (
                    <select
                      value={inputFields[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent text-sm"
                    >
                      <option value="">-- Pilih {field.label} --</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={inputFields[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent text-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Custom Warning message detail specifically for JOKI Rank option */}
            {game.id === 'joki-rank' && (
              <div className="bg-red-500/10 border border-red-500/30 p-3.5 rounded-lg text-red-200 text-xs text-left leading-relaxed">
                ⚠️ <strong>PENTING:</strong> Matikan verifikasi dua langkah (2FA) di akun game Anda sementara untuk mempermudah booster melakukan login cepat. Akun Anda diproteksi dengan keamanan privasi tinggi oleh sistem JOKITIERS.
              </div>
            )}
          </div>

          {/* STEP 2: Nominal Layanan */}
          <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-[#2d2146] pb-3">
              <div className="w-7 h-7 rounded-full bg-[#ef4444] text-white font-extrabold text-sm flex items-center justify-center">2</div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display">Pilih Nominal Layanan</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {game.nominals.map((nom) => {
                const isSelected = selectedNominal?.id === nom.id;
                return (
                  <div
                    key={nom.id}
                    onClick={() => { setSelectedNominal(nom); setSelectedPayment(null); }}
                    className={`relative p-4 rounded-xl border cursor-pointer flex flex-col justify-between gap-2.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#ef4444] bg-[#271d3a] shadow-inner'
                        : 'border-[#2d2146] bg-[#211832] hover:bg-[#251b3a]'
                    }`}
                  >
                    {nom.badge && (
                      <span className="absolute top-1.5 right-1.5 bg-[#ef4444] text-white font-black text-[8px] px-1.5 py-0.5 rounded uppercase leading-none scale-90">
                        {nom.badge}
                      </span>
                    )}

                    <div className="space-y-0.5">
                      <span className="text-[10px] sm:text-xs font-bold text-gray-400 block uppercase">Pilihan Kategori</span>
                      <h4 className="font-extrabold text-[#f3f4f6] text-xs sm:text-sm leading-tight group-hover:text-red-400">
                        {nom.name}
                      </h4>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-gray-400 block line-through">
                        {formatPrice(nom.originalPrice)}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#ef4444]">
                        {formatPrice(nom.price)}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute bottom-1 right-1">
                        <CheckCircle className="w-4 h-4 text-[#ef4444] fill-black" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Metode Pembayaran */}
          <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-[#2d2146] pb-3">
              <div className="w-7 h-7 rounded-full bg-[#ef4444] text-white font-extrabold text-sm flex items-center justify-center">3</div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display">Pilih Metode Pembayaran</h2>
            </div>

            {!selectedNominal ? (
              <div className="py-8 text-center text-gray-400 text-xs sm:text-sm border border-dashed border-[#3c2a5c] rounded-xl">
                🔒 Harap pilih Nominal Layanan di atas terlebih dahulu untuk memunculkan daftar pembayaran & tagihan lengkap.
              </div>
            ) : (
              <div className="space-y-6 text-left">
                {Object.entries(paymentGroups).map(([groupName, list]) => (
                  <div key={groupName} className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                      {getGroupIcon(groupName)}
                      <span>{groupName}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {list.map((gateway) => {
                        const isSelected = selectedPayment?.id === gateway.id;
                        const subtotal = selectedNominal.price + gateway.fee;
                        return (
                          <div
                            key={gateway.id}
                            onClick={() => setSelectedPayment(gateway)}
                            className={`p-4 rounded-xl border cursor-pointer select-none flex items-center justify-between gap-4 transition-all ${
                              isSelected
                                ? 'border-[#ef4444] bg-[#271d3a]'
                                : 'border-[#2d2146] bg-[#211832] hover:bg-[#251b3a]'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="text-xs sm:text-sm font-extrabold text-white block">
                                {gateway.id.toUpperCase().replace('_', ' ')}
                              </span>
                              <span className="text-[10px] sm:text-xs text-gray-400 block font-medium">
                                Biaya Admin: +{formatPrice(gateway.fee)}
                              </span>
                            </div>

                            <div className="text-right space-y-0.5 shrink-0">
                              <span className="text-[10px] text-gray-400 block font-medium">Total Pembayaran</span>
                              <span className="text-xs sm:text-sm font-black text-[#ef4444]">
                                {formatPrice(subtotal)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side Sticky checkout action Box */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          {/* STEP 4: Checkout details & Whatsapp field */}
          <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl space-y-5 shadow-2xl text-left">
            <div className="flex items-center gap-2.5 border-b border-[#2d2146] pb-3">
              <div className="w-7 h-7 rounded-full bg-[#ef4444] text-white font-extrabold text-sm flex items-center justify-center">4</div>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-display">Konfirmasi & No. WhatsApp</h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 081234567890"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9]/g, ''))}
                  className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:border-transparent text-xs sm:text-sm"
                />
                <p className="text-[10px] text-gray-400 leading-normal">
                  Rincian pesanan dan progres joki rank akan dikirim otomatis ke nomor WhatsApp Anda.
                </p>
              </div>
            </div>

            {/* Bill Summary Block */}
            {selectedNominal && (
              <div className="bg-[#211832] border border-[#2d2146] p-3.5 rounded-xl space-y-2 text-xs sm:text-sm">
                <span className="text-[11px] font-bold text-gray-450 uppercase block tracking-wider mb-2 text-[#ef4444]">Rincian Belanja</span>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Item:</span>
                  <span className="text-white font-semibold truncate max-w-[140px]">{selectedNominal.name}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Harga:</span>
                  <span className="text-white underline">{formatPrice(selectedNominal.price)}</span>
                </div>
                {selectedPayment && (
                  <>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-400">Admin Fee:</span>
                      <span className="text-white">{formatPrice(selectedPayment.fee)}</span>
                    </div>
                    <div className="border-t border-[#372654] my-2 pt-2 flex justify-between items-center text-sm font-extrabold text-[#ef4444]">
                      <span>Grand Total:</span>
                      <span className="text-base font-black text-[#ef4444] shadow-sm">
                        {formatPrice(selectedNominal.price + selectedPayment.fee)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Display validation messages dynamically right before button */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-red-400 text-xs font-bold leading-normal">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Expansive action trigger */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-black uppercase text-xs sm:text-sm tracking-widest cursor-pointer shadow-lg transition-all transform active:scale-98 glow-red-btn flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-red-800 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-[#ef4444] to-[#dc2626]'
              }`}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses Tagihan...
                </>
              ) : (
                <>
                  Beli Sekarang
                  <ArrowRight className="w-4 h-4 text-white stroke-[3px]" />
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 justify-center py-1 text-[10px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sistem Pembayaran Aman & Terenkripsi</span>
            </div>
          </div>
          
        </div>

      </form>
    </div>
  );
}
