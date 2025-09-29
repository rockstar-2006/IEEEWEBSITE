import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ListFilter as Filter } from 'lucide-react';
import EventCard from '../../components/ui/EventCard';
import { useEvents } from '../../hooks/useEvents';

const Events = () => {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [societyFilter, setSocietyFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');

  const societies = ['All', 'Computer Society', 'Communication Society', 'SIGHT', 'WIE'];
  const timeFilters = ['All', 'Upcoming', 'Past'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSociety = societyFilter === 'All' || event.society === societyFilter;
    const matchesTime = timeFilter === 'All' || 
                       (timeFilter === 'Upcoming' && !event.isPast) ||
                       (timeFilter === 'Past' && event.isPast);
    
    return matchesSearch && matchesSociety && matchesTime;
  });

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IEEE Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting workshops, seminars, competitions, and community service 
            opportunities designed to enhance your technical skills and professional development.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent"
              />
            </div>

            {/* Society Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={societyFilter}
                onChange={(e) => setSocietyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent"
              >
                {societies.map(society => (
                  <option key={society} value={society}>{society}</option>
                ))}
              </select>
            </div>

            {/* Time Filter */}
            <div>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent"
              >
                {timeFilters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No events found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSocietyFilter('All');
                  setTimeFilter('All');
                }}
                className="px-6 py-3 bg-[#0057B7] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Society Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            IEEE Societies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Computer Society</h3>
              <p className="text-blue-600 text-sm">Advancing computing and IT professionals worldwide</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <h3 className="font-bold text-lg text-green-800 mb-2">Communication Society</h3>
              <p className="text-green-600 text-sm">Leading innovations in communications technology</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <h3 className="font-bold text-lg text-purple-800 mb-2">SIGHT</h3>
              <p className="text-purple-600 text-sm">Special Interest Group on Humanitarian Technology</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <h3 className="font-bold text-lg text-pink-800 mb-2">WIE</h3>
              <p className="text-pink-600 text-sm">Women in Engineering - Inspiring, Engaging, Enabling</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Events;