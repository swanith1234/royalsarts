'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const ArtistsIntro: React.FC = () => {
  return (
    <section id="artists-intro" className="relative py-20 lg:py-28 bg-[#05291F] text-[#F6F0E4] overflow-hidden">
      {/* Decorative Gold Foliage Pattern on Right Edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-96 opacity-15 pointer-events-none hidden md:block">
        <svg viewBox="0 0 200 300" fill="none" stroke="#C6A15B" strokeWidth="1.2" className="w-full h-full">
          <path d="M180,10 C120,60 120,140 180,200 C200,220 160,280 120,300" />
          <path d="M150,50 Q110,40 100,70 Q130,80 150,50 Z" fill="#C6A15B" fillOpacity="0.2" />
          <path d="M140,110 Q100,100 85,130 Q120,145 140,110 Z" fill="#C6A15B" fillOpacity="0.2" />
          <path d="M160,170 Q110,165 95,195 Q135,210 160,170 Z" fill="#C6A15B" fillOpacity="0.2" />
          <path d="M150,230 Q105,235 100,265 Q135,275 150,230 Z" fill="#C6A15B" fillOpacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Artist Photograph (approx 7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative">
            <div className="relative border border-[#C6A15B] p-2 bg-[#05291F] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[420px] overflow-hidden">
                <Image
                  src="/assets/artist-studio.png"
                  alt="Artist in studio painting Indian classical masterpiece"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Delicate Gold Inner Accent Line */}
              <div className="absolute inset-3.5 border border-[#C6A15B]/40 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Text (approx 5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
                MEET THE CREATORS
              </span>
              <div className="w-10 h-[1px] bg-[#C6A15B]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F6F0E4] leading-[1.15] font-normal">
              The <span className="italic text-[#C6A15B] font-normal">Artists</span> Behind the Art
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#F6F0E4]/80 leading-relaxed font-light">
              Meet the visionary artists whose creativity, heritage and individual perspectives bring each masterpiece to life.
            </p>

            <div className="pt-2">
              <Link
                href="/artists"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 shadow-md group rounded-sm"
              >
                <span>Discover Our Artists</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
