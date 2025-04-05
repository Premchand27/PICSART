import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Gallery.css';

const Gallery = () => {
  const categories = ['All', 'Nature', 'Urban'];

  const images = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s', category: 'Nature', caption: 'Tranquil Forest' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s', category: 'Urban', caption: 'City Skyline' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s', category: 'Nature', caption: 'Mountain Morning' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s', category: 'Urban', caption: 'Downtown Lights' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s', category: 'Nature', caption: 'River Reflections' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s', category: 'Urban', caption: 'Urban Jungle' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxData, setLightboxData] = useState({});

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter(img => img.category === selectedCategory);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80 }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + lightboxImg);
    alert('Image link copied to clipboard!');
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = lightboxImg;
    link.download = 'download.jpg';
    link.click();
  };

  return (
    <motion.div className="gallery-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <h2 className="gallery-title">📸 Gallery</h2>

      <div className="filters">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div className="image-grid" variants={gridVariants} initial="hidden" animate="visible">
        {filteredImages.map((img, index) => (
          <motion.div className="image-item" key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <img
              src={img.src}
              alt={`Image ${index + 1}`}
              onClick={() => {
                setLightboxImg(img.src);
                setLightboxData(img);
              }}
              loading="lazy"
            />
            <div className="caption">{img.caption}</div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightboxImg && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="lightbox-content">
              <motion.img
                src={lightboxImg}
                alt="Preview"
                className="lightbox-image"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="lightbox-caption">{lightboxData.caption} - {lightboxData.category}</div>
              <div className="lightbox-buttons">
                <button onClick={handleShare}>🔗 Share</button>
                <button onClick={handleSave}>💾 Save</button>
                <button onClick={() => setLightboxImg(null)}>❌ Close</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
