import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LanguageSelectorContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? fadeIn : fadeOut} 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  
  &:hover {
    opacity: 1 !important;
    animation: none;
  }
`;

const Select = styled.select`
  padding: 10px 
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(138, 143, 155, 0.2);
  backdrop-filter: blur(5px);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  appearance: none;
  padding-right: 40px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 10px;
    color: #ffffff;
    opacity: 0.8;
  }
  
  &:hover {
    background-color: rgba(30, 58, 138, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
  
  option {
    background-color: #2d3748;
    color: #ffffff;
    padding: 8px 12px;
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Hide after 7 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);
    
    // Show again when language is changed
    const handleLanguageChange = () => {
      setIsVisible(true);
      clearTimeout(timer);
      
      // Hide again after 7 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 7000);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      clearTimeout(timer);
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    // Save language preference to localStorage
    localStorage.setItem('language', event.target.value);
  };

  // Set initial language from localStorage or browser language
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      if (browserLanguage in i18n.options.resources) {
        i18n.changeLanguage(browserLanguage);
      }
    }
  }, [i18n]);

  return (
    <LanguageSelectorContainer isVisible={isVisible}>
      <Select
        value={i18n.language}
        onChange={changeLanguage}
        aria-label="Select language"
        onMouseEnter={() => setIsVisible(true)}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </Select>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
