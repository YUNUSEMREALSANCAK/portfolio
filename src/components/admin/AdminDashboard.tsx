import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Folder, Activity, Eye, Clock } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminDashboard = () => {
  const { blogs, projects } = useAdmin();
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('visitor_count');
    return saved ? parseInt(saved) : 0;
  });

  const [activeUsers, setActiveUsers] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);

  useEffect(() => {
    // Ziyaretçi sayısını artır
    const incrementVisitor = () => {
      const newCount = visitorCount + 1;
      setVisitorCount(newCount);
      localStorage.setItem('visitor_count', newCount.toString());
    };

    // Son ziyaret zamanını kontrol et
    const lastVisitTime = localStorage.getItem('last_visit');
    const now = new Date().getTime();

    if (!lastVisitTime || now - parseInt(lastVisitTime) > 30 * 60 * 1000) { // 30 dakika
      incrementVisitor();
      localStorage.setItem('last_visit', now.toString());
    }

    setLastVisit(lastVisitTime ? new Date(parseInt(lastVisitTime)).toLocaleString() : null);

    // Aktif kullanıcı simülasyonu
    const simulateActiveUsers = () => {
      const baseCount = Math.floor(visitorCount * 0.1); // Toplam ziyaretçinin %10'u
      const randomVariation = Math.floor(Math.random() * 5); // 0-5 arası rastgele değişim
      setActiveUsers(Math.max(1, baseCount + randomVariation));
    };

    simulateActiveUsers();
    const interval = setInterval(simulateActiveUsers, 30000); // Her 30 saniyede bir güncelle

    return () => clearInterval(interval);
  }, [visitorCount]);

  const stats = [
    {
      title: 'Toplam Blog',
      value: blogs.length.toString(),
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Toplam Proje',
      value: projects.length.toString(),
      icon: <Folder className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Toplam Ziyaretçi',
      value: visitorCount.toString(),
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Aktif Ziyaretçi',
      value: activeUsers.toString(),
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {React.cloneElement(stat.icon, { className: 'w-6 h-6 text-white' })}
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Son Eklenen Bloglar
          </h2>
          <div className="space-y-4">
            {[...blogs].reverse().slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <FileText className="w-5 h-5 text-violet-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {blog.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Son Eklenen Projeler
          </h2>
          <div className="space-y-4">
            {[...projects].reverse().slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <Folder className="w-5 h-5 text-violet-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Ziyaretçi Bilgileri
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <Clock className="w-5 h-5 text-violet-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Son Ziyaret
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {lastVisit || 'İlk ziyaret'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Günlük Ortalama
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(visitorCount / Math.max(1, Math.ceil((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))))} ziyaretçi/gün
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard; 