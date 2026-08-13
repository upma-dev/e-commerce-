import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Clock, ShieldCheck, Flower2, Send } from 'lucide-react';

interface StoryPageProps {
  onNavigate: (page: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-[#FAF6F0] py-16 border-b border-[#E8E0D5] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFFDF9] px-4 py-1.5 rounded-full border border-[#B8866B]/30 text-xs font-semibold text-[#8C5E45] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C4C4]" />
            The Heart Behind Twee Haven
          </div>
          <h1 className="font-serif-title text-4xl sm:text-6xl font-bold text-[#2D2B2A] leading-tight">
            Made slowly. <span className="italic font-normal text-[#8C5E45]">Loved deeply.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B6560] font-light max-w-2xl mx-auto leading-relaxed">
            Somewhere between comfort and cute. Welcome to our little corner of handmade crochet creations, born from quiet late-night stitches and a love for soft aesthetics.
          </p>
        </div>
      </section>

      {/* Story Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 space-y-4">
          <div className="aspect-4/5 rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#E8E0D5] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
              alt="Hands crocheting with soft pastel yarn"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-6 space-y-6">
          <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
            Our Journey
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
            How Twee Haven Came to Life
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#6B6560] font-light leading-relaxed">
            <p>
              Twee Haven started as a simple quiet escape after busy college days. Holding a crochet hook and soft skeins of sky blue yarn, our founder began stitching granny square bags for friends who wanted something unique, warm, and authentic.
            </p>
            <p>
              When we posted our first pastel granny square bag on Instagram (@tweehaven), the response was overwhelming. People connected with the slow, tactile nature of handmade goods — pieces that felt personal, cozy, and full of intention.
            </p>
            <p>
              Today, every single order that leaves our studio is still crocheted by hand, hand-lined with organic cotton poplin, and tied with silk ribbons in our signature pink gift boxes.
            </p>
          </div>
        </div>
      </section>

      {/* Why Handmade Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
            Our Core Values
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2D2B2A]">
            Why Choose Handmade?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C5E45]">
              <Heart className="w-5 h-5 text-[#E8C4C4] fill-[#E8C4C4]" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#2D2B2A]">
              Made with Care
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Every stitch is carefully tightened and verified so your bags and plushies last for years to come.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C5E45]">
              <Clock className="w-5 h-5 text-[#8C5E45]" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#2D2B2A]">
              Small Batch
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              We never mass produce. Each batch is made in tiny, thoughtful quantities to ensure zero excess waste.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C5E45]">
              <Flower2 className="w-5 h-5 text-[#C5D5C1]" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#2D2B2A]">
              Truly Unique
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Handmade items carry subtle, beautiful variations in stitch and texture that make every single piece one-of-a-kind.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C5E45]">
              <ShieldCheck className="w-5 h-5 text-[#87CEEB]" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#2D2B2A]">
              Made for You
            </h3>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              Have custom color preferences? We personalize strap lengths, linings, and shades to fit your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Timeline / Process */}
      <section className="bg-[#FAF6F0] py-16 border-y border-[#E8E0D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif-title text-3xl font-bold text-center text-[#2D2B2A] mb-10">
            The Life of a Twee Haven Piece
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-ml-px before:w-0.5 before:bg-[#E8E0D5]">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#363331] text-[#FFFDF9] font-bold text-xs shrink-0 z-10 shadow-sm">
                1
              </div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5]">
                <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Skein & Yarn Selection</h4>
                <p className="text-xs text-[#6B6560] mt-1">We source butter-soft milk cotton and velvet chenille yarns in custom pastel palettes.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#363331] text-[#FFFDF9] font-bold text-xs shrink-0 z-10 shadow-sm">
                2
              </div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5]">
                <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Slow Stitching Session</h4>
                <p className="text-xs text-[#6B6560] mt-1">Stitching square by square, assembly with ergonomic crochet hooks and cotton linings.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#363331] text-[#FFFDF9] font-bold text-xs shrink-0 z-10 shadow-sm">
                3
              </div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8E0D5]">
                <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Pink Ribbon Packaging</h4>
                <p className="text-xs text-[#6B6560] mt-1">Wrapped in eco-paper, tied with satin ribbon, and accompanied by a wax-sealed card.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="font-serif-title text-3xl font-bold text-[#2D2B2A]">
          Ready to find your favorite piece?
        </h3>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('shop')}
            className="py-3 px-8 bg-[#2D2B2A] text-[#FFFDF9] hover:bg-[#8C5E45] font-bold text-xs rounded-xl transition-colors"
          >
            Explore Shop
          </button>
          <button
            onClick={() => onNavigate('custom-orders')}
            className="py-3 px-8 bg-[#FFFDF9] text-[#2D2B2A] hover:bg-[#FAF7F2] font-bold text-xs rounded-xl border border-[#E8E0D5]"
          >
            Custom Request 💌
          </button>
        </div>
      </section>
    </div>
  );
};
