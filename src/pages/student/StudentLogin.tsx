import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import AuthForm from '../../components/forms/AuthForm';

const StudentLogin = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData: any) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const success = login(formData.ieeeId, formData.password);
      
      if (success) {
        navigate('/student/dashboard');
      } else {
        setError('Invalid IEEE ID or password. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
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
              <div className="w-10 h-10 bg-[#0057B7] rounded flex items-center justify-center">
                <span className="text-white font-bold">IEEE</span>
              </div>
              <span className="font-bold text-xl">Student Login</span>
            </div>
            <p className="text-gray-600">
              Sign in to access your IEEE Student Dashboard
            </p>
          </div>

          <AuthForm
            mode="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/student/signup" className="text-[#0057B7] hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/admin/login" className="text-sm text-gray-500 hover:text-gray-700">
              Admin Login
            </Link>
          </div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg"
          >
            <h4 className="font-medium text-blue-900 mb-2">Demo Credentials:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>IEEE ID:</strong> std001@ieee.local</p>
              <p><strong>Password:</strong> Use same as IEEE ID</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentLogin;