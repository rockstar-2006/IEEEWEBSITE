import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, ChartBar as BarChart3, UserCheck, X, Menu } from 'lucide-react';
import { useState } from 'react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ isOpen, onToggle }: AdminSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/event/new', label: 'Add Event', icon: Calendar },
    { path: '/admin/students', label: 'Student List', icon: Users },
    { path: '/admin/participants', label: 'Event Participants', icon: UserCheck },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed top-0 left-0 z-50 w-80 h-full bg-white border-r border-gray-200 shadow-lg md:translate-x-0 md:static md:z-0"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#0057B7] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">IEEE</span>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => window.innerWidth < 768 && onToggle()}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#0057B7] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;