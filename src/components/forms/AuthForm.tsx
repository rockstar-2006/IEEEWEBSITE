import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedInput from '../ui/AnimatedInput';
import AnimatedButton from '../ui/AnimatedButton';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

const AuthForm = ({ mode, onSubmit, isLoading, error }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    ieeeId: '',
    password: '',
    fullName: '',
    email: '',
    branch: '',
    year: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <AnimatedInput
        name="ieeeId"
        type="email"
        label="IEEE ID / Email"
        value={formData.ieeeId}
        onChange={handleInputChange}
        required
      />

      {mode === 'signup' && (
        <>
          <AnimatedInput
            name="fullName"
            type="text"
            label="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />

          <AnimatedInput
            name="email"
            type="email"
            label="Personal Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Branch</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Electronics Engineering">Electronics Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </motion.div>
          </div>
        </>
      )}

      <AnimatedInput
        name="password"
        type="password"
        label="Password"
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
        {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
      </AnimatedButton>
    </motion.form>
  );
};

export default AuthForm;