import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Building, TreePine, Ruler, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const SoldLeasedPage = () => {
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const sold = saved.filter(p => p.isSoldLeased || p.status === 'sold' || p.status === 'leased');
    
    if (sold.length === 0) {
      setSoldProperties([
        { 
          title: "Land With 6BHK Independent House", 
          location: "Sathyapuri Street, West Mambalam", 
          sqft: "2475 Sq.ft", 
          price: "5,80,00,000", 
          type: "residential", 
          status: "sold",
          customerName: "Jagadeesan M",
          surveyNumber: "124/2A",
          extent: "2475 Sq.ft",
          represented: "Buyer"
        },
        { 
          title: "2BHK Flat", 
          location: "Vijaya Nagar North Extension, Velachery", 
          sqft: "800 Sq.ft", 
          price: "72,00,000", 
          type: "residential", 
          status: "sold",
          customerName: "Srinivasan V G, Rajesh S",
          surveyNumber: "88/1B",
          extent: "800 Sq.ft",
          represented: "Seller"
        },
        { 
          title: "2.5BHK Flat", 
          location: "2nd Main Road, Kasturibai Nagar, Adyar", 
          sqft: "1055 Sq.ft", 
          price: "1,25,00,000", 
          type: "residential", 
          status: "sold",
          customerName: "Ashok Kumar N, Ravi Kumar S, Kavitha A",
          represented: "Both Buyer & Seller"
        },
        { 
          title: "2BHK Flat", 
          location: "Murugu Nagar Extension, Velachery", 
          sqft: "1115 Sq.ft", 
          price: "95,00,000", 
          type: "residential", 
          status: "sold",
          customerName: "Joseph L A, Magesh R",
          represented: "Both Buyer & Seller"
        }
      ]);
    } else {
      setSoldProperties(sold);
    }
  }, []);

  const categories = [
    "Chennai Real Estate",
    "Coimbatore Real Estate",
    "Bangalore Real Estate",
    "Hyderabad Real Estate",
    "Pune Real Estate",
    "Mysuru Real Estate",
    "Vizag Real Estate"
  ];

  return (
    <div className="sold-leased-page" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Banner (Kept as requested) */}
      <section className="sold-hero" style={{ 
        height: '70vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096&auto=format&fit=crop) center/cover no-repeat',
            zIndex: 0
          }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>Success <span className="highlight">Stories.</span></h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>Reflecting our commitment to excellence.</h2>
          </motion.div>
        </div>
      </section>

      {/* Reference Structure Implementation */}
      <div className="container" style={{ padding: '3rem 1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar (Left Column) */}
        <aside style={{ flex: '1 1 280px', maxWidth: '300px' }}>
          <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ padding: '12px 15px', background: '#f8f8f8', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: 0, color: '#880000', fontSize: '1rem', fontWeight: 'bold' }}>Property Listing</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map((cat, i) => (
                <li key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <a href="#" style={{ display: 'block', padding: '10px 15px', color: '#880000', fontSize: '0.85rem', textDecoration: 'none', transition: 'background 0.2s' }}>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '15px', marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#880000', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #880000', paddingBottom: '5px' }}>
              SOLD/LEASED PROPERTIES
            </h4>
            {soldProperties.slice(0, 1).map((p, i) => (
              <div key={i} style={{ fontSize: '0.8rem', color: '#444', lineHeight: '1.4' }}>
                <p><strong>Sold Out! {p.sqft} {p.title} at {p.location} Sold For...</strong></p>
                <p style={{ color: '#880000', fontWeight: 'bold', marginTop: '5px' }}>{p.customerName}</p>
              </div>
            ))}
            <a href="#" style={{ display: 'block', marginTop: '10px', fontSize: '0.75rem', color: '#880000', fontWeight: 'bold' }}>View All Sold/Leased Deals</a>
          </div>

          {/* Sidebar Images (Ads style from reference) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=300" alt="Ad 1" style={{ width: '100%', display: 'block' }} />
             </div>
             <div style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=300" alt="Ad 2" style={{ width: '100%', display: 'block' }} />
             </div>
          </div>
        </aside>

        {/* Main Content (Right Column) */}
        <main style={{ flex: '3 1 500px' }}>
          <div style={{ borderBottom: '2px solid #880000', paddingBottom: '10px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 className="serif" style={{ margin: 0, fontSize: '2rem', color: '#880000' }}>Sold Leased</h2>
          </div>

          <h4 style={{ color: '#880000', fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>Our recent deals</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {soldProperties.map((prop, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ 
                  background: '#FFFFE0', // Light yellow/cream from reference
                  border: '1px solid #ccc',
                  borderRadius: '12px 12px 12px 12px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#333' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 500 }}>
                    {prop.status === 'sold' ? 'Sold Out!' : 'Leased Out!'}
                  </p>
                  <p style={{ margin: '0 0 5px 0' }}>
                    {prop.sqft} {prop.title} at
                  </p>
                  <p style={{ margin: '0 0 5px 0' }}>{prop.location}</p>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                    Sold For Rs.{prop.price}/-
                  </p>
                  <p style={{ margin: '0 0 15px 0', color: '#555' }}>
                    RSV Groups Realty Represented {prop.represented || 'Client'}
                  </p>
                  
                  <p style={{ margin: 0, color: '#880000', fontWeight: 'bold', fontSize: '1rem' }}>
                     {prop.customerName}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default SoldLeasedPage;
