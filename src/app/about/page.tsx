'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';

export default function AboutPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Curated Authenticity',
      desc: 'Every piece in our catalog is an original masterpiece verified directly through the creator with tamper-evident authentication seals and provenance dossiers.',
    },
    {
      icon: Heart,
      title: 'Artist Sovereignty',
      desc: 'We operate on respectful partnerships, ensuring living masters receive fair patronage, global representation, and absolute artistic freedom.',
    },
    {
      icon: Compass,
      title: 'Heritage & Modernity',
      desc: 'Bridging timeless Indian aesthetic traditions—from Tanjore and Mughal miniatures to dynamic modern abstracts—for contemporary global residences.',
    },
    {
      icon: Sparkles,
      title: 'White-Glove Care',
      desc: 'Museum-grade timber crating, insured international art couriers, and bespoke framing consultation for every collector transaction.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow">
        {/* Page Hero */}
        <PageHero
          title="About Royal Art"
          subtitle="Beyond Art. A curated sanctuary where ancient craftsmanship meets contemporary vision."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
        />

        {/* Brand Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Image */}
            <div className="lg:col-span-6 relative">
              <div className="border border-[#C6A15B] p-2 bg-white shadow-2xl rounded-xs">
                <div className="relative aspect-[4/3] sm:h-[440px] overflow-hidden">
                  <Image
                    src="/assets/gallery-hall.png"
                    alt="Royal Art International Gallery Sanctuary"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
                  OUR GENESIS
                </span>
                <div className="w-10 h-[1px] bg-[#C6A15B]" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#25251F] leading-tight font-normal">
                Preserving Heritage, <br />
                <span className="italic text-[#073B2E]">Elevating the Masterpiece</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
                Royal Art was established with a singular mission: to provide discerning collectors worldwide with direct access to India&apos;s most gifted living artists. In an era of mass-produced canvas prints and fleeting digital trends, we stand firmly for the enduring power of genuine human expression.
              </p>

              <p className="font-sans text-sm sm:text-base text-[#25251F]/80 leading-relaxed font-light">
                Each painting in our collection is an irreproducible original—crafted over months of disciplined dedication, steeped in spiritual narratives, mythological traditions, and innovative modern mediums.
              </p>

              <div className="pt-2">
                <Link
                  href="/artworks"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-widest font-medium rounded-xs shadow-md"
                >
                  <span>Explore Our Collection</span>
                  <ArrowRight size={14} className="text-[#C6A15B]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The 4 Pillars */}
        <section className="bg-[#05291F] text-[#F6F0E4] py-20 border-y border-[#C6A15B]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium block mb-2">
                OUR COMMITMENT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F0E4] font-normal">
                The Royal Art Standard
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-6 bg-[#073B2E]/50 border border-[#C6A15B]/25 rounded-xs space-y-4 hover:border-[#C6A15B] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#05291F] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-serif text-lg text-[#F6F0E4] font-medium">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#F6F0E4]/70 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Curatorial Advisory & Callout */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium">
            BESPOKE CURATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#25251F] font-normal">
            Private Viewings & Corporate Collections
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#25251F]/75 max-w-2xl mx-auto leading-relaxed font-light">
            Whether curating for a private residence, luxury estate, or corporate foundation, our senior curatorial team offers confidential consultations and commission management.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md"
            >
              <span>Schedule a Curatorial Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
