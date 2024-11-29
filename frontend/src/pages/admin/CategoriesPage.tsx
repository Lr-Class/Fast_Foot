import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosConfig';

export const CategoriesPage: React.FC = () => {
  const [newCategory, setNewCategory] = useState('');
  const categories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);
  const products = useStore((state) => state.products);
  const fetchCategories = useStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      try {
        const response = await axiosInstance.post('/categories', { name: newCategory.trim() });
        setCategories([...categories, response.data]);
        setNewCategory('');
        toast.success('Category added successfully');
      } catch (error) {
        toast.error('Error adding category');
      }
    }
  };

  const handleDelete = async (categoryId: string) => {
    const productsInCategory = products.some(p => p.category_id === categoryId);
    if (productsInCategory) {
      toast.error('Cannot delete category with existing products');
      return;
    }
    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      setCategories(categories.filter(c => c.id !== categoryId));
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Error deleting category');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Categories Management</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(category.id)}
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
