'use client';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const healthTopics = [
    {
      id: 'covid',
      title: 'COVID Updates',
      icon: '🦠',
      gradient: 'from-red-400 to-red-600',
      description: 'Latest information about COVID-19 pandemic, prevention, and vaccination.',
      details: [
        {
          title: 'Current Trends',
          content: 'Global pandemic status and emerging variants.'
        },
        {
          title: 'Prevention Strategies',
          content: 'Effective methods to protect yourself and others.'
        },
        {
          title: 'Vaccination Progress',
          content: 'Latest updates on global vaccination efforts.'
        }
      ]
    },
    {
      id: 'heart',
      title: 'Heart Health',
      icon: '❤️',
      gradient: 'from-pink-400 to-pink-600',
      description: 'Comprehensive guide to maintaining cardiovascular wellness.',
      details: [
        {
          title: 'Risk Assessment',
          content: 'Understanding your cardiovascular health indicators.'
        },
        {
          title: 'Lifestyle Recommendations',
          content: 'Diet and exercise tips for a healthy heart.'
        },
        {
          title: 'Early Warning Signs',
          content: 'Recognizing potential heart health issues.'
        }
      ]
    },
    {
      id: 'mental',
      title: 'Mental Wellness',
      icon: '🧠',
      gradient: 'from-purple-400 to-purple-600',
      description: 'Strategies and support for mental well-being.',
      details: [
        {
          title: 'Stress Management',
          content: 'Techniques to reduce and manage daily stress.'
        },
        {
          title: 'Emotional Intelligence',
          content: 'Developing better emotional awareness and regulation.'
        },
        {
          title: 'Support Resources',
          content: 'Professional help and community support options.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            {selectedTopic 
              ? selectedTopic 
              : 'Your Health Dashboard'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {selectedTopic 
              ? 'Dive deep into your selected health topic' 
              : 'Comprehensive health insights tailored to your needs'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedTopic ? (
            <motion.div 
              key="topics-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {healthTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTopic(topic.title)}
                  className={`
                    bg-gradient-to-br ${topic.gradient} 
                    rounded-2xl p-6 text-white 
                    cursor-pointer shadow-2xl 
                    transform transition-all duration-300
                  `}
                >
                  <div className="text-5xl mb-4">{topic.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{topic.title}</h2>
                  <p className="opacity-80">{topic.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="topic-details"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-4xl mx-auto"
            >
              {healthTopics
                .filter(topic => topic.title === selectedTopic)
                .map((topic) => (
                  <div key={topic.id} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div 
                      className={`
                        bg-gradient-to-r ${topic.gradient} 
                        text-white p-6 flex items-center
                      `}
                    >
                      <div className="text-5xl mr-4">{topic.icon}</div>
                      <div>
                        <h2 className="text-3xl font-bold">{topic.title}</h2>
                        <p className="opacity-80">{topic.description}</p>
                      </div>
                    </div>

                    <div className="p-8 grid md:grid-cols-3 gap-6">
                      {topic.details.map((detail, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="bg-gray-100 rounded-xl p-5 shadow-md"
                        >
                          <h3 className="text-xl font-semibold text-blue-700 mb-3">
                            {detail.title}
                          </h3>
                          <p className="text-gray-600">{detail.content}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-6 text-center">
                      <button
                        onClick={() => setSelectedTopic(null)}
                        className="
                          bg-blue-500 text-white 
                          px-6 py-3 rounded-full 
                          hover:bg-blue-600 
                          transition-colors
                        "
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='flex justify-center item-center'>
        <Link href="/viewdashboard">
        <button className='bg-gradient-to-r from-blue-600 to-purple-600  text-white px-8 py-4 rounded-full text-xl  font-bold shadow-2xl hover:scale-105  transform transition-all duration-300 '>
        Go To View Dashboard
        </button>
        </Link>
      </div>
    </Layout>
  );
}
