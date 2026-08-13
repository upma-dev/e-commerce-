import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#363331] text-[#FFFDF9] px-5 py-3.5 rounded-2xl shadow-xl border border-[#B8866B]/30 max-w-sm text-sm font-medium"
        >
          <Sparkles className="w-4 h-4 text-[#E8C4C4] shrink-0 animate-pulse" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
