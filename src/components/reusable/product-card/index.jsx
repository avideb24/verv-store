"use client";

import Image from "next/image";
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/providers/cart-provider';
import toast from 'react-hot-toast';


export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');
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

            {/* add to cart btn */}
            <button
              onClick={handleAddToCart}
              className="button"
            >
              <ShoppingCart className="w-4 h-4" />
              Add To Cart
            </button>
          </div>


        </div>
      </div>
    </Link>
  );
} 