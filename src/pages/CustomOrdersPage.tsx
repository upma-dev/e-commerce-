import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Upload, CheckCircle2, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomOrdersPage: React.FC = () => {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: 'Crochet Bag',
    preferredColors: 'Sky Blue & Butter Yellow',
    description: '',
    budget: '₹1,500 - ₹2,500'
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      showToast('Please fill in required custom order details');
      return;
    }
    setSubmitted(true);
    showToast('Custom order request submitted! We will email you within 24 hours 💌');
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      showToast(`Attached inspiration file: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#FFFDF9] px-4 py-1.5 rounded-full border border-[#B8866B]/30 text-xs font-semibold text-[#8C5E45] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C4C4]" />
          Bespoke Atelier
        </div>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#2D2B2A]">
          Have something special in mind?
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6560] font-light leading-relaxed">
          Tell us what you're dreaming of and let's turn it into something handmade just for you or a loved one.
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E8E0D5] shadow-lg max-w-3xl mx-auto">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#386641] rounded-full flex items-center justify-center mx-auto text-3xl">
              💌
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#2D2B2A]">
              Request Received with Love!
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6560] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}! Our head artisan will review your custom yarn request and reach out to <strong>{formData.email}</strong> or WhatsApp within 24 hours with yarn swatches and a quote.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFileName(null);
              }}
              className="py-3 px-6 bg-[#2D2B2A] text-[#FFFDF9] font-bold text-xs rounded-xl hover:bg-[#8C5E45] transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#2D2B2A] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Riya Verma"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2B2A] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. riya@example.com"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2B2A] mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D2B2A] mb-1">Product Category</label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A] font-medium"
                >
                  <option value="Crochet Bag">Custom Crochet Bag / Tote</option>
                  <option value="Amigurumi Plushie">Custom Amigurumi / Plushie</option>
                  <option value="Forever Bouquet">Custom Flower Bouquet Set</option>
                  <option value="Accessories">Hair Clips, Keychains & Accessories</option>
                  <option value="Gift Crate">Personalized Gift Box Crate</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#2D2B2A] mb-1">Preferred Color Palette</label>
                <input
                  type="text"
                  value={formData.preferredColors}
                  onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value })}
                  placeholder="e.g. Pastel Pink, Butter Yellow, Sky Blue & Cream"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#2D2B2A] mb-1">Describe Your Vision *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us specific dimensions, strap preferences, initials, or special details you'd love..."
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl focus:outline-none focus:border-[#2D2B2A]"
                />
              </div>

              {/* Reference Image Upload */}
              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#2D2B2A] mb-1">Upload Inspiration Reference (Optional)</label>
                <div className="border-2 border-dashed border-[#E8E0D5] bg-[#FAF7F2] rounded-2xl p-6 text-center hover:border-[#B8866B] transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSimulate}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#8C5E45] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#2D2B2A]">
                    {fileName ? `Attached: ${fileName}` : 'Click or drag Pinterest / Instagram screenshots here'}
                  </p>
                  <p className="text-[10px] text-[#8C827A] mt-0.5">PNG, JPG or WEBP up to 10MB</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#2D2B2A] hover:bg-[#8C5E45] text-[#FFFDF9] font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#E8C4C4]" />
              Submit Custom Request
            </button>
          </form>
        )}
      </div>

      {/* Showcase Grid of Past Bespoke Pieces */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-md mx-auto space-y-1">
          <span className="text-xs font-semibold text-[#8C5E45] uppercase tracking-widest block">
            Craft Archive
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#2D2B2A]">
            Recent Bespoke Creations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#E8E0D5] space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6F0]">
              <img
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop"
                alt="Custom Bunny Amigurumi"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Pink Ribbon Marshmallow Bunny</h4>
            <p className="text-xs text-[#6B6560]">Custom ordered for a baby shower gift with personalized embroidered initial.</p>
          </div>

          <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#E8E0D5] space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6F0]">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
                alt="Custom Sky Blue Bag"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Ocean Breeze Extended Strap Tote</h4>
            <p className="text-xs text-[#6B6560]">Customized with an extra 4 inches strap drop and magnetic brass snap closure.</p>
          </div>

          <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#E8E0D5] space-y-3">
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6F0]">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
                alt="Custom Flower Crate"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-serif-title font-bold text-base text-[#2D2B2A]">Lavender Sunset Forever Crate</h4>
            <p className="text-xs text-[#6B6560]">Bespoke 7-flower arrangement crafted in pastel lavender, rose and butter yellow.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
