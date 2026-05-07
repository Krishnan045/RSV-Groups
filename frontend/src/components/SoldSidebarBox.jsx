import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const SoldSidebarBox = () => {
  const [soldProperties, setSoldProperties] = useState([]);
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
      customerName: p.customerName || 'Private Client',
      status: 'approved'
    }));

    setSoldProperties([...soldPlots, ...approved]);
  }, []);

  useEffect(() => {
    if (soldProperties.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % soldProperties.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [soldProperties.length]);

  if (soldProperties.length === 0) return null;

  const current = soldProperties[currentIndex];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', 
      border: '1px solid var(--accent-gold)', 
      borderRadius: '8px', 
      padding: '20px', 
      color: 'white',
      minHeight: '200px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Decorative Gold Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-gold)' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
         <TrendingUp size={16} color="var(--accent-gold)" />
         <h4 style={{ 
           margin: 0, 
           color: 'var(--accent-gold)', 
           fontSize: '0.8rem', 
           fontWeight: '800', 
           textTransform: 'uppercase', 
           letterSpacing: '2px'
         }}>
           RECENT SUCCESS
         </h4>
      </div>
      
      <div style={{ position: 'relative', flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}
          >
            <p style={{ margin: '0 0 10px 0' }}>
               <span style={{ color: 'white', fontWeight: '700', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>Sold Out!</span>
               {current.sqft} {current.title}
            </p>
            <p style={{ margin: '0', fontSize: '0.8rem', opacity: 0.7 }}>{current.location}</p>
            <p style={{ color: 'var(--accent-gold)', fontWeight: 'bold', marginTop: '12px', fontSize: '1rem' }}>{current.customerName}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <a href="/sold-leased" style={{ 
           fontSize: '0.7rem', 
           color: 'white', 
           fontWeight: 'bold', 
           textDecoration: 'none', 
           textTransform: 'uppercase',
           letterSpacing: '1px',
           borderBottom: '1px solid var(--accent-gold)',
           paddingBottom: '2px'
         }}>
           View All Deals
         </a>
         <div style={{ display: 'flex', gap: '4px' }}>
            {soldProperties.slice(0, 5).map((_, i) => (
               <div key={i} style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  background: i === currentIndex % 5 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                  transition: '0.3s'
               }}></div>
            ))}
         </div>
      </div>

      {/* Progress Bar Animation */}
      <motion.div 
         key={`progress-${currentIndex}`}
         initial={{ width: 0 }}
         animate={{ width: '100%' }}
         transition={{ duration: 5, ease: "linear" }}
         style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: 'var(--accent-gold)', opacity: 0.5 }}
      />
    </div>
  );
};

export default SoldSidebarBox;
