'use client';

import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, RotateCcw, Filter, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { NewArrivalsCarousel } from '@/components/artwork/NewArrivalsCarousel';
import { artworks, getNewArrivals, getArtworkCategories, getArtworkMediums } from '@/data/artworks';
import { artists } from '@/data/artists';
import { formatINR } from '@/lib/utils';

export default function ArtworksPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArtist, setSelectedArtist] = useState<string>('All');
  const [selectedMedium, setSelectedMedium] = useState<string>('All');
  const [priceMax, setPriceMax] = useState<number>(500000);
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const itemsPerPage = 6;
  const newArrivals = useMemo(() => getNewArrivals(), []);
  const categories = useMemo(() => ['All', ...getArtworkCategories()], []);
  const mediums = useMemo(() => ['All', ...getArtworkMediums()], []);

  // Filtered artworks
  const filteredArtworks = useMemo(() => {
    return artworks.filter((item) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesArtist = item.artistName.toLowerCase().includes(q);
        const matchesMedium = item.medium.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesArtist && !matchesMedium && !matchesCategory) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Artist
      if (selectedArtist !== 'All' && item.artistId !== selectedArtist) {
        return false;
      }

      // Medium
      if (selectedMedium !== 'All' && item.medium !== selectedMedium) {
        return false;
      }

      // Price
      if (item.price > priceMax) {
        return false;
      }

      // Availability
      if (availableOnly && !item.available) {
        return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedArtist, selectedMedium, priceMax, availableOnly]);

  // Sorted artworks
  const sortedArtworks = useMemo(() => {
    const list = [...filteredArtworks];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.year - a.year);
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredArtworks, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedArtworks.length / itemsPerPage);
  const paginatedArtworks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedArtworks.slice(start, start + itemsPerPage);
  }, [sortedArtworks, currentPage, itemsPerPage]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedArtist('All');
    setSelectedMedium('All');
    setPriceMax(500000);
    setAvailableOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow">
        {/* Page Hero */}
        <PageHero
          title="Discover Our Artworks"
          subtitle="Original creations. Individual stories. Timeless expression."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Artworks' },
          ]}
        />

        {/* New Arrivals Exhibition Carousel */}
        <NewArrivalsCarousel items={newArrivals} />

        {/* Main Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filter Sidebar (Left Column) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-7 bg-white p-6 border border-[#C6A15B]/25 rounded-xs shadow-xs h-fit sticky top-28">
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

              {/* Search */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                  Search Artwork
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by title, style..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#C6A15B] text-[#25251F]"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
                </div>
              </div>

              {/* Category Checkboxes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-3 font-medium">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const count =
                      cat === 'All'
                        ? artworks.length
                        : artworks.filter((a) => a.category === cat).length;
                    return (
                      <label
                        key={cat}
                        className="flex items-center justify-between text-xs text-[#25251F]/80 hover:text-[#073B2E] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() => {
                              setSelectedCategory(cat);
                              setCurrentPage(1);
                            }}
                            className="accent-[#073B2E]"
                          />
                          <span>{cat}</span>
                        </div>
                        <span className="text-[11px] text-[#25251F]/40 font-mono">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Artist Dropdown */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                  Artist
                </label>
                <select
                  value={selectedArtist}
                  onChange={(e) => {
                    setSelectedArtist(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#C6A15B] text-[#25251F]"
                >
                  <option value="All">All Artists</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Medium Dropdown */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                  Medium
                </label>
                <select
                  value={selectedMedium}
                  onChange={(e) => {
                    setSelectedMedium(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#C6A15B] text-[#25251F]"
                >
                  {mediums.map((med) => (
                    <option key={med} value={med}>
                      {med}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-wider text-[#25251F]/70 font-medium">
                    Max Price
                  </span>
                  <span className="font-serif font-semibold text-[#073B2E]">
                    {formatINR(priceMax)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#073B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#25251F]/50 mt-1">
                  <span>₹20,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-2 border-t border-[#C6A15B]/15">
                <label className="flex items-center gap-2 text-xs text-[#25251F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => {
                      setAvailableOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="accent-[#073B2E] rounded-xs"
                  />
                  <span className="font-medium">Available Works Only</span>
                </label>
              </div>
            </aside>

            {/* Main Catalog View (Right 3 Columns) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <div className="bg-white p-4 border border-[#C6A15B]/20 rounded-xs flex flex-wrap items-center justify-between gap-4 shadow-xs">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-wider rounded-xs"
                >
                  <Filter size={14} />
                  <span>Filters</span>
                </button>

                {/* Result Count */}
                <span className="font-serif text-sm text-[#25251F]">
                  Showing <strong className="text-[#073B2E] font-semibold">{filteredArtworks.length}</strong> Artworks
                </span>

                {/* Right Controls: Sort & Grid/List Toggle */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#25251F]/60 uppercase tracking-wider hidden sm:inline">Sort By:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-2.5 py-1.5 bg-[#F6F0E4]/60 border border-[#C6A15B]/30 rounded-xs text-xs text-[#25251F] focus:outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                  <div className="flex items-center border border-[#C6A15B]/30 rounded-xs overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid View"
                      className={`p-1.5 transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-[#073B2E] text-[#F6F0E4]'
                          : 'bg-white text-[#25251F]/60 hover:text-[#073B2E]'
                      }`}
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      aria-label="List View"
                      className={`p-1.5 transition-colors ${
                        viewMode === 'list'
                          ? 'bg-[#073B2E] text-[#F6F0E4]'
                          : 'bg-white text-[#25251F]/60 hover:text-[#073B2E]'
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Artworks Listing Grid / List */}
              {paginatedArtworks.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {paginatedArtworks.map((artwork) => (
                    <ArtworkCard
                      key={artwork.id}
                      artwork={artwork}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white border border-[#C6A15B]/20 p-12 text-center rounded-xs space-y-4">
                  <p className="font-serif text-2xl text-[#25251F]">
                    No artworks found matching your criteria.
                  </p>
                  <p className="text-xs text-[#25251F]/60 max-w-md mx-auto">
                    Try adjusting your filters, widening the price range, or searching for other themes and artists.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-wider rounded-xs hover:bg-[#0A4F3C]"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-1.5 border border-[#C6A15B]/30 text-xs text-[#25251F] hover:bg-[#073B2E] hover:text-[#F6F0E4] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#25251F] rounded-xs transition-colors"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-xs text-xs font-serif transition-colors ${
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
                    className="px-3.5 py-1.5 border border-[#C6A15B]/30 text-xs text-[#25251F] hover:bg-[#073B2E] hover:text-[#F6F0E4] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#25251F] rounded-xs transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Filter Slide-Over Panel */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto space-y-6 animate-slide-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
              <h3 className="font-serif text-xl font-medium text-[#25251F]">
                Filters
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-[#25251F]/70 hover:text-[#073B2E]"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                Category
              </label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-xs text-[#25251F] cursor-pointer">
                    <input
                      type="radio"
                      name="m_category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-[#073B2E]"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Artist */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                Artist
              </label>
              <select
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F6F0E4] border border-[#C6A15B]/30 rounded-xs"
              >
                <option value="All">All Artists</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-widest font-semibold rounded-xs"
            >
              Apply Filters ({filteredArtworks.length})
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
