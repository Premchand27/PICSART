import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Follow us' }
  ];

  return (
    <header className="header">
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Clickoshot
      </motion.div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      <AnimatePresence>
        {isOpen && <motion.div 
          className="mobile-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
        />}
      </AnimatePresence>

      <nav className={`nav-links ${isOpen ? 'show' : ''}`}>
        <AnimatePresence>
          {routes.map(({ path, label }) => {
            const isActive = location.pathname === path;

            return (
              <motion.div
                key={path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={path} 
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
