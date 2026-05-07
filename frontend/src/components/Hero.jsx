import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Phone, Mail, MapPin, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import logoImg from '../images/LOGO.png';

const Hero = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', region: 'Select Region' });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage for Admin Dashboard
    const newLead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.contact,
      email: formData.email,
      interest: formData.region,
      status: 'New',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const existingLeads = JSON.parse(localStorage.getItem('rsv_leads') || '[]');
    localStorage.setItem('rsv_leads', JSON.stringify([newLead, ...existingLeads]));

    setShowPopup(true);
    setFormData({ name: '', contact: '', email: '', region: 'Select Region' });
  };

  const images = [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Updated to 5 seconds
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="hero">
      <div className="hero-bg-overlay"></div>

      <AnimatePresence mode='wait'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Luxury Estate"
          className="hero-image"
          initial={{ opacity: 0, scale: 1.1, x: 20 }}
          animate={{ opacity: 0.85, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.05, x: -20 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>

      <div className="container hero-content">
        <motion.div
          className="hero-text-side"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="badge-premium" variants={itemVariants} style={{ marginTop: '7.0rem' }}>
            SIGNATURE COLLECTION
          </motion.div>

          <motion.h1 variants={itemVariants} style={{ fontSize: 'var(--font-hero)' }}>
            Legacy, <br />
            <span className="highlight">Defined.</span>
          </motion.h1>

          <motion.p className="hero-desc" variants={itemVariants}>
            An exclusive collection of signature villa plots nestled within Chennai’s most coveted elite corridors. Designed for those who demand nothing less than architectural perfection.
          </motion.p>

          <motion.div
            className="hero-parameters"
            variants={itemVariants}
            style={{ display: 'flex', gap: '3.5rem', marginTop: '2.5rem', opacity: 0.95 }}
          >
            <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '3px' }}>EXCLUSIVITY</p>
              <p className="serif" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '0.5px' }}>Member Only Estates</p>
            </div>
            <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '3px' }}>AUTHENTICITY</p>
              <p className="serif" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '0.5px' }}>Verified Lineage</p>
            </div>
            <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '3px' }}>INVESTMENT</p>
              <p className="serif" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '0.5px' }}>High Appreciation</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="enquiry-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <h4 className="serif" style={{ fontSize: 'var(--font-lg)', marginBottom: '0.5rem' }}>Site Inquiry</h4>
          <p style={{ fontSize: 'var(--font-sm)', marginBottom: '1.5rem' }}>Schedule your private consultation.</p>

          <form onSubmit={handleFormSubmit}>
            <div className="input-group" style={{ marginBottom: '0.8rem' }}>
              <User size={16} className="input-icon" />
              <input type="text" placeholder="Name" style={{ fontSize: '0.9rem' }} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="input-group" style={{ marginBottom: '0.8rem' }}>
              <Phone size={16} className="input-icon" />
              <input type="text" placeholder="Contact" style={{ fontSize: '0.9rem' }} value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required />
            </div>
            <div className="input-group" style={{ marginBottom: '0.8rem' }}>
              <Mail size={16} className="input-icon" />
              <input type="email" placeholder="Email Address" style={{ fontSize: '0.9rem' }} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="input-group" style={{ marginBottom: '1.2rem' }}>
              <MapPin size={16} className="input-icon" />
              <select style={{ fontSize: '0.9rem' }} value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}>
                <option>Select Region</option>
                <option>OMR Corridor</option>
                <option>ECR Coastal</option>
                <option>West Tambaram</option>
              </select>
            </div>
            <button type="submit" className="submit-btn" style={{ cursor: 'pointer', padding: '0.8rem' }}>
              Submit <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </form>
        </motion.div>

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
                background: 'linear-gradient(145deg, #112217 0%, #0a140d 100%)',
                padding: '4rem 3rem',
                borderRadius: '30px',
                textAlign: 'center',
                maxWidth: '450px',
                color: 'white',
                border: '1px solid rgba(245, 130, 32, 0.2)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logoImg} alt="RSV Groups" style={{ width: '140px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }} />
                  </div>
                </div>
                <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', letterSpacing: '1px' }}>Thank You.</h3>
                <p style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 300 }}>
                  Thank you for visiting the <span style={{ color: '#F58220', fontWeight: 600 }}>RSV Groups</span> website. We appreciate your interest.
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    background: '#F58220',
                    color: 'white',
                    padding: '12px 32px',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="floating-book-badge"
        initial={{ y: "-50%", x: 100 }}
        animate={{ y: "-50%", x: 0 }}
        transition={{ type: "spring", stiffness: 80, delay: 1 }}
      >
        <Calendar size={18} style={{ marginBottom: '8px' }} />
        <span style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>BOOK TOUR</span>
      </motion.div>
    </section>
  );
};

export default Hero;
