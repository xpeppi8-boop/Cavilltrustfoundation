import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
// Images are now served from the public directory
const cavill6 = '/images/cavill6.jpeg';
const cavill7 = '/images/cavill7.jpeg';
const cavill8 = '/images/cavill8.jpeg';
const cavill9 = '/images/cavill9.jpeg';

// Dynamically import slick-carousel styles
const importSlick = () => {
  useEffect(() => {
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');
  }, []);
  return null;
};

const CarouselContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 16px 0; /* increased vertical padding */

  /* Uniform slide heights */
  .slick-track {
    display: flex;
    align-items: stretch;
  }
  .slick-slide {
    height: auto;
    padding: 0 10px; /* side gutters */
  }
  .slick-slide > div { /* wrapper div inserted by react-slick */
    height: 100%;
  }
`;

const Slide = styled.div`
  position: relative;
  height: 400px;
  background-image: ${props => `url(${props.bgImage})`};
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  padding: 20px;
  
  @media (max-width: 768px) {
    height: 220px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    height: 160px;
    font-size: 1rem;
  }
`;

// Sample carousel data - replace with your actual images and content
const carouselItems = [
  { id: 1, image: cavill6 },
  { id: 2, image: cavill7 },
  { id: 3, image: cavill8 },
  { id: 4, image: cavill9 },
];

const ImageCarousel = () => {
  // Import slick styles
  importSlick();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {carouselItems.map((item) => (
          <div key={item.id}>
            <Slide bgImage={item.image}>
              {/* No text overlay as requested */}
            </Slide>
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ImageCarousel;
