import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

const SoldShowcase = () => {
  const [soldItems, setSoldItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedSold = JSON.parse(localStorage.getItem('rsv_sold_properties') || '[]');
    const approved = savedSold.filter(p => p.status === 'approved');
    
    const savedPlots = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const soldPlots = savedPlots.filter(p => p.status === 'sold').map(p => ({
      id: p.id,
      title: p.title,
      location: p.location,
      sqft: p.size,
      price: p.price,
      customerName: p.customerName || 'Private Client',
      status: 'approved'
    }));

    const combined = [...soldPlots, ...approved];
    if (combined.length > 0) {
      setSoldItems(combined);
    } else {
      // Fallback
      setSoldItems([
        { id: 's1', title: "Land in Kundrathur", location: "rajagopal nagar", sqft: "2400 sqft", price: "Market Rate", customerName: "Multiple Clients" },
        { id: 's2', title: "House in Alapakkam", location: "sri Krishna nagar", sqft: "4800 sqft", price: "4cr", customerName: "Private Client" },
        { id: 's3', title: "Flat in Astalakshmi Nagar", location: "Astalakshmi Nagar", sqft: "1275 sqft", price: "75L", customerName: "Private Client" },
        { id: 's4', title: "Land in Porur", location: "santhoush nagar", sqft: "2400 sqft", price: "Market Rate", customerName: "Private Client" }
      ]);
    }
  }, []);

  useEffect(() => {
    if (soldItems.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % soldItems.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [soldItems.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % soldItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + soldItems.length) % soldItems.length);

  if (soldItems.length === 0) return null;

  return (
    <section className="sold-showcase" style={{ padding: '6rem 0', background: '#0f1a11', overflow: 'hidden', position: 'relative' }}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div className="head-left">
            <div className="head-bar" style={{ background: 'var(--accent-gold)' }}></div>
            <p className="head-sub" style={{ color: 'var(--accent-gold)', letterSpacing: '3px' }}>RECENTLY CONCLUDED</p>
            <h2 className="section-title serif" style={{ color: 'white' }}>Success <span className="highlight">Stories</span></h2>
          </div>
          <div className="slider-controls" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="/sold-leased" className="view-all-btn" style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', border: '1px solid var(--accent-gold)', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', letterSpacing: '1px' }}>
              VIEW ALL STORIES
            </a>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={prevSlide} className="slider-btn"><ChevronLeft size={20}/></button>
              <button onClick={nextSlide} className="slider-btn"><ChevronRight size={20}/></button>
            </div>
          </div>
        </div>

        <div className="showcase-slider-wrapper" style={{ position: 'relative', height: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="sold-card-box"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '3rem',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '3rem',
                alignItems: 'center',
                height: '100%',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="sold-card-left">
                 <div className="sold-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent-gold)', color: 'black', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '2rem' }}>
                   <CheckCircle size={14}/> SOLD OUT
                 </div>
                 <h3 className="serif" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>{soldItems[currentIndex].title}</h3>
                 <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
                   <MapPin size={18} color="var(--accent-gold)"/> {soldItems[currentIndex].location}
                 </p>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Area / Size</span>
                      <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: 600 }}>{soldItems[currentIndex].sqft}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Deal Value</span>
                      <span style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{soldItems[currentIndex].price}</span>
                    </div>
                 </div>
              </div>

              <div className="sold-card-right" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '2rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)' }}>
                 <TrendingUp size={40} color="var(--accent-gold)" style={{ marginBottom: '1.5rem', opacity: 0.8 }}/>
                 <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1rem' }}>Buyer Details</h4>
                 <p className="serif" style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>{soldItems[currentIndex].customerName || 'Confidential Client'}</p>
                 <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Represented by RSV Groups Realty</p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="slider-dots" style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
            {soldItems.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                style={{ 
                  width: i === currentIndex ? '30px' : '8px', 
                  height: '8px', 
                  borderRadius: '10px', 
                  background: i === currentIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                  transition: '0.3s',
                  cursor: 'pointer'
                }} 
              />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .slider-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
        }
        .slider-btn:hover {
          background: var(--accent-gold);
          border-color: var(--accent-gold);
          color: black;
        }
        @media (max-width: 768px) {
          .sold-card-box {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
            gap: 2rem !important;
            height: auto !important;
          }
          .sold-card-box h3 { font-size: 1.8rem !important; }
        }
      `}} />
    </section>
  );
};

export default SoldShowcase;
