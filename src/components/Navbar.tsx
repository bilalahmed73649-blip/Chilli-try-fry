import React, { useState, useEffect } from 'react';
import { ShoppingBag, Flame, Phone, Menu, X, MapPin } from 'lucide-react';
import { RESTAURANT_PHONE, RESTAURANT_WHATSAPP } from '../utils/cart';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#171717]/95 backdrop-blur-md border-b border-neutral-800 shadow-xl py-3'
          : 'bg-[#171717]/80 backdrop-blur-sm border-b border-neutral-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          <a
            href="/"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
            aria-label="Chilli Try Fry Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E63924] to-[#FF8C32] flex items-center justify-center shadow-lg shadow-[#E63924]/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-promo text-2xl sm:text-3xl tracking-wide text-white leading-none">
                CHILLI <span className="text-[#FF8C32]">TRY FRY</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#FFF4E8]/60 font-body">
                Kharadar · Karachi
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#FF8C32] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${RESTAURANT_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#FFF4E8]/80 hover:text-white flex items-center gap-1.5 whitespace-nowrap shrink-0 text-xs border border-neutral-700/60 px-2.5 py-1 rounded-md bg-neutral-800/40"
            >
              <span>WhatsApp: 0312-2244555</span>
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#E63924] to-[#FF8C32] hover:brightness-110 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#E63924]/25 transition-all whitespace-nowrap shrink-0"
              aria-label={`View order cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-[#171717] text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-neutral-800 pb-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-neutral-200 hover:text-[#FF8C32] hover:bg-neutral-800/50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 px-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E63924]" /> Kharadar Chowk, Karachi
              </span>
              <a href={`tel:${RESTAURANT_PHONE}`} className="text-[#FF8C32] font-semibold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Call: 0312-2244555
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
