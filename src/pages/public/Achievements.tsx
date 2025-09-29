import { motion } from 'framer-motion';
import { Calendar, Award, Users, BookOpen } from 'lucide-react';
import achievementsData from '../../data/achievements.json';

const Achievements = () => {
  const getCategoryIcon = (category: string) => {
    const icons = {
      'Recognition': Award,
      'Competition': Users,
      'Service': Users,
      'Research': BookOpen,
      'Partnership': Users
    };
    return icons[category as keyof typeof icons] || Award;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Recognition': 'bg-yellow-100 text-yellow-800',
      'Competition': 'bg-blue-100 text-blue-800',
      'Service': 'bg-green-100 text-green-800',
      'Research': 'bg-purple-100 text-purple-800',
      'Partnership': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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
            Our Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our journey of excellence, innovation, and impact in 
            the engineering community and beyond.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-[#0057B7]/20"></div>
          
          <div className="space-y-12">
            {achievementsData.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#0057B7] rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(achievement.category)}`}>
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Calendar size={16} className="text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          {new Date(achievement.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-[#0057B7] rounded-xl text-white p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Impact by Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-blue-200">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Students Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-200">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Events Organized</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Achievements;