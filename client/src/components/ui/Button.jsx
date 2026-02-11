import { motion } from 'framer-motion';

// --- KEY FIX: 'export const' instead of 'const' ---
export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm";
  
  const variants = {
    primary: "bg-primary text-gray-800 hover:bg-slate-800 shadow-soft",
    secondary: "bg-white text-primary border border-border hover:bg-gray-50",
    accent: "bg-secondary text-gray-800 hover:bg-blue-600 shadow-lg shadow-blue-500/20",
    ghost: "bg-transparent text-muted hover:text-primary hover:bg-gray-100"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};