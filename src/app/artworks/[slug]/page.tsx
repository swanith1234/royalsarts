'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Heart,
  Share2,
  ShoppingBag,
  Check,
  ZoomIn,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { getArtworkBySlug, getRelatedArtworks } from '@/data/artworks';
import { getArtistById } from '@/data/artists';
import { useCart } from '@/context/CartContext';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArtworkDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const artwork = getArtworkBySlug(resolvedParams.slug);

  if (!artwork) {
    notFound();
  }

  const { addToCart, isInCart, toggleWishlist, isInWishlist, showToast } = useCart();
  const inCart = isInCart(artwork.id);
  const isWished = isInWishlist(artwork.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'story' | 'artist' | 'authenticity'>('description');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);

  const artist = getArtistById(artwork.artistId);
  const relatedArtworks = getRelatedArtworks(artwork.id, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Artwork private link copied to clipboard');
    }
  };

  const handleAddToCart = () => {
    if (!inCart && artwork.available) {
      addToCart(artwork);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-sans text-[#25251F]/60 mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-[#073B2E]">
              Home
            </Link>
            <span>›</span>
            <Link href="/artworks" className="hover:text-[#073B2E]">
              Artworks
            </Link>
            <span>›</span>
            <span className="text-[#073B2E] font-medium">{artwork.title}</span>
          </nav>

          {/* Main Artwork Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 border border-[#C6A15B]/25 rounded-xs shadow-xs mb-16">
            {/* Left: Gallery & Zoom Showcase (approx 7 cols) */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
              {/* Vertical Thumbnail Strip */}
              <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible">
                {artwork.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View artwork image ${idx + 1}`}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 rounded-xs overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#073B2E] shadow-sm scale-102'
                        : 'border-[#C6A15B]/30 hover:border-[#C6A15B] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${artwork.title} view ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Artwork Image with Zoom Button */}
              <div className="relative flex-grow aspect-[4/5] sm:aspect-auto sm:h-[540px] bg-[#F6F0E4] border border-[#C6A15B]/20 rounded-xs overflow-hidden order-1 sm:order-2 group">
                <Image
                  src={artwork.images[selectedImageIndex] || artwork.thumbnail}
                  alt={artwork.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Lightbox / Zoom Action Button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Enlarge artwork to fullscreen"
                  className="absolute bottom-4 right-4 bg-[#05291F]/80 hover:bg-[#073B2E] backdrop-blur-sm text-[#F6F0E4] p-2.5 rounded-full shadow-lg border border-[#C6A15B]/40 transition-transform duration-300 hover:scale-110 flex items-center gap-1.5 text-xs font-sans"
                >
                  <ZoomIn size={16} className="text-[#C6A15B]" />
                  <span className="text-[11px] uppercase tracking-wider pr-1">Enlarge</span>
                </button>
              </div>
            </div>

            {/* Right: Artwork Metadata & Conversion (approx 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Title and Top Icons */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-medium block mb-1">
                      {artwork.category} Collection
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#25251F] leading-tight font-medium">
                      {artwork.title}
                    </h1>
                  </div>

                  {/* Wishlist & Share */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleWishlist(artwork.id)}
                      aria-label="Save to private gallery"
                      className="w-9 h-9 rounded-full border border-[#C6A15B]/30 flex items-center justify-center hover:bg-[#C6A15B]/10 transition-colors"
                    >
                      <Heart
                        size={17}
                        fill={isWished ? '#C6A15B' : 'none'}
                        className={isWished ? 'text-[#C6A15B]' : 'text-[#25251F]/70'}
                      />
                    </button>
                    <button
                      onClick={handleShare}
                      aria-label="Share artwork link"
                      className="w-9 h-9 rounded-full border border-[#C6A15B]/30 flex items-center justify-center hover:bg-[#C6A15B]/10 transition-colors text-[#25251F]/70 hover:text-[#073B2E]"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Artist Attribution */}
                {artist && (
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="inline-flex items-center gap-3 mt-4 p-2.5 bg-[#F6F0E4]/60 hover:bg-[#F6F0E4] border border-[#C6A15B]/20 rounded-xs transition-colors group w-full"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#C6A15B]/40">
                      <Image
                        src={artist.portrait}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[#25251F]/60 uppercase tracking-widest font-sans">
                        Created By
                      </p>
                      <p className="font-serif text-sm font-medium text-[#25251F] group-hover:text-[#073B2E]">
                        {artist.name}
                      </p>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-[#C6A15B] group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}

                {/* Price & Availability */}
                <div className="mt-6 py-4 border-y border-[#C6A15B]/20 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#25251F]/50 block font-sans">
                      Acquisition Value
                    </span>
                    <span className="font-serif text-3xl font-semibold text-[#073B2E]">
                      {artwork.priceDisplay}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1 rounded-xs font-medium ${
                      artwork.available
                        ? inCart
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {artwork.available
                      ? inCart
                        ? 'Reserved in Cart'
                        : 'Available (Only 1)'
                      : 'Acquired / Sold'}
                  </span>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-4 my-6 text-xs bg-[#F6F0E4]/40 p-4 border border-[#C6A15B]/15 rounded-xs">
                  <div>
                    <span className="text-[#25251F]/50 uppercase tracking-wider block font-sans text-[10px]">
                      Medium
                    </span>
                    <span className="font-medium text-[#25251F]">{artwork.medium}</span>
                  </div>
                  <div>
                    <span className="text-[#25251F]/50 uppercase tracking-wider block font-sans text-[10px]">
                      Dimensions
                    </span>
                    <span className="font-medium text-[#25251F]">{artwork.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[#25251F]/50 uppercase tracking-wider block font-sans text-[10px]">
                      Category
                    </span>
                    <span className="font-medium text-[#25251F]">{artwork.category}</span>
                  </div>
                  <div>
                    <span className="text-[#25251F]/50 uppercase tracking-wider block font-sans text-[10px]">
                      Creation Year
                    </span>
                    <span className="font-medium text-[#25251F]">{artwork.year}</span>
                  </div>
                </div>

                {/* Authenticity Guarantee Note */}
                <div className="flex items-start gap-2.5 text-xs text-[#25251F]/70 mb-6 font-light">
                  <ShieldCheck size={18} className="text-[#C6A15B] flex-shrink-0 mt-0.5" />
                  <span>
                    Includes signed physical Certificate of Authenticity with provenance verification.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!artwork.available || inCart}
                  className={`w-full py-4 px-6 text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 rounded-sm shadow-md ${
                    inCart
                      ? 'bg-[#073B2E]/15 text-[#073B2E] border border-[#073B2E] cursor-default'
                      : artwork.available
                      ? 'bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4]'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check size={16} className="text-emerald-700" />
                      <span>Item in Your Acquisition Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} className="text-[#C6A15B]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setEnquireOpen(true)}
                  className="w-full py-3.5 px-6 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 rounded-sm shadow-sm"
                >
                  Enquire About This Artwork
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description, Story, Artist, Authenticity */}
          <div className="bg-white border border-[#C6A15B]/25 p-6 sm:p-10 rounded-xs shadow-xs mb-16">
            <div className="flex items-center gap-6 sm:gap-10 border-b border-[#C6A15B]/20 pb-4 mb-6 overflow-x-auto text-xs uppercase tracking-widest font-sans">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'story'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                Artwork Story
              </button>
              <button
                onClick={() => setActiveTab('artist')}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'artist'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                About the Artist
              </button>
              <button
                onClick={() => setActiveTab('authenticity')}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'authenticity'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                Authenticity
              </button>
            </div>

            <div className="max-w-4xl text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p>{artwork.description}</p>
                  <p>
                    Every stroke of this original painting has been executed by hand with premium archival grade pigments, ensuring vibrant longevity for generations of collectors.
                  </p>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-4">
                  <p>{artwork.story}</p>
                </div>
              )}

              {activeTab === 'artist' && artist && (
                <div className="space-y-4">
                  <p className="font-serif text-lg text-[#25251F] font-normal">
                    {artist.name} — {artist.specialty}
                  </p>
                  <p>{artist.bio}</p>
                  <blockquote className="border-l-2 border-[#C6A15B] pl-4 italic text-[#073B2E] font-serif text-base">
                    {artist.philosophy}
                  </blockquote>
                  <div className="pt-2">
                    <Link
                      href={`/artists/${artist.slug}`}
                      className="text-xs uppercase tracking-wider text-[#C6A15B] hover:text-[#073B2E] font-medium"
                    >
                      View Complete Artist Profile &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'authenticity' && (
                <div className="space-y-4">
                  <p>{artwork.authenticity}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#25251F]/70">
                    <li>Official Royal Art tamper-evident security seal</li>
                    <li>Recorded in the Royal Art Private Provenance Registry</li>
                    <li>Direct signature and thumbprint certification by the artist</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Related Artworks Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-medium">
                  CURATED RECOMMENDATIONS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#25251F] font-normal">
                  Related Artworks
                </h2>
              </div>

              <Link
                href="/artworks"
                className="text-xs uppercase tracking-wider text-[#073B2E] hover:text-[#C6A15B] font-medium"
              >
                View Collection &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArtworks.map((related) => (
                <ArtworkCard key={related.id} artwork={related} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close fullscreen view"
            className="absolute top-6 right-6 text-white hover:text-[#C6A15B] z-10 p-2"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image
              src={artwork.images[selectedImageIndex] || artwork.thumbnail}
              alt={artwork.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {enquireOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#05291F] text-[#F6F0E4] border border-[#C6A15B] max-w-md w-full p-6 sm:p-8 rounded-xs relative">
            <button
              onClick={() => setEnquireOpen(false)}
              className="absolute top-4 right-4 text-[#F6F0E4]/60 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="font-serif text-2xl mb-1 text-[#F6F0E4]">
              Private Enquiry
            </h3>
            <p className="text-xs text-[#D9BD7A] mb-5 font-light">
              Artwork: &quot;{artwork.title}&quot; by {artwork.artistName}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEnquireOpen(false);
                showToast('Your enquiry has been received by our senior curator.');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F6F0E4]/70 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[#073B2E] border border-[#C6A15B]/30 px-3 py-2 text-xs text-[#F6F0E4] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F6F0E4]/70 mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#073B2E] border border-[#C6A15B]/30 px-3 py-2 text-xs text-[#F6F0E4] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F6F0E4]/70 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 ..."
                  className="w-full bg-[#073B2E] border border-[#C6A15B]/30 px-3 py-2 text-xs text-[#F6F0E4] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F6F0E4]/70 mb-1">
                  Message / Special Request
                </label>
                <textarea
                  rows={3}
                  placeholder="I would like to arrange a private viewing or reserve this piece..."
                  className="w-full bg-[#073B2E] border border-[#C6A15B]/30 px-3 py-2 text-xs text-[#F6F0E4] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
              >
                Submit Curatorial Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
