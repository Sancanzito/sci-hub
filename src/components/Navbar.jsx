// Navbar.jsx - Updated with animated theme toggle
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location]);

  const articleCategories = [
    {
      title: 'Microbiology & Genetics',
      emoji: '🧬',
      subTopics: [
        { name: 'DNA Isolation Protocols', path: '/articles/biology/dna-isolation' },
        { name: 'Protein Folding', path: '/articles/biology/proteins' },
        { name: 'CRISPR Case Studies', path: '/articles/biology/crispr' }
      ]
    },
    {
      title: 'Experimental Physics',
      emoji: '⚛️',
      subTopics: [
        { name: 'Thermodynamics Lab', path: '/articles/physics/thermal' },
        { name: 'Electromagnetism', path: '/articles/physics/em' },
        { name: 'Newton\'s Law of Cooling', path: '/articles/physics/newton' }
      ]
    }
  ];

  const chatLinks = [
    { name: 'Research Lab Assistant', path: '/chat/research', emoji: '🔬', description: 'Analyze DNA lab data' },
    { name: 'Physics Tutor', path: '/chat/physics', emoji: '📐', description: 'Solve circuit & thermal problems' }
  ];

  const navigationLinks = [
    { name: 'Articles', path: '/articles', emoji: '📚', hasDropdown: true },
    { name: 'Simulations', path: '/simulations', emoji: '💻' },
    { name: 'Quizzes', path: '/quizzes', emoji: '✏️' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.span 
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-2xl"
              >
                🔬
              </motion.span>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-mono">
                Sci<span className="text-cyan-600 dark:text-cyan-400">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative" 
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown('articles')} 
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <motion.span animate={{ rotate: activeDropdown === 'articles' ? 180 : 0 }}>
                        ▾
                      </motion.span>
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === 'articles' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl mt-2 p-3"
                      >
                        {articleCategories.map((cat) => (
                          <div key={cat.title} className="mb-3 last:mb-0">
                            <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">{cat.emoji} {cat.title}</div>
                            {cat.subTopics.map((topic) => (
                              <Link key={topic.name} to={topic.path} className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                {topic.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Animated Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-14 h-7 rounded-full p-1 transition-colors duration-200"
                style={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb',
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Dark Mode"
              >
                {/* Background particles animation for light mode */}
                {!isDarkMode && (
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Stars animation for dark mode */}
                {isDarkMode && (
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Sliding Handle */}
                <motion.div
                  className="absolute top-1 w-5 h-5 rounded-full shadow-md flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkMode ? '#fbbf24' : '#6366f1',
                    left: isDarkMode ? 'calc(100% - 1.75rem)' : '0.25rem',
                  }}
                  animate={{
                    left: isDarkMode ? 'calc(100% - 1.75rem)' : '0.25rem',
                    rotate: isDarkMode ? 0 : 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    scale: {
                      duration: 0.3,
                      times: [0, 0.5, 1],
                    }
                  }}
                >
                  <motion.span
                    className="text-xs"
                    initial={false}
                    animate={{
                      scale: isDarkMode ? [0, 1.2, 1] : [0, 1.2, 1],
                      rotate: isDarkMode ? 0 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDarkMode ? '🌙' : '☀️'}
                  </motion.span>
                </motion.div>
              </motion.button>
              
              {/* AI Trigger */}
              <div className="relative" onMouseEnter={() => setActiveDropdown('chat')} onMouseLeave={() => setActiveDropdown(null)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-4 py-2 bg-cyan-50 dark:bg-cyan-600/20 border border-cyan-200 dark:border-cyan-500/50 text-cyan-700 dark:text-cyan-400 rounded-lg text-sm font-medium"
                >
                  AI Assistant
                </motion.button>
                <AnimatePresence>
                  {activeDropdown === 'chat' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-2 shadow-xl"
                    >
                      {chatLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                          <span className="text-lg">{link.emoji}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{link.name}</div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400">{link.description}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;