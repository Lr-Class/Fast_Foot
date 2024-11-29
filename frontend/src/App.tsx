import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StorePage } from './pages/StorePage';
import { LoginPage } from './pages/LoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { ProductsPage } from './pages/admin/ProductsPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
