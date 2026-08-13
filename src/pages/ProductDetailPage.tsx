import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, ChevronDown, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, productId?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartDrawerOpen } = useShop();

  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  const isWishlisted = isInWishlist(product.id);

  // Related products
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartDrawerOpen(false);
    onNavigate('cart');
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C5E45] hover:text-[#2D2B2A] transition-colors bg-[#FFFDF9] px-3.5 py-2 rounded-xl border border-[#E8E0D5]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#E8E0D5] relative shadow-xs">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-[#FFFDF9]/90 backdrop-blur-md text-[#8C5E45] border border-[#B8866B]/30 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                Best Seller ✨
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIdx === idx ? 'border-[#8C5E45] scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5E45] uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-[#2D2B2A]">
                <Star className="w-3.5 h-3.5 fill-[#E6C875] text-[#E6C875]" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#8C827A]">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-[#8C5E45] font-medium mt-1">
              {product.tagline}
            </p>
          </div>

          {/* Price Box */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#FAF6F0] border border-[#E8E0D5]">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2D2B2A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm sm:text-base text-[#9E968D] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-[#386641] bg-[#E8F5E9] px-2.5 py-1 rounded-full font-bold ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed font-light">
            {product.description}
          </p>

          {/* Handmade Care Banner */}
          <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#B8866B]/30 flex items-center gap-3 text-xs text-[#8C5E45]">
            <Sparkles className="w-5 h-5 shrink-0 text-[#E8C4C4]" />
            <div>
              <p className="font-bold">Handmade with care</p>
              <p className="text-[11px] text-[#6B6560]">Each piece is handmade, so slight variations may occur naturally.</p>
            </div>
          </div>

          {/* Color Variant Picker */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#2D2B2A] uppercase tracking-wider">
                Select Color: <span className="text-[#8C5E45] font-normal">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                      selectedColor === col.name
                        ? 'bg-[#2D2B2A] text-[#FFFDF9] border-[#2D2B2A]'
                        : 'bg-[#FFFDF9] text-[#2D2B2A] border-[#E8E0D5] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: col.hex }} />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & CTA buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E8E0D5] rounded-xl bg-[#FAF7F2] overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center font-bold text-[#2D2B2A] hover:bg-[#E8E0D5]"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold text-[#2D2B2A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-11 flex items-center justify-center font-bold text-[#2D2B2A] hover:bg-[#E8E0D5]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border border-[#E8E0D5] transition-colors ${
                  isWishlisted ? 'bg-[#FAF0F2] text-[#E8C4C4]' : 'bg-[#FFFDF9] text-[#2D2B2A]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#E8C4C4]' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-[#E8C4C4] hover:bg-[#DFB2B2] text-[#2D2B2A] font-bold text-xs sm:text-sm rounded-xl transition-colors"
            >
              Buy Now (Express Checkout)
            </button>
          </div>

          {/* Key Specs Cards */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F2ECE1] text-xs">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
              <span className="text-[#8C5E45] font-semibold block">Material</span>
              <span className="text-[#2D2B2A]">{product.materials}</span>
            </div>
            {product.dimensions && (
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
                <span className="text-[#8C5E45] font-semibold block">Dimensions</span>
                <span className="text-[#2D2B2A]">{product.dimensions}</span>
              </div>
            )}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
              <span className="text-[#8C5E45] font-semibold block">Estimated Delivery</span>
              <span className="text-[#2D2B2A]">{product.estimatedDelivery}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
              <span className="text-[#8C5E45] font-semibold block">Craft Lead Time</span>
              <span className="text-[#2D2B2A]">Small batch slow-made</span>
            </div>
          </div>

          {/* Expandable Accordions */}
          <div className="border-t border-[#F2ECE1] pt-4 space-y-2">
            {/* Description */}
            <div className="border border-[#E8E0D5] rounded-xl overflow-hidden bg-[#FFFDF9]">
              <button
                onClick={() => toggleAccordion('desc')}
                className="w-full p-4 text-left font-serif-title font-bold text-sm text-[#2D2B2A] flex justify-between items-center"
              >
                Full Product & Craft Description
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'desc' && (
                <div className="p-4 pt-0 text-xs text-[#6B6560] leading-relaxed border-t border-[#F2ECE1]/60">
                  <p>{product.description}</p>
                  <p className="mt-2 text-[#8C5E45] font-medium">{product.handmadeNotes}</p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="border border-[#E8E0D5] rounded-xl overflow-hidden bg-[#FFFDF9]">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full p-4 text-left font-serif-title font-bold text-sm text-[#2D2B2A] flex justify-between items-center"
              >
                Care Instructions
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <div className="p-4 pt-0 text-xs text-[#6B6560] leading-relaxed border-t border-[#F2ECE1]/60">
                  <p>{product.careInstructions}</p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border border-[#E8E0D5] rounded-xl overflow-hidden bg-[#FFFDF9]">
              <button
                onClick={() => toggleAccordion('ship')}
                className="w-full p-4 text-left font-serif-title font-bold text-sm text-[#2D2B2A] flex justify-between items-center"
              >
                Shipping & Returns
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'ship' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'ship' && (
                <div className="p-4 pt-0 text-xs text-[#6B6560] leading-relaxed border-t border-[#F2ECE1]/60 space-y-1">
                  <p>• Free express shipping across India on orders over ₹1,499.</p>
                  <p>• Standard shipping takes 3-6 business days.</p>
                  <p>• Since every piece is handmade to order, we accept exchanges for damaged items within 48 hours of delivery.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#E8E0D5] space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
              Pairing Suggestions
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#2D2B2A]">
              Complete Your Look
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onNavigateToDetail={(id) => onNavigate('product', id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
