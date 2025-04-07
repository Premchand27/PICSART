import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
  const categories = ['All', 'Nature', 'Urban'];

  const images = [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s',
      category: 'Nature',
      caption: 'Tranquil Forest'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s',
      category: 'Urban',
      caption: 'City Skyline'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s',
      category: 'Nature',
      caption: 'Mountain Morning'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCLHmIN0gTgERisY6t0EPogYa_mGfO0ZecQ&s',
      category: 'Urban',
      caption: 'Downtown Lights'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxData, setLightboxData] = useState({});

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter(img => img.category === selectedCategory);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = lightboxImg;
    link.download = 'image.jpg';
    link.click();
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(lightboxData.caption);
    alert('Caption copied!');
  };

  const handleViewOriginal = () => {
    window.open(lightboxImg, '_blank');
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

      <motion.div className="image-grid" initial="hidden" animate="visible">
        {filteredImages.map((img, index) => (
          <motion.div className="image-item" key={index} whileHover={{ scale: 1.05 }}>
            <img
              src={img.src}
              alt={img.caption}
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
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
              <div className="lightbox-caption">{lightboxData.caption}</div>
              <div className="lightbox-buttons">
                <button onClick={handleViewOriginal}>🔍 View Original</button>
                <button onClick={handleDownload}>💾 Download</button>
                <button onClick={handleCopyCaption}>📋 Copy Caption</button>
                <button onClick={() => setLightboxImg(null)}>↩️ Back</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
