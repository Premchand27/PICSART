import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
  return (
    <motion.div 
      className="page about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="about-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <motion.p 
        className="about-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        I’m a passionate photographer with an eye for capturing life's most beautiful moments. From sweeping landscapes to intimate portraits, I aim to tell a story with every image.
      </motion.p>

      <motion.div 
        className="glow-ambiance"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </motion.div>
  );
};

export default About;
