import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, Store, AlertCircle, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { CartItem, OrderType, OrderDetails } from '../types/restaurant';
import {
  calculateCartTotals,
  formatPKR,
  buildWhatsAppLink,
  RESTAURANT_PHONE,
  FREE_DELIVERY_THRESHOLD,
} from '../utils/cart';
import { LOCATION_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, newQuantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Kharadar');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, orderType);

  const validateOrder = (): OrderDetails | null => {
    if (!customerName.trim()) {
      setValidationError('Please enter your full name');
      return null;
    }
    if (!phone.trim()) {
      setValidationError('Please provide your WhatsApp or phone number');
      return null;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setValidationError('Please enter your delivery street address in Karachi');
      return null;
    }

    setValidationError('');

    return {
      orderType,
      customerName,
      phone,
      area,
      address,
      notes,
      items,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      grandTotal: totals.grandTotal,
    };
  };

  const handleWhatsAppCheckout = () => {
    const orderDetails = validateOrder();
    if (!orderDetails) return;

    const orderNum = `CTF-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderNumber(orderNum);
    setOrderConfirmed(true);

    const waLink = buildWhatsAppLink(orderDetails);
    window.open(waLink, '_blank');
  };

  const handleDirectCheckout = () => {
    const orderDetails = validateOrder();
    if (!orderDetails) return;

    const orderNum = `CTF-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderNumber(orderNum);
    setOrderConfirmed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end"
    >
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#FF8C32]" />
            <h2 id="cart-drawer-title" className="font-heading text-lg font-bold text-white">
              {orderConfirmed ? 'Order Confirmed!' : `Your Food Bag (${totals.itemCount} items)`}
            </h2>
          </div>
          <button
            onClick={() => {
              if (orderConfirmed) {
                onClearCart();
                setOrderConfirmed(false);
              }
              onClose();
            }}
            aria-label="Close cart drawer"
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-Checkout Confirmation View */}
        {orderConfirmed ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <h3 className="font-heading text-2xl font-bold text-white">
              Order #{confirmedOrderNumber} Placed!
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-xs">
              Thank you, <strong className="text-white">{customerName}</strong>! Our kitchen at Kharadar is firing up your order now.
            </p>

            <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-left text-xs space-y-2 mt-2">
              <div className="flex justify-between text-neutral-400">
                <span>Order Type:</span>
                <span className="font-semibold text-white capitalize">{orderType}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Contact:</span>
                <span className="font-semibold text-white">{phone}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-neutral-400">
                  <span>Destination:</span>
                  <span className="font-semibold text-white truncate max-w-[180px]">{area}, {address}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400 pt-2 border-t border-neutral-800 font-bold text-sm">
                <span>Amount Payable:</span>
                <span className="text-[#FF8C32]">{formatPKR(totals.grandTotal)}</span>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Payment: Cash on Delivery / JazzCash to rider
              </p>
            </div>

            <div className="w-full space-y-2 pt-4">
              <button
                onClick={() => {
                  const details: OrderDetails = {
                    orderType,
                    customerName,
                    phone,
                    area,
                    address,
                    notes,
                    items,
                    subtotal: totals.subtotal,
                    deliveryFee: totals.deliveryFee,
                    grandTotal: totals.grandTotal,
                  };
                  window.open(buildWhatsAppLink(details), '_blank');
                }}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Branch on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl"
              >
                Done / Back to Menu
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Free Delivery Bar */}
            {items.length > 0 && orderType === 'delivery' && (
              <div className="bg-neutral-800/80 px-5 py-3 border-b border-neutral-700/60">
                {totals.freeDeliveryEligible ? (
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>You unlocked FREE Express Delivery!</span>
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-neutral-300 mb-1.5">
                      Add <strong className="text-[#FF8C32]">{formatPKR(totals.amountUntilFreeDelivery)}</strong> more for <strong className="text-white">FREE Delivery</strong>
                    </p>
                    <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF8C32] to-emerald-400 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scrollable Items & Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    Your bag is hungry!
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
                    Add our famous Cheesy Lava Pizza or Extreme Loaded Fries to start your Karachi feast.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#E63924] text-white text-xs font-bold rounded-xl hover:bg-[#c92f1c]"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Delivery vs Takeaway segmented control */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Order Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          orderType === 'delivery'
                            ? 'bg-[#E63924] text-white shadow'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Bike className="w-4 h-4" />
                        <span>Home Delivery</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('takeaway')}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          orderType === 'takeaway'
                            ? 'bg-[#FF8C32] text-neutral-950 shadow'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        <span>Takeaway / Pickup</span>
                      </button>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-medium pb-1 border-b border-neutral-800">
                      <span>Selected Items</span>
                      <button
                        onClick={onClearCart}
                        className="text-neutral-500 hover:text-red-400 text-[11px]"
                      >
                        Clear All
                      </button>
                    </div>

                    {items.map((cartItem) => (
                      <div
                        key={cartItem.id}
                        className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 flex gap-3 items-start"
                      >
                        <img
                          src={cartItem.menuItem.image}
                          alt={cartItem.menuItem.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 bg-neutral-900"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-heading text-sm font-bold text-white truncate">
                              {cartItem.menuItem.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(cartItem.id)}
                              aria-label={`Remove ${cartItem.menuItem.name}`}
                              className="text-neutral-500 hover:text-red-400 p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] text-[#FF8C32] mt-0.5">
                            Spice: {cartItem.selectedSpice}
                          </p>
                          {cartItem.selectedAddons.length > 0 && (
                            <p className="text-[10px] text-neutral-400 truncate">
                              + {cartItem.selectedAddons.map((a) => a.name).join(', ')}
                            </p>
                          )}
                          {cartItem.specialInstructions && (
                            <p className="text-[10px] text-neutral-400 italic">
                              Note: {cartItem.specialInstructions}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/80">
                            <div className="flex items-center bg-neutral-900 rounded-md border border-neutral-700/80 p-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-white tabular-nums">
                              {formatPKR(cartItem.itemTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Form */}
                  <div className="p-4 bg-neutral-950/90 rounded-2xl border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Customer & Delivery Details
                    </h4>

                    {validationError && (
                      <div className="p-2.5 rounded-lg bg-red-900/40 border border-red-700 text-xs text-red-200 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Bilal Ahmed"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF8C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0300-1234567"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF8C32]"
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Karachi Area *</label>
                          <select
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF8C32]"
                          >
                            {LOCATION_INFO.deliveryAreas.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Street Address / Landmark *</label>
                          <textarea
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="House/Apartment #, Street, Near Landmark"
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF8C32]"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Order Notes (Optional)</label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Bring change for 5000, extra spicy garlic sauce"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF8C32]"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer with Totals and Action Buttons */}
            {items.length > 0 && (
              <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white tabular-nums">{formatPKR(totals.subtotal)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Delivery Charges</span>
                      <span className={`font-semibold tabular-nums ${totals.deliveryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
                        {totals.deliveryFee === 0 ? 'FREE' : formatPKR(totals.deliveryFee)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-base font-extrabold text-white pt-2 border-t border-neutral-800">
                    <span>Grand Total</span>
                    <span className="text-[#FF8C32] tabular-nums text-lg font-heading">
                      {formatPKR(totals.grandTotal)}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 text-center">
                    Payment: Cash on Delivery (COD) / JazzCash on arrival
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order via WhatsApp (Pre-Filled Bill)</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectCheckout}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#E63924] to-[#FF8C32] hover:brightness-110 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm Web Order (Cash on Delivery)</span>
                  </button>

                  <a
                    href={`tel:${RESTAURANT_PHONE}`}
                    className="w-full py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl border border-neutral-700/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF8C32]" />
                    <span>Call Kharadar Branch ({LOCATION_INFO.phone})</span>
                  </a>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
