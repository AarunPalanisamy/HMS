'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(null);

  const healthFeatures = [
    {
      icon: '❤️',
      title: 'Heart Health',
      description: 'Comprehensive cardiovascular monitoring',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      icon: '🧠',
      title: 'Mental Wellness',
      description: 'Holistic mental health support',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '💪',
      title: 'Fitness Tracking',
      description: 'Personalized fitness insights',
      gradient: 'from-green-400 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-300 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            text-transparent bg-clip-text">
            Welcome to Your Health Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your great place to check and optimize your health. 
            Comprehensive, personalized, and intelligent health tracking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {healthFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFeature(feature)}
              className={`
                bg-gradient-to-br ${feature.gradient} 
                p-6 rounded-2xl shadow-2xl 
                text-white cursor-pointer 
                transform transition-all duration-300
                hover:shadow-xl
              `}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
              <p className="opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {activeFeature && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 
              flex items-center justify-center z-50 p-4"
            onClick={() => setActiveFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`
                bg-gradient-to-br ${activeFeature.gradient} 
                p-8 rounded-2xl max-w-md w-full 
                text-white text-center
              `}
            >
              <div className="text-6xl mb-6">{activeFeature.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{activeFeature.title}</h2>
              <p className="mb-6">{activeFeature.description}</p>
              <button 
                className="bg-white text-blue-600 px-6 py-3 
                  rounded-full font-bold hover:bg-blue-100 
                  transition-colors"
                onClick={() => setActiveFeature(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <button 
            className="
              bg-gradient-to-r from-blue-600 to-purple-600 
              text-white px-8 py-4 rounded-full text-xl 
              font-bold shadow-2xl hover:scale-105 
              transform transition-all duration-300
            "
          >
            Start Your Health Journey
          </button>
        </motion.div>
      </div>

      {/* Subtle Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-blob absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
        <div className="animate-blob animation-delay-2000 absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </div>
  );
}
