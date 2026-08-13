import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onNavigateToDetail?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigateToDetail }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onNavigateToDetail) {
      onNavigateToDetail(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#FFFDF9] rounded-2xl border border-[#E8E0D5]/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#FAF6F0] overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#FAF7F2]/90 backdrop-blur-md text-[#8C5E45] border border-[#B8866B]/30 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Best Seller ✨
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#87CEEB]/90 backdrop-blur-md text-[#1E3A8A] border border-[#87CEEB]/40 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              New Batch ☁️
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Wishlist"
          className="absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#2D2B2A] hover:bg-white hover:scale-110 transition-all duration-200 shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#E8C4C4] text-[#E8C4C4]' : 'text-[#363331] hover:text-[#E8C4C4]'
            }`}
          />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2.5 px-3 bg-[#FAF7F2]/95 backdrop-blur-md text-[#2D2B2A] text-xs font-medium rounded-xl border border-[#E8E0D5] hover:bg-[#2D2B2A] hover:text-[#FFFDF9] transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Details Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#8C5E45] font-medium mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-[#2D2B2A]">
              <Star className="w-3 h-3 fill-[#E6C875] text-[#E6C875]" />
              <span className="font-semibold text-xs">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleCardClick}
            className="font-serif-title text-base sm:text-lg font-semibold text-[#2D2B2A] leading-snug hover:text-[#8C5E45] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B6560] line-clamp-1 mt-0.5 font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1]/80 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-[#2D2B2A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E968D] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label="Add to Cart"
            className="p-2 sm:px-3 sm:py-2 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] rounded-xl text-xs font-medium transition-colors duration-200 flex items-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
