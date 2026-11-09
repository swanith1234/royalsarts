'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const AboutIntro: React.FC = () => {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#F6F0E4] overflow-hidden">
      {/* Subtle Lotus motif */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#073B2E] w-full h-full">
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M50 15 C38 35 38 65 50 85 C62 65 62 35 50 15 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Story Information (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
                ABOUT ROYAL ART
              </span>
              <div className="w-10 h-[1px] bg-[#C6A15B]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#25251F] leading-[1.15] font-normal">
              A Curated <span className="italic text-[#C6A15B] font-normal">World</span> of Art
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
              Royal Art is a curated art platform dedicated to showcasing exceptional original artworks and talented artists, bridging heritage with modern expression for art lovers and collectors worldwide.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 shadow-md group rounded-sm"
              >
                <span>Our Story</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 text-[#C6A15B]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Grand Gallery Hall (approx 7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative border border-[#C6A15B] p-2 bg-[#F6F0E4] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[420px] overflow-hidden">
                <Image
                  src="/assets/gallery-hall.png"
                  alt="A Curated World of Art - Royal Art Grand Gallery Hall"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Delicate Gold Inner Accent Line */}
              <div className="absolute inset-3.5 border border-[#C6A15B]/40 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
