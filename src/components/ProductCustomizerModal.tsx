import React, { useState } from 'react';
import { X, Plus, Minus, Check, Clock, Users } from 'lucide-react';
import { MenuItem, SpiceLevel, AddonOption } from '../types/restaurant';
import { formatPKR, calculateLineItemTotal } from '../utils/cart';

interface ProductCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirmAddToCart: (
    item: MenuItem,
    quantity: number,
    spice: SpiceLevel,
    addons: AddonOption[],
    instructions: string
  ) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  item,
  onClose,
  onConfirmAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(item.spiceLevel || 'Spicy');
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [instructions, setInstructions] = useState('');

  const toggleAddon = (addon: AddonOption) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const currentTotal = calculateLineItemTotal(item.price, quantity, selectedAddons);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close customization modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/9] bg-neutral-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-[#FF8C32] uppercase tracking-wider block mb-1">
              {item.category}
            </span>
            <h2 id="modal-item-title" className="font-heading text-2xl font-bold text-white">
              {item.name}
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <p className="text-sm text-neutral-300 leading-relaxed font-body">
              {item.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-800">
              {item.portions && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#FF8C32]" />
                  <span>{item.portions}</span>
                </span>
              )}
              {item.prepTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF8C32]" />
                  <span>Fresh in {item.prepTime}</span>
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Select Karachi Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Mild', 'Spicy', 'Fiery Lava'] as SpiceLevel[]).map((spice) => {
                const isSelected = selectedSpice === spice;
                return (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setSelectedSpice(spice)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? 'bg-[#E63924] border-[#E63924] text-white shadow-md shadow-[#E63924]/20'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    <span>{spice}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {item.addons && item.addons.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Customize with Extra Flavours & Toppings
              </label>
              <div className="space-y-2">
                {item.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-neutral-800 border-[#FF8C32]'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#FF8C32] border-[#FF8C32] text-neutral-950'
                              : 'border-neutral-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium text-white">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#FF8C32] tabular-nums">
                        +{formatPKR(addon.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra napkins, no onion, cut into 6 slices"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF8C32]"
            />
          </div>
        </div>

        <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">Quantity:</span>
            <div className="flex items-center bg-neutral-800 rounded-xl border border-neutral-700 p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-lg hover:bg-neutral-700 flex items-center justify-center text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-lg hover:bg-neutral-700 flex items-center justify-center text-white"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onConfirmAddToCart(item, quantity, selectedSpice, selectedAddons, instructions);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#E63924] to-[#FF8C32] hover:brightness-110 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-[#E63924]/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Add to Order · {formatPKR(currentTotal)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
