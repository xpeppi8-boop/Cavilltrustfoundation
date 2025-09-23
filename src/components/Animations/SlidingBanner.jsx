import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
// Images
import argylleImg from '../../assets/argylle.jpeg';
import bloodcreekImg from '../../assets/bloodcreek.jpeg';
import captureImg from '../../assets/capture.jpeg';
import coldImg from '../../assets/cold.jpeg';
import countImg from '../../assets/count.jpeg';
import dawnImg from '../../assets/dawn.jpeg';
import enolaImg from '../../assets/enola.jpeg';
import falloutImg from '../../assets/fallout.jpeg';
import hellraiserImg from '../../assets/hellraiser.jpeg';
import immortalsImg from '../../assets/immortals.jpeg';
import justiceImg from '../../assets/justice.jpeg';
import leagueImg from '../../assets/league.jpeg';
import nightImg from '../../assets/night.jpeg';
import stardustImg from '../../assets/stardust.jpeg';
import steelImg from '../../assets/steel.jpeg';
import tristanImg from '../../assets/tristan.jpeg';
import uncleImg from '../../assets/uncle.jpeg';
import worksImg from '../../assets/works.jpeg';
import cavill1 from '../../assets/cavill1.jpg';
import cavill2 from '../../assets/cavill2.jpg';
import cavill3 from '../../assets/cavill3.jpg';
import cavill4 from '../../assets/cavill4.jpg';
import cavill5 from '../../assets/cavill5.jpg';

const slide = keyframes`
  0% {
    transform: translateX(6%);
  }
  50% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-200%);
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background: linear-gradient(90deg, #5b3a29 0%, #7b5a3a 35%, #b8860b 70%, #d4af37 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 8px 0; /* a bit more vertical padding */
  margin: 0;
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  line-height: 1;
`;

const SlideBox = styled.div`
  height: 70px;  /* Increased from 66px */
  color: #1e3a8a;
  display: inline-block;
  width: 100%;
`;

const ScrollContent = styled.div`
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
  width: auto; 
`;

// Top navigation bar above the sliding banner
const TopNav = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    #6b7c8f 0%,
    #44627f 50%,
    #1f2e40 100%
  );
  color: #e9eef5;
  padding: 14px 18px 14px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Inter', sans-serif;
  min-height: 72px; 

  .brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .logo {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.05);
  }

  .text {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 18px;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #e5e7eb;
    text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  }
`;

const BitBox = styled.div`
  width: 200px;
  min-width: 200px;
  border-right: 1px solid rgb(102, 59, 48);
  height: 90px;  /* Increased from 80px */
  display: inline-flex;
  flex-direction: column; 
  align-items: center;
  text-align: center;
  font-size: 12px;
  margin: 0;
  padding: 10px 8px;  /* Increased padding for better spacing */
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  white-space: normal;
  line-height: 1.3;
  background: ${({ bg }) => bg 
    ? `linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(${bg})`
    : 'rgba(255, 255, 255, 0.8)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
  
  .title {
    font-weight: 700;
    margin-bottom: 4px;
    font-size: 14px;  /* Slightly reduced font size to fit more text */
    line-height: 1.2;
  }
  
  span {
    font-weight: 700;
    color: #f3f4f6;
    font-size: 13px;
    margin-bottom: 2px;
  }
  
  .role {
    font-size: 12px;
    color: #e5e7eb;
    margin-top: 2px;
    font-weight: 500;
    background: rgba(0,0,0,0.4);
    padding: 1px 6px;
    border-radius: 4px;
  }
`;

// Henry Cavill's notable movies (and some TV) — updated per request
const itemWidth = 200;
const moviesData = [
  { title: 'The Count of Monte Cristo', year: 2001, role: 'Albert Mondego' },
  { title: 'I Capture the Castle', year: 2003, role: 'Stephen Colley' },
  { title: 'Hellraiser: Hellworld', year: 2005, role: 'Mike' },
  { title: 'Tristan & Isolde', year: 2006, role: 'Melot' },
  { title: 'Stardust', year: 2007, role: 'Humphrey' },
  { title: 'Whatever Works', year: 2009, role: '' },
  { title: 'Blood Creek', year: 2009, role: 'Evan Marshall' },
  { title: 'Immortals', year: 2011, role: 'Theseus' },
  { title: 'The Cold Light of Day', year: 2012, role: 'Will Shaw' },
  { title: 'Man of Steel', year: 2013, role: 'Superman' },
  { title: 'The Man from U.N.C.L.E.', year: 2015, role: 'Napoleon Solo' },
  { title: 'Batman v Superman: Dawn of Justice', year: 2016, role: 'Superman' },
  { title: 'Justice League', year: 2017, role: 'Superman' },
  { title: 'Sand Castle', year: 2017, role: 'Sgt. Syverson' },
  { title: 'Mission: Impossible – Fallout', year: 2018, role: 'August Walker' },
  { title: 'Night Hunter', year: 2018, role: 'Marshall' },
  { title: 'Enola Holmes', year: 2020, role: 'Sherlock Holmes' },
  { title: 'Zack Snyder’s Justice League', year: 2021, role: 'Superman' },
  { title: 'Enola Holmes 2', year: 2022, role: 'Sherlock Holmes' },
  { title: 'The Ministry of Ungentlemanly Warfare', year: 2024, role: 'Gus March-Phillips' },
  { title: 'Argylle', year: 2024, role: '' },
];

const SlidingBanner = () => {
  const baseLen = moviesData.length;
  const [currentIndex, setCurrentIndex] = useState(baseLen); // start from the middle copy
  const [isPaused, setIsPaused] = useState(false);
  const [shouldTransition, setShouldTransition] = useState(true);
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(5);
  const items = useMemo(() => [...moviesData, ...moviesData, ...moviesData], []);

  // Map movie titles to images found in src/assets
  const fallbackImages = useMemo(() => [cavill1, cavill2, cavill3, cavill4, cavill5], []);
  const imagesByTitle = useMemo(() => ({
    'The Count of Monte Cristo': countImg,
    'I Capture the Castle': captureImg,
    'Hellraiser: Hellworld': hellraiserImg,
    'Tristan & Isolde': tristanImg,
    'Stardust': stardustImg,
    'Whatever Works': worksImg,
    'Blood Creek': bloodcreekImg,
    'Immortals': immortalsImg,
    'The Cold Light of Day': coldImg,
    'Man of Steel': steelImg,
    'The Man from U.N.C.L.E.': uncleImg,
    'Batman v Superman: Dawn of Justice': dawnImg,
    'Justice League': justiceImg,
    'Sand Castle': undefined, // no specific image found
    'Mission: Impossible – Fallout': falloutImg,
    'Night Hunter': nightImg,
    'Enola Holmes': enolaImg,
    'Zack Snyder’s Justice League': leagueImg,
    'Enola Holmes 2': enolaImg, // reuse
    'The Ministry of Ungentlemanly Warfare': undefined, // no specific image found
    'Argylle': argylleImg,
  }), []);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setShouldTransition(true);
      setCurrentIndex(prev => {
        const next = prev + 1;
        // When we approach the end of the second (middle) copy, schedule a reset back to middle
        if (next >= baseLen * 2) {
          // after the slide completes, jump back to the middle without transition
          setTimeout(() => {
            setShouldTransition(false);
            setCurrentIndex(baseLen);
            // re-enable transition on next frame
            requestAnimationFrame(() => setShouldTransition(true));
          }, 500); // match transition duration
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, baseLen]);

  // Handle window resize to update visible items
  useEffect(() => {
    const updateVisibleItems = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newVisibleItems = Math.max(1, Math.floor(containerWidth / itemWidth));
        setVisibleItems(newVisibleItems);
      }
    };

    window.addEventListener('resize', updateVisibleItems);
    updateVisibleItems();
    
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  return (
    <>
      <TopNav>
        <div className="brand">
          <img className="logo" src={cavill1} alt="Cavill Trust Foundation logo" />
          <span className="text">Cavill Trust Foundation</span>
        </div>
      </TopNav>
      <SlideBox 
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      <ScrollContent 
        ref={bannerRef}
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: isPaused || !shouldTransition ? 'none' : 'transform 0.5s ease-in-out'
        }}
      >
        {items.map((item, index) => {
          const direct = imagesByTitle[item.title];
          const bg = direct || fallbackImages[index % fallbackImages.length];
          return (
            <BitBox key={`${item.title}-${index}`} bg={bg}>
              <div className="title">{item.title}</div>
              <span>{item.year}</span>
              {item.role ? <div className="role">{item.role}</div> : null}
            </BitBox>
          );
        })}
      </ScrollContent>
    </SlideBox>
    </>
  );
};

export default SlidingBanner;
