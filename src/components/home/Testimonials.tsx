'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#05291F] text-[#F6F0E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-[#C6A15B]" />
            <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
              TESTIMONIALS
            </span>
            <div className="w-10 h-[1px] bg-[#C6A15B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F6F0E4] font-normal">
            Words from Our <span className="italic text-[#C6A15B] font-normal">Collectors</span>
          </h2>
        </div>

        {/* Testimonials Grid (Desktop: 3 cards, Mobile/Tablet: Carousel with arrows) */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="hidden lg:flex items-center justify-between absolute -left-6 -right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-[#C6A15B]/50 flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#05291F] transition-all duration-300 pointer-events-auto bg-[#05291F]/80 backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-[#C6A15B]/50 flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#05291F] transition-all duration-300 pointer-events-auto bg-[#05291F]/80 backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* 3 Cards Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-[#073B2E]/70 border border-[#C6A15B]/30 p-8 rounded-sm relative flex flex-col justify-between transition-all duration-300 hover:border-[#C6A15B] hover:shadow-xl group"
              >
                {/* Gold Quote Icon */}
                <div className="mb-4">
                  <Quote size={28} className="text-[#C6A15B] opacity-80" />
                </div>

                {/* Quote Text */}
                <p className="font-sans text-sm text-[#F6F0E4]/90 leading-relaxed font-light mb-8 flex-grow">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Collector Details */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#C6A15B]/20">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#C6A15B]/50 flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#F6F0E4] font-medium tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#C6A15B]/90 font-sans tracking-wide">
                      {item.role}, {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-10">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]/40" />
          </div>
        </div>
      </div>
    </section>
  );
};
