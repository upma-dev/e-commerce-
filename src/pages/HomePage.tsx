import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Instagram, Send, Star, ShieldCheck, Check } from 'lucide-react';
import { ThreeYarnHero } from '../components/ThreeYarnHero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, INSTAGRAM_POSTS } from '../data/products';
import { useShop } from '../context/ShopContext';

interface HomePageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { setCustomOrderModalOpen } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-20 pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION WITH PINTEREST MOODBOARD & THREE.JS CANVAS */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FAF7F2] overflow-hidden pt-6 pb-14 bg-grain">
        {/* Three.js 3D Floating Yarn Canvas Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <ThreeYarnHero className="w-full h-full" />
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/30 via-transparent to-[#FAF7F2] z-0 pointer-events-none" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#E8C4C4]/20 rounded-full blur-3xl pointer-events-none animate-soft-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C5D5C1]/20 rounded-full blur-3xl pointer-events-none animate-soft-pulse" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column - Pinterest Typography & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Live Badge Pill */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#B8866B]/30 shadow-xs text-xs font-semibold text-[#8C5E45]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8C4C4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C5E45]"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#8C5E45]" />
                <span className="uppercase tracking-wider">Slow Batch No. 24 Live • Made with Love</span>
              </motion.div>

              {/* Main Pinterest Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif-title text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-[#2D2B2A] tracking-tight leading-[1.12]"
              >
                Handmade with love,<br />
                <span className="relative inline-block italic font-normal text-[#8C5E45] mt-1">
                  made to be yours.
                  {/* Decorative Wiggle Underline */}
                  <svg className="absolute -bottom-3 left-0 w-full h-4 text-[#E8C4C4]" viewBox="0 0 240 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12C35 4 70 14 105 5C140 -4 175 14 237 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-[#6B6560] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed pt-1"
              >
                Cozy, handcrafted crochet bags, plushies & flower bouquets made slowly, thoughtfully and just for you in our boutique studio.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
              >
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto py-4 px-8 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-medium rounded-2xl text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
                >
                  Shop Handmade Collection
                  <ArrowRight className="w-4 h-4 text-[#E8C4C4] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('custom-orders')}
                  className="w-full sm:w-auto py-4 px-8 bg-[#FFFDF9]/90 hover:bg-white text-[#2D2B2A] font-medium rounded-2xl text-sm transition-all border border-[#E8E0D5] hover:border-[#B8866B] flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
                >
                  <Send className="w-4 h-4 text-[#8C5E45]" />
                  Request Custom Order
                </button>
              </motion.div>

              {/* Pinterest Trust Pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-6 border-t border-[#E8E0D5]/60 flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 text-xs text-[#8C827A] font-medium"
              >
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/80 px-3 py-1.5 rounded-full border border-[#E8E0D5]">
                  <Check className="w-3.5 h-3.5 text-[#8C5E45]" /> 1,300+ Happy Bag Lovers
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/80 px-3 py-1.5 rounded-full border border-[#E8E0D5]">
                  <Check className="w-3.5 h-3.5 text-[#8C5E45]" /> 100% Milk Cotton & Velvet
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9]/80 px-3 py-1.5 rounded-full border border-[#E8E0D5]">
                  <Check className="w-3.5 h-3.5 text-[#8C5E45]" /> Express India Delivery
                </span>
              </motion.div>
            </div>

            {/* Right Column - Pinterest Polaroid Moodboard Collage */}
            <div className="lg:col-span-6 relative flex justify-center items-center min-h-[460px] sm:min-h-[520px] pt-4 lg:pt-0">
              
              {/* Outer Decorative Circle Badge */}
              <div className="absolute -top-4 right-2 sm:right-6 z-30 animate-spin-slow pointer-events-none">
                <div className="relative w-22 h-22 rounded-full border border-dashed border-[#8C5E45]/40 flex items-center justify-center bg-[#FFFDF9]/90 backdrop-blur-xs text-[9px] uppercase font-mono font-bold text-[#8C5E45] shadow-xs">
                  <span className="text-center p-2">✦ SLOW CRAFT ✦ 100% HANDMADE ✦</span>
                </div>
              </div>

              {/* Collage V-Layout Container */}
              <div className="relative w-full max-w-md sm:max-w-xl h-[460px] sm:h-[500px]">

                {/* Polaroid 1: Ocean Breeze Tote (Top Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: -3 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 50 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onNavigate('product', 'ocean-breeze-crochet-bag')}
                  className="absolute top-0 left-0 w-[56%] sm:w-[52%] bg-[#FFFDF9] p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#E8E0D5] cursor-pointer z-10 group transition-all duration-300"
                >
                  {/* Pink Washi Tape Strip */}
                  <div className="absolute -top-3 right-6 w-16 h-5 bg-[#E8C4C4]/70 backdrop-blur-xs -rotate-6 rounded-xs shadow-2xs z-30 pointer-events-none" />

                  {/* Image */}
                  <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-[#FAF6F0] mb-2">
                    <img
                      src="/hero_bag.png"
                      alt="Ocean Breeze Granny Square Bag"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#2D2B2A]/85 text-[#FFFDF9] text-[9px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#E8C4C4]" /> Bestseller
                    </span>
                    <button className="absolute bottom-2 right-2 p-1.5 bg-white/90 rounded-full text-[#8C5E45] shadow-xs hover:scale-110 transition-transform">
                      <Heart className="w-3.5 h-3.5 fill-[#E8C4C4] text-[#8C5E45]" />
                    </button>
                  </div>

                  {/* Polaroid Label */}
                  <div className="flex items-center justify-between pt-0.5 px-0.5">
                    <div>
                      <h4 className="font-serif-title font-bold text-xs sm:text-sm text-[#2D2B2A] line-clamp-1">
                        Ocean Breeze Tote 🌊
                      </h4>
                      <p className="text-[9px] text-[#8C827A]">Hand-crocheted squares</p>
                    </div>
                    <span className="font-serif-title font-bold text-xs text-[#8C5E45] bg-[#FAF6F0] px-2 py-0.5 rounded-lg border border-[#E8E0D5]">
                      ₹1,899
                    </span>
                  </div>
                </motion.div>

                {/* Polaroid 2: Marshmallow Bunny Plushie (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 6 }}
                  animate={{ opacity: 1, y: 0, rotate: 4 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 50 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  onClick={() => onNavigate('product', 'marshmallow-bunny-plushie')}
                  className="absolute top-2 right-0 w-[50%] sm:w-[46%] bg-[#FFFDF9] p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#E8E0D5] cursor-pointer z-10 group transition-all duration-300"
                >
                  {/* Butter Yellow Washi Tape */}
                  <div className="absolute -top-2.5 right-6 w-14 h-4.5 bg-[#EFEAD8]/90 backdrop-blur-xs -rotate-3 rounded-xs shadow-2xs z-30 pointer-events-none" />

                  <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-[#FAF6F0] mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop"
                      alt="Marshmallow Bunny Amigurumi"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 bg-[#E8C4C4] text-[#2D2B2A] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      🐇 Bunny Plushie
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <div>
                      <h4 className="font-serif-title font-bold text-xs text-[#2D2B2A] line-clamp-1">
                        Bunny Amigurumi
                      </h4>
                      <p className="text-[9px] text-[#8C827A]">Velvet soft yarn</p>
                    </div>
                    <span className="font-serif-title font-bold text-xs text-[#8C5E45]">
                      ₹1,299
                    </span>
                  </div>
                </motion.div>

                {/* Polaroid 3: Forever Flower Bouquet (Bottom Center) */}
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: -1 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 50 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  onClick={() => onNavigate('product', 'eternal-crochet-rose-bouquet')}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[72%] sm:w-[68%] bg-[#FFFDF9] p-3 rounded-2xl shadow-xl border border-[#E8E0D5] cursor-pointer z-20 group transition-all duration-300"
                >
                  {/* Sage Washi Tape */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4.5 bg-[#C5D5C1]/80 backdrop-blur-xs rotate-1 rounded-xs shadow-2xs z-30 pointer-events-none" />

                  <div className="relative aspect-16/9 sm:aspect-16/10 rounded-xl overflow-hidden bg-[#FAF6F0] mb-2">
                    <img
                      src="/hero_flowers.png"
                      alt="Forever Bloom Flower Bouquet"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#8C5E45]/85 text-[#FFFDF9] text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                      🌷 Eternal Bouquet
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <div>
                      <h4 className="font-serif-title font-bold text-xs sm:text-sm text-[#2D2B2A] line-clamp-1">
                        Forever Tulip Bouquet
                      </h4>
                      <p className="text-[9px] text-[#8C827A]">5 handmade flower stems wrapped in kraft paper</p>
                    </div>
                    <span className="font-serif-title font-bold text-xs text-[#8C5E45] bg-[#FAF6F0] px-2 py-0.5 rounded-lg border border-[#E8E0D5] shrink-0 ml-2">
                      ₹1,699
                    </span>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
              Explore Handmade Creations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#8C5E45] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => onNavigate('shop')}
              className="group cursor-pointer rounded-2xl p-3.5 bg-[#FFFDF9] border border-[#E8E0D5] hover:border-[#B8866B] transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-[#FAF6F0]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#2D2B2A] leading-snug group-hover:text-[#8C5E45] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#8C827A] line-clamp-1 mt-0.5">
                  {cat.tagline}
                </p>
                <span className="inline-block mt-2 text-[10px] font-semibold text-[#8C5E45] bg-[#FAF6F0] px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
            Most Loved Pieces
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
            Best Sellers & New Batches
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6560]">
            Hand-stitched favorites adopted by cozy lovers across India.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['All', 'Crochet Bags', 'Accessories', 'Home & Decor', 'Custom Creations'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-1.5 rounded-full transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#2D2B2A] text-[#FFFDF9] shadow-xs'
                    : 'bg-[#FFFDF9] text-[#2D2B2A] border border-[#E8E0D5] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateToDetail={(id) => onNavigate('product', id)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('shop')}
            className="py-3 px-8 bg-[#FFFDF9] text-[#2D2B2A] hover:bg-[#2D2B2A] hover:text-[#FFFDF9] font-medium rounded-xl text-xs sm:text-sm transition-all border border-[#E8E0D5] hover:border-[#2D2B2A]"
          >
            Explore Entire Catalog ({PRODUCTS.length} Items)
          </button>
        </div>
      </section>

      {/* 4. HANDMADE STORY SECTION */}
      <section className="bg-[#FAF6F0] py-16 border-y border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
                  alt="Crocheting granny square bag"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5] text-center">
                <span className="font-serif-title text-2xl font-bold text-[#8C5E45]">14+ Hours</span>
                <p className="text-xs text-[#6B6560] mt-0.5">Average time dedicated to stitching each bag</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-2xl bg-[#363331] text-[#FFFDF9] space-y-2">
                <Sparkles className="w-5 h-5 text-[#E8C4C4]" />
                <h4 className="font-serif-title text-lg font-bold">Same Hands, Unique Stories</h4>
                <p className="text-xs text-[#D8D2C9] leading-relaxed">
                  No two pieces are ever identical. Every loop holds a quiet moment of handmade care.
                </p>
              </div>
              <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                  alt="Colorful crochet hooks and studio yarn"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
              Slow Craft Manifesto
            </span>
            <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#2D2B2A] leading-tight">
              Made by Hand,<br />Made with Heart.
            </h2>
            <p className="text-sm sm:text-base text-[#6B6560] leading-relaxed font-light">
              In a world of fast machine production, Twee Haven chooses the gentle rhythm of slow craft. Every bag, pouch, and flower bouquet begins as simple skeins of soft milk cotton yarn, transformed loop by loop into timeless pieces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E8E0D5]">
                <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">100% Gentle Yarns</h4>
                <p className="text-xs text-[#6B6560] mt-1">Non-scratchy, hypoallergenic milk cotton & velvet yarn.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E8E0D5]">
                <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Zero Factory Waste</h4>
                <p className="text-xs text-[#6B6560] mt-1">Made in small batches with zero yarn waste left behind.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('story')}
                className="py-3 px-6 bg-[#2D2B2A] text-[#FFFDF9] hover:bg-[#8C5E45] font-medium rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                Read Our Story & Journey
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSTAGRAM GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C5E45] uppercase tracking-widest">
            <Instagram className="w-4 h-4 text-[#8C5E45]" />
            @tweehaven
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
            Follow Our Little Corner of Handmade Happiness
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6560]">
            Behind the scenes, studio progress, and cozy daily updates.
          </p>
        </div>

        {/* 6 Post Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map(post => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF6F0] shadow-xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#2D2B2A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white text-xs">
                <span className="bg-[#E8C4C4]/90 text-[#2D2B2A] text-[9px] font-bold px-2 py-0.5 rounded-full self-start">
                  {post.badge}
                </span>
                <p className="text-[11px] line-clamp-2 font-light">
                  {post.caption}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-semibold text-[#E8C4C4]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 py-3 px-8 bg-[#FFFDF9] text-[#2D2B2A] hover:bg-[#2D2B2A] hover:text-[#FFFDF9] font-semibold text-xs rounded-xl border border-[#E8E0D5] transition-all shadow-xs"
          >
            <Instagram className="w-4 h-4 text-[#8C5E45]" />
            Follow @tweehaven on Instagram
          </a>
        </div>
      </section>

      {/* 6. CUSTOM ORDER CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF6F0] to-[#F4ECE1] rounded-3xl p-8 sm:p-12 border border-[#E8E0D5] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
              Bespoke Custom Requests
            </span>
            <h3 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
              Have something special in mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
              Tell us what you're dreaming of — whether it's a specific color combination, custom plushie, or personalized gift crate — and let's turn it into something handmade.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('custom-orders')}
              className="w-full sm:w-auto py-4 px-8 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#E8C4C4]" />
              Request a Custom Piece
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
