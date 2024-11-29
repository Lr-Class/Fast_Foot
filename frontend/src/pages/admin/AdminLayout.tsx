import React from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  LogOut,
  Tags,
  Store
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const AdminLayout: React.FC = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setAuthenticated = useStore((state) => state.setAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/login');
  };

  const navigation = [
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Orders', href: '/admin/orders', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex items-center justify-center h-16 px-4">
            <LayoutDashboard className="w-8 h-8 text-green-600" />
            <span className="ml-2 text-xl font-bold">Admin Panel</span>
          </div>
          <nav className="mt-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                    location.pathname === item.href ? 'bg-gray-100' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
            <Link
              to="/"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Store className="w-5 h-5" />
              <span className="ml-3">Back to Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
