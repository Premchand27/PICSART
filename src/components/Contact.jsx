import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-details">
        <h3>Get in Touch</h3>
        <p><strong>Email:</strong> premchandgunturu710@gmail.com</p>
        <p><strong>Phone:</strong> 7670969605</p>
        <p><strong>Location:</strong> Vijayawada, Andhra Pradesh</p>

        <div className="social-icons">
          <a href="https://github.com/Premchand27" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/gunturu-premchand-5b74b8239/" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
