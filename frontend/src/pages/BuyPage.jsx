import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Home, Building, TreePine, Filter, Search, Ruler } from 'lucide-react';

const BuyPage = ({ category = 'all' }) => {
  const [filterState, setFilterState] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: category === 'all' ? '' : category,
    location: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: category === 'all' ? '' : category,
    location: ''
  });

  useEffect(() => {
    setFilterState(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
    setAppliedFilters(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
  }, [category]);

  const [openContactIdx, setOpenContactIdx] = useState(null);

  const [userProps, setUserProps] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
    setUserProps(saved);

    const searchQuery = localStorage.getItem('home_search_filters');
    if (searchQuery) {
      const parsed = JSON.parse(searchQuery);
      const mappedFilters = {};
      
      if (parsed.location) mappedFilters.location = parsed.location;
      if (parsed.price === '25-50') { mappedFilters.minPrice = '2500000'; mappedFilters.maxPrice = '5000000'; }
      if (parsed.price === '50-100') { mappedFilters.minPrice = '5000000'; mappedFilters.maxPrice = '10000000'; }
      if (parsed.price === '100-plus') { mappedFilters.minPrice = '10000000'; mappedFilters.maxPrice = '500000000'; }

      setFilterState(prev => ({ ...prev, ...mappedFilters }));
      setAppliedFilters(prev => ({ ...prev, ...mappedFilters }));
      localStorage.removeItem('home_search_filters');
    }
  }, []);

  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
    setAllProperties(saved);
  }, []);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const lower = String(priceStr).toLowerCase();
    let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
    if (lower.includes('cr')) return num * 10000000;
    if (lower.includes('l')) return num * 100000;
    return num;
  };

  const filtered = allProperties.filter(p => {
    // Show only 'buy' category (including land/plots) and 'available' status, excluding 'sold'
    if (p.category !== 'buy' && p.type !== 'land' && p.type !== 'plot') return false;
    if (p.status !== 'available') return false;
    if (p.isSoldLeased) return false;
    
    if (appliedFilters.propertyType && p.type !== appliedFilters.propertyType) return false;
    if (appliedFilters.location && !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
    
    const pValue = parsePrice(p.price);
    if (appliedFilters.minPrice && pValue < parseInt(appliedFilters.minPrice)) return false;
    if (appliedFilters.maxPrice && pValue > parseInt(appliedFilters.maxPrice)) return false;
    
    return true;
  });

  const getIcon = (type) => {
    if (type === 'residential') return <Home size={18} />;
    if (type === 'commercial') return <Building size={18} />;
    return <TreePine size={18} />;
  };

  return (
    <div className="page-container" style={{ background: 'var(--primary-bg)' }}>
      <section className="buy-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        marginTop: '-100px',
        paddingTop: '100px',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop) center/cover no-repeat',
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
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>Discover <span className="highlight">Properties.</span></h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>Find your next investment.</h2>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 2rem' }}>

        <div className="buy-filter-bar">
          
          {/* Min Price */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Min Price</label>
            <select 
              value={filterState.minPrice} 
              onChange={e => setFilterState({...filterState, minPrice: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">--Select--</option>
              <option value="5000000">50 Lacs</option>
              <option value="10000000">1 Crore</option>
              <option value="20000000">2 Crores</option>
              <option value="50000000">5 Crores</option>
              <option value="100000000">10 Crores</option>
            </select>
          </div>

          {/* Max Price */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Max Price</label>
            <select 
               value={filterState.maxPrice} 
               onChange={e => setFilterState({...filterState, maxPrice: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">--Select--</option>
              <option value="5000000">50 Lacs</option>
              <option value="10000000">1 Crore</option>
              <option value="50000000">5 Crores</option>
              <option value="100000000">10 Crores</option>
              <option value="500000000">50 Crores+</option>
            </select>
          </div>

          {/* Property Type */}
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Property Type</label>
            <select 
               value={filterState.propertyType} 
               onChange={e => setFilterState({...filterState, propertyType: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">-- Choose Property Type --</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land / Plot</option>
            </select>
          </div>

          {/* Location */}
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Location</label>
            <select 
               value={filterState.location} 
               onChange={e => setFilterState({...filterState, location: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">-- Choose Property Area --</option>
              <option value="omr">OMR</option>
              <option value="ecr">ECR</option>
              <option value="guindy">Guindy</option>
              <option value="tambaram">Tambaram</option>
              <option value="chengalpattu">Chengalpattu</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button 
              onClick={() => setAppliedFilters(filterState)}
              style={{ background: '#F58220', color: 'white', fontWeight: 700, padding: '10px 24px', border: 'none', cursor: 'pointer', height: '39px', display: 'flex', alignItems: 'center' }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="projects-grid" style={{ minHeight: '50vh' }}>
          {filtered.length > 0 ? filtered.map((prop, idx) => (
            <motion.div 
              key={idx}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover="hover" // Triggers hover variants on children
              style={{ overflow: 'hidden', borderRadius: '12px' }}
            >
              <div className="card-image" style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                <motion.img 
                  src={prop.img} 
                  alt={prop.title} 
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  variants={{
                    hover: { scale: 1.15 }
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                {/* Contact Overlay */}
                {openContactIdx === idx && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(21, 58, 33, 0.92)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    color: '#fff', zIndex: 10, padding: '2rem', textAlign: 'center',
                    backdropFilter: 'blur(3px)'
                  }}>
                    <h4 style={{ color: '#F58220', marginBottom: '15px', fontSize: '1.2rem', fontFamily: 'serif' }}>Owner Details</h4>
                    <p style={{ margin: '5px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>{prop.ownerName || 'RSV Authorized Owner'}</p>
                    <p style={{ margin: '8px 0', fontSize: '1rem', background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '4px' }}>📞 {prop.phone || '+91 99887 76655'}</p>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem', opacity: 0.9 }}>✉️ {prop.email || 'contact@rsvgroups.com'}</p>
                  </div>
                )}

                <span className="tag" style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 12 }}>
                  {getIcon(prop.type)} {prop.type}
                </span>
              </div>
              <div className="card-content">
                <h3 className="project-title serif" style={{ fontSize: '1.4rem' }}>{prop.title}</h3>
                <div className="project-location" style={{ marginBottom: '1.5rem', display: 'flex', gap: '20px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="#F58220"/> {prop.location}</span>
                  {prop.sqft && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Ruler size={16} color="#F58220"/> {prop.sqft}</span>}
                </div>
                <div className="price-info">
                  <span className="price">{prop.price}</span>
                  <button 
                    className="view-all-btn" 
                    style={{ fontSize: '0.75rem', fontWeight: 700 }}
                    onClick={() => setOpenContactIdx(openContactIdx === idx ? null : idx)}
                  >
                    {openContactIdx === idx ? 'CLOSE' : 'CONTACT OWNER'}
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>
              No properties available in this category yet. Check back soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
