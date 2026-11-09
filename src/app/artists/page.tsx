'use client';

import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { ArtistCard } from '@/components/artist/ArtistCard';
import { artists, getArtistStyles, getArtistLocations } from '@/data/artists';

export default function ArtistsPage() {
  const [search, setSearch] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 8;
  const styles = useMemo(() => ['All', ...getArtistStyles()], []);
  const locations = useMemo(() => ['All', ...getArtistLocations()], []);

  // Filtered artists
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesSpecialty = artist.specialty.toLowerCase().includes(q);
        const matchesBio = artist.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesSpecialty && !matchesBio) {
          return false;
        }
      }

      if (selectedStyle !== 'All' && !artist.style.includes(selectedStyle)) {
        return false;
      }

      if (selectedLocation !== 'All' && artist.location !== selectedLocation) {
        return false;
      }

      return true;
    });
  }, [search, selectedStyle, selectedLocation]);

  // Sorted artists
  const sortedArtists = useMemo(() => {
    const list = [...filteredArtists];
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'artworks') {
      list.sort((a, b) => b.artworkCount - a.artworkCount);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredArtists, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedArtists.length / itemsPerPage);
  const paginatedArtists = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedArtists.slice(start, start + itemsPerPage);
  }, [sortedArtists, currentPage, itemsPerPage]);

  const resetFilters = () => {
    setSearch('');
    setSelectedStyle('All');
    setSelectedLocation('All');
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow">
        {/* Page Hero */}
        <PageHero
          title="Our Artists"
          subtitle="Discover the creative minds and unique stories behind every masterpiece."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Artists' },
          ]}
        />

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Filter Sidebar */}
            <aside className="bg-white p-6 border border-[#C6A15B]/25 rounded-xs shadow-xs h-fit space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
                <h3 className="font-serif text-lg font-medium text-[#25251F]">
                  Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#C6A15B] hover:text-[#073B2E] flex items-center gap-1 transition-colors uppercase tracking-wider font-sans"
                >
                  <RotateCcw size={12} />
                  <span>Clear All</span>
                </button>
              </div>

              {/* Search Artist */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                  Search Artist
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by artist name..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#C6A15B] text-[#25251F]"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
                </div>
              </div>

              {/* Art Style */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-3 font-medium">
                  Art Style
                </label>
                <div className="space-y-2">
                  {styles.map((style) => {
                    const count =
                      style === 'All'
                        ? artists.length
                        : artists.filter((a) => a.style.includes(style)).length;
                    return (
                      <label
                        key={style}
                        className="flex items-center justify-between text-xs text-[#25251F]/80 hover:text-[#073B2E] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="artist_style"
                            checked={selectedStyle === style}
                            onChange={() => {
                              setSelectedStyle(style);
                              setCurrentPage(1);
                            }}
                            className="accent-[#073B2E]"
                          />
                          <span>{style}</span>
                        </div>
                        <span className="text-[11px] text-[#25251F]/40 font-mono">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#C6A15B] text-[#25251F]"
                >
                  <option value="All">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setCurrentPage(1)}
                className="w-full py-2.5 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#0A4F3C]"
              >
                Apply Filters
              </button>
            </aside>

            {/* Right: Artist Directory Grid */}
            <div className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <div className="bg-white p-4 border border-[#C6A15B]/20 rounded-xs flex items-center justify-between shadow-xs">
                <span className="font-serif text-sm text-[#25251F]">
                  Showing <strong className="text-[#073B2E] font-semibold">{filteredArtists.length}</strong> Masters
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#25251F]/60 uppercase tracking-wider hidden sm:inline">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2.5 py-1.5 bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs text-xs text-[#25251F] focus:outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                    <option value="artworks">Most Artworks</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Grid: 4 columns on large screens */}
              {paginatedArtists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#C6A15B]/20 p-12 text-center rounded-xs space-y-4">
                  <p className="font-serif text-2xl text-[#25251F]">
                    No artists found matching your criteria.
                  </p>
                  <p className="text-xs text-[#25251F]/60 max-w-md mx-auto">
                    Try resetting filters to explore all featured creators.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-wider rounded-xs hover:bg-[#0A4F3C]"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-1.5 border border-[#C6A15B]/30 text-xs text-[#25251F] hover:bg-[#073B2E] hover:text-[#F6F0E4] disabled:opacity-40 rounded-xs"
                  >
                    ← Previous
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-xs text-xs font-serif ${
                        currentPage === i + 1
                          ? 'bg-[#073B2E] text-[#F6F0E4] font-bold'
                          : 'border border-[#C6A15B]/30 text-[#25251F] hover:bg-[#C6A15B]/20'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-1.5 border border-[#C6A15B]/30 text-xs text-[#25251F] hover:bg-[#073B2E] hover:text-[#F6F0E4] disabled:opacity-40 rounded-xs"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
