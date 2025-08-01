"use client";

import Image from "next/image";
import Link from 'next/link';
import { ShoppingCart, Star, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/providers/cart-provider';
import toast from 'react-hot-toast';


export default function ProductCard({ product }) {

  const { addToCart, removeFromCart, updateQuantity, items } = useCart();
  
  // Check if product is in cart
  const cartItem = items.find(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    removeFromCart(product.id);
    toast.success('Removed from cart!');
  };

  const handleQuantityChange = (e, newQuantity) => {
    e.preventDefault();
    if (newQuantity <= 0) {
      handleRemoveFromCart(e);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group">

      <div className="bg-light dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">

        {/* image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>


        <div className="p-4">

          <div className="flex justify-between items-center pb-3">
            {/* category */}
            <p className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full capitalize">
              {product.category}
            </p>
            {/* ratings */}
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {product.rating?.rate || 0}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ({product.rating?.count || 0})
              </span>
            </div>
          </div>

          {/* title */}
          <h3 className="h-14 text-base font-semibold">
            {product.title.length > 65
              ? `${product.title.slice(0, 65)}...`
              : product.title}
          </h3>

          <div className="flex items-center justify-between pt-2">

            {/* price */}
            <span className="text-base md:text-xl font-bold text-green-600 dark:text-green-400">
              ${product.price}
            </span>

            {/* cart actions */}
            {cartItem ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                  <button
                    onClick={(e) => handleQuantityChange(e, cartItem.quantity - 1)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={(e) => handleQuantityChange(e, cartItem.quantity + 1)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="button"
              >
                <ShoppingCart className="w-4 h-4" />
                Add To Cart
              </button>
            )}
          </div>


        </div>
      </div>
    </Link>
  );
} 