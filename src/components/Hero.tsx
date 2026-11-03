import React from 'react';
import { ArrowRight, ShoppingBag, Clock, Flame } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#171717]">
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E63924]/15 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#FF8C32]/10 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#FF8C32]">
              <span>Kharadar · Karachi</span>
              <span aria-hidden="true">·</span>
              <span>Authentic Fast Food Street Flavours</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 [text-wrap:balance]">
              Big Flavours. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C32] via-[#E63924] to-[#FF8C32]">
                Bigger Cravings.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#FFF4E8]/80 leading-relaxed max-w-2xl mb-8 font-body font-normal">
              From our signature Cheesy Lava Pizza to loaded fries, juicy burgers and delicious rolls, discover your next favourite bite at Chilli Try Fry.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-bold text-white bg-[#E63924] hover:bg-[#c92f1c] active:scale-95 rounded-xl shadow-xl shadow-[#E63924]/30 transition-all duration-200"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-bold text-white bg-neutral-800/90 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#FF8C32] active:scale-95 rounded-xl transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5 text-[#FF8C32]" />
                <span>Order Now (WhatsApp & Pickup)</span>
              </button>
            </div>

            <div className="pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-white">4.9 / 5.0</p>
                <p className="text-xs text-neutral-400">Karachi Foodies Rating</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-[#FF8C32]">100% Halal</p>
                <p className="text-xs text-neutral-400">Fresh Daily Meats</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-white">Till 3:30 AM</p>
                <p className="text-xs text-neutral-400">Late Night Cravings</p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#E63924] to-[#FF8C32] rounded-3xl opacity-30 group-hover:opacity-50 blur-lg transition duration-500" />
              
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl">
                <img
                  src="/src/assets/images/hero_cheesy_lava_pizza_1793694158522.jpg"
                  alt="Chilli Try Fry Signature Cheesy Lava Pizza with bubbling cheese volcano center"
                  className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[4/3] group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 bg-[#E63924] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>Signature Flagship</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-heading text-white">
                        Cheesy Lava Volcano Pizza
                      </h3>
                      <p className="text-xs text-[#FFF4E8]/80">
                        Bursting hot molten mozzarella core with tikka boti
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 block">From</span>
                      <span className="text-lg font-bold text-[#FF8C32] tabular-nums">Rs. 1,850</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-neutral-900/95 border border-neutral-700 backdrop-blur-md p-3.5 rounded-xl shadow-xl items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-lg bg-[#FF8C32]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#FF8C32]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">15–25 Min Express Delivery</p>
                  <p className="text-[11px] text-neutral-400">Hot & fresh across Kharadar & Saddar</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
