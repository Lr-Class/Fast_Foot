import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosConfig';

export const ProductsPage: React.FC = () => {
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const setProducts = useStore((state) => state.setProducts);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const fetchCategories = useStore((state) => state.fetchCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '', // Actualizado a image_url
    category_id: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image_url: product.image_url, // Actualizado a image_url
      category_id: product.category_id
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      price: parseFloat(formData.price), // Asegúrate de que `price` es un número
      image_url: formData.image_url,
    };

    if (isEditing) {
      try {
        const response = await axiosInstance.put(`/productos/${newProduct.id}`, newProduct);
        setProducts(products.map((p) => (p.id === editingProduct?.id ? response.data : p)));
        toast.success('Product updated successfully');
      } catch (error) {
        toast.error('Error updating product');
      }
    } else {
      try {
        const response = await axiosInstance.post('/productos', newProduct);
        setProducts([...products, response.data]);
        toast.success('Product added successfully');
      } catch (error) {
        toast.error('Error adding product');
      }
    }

    setFormData({ name: '', price: '', description: '', image_url: '', category_id: '' });
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/productos/${id}`);
        setProducts(products.filter((p) => p.id !== id));
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
      </div>
      {/* Add/Edit Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingProduct(null);
                setFormData({ name: '', price: '', description: '', image_url: '', category_id: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>

      {/* Products List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image_url} // Actualizado a image_url
                      alt={product.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {categories.find(category => category.id === product.category_id)?.name || ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price} {/* Asegúrate de convertir a número */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
