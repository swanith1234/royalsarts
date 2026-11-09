'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  isHeroBelowVariant?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isHeroBelowVariant = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, navVariant, setNavVariant } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', sectionId: 'hero' },
    { name: 'Artworks', href: '/artworks', sectionId: 'artworks' },
    { name: 'Artists', href: '/artists', sectionId: 'artists' },
    { name: 'About Us', href: '/about', sectionId: 'about' },
    { name: 'Contact Us', href: '/contact', sectionId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/artworks?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Determine styling based on scroll and variation
  const getNavbarBg = () => {
    if (isHeroBelowVariant) {
      // Variation B sticky navbar below hero
      return 'bg-[#05291F] border-b border-[#C6A15B]/20 shadow-xl';
    }
    if (isScrolled) {
      return 'bg-[#05291F]/95 backdrop-blur-md border-b border-[#C6A15B]/20 shadow-xl py-3';
    }
    return 'bg-gradient-to-b from-[#05291F]/90 via-[#05291F]/50 to-transparent py-4';
  };

  return (
    <>
      {/* Design Review Demo Switcher Floating Pill */}
      <aside aria-label="Demo controls" className="fixed top-20 right-4 z-50 hidden lg:flex items-center gap-2 bg-[#05291F]/90 border border-[#C6A15B]/40 px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md text-xs text-[#F6F0E4]">
        <SlidersHorizontal size={13} className="text-[#C6A15B]" />
        <span className="text-[11px] uppercase tracking-wider text-[#D9BD7A]">Design Variant:</span>
        <button
          onClick={() => setNavVariant('A')}
          className={`px-2.5 py-1 rounded-full text-[11px] tracking-wide uppercase transition-all ${
            navVariant === 'A'
              ? 'bg-[#C6A15B] text-[#05291F] font-bold shadow-sm'
              : 'text-[#F6F0E4]/70 hover:text-white'
          }`}
          title="Variation A: Header over hero video"
        >
          Over Hero (Var A)
        </button>
        <button
          onClick={() => setNavVariant('B')}
          className={`px-2.5 py-1 rounded-full text-[11px] tracking-wide uppercase transition-all ${
            navVariant === 'B'
              ? 'bg-[#C6A15B] text-[#05291F] font-bold shadow-sm'
              : 'text-[#F6F0E4]/70 hover:text-white'
          }`}
          title="Variation B: Header sticky below hero video"
        >
          Below Hero (Var B)
        </button>
      </aside>

      {/* Main Navbar */}
      <header
        className={`w-full transition-all duration-300 z-40 ${
          isHeroBelowVariant
            ? 'sticky top-0'
            : 'fixed top-0 left-0 right-0'
        } ${getNavbarBg()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Royal Art Official Logo Ribbon Badge */}
            <div className="flex items-center">
              <Link href="/" className="relative block group">
                <div className="w-[84px] h-[96px] sm:w-[94px] sm:h-[108px] relative transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                  <Image
                    src="/assets/royal-art-logo.png"
                    alt="Royal Art - Beyond Art"
                    fill
                    sizes="94px"
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                    className={`nav-link text-xs tracking-[0.16em] uppercase font-sans py-1 transition-colors ${
                      isActive ? 'active text-[#C6A15B] font-semibold' : 'text-[#F6F0E4]/90 hover:text-[#C6A15B]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Account, Cart) */}
            <div className="flex items-center space-x-5 sm:space-x-6 text-[#F6F0E4]">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search artworks"
                className="hover:text-[#C6A15B] transition-colors p-1"
              >
                <Search size={20} strokeWidth={1.75} />
              </button>

              {/* Account Link */}
              <Link
                href="/login"
                aria-label="Collector account"
                className="hover:text-[#C6A15B] transition-colors p-1"
              >
                <User size={20} strokeWidth={1.75} />
              </Link>

              {/* Cart Link with Badge */}
              <Link
                href="/cart"
                aria-label="Acquisition cart"
                className="relative hover:text-[#C6A15B] transition-colors p-1"
              >
                <ShoppingBag size={20} strokeWidth={1.75} />
                <span className="absolute -top-1.5 -right-2 bg-[#C6A15B] text-[#05291F] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open navigation menu"
                className="md:hidden text-[#F6F0E4] hover:text-[#C6A15B] p-1"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="bg-[#05291F] border-t border-b border-[#C6A15B]/30 px-4 py-3 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
              <Search size={18} className="text-[#C6A15B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artworks, artists, mediums, or traditions..."
                autoFocus
                className="w-full bg-transparent border-none text-[#F6F0E4] placeholder-[#F6F0E4]/40 text-sm focus:outline-none font-sans"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#C6A15B] text-[#05291F] text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#D9BD7A]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[#F6F0E4]/60 hover:text-white text-xs uppercase"
              >
                ✕
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#05291F] flex flex-col p-6 animate-fade-in md:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-[#C6A15B]/20">
            <div className="w-16 h-20 relative">
              <Image
                src="/assets/royal-art-logo.png"
                alt="Royal Art"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F6F0E4] hover:text-[#C6A15B]"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                className="text-2xl font-serif text-[#F6F0E4] hover:text-[#C6A15B] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-serif text-[#D9BD7A] flex items-center justify-between pt-4 border-t border-[#C6A15B]/20"
            >
              <span>Acquisition Cart</span>
              <span className="bg-[#C6A15B] text-[#05291F] text-xs px-2.5 py-0.5 rounded-full font-bold">
                {totalItems} items
              </span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-serif text-[#F6F0E4] hover:text-[#C6A15B]"
            >
              Collector Login
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-[#C6A15B]/20 text-xs text-[#F6F0E4]/60 text-center">
            <p className="font-serif">ROYAL ART — BEYOND ART</p>
            <p className="mt-1">Curated Original Artworks & Heritage</p>
          </div>
        </div>
      )}
    </>
  );
};
