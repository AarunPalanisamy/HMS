'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar({ theme, onThemeToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Health Topics', href: '/health-topics' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' },
    {name:'Logout',href:'/'}
  ];

  return (
    <nav 
      className={`
        fixed w-full z-50 top-0 left-0 
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' 
          : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'}
        shadow-lg
      `}
    >
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white flex items-center"
          >
            <span className="mr-2">🩺</span>
            HealthHub
          </motion.div>
        </Link>

]        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link 
              key={item.href}
              href={item.href}
              className="text-white hover:text-blue-200 transition-colors duration-300 relative group"
            >
              {item.name}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white 
                  group-hover:w-full transition-all duration-300"
              ></span>
            </Link>
          ))}

          <motion.button
            onClick={onThemeToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              w-12 h-6 rounded-full 
              ${theme === 'dark' 
                ? 'bg-gray-600' 
                : 'bg-blue-300'}
              relative transition-colors duration-300
              flex items-center
            `}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`
                absolute w-6 h-6 bg-white rounded-full shadow-md
                ${theme === 'dark' 
                  ? 'translate-x-6' 
                  : 'translate-x-0'}
                transform transition-transform
              `}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.span>
          </motion.button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            md:hidden absolute top-full left-0 w-full 
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' 
              : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'}
            shadow-lg
          `}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item, index) => (
  <Link 
    key={item.href}
    href={item.href}
    className="text-white hover:text-blue-200 transition-colors duration-300 relative group"
    onClick={() => {
      if (item.name === "Logout") {
        localStorage.clear();
      }
    }}
  >
    {item.name}
    <span 
      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white 
        group-hover:w-full transition-all duration-300"
    ></span>
  </Link>
))}

            
            <div className="flex items-center justify-between py-2">
              <span className="text-white">Switch Theme</span>
              <motion.button
                onClick={onThemeToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  w-12 h-6 rounded-full 
                  ${theme === 'dark' 
                    ? 'bg-gray-600' 
                    : 'bg-blue-300'}
                  relative transition-colors duration-300
                  flex items-center
                `}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`
                    absolute w-6 h-6 bg-white rounded-full shadow-md
                    ${theme === 'dark' 
                      ? 'translate-x-6' 
                      : 'translate-x-0'}
                    transform transition-transform
                  `}
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
