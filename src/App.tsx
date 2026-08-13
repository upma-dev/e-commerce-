import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StoryPage } from './pages/StoryPage';
import { CartPage } from './pages/CartPage';
import { CustomOrdersPage } from './pages/CustomOrdersPage';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentProductId, setCurrentProductId] = useState<string>('ocean-breeze-crochet-bag');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentProductId]);

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setCurrentProductId(productId);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2B2A] flex flex-col font-sans selection:bg-[#E8C4C4] selection:text-[#2D2B2A] bg-grain">
      {/* Top Boutique Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'shop' && (
          <ShopPage onNavigateToDetail={(id) => handleNavigate('product', id)} />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage productId={currentProductId} onNavigate={handleNavigate} />
        )}

        {currentPage === 'story' && (
          <StoryPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'custom-orders' && (
          <CustomOrdersPage />
        )}
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('cart')}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      <SearchOverlay
        onNavigateToDetail={(id) => handleNavigate('product', id)}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      <QuickViewModal
        onNavigateToDetail={(id) => handleNavigate('product', id)}
      />

      <Toast />

      {/* Boutique Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
