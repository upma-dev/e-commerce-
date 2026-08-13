import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Heart, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, CreditCard, QrCode, Truck, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';

interface CartPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal, toggleWishlist, showToast } = useShop();

  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'upi' as 'upi' | 'card' | 'cod'
  });

  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  const freeShippingThreshold = 1499;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'TWEE10') {
      setDiscountPercent(10);
      showToast('Applied 10% Welcome Discount! 🎉');
    } else {
      showToast('Invalid coupon code. Try TWEE10 ✨');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address || !formData.pincode) {
      showToast('Please fill in all shipping details');
      return;
    }

    const order: OrderDetails = {
      orderId: `TH-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      discount: discountAmount,
      total: totalAmount,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    setPlacedOrder(order);
    clearCart();
    setStep('confirmed');
    showToast('Order placed successfully! 💖');
  };

  if (step === 'confirmed' && placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#E8E0D5] shadow-lg space-y-6"
        >
          <div className="w-16 h-16 bg-[#E8F5E9] text-[#386641] rounded-full flex items-center justify-center mx-auto text-3xl">
            ✨
          </div>

          <div>
            <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block mb-1">
              Order Confirmed #{placedOrder.orderId}
            </span>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
              Thank you for supporting handmade. 💖
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6560] max-w-md mx-auto mt-2">
              We have received your order! Our artisans will begin crocheting and preparing your slow-made pieces with care.
            </p>
          </div>

          {/* Order Details Receipt */}
          <div className="bg-[#FAF6F0] rounded-2xl p-6 text-left space-y-4 border border-[#E8E0D5] text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-[#E8E0D5]">
              <div>
                <p className="font-bold text-[#2D2B2A]">Ship to: {placedOrder.customerName}</p>
                <p className="text-[#8C827A]">{placedOrder.address}, {placedOrder.city}, {placedOrder.pincode}</p>
              </div>
              <span className="bg-[#E8C4C4]/40 text-[#2D2B2A] px-2.5 py-1 rounded-full font-bold uppercase">
                {placedOrder.paymentMethod.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2">
              {placedOrder.items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#2D2B2A]">
                    {item.quantity}x {item.product.name} ({item.selectedColor})
                  </span>
                  <span className="font-bold text-[#2D2B2A]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8E0D5] flex justify-between font-bold text-sm text-[#2D2B2A]">
              <span>Total Paid</span>
              <span>₹{placedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="py-3 px-8 bg-[#2D2B2A] text-[#FFFDF9] hover:bg-[#8C5E45] font-bold text-xs rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="py-3 px-8 bg-[#FAF7F2] text-[#2D2B2A] hover:bg-[#E8E0D5] font-bold text-xs rounded-xl border border-[#E8E0D5]"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
          {step === 'cart' ? 'Your Shopping Bag' : 'Express Checkout'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6560]">
          {step === 'cart'
            ? 'Review your selected handmade creations before checkout.'
            : 'Enter your delivery details to complete your handmade order.'}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-3xl p-12 text-center border border-[#E8E0D5] max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-2xl text-[#8C5E45]">
            🛍️
          </div>
          <h2 className="font-serif-title text-2xl font-bold text-[#2D2B2A]">
            Your cart is empty
          </h2>
          <p className="text-xs text-[#8C827A]">
            Looks like you haven't added any crochet bags or accessories yet!
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="py-3 px-8 bg-[#2D2B2A] text-[#FFFDF9] rounded-xl font-bold text-xs hover:bg-[#8C5E45] transition-colors"
          >
            Explore Shop Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6">
            {step === 'cart' ? (
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#E8E0D5] flex gap-4 items-center"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-[#FAF6F0] border border-[#E8E0D5]"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3
                          onClick={() => onNavigate('product', item.product.id)}
                          className="font-serif-title font-bold text-base text-[#2D2B2A] truncate cursor-pointer hover:text-[#8C5E45]"
                        >
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9E968D] hover:text-[#D9534F] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#8C5E45] font-medium">
                        Color: {item.selectedColor}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E8E0D5] rounded-lg bg-[#FAF7F2] overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#2D2B2A] hover:bg-[#E8E0D5]"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#2D2B2A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#2D2B2A] hover:bg-[#E8E0D5]"
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
                ))}

                <button
                  onClick={() => onNavigate('shop')}
                  className="text-xs font-semibold text-[#8C5E45] hover:underline flex items-center gap-1.5 pt-2"
                >
                  ← Add more items from shop
                </button>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8E0D5] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE1]">
                  <h3 className="font-serif-title font-bold text-xl text-[#2D2B2A]">
                    Delivery Shipping Address
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-xs text-[#8C5E45] hover:underline"
                  >
                    Edit Cart Items
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#2D2B2A] mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2B2A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ananya@example.com"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2B2A] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2B2A] mb-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400001"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-[#2D2B2A] mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House No, Apartment, Landmark"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2B2A] mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2D2B2A] mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-4 border-t border-[#F2ECE1] space-y-3">
                  <h4 className="font-serif-title font-bold text-lg text-[#2D2B2A]">
                    Payment Method
                  </h4>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentMethod: 'upi' }))}
                      className={`p-3 rounded-xl border font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-[#2D2B2A] bg-[#2D2B2A] text-white shadow-xs'
                          : 'border-[#E8E0D5] bg-[#FAF7F2] text-[#2D2B2A]'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-[#E8C4C4]" />
                      UPI / GPay
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentMethod: 'card' }))}
                      className={`p-3 rounded-xl border font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#2D2B2A] bg-[#2D2B2A] text-white shadow-xs'
                          : 'border-[#E8E0D5] bg-[#FAF7F2] text-[#2D2B2A]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#E8C4C4]" />
                      Debit/Credit Card
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentMethod: 'cod' }))}
                      className={`p-3 rounded-xl border font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#2D2B2A] bg-[#2D2B2A] text-white shadow-xs'
                          : 'border-[#E8E0D5] bg-[#FAF7F2] text-[#2D2B2A]'
                      }`}
                    >
                      <Truck className="w-5 h-5 text-[#E8C4C4]" />
                      Cash on Delivery
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-bold text-sm rounded-xl transition-colors shadow-md"
                >
                  Place Order Now (₹{totalAmount.toLocaleString('en-IN')})
                </button>
              </form>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8E0D5] space-y-6">
            <h3 className="font-serif-title font-bold text-xl text-[#2D2B2A] pb-3 border-b border-[#F2ECE1]">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            {step === 'cart' && (
              <form onSubmit={handleApplyCoupon} className="flex gap-2 text-xs">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo Code (Try TWEE10)"
                  className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none text-[#2D2B2A] uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF7F2] border border-[#E8E0D5] text-[#2D2B2A] font-bold rounded-xl hover:bg-[#2D2B2A] hover:text-white transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-[#6B6560]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#2D2B2A]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#386641] font-semibold">
                  <span>Welcome Discount ({discountPercent}%)</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#386641] font-semibold">FREE (Over ₹1,499)</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#F2ECE1] flex justify-between items-baseline">
                <span className="font-serif-title text-lg font-bold text-[#2D2B2A]">
                  Total Amount
                </span>
                <span className="text-xl font-extrabold text-[#2D2B2A]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {step === 'cart' && (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="p-4 bg-[#FAF6F0] rounded-xl text-xs space-y-1.5 text-[#6B6560]">
              <p className="font-semibold text-[#2D2B2A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8C5E45]" /> Secure Checkout Promise
              </p>
              <p className="text-[11px] leading-relaxed">
                Packaged carefully in eco-conscious pink boxes. Includes tracking link upon dispatch.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
