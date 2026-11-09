'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Award, Star, Mail, ArrowRight, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { getArtistBySlug } from '@/data/artists';
import { getArtworksByArtist, artworks } from '@/data/artworks';
import { useCart } from '@/context/CartContext';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArtistProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const artist = getArtistBySlug(resolvedParams.slug);

  if (!artist) {
    notFound();
  }

  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'exhibitions'>('portfolio');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Artworks by this artist (or fallback to related artworks if less than 3)
  const artistArtworks = getArtworksByArtist(artist.id);
  const displayWorks = artistArtworks.length > 0 ? artistArtworks : artworks.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow">
        {/* Artist Profile Hero Banner */}
        <section className="pt-24 sm:pt-28 pb-14 bg-[#05291F] text-[#F6F0E4] border-b border-[#C6A15B]/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-sans text-[#D9BD7A]/80 mb-8 uppercase tracking-widest">
              <Link href="/" className="hover:text-[#F6F0E4]">
                Home
              </Link>
              <span>›</span>
              <Link href="/artists" className="hover:text-[#F6F0E4]">
                Artists
              </Link>
              <span>›</span>
              <span className="text-[#F6F0E4] font-medium">{artist.name}</span>
            </nav>

            {/* Profile Hero Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Large Artist Portrait in Gold Frame */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="relative aspect-[3/4] border-2 border-[#C6A15B] p-2 bg-[#05291F] shadow-2xl rounded-xs">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={artist.portrait}
                      alt={artist.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Artist Details & Accolades */}
              <div className="md:col-span-8 lg:col-span-9 space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium">
                  {artist.style.join(' • ')} Master
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F6F0E4] font-normal">
                  {artist.name}
                </h1>

                <p className="font-serif text-lg text-[#D9BD7A] italic">
                  {artist.specialty}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#073B2E] border border-[#C6A15B]/30 rounded-xs text-[#F6F0E4]">
                    <MapPin size={13} className="text-[#C6A15B]" />
                    <span>{artist.location}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#073B2E] border border-[#C6A15B]/30 rounded-xs text-[#F6F0E4]">
                    <Award size={13} className="text-[#C6A15B]" />
                    <span>{artist.experience}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#073B2E] border border-[#C6A15B]/30 rounded-xs text-[#D9BD7A]">
                    <Star size={13} fill="#C6A15B" className="text-[#C6A15B]" />
                    <span>{artist.rating} ({artist.reviewCount} Reviews)</span>
                  </span>
                </div>

                {/* Quote Callout */}
                <blockquote className="border-l-2 border-[#C6A15B] pl-4 text-sm sm:text-base text-[#F6F0E4]/90 italic font-serif max-w-2xl py-1">
                  {artist.philosophy}
                </blockquote>

                <div className="pt-2">
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-[0.12em] font-semibold transition-all duration-300 shadow-md rounded-xs"
                  >
                    <span>Contact Artist</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Navigation Bar */}
        <div className="bg-white border-b border-[#C6A15B]/20 sticky top-16 sm:top-20 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-10 text-xs uppercase tracking-widest font-sans">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'about'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'portfolio'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                Portfolio ({displayWorks.length})
              </button>
              <button
                onClick={() => setActiveTab('exhibitions')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'exhibitions'
                    ? 'border-[#073B2E] text-[#073B2E]'
                    : 'border-transparent text-[#25251F]/60 hover:text-[#073B2E]'
                }`}
              >
                Exhibitions
              </button>
            </div>
          </div>
        </div>

        {/* Main Tab Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {activeTab === 'about' && (
            <div className="bg-white border border-[#C6A15B]/25 p-8 sm:p-12 rounded-xs shadow-xs max-w-4xl mx-auto space-y-6">
              <h2 className="font-serif text-3xl text-[#25251F] font-normal">
                Biography & Creative Journey
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
                {artist.bio}
              </p>

              <div className="pt-4 border-t border-[#C6A15B]/20">
                <h3 className="font-serif text-xl text-[#073B2E] mb-2">
                  Artistic Philosophy
                </h3>
                <p className="font-sans text-sm text-[#25251F]/80 leading-relaxed font-light">
                  {artist.philosophy}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C6A15B]/20 flex items-center justify-between text-xs text-[#25251F]/70">
                <span>Studio Location: <strong>{artist.location}</strong></span>
                <span>Experience: <strong>{artist.experience}</strong></span>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#C6A15B]/20">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-[#C6A15B]" />
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#25251F] font-normal">
                    Featured Works
                  </h2>
                </div>
                <span className="text-xs uppercase tracking-wider text-[#25251F]/60">
                  {displayWorks.length} Original Paintings Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayWorks.map((work) => (
                  <ArtworkCard key={work.id} artwork={work} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/artworks"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-widest font-medium rounded-xs shadow-md"
                >
                  <span>Explore Full Royal Collection</span>
                  <ArrowRight size={14} className="text-[#C6A15B]" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'exhibitions' && (
            <div className="bg-white border border-[#C6A15B]/25 p-8 sm:p-12 rounded-xs shadow-xs max-w-4xl mx-auto space-y-8">
              <h2 className="font-serif text-3xl text-[#25251F] font-normal">
                Exhibitions & Accolades
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 pb-4 border-b border-[#C6A15B]/15">
                  <span className="text-[#C6A15B] font-serif text-lg font-semibold w-16 flex-shrink-0">
                    2024
                  </span>
                  <div>
                    <h4 className="font-serif text-base text-[#25251F] font-medium">
                      Heritage in Transition — National Gallery Exhibition
                    </h4>
                    <p className="text-xs text-[#25251F]/60 mt-0.5">
                      New Delhi • Solo Retrospective
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pb-4 border-b border-[#C6A15B]/15">
                  <span className="text-[#C6A15B] font-serif text-lg font-semibold w-16 flex-shrink-0">
                    2023
                  </span>
                  <div>
                    <h4 className="font-serif text-base text-[#25251F] font-medium">
                      Timeless Echoes — International Indian Art Fair
                    </h4>
                    <p className="text-xs text-[#25251F]/60 mt-0.5">
                      Mumbai • Curated Masterworks
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pb-4 border-b border-[#C6A15B]/15">
                  <span className="text-[#C6A15B] font-serif text-lg font-semibold w-16 flex-shrink-0">
                    2021
                  </span>
                  <div>
                    <h4 className="font-serif text-base text-[#25251F] font-medium">
                      Royal Academy Invitational Show
                    </h4>
                    <p className="text-xs text-[#25251F]/60 mt-0.5">
                      London, UK • Representing Classical Indian Traditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Contact Artist Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#05291F] text-[#F6F0E4] border border-[#C6A15B] max-w-md w-full p-6 sm:p-8 rounded-xs relative">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 text-[#F6F0E4]/60 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="font-serif text-2xl mb-1 text-[#F6F0E4]">
              Direct Commission Enquiry
            </h3>
            <p className="text-xs text-[#D9BD7A] mb-5 font-light">
              Connect directly with Master {artist.name}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactModalOpen(false);
                showToast(`Your message has been transmitted to ${artist.name}'s studio manager.`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F6F0E4]/70 mb-1">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Collector name"
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
                  placeholder="collector@example.com"
                  className="w-full bg-[#073B2E] border border-[#C6A15B]/30 px-3 py-2 text-xs text-[#F6F0E4] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F6F0E4]/70 mb-1">
                  Commission / Inquiry Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your custom commission request or specific interest in this master's works..."
                  className="w-full bg-[#073B2E] border border-[#C6A15B]/30 px-3 py-2 text-xs text-[#F6F0E4] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
              >
                Send Studio Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
