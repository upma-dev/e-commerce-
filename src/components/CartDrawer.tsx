import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToCheckout, onNavigateToShop }) => {
  const { cart, isCartDrawerOpen, setIsCartDrawerOpen, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useShop();

  const freeShippingThreshold = 1499;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    onNavigateToCheckout();
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-[#2D2B2A]/50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8E0D5]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E8E0D5] flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#8C5E45]" />
                <h2 className="font-serif-title text-xl font-bold text-[#2D2B2A]">
                  Your Cozy Cart ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 text-[#6B6560] hover:text-[#2D2B2A] rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-[#FAF6F0] px-5 py-3 border-b border-[#E8E0D5]/60 text-xs">
              {remainingForFreeShipping > 0 ? (
                <p className="text-[#6B6560] font-medium mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8866B]" />
                  Add <span className="font-bold text-[#8C5E45]">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-semibold text-[#2D2B2A]">Free Shipping</span>!
                </p>
              ) : (
                <p className="text-[#386641] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#386641]" />
                  Yay! You unlocked FREE India-wide shipping! 🚚✨
                </p>
              )}
              <div className="w-full bg-[#E8E0D5] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#B8866B] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6B6560]">
                  <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mb-3 text-[#B8866B]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-serif-title text-xl font-semibold text-[#2D2B2A] mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#8C827A] max-w-xs mb-6">
                    Our handmade bags and cozy flower accessories are waiting to be adopted!
                  </p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      onNavigateToShop();
                    }}
                    className="py-2.5 px-6 bg-[#2D2B2A] text-[#FFFDF9] rounded-xl text-xs font-semibold hover:bg-[#8C5E45] transition-colors"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5]/80"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-white border border-[#E8E0D5]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif-title font-bold text-sm text-[#2D2B2A] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#9E968D] hover:text-[#D9534F] p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.selectedColor && (
                          <span className="text-[11px] text-[#8C5E45] font-medium block mt-0.5">
                            Color: {item.selectedColor}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#E8E0D5] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#2D2B2A] hover:bg-[#FAF7F2]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#2D2B2A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#2D2B2A] hover:bg-[#FAF7F2]"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#2D2B2A]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E8E0D5] bg-[#FAF7F2] space-y-3">
                <div className="space-y-1.5 text-xs text-[#6B6560]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#2D2B2A]">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {cartSubtotal >= freeShippingThreshold ? (
                        <span className="text-[#386641] font-semibold">FREE</span>
                      ) : (
                        '₹99'
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E0D5] flex justify-between items-baseline">
                  <span className="font-serif-title text-base font-bold text-[#2D2B2A]">
                    Total Amount
                  </span>
                  <span className="text-lg font-extrabold text-[#2D2B2A]">
                    ₹{(cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : 99)).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
