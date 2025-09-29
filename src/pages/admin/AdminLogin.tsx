import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AnimatedInput from '../../components/ui/AnimatedInput';
import AnimatedButton from '../../components/ui/AnimatedButton';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    ieeeId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const success = login(formData.ieeeId, formData.password, true);
      
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <span className="font-bold text-xl">Admin Access</span>
            </div>
            <p className="text-gray-600">
              Administrative login for IEEE Student Branch
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatedInput
              name="ieeeId"
              type="email"
              label="Admin IEEE ID"
              value={formData.ieeeId}
              onChange={handleInputChange}
              required
            />

            <AnimatedInput
              name="password"
              type="password"
              label="Admin Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Authenticating...' : 'Admin Sign In'}
            </AnimatedButton>
          </form>

          <div className="mt-6 text-center">
            <Link to="/student/login" className="text-sm text-gray-500 hover:text-gray-700">
              Student Login
            </Link>
          </div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <h4 className="font-medium text-red-900 mb-2">Demo Admin Credentials:</h4>
            <div className="text-sm text-red-800 space-y-1">
              <p><strong>IEEE ID:</strong> admin@ieee.local</p>
              <p><strong>Password:</strong> Admin@2025</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;