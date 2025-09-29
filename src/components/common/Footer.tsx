import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#0057B7] rounded flex items-center justify-center">
                <span className="text-white font-bold">IEEE</span>
              </div>
              <span className="font-bold text-xl">Student Branch</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Advancing technology for humanity. Our IEEE Student Branch fosters innovation, 
              technical excellence, and professional development among engineering students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0057B7] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0057B7] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0057B7] transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/team" className="text-gray-300 hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/achievements" className="text-gray-300 hover:text-white transition-colors">Achievements</Link></li>
              <li><Link to="/publications" className="text-gray-300 hover:text-white transition-colors">Publications</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-[#0057B7]" />
                <span className="text-gray-300">ieee@university.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-[#0057B7]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-[#0057B7] mt-1" />
                <span className="text-gray-300">
                  Engineering Building<br />
                  Room 201, University Campus
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 IEEE Student Branch. All rights reserved. | 
            <span className="text-[#0057B7]"> Advancing Technology for Humanity</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;