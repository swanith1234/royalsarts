'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  extraContent?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  breadcrumbs,
  extraContent,
}) => {
  return (
    <div className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#05291F] text-[#F6F0E4] border-b border-[#C6A15B]/20 overflow-hidden">
      {/* Decorative Lotus / Heritage Motif on Top Right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#C6A15B] w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M50 10 C35 35 35 65 50 90 C65 65 65 35 50 10 Z" />
          <path d="M10 50 C35 35 65 35 90 50 C65 65 35 65 10 50 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-sans text-[#D9BD7A]/80 mb-4 tracking-wider uppercase">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <span className="text-[#C6A15B]/50">›</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-[#F6F0E4] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#F6F0E4]">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Heading & Subtitle */}
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F6F0E4] leading-[1.15] font-normal mb-3">
            {title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#F6F0E4]/80 leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {extraContent && <div className="mt-6">{extraContent}</div>}
      </div>
    </div>
  );
};
