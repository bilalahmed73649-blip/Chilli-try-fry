import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Check } from 'lucide-react';
import { Category, MenuItem, SpiceLevel } from '../types/restaurant';
import { formatPKR, filterMenuItems } from '../utils/cart';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  addedItemId: string | null;
}

const CATEGORIES: Category[] = [
  'All',
  'Pizzas',
  'Loaded Fries',
  'Burgers',
  'Rolls & Shawarma',
  'Sandwiches',
  'BBQ & Platters',
  'Beverages & Dips',
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectProduct,
  onQuickAdd,
  addedItemId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState<SpiceLevel | 'All'>('All');

  const filteredItems = useMemo(() => {
    return filterMenuItems(items, selectedCategory, searchQuery, spiceFilter);
  }, [items, selectedCategory, searchQuery, spiceFilter]);

  return (
    <section id="menu" className="py-20 bg-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FF8C32] mb-2">
              <span>Full Restaurant Menu</span>
              <span aria-hidden="true">·</span>
              <span>Karachi Street Fast Food</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Our Delicious Menu
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Prepared fresh to order using 100% Halal meat and our signature spice blends. Select any item to customize your spice level and addons.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, loaded fries, zinger, tikka roll..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF8C32] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            <span className="text-xs text-neutral-400 font-medium whitespace-nowrap hidden sm:inline">
              Spice Level:
            </span>
            {(['All', 'Mild', 'Spicy', 'Fiery Lava'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSpiceFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  spiceFilter === lvl
                    ? 'bg-[#E63924] text-white shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? items.length 
              : items.filter(i => i.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E63924] to-[#FF8C32] text-white shadow-lg shadow-[#E63924]/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center my-6">
            <Flame className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-white mb-1">
              No menu items match your search
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Try adjusting your search query or reset the filters to see all delicious items.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSpiceFilter('All');
              }}
              className="px-4 py-2 bg-[#E63924] text-white text-xs font-semibold rounded-lg hover:bg-[#c92f1c]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isJustAdded = addedItemId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/50"
                >
                  <div
                    onClick={() => onSelectProduct(item)}
                    className="relative aspect-[16/10] bg-neutral-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.isSignature && (
                        <span className="bg-[#E63924] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                          Signature
                        </span>
                      )}
                      {item.isPopular && !item.isSignature && (
                        <span className="bg-[#FF8C32] text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                      {item.portions && (
                        <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-neutral-300">
                          {item.portions}
                        </span>
                      )}
                      {item.spiceLevel && (
                        <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#FF8C32]">
                          🌶️ {item.spiceLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                        <span>{item.category}</span>
                        {item.prepTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.prepTime}</span>
                          </>
                        )}
                        {item.urduSubtitle && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#FF8C32] font-semibold">{item.urduSubtitle}</span>
                          </>
                        )}
                      </div>

                      <h3
                        onClick={() => onSelectProduct(item)}
                        className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#FF8C32] transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4 font-body">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-neutral-500 uppercase block font-medium">Price</span>
                        <span className="text-lg font-extrabold text-white tabular-nums">
                          {formatPKR(item.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(item)}
                          className="px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
                        >
                          Customize
                        </button>

                        <button
                          onClick={() => onQuickAdd(item)}
                          className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-95 ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#E63924] hover:bg-[#c92f1c] text-white shadow-md shadow-[#E63924]/20'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
