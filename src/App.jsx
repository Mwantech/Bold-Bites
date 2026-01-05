import { useEffect, useState } from 'react';
import FruitLandingPage from './hero';
import ScrollStorySection from './about';
import ShopAndStoriesScroll from './shop';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* REMOVE smooth scroll from html - it breaks scroll animations */
        html {
          scroll-behavior: auto;
        }

        .app-container {
          width: 100%;
          overflow-x: hidden;
        }

        /* Smooth transitions between sections */
        section {
          position: relative;
        }

        /* Scroll to top button */
        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          background: #CB2602;
          color: #F8D78F;
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(203, 38, 2, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }

        .scroll-to-top.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .scroll-to-top:hover {
          background: #3E2723;
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(62, 39, 35, 0.5);
        }

        .scroll-to-top::before {
          content: '↑';
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            width: 50px;
            height: 50px;
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 1.2rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <FruitLandingPage />

      {/* About Section */}
      <ScrollStorySection />

      {/* Shop & Stories Section */}
      <ShopAndStoriesScroll />

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      />
    </div>
  );
}