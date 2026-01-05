import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Filter, ArrowRight, Heart } from 'lucide-react';

export default function ShopAndStoriesScroll() {
  const [activeCategory, setActiveCategory] = useState('All');
  const storiesRef = useRef(null);
  const shopRef = useRef(null);
  const [storyCards, setStoryCards] = useState([]);
  const [productElements, setProductElements] = useState([]);
  const [sectionProgress, setSectionProgress] = useState({ stories: 0, shop: 0 });

  useEffect(() => {
    const handleScroll = () => {
      // Stories section progress
      if (storiesRef.current) {
        const rect = storiesRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = storiesRef.current.offsetHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)));
        
        // Individual story cards
        const cards = storiesRef.current.querySelectorAll('.story-card');
        const cardStates = Array.from(cards).map(card => {
          const cardRect = card.getBoundingClientRect();
          const cardTop = cardRect.top;
          const cardHeight = cardRect.height;
          const viewportCenter = windowHeight / 2;
          
          // Progress when card is in viewport
          const enterProgress = Math.max(0, Math.min(1, (windowHeight - cardTop) / windowHeight));
          const centerDistance = Math.abs((cardTop + cardHeight / 2) - viewportCenter);
          const centerProximity = Math.max(0, 1 - centerDistance / windowHeight);
          
          return { enterProgress, centerProximity };
        });
        
        setStoryCards(cardStates);
        setSectionProgress(prev => ({ ...prev, stories: progress }));
      }

      // Shop section progress
      if (shopRef.current) {
        const rect = shopRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        
        // Individual product cards
        const products = shopRef.current.querySelectorAll('.product-card');
        const productStates = Array.from(products).map((product, index) => {
          const productRect = product.getBoundingClientRect();
          const productTop = productRect.top;
          
          // Staircase effect: each product enters based on its position
          const baseDelay = index * 0.1;
          const scrollTrigger = windowHeight * 0.8;
          const enterProgress = Math.max(0, Math.min(1, (scrollTrigger - productTop) / 400));
          
          return { enterProgress };
        });
        
        setProductElements(productStates);
        setSectionProgress(prev => ({ ...prev, shop: progress }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  const stories = [
    {
      id: 1,
      title: "The Perfect Morning Ritual",
      subtitle: "START FRESH",
      image: "/fruits2.png",
      color: "#CB2602"
    },
    {
      id: 2,
      title: "Sourcing the Sweetest Citrus",
      subtitle: "FARM TO TABLE",
      image: "/fruits5.png",
      color: "#72891B"
    },
    {
      id: 3,
      title: "Why We Don't Wax Apples",
      subtitle: "RAW TRUTH",
      image: "/fruits3.png",
      color: "#3E2723"
    }
  ];

  const allProducts = [
    { id: 1, name: "Ruby Red Apples", price: "$4.50", category: "Apples", img: "/fruits3.png" },
    { id: 2, name: "Sunset Citrus", price: "$6.00", category: "Citrus", img: "/fruits5.png" },
    { id: 3, name: "Golden Bananas", price: "$3.20", category: "Tropical", img: "/fruits4.png" },
    { id: 4, name: "Wild Berries", price: "$8.90", category: "Berries", img: "/fruits2.png" },
    { id: 5, name: "Avocado Hass", price: "$5.50", category: "Tropical", img: "/fruits1.png" },
    { id: 6, name: "Honey Crisp", price: "$4.80", category: "Apples", img: "/fruits3.png" },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="shop-stories-wrapper">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .shop-stories-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
          background: #F8D78F;
        }

        /* STORIES SECTION */
        .stories-section {
          background: linear-gradient(180deg, #F8D78F 0%, #F0E3C8 100%);
          padding: 8rem 2rem;
          position: relative;
          min-height: 180vh;
        }

        .section-header {
          text-align: center;
          margin-bottom: 6rem;
          opacity: ${Math.min(1, sectionProgress.stories * 4)};
          transform: translateY(${Math.max(0, 40 - sectionProgress.stories * 60)}px);
          transition: opacity 0.5s, transform 0.5s;
        }

        .section-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 900;
          color: #72891B;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          padding-bottom: 1rem;
        }

        .title-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: ${sectionProgress.stories * 100}%;
          height: 8px;
          background: #CB2602;
          border-radius: 4px;
          transition: width 0.3s ease-out;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
          opacity: ${sectionProgress.stories > 0.85 ? Math.max(0, 1 - (sectionProgress.stories - 0.85) * 6.67) : 1};
          transform: translateY(${sectionProgress.stories > 0.85 ? (sectionProgress.stories - 0.85) * 200 : 0}px);
          transition: opacity 0.4s, transform 0.4s;
        }

        .story-card {
          position: relative;
          height: 520px;
          border-radius: 28px;
          overflow: hidden;
          cursor: pointer;
          background: #fff;
          box-shadow: 0 25px 70px rgba(0,0,0,0.15);
        }

        .story-image-container {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
        }

        .story-img {
          width: 90%;
          transition: transform 0.3s ease-out;
          will-change: transform;
        }

        .story-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 3rem 2.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
          transition: all 0.5s ease-out;
        }

        .story-text-block {
          position: relative;
          margin-bottom: 1rem;
        }

        .story-subtitle {
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          padding: 0.4rem 0.8rem;
          z-index: 2;
          transition: color 0.3s;
        }

        .subtitle-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 4px;
          z-index: 1;
          transform-origin: left center;
          transition: width 0.2s ease-out;
        }

        .story-title {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.15;
          position: relative;
          display: inline;
          padding: 0.3rem 0.8rem;
          z-index: 2;
          color: #F8D78F;
          transition: color 0.3s;
        }

        .title-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #F8D78F;
          border-radius: 6px;
          z-index: 1;
          transform-origin: left center;
          transition: width 0.2s ease-out;
        }

        .story-cta {
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #F8D78F;
          transition: gap 0.3s;
        }

        .story-card:hover .story-cta {
          gap: 1.2rem;
        }

        /* SHOP SECTION */
        .shop-section {
          background: linear-gradient(180deg, #72891B 0%, #5d7316 100%);
          min-height: 150vh;
          padding: 6rem 2rem;
          position: relative;
        }

        .shop-container {
          max-width: 1500px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 5rem;
          align-items: start;
        }

        .sidebar {
          background: #F8D78F;
          border-radius: 28px;
          padding: 3rem;
          height: fit-content;
          position: sticky;
          top: 2rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          opacity: ${Math.min(1, sectionProgress.shop * 3)};
          transform: translateX(${Math.max(-80, -80 + sectionProgress.shop * 80)}px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .filter-group {
          margin-bottom: 3rem;
        }

        .filter-title {
          font-size: 1rem;
          font-weight: 900;
          color: #CB2602;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .filter-item {
          margin-bottom: 1rem;
          transition: transform 0.3s;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          color: #3E2723;
          font-weight: 700;
          font-size: 1.05rem;
          transition: all 0.3s;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          position: relative;
        }

        .filter-label:hover {
          background: rgba(203, 38, 2, 0.08);
          transform: translateX(4px);
        }

        .custom-radio {
          width: 22px;
          height: 22px;
          border: 3px solid #3E2723;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .custom-radio.active {
          background: #CB2602;
          border-color: #CB2602;
          animation: radioSelect 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes radioSelect {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .custom-radio.active::after {
          content: '';
          width: 10px;
          height: 10px;
          background: #F8D78F;
          border-radius: 50%;
          animation: dotPop 0.4s ease;
        }

        @keyframes dotPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .radio-input {
          display: none;
        }

        .main-content {
          opacity: ${Math.min(1, sectionProgress.shop * 2.5)};
          transition: opacity 0.6s;
        }

        .shop-header {
          color: #F8D78F;
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 4rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          position: relative;
          display: inline-block;
          padding-bottom: 0.75rem;
        }

        .shop-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: ${sectionProgress.shop * 100}%;
          height: 6px;
          background: #CB2602;
          border-radius: 3px;
          transition: width 0.3s ease-out;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 3rem;
        }

        .product-card {
          background: #F5EAD4;
          border-radius: 28px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 3px solid transparent;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .product-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
          border-color: #CB2602;
        }

        .product-image-area {
          background: #fff;
          border-radius: 22px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        }

        .product-img {
          width: 80%;
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .product-card:hover .product-img {
          transform: scale(1.3) rotate(12deg);
        }

        .wishlist-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255,255,255,0.95);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          color: #CB2602;
          opacity: 0;
          transform: scale(0.7) translateY(-10px);
          transition: all 0.4s;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .product-card:hover .wishlist-btn {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .wishlist-btn:hover {
          background: #CB2602;
          color: #fff;
          transform: scale(1.2) rotate(15deg);
        }

        .product-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: auto;
        }

        .product-details {
          flex: 1;
        }

        .product-category {
          font-size: 0.8rem;
          color: #72891B;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.6rem;
        }

        .product-details h3 {
          font-size: 1.25rem;
          color: #3E2723;
          font-weight: 900;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .product-price {
          font-size: 1.5rem;
          color: #CB2602;
          font-weight: 900;
          margin-top: 0.5rem;
        }

        .add-btn {
          background: #CB2602;
          color: #F8D78F;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s;
          box-shadow: 0 6px 20px rgba(203, 38, 2, 0.4);
          flex-shrink: 0;
        }

        .add-btn:hover {
          background: #3E2723;
          transform: scale(1.2) rotate(20deg);
          box-shadow: 0 10px 30px rgba(62, 39, 35, 0.5);
        }

        .range-input {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #E5D5B5 0%, #D5C5A5 100%);
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #CB2602;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(203, 38, 2, 0.4);
        }

        .range-input::-webkit-slider-thumb:hover {
          transform: scale(1.4);
          box-shadow: 0 4px 16px rgba(203, 38, 2, 0.6);
        }

        .availability-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          transition: background 0.3s;
          cursor: pointer;
        }

        .availability-indicator:hover {
          background: rgba(203, 38, 2, 0.08);
        }

        .availability-dot {
          width: 12px;
          height: 12px;
          background: #CB2602;
          border-radius: 50%;
          animation: pulse 2s infinite;
          box-shadow: 0 0 10px rgba(203, 38, 2, 0.6);
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.5; 
            transform: scale(1.3); 
          }
        }

        @media (max-width: 1100px) {
          .shop-container {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            position: relative;
            top: 0;
            transform: translateX(0);
          }

          .stories-grid {
            grid-template-columns: 1fr;
          }

          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }
      `}</style>

      {/* STORIES SECTION */}
      <section ref={storiesRef} className="stories-section">
        <div className="section-header">
          <h2 className="section-title">
            Field Notes
            <div className="title-underline" />
          </h2>
        </div>
        
        <div className="stories-grid">
          {stories.map((story, index) => {
            const cardState = storyCards[index] || { enterProgress: 0, centerProximity: 0 };
            const highlightProgress = cardState.centerProximity;
            const imageScale = 0.88 + (cardState.centerProximity * 0.12);
            const imageRotate = -8 + (cardState.centerProximity * 16);
            const overlayOpacity = 0.5 + (cardState.enterProgress * 0.5);
            
            return (
              <div 
                key={story.id} 
                className="story-card"
                style={{
                  opacity: cardState.enterProgress,
                  transform: `translateY(${(1 - cardState.enterProgress) * 60}px) scale(${0.95 + cardState.enterProgress * 0.05})`
                }}
              >
                <div className="story-image-container">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="story-img"
                    style={{
                      transform: `scale(${imageScale}) rotate(${imageRotate}deg)`
                    }}
                  />
                </div>
                
                <div 
                  className="story-overlay"
                  style={{
                    opacity: overlayOpacity
                  }}
                >
                  <div className="story-text-block">
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem' }}>
                      <span 
                        className="subtitle-bg"
                        style={{
                          width: `${highlightProgress * 100}%`,
                          background: story.color
                        }}
                      />
                      <span 
                        className="story-subtitle"
                        style={{
                          color: highlightProgress > 0.5 ? '#F8D78F' : story.color
                        }}
                      >
                        {story.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  <div className="story-text-block">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <span 
                        className="title-bg"
                        style={{
                          width: `${highlightProgress * 100}%`
                        }}
                      />
                      <h3 
                        className="story-title"
                        style={{
                          color: highlightProgress > 0.5 ? '#3E2723' : '#F8D78F'
                        }}
                      >
                        {story.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="story-cta">
                    READ MORE <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SHOP SECTION */}
      <section ref={shopRef} className="shop-section">
        <div className="shop-container">
          <aside className="sidebar">
            <div className="filter-group">
              <div className="filter-title">
                Categories <Filter size={20}/>
              </div>
              <ul className="filter-list">
                {['All', 'Apples', 'Citrus', 'Berries', 'Tropical'].map(cat => (
                  <li key={cat} className="filter-item">
                    <label className="filter-label">
                      <input 
                        type="radio" 
                        name="category" 
                        className="radio-input" 
                        checked={activeCategory === cat}
                        onChange={() => setActiveCategory(cat)}
                      />
                      <span className={`custom-radio ${activeCategory === cat ? 'active' : ''}`} />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group">
              <div className="filter-title">Sweetness</div>
              <input type="range" min="1" max="10" defaultValue="5" className="range-input" />
            </div>

            <div className="filter-group">
              <div className="filter-title">Availability</div>
              <div className="availability-indicator">
                <div className="availability-dot" />
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#3E2723' }}>In Stock Only</span>
              </div>
            </div>
          </aside>

          <div className="main-content">
            <h2 className="shop-header">
              FRESH HARVEST
              <div className="shop-underline" />
            </h2>
            
            <div className="product-grid">
              {filteredProducts.map((product, index) => {
                const productState = productElements[index] || { enterProgress: 0 };
                const translateX = (1 - productState.enterProgress) * 100;
                const scale = 0.85 + (productState.enterProgress * 0.15);
                
                return (
                  <div 
                    key={product.id} 
                    className="product-card"
                    style={{
                      opacity: productState.enterProgress,
                      transform: `translateX(${translateX}px) scale(${scale})`
                    }}
                  >
                    <div className="product-image-area">
                      <button className="wishlist-btn"><Heart size={20}/></button>
                      <img src={product.img} alt={product.name} className="product-img" />
                    </div>
                    
                    <div className="product-info">
                      <div className="product-details">
                        <div 
                          className="product-category"
                          style={{
                            opacity: productState.enterProgress,
                            transform: `translateY(${(1 - productState.enterProgress) * 10}px)`
                          }}
                        >
                          {product.category}
                        </div>
                        <h3
                          style={{
                            opacity: productState.enterProgress,
                            transform: `translateY(${(1 - productState.enterProgress) * 10}px)`,
                            transition: 'opacity 0.5s 0.1s, transform 0.5s 0.1s'
                          }}
                        >
                          {product.name}
                        </h3>
                        <div 
                          className="product-price"
                          style={{
                            opacity: productState.enterProgress,
                            transform: `translateY(${(1 - productState.enterProgress) * 10}px)`,
                            transition: 'opacity 0.5s 0.2s, transform 0.5s 0.2s'
                          }}
                        >
                          {product.price}
                        </div>
                      </div>
                      <button className="add-btn">
                        <ShoppingBag size={22} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}