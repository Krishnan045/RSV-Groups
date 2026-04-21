import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Phone, MapPin, ArrowRight, Home, Building, TreePine, Ruler } from 'lucide-react';
import logoImg from '../images/LOGO.png';

const RentalPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', region: 'Select Region' });
  const [filterState, setFilterState] = useState({ location: '', propertyType: '', budget: '', bedrooms: '' });
  const [appliedFilters, setAppliedFilters] = useState({ location: '', propertyType: '', budget: '', bedrooms: '' });
  const [openContactIdx, setOpenContactIdx] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setFormData({ name: '', contact: '', region: 'Select Region' });
  };

  const [allRentals, setAllRentals] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
    setAllRentals(saved);
  }, []);

  const parseRent = (rentStr) => {
    if (!rentStr) return 0;
    const lower = String(rentStr).toLowerCase();
    let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
    if (lower.includes('l')) return num * 100000;
    return num;
  };

  const filtered = allRentals.filter(p => {
    if (p.category !== 'rental') return false;
    if (p.status !== 'approved') return false;
    if (p.isSoldLeased) return false;

    if (appliedFilters.propertyType && p.type !== appliedFilters.propertyType) return false;
    if (appliedFilters.location && !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
    if (appliedFilters.bedrooms && p.bedrooms !== appliedFilters.bedrooms) return false;
    
    if (appliedFilters.budget) {
      const val = parseRent(p.price || p.rent);
      if (appliedFilters.budget === "0-20000" && val > 20000) return false;
      if (appliedFilters.budget === "20000-50000" && (val <= 20000 || val > 50000)) return false;
      if (appliedFilters.budget === "50000-100000" && (val <= 50000 || val > 100000)) return false;
      if (appliedFilters.budget === "100000+" && val <= 100000) return false;
    }
    
    return true;
  });

  const getIcon = (type) => {
    if (type === 'villa') return <Home size={18} />;
    if (type === 'commercial') return <Building size={18} />;
    return <Building size={18} />; // Default for apartment
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="page-container" style={{ background: 'var(--primary-bg)' }}>
      {/* Hero Section */}
      <section className="rental-hero" style={{ 
        height: '70vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        marginTop: '-100px',
        paddingTop: '100px',
        overflow: 'hidden'
      }}>
        <div className="hero-bg-overlay" style={{ background: 'linear-gradient(rgba(15,26,17,0.6), rgba(15,26,17,0.9))', zIndex: 1, position: 'absolute', inset: 0 }}></div>

        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop) center/cover no-repeat',
            zIndex: 0
          }}
        />

        <div className="container" style={{ zIndex: 10, position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>Find Your Ideal <span className="highlight">Rental.</span></h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>Verified premium homes across Chennai.</h2>
          </motion.div>
        </div>
      </section>



      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ 
              background: 'linear-gradient(145deg, #112217 0%, #0a140d 100%)', padding: '4rem 3rem', borderRadius: '30px', textAlign: 'center', maxWidth: '450px', color: 'white', border: '1px solid rgba(245, 130, 32, 0.2)', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <img src={logoImg} alt="RSV Groups" style={{ width: '140px', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }} />
              </div>
              <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', letterSpacing: '1px' }}>Thank You.</h3>
              <p style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 300 }}>
                A representative will contact you shortly regarding rental options.
              </p>
              <button 
                onClick={() => setShowPopup(false)} 
                style={{ background: '#F58220', color: 'white', padding: '12px 32px', border: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        {/* Filter Bar */}
        <div className="buy-filter-bar">
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Location</label>
            <select value={filterState.location} onChange={e => setFilterState({...filterState, location: e.target.value})} style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none' }}>
              <option value="">-- Any Location --</option>
              <option value="omr">OMR</option>
              <option value="ecr">ECR</option>
              <option value="guindy">Guindy</option>
              <option value="tambaram">Tambaram</option>
            </select>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Property Type</label>
            <select value={filterState.propertyType} onChange={e => setFilterState({...filterState, propertyType: e.target.value})} style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none' }}>
              <option value="">-- All Types --</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Bedrooms</label>
            <select value={filterState.bedrooms} onChange={e => setFilterState({...filterState, bedrooms: e.target.value})} style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none' }}>
              <option value="">-- Any --</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="N/A">Commercial (N/A)</option>
            </select>
          </div>

          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Monthly Budget</label>
            <select value={filterState.budget} onChange={e => setFilterState({...filterState, budget: e.target.value})} style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none' }}>
              <option value="">-- Any Amount --</option>
              <option value="0-20000">Below ₹20,000</option>
              <option value="20000-50000">₹20,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1 Lakh</option>
              <option value="100000+">Above ₹1 Lakh</option>
            </select>
          </div>
          
          <div>
            <button onClick={() => setAppliedFilters(filterState)} style={{ background: '#F58220', color: 'white', fontWeight: 700, padding: '10px 24px', border: 'none', cursor: 'pointer', height: '39px', display: 'flex', alignItems: 'center' }}>
              Search
            </button>
          </div>
        </div>

        {/* Featured Rental Properties */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
           <h2 className="serif section-title" style={{ color: 'var(--primary-dark)', fontSize: '2.5rem' }}>Featured Rental Properties</h2>
           <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Handpicked selections ready for move-in</p>
        </div>

        <div className="projects-grid" style={{ minHeight: '40vh' }}>
          {filtered.length > 0 ? filtered.map((prop, idx) => (
            <motion.div 
              key={idx} className="project-card" 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover="hover" style={{ overflow: 'hidden', borderRadius: '12px' }}
            >
              <div className="card-image" style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                <motion.img src={prop.img} alt={prop.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} variants={{ hover: { scale: 1.15 } }} transition={{ duration: 0.8, ease: "easeOut" }} />
                
                {openContactIdx === idx && (
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(21, 58, 33, 0.92)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', zIndex: 10, padding: '2rem', textAlign: 'center', backdropFilter: 'blur(3px)' }}>
                    <h4 style={{ color: '#F58220', marginBottom: '15px', fontSize: '1.2rem', fontFamily: 'serif' }}>Contact Owner</h4>
                    <p style={{ margin: '5px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>{prop.ownerName}</p>
                    <p style={{ margin: '8px 0', fontSize: '1rem', background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '4px' }}>📞 {prop.phone}</p>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem', opacity: 0.9 }}>✉️ {prop.email}</p>
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
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#F58220"/> {prop.bedrooms}</span>
                  {prop.sqft && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Ruler size={16} color="#F58220"/> {prop.sqft}</span>}
                </div>
                <div className="price-info">
                  <span className="price">{prop.price || prop.rent}</span>
                  <button className="view-all-btn" style={{ fontSize: '0.75rem', fontWeight: 700 }} onClick={() => setOpenContactIdx(openContactIdx === idx ? null : idx)}>
                    {openContactIdx === idx ? 'CLOSE' : 'VIEW DETAILS'}
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>
              No rental properties match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalPage;
