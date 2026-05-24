import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

interface AuthModalProps {
  type: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function AuthModal({ type: initialType, onClose, onSuccess }: AuthModalProps) {
  const [authType, setAuthType] = useState<'signin' | 'signup'>(initialType);
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaRefreshing, setCaptchaRefreshing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authType === 'signup') {
      if (!fullName.trim() || !username.trim() || !email.trim() || !whatsapp.trim() || !password || !confirmPassword) {
        setErrorMsg('Silakan lengkapi seluruh kolom pendaftaran.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Konfirmasi kata sandi tidak cocok.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Anda harus menyetujui Syarat & Ketentuan JOKITIERS.');
        return;
      }
      if (!captchaChecked) {
        setErrorMsg('Harap centang verifikasi reCAPTCHA.');
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setErrorMsg('Harap masukkan alamat email dan kata sandi Anda.');
        return;
      }
    }

    setLoading(true);
    // Simulate secure network delays
    setTimeout(() => {
      setLoading(false);
      onSuccess(email || `${username}@jokitiers.com`);
    }, 1200);
  };

  const handleRefreshCaptcha = () => {
    setCaptchaRefreshing(true);
    setCaptchaChecked(false);
    setTimeout(() => setCaptchaRefreshing(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
      
      {/* Container holding registration split */}
      <div className="w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-[#1a1228] border border-[#2d2146] sm:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl animate-scale-up">
        
        {/* Left Side: Form Container */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[100vh] sm:max-h-[85vh] text-left">
          
          <div className="space-y-6">
            {/* Close Button & header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-[#ef4444] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="font-extrabold text-[#eee] text-sm font-display">
                  JOKI<span className="text-[#ef4444]">TIERS</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Custom Header Title details matching user’s screenshot */}
            <div>
              <h2 className="text-2xl font-black text-white leading-none font-display">
                {authType === 'signup' ? 'Daftar' : 'Masuk'}
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-1.5">
                {authType === 'signup' 
                  ? 'Masukkan informasi pendaftaran yang valid.' 
                  : 'Gunakan detail akun Anda untuk masuk sebagai member JOKITIERS.'}
              </p>
            </div>

            {/* Sub-Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authType === 'signup' ? (
                <>
                  {/* Full Name & Username row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-350 text-gray-300">Nama lengkap</label>
                      <input
                        type="text"
                        placeholder="Nama lengkap"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full px-3.5 py-2 sm:py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-300">Username</label>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full px-3.5 py-2 sm:py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Alamat email</label>
                    <input
                      type="email"
                      placeholder="Alamat email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-3.5 py-2 sm:py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                    />
                  </div>

                  {/* No Whatsapp with simulated +62 flag drop */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 font-sans">Nomor whatsapp</label>
                    <div className="flex rounded-xl overflow-hidden border border-[#3e2b5e] bg-[#251d33]">
                      <div className="flex items-center gap-1.5 px-3 border-r border-[#3e2b5e] bg-[#21182d] shrink-0 text-xs text-white">
                        <span className="text-sm">🇮🇩</span>
                        <span className="font-bold">+62</span>
                      </div>
                      <input
                        type="text"
                        placeholder="81234567890"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9]/g, ''))}
                        className="block w-full px-4 py-2 sm:py-2.5 bg-[#251d33] text-white placeholder-gray-500 focus:outline-none text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Passwords Toggles row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 relative">
                      <label className="text-xs font-bold text-gray-300">Kata sandi</label>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          placeholder="Kata sandi"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full pl-3.5 pr-10 py-2 sm:py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                        >
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <label className="text-xs font-bold text-gray-300">Konfirmasi kata sandi</label>
                      <div className="relative">
                        <input
                          type={showConfPass ? 'text' : 'password'}
                          placeholder="Konfirmasi kata sandi"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pl-3.5 pr-10 py-2 sm:py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfPass(!showConfPass)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                        >
                          {showConfPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms check */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 border-[#3e2b5e] text-[#ef4444] focus:ring-[#ef4444] rounded cursor-pointer"
                    />
                    <label htmlFor="agree-terms" className="text-[10px] sm:text-xs text-gray-400 leading-normal select-none">
                      Saya setuju dengan <span className="text-[#ef4444] underline hover:text-red-350 cursor-pointer">Syarat dan Ketentuan</span> dan <span className="text-[#ef4444] underline hover:text-red-350 cursor-pointer">Kebijakan Pribadi</span>.
                    </label>
                  </div>

                  {/* reCAPTCHA sandbox matching user’s image screenshot exactly */}
                  <div className="bg-[#21182e] border border-[#30214b] p-3 rounded-xl flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="recaptcha-check"
                        checked={captchaChecked}
                        disabled={captchaRefreshing}
                        onChange={(e) => setCaptchaChecked(e.target.checked)}
                        className="w-5 h-5 border-[#3c2859] rounded cursor-pointer text-[#ef4444] focus:ring-transparent focus:ring-offset-0 shrink-0"
                      />
                      <label htmlFor="recaptcha-check" className="text-xs font-bold text-gray-300 select-none cursor-pointer">
                        I'm not a robot
                      </label>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Refresh capability widget */}
                      <button
                        type="button"
                        onClick={handleRefreshCaptcha}
                        className={`p-1 rounded-md text-gray-400 hover:text-white cursor-pointer ${captchaRefreshing ? 'animate-spin' : ''}`}
                      >
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {/* Recaptcha graphic stamp logo */}
                      <div className="text-right flex flex-col items-center shrink-0">
                        <img referrerPolicy="no-referrer" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA logo" className="w-7 h-7 object-contain opacity-75" />
                        <span className="text-[7px] text-gray-500 font-mono tracking-tighter block mt-0.5">reCAPTCHA privacy</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300">Alamat email</label>
                    <input
                      type="email"
                      placeholder="Alamat email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-3.5 py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1 relative">
                    <label className="text-xs font-bold text-gray-300">Kata sandi</label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        placeholder="Kata sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-3.5 pr-10 py-2.5 border border-[#3e2b5e] rounded-xl bg-[#251d33] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Validation error msg */}
              {errorMsg && (
                <div className="bg-red-500/15 border border-red-500/30 p-2.5 rounded-lg text-red-400 text-xs font-bold">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ef4444] hover:bg-[#dc2626] hover:shadow-red-500/10 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition-all block text-center uppercase tracking-wider glow-red-btn cursor-pointer"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : authType === 'signup' ? (
                  'Daftar font-sans'
                ) : (
                  'Masuk font-sans'
                )}
              </button>
            </form>
          </div>

          {/* Toggle state footer links */}
          <div className="pt-6 border-t border-[#2d2146] text-center text-xs text-gray-400">
            {authType === 'signup' ? (
              <p>
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthType('signin'); setErrorMsg(''); }}
                  className="text-[#ef4444] font-black underline hover:text-red-400 cursor-pointer"
                >
                  Masuk
                </button>
              </p>
            ) : (
              <p>
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthType('signup'); setErrorMsg(''); }}
                  className="text-[#ef4444] font-black underline hover:text-red-400 cursor-pointer"
                >
                  Daftar
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Right Side: Glowing Pure Red side layout exactly as in signup image */}
        <div className="hidden md:flex md:col-span-5 bg-[#ef4444] items-center justify-center p-12 text-center relative overflow-hidden">
          {/* subtle abstract grids */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          
          <div className="space-y-4 max-w-xs text-white z-10 select-none">
            <div className="w-16 h-16 rounded-full bg-[#111] text-[#ef4444] flex items-center justify-center shadow-lg mx-auto">
              <Zap className="w-9 h-9 fill-[#ef4444] stroke-[2.5px]" />
            </div>
            <h3 className="text-2xl font-black tracking-tight leading-tight uppercase font-display text-white">
              Satu Akun Solusi Push Rank
            </h3>
            <p className="text-xs text-white/90 font-semibold leading-relaxed">
              Daftarkan diri Anda hari ini di JOKITIERS untuk melacak seluruh transaksi lunas, menyimpan data UID MLBB / FF teratur, dan menikmati asisten kalkulator prioritas tinggi.
            </p>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-black/10 blur-xl pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
}
