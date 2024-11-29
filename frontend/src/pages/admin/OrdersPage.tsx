import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';

export const OrdersPage: React.FC = () => {
  const orders = useStore((state) => state.orders);
  const fetchOrders = useStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders Management</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <p><strong>Name:</strong> {order.customerInfo.name}</p>
                    <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                    <p><strong>Address:</strong> {order.customerInfo.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {item.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
