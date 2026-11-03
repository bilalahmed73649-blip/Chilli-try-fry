import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureFavourites } from './components/SignatureFavourites';
import { MenuSection } from './components/MenuSection';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { FoodGallery } from './components/FoodGallery';
import { LocationAndMap } from './components/LocationAndMap';
import { Footer } from './components/Footer';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuItem, CartItem, SpiceLevel, AddonOption } from './types/restaurant';
import { MENU_ITEMS } from './data/menuData';
import { calculateLineItemTotal, calculateCartTotals, formatPKR } from './utils/cart';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chilli_try_fry_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('chilli_try_fry_cart', JSON.stringify(cart));
    } catch {
      // LocalStorage fallback
    }
  }, [cart]);

  const signatureItems = MENU_ITEMS.filter((i) => i.isSignature);

  const handleQuickAdd = (item: MenuItem) => {
    const spice: SpiceLevel = item.spiceLevel || 'Spicy';
    const total = calculateLineItemTotal(item.price, 1, []);
    
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.selectedSpice === spice &&
          ci.selectedAddons.length === 0 &&
          !ci.specialInstructions
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + 1;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          itemTotal: calculateLineItemTotal(item.price, newQty, []),
        };
        return updated;
      }

      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        menuItem: item,
        quantity: 1,
        selectedSpice: spice,
        selectedAddons: [],
        itemTotal: total,
      };
      return [...prev, newCartItem];
    });

    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1500);
  };

  const handleConfirmAddToCart = (
    item: MenuItem,
    quantity: number,
    spice: SpiceLevel,
    addons: AddonOption[],
    instructions: string
  ) => {
    const total = calculateLineItemTotal(item.price, quantity, addons);
    const newCartItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItem: item,
      quantity,
      selectedSpice: spice,
      selectedAddons: addons,
      specialInstructions: instructions,
      itemTotal: total,
    };

    setCart((prev) => [...prev, newCartItem]);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1500);
  };

  const handleUpdateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }

    setCart((prev) =>
      prev.map((ci) => {
        if (ci.id === cartId) {
          return {
            ...ci,
            quantity: newQuantity,
            itemTotal: calculateLineItemTotal(ci.menuItem.price, newQuantity, ci.selectedAddons),
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totals = calculateCartTotals(cart);

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col font-sans selection:bg-[#E63924] selection:text-white">
      <Navbar
        cartCount={totals.itemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={scrollToMenu}
      />

      <main className="flex-1">
        <Hero
          onExploreMenu={scrollToMenu}
          onOrderNow={() => setIsCartOpen(true)}
        />

        <SignatureFavourites
          signatureItems={signatureItems}
          onSelectProduct={(item) => setSelectedProduct(item)}
          onQuickAdd={handleQuickAdd}
        />

        <MenuSection
          items={MENU_ITEMS}
          onSelectProduct={(item) => setSelectedProduct(item)}
          onQuickAdd={handleQuickAdd}
          addedItemId={justAddedId}
        />

        <WhyUs />

        <Testimonials />

        <FoodGallery onExploreItem={scrollToMenu} />

        <LocationAndMap />
      </main>

      <Footer />

      <ProductCustomizerModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirmAddToCart={handleConfirmAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {cart.length > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-3.5 bg-gradient-to-r from-[#E63924] to-[#FF8C32] rounded-2xl shadow-2xl flex items-center justify-between text-white font-bold text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs">
                {totals.itemCount}
              </span>
              <span>View Order Bag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="tabular-nums">{formatPKR(totals.grandTotal)}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
