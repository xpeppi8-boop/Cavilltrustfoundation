import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const LanguageSelectorContainer = styled.div`
  position: fixed;
  top: 80px;  /* Increased from 20px to 80px */
  right: 20px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    top: 70px;  /* Increased from 15px to 70px */
    right: 15px;
  }
`;

const Select = styled.select`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  appearance: none;
  padding-right: 36px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
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
    background-color: rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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
    <LanguageSelectorContainer>
      <Select
        value={i18n.language}
        onChange={changeLanguage}
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </Select>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
