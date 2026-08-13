import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { useShop } from '../context/ShopContext';

interface ShopPageProps {
  onNavigateToDetail: (id: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigateToDetail }) => {
  const { searchQuery, setSearchQuery } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const categories: (string | ProductCategory)[] = [
    'All',
    'Crochet Bags',
    'Accessories',
    'Home & Decor',
    'Custom Creations',
    'New Arrivals'
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category match
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'New Arrivals' && !product.isNew) return false;
        if (selectedCategory !== 'New Arrivals' && product.category !== selectedCategory) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTags) return false;
      }

      // Price match
      if (product.price > priceRange) return false;

      // In stock
      if (onlyInStock && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, priceRange, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(3000);
    setSortBy('featured');
    setOnlyInStock(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
          Artisanal Catalog
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#2D2B2A]">
          Shop Handmade
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6560] font-light">
          Little things, thoughtfully made. Stitched with love in small slow batches.
        </p>
      </div>

      {/* Main Search & Quick Controls Bar */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#E8E0D5] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C5E45]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bags, clips, keychains..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs text-[#2D2B2A] placeholder:text-[#9E968D] focus:outline-none focus:border-[#B8866B]"
          />
        </div>

        {/* Sort and Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs font-semibold text-[#2D2B2A]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C5E45]" />
            Filters
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C827A] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl text-xs text-[#2D2B2A] font-semibold focus:outline-none"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated ⭐</option>
              <option value="newest">New Arrivals ☁️</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-4 py-2 rounded-xl whitespace-nowrap transition-all font-medium border ${
              selectedCategory === cat
                ? 'bg-[#2D2B2A] text-[#FFFDF9] border-[#2D2B2A] shadow-xs'
                : 'bg-[#FFFDF9] text-[#2D2B2A] border-[#E8E0D5] hover:bg-[#FAF7F2]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters Sidebar + Product Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Panel */}
        <div className="hidden md:block lg:col-span-3 bg-[#FFFDF9] rounded-2xl p-5 border border-[#E8E0D5] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE1]">
            <h3 className="font-serif-title font-bold text-lg text-[#2D2B2A] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8C5E45]" />
              Filter Catalog
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#8C5E45] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#2D2B2A]">
              <span>Max Price</span>
              <span className="text-[#8C5E45]">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="499"
              max="3000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#2D2B2A]"
            />
            <div className="flex justify-between text-[10px] text-[#9E968D]">
              <span>₹499</span>
              <span>₹3,000</span>
            </div>
          </div>

          {/* Availability Filter */}
          <div className="pt-3 border-t border-[#F2ECE1]">
            <label className="flex items-center gap-2 text-xs font-medium text-[#2D2B2A] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded-md text-[#2D2B2A] focus:ring-0 accent-[#2D2B2A]"
              />
              In Stock & Ready to Ship Only
            </label>
          </div>

          <div className="p-4 bg-[#FAF6F0] rounded-xl text-xs space-y-1 text-[#6B6560]">
            <p className="font-semibold text-[#8C5E45] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Need a custom color?
            </p>
            <p className="text-[11px] leading-relaxed">
              We offer bespoke color combinations for all bags and keychains!
            </p>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span>Showing <strong className="text-[#2D2B2A]">{filteredProducts.length}</strong> handmade items</span>
            {selectedCategory !== 'All' && (
              <span className="bg-[#FAF7F2] text-[#8C5E45] px-2.5 py-1 rounded-full font-medium">
                Category: {selectedCategory}
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#FFFDF9] rounded-2xl p-12 text-center border border-[#E8E0D5] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] text-[#8C5E45] flex items-center justify-center mx-auto text-xl">
                🧶
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#2D2B2A]">
                No handmade items found
              </h3>
              <p className="text-xs text-[#8C827A] max-w-sm mx-auto">
                Try adjusting your search keywords, price slider or category filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="py-2.5 px-6 bg-[#2D2B2A] text-[#FFFDF9] rounded-xl text-xs font-semibold hover:bg-[#8C5E45] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigateToDetail={onNavigateToDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
