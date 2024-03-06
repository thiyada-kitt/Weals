import React, { useState, useEffect } from 'react';
import './App.css';
import Slider from 'react-slick';


function App() {
  const [showContent, setShowContent] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [currentPage, setCurrentPage] = useState('NewPage1');
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 20, seconds: 0 });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);

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
      }, 1000);
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
        }, 200);

        return () => clearInterval(countdownInterval);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % 13); // Assume there are 3 photos
    }, 1000); // Change photo every 2 seconds

    return () => clearInterval(photoInterval);
  }, []);

  const handleButtonClick = () => {
    setCurrentPage('NewPage2');
  };

  const handleGreetingClick = () => {
    setIsGreetingVisible(!isGreetingVisible);
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
              <img style={{ opacity: opacity, transition: 'opacity 1s ease-in-out', width: '200px', marginRight: '10px', verticalAlign: 'middle' }} src="wealsproto.jpg" alt="my cutie" />
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
          <p style={{ fontWeight: 'bold', fontSize: '25px', color: '#FF00FF', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)', marginTop: '60px'} }>Happy birthday my baby</p>
          <p style={{ fontWeight: 'bold', fontSize: '20px'} }>0.2 m with u ♡</p>
          <p style={{
            border: '2px solid lightgrey',
            padding: '5px 10px',
            borderRadius: '10px', fontWeight: 'bold' , display: 'inline-block'
          }}>{`${countdown.hours.toString().padStart(2, '0')}:${countdown.minutes.toString().padStart(2, '0')}:${countdown.seconds.toString().padStart(2, '0')}`}</p>
          <br />
          <button className="button2" onClick={handleGreetingClick}>{isGreetingVisible ? 'Click me!' : 'Click me!'} 🎂</button>
          <br />
          {isGreetingVisible && (
            <div className="greeting-box">
              <p> วันเกิดปีนี้เด็กดีของเค้าโตขึ้นอีกปีแล้ว ขอให้ที่รักสุขภาพแข็งแรงๆ ทั้งร่างกายแล้วก็จิตใจ ไม่มีเรื่องให้ต้องเครียดเยอะ ขอให้ตั้งแต่วันนี้เป็นการเริ่มต้น 19 ขวบที่ดีของเธอ เจอแต่คนดีๆ อย่างเช่นเค้า ล้อเล่น
                ขอบคุณจริงๆที่เกิดมาให้รัก สุขสันต์วันเกิดนะคะ โตไปด้วยกันอีกหลายๆปีเลยนะไอเอเลี่ยนม่วง เค้ารักเธอมากๆเลยยย
              </p>
            </div>
          )}
          <p>ขอบคุณที่อยู่เป็นความสุขให้เค้าในทุกๆวัน เค้ารักเธอนะคะคนดี</p>
          <p>การที่ได้รู้จักเธอ สำหรับเค้ามันยิ่งกว่าคำว่าโชคดีอีก :-) </p>
          <div className="photo-slide">
            <img src={`${currentPhotoIndex + 1}.jpg`} alt={`Photo ${currentPhotoIndex + 1}`} style={{ width: '400px', height: '400px', borderRadius: '10%' }} />
          </div>
          <p>ไม่ค่อยมีรูปด้วยกันเลย ไว้เจอกันแล้วมาถ่ายด้วยกันเยอะๆนะ ♡</p>
        </div>
      )}
    </div>
  );
}

export default App;
