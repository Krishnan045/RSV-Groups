import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Building, TreePine, Ruler, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import SoldSidebarBox from '../components/SoldSidebarBox';

const API_BASE = import.meta.env.VITE_API_URL || 
                (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://rsv-groups.onrender.com');

const SoldLeasedPage = () => {
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from sold_properties table (Success Stories)
        const soldRes = await fetch(`${API_BASE}/api/sold`);
        const soldData = await soldRes.json();
        const approved = soldData.map(p => ({
          ...p,
          customerName: p.customer_name || 'Private Client'
        }));

        // Fetch from plots table (Inventory marked as sold)
        const plotsRes = await fetch(`${API_BASE}/api/plots`);
        const plotsData = await plotsRes.json();
        const soldPlots = plotsData.filter(p => p.status && p.status.toLowerCase() === 'sold').map(p => ({
          id: p.id,
          title: p.name,
          location: p.location,
          sqft: p.size,
          price: p.price,
          type: 'land',
          status: 'approved',
          customerName: p.customer_name || 'Private Client',
          represented: 'Both Buyer & Sellers'
        }));

        // Combine both
        setSoldProperties([...soldPlots, ...approved]);
      } catch (err) {
        console.error("Error fetching sold properties:", err);
        // Fallback to localStorage if server fails (optional, but good for transition)
        const savedSold = JSON.parse(localStorage.getItem('rsv_sold_properties') || '[]');
        const approvedLocal = savedSold.filter(p => p.status === 'approved');
        const savedPlots = JSON.parse(localStorage.getItem('user_properties') || '[]');
        const soldPlotsLocal = savedPlots.filter(p => p.status === 'sold').map(p => ({
          id: p.id,
          title: p.title,
          location: p.location,
          sqft: p.size,
          price: p.price,
          type: p.type,
          status: 'approved',
          customerName: p.customerName || 'Private Client',
          represented: 'Both Buyer & Sellers'
        }));
        setSoldProperties([...soldPlotsLocal, ...approvedLocal]);
      }
    };

    fetchData();
  }, []);

  const categories = [
    "OMR Real Estate",
    "ECR Real Estate",
    "Tambaram Real Estate",
    "Guindy Real Estate",
    "Velachery Real Estate",
    "Adyar Real Estate",
    "Anna Nagar Real Estate"
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
          <div style={{ background: 'var(--primary-dark)', border: '1px solid var(--accent-gold)', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ margin: 0, color: 'var(--accent-gold)', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Property Listing</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map((cat, i) => (
                <li key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <a href="#" style={{ display: 'block', padding: '12px 15px', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.3s' }}>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <SoldSidebarBox />

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
          <div style={{ borderBottom: '2px solid var(--accent-gold)', paddingBottom: '10px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 className="serif" style={{ margin: 0, fontSize: '2rem', color: 'var(--primary-dark)' }}>Sold Leased</h2>
          </div>

          <h4 style={{ color: 'var(--primary-dark)', fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>Our recent deals</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {soldProperties.map((prop, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ 
                  background: 'white', 
                  border: '1px solid var(--admin-border)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#333' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Sold Out!
                  </p>
                  <p style={{ margin: '0 0 5px 0' }}>
                    {prop.sqft} {prop.title} at
                  </p>
                  <p style={{ margin: '0 0 5px 0', color: 'var(--text-light)' }}>{prop.location}</p>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                    Value: {prop.price}
                  </p>
                  <p style={{ margin: '0 0 15px 0', color: '#777', fontSize: '0.8rem' }}>
                    RSV Groups Realty Represented {prop.represented || 'Client'}
                  </p>
                  
                  <p style={{ margin: 0, color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '1rem' }}>
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
