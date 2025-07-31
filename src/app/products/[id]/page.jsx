'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star, Minus, Plus, Trash2 } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/providers/cart-provider';
import LoadingSpinner from '@/components/reusable/loading-spinner';
import toast from 'react-hot-toast';
import { Breadcrumb } from 'antd';


export default function ProductDetail() {

  const params = useParams();
  const productId = params.id;

  const { data: product, isLoading, error } = useProduct(productId);
  const { addToCart, removeFromCart, items, updateQuantity } = useCart();

  const cartItem = items.find(item => item.id === parseInt(productId));

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleRemoveFromCart = () => {
    removeFromCart(parseInt(productId));
    toast.success('Removed from cart!');
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart();
    } else {
      updateQuantity(parseInt(productId), newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">

      <Breadcrumb items={[{ title: 'Home', }, { title: 'Products', }, { title: `${product.title}`, }]} className='pb-8 text-sm 2xl:text-base font-primary' />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 lg:h-[500px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.title}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                  {product.rating?.rate || 0}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Cart Actions */}
          <div className="space-y-4">
            {cartItem ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(cartItem.quantity - 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            )}
          </div>

          {/* Product Specifications */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Details
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Rating:</span>
                <span>{product.rating?.rate || 0} / 5</span>
              </div>
              <div className="flex justify-between">
                <span>Reviews:</span>
                <span>{product.rating?.count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 