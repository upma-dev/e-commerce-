import React, { useState } from 'react';
import { Heart, Instagram, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to our cozy notes! 💌');
    setEmail('');
  };

  return (
    <footer className="bg-[#363331] text-[#FFFDF9] border-t border-[#8C5E45]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B8866B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 relative z-10">
        {/* Brand Summary */}
        <div className="md:col-span-4 space-y-4">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer inline-flex"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8C4C4]/20 flex items-center justify-center text-base">
              🌸
            </div>
            <h3 className="font-serif-title text-2xl font-bold tracking-tight text-[#FFFDF9]">
              Twee Haven
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#D8D2C9] leading-relaxed max-w-sm">
            Handmade with love, one stitch at a time. Cozy, handcrafted crochet bags, plushies, and flower accessories made slowly and thoughtfully in India.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#4A4542] hover:bg-[#E8C4C4] hover:text-[#2D2B2A] rounded-xl text-[#FFFDF9] transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#4A4542] hover:bg-[#E8C4C4] hover:text-[#2D2B2A] rounded-xl text-[#FFFDF9] transition-all"
              aria-label="Pinterest"
            >
              <Send className="w-4 h-4" />
            </a>
            <span className="text-xs text-[#B8866B] font-medium ml-2">@tweehaven</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-serif-title text-base font-bold text-[#E8C4C4] tracking-wide">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs text-[#D8D2C9]">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#E8C4C4] transition-colors">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop')} className="hover:text-[#E8C4C4] transition-colors">
                Shop Handmade
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('story')} className="hover:text-[#E8C4C4] transition-colors">
                Our Story & Process
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('custom-orders')} className="hover:text-[#E8C4C4] transition-colors">
                Custom Orders 💌
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-serif-title text-base font-bold text-[#E8C4C4] tracking-wide">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-[#D8D2C9]">
            <li>
              <a href="#care" onClick={(e) => { e.preventDefault(); onNavigate('story'); }} className="hover:text-[#E8C4C4] transition-colors">
                Crochet Care Guide
              </a>
            </li>
            <li>
              <a href="#shipping" onClick={(e) => { e.preventDefault(); onNavigate('cart'); }} className="hover:text-[#E8C4C4] transition-colors">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#faq" onClick={(e) => { e.preventDefault(); onNavigate('story'); }} className="hover:text-[#E8C4C4] transition-colors">
                FAQ & Custom Lead Times
              </a>
            </li>
            <li>
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#E8C4C4] transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Box */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-serif-title text-base font-bold text-[#E8C4C4] tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#E8C4C4]" />
            Join Our Little Haven
          </h4>
          <p className="text-xs text-[#D8D2C9] leading-relaxed">
            Get sweet little updates on new slow-batch releases, custom order slots, and behind-the-scenes studio notes.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 bg-[#2D2B2A] border border-[#8C5E45]/40 text-xs text-[#FFFDF9] placeholder:text-[#9E968D] px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#E8C4C4]"
              />
              <button
                type="submit"
                className="py-2.5 px-4 bg-[#E8C4C4] hover:bg-[#DFB2B2] text-[#2D2B2A] font-bold text-xs rounded-xl transition-colors shrink-0"
              >
                Subscribe
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-[#C5D5C1] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> You're on the cozy list!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-[#4A4542] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E968D] gap-4">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Twee Haven. Handcrafted with <Heart className="w-3 h-3 text-[#E8C4C4] fill-[#E8C4C4]" /> in India.
        </p>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Small Batch</span>
          <span>•</span>
          <span>100% Handmade</span>
          <span>•</span>
          <span>Eco-Conscious Packaging</span>
        </div>
      </div>
    </footer>
  );
};
