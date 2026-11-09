'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artwork, NavVariant } from '@/types';

interface CartContextType {
  cart: Artwork[];
  addToCart: (artwork: Artwork) => boolean;
  removeFromCart: (artworkId: string) => void;
  isInCart: (artworkId: string) => boolean;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (artworkId: string) => void;
  isInWishlist: (artworkId: string) => boolean;

  // Design Variation Switcher (Variation A vs Variation B)
  navVariant: NavVariant;
  setNavVariant: (variant: NavVariant) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Artwork[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [navVariant, setNavVariant] = useState<NavVariant>('A');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize with initial mock cart from client reference (shows 2 items in Cart page: Royal Serenity + The Conversation)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('royal_art_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem('royal_art_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedVariant = localStorage.getItem('royal_art_nav_variant') as NavVariant;
      if (savedVariant === 'A' || savedVariant === 'B') {
        setNavVariant(savedVariant);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const hideToast = () => setToastMessage(null);

  const addToCart = (artwork: Artwork): boolean => {
    // Unique artwork rule: Each painting is an original piece with quantity 1
    const exists = cart.some((item) => item.id === artwork.id);
    if (exists) {
      showToast(`"${artwork.title}" is already in your cart (unique original piece)`);
      return false;
    }

    const updated = [...cart, artwork];
    setCart(updated);
    try {
      localStorage.setItem('royal_art_cart', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(`Added "${artwork.title}" to your private acquisition cart`);
    return true;
  };

  const removeFromCart = (artworkId: string) => {
    const updated = cart.filter((item) => item.id !== artworkId);
    setCart(updated);
    try {
      localStorage.setItem('royal_art_cart', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast('Item removed from cart');
  };

  const isInCart = (artworkId: string) => cart.some((item) => item.id === artworkId);

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('royal_art_cart');
    } catch {
      // ignore
    }
  };

  const toggleWishlist = (artworkId: string) => {
    const exists = wishlist.includes(artworkId);
    const updated = exists
      ? wishlist.filter((id) => id !== artworkId)
      : [...wishlist, artworkId];
    setWishlist(updated);
    try {
      localStorage.setItem('royal_art_wishlist', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(exists ? 'Removed from saved collection' : 'Saved to private wish gallery');
  };

  const isInWishlist = (artworkId: string) => wishlist.includes(artworkId);

  const handleSetNavVariant = (variant: NavVariant) => {
    setNavVariant(variant);
    try {
      localStorage.setItem('royal_art_nav_variant', variant);
    } catch {
      // ignore
    }
    showToast(`Switched to Header ${variant === 'A' ? 'Variation A (Navbar Over Hero)' : 'Variation B (Navbar Below Hero)'}`);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        subtotal,
        totalItems: cart.length,
        wishlist,
        toggleWishlist,
        isInWishlist,
        navVariant,
        setNavVariant: handleSetNavVariant,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#05291F] border border-[#C6A15B] text-[#F6F0E4] px-5 py-3.5 shadow-2xl rounded-sm transition-all duration-300 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
          <p className="font-serif text-sm tracking-wide">{toastMessage}</p>
          <button
            onClick={hideToast}
            className="ml-3 text-[#D9BD7A] hover:text-white text-xs uppercase tracking-widest"
          >
            ✕
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
