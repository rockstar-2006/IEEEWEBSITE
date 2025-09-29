import { motion } from 'framer-motion';
import { Download, ExternalLink, Calendar, Users } from 'lucide-react';
import publicationsData from '../../data/publications.json';

const Publications = () => {
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
            Publications & Research
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our research contributions and publications that showcase 
            the innovative work being done by our IEEE Student Branch members.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {publicationsData.map((publication, index) => (
            <motion.article
              key={publication.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {publication.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      <span>{publication.authors.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span>{publication.year}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#0057B7]/10 text-[#0057B7] rounded-full text-sm font-medium">
                      {publication.journal}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {publication.abstract}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 lg:ml-8">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={publication.downloadLink}
                    className="flex items-center justify-center px-6 py-3 bg-[#0057B7] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} className="mr-2" />
                    Download
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-6 py-3 border-2 border-[#0057B7] text-[#0057B7] font-medium rounded-lg hover:bg-[#0057B7] hover:text-white transition-colors"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    View Online
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Research Areas */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Research Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Artificial Intelligence', 'Internet of Things', 'Smart Grids', 'Sustainable Technology'].map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-[#0057B7] to-blue-700 text-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-lg">{area}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gray-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Research Community
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Interested in contributing to cutting-edge research? Join our IEEE Student Branch 
            and be part of groundbreaking research initiatives.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#0057B7] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Involved in Research
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
};

export default Publications;