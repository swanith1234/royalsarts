'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroVideo } from '@/components/home/HeroVideo';
import { ArtworksIntro } from '@/components/home/ArtworksIntro';
import { ArtistsIntro } from '@/components/home/ArtistsIntro';
import { AboutIntro } from '@/components/home/AboutIntro';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactIntro } from '@/components/home/ContactIntro';

export default function HomePage() {
  const { navVariant } = useCart();

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      {/* 
        Client Navigation Decision Variations:
        Variation A: Navbar sits over hero video
        Variation B: Navbar sits below hero video
      */}
      {navVariant === 'A' && <Navbar isHeroBelowVariant={false} />}

      <main className="flex-grow">
        {/* Section 1: Cinematic Hero Video */}
        <HeroVideo />

        {/* In Variation B, Navbar appears immediately below the hero */}
        {navVariant === 'B' && <Navbar isHeroBelowVariant={true} />}

        {/* Section 2: Artworks Introduction */}
        <ArtworksIntro />

        {/* Section 3: Artists Introduction */}
        <ArtistsIntro />

        {/* Section 4: About Royal Art */}
        <AboutIntro />

        {/* Section 5: Words from Our Collectors */}
        <Testimonials />

        {/* Section 6: Contact Us */}
        <ContactIntro />
      </main>

      {/* Section 7: Premium Emerald Footer */}
      <Footer />
    </div>
  );
}
