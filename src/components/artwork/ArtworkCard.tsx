'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Artwork } from '@/types';
import { useCart } from '@/context/CartContext';

interface ArtworkCardProps {
  artwork: Artwork;
  viewMode?: 'grid' | 'list';
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  viewMode = 'grid',
}) => {
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCart();
  const inCart = isInCart(artwork.id);
  const isWished = isInWishlist(artwork.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart && artwork.available) {
      addToCart(artwork);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(artwork.id);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-[#C6A15B]/20 hover:border-[#C6A15B] transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-sm group">
        <Link
          href={`/artworks/${artwork.slug}`}
          className="relative w-full sm:w-56 h-56 sm:h-44 overflow-hidden rounded-sm flex-shrink-0"
        >
          <Image
            src={artwork.thumbnail}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={handleWishlist}
            aria-label="Save to private wish gallery"
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#C6A15B] transition-colors"
          >
            <Heart
              size={15}
              fill={isWished ? '#C6A15B' : 'none'}
              className={isWished ? 'text-[#C6A15B]' : 'text-white'}
            />
          </button>
        </Link>

        <div className="flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-medium">
                {artwork.category}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-medium ${
                  artwork.available
                    ? inCart
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-50 text-emerald-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {artwork.available ? (inCart ? 'In Your Cart' : 'Available (Only 1)') : 'Sold'}
              </span>
            </div>

            <Link href={`/artworks/${artwork.slug}`} className="block">
              <h3 className="font-serif text-xl text-[#25251F] group-hover:text-[#073B2E] transition-colors font-medium">
                {artwork.title}
              </h3>
            </Link>

            <Link
              href={`/artists/${artwork.artistSlug}`}
              className="text-xs font-sans text-[#25251F]/70 hover:text-[#C6A15B] transition-colors mt-0.5 block"
            >
              By {artwork.artistName}
            </Link>

            <p className="text-xs text-[#25251F]/60 mt-2 line-clamp-2">
              {artwork.description}
            </p>

            <div className="text-[11px] text-[#25251F]/60 mt-2 space-x-3">
              <span>{artwork.medium}</span>
              <span>•</span>
              <span>{artwork.dimensions}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#C6A15B]/15">
            <span className="font-serif text-lg font-semibold text-[#073B2E]">
              {artwork.priceDisplay}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={!artwork.available || inCart}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-300 rounded-sm ${
                inCart
                  ? 'bg-[#073B2E]/10 text-[#073B2E] cursor-default'
                  : artwork.available
                  ? 'bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4]'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {inCart ? (
                <>
                  <Check size={14} className="text-emerald-700" />
                  <span>In Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} className="text-[#C6A15B]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View (matches client reference)
  return (
    <div className="bg-white border border-[#C6A15B]/20 hover:border-[#C6A15B] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg group">
      {/* Artwork Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#F6F0E4]">
        <Link href={`/artworks/${artwork.slug}`} className="block w-full h-full">
          <Image
            src={artwork.thumbnail}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlist}
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#C6A15B] transition-colors z-10"
        >
          <Heart
            size={16}
            fill={isWished ? '#C6A15B' : 'none'}
            className={isWished ? 'text-[#C6A15B]' : 'text-white'}
          />
        </button>

        {/* Unique Original Badge */}
        {artwork.available && (
          <span className="absolute bottom-3 left-3 bg-[#05291F]/90 backdrop-blur-xs text-[#D9BD7A] text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-xs border border-[#C6A15B]/30 font-sans">
            Unique Original (1 of 1)
          </span>
        )}
      </div>

      {/* Artwork Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <Link href={`/artworks/${artwork.slug}`} className="block">
            <h3 className="font-serif text-lg text-[#25251F] group-hover:text-[#073B2E] transition-colors font-medium">
              {artwork.title}
            </h3>
          </Link>

          <Link
            href={`/artists/${artwork.artistSlug}`}
            className="text-xs font-sans text-[#25251F]/70 hover:text-[#C6A15B] transition-colors mt-0.5 block"
          >
            {artwork.artistName}
          </Link>

          <div className="text-[11px] text-[#25251F]/50 mt-1.5 space-y-0.5 font-light">
            <p>{artwork.medium}</p>
            <p>{artwork.dimensions}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#C6A15B]/15 flex items-center justify-between">
          <span className="font-serif text-base font-semibold text-[#073B2E]">
            {artwork.priceDisplay}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!artwork.available || inCart}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 rounded-sm ${
              inCart
                ? 'bg-[#073B2E]/10 text-[#073B2E] cursor-default'
                : artwork.available
                ? 'bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {inCart ? (
              <>
                <Check size={13} className="text-emerald-700" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} className="text-[#C6A15B]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
