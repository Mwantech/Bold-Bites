import { useEffect, useRef, useState } from 'react';

export default function ImmersiveStorySection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const start = 0;
      const end = elementHeight - windowHeight;
      const current = window.scrollY - sectionRef.current.offsetTop;
      
      let p = current / end;
      p = Math.min(Math.max(p, 0), 1);
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalProgress = (start, end) => {
    return Math.min(Math.max((progress - start) / (end - start), 0), 1) * 100;
  };

  const getExitStyle = (start, end) => {
    const p = Math.min(Math.max((progress - start) / (end - start), 0), 1);
    return {
      opacity: 1 - p,
      transform: `translateY(-${p * 50}px)`,
      filter: `blur(${p * 5}px)`
    };
  };

  
  

  const headHighlight = getLocalProgress(0.0, 0.20);
  const headExit = getExitStyle(0.20, 0.30);

  const p1Highlight = getLocalProgress(0.30, 0.55);
  const p1Exit = getExitStyle(0.55, 0.65);

  const p2Highlight = getLocalProgress(0.65, 0.90);
  const p2Exit = getExitStyle(0.90, 1.0);

  const imageMove = Math.min(Math.max((progress - 0.2) / 0.8, 0), 1);

  return (
    <section ref={sectionRef} className="scrolly-container">
      <style>{`
        .scrolly-container {
          height: 120vh;
          background-color: #72891B;
          position: relative;
          z-index: 10;
        }

        .sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1200px;
          width: 90%;
          gap: 4rem;
          align-items: center;
        }

        .text-column {
          display: flex;
          flex-direction: column;
          /* CHANGED: Tighter gap to keep text centered longer */
          gap: 2rem; 
          position: relative;
          z-index: 2;
        }

        .highlighter-text {
          position: relative;
          display: inline;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: rgba(248, 215, 143, 0.3);
          background-clip: text;
          -webkit-background-clip: text;
          transition: opacity 0.2s; 
          background-image: linear-gradient(to right, #72891B var(--p), #F8D78F var(--p));
          -webkit-text-fill-color: transparent;
        }

        .highlighter-bg {
          position: absolute;
          top: -5px;
          left: -5px;
          bottom: -5px;
          right: -5px;
          background: linear-gradient(to right, #F8D78F var(--p), transparent var(--p));
          z-index: -1;
          border-radius: 4px;
        }

        .headline {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          position: relative;
        }

        .paragraph {
          font-size: 1.25rem;
          line-height: 1.8;
          font-weight: 500;
          position: relative;
          display: inline;
        }

        .image-column {
          position: relative;
          height: 600px;
          perspective: 1000px;
        }

        .img-card {
          position: absolute;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          transition: transform 0.1s linear;
        }

        .main-img {
          width: 80%;
          height: 80%;
          top: 0;
          right: 0;
          z-index: 1;
        }

        .accent-img {
          width: 50%;
          height: 50%;
          bottom: 0;
          left: 0;
          z-index: 2;
          border: 4px solid #72891B;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: left;
          }

          .text-column {
            order: 1;
            padding-top: 2rem;
          }

          .image-column {
            order: 2;
            height: 300px;
            width: 100%;
          }

          .headline {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="sticky-viewport">
        <div className="content-grid">
          
          {/* LEFT: SCROLL DRIVEN TEXT */}
          <div className="text-column">
            
            {/* 1. HEADLINE */}
            <div style={headExit}>
              <h2 className="headline">
                <span className="highlighter-text" style={{ '--p': `${headHighlight}%` }}>
                  ROOTED IN REAL FLAVOR.
                </span>
                <div className="highlighter-bg" style={{ '--p': `${headHighlight}%` }}></div>
              </h2>
            </div>

            {/* 2. PARAGRAPH 1 */}
            <div style={p1Exit}>
              <p className="paragraph">
                <span className="highlighter-text" style={{ '--p': `${p1Highlight}%` }}>
                  We don't just sell fruit; we curate experiences. Our journey starts in the orchards where sunlight meets soil, ensuring every bite is as good for the earth as it is for you.
                </span>
                <div className="highlighter-bg" style={{ '--p': `${p1Highlight}%` }}></div>
              </p>
            </div>

            {/* 3. PARAGRAPH 2 */}
            <div style={p2Exit}>
              <p className="paragraph">
                <span className="highlighter-text" style={{ '--p': `${p2Highlight}%` }}>
                  No warehouses for months. No artificial ripening. Just the raw, unadulterated taste of nature, delivered from the branch to your bowl in 24 hours.
                </span>
                <div className="highlighter-bg" style={{ '--p': `${p2Highlight}%` }}></div>
              </p>
            </div>

          </div>

          {/* RIGHT: SCROLL DRIVEN IMAGERY */}
          <div className="image-column">
            {/* Main Image */}
            <div 
              className="img-card main-img"
              style={{
                transform: `translateX(${100 - (imageMove * 200)}px) scale(${1 + (imageMove * 0.1)})`,
                opacity: Math.min(progress * 4, 1) 
              }}
            >
              <img src="/fruits5.png" alt="Orchard" style={{filter: 'sepia(0.2)'}} />
            </div>

            {/* Accent Image */}
            <div 
              className="img-card accent-img"
              style={{
                transform: `translateX(${200 - (imageMove * 400)}px)`,
                opacity: Math.min(Math.max((progress - 0.1) * 3, 0), 1) 
              }}
            >
              <img src="/fruits3.png" alt="Close up" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}