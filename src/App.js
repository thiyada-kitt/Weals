import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [currentPage, setCurrentPage] = useState('NewPage1');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (!showContent) {
      interval = setInterval(() => {
        setOpacity(prevOpacity => Math.min(prevOpacity + 0.2, 1));
      }, 500);
    }

    return () => clearInterval(interval);
  }, [showContent]);

  const handleButtonClick = () => {
    setCurrentPage('NewPage2');
  };

  return (
    <div className="App">
      {showContent ? (
        <header className="App-header">
          <img src="cat.png" className="App-logo" alt="logo" />
          <p>
            Loading love...
          </p>
        </header>
      ) : (
        <div className={currentPage} style={{ display: 'flex', flexDirection: 'column' }}>
          {currentPage === 'NewPage1' && (
            <>
              <p style={{ opacity, transition: 'opacity 1s ease-in-out' }}>🎂 Happy birthday kub bbe 🎉</p>
              <div style={{ opacity, transition: 'opacity 1s ease-in-out', fontWeight: 'bold' }}>7 March 2024</div>
              <br />
              <button className="button" style={{ opacity, transition: 'opacity 1s ease-in-out' }} onClick={handleButtonClick}>♡</button>
            </>
          )}
        </div>
      )}

      {currentPage === 'NewPage2' && (
        <div className="NewPage2">
          <p>สุขสันต์วันครบรอบสองเดือน</p>
        </div>
      )}
    </div>
  );
}

export default App;
