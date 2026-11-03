import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPKR,
  calculateLineItemTotal,
  calculateCartTotals,
  generateWhatsAppOrderMessage,
  filterMenuItems,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_FEE,
} from './cart';
import { MenuItem, CartItem, OrderDetails } from '../types/restaurant';

const mockMenuItem: MenuItem = {
  id: 'pizza-lava-1',
  name: 'Cheesy Lava Volcano Pizza',
  category: 'Pizzas',
  price: 1850,
  description: 'Signature volcano pizza with erupting mozzarella and chicken tikka boti',
  image: '/src/assets/images/hero_cheesy_lava_pizza_1793694158522.jpg',
  isSignature: true,
  spiceLevel: 'Spicy',
};

const mockItem2: MenuItem = {
  id: 'fries-loaded-1',
  name: 'Extreme Loaded Cheesy Fries',
  category: 'Loaded Fries',
  price: 750,
  description: 'Crisp fries with liquid cheddar, fried chicken chunks and jalapenos',
  image: '/src/assets/images/signature_loaded_fries_1793694158297.jpg',
  isSignature: true,
  spiceLevel: 'Mild',
};

test('formatPKR correctly formats Pakistani Rupee currency', () => {
  assert.equal(formatPKR(1850), 'Rs. 1,850');
  assert.equal(formatPKR(0), 'Rs. 0');
  assert.equal(formatPKR(25000), 'Rs. 25,000');
});

test('calculateLineItemTotal factors in quantity and addons', () => {
  const line1 = calculateLineItemTotal(1850, 1, []);
  assert.equal(line1, 1850);

  const line2WithAddons = calculateLineItemTotal(1850, 2, [
    { name: 'Extra Lava Cheese Burst', price: 250 },
    { name: 'Garlic Mayo Dip', price: 80 },
  ]);
  assert.equal(line2WithAddons, 4360);
});

test('calculateCartTotals calculates delivery charges and free delivery threshold correctly', () => {
  const cartItem1: CartItem = {
    id: 'cart-1',
    menuItem: mockMenuItem,
    quantity: 1,
    selectedSpice: 'Spicy',
    selectedAddons: [],
    itemTotal: 1850,
  };

  const underThreshold = calculateCartTotals([cartItem1], 'delivery');
  assert.equal(underThreshold.subtotal, 1850);
  assert.equal(underThreshold.deliveryFee, STANDARD_DELIVERY_FEE);
  assert.equal(underThreshold.grandTotal, 1850 + STANDARD_DELIVERY_FEE);
  assert.equal(underThreshold.freeDeliveryEligible, false);
  assert.equal(underThreshold.amountUntilFreeDelivery, FREE_DELIVERY_THRESHOLD - 1850);

  const takeaway = calculateCartTotals([cartItem1], 'takeaway');
  assert.equal(takeaway.deliveryFee, 0);
  assert.equal(takeaway.grandTotal, 1850);

  const cartItem2: CartItem = {
    id: 'cart-2',
    menuItem: mockItem2,
    quantity: 1,
    selectedSpice: 'Mild',
    selectedAddons: [],
    itemTotal: 750,
  };

  const aboveThreshold = calculateCartTotals([cartItem1, cartItem2], 'delivery');
  assert.equal(aboveThreshold.subtotal, 2600);
  assert.equal(aboveThreshold.deliveryFee, 0);
  assert.equal(aboveThreshold.grandTotal, 2600);
  assert.equal(aboveThreshold.freeDeliveryEligible, true);
  assert.equal(aboveThreshold.amountUntilFreeDelivery, 0);
});

test('generateWhatsAppOrderMessage formats complete order with items and customer details', () => {
  const cartItem: CartItem = {
    id: 'c1',
    menuItem: mockMenuItem,
    quantity: 1,
    selectedSpice: 'Fiery Lava',
    selectedAddons: [{ id: 'a1', name: 'Extra Cheese', price: 200 }],
    itemTotal: 2050,
    specialInstructions: 'Make it extra crisp please',
  };

  const order: OrderDetails = {
    orderType: 'delivery',
    customerName: 'Bilal Ahmed',
    phone: '03001234567',
    area: 'Kharadar',
    address: 'Near Bolton Market, Flat 402',
    notes: 'Please bring change for 5000',
    items: [cartItem],
    subtotal: 2050,
    deliveryFee: 150,
    grandTotal: 2200,
  };

  const msg = generateWhatsAppOrderMessage(order);
  assert.match(msg, /CHILLI TRY FRY/);
  assert.match(msg, /Bilal Ahmed/);
  assert.match(msg, /Kharadar/);
  assert.match(msg, /Cheesy Lava Volcano Pizza/);
  assert.match(msg, /Make it extra crisp/);
  assert.match(msg, /Rs\. 2,200/);
});

test('filterMenuItems filters properly by category, query, and spice', () => {
  const items = [mockMenuItem, mockItem2];

  const pizzaOnly = filterMenuItems(items, 'Pizzas', '', 'All');
  assert.equal(pizzaOnly.length, 1);
  assert.equal(pizzaOnly[0].id, 'pizza-lava-1');

  const loadedOnly = filterMenuItems(items, 'Loaded Fries', '', 'All');
  assert.equal(loadedOnly.length, 1);
  assert.equal(loadedOnly[0].id, 'fries-loaded-1');

  const spicyOnly = filterMenuItems(items, 'All', '', 'Spicy');
  assert.equal(spicyOnly.length, 1);
  assert.equal(spicyOnly[0].id, 'pizza-lava-1');

  const searchResults = filterMenuItems(items, 'All', 'Cheddar', 'All');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'fries-loaded-1');
});
