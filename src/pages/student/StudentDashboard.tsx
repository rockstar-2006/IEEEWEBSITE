import { motion } from 'framer-motion';
import { Calendar, Users, Award, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';
import EventCard from '../../components/ui/EventCard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { events, getEventById } = useEvents();

  if (!user) return null;

  const registeredEvents = user.registrations.map(eventId => getEventById(eventId)).filter(Boolean);
  const upcomingRegistrations = registeredEvents.filter(event => !event!.isPast);
  const pastRegistrations = registeredEvents.filter(event => event!.isPast);
  const volunteerEvents = user.volunteerAssignments.map(eventId => getEventById(eventId)).filter(Boolean);

  const stats = [
    { icon: Calendar, label: 'Upcoming Events', value: upcomingRegistrations.length, color: 'text-blue-600' },
    { icon: Clock, label: 'Past Events', value: pastRegistrations.length, color: 'text-gray-600' },
    { icon: Users, label: 'Volunteer Roles', value: volunteerEvents.length, color: 'text-green-600' },
    { icon: Award, label: 'Total Registrations', value: registeredEvents.length, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.fullName.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.branch} • {user.year} • {user.ieeeId}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          {upcomingRegistrations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRegistrations.map((event, index) => (
                <EventCard key={event!.id} event={event!} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
              <p className="text-gray-600">Browse and register for events to see them here.</p>
            </div>
          )}
        </motion.section>

        {/* Volunteer Assignments */}
        {volunteerEvents.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Volunteer Assignments</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {volunteerEvents.map((event, index) => (
                  <motion.div
                    key={event!.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event!.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event!.date).toLocaleDateString()} • {event!.venue}
                        </p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2">
                          Volunteer
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{event!.society}</p>
                        {event!.isPast && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-1">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Past Events */}
        {pastRegistrations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastRegistrations.slice(0, 3).map((event, index) => (
                <EventCard key={event!.id} event={event!} index={index} />
              ))}
            </div>
            {pastRegistrations.length > 3 && (
              <div className="text-center mt-6">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  View All Past Events ({pastRegistrations.length})
                </button>
              </div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;