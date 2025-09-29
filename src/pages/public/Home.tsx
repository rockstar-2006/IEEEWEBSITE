import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Award, BookOpen } from 'lucide-react';
import EventCard from '../../components/ui/EventCard';
import { useEvents } from '../../hooks/useEvents';

const Home = () => {
  const { getUpcomingEvents } = useEvents();
  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  const stats = [
    { icon: Users, label: 'Active Members', value: '150+' },
    { icon: Calendar, label: 'Events Organized', value: '50+' },
    { icon: Award, label: 'Awards Won', value: '12+' },
    { icon: BookOpen, label: 'Publications', value: '25+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0057B7] to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Zilla Slab, serif' }}
            >
              Advancing Technology
              <br />
              <span className="text-blue-200">For Humanity</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
            >
              Join our IEEE Student Branch and be part of a community dedicated to 
              innovation, technical excellence, and professional development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/student/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0057B7] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                Join IEEE Today
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0057B7] transition-all duration-200"
              >
                Explore Events
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-blue-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-blue-300 rounded-full opacity-20"
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0057B7] text-white rounded-full mb-4">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't miss out on our exciting events and workshops designed to enhance your skills and network.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3 bg-[#0057B7] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Events
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. Our student branch fosters innovation, technical excellence, and professional development among engineering students.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We provide opportunities for students to enhance their technical skills, network with professionals, and contribute to society through meaningful projects and initiatives.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-[#0057B7] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg"
                alt="IEEE Mission"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0057B7]/20 rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;