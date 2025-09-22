import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from './components/Home/Home';
import Fan from './components/Home/Fan';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';

// Global styles
const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f8fafc;
    color: #1f2937;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
  }
`;

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Global styles={globalStyles} />
        <LanguageSelector />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fan" element={<Fan />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default App;
