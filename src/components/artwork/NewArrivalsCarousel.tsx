'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Artwork } from '@/types';

interface NewArrivalsCarouselProps {
  items: Artwork[];
}

export const NewArrivalsCarousel: React.FC<NewArrivalsCarouselProps> = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Show 4 on desktop, 2 on tablet, 1 on mobile
  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, items.length - 4) : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 4 >= items.length ? 0 : prev + 1));
  };

  const visibleItems = items.slice(startIndex, startIndex + 4);
  // Pad if less than 4
  const displayItems =
    visibleItems.length < 4
      ? [...visibleItems, ...items.slice(0, 4 - visibleItems.length)]
      : visibleItems;

  return (
    <section className="py-12 bg-[#F6F0E4] border-b border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#C6A15B]" />
            <h2 className="font-serif text-2xl sm:text-3xl text-[#25251F] tracking-wide">
              New Arrivals of the Month
            </h2>
            <div className="w-8 h-[1px] bg-[#C6A15B]" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between absolute -left-4 -right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Previous arrival"
              className="w-9 h-9 rounded-full bg-white/90 border border-[#C6A15B]/40 shadow-md flex items-center justify-center text-[#25251F] hover:bg-[#073B2E] hover:text-[#F6F0E4] transition-all pointer-events-auto"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next arrival"
              className="w-9 h-9 rounded-full bg-white/90 border border-[#C6A15B]/40 shadow-md flex items-center justify-center text-[#25251F] hover:bg-[#073B2E] hover:text-[#F6F0E4] transition-all pointer-events-auto"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayItems.map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white border border-[#C6A15B]/25 hover:border-[#C6A15B] transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md group flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F6F0E4]">
                  <Image
                    src={artwork.thumbnail}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/artworks/${artwork.slug}`}
                      className="px-3 py-1.5 bg-[#F6F0E4] text-[#05291F] text-xs uppercase tracking-wider font-medium rounded-xs flex items-center gap-1.5 shadow-sm hover:bg-[#C6A15B]"
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </Link>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-sm font-medium text-[#25251F] truncate group-hover:text-[#073B2E] transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-[11px] text-[#25251F]/60 font-sans truncate">
                      {artwork.artistName}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#C6A15B]/15 flex items-center justify-between">
                    <span className="font-serif text-xs font-semibold text-[#073B2E]">
                      {artwork.priceDisplay}
                    </span>
                    <Link
                      href={`/artworks/${artwork.slug}`}
                      className="text-[10px] uppercase tracking-wider text-[#C6A15B] hover:text-[#073B2E] font-medium"
                    >
                      Acquire &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-1.5 mt-6">
            {Array.from({ length: Math.ceil(items.length / 4) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx * 4)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(startIndex / 4) === idx
                    ? 'w-6 bg-[#C6A15B]'
                    : 'bg-[#C6A15B]/30 hover:bg-[#C6A15B]/60'
                }`}
                aria-label={`Go to slide page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
