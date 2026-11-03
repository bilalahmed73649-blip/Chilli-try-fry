import React from 'react';
import { Flame, MessageCircle, Instagram, Facebook, Clock, Heart, Phone } from 'lucide-react';
import { RESTAURANT_PHONE, RESTAURANT_WHATSAPP } from '../utils/cart';
import { LOCATION_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-400 font-body text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E63924] to-[#FF8C32] flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-promo text-2xl tracking-wider text-white">
                CHILLI <span className="text-[#FF8C32]">TRY FRY</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed pr-4">
              Kharadar’s homegrown fast-food icon. Famous for our signature molten Cheesy Lava Pizza, loaded fries skillets, juicy burgers, and crispy authentic Karachi paratha rolls.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chilli Try Fry on WhatsApp"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Chilli Try Fry on Instagram"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FF8C32] hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Chilli Try Fry on Facebook"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`tel:${RESTAURANT_PHONE}`}
                aria-label="Call Chilli Try Fry"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#E63924] hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Food Menu
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#menu" className="hover:text-[#FF8C32] transition-colors">
                  Cheesy Lava Pizzas
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FF8C32] transition-colors">
                  Extreme Loaded Fries
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FF8C32] transition-colors">
                  Zinger & Smash Burgers
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FF8C32] transition-colors">
                  Karachi Tikka Paratha Rolls
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FF8C32] transition-colors">
                  Charcoal BBQ & Platters
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FF8C32]" />
              <span>Hours & Cravings</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-neutral-500">Mon – Thu:</p>
                <p className="text-neutral-200 font-medium">{LOCATION_INFO.timings.weekdays}</p>
              </div>
              <div>
                <p className="text-neutral-500">Fri – Sun (Late Night):</p>
                <p className="text-[#FF8C32] font-semibold">{LOCATION_INFO.timings.weekends}</p>
              </div>
              <p className="text-neutral-500 pt-1">
                Express Delivery across Kharadar, Mithadar, Lyari, Saddar & Clifton.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Kharadar Branch
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="leading-relaxed">
                Shop #4-5, Near Bolton Market & Wazir Mansion, Kharadar, Karachi
              </p>
              <p className="text-[#FF8C32] font-bold">
                WhatsApp: 0312-2244555
              </p>
              <p className="text-neutral-400">
                Landmark: Kharadar Chowk
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} Chilli Try Fry. All Rights Reserved. Karachi, Pakistan.
          </p>
          <div className="flex items-center gap-1 text-neutral-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E63924] fill-[#E63924] mx-0.5" />
            <span>for Karachi Food Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
