import React from 'react';
import { ShoppingCart, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface FloatingButtonsProps {
  onCartClick: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4">
      <button
        onClick={() => navigate('/login')}
        className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Admin Login"
      >
        <Lock className="w-6 h-6" />
      </button>
      <button
        onClick={onCartClick}
        className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors relative"
        title="Open Cart"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};
