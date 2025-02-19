import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, GraduationCap, Briefcase } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import TimelineFormModal from './TimelineFormModal';

const AdminTimeline = () => {
  const { timelineItems, addTimelineItem, updateTimelineItem, deleteTimelineItem } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu zaman çizelgesi öğesini silmek istediğinize emin misiniz?')) {
      deleteTimelineItem(id);
    }
  };

  const handleSubmit = (data: any) => {
    if (selectedItem) {
      updateTimelineItem(selectedItem.id, data);
    } else {
      addTimelineItem(data);
    }
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Zaman Çizelgesi
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Ekle
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="space-y-4">
          {timelineItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${item.type === 'education' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
                  {item.type === 'education' ? (
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.institution} • {item.location}
                  </p>
                  <p className="text-sm text-violet-600 dark:text-violet-400">
                    {item.date}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <TimelineFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedItem}
      />
    </div>
  );
};

export default AdminTimeline; 