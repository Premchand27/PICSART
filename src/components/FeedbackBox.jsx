import './FeedbackForm.css';
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const FeedbackForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_9nfxiqr',
      'template_wj1zcbj',
      form.current,
      '1e_IC50CYVbPsYfH9'
    ).then(
      (result) => {
        alert('Feedback sent successfully!');
      },
      (error) => {
        alert('Something went wrong. Try again!');
      }
    );
  };

  return (
    <div className="feedback-section">
      <h2>Send Us Your Feedback</h2>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Feedback" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
