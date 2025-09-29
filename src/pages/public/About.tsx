import { motion } from 'framer-motion';
import { Target, Eye, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We foster creativity and innovative thinking to solve real-world problems through technology.'
    },
    {
      icon: Eye,
      title: 'Excellence',
      description: 'We strive for excellence in all our technical and professional endeavors.'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'We build a strong community of engineers dedicated to making a positive impact.'
    },
    {
      icon: Lightbulb,
      title: 'Learning',
      description: 'We provide continuous learning opportunities to keep pace with technological advancements.'
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About IEEE Student Branch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a vibrant community of engineering students passionate about 
            technology, innovation, and making a positive impact on society.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To advance technology for humanity by providing a platform for students 
              to enhance their technical skills, engage in professional development, 
              and contribute to society through innovative projects and community service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be recognized as a leading IEEE Student Branch that produces 
              technically competent, ethically responsible, and socially conscious 
              engineers who can make significant contributions to society.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0057B7] text-white rounded-full mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* IEEE Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About IEEE
              </h2>
              <p className="text-gray-600 mb-4">
                The Institute of Electrical and Electronics Engineers (IEEE) is the world's 
                largest technical professional organization dedicated to advancing technology 
                for the benefit of humanity.
              </p>
              <p className="text-gray-600 mb-4">
                IEEE and its members inspire a global community to innovate for a better tomorrow 
                through highly cited publications, conferences, technology standards, and 
                professional and educational activities.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#0057B7]">400,000+</h3>
                  <p className="text-gray-600">Members Worldwide</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#0057B7]">160+</h3>
                  <p className="text-gray-600">Countries</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#0057B7]">39</h3>
                  <p className="text-gray-600">Societies</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#0057B7]">1,300+</h3>
                  <p className="text-gray-600">Standards</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="IEEE Community"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0057B7]/10 rounded-lg" />
            </div>
          </div>
        </motion.section>

        {/* Activities */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Workshops</h3>
              <p className="text-gray-600">
                We organize hands-on workshops on cutting-edge technologies including 
                AI/ML, IoT, robotics, and more to keep our members updated with industry trends.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Talks</h3>
              <p className="text-gray-600">
                Regular sessions with industry experts and IEEE senior members sharing 
                insights on career development and technological advancements.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Service</h3>
              <p className="text-gray-600">
                Through IEEE SIGHT, we engage in humanitarian projects and community 
                service to make a positive impact on society.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;