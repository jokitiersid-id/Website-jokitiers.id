import React, { useState } from 'react';
import { Sparkles, Calculator, HelpCircle, ArrowRight } from 'lucide-react';

export default function Kalkulator() {
  const [currentDivision, setCurrentDivision] = useState('Epic');
  const [currentStars, setCurrentStars] = useState(1);
  const [targetDivision, setTargetDivision] = useState('Legend');
  const [targetStars, setTargetStars] = useState(1);
  
  const divisions = [
    { name: 'Grandmaster', starsPerTier: 5, value: 1, jokiCostPerStar: 4500 },
    { name: 'Epic', starsPerTier: 5, value: 2, jokiCostPerStar: 7000 },
    { name: 'Legend', starsPerTier: 5, value: 3, jokiCostPerStar: 9500 },
    { name: 'Mythic', starsPerTier: 25, value: 4, jokiCostPerStar: 22000 },
    { name: 'Mythical Honor', starsPerTier: 25, value: 5, jokiCostPerStar: 32000 },
    { name: 'Mythical Glory', starsPerTier: 50, value: 6, jokiCostPerStar: 45000 },
  ];

  const handleCalculate = () => {
    const curDiv = divisions.find(d => d.name === currentDivision);
    const tarDiv = divisions.find(d => d.name === targetDivision);

    if (!curDiv || !tarDiv) return { starsNeeded: 0, estimatedCost: 0, invalid: true };

    // Calculate absolute values relative
    const currentAbsoluteValue = (curDiv.value * 25) + currentStars;
    const targetAbsoluteValue = (tarDiv.value * 25) + targetStars;

    if (currentAbsoluteValue >= targetAbsoluteValue) {
      return { starsNeeded: 0, estimatedCost: 0, targetReached: true };
    }

    const starsNeeded = targetAbsoluteValue - currentAbsoluteValue;
    
    // Estimate cost based on average of tier prices
    let estimatedCost = 0;
    let tempValue = currentAbsoluteValue;

    for (let i = 0; i < starsNeeded; i++) {
      // Find current division code
      const currentValTierCode = Math.min(6, Math.max(1, Math.floor(tempValue / 25)));
      const matchingDivObj = divisions.find(d => d.value === currentValTierCode) || curDiv;
      estimatedCost += matchingDivObj.jokiCostPerStar;
      tempValue++;
    }

    return { starsNeeded, estimatedCost };
  };

  const results = handleCalculate();

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 font-display">
          KALKULATOR ESTIMASI JOKI MLBB
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium">
          Dapatkan kemudahan mengukur target bintang rank Anda serta ketahui taksiran biaya Joki terendah dengan tepat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Input form panels */}
        <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-[#2d2146] pb-3 mb-1">
            <Calculator className="w-5 h-5 text-red-500" />
            <h3 className="font-extrabold text-white text-base">Atur Detail Rank Anda</h3>
          </div>

          {/* Current Rank settings */}
          <div className="space-y-4">
            <span className="text-xs text-[#ef4444] font-extrabold uppercase tracking-wide block">1. Posisi Rank Saat Ini</span>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">Divisi Saat Ini</label>
                <select
                  value={currentDivision}
                  onChange={(e) => setCurrentDivision(e.target.value)}
                  className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                >
                  {divisions.slice(0, 5).map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">Bintang</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={currentStars}
                  onChange={(e) => setCurrentStars(parseInt(e.target.value) || 1)}
                  className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Target Rank Settings */}
          <div className="space-y-4 pt-2">
            <span className="text-xs text-[#ef4444] font-extrabold uppercase tracking-wide block">2. Target Rank Impian</span>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">Divisi Target</label>
                <select
                  value={targetDivision}
                  onChange={(e) => setTargetDivision(e.target.value)}
                  className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                >
                  {divisions.map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">Bintang</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={targetStars}
                  onChange={(e) => setTargetStars(parseInt(e.target.value) || 1)}
                  className="block w-full px-3 py-2 border border-[#3e2b5e] rounded-lg bg-[#211832] text-white focus:outline-none focus:ring-1 focus:ring-[#ef4444] text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output details panel cards */}
        <div className="p-5 sm:p-6 bg-[#160f22]/90 border border-[#2d2146] rounded-2xl shadow-xl flex flex-col justify-between text-left space-y-6 h-full min-h-[300px]">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 border-b border-[#2d2146] pb-3 mb-1">
              <Sparkles className="w-5 h-5 text-[#ef4444]" />
              <h3 className="font-extrabold text-white text-base">Hasil Estimasi Kalkulasi</h3>
            </div>

            {results.targetReached ? (
              <div className="py-6 text-center text-emerald-400 font-bold space-y-2">
                <span className="text-3xl">🥳</span>
                <p className="text-sm leading-normal">Luar Biasa! Posisi rank impian Anda telah terlampaui dari posisi target saat ini!</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="flex justify-between items-center bg-[#211832] p-3 rounded-lg border border-[#2d2146]">
                  <span className="text-gray-400 font-medium">Bintang Dibutuhkan:</span>
                  <span className="font-mono text-base sm:text-lg font-black text-[#ef4444]">
                    {results.starsNeeded} ⭐️
                  </span>
                </div>

                <div className="flex justify-between items-center bg-[#211832] p-3 rounded-lg border border-[#2d2146]">
                  <span className="text-gray-400 font-medium">Kompensasi Joki Termurah:</span>
                  <div className="text-right">
                    <span className="font-mono text-base sm:text-lg font-black text-[#ef4444] block">
                      {formatPrice(results.estimatedCost || 0)}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium block">Estimasi Waktu Pengerjaan: ~{(results.starsNeeded || 1) * 2} Jam</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick promotion booking link trigger */}
          {!results.targetReached && (
            <div className="space-y-4 pt-4 border-t border-[#2d2146]">
              <p className="text-xs text-gray-400 leading-normal">
                Dikerjakan otomatis oleh para Pro Player tier Mythical Immortal dengan kecepatan proses pengerjaan win streak tinggi tanpa kendala.
              </p>
              <button
                onClick={() => {
                  // Scroll top to show ml joki selections
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-red-500/10 cursor-pointer flex items-center justify-center gap-1.5 uppercase"
              >
                Pesan Joki Rank Sekarang
                <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
