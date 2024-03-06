import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (!showContent) {
      interval = setInterval(() => {
        setOpacity(prevOpacity => Math.min(prevOpacity + 0.1, 1));
      }, 500);
    }

    return () => clearInterval(interval);
  }, [showContent]);

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
        <div className="NewPage1">
          <p style={{ opacity, transition: 'opacity 1s ease-in-out' }}>🎂 Happy birthday kub bbe 🎉</p>
        </div>
      )}
    </div>
  );
}

export default App;
