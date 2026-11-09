'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ChevronDown } from 'lucide-react';

interface HeroVideoProps {
  onExploreArtworks?: () => void;
  onDiscoverArtists?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onExploreArtworks,
  onDiscoverArtists,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('artworks-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-[#05291F]">
      {/* Background Media: Video with Fallback Image */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/assets/hero-bg.png"
          className="w-full h-full object-cover object-right md:object-center opacity-70"
        >
          {/* Public dummy high-res art/painting video */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-artist-painting-with-acrylic-colors-41315-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Fallback image layer */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/hero-bg.png"
            alt="Royal Art Hero Painting"
            fill
            priority
            className="object-cover object-right"
          />
        </div>
      </div>

      {/* Balanced Luxury Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05291F]/95 via-[#05291F]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05291F] via-transparent to-[#05291F]/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl pt-16 sm:pt-20">
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#C6A15B]" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium">
              ROYAL ART
            </span>
            <div className="w-8 h-[1px] bg-[#C6A15B]" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F6F0E4] leading-[1.1] mb-5 tracking-tight font-normal">
            Art. Heritage. Stories.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base text-[#F6F0E4]/85 leading-relaxed mb-8 max-w-xl font-light">
            A curated collection of original artworks that celebrate timeless traditions and contemporary vision.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/artworks"
              onClick={onExploreArtworks}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 shadow-md group rounded-sm"
            >
              <span>Explore Artworks</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/artists"
              onClick={onDiscoverArtists}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#F6F0E4]/40 hover:border-[#C6A15B] hover:text-[#C6A15B] text-[#F6F0E4] text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 rounded-sm"
            >
              <span>Discover Artists</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Controls & Scroll to Explore */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6 sm:px-12 flex items-center justify-between text-[#F6F0E4]/80">
        {/* Left: Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="w-9 h-9 rounded-full border border-[#C6A15B]/40 flex items-center justify-center hover:bg-[#C6A15B]/20 transition-all text-[#C6A15B]"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        {/* Center: Scroll to Explore */}
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="w-4 h-7 border border-[#F6F0E4]/50 rounded-full flex justify-center pt-1">
            <div className="w-1 h-1.5 bg-[#C6A15B] rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] tracking-widest uppercase text-[#F6F0E4]/70 group-hover:text-[#C6A15B] transition-colors">
            Scroll to Explore
          </span>
          <ChevronDown size={14} className="text-[#C6A15B] -mt-1 group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* Right: Mute/Unmute */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="w-9 h-9 rounded-full border border-[#C6A15B]/40 flex items-center justify-center hover:bg-[#C6A15B]/20 transition-all text-[#C6A15B]"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </section>
  );
};
