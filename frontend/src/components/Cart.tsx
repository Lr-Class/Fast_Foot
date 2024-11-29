import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CustomerInfo } from '../types';
import toast from 'react-hot-toast';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
  });
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total,
      status: 'pending' as const,
      createdAt: new Date(),
      customerInfo,
    };

    useStore.getState().addOrder(order);
    clearCart();
    setIsCheckingOut(false);
    setCustomerInfo({ name: '', address: '', phone: '' });
    toast.success('Order placed successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg p-6 overflow-y-auto z-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Cart
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : isCheckingOut ? (
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              required
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              required
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success('Item removed from cart');
                    }}
                    className="p-1 hover:bg-red-100 text-red-500 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
