import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerTopup = '/images/jokitiers_banner_topup_1779412841630.png';
const bannerJoki = '/images/jokitiers_banner_joki_1779412822064.png';

export default function BannerSlider() {
  const slides = [
    {
      id: 1,
      image: bannerTopup,
      alt: "JOKITIERS - Top Up Game Favorit Jadi Lebih Mudah"
    },
    {
      id: 2,
      image: bannerJoki,
      alt: "JOKITIERS - Jasa Joki Game Terpercaya"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#0d0716] group border border-[#2e2145] shadow-[0_12px_40px_rgba(0,0,0,0.6)] aspect-[21/9] sm:aspect-[21/8]">
      
      {/* Slides Viewport */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                referrerPolicy="no-referrer"
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover select-none"
              />
              {/* Soft overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Left/Right */}
      <button
        id="btn-slide-prev"
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 border border-[#ef4444]/30 hover:bg-[#ef4444] hover:text-white hover:border-transparent flex items-center justify-center text-white cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        id="btn-slide-next"
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 border border-[#ef4444]/30 hover:bg-[#ef4444] hover:text-white hover:border-transparent flex items-center justify-center text-white cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-1"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom dots indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-6 bg-[#ef4444]' : 'w-2 bg-gray-500 hover:bg-gray-300'
            }`}
          ></button>
        ))}
      </div>

    </div>
  );
}
