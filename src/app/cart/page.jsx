'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/providers/cart-provider';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    setIsClearing(true);
    clearCart();
    toast.success('Cart cleared');
    setIsClearing(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
         <h1 className="title">
            Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
        
        <button
          onClick={handleClearCart}
          disabled={isClearing}
          className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
         
          
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success('Item removed from cart');
                    }}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">
                  ${(getCartTotal() * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    ${(getCartTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={() => toast.success('Checkout functionality would be implemented here!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 