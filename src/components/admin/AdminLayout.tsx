import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Folder, Clock, User, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminBlogs from './AdminBlogs';
import AdminProjects from './AdminProjects';
import AdminTimeline from './AdminTimeline';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin' },
    { icon: <User className="w-5 h-5" />, label: 'Hakkımda', path: '/admin/about' },
    { icon: <FileText className="w-5 h-5" />, label: 'Bloglar', path: '/admin/blogs' },
    { icon: <Folder className="w-5 h-5" />, label: 'Projeler', path: '/admin/projects' },
    { icon: <Clock className="w-5 h-5" />, label: 'Timeline', path: '/admin/timeline' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-violet-600 dark:bg-violet-800">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>
            
            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    location.pathname === item.path
                      ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/50'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 