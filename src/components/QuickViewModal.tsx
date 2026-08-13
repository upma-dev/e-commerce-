import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Heart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface QuickViewModalProps {
  onNavigateToDetail: (id: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigateToDetail }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const colorName = selectedColor || product.colors[0]?.name;

  const handleAddToCart = () => {
    addToCart(product, quantity, colorName);
    setQuickViewProduct(null);
  };

  const handleGoToDetail = () => {
    onNavigateToDetail(product.id);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2B2A]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden border border-[#E8E0D5] max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#6B6560] hover:text-[#2D2B2A] bg-white/80 rounded-full backdrop-blur-md shadow-xs transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Images */}
          <div className="md:w-1/2 bg-[#FAF6F0] p-6 flex flex-col justify-between">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-xs mb-3">
              <img
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImgIdx === idx ? 'border-[#8C5E45] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Summary & Form */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C5E45] font-semibold uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#2D2B2A]">
                  <Star className="w-3.5 h-3.5 fill-[#E6C875] text-[#E6C875]" />
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              <h2 className="font-serif-title text-2xl font-bold text-[#2D2B2A] mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-[#2D2B2A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E968D] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#8C5E45] bg-[#FAF6F0] px-2 py-0.5 rounded-full font-medium ml-auto">
                  Handmade Slow Batch
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed mb-5">
                {product.shortDescription}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#2D2B2A] uppercase tracking-wider mb-2">
                    Color: <span className="text-[#8C5E45] font-normal">{colorName}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`group relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          colorName === col.name ? 'border-[#2D2B2A] scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        title={col.name}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: col.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#2D2B2A] uppercase tracking-wider mb-2">
                  Quantity
                </label>
                <div className="flex items-center w-32 border border-[#E8E0D5] rounded-xl bg-[#FAF7F2] overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-9 flex items-center justify-center text-sm font-bold text-[#2D2B2A] hover:bg-[#E8E0D5]"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-semibold text-[#2D2B2A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-9 flex items-center justify-center text-sm font-bold text-[#2D2B2A] hover:bg-[#E8E0D5]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#F2ECE1]">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border border-[#E8E0D5] transition-colors ${
                    isWishlisted ? 'bg-[#FAF0F2] text-[#E8C4C4]' : 'bg-[#FAF7F2] text-[#2D2B2A] hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#E8C4C4]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleGoToDetail}
                className="w-full py-2.5 text-xs text-[#8C5E45] font-semibold hover:underline flex items-center justify-center gap-1"
              >
                View Full Specifications & Craft Details
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
