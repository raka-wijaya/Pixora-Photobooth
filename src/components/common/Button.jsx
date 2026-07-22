import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-soft hover:shadow-hover',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 border border-slate-200',
    accent: 'bg-amber-500 text-slate-950 hover:bg-amber-400 active:bg-amber-600 shadow-soft hover:shadow-hover font-bold',
    outline: 'bg-transparent text-slate-800 border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-soft',
    glass: 'bg-white/80 backdrop-blur-md text-slate-900 border border-white/40 hover:bg-white shadow-soft'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
    xl: 'text-lg px-8 py-4 gap-3 font-bold'
  };

  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : {}}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 shrink-0" />}
    </motion.button>
  );
};
