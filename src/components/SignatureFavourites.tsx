import React from 'react';
import { Flame, Plus } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { formatPKR } from '../utils/cart';

interface SignatureFavouritesProps {
  signatureItems: MenuItem[];
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const SignatureFavourites: React.FC<SignatureFavouritesProps> = ({
  signatureItems,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <section id="signatures" className="py-20 bg-neutral-900/60 border-t border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E63924] mb-2">
            <Flame className="w-4 h-4" />
            <span>Kharadar's Famous Signatures</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 [text-wrap:balance]">
            Our Legendary Signature Favourites
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-body">
            Crafted for true foodies. Featuring our viral molten <strong className="text-white">Cheesy Lava Pizza</strong> and crave-worthy <strong className="text-white">Extreme Loaded Fries</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {signatureItems.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              className="relative rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700/80 hover:border-[#FF8C32] transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#E63924] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-lg flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    Flagship #{idx + 1}
                  </span>
                  {item.spiceLevel && (
                    <span className="bg-neutral-900/80 backdrop-blur-md text-[#FFF4E8] text-xs font-medium px-2.5 py-1 rounded-md border border-neutral-700">
                      {item.spiceLevel}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-medium text-[#FF8C32] uppercase tracking-wider block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#FFF4E8] tabular-nums">
                      {formatPKR(item.price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-body">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="flex-1 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm rounded-xl transition-colors border border-neutral-700 text-center"
                  >
                    Customize & Details
                  </button>
                  <button
                    onClick={() => onQuickAdd(item)}
                    className="py-3 px-5 bg-gradient-to-r from-[#E63924] to-[#FF8C32] hover:brightness-110 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-[#E63924]/20 flex items-center gap-2 transition-all whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {signatureItems.slice(2, 4).map((item) => (
            <div
              key={item.id}
              className="bg-neutral-800/80 border border-neutral-700/70 hover:border-neutral-600 rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-center transition-all group"
            >
              <div className="w-full sm:w-40 h-32 sm:h-32 rounded-lg overflow-hidden shrink-0 relative bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-[#171717]/80 text-[#FF8C32] text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                  Signature
                </span>
              </div>

              <div className="flex flex-col justify-between flex-grow w-full">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-heading font-bold text-base text-white">
                      {item.name}
                    </h4>
                    <span className="font-bold text-[#FF8C32] text-sm tabular-nums whitespace-nowrap">
                      {formatPKR(item.price)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="text-xs text-neutral-300 hover:text-white underline underline-offset-4 py-1"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => onQuickAdd(item)}
                    className="ml-auto px-3.5 py-1.5 bg-[#E63924] hover:bg-[#c92f1c] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
