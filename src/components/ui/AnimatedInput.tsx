import { motion } from 'framer-motion';
import { useState, forwardRef, InputHTMLAttributes } from 'react';

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="relative">
          <input
            ref={ref}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent transition-all duration-200 placeholder-transparent peer ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            } ${props.className || ''}`}
            placeholder={label}
          />
          <motion.label
            animate={{
              scale: isFocused || props.value ? 0.85 : 1,
              y: isFocused || props.value ? -28 : 0,
              color: error ? '#ef4444' : isFocused ? '#0057B7' : '#6b7280'
            }}
            className="absolute left-4 top-3 transition-all duration-200 pointer-events-none font-medium"
          >
            {label}
          </motion.label>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;