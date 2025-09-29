import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Award,
  Menu
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useEvents } from '../../hooks/useEvents';
import usersData from '../../data/users.json';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { events, getUpcomingEvents, getPastEvents } = useEvents();

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const totalRegistrations = events.reduce((acc, event) => acc + event.participants.length, 0);

  const stats = [
    {
      icon: Users,
      label: 'Total Students',
      value: usersData.length,
      change: '+12%',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Calendar,
      label: 'Total Events',
      value: events.length,
      change: '+8%',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: TrendingUp,
      label: 'Registrations',
      value: totalRegistrations,
      change: '+24%',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Award,
      label: 'Active Volunteers',
      value: usersData.filter(user => user.volunteerAssignments.length > 0).length,
      change: '+16%',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const recentEvents = [...upcomingEvents, ...pastEvents].slice(0, 5);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden md:ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <Menu size={20} />
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600">IEEE Student Branch Administration</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Events</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(event.date).toLocaleDateString()} • {event.venue}
                        </p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <span>{event.participants.length} registered</span>
                          <span>{event.volunteers.length} volunteers</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.isPast 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {event.isPast ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-[#0057B7] text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <div className="font-medium">Add New Event</div>
                  <div className="text-sm text-blue-100 mt-1">Create and schedule events</div>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">View Students</div>
                  <div className="text-sm text-gray-600 mt-1">Manage student registrations</div>
                </button>
                <button className="w-full text-left p-4 bg-gray-50 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Export Reports</div>
                  <div className="text-sm text-gray-600 mt-1">Generate analytics reports</div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Society Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Society Performance</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {['Computer Society', 'Communication Society', 'SIGHT', 'WIE'].map((society, index) => {
                const societyEvents = events.filter(event => event.society === society);
                const totalParticipants = societyEvents.reduce((acc, event) => acc + event.participants.length, 0);
                
                return (
                  <div key={society} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{societyEvents.length}</div>
                    <div className="text-sm text-gray-600 mb-2">{society}</div>
                    <div className="text-xs text-gray-500">{totalParticipants} total participants</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;