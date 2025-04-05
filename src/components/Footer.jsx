import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()} My Photography. All rights reserved.</p>
      <p className="made-by">
        Created with <span className="heart">♥</span> by <strong>Premchand</strong>
      </p>
    </footer>
  );
};

export default Footer;
