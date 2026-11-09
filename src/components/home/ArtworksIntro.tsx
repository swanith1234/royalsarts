'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const ArtworksIntro: React.FC = () => {
  return (
    <section id="artworks-intro" className="relative py-20 lg:py-28 bg-[#F6F0E4] overflow-hidden">
      {/* Subtle Lotus / Heritage Watermark in Background */}
      <div className="absolute top-10 right-4 w-96 h-96 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#073B2E] w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M50 10 C35 35 35 65 50 90 C65 65 65 35 50 10 Z" />
          <path d="M10 50 C35 35 65 35 90 50 C65 65 35 65 10 50 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Information (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
                EXPLORE OUR COLLECTION
              </span>
              <div className="w-10 h-[1px] bg-[#C6A15B]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#25251F] leading-[1.15] font-normal">
              Discover Exceptional{' '}
              <span className="italic text-[#C6A15B] font-normal">Artworks</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
              Explore a curated collection of original paintings and artistic creations, each carrying a unique story, expression and cultural significance.
            </p>

            <div className="pt-2">
              <Link
                href="/artworks"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 shadow-md group rounded-sm"
              >
                <span>Explore All Artworks</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 text-[#C6A15B]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Framed Artwork Photograph (approx 7 cols) */}
          <div className="lg:col-span-7 relative">
            {/* Dark green backing block behind the frame */}
            <div className="absolute -bottom-6 -right-6 w-4/5 h-4/5 bg-[#073B2E] rounded-sm hidden sm:block -z-0" />

            {/* Gold bordered artwork presentation */}
            <div className="relative z-10 border border-[#C6A15B] p-2 bg-[#F6F0E4] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] overflow-hidden">
                <Image
                  src="/assets/artwork-sunset-temple.png"
                  alt="Discover Exceptional Artworks - Sunset Temple by River"
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
