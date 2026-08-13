import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface SearchOverlayProps {
  onNavigateToDetail: (id: string) => void;
  onNavigateToShop: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onNavigateToDetail, onNavigateToShop }) => {
  const { isSearchOpen, setIsSearchOpen, setSearchQuery: setGlobalSearchQuery } = useShop();
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    if (!isSearchOpen) setLocalQuery('');
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = localQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(localQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(localQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(localQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(localQuery.toLowerCase()))
      )
    : PRODUCTS.slice(0, 4);

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    onNavigateToDetail(id);
  };

  const handleFullSearch = () => {
    setGlobalSearchQuery(localQuery);
    setIsSearchOpen(false);
    onNavigateToShop();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#2D2B2A]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E8E0D5] overflow-hidden"
        >
          {/* Search Bar Input */}
          <div className="p-4 border-b border-[#E8E0D5] flex items-center gap-3 bg-[#FAF7F2]">
            <Search className="w-5 h-5 text-[#8C5E45]" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search handmade bags, daisy totes, flower keychains, bunny plushies..."
              autoFocus
              className="flex-1 bg-transparent border-none text-base text-[#2D2B2A] placeholder:text-[#9E968D] focus:outline-none font-medium"
              onKeyDown={(e) => e.key === 'Enter' && handleFullSearch()}
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery('')}
                className="text-xs text-[#8C827A] hover:text-[#2D2B2A] px-2 py-1 bg-[#E8E0D5] rounded-md"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#6B6560] hover:text-[#2D2B2A] rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Instant Results */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 text-xs text-[#8C5E45] font-semibold uppercase tracking-wider">
              <span>{localQuery ? `Search Results (${results.length})` : 'Popular Searches'}</span>
              {localQuery && (
                <button onClick={handleFullSearch} className="hover:underline flex items-center gap-1">
                  View all in Shop <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F4ECE1] border border-[#E8E0D5]/70 cursor-pointer transition-all"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-xl bg-white border border-[#E8E0D5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-title font-bold text-sm text-[#2D2B2A] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#8C5E45] font-medium">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Keyword Pills */}
            <div className="mt-5 pt-4 border-t border-[#F2ECE1]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D] block mb-2">
                Popular Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {['granny square', 'sky blue', 'bow tote', 'flower keychain', 'custom gift'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setLocalQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8C4C4]/20 border border-[#E8E0D5] text-[#2D2B2A] transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
