'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const ContactIntro: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 lg:py-24 bg-[#F6F0E4] overflow-hidden border-t border-[#C6A15B]/20">
      {/* Subtle Temple Architecture Watermark */}
      <div className="absolute right-0 bottom-0 w-96 h-48 opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 200" fill="currentColor" className="text-[#073B2E] w-full h-full">
          <path d="M50,180 L70,80 L90,180 Z" />
          <path d="M120,180 L150,40 L180,180 Z" />
          <path d="M220,180 L260,20 L300,180 Z" />
          <path d="M330,180 L350,90 L370,180 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading & Description (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
                GET IN TOUCH
              </span>
              <div className="w-10 h-[1px] bg-[#C6A15B]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#25251F] leading-[1.15] font-normal">
              Contact <span className="italic text-[#C6A15B] font-normal">Us</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
              Have a question, a special request, or want to know more about our collection? We&apos;d love to hear from you.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 shadow-md group rounded-sm"
              >
                <span>Contact Us</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 text-[#C6A15B]" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Contact Info Pillars (approx 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 lg:pt-0">
            {/* Email Us */}
            <div className="p-6 bg-white/70 border border-[#C6A15B]/30 rounded-sm text-center space-y-3 hover:border-[#C6A15B] transition-colors shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#073B2E]/5 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                <Mail size={18} />
              </div>
              <h4 className="font-serif text-sm uppercase tracking-wider text-[#25251F] font-semibold">
                Email Us
              </h4>
              <a
                href="mailto:hello@royalart.com"
                className="block text-xs font-sans text-[#25251F]/70 hover:text-[#C6A15B] transition-colors break-all"
              >
                hello@royalart.com
              </a>
            </div>

            {/* Call Us */}
            <div className="p-6 bg-white/70 border border-[#C6A15B]/30 rounded-sm text-center space-y-3 hover:border-[#C6A15B] transition-colors shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#073B2E]/5 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                <Phone size={18} />
              </div>
              <h4 className="font-serif text-sm uppercase tracking-wider text-[#25251F] font-semibold">
                Call Us
              </h4>
              <a
                href="tel:+919876543210"
                className="block text-xs font-sans text-[#25251F]/70 hover:text-[#C6A15B] transition-colors"
              >
                +91 98765 43210
              </a>
            </div>

            {/* Our Location */}
            <div className="p-6 bg-white/70 border border-[#C6A15B]/30 rounded-sm text-center space-y-3 hover:border-[#C6A15B] transition-colors shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#073B2E]/5 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                <MapPin size={18} />
              </div>
              <h4 className="font-serif text-sm uppercase tracking-wider text-[#25251F] font-semibold">
                Our Location
              </h4>
              <p className="text-xs font-sans text-[#25251F]/70">
                Bangalore, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
