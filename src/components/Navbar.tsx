import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { cartCount, wishlist, setIsCartDrawerOpen, setIsSearchOpen, setCustomOrderModalOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'story', label: 'Our Story' },
    { id: 'custom-orders', label: 'Custom Orders' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D5]/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#363331] text-[#FFFDF9] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#E8C4C4] animate-pulse" />
        <span>Handmade with love • Free Shipping on India orders over ₹1,499</span>
        <Sparkles className="w-3 h-3 text-[#E8C4C4] animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Mobile Menu Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-[#2D2B2A] hover:bg-[#E8E0D5]/50 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="p-2 text-[#2D2B2A] hover:bg-[#E8E0D5]/50 rounded-xl transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#E8C4C4]/40 flex items-center justify-center text-[#8C5E45] font-serif font-bold text-lg group-hover:scale-105 transition-transform">
            🌸
          </div>
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold tracking-tight text-[#2D2B2A] leading-none">
              Twee Haven
            </h1>
            <span className="text-[10px] text-[#8C5E45] font-medium tracking-widest uppercase block -mt-0.5">
              Cozy Creations ✨
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-1 transition-colors ${
                currentPage === link.id
                  ? 'text-[#8C5E45] font-semibold'
                  : 'text-[#2D2B2A] hover:text-[#8C5E45]'
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C5E45] rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="hidden md:flex p-2.5 text-[#2D2B2A] hover:text-[#8C5E45] hover:bg-[#E8E0D5]/50 rounded-xl transition-all"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNavClick('shop')}
            aria-label="Wishlist"
            className="relative p-2 sm:p-2.5 text-[#2D2B2A] hover:text-[#8C5E45] hover:bg-[#E8E0D5]/50 rounded-xl transition-all"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E8C4C4] text-[#2D2B2A] text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Cart"
            className="relative p-2 sm:px-3 sm:py-2 bg-[#2D2B2A] text-[#FFFDF9] hover:bg-[#8C5E45] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="bg-[#E8C4C4] text-[#2D2B2A] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Slide Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFFDF9] border-b border-[#E8E0D5] px-6 py-6 space-y-4 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2 text-base font-serif-title font-semibold transition-colors ${
                    currentPage === link.id ? 'text-[#8C5E45]' : 'text-[#2D2B2A]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E0D5] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('custom-orders');
                }}
                className="w-full py-3 bg-[#E8C4C4]/40 hover:bg-[#E8C4C4]/60 text-[#2D2B2A] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-[#B8866B]/30"
              >
                <Send className="w-3.5 h-3.5 text-[#8C5E45]" />
                Request Custom Order 💌
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
