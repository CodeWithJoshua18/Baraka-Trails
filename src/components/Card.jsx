import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -10, shadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;