import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import BlogFormModal from './BlogFormModal';

const AdminBlogs = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu blogu silmek istediğinize emin misiniz?')) {
      deleteBlog(id);
    }
  };

  const handleSubmit = (data: any) => {
    if (selectedBlog) {
      updateBlog(selectedBlog.id, data);
    } else {
      addBlog(data);
    }
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Bloglar
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Blog
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Blog ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400">Başlık</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400">Kategori</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400">Tarih</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400">Durum</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {blog.category}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {blog.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {blog.status === 'published' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBlog(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedBlog}
      />
    </div>
  );
};

export default AdminBlogs; 