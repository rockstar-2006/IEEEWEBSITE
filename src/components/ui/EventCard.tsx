import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '../../types';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  index?: number;
}

const getSocietyColor = (society: string) => {
  const colors = {
    'Computer Society': 'bg-blue-100 text-blue-800',
    'Communication Society': 'bg-green-100 text-green-800',
    'SIGHT': 'bg-purple-100 text-purple-800',
    'WIE': 'bg-pink-100 text-pink-800'
  };
  return colors[society as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSocietyColor(event.society)}`}>
            {event.society}
          </span>
        </div>
        {event.isPast && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Past Event
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-900">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-2" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-2" />
            <span>{event.participants.length}/{event.capacity} registered</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link 
          to={`/events/${event.id}`}
          className="block w-full bg-[#0057B7] text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;