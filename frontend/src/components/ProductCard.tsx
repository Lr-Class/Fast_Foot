import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
