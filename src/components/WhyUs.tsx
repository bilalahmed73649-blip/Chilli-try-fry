import React from 'react';
import { Flame, Clock, Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { VALUE_PROPOSITIONS } from '../data/menuData';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E63924] mb-2">
            <Heart className="w-4 h-4 fill-[#E63924]" />
            <span>The Chilli Try Fry Standard</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 [text-wrap:balance]">
            Why Karachi Fast-Food Lovers Choose Us
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-body">
            Born in the historical heart of Kharadar, we set out to craft an authentic Karachi fast-food brand: big on flavour, overflowing with cheese, and always affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {VALUE_PROPOSITIONS.map((prop, index) => {
            const icons = [
              <Flame key="1" className="w-6 h-6 text-[#E63924]" />,
              <Sparkles key="2" className="w-6 h-6 text-[#FF8C32]" />,
              <ShieldCheck key="3" className="w-6 h-6 text-emerald-400" />,
              <Clock key="4" className="w-6 h-6 text-[#FFF4E8]" />,
            ];

            return (
              <div
                key={prop.title}
                className="bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {icons[index]}
                  </div>
                  
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FF8C32] block mb-1">
                    {prop.tag}
                  </span>

                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {prop.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-body">
                    {prop.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 flex items-center gap-1.5">
                  <span>Guaranteed quality</span>
                  <span aria-hidden="true">·</span>
                  <span>Every single order</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-[#171717] via-neutral-900 to-[#171717] border border-neutral-800 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FF8C32] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>Kharadar Heritage · Old Town Roots</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                No Generic International Templates. 100% Pure Karachi Spirit.
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl font-body">
                Kharadar is the historic cradle of Karachi's food culture. We don't water down our spices or cut corners on real dairy cheese. When you order from Chilli Try Fry, you get the fiery heat, aromatic smokiness, and hearty portions that our city is celebrated for worldwide.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/70 text-center">
                <p className="text-2xl font-extrabold text-[#FF8C32] font-heading tabular-nums">150,000+</p>
                <p className="text-xs text-neutral-400">Pizzas & Fries Served Across Karachi</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/70 text-center">
                <p className="text-2xl font-extrabold text-white font-heading">4.9 / 5.0</p>
                <p className="text-xs text-neutral-400">Rated by Google & Food Delivery Reviewers</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
