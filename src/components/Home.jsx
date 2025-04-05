// src/components/Home.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Home.css';
import Gallery from './Gallery';
import Footer from './Footer';
import About from './About';
import FeedbackForm from './FeedbackBox';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    title: 'WONDERFUL ISLAND',
    description: 'Capture moments of calm and wonder in nature’s embrace.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    title: 'MYSTIC FOREST',
    description: 'Uncover the magic that lies within the heart of the woods.',
  },
  {
    image: 'https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1600&q=80',
    title: 'SERENE HEIGHTS',
    description: 'Feel the silence at the top — where your soul meets the sky.',
  },
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="home-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="enhanced-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-dark-overlay">
                <div className="slide-text">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <About/>
      <Gallery/>
      <FeedbackForm/>
      <Footer/>
    </div>
  );
};

export default Home;
