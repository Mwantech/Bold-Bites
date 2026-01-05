import { ChevronRight } from 'lucide-react';

export default function FruitLandingPage() {
  return (
    <div className="fruit-hero">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .fruit-hero {
          min-height: 120vh; 
          background: linear-gradient(135deg, #6B8E23 0%, #556B2F 50%, #4A5D23 100%);
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding-bottom: 5rem;
        }

        /* Navigation */
        .nav {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          position: relative;
          z-index: 100;
        }

        .nav-links {
          display: flex;
          gap: 3rem;
          list-style: none;
        }

        .nav-links a {
          color: #F8D78F;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          transition: opacity 0.3s;
        }

        .nav-links a:hover {
          opacity: 0.8;
        }

        /* Top Right Teaser Cards */
        .top-right-cards {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          display: flex;
          gap: 1rem;
          z-index: 101;
        }

        .teaser-card {
          background: #F5EAD4;
          border-radius: 20px;
          padding: 0.75rem;
          width: 140px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s;
        }

        .teaser-card:hover {
          transform: translateY(-5px);
        }

        .teaser-card-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: #3E2723;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .teaser-card-image {
          width: 100%;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .teaser-card-image img {
          width: 100%;
          height: 100%;
          object-fit: contain; 
        }

        /* Background Typography */
        .bg-text {
          position: absolute;
          top: 42%; 
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(8rem, 18vw, 20rem);
          font-weight: 900;
          color: #F8D78F;
          line-height: 0.85;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          white-space: nowrap;
          z-index: 1;
          user-select: none;
          pointer-events: none;
        }

        /* Center Focal Point */
        .center-content {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 90%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .fruit-image {
          width: 100%;
          max-width: 700px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4));
          transition: transform 0.7s ease;
        }

        .fruit-image:hover {
          transform: scale(1.05);
        }

        .cta-button {
          margin-top: -7rem;
          background: #CB2602;
          color: #F8D78F;
          font-size: 1.25rem;
          font-weight: 700;
          padding: 1.25rem 3rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 15px 40px rgba(203, 38, 2, 0.4);
          transition: all 0.3s;
          letter-spacing: 0.05em;
          z-index: 11;
          position: relative;
        }

        .cta-button:hover {
          background: #A61F01;
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(203, 38, 2, 0.5);
        }

        /* Product Card Base Styles */
        .product-card {
          background: #F5EAD4;
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .card-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #3E2723;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .card-image {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        /* Bottom Left Cards */
        .bottom-left-cards1 {
          position: absolute;
          bottom: 5rem; 
          left: 2rem;
          display: flex;
          flex-direction: row; 
          align-items: flex-end; 
          gap: 2rem; 
          z-index: 20;
        }

        .left-card-1 {
          width: 200px;
          position: relative;
        }
        
        .left-card-1 .card-image {
          height: 140px;
        }

        .left-card-2 {
          width: 180px;
          margin-left: 0; 
          /* MODIFIED: Remove background and shadow */
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        .left-card-2 .card-image {
          height: 120px;
          /* MODIFIED: Ensure border radius is on the image container */
          border-radius: 20px;
        }

        /* Bottom Right Section */

        .bottom-right-cards {
          position: absolute;
          bottom: 3rem; 
          right: 2rem;
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          z-index: 20;
        }

        .large-card {
          width: 200px;
        }
        
        /* MODIFIED: Increase font size for the large card */
        .large-card .card-title {
          font-size: 1.1rem;
          line-height: 1.2;
        }

        .large-card .card-image {
          height: 280px;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .small-card {
          width: 170px;
          position: relative;
        }

        /* MODIFIED: The Overflow "Bowl" Card */
        .small-card.overflow-card {
          overflow: visible; /* Allow image to break out */
        }
        
        .small-card.overflow-card .card-image {
           overflow: visible;
           height: 120px;
        }

        .small-card.overflow-card .card-image img {
          transform: scale(1.4) translate(15%, -10%); /* Push image partially out */
        }

        /* MODIFIED: Center Content Card */
        .small-card.center-text-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .small-card.center-text-card .card-title {
           font-size: 1rem; /* Increased font size */
        }

        .small-card .card-image {
          height: 120px;
        }

        /* Swipe Indicator */
        .swipe-indicator {
          position: absolute;
          bottom: 0.5rem; 
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #F8D78F;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          z-index: 30;
        }

        .swipe-indicator svg {
          animation: slide 1.5s ease-in-out infinite;
        }

        @keyframes slide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        /* Floating Animations */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .float-slow { animation: float-slow 6s ease-in-out infinite; }
        .float-medium { animation: float-medium 5s ease-in-out infinite; }
        .float-fast { animation: float-fast 4s ease-in-out infinite; }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .top-right-cards,
          .bottom-left-cards1,
          .bottom-right-cards,
          .swipe-indicator {
            display: none;
          }

          .bg-text {
            font-size: 12vw;
          }

          .center-content {
            width: 95%;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#fruit">OUR FRUIT</a></li>
          <li><a href="#stories">STORIES</a></li>
          <li><a href="#shop">SHOP</a></li>
        </ul>
      </nav>

      {/* Top Right Teaser Cards */}
      <div className="top-right-cards">
        <div className="teaser-card image-top float-medium">
          <div className="teaser-card-image">
            <img src="/fruits5.png" alt="Fresh Drops" />
          </div>
          <div className="teaser-card-title">FRESH DROPS<br/>EVERY WEEK</div>
        </div>
        
        <div className="teaser-card staggered-card float-slow">
          <div className="teaser-card-title">TASTE THE<br/>REVOLUTION</div>
          <div className="teaser-card-image">
            <img src="/fruits5.png" alt="Revolution" />
          </div>
        </div>
      </div>

      {/* Background Typography */}
      <div className="hero-wrapper">
        <div className="bg-text">BOLD BITES.</div>

        <div className="center-content">
          <img 
            src="/fruits1.png" 
            alt="Fresh Fruit Cluster" 
            className="fruit-image"
          />
          <button className="cta-button">SHOP THE HARVEST</button>
        </div>
      </div>

      {/* Bottom Left Cards */}
      <div className="bottom-left-cards1">
        <div className="product-card left-card-1 float-slow">
          <div className="card-title">FRESH DROPS<br/>EVERY WEEK</div>
          <div className="card-image">
            <img src="/fruits2.png" />
          </div>
        </div>
        
        {/* MODIFIED: Left Card 2 - No background, image only, has radius */}
        <div className="product-card left-card-2 float-medium">
          <div className="card-image">
            <img src="/fruits3.png" alt="Organic Apples" />
          </div>
        </div>
      </div>

      {/* Bottom Right Cards */}
      <div className="bottom-right-cards">
        {/* MODIFIED: Large Card - Increased font size in CSS */}
        <div className="product-card large-card float-slow">
          <div className="card-title">FRESH DROPS<br/>EVERY WEEK</div>
          <div className="card-image">
            <img src="/fruits5.png" />
          </div>
        </div>

        <div className="right-column">
          {/* MODIFIED: Small Card 1 (Bowl) - Added overflow-card class */}
          <div className="product-card small-card overflow-card float-fast">
            <div className="card-image">
              <img src="/fruits5.png" alt="Citrus" />
            </div>
          </div>
          
          {/* MODIFIED: Small Card 2 - Added center-text-card class */}
          <div className="product-card small-card center-text-card float-medium">
            <div className="card-title">TASTE THE<br/>REVOLUTION</div>
            <div className="card-image">
              <img src="/fruits4.png" alt="Revolution" />
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="swipe-indicator">
        <span>SWIPE NOW</span>
        <ChevronRight size={20} />
      </div>
    </div>
  );
}