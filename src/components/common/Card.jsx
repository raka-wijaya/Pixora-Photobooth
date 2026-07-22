import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  padding = 'p-6',
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={`rounded-3xl border transition-all duration-300 ${
        glass
          ? 'glass-panel border-white/60 shadow-soft'
          : 'bg-white border-slate-100 shadow-soft hover:shadow-hover'
      } ${padding} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
