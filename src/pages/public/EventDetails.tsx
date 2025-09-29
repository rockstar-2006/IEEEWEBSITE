import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowLeft, UserPlus, CircleCheck as CheckCircle } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { useAuth } from '../../hooks/useAuth';
import AnimatedButton from '../../components/ui/AnimatedButton';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const { user, registerForEvent } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const event = id ? getEventById(id) : null;

  if (!event) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link to="/events" className="text-[#0057B7] hover:underline">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const isRegistered = user?.registrations.includes(event.id);
  const isEventFull = event.participants.length >= event.capacity;
  const canRegister = user && !isRegistered && !event.isPast && !isEventFull;

  const handleRegister = () => {
    if (canRegister) {
      const success = registerForEvent(event.id);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  const getSocietyColor = (society: string) => {
    const colors = {
      'Computer Society': 'bg-blue-100 text-blue-800',
      'Communication Society': 'bg-green-100 text-green-800',
      'SIGHT': 'bg-purple-100 text-purple-800',
      'WIE': 'bg-pink-100 text-pink-800'
    };
    return colors[society as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/events"
            className="inline-flex items-center text-[#0057B7] hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Events
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Hero Image */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSocietyColor(event.society)}`}>
                  {event.society}
                </span>
              </div>
              {event.isPast && (
                <div className="absolute top-6 right-6 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Past Event
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                {event.title}
              </motion.h1>

              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-6 mb-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={20} className="mr-3 text-[#0057B7]" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock size={20} className="mr-3 text-[#0057B7]" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin size={20} className="mr-3 text-[#0057B7]" />
                    <span>{event.venue}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users size={20} className="mr-3 text-[#0057B7]" />
                    <span>{event.participants.length} / {event.capacity} registered</span>
                  </div>
                </div>

                {/* Registration Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Registration</h3>
                  
                  {!user ? (
                    <div className="space-y-4">
                      <p className="text-gray-600">Please sign in to register for this event.</p>
                      <div className="flex space-x-3">
                        <Link to="/student/login" className="flex-1">
                          <AnimatedButton variant="primary" className="w-full">
                            Sign In
                          </AnimatedButton>
                        </Link>
                        <Link to="/student/signup" className="flex-1">
                          <AnimatedButton variant="outline" className="w-full">
                            Sign Up
                          </AnimatedButton>
                        </Link>
                      </div>
                    </div>
                  ) : event.isPast ? (
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">This event has already ended.</p>
                    </div>
                  ) : isRegistered ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <p className="text-green-600 font-medium">You're registered!</p>
                    </div>
                  ) : isEventFull ? (
                    <div className="text-center">
                      <p className="text-red-600 mb-2">Event is full</p>
                      <p className="text-sm text-gray-600">Registration is closed</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatedButton
                        onClick={handleRegister}
                        variant="primary"
                        className="w-full"
                      >
                        <UserPlus size={18} className="mr-2" />
                        Register Now
                      </AnimatedButton>
                      <p className="text-xs text-gray-500">
                        Free registration • Cancel anytime
                      </p>
                    </div>
                  )}

                  {/* Success Message */}
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center"
                    >
                      Successfully registered! Check your dashboard for details.
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="prose max-w-none"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Registration Progress</span>
                  <span className="text-sm text-gray-500">
                    {Math.round((event.participants.length / event.capacity) * 100)}% full
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(event.participants.length / event.capacity) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-[#0057B7] h-2 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;