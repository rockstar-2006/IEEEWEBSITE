import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import AuthForm from '../../components/forms/AuthForm';

const StudentSignup = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (formData: any) => {
    setIsLoading(true);
    setError('');
    
    // Basic validation
    if (!formData.ieeeId || !formData.fullName || !formData.email || !formData.branch || !formData.year) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      try {
        const success = signup(formData);
        
        if (success) {
          navigate('/student/dashboard');
        } else {
          setError('Failed to create account. Please try again.');
        }
      } catch (err) {
        setError('An error occurred during signup. Please try again.');
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
              <span className="font-bold text-xl">Join IEEE</span>
            </div>
            <p className="text-gray-600">
              Create your IEEE Student Branch account
            </p>
          </div>

          <AuthForm
            mode="signup"
            onSubmit={handleSignup}
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/student/login" className="text-[#0057B7] hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium text-gray-900 mb-2">Membership Benefits:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Access to exclusive technical workshops</li>
              <li>• Networking opportunities with professionals</li>
              <li>• Career development resources</li>
              <li>• Community service projects</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentSignup;