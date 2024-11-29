import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { FloatingButtons } from '../components/FloatingButtons';
import { useStore } from '../store/useStore';
import { Utensils } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const StorePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const fetchCategories = useStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const categoryIds = [...new Set(products.map(product => product.category_id))];

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Utensils className="w-8 h-8 text-green-600" />
              Fast Foot
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {categoryIds.map((categoryId) => (
          <div key={categoryId} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {getCategoryName(categoryId)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => product.category_id === categoryId)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FloatingButtons onCartClick={() => setIsCartOpen(true)} />
    </div>
  );
};
