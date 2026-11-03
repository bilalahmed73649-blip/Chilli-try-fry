import { CartItem, MenuItem, OrderDetails, OrderType, Category, SpiceLevel } from '../types/restaurant';

export const RESTAURANT_PHONE = '+923122244555';
export const RESTAURANT_WHATSAPP = '923122244555';
export const FREE_DELIVERY_THRESHOLD = 2500;
export const STANDARD_DELIVERY_FEE = 150;

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function calculateLineItemTotal(
  basePrice: number,
  quantity: number,
  addons: { price: number; name?: string; id?: string }[] = []
): number {
  const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  return (basePrice + addonsTotal) * Math.max(1, quantity);
}

export function calculateCartTotals(
  items: CartItem[],
  orderType: OrderType = 'delivery'
): {
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  freeDeliveryEligible: boolean;
  amountUntilFreeDelivery: number;
  itemCount: number;
} {
  const subtotal = items.reduce((acc, item) => acc + item.itemTotal, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  let deliveryFee = 0;
  let freeDeliveryEligible = false;
  let amountUntilFreeDelivery = 0;

  if (orderType === 'delivery') {
    if (subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0) {
      deliveryFee = 0;
      freeDeliveryEligible = subtotal >= FREE_DELIVERY_THRESHOLD;
      amountUntilFreeDelivery = 0;
    } else {
      deliveryFee = STANDARD_DELIVERY_FEE;
      freeDeliveryEligible = false;
      amountUntilFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;
    }
  }

  const grandTotal = subtotal + deliveryFee;

  return {
    subtotal,
    deliveryFee,
    grandTotal,
    freeDeliveryEligible,
    amountUntilFreeDelivery,
    itemCount,
  };
}

export function generateWhatsAppOrderMessage(order: OrderDetails): string {
  const lines: string[] = [];

  lines.push(`🔥 *CHILLI TRY FRY – KHARADAR ORDER* 🔥`);
  lines.push(`---------------------------------`);
  lines.push(`*Type:* ${order.orderType === 'delivery' ? '🛵 Home Delivery' : '🛍️ Self Pickup / Takeaway'}`);
  lines.push(`*Customer:* ${order.customerName}`);
  lines.push(`*Contact:* ${order.phone}`);
  
  if (order.orderType === 'delivery') {
    lines.push(`*Area:* ${order.area}`);
    lines.push(`*Delivery Address:* ${order.address}`);
  }

  lines.push(`---------------------------------`);
  lines.push(`*ORDER ITEMS:*`);

  order.items.forEach((item, index) => {
    const addonsStr = item.selectedAddons.length > 0 
      ? ` (+ ${item.selectedAddons.map(a => a.name).join(', ')})`
      : '';
    const spiceStr = item.selectedSpice ? ` [Spice: ${item.selectedSpice}]` : '';
    lines.push(`${index + 1}. *${item.quantity}x* ${item.menuItem.name}${spiceStr}${addonsStr} - ${formatPKR(item.itemTotal)}`);
    if (item.specialInstructions && item.specialInstructions.trim()) {
      lines.push(`   _Note: ${item.specialInstructions.trim()}_`);
    }
  });

  lines.push(`---------------------------------`);
  lines.push(`*Subtotal:* ${formatPKR(order.subtotal)}`);
  if (order.orderType === 'delivery') {
    lines.push(`*Delivery:* ${order.deliveryFee === 0 ? 'FREE' : formatPKR(order.deliveryFee)}`);
  }
  lines.push(`*Grand Total:* *${formatPKR(order.grandTotal)}*`);

  if (order.notes && order.notes.trim()) {
    lines.push(`---------------------------------`);
    lines.push(`*Special Request:* ${order.notes.trim()}`);
  }

  lines.push(`---------------------------------`);
  lines.push(`Payment Method: Cash on Delivery (COD) / JazzCash on arrival`);
  lines.push(`_Thank you for ordering with Chilli Try Fry Kharadar!_`);

  return lines.join('\n');
}

export function buildWhatsAppLink(order: OrderDetails): string {
  const message = generateWhatsAppOrderMessage(order);
  return `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function filterMenuItems(
  items: MenuItem[],
  selectedCategory: Category,
  searchQuery: string = '',
  spiceFilter: SpiceLevel | 'All' = 'All'
): MenuItem[] {
  return items.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (spiceFilter !== 'All' && item.spiceLevel !== spiceFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchUrdu = item.urduSubtitle?.toLowerCase().includes(q) || false;
      const matchCategory = item.category.toLowerCase().includes(q);
      return matchName || matchDesc || matchUrdu || matchCategory;
    }
    return true;
  });
}
