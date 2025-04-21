// src/components/Gallery.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

const images = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1668024966086-bd66ba04262f?fm=jpg&q=60&w=3000',
    caption: 'Sunset over the hills',
    category: 'Nature',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1668024966086-bd66ba04262f?fm=jpg&q=60&w=3000',
    caption: 'Mountain adventure',
    category: 'Adventure',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1668024966086-bd66ba04262f?fm=jpg&q=60&w=3000',
    caption: 'City nightscape',
    category: 'City',
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9w72z8uAaEbm6EgBemhR90f7tw1U6KNA6tPIJrEYRUhW6IivYWvwoR9jTgY_bzNfIay8&usqp=CAU',
    caption: 'Urban vibes',
    category: 'City',
  }
];

const categories = ['All', ...new Set(images.map(img => img.category))];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxCaption, setLightboxCaption] = useState('');
  const touchStartY = useRef(0);

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (img, caption) => {
    setLightboxImg(img);
    setLightboxCaption(caption);
  };

  const handleClose = () => setLightboxImg(null);

  const handleSave = () => {
    const a = document.createElement('a');
    a.href = lightboxImg;
    a.download = 'gallery-image';
    a.click();
  };

  const handleLike = () => {
    console.log('Liked image:', lightboxImg);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Gallery Image',
        url: lightboxImg,
      });
    } else {
      navigator.clipboard.writeText(lightboxImg);
      alert('Image URL copied to clipboard!');
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 80) handleClose();
  };

  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lightboxImg]);

  return (
    <div className="gallery-wrapper">
      <div className="category-buttons">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="gallery-grid">
        <AnimatePresence>
          {filteredImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img.src}
              alt={img.caption}
              className="gallery-image"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(img.src, img.caption)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightboxImg && (
          <div className="custom-lightbox-overlay" onClick={handleClose}>
            <motion.div
              className="custom-lightbox-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={lightboxImg}
                alt="Expanded"
                className="custom-lightbox-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="custom-lightbox-caption">{lightboxCaption}</div>
              <div className="custom-lightbox-buttons">
                <button onClick={() => window.open(lightboxImg, '_blank')}>🔍 View Original</button>
                <button onClick={handleSave}>💾 Save</button>
                <button onClick={handleLike}>❤️ Like</button>
                <button onClick={handleShare}>🔗 Share</button>
                <button onClick={handleClose}>❌ Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
