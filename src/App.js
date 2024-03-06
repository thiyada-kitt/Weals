import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="NewPage">
          <p>Happy birthday kub bbe</p>
        </div>
      )}
    </div>
  );
}

export default App;
