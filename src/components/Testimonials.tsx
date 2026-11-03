import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FF8C32] mb-2">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Real Karachi Foodies</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 [text-wrap:balance]">
            Loved by Students, Families & Night Owls
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-body">
            Here's what our regular customers across Kharadar, Saddar, Clifton, and beyond have to say about their Chilli Try Fry experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center gap-1 text-[#FF8C32] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF8C32]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6 font-body">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <span title="Verified Customer" className="inline-flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </h4>
                  <span className="text-[11px] text-neutral-500">{t.date}</span>
                </div>
                
                <p className="text-xs text-[#FF8C32] font-medium mb-1">
                  {t.roleOrArea}
                </p>

                <div className="text-[11px] text-neutral-400 truncate">
                  Fav: <span className="text-neutral-300">{t.favouriteItem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
