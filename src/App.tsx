import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BlogDetail from './components/BlogDetail';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminBlogs from './components/admin/AdminBlogs';
import AdminProjects from './components/admin/AdminProjects';
import AdminTimeline from './components/admin/AdminTimeline';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';
import AdminAbout from './components/admin/AdminAbout';

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><Navbar /><HomePage /><ThemeToggle /></>} />
            <Route path="/blog/:slug" element={<><Navbar /><BlogDetail /><ThemeToggle /></>} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected admin routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="timeline" element={<AdminTimeline />} />
            </Route>
          </Routes>
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;