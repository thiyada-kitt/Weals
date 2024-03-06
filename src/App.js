import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [currentPage, setCurrentPage] = useState('NewPage1');
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 20, seconds: 0 });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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

  useEffect(() => {
    if (currentPage === 'NewPage2') {
      const endTime = new Date();
      endTime.setHours(24, 0, 0, 0); // Set end time to 24:00:00
      const now = new Date();
      const timeDiff = endTime.getTime() - now.getTime();

      if (timeDiff > 0) {
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds });

        const countdownInterval = setInterval(() => {
          const newTimeDiff = endTime.getTime() - new Date().getTime();
          if (newTimeDiff > 0) {
            const newHours = Math.floor((newTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const newMinutes = Math.floor((newTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const newSeconds = Math.floor((newTimeDiff % (1000 * 60)) / 1000);
            setCountdown({ hours: newHours, minutes: newMinutes, seconds: newSeconds });
          } else {
            clearInterval(countdownInterval);
            setCountdown({ hours: 0, minutes: 0, seconds: 0 });
          }
        }, 1000);

        return () => clearInterval(countdownInterval);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % 3); // Assume there are 3 photos
    }, 2000); // Change photo every 2 seconds

    return () => clearInterval(photoInterval);
  }, []);

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

      {/* เพิ่มเงื่อนไขในการแสดงหน้า NewPage2 */}
      {currentPage === 'NewPage2' && (
        <div className="NewPage2">
          <p>Happy birthday my baby</p>
          <p>0.2 m with u ♡</p>
          <p>{`${countdown.hours.toString().padStart(2, '0')}:${countdown.minutes.toString().padStart(2, '0')}:${countdown.seconds.toString().padStart(2, '0')}`}</p>
          <button>กดตรงนี้เพื่อรับคำอวยพร</button>
          <p>ขอบคุณที่อยู่เป็นความสุขให้เค้าในทุกๆวัน เค้ารักเธอนะคะคนดี</p>
          <p>การที่ได้รู้จักเธอ สำหรับเค้ามันยิ่งกว่าคำว่าโชคดีอีกรู้มั้ย.. :-) </p>
          {/* <div className="photo-slide">
            <img src={`photo${currentPhotoIndex}.jpg`} alt={`Photo ${currentPhotoIndex}`} />
          </div> */}
          <p>message for u ^^</p>
        </div>
      )}
    </div>
  );
}

export default App;
