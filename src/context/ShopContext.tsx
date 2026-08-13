import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  customOrderModalOpen: boolean;
  setCustomOrderModalOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('twee_haven_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('twee_haven_wishlist');
      return saved ? JSON.parse(saved) : ['ocean-breeze-crochet-bag'];
    } catch {
      return ['ocean-breeze-crochet-bag'];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [customOrderModalOpen, setCustomOrderModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('twee_haven_cart', JSON.stringify(cart));
    } catch (err) {
      console.error(err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('twee_haven_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error(err);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (selectedColor) updated[existingIndex].selectedColor = selectedColor;
        return updated;
      } else {
        return [...prev, {
          product,
          quantity,
          selectedColor: selectedColor || (product.colors[0]?.name || 'Standard')
        }];
      }
    });
    showToast(`Added "${product.name}" to your cozy cart ✨`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist 💖');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      cartCount,
      cartSubtotal,
      searchQuery,
      setSearchQuery,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isSearchOpen,
      setIsSearchOpen,
      toastMessage,
      showToast,
      quickViewProduct,
      setQuickViewProduct,
      customOrderModalOpen,
      setCustomOrderModalOpen
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
