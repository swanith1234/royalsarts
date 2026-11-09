'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { Artist } from '@/types';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="bg-white border border-[#C6A15B]/20 hover:border-[#C6A15B] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg group rounded-xs"
    >
      {/* Artist Portrait Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#05291F]">
        <Image
          src={artist.portrait}
          alt={artist.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-[#05291F]/90 backdrop-blur-xs text-[#D9BD7A] text-[10px] px-2 py-0.5 rounded-xs border border-[#C6A15B]/30 flex items-center gap-1 font-sans">
          <Star size={11} fill="#C6A15B" className="text-[#C6A15B]" />
          <span>{artist.rating}</span>
          <span className="text-[#F6F0E4]/60">({artist.reviewCount})</span>
        </div>
      </div>

      {/* Artist Information & Arrow */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-base sm:text-lg text-[#25251F] group-hover:text-[#073B2E] transition-colors font-medium">
            {artist.name}
          </h3>
          <p className="text-xs font-sans text-[#25251F]/70 mt-0.5">
            {artist.style.join(' • ')}
          </p>
          <p className="text-[11px] text-[#25251F]/50 mt-1 font-light">
            {artist.location} • {artist.artworkCount} Artworks
          </p>
        </div>

        {/* Small Round CTA Arrow Button */}
        <div className="w-8 h-8 rounded-full bg-[#073B2E] group-hover:bg-[#C6A15B] text-[#F6F0E4] group-hover:text-[#05291F] flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm">
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};
