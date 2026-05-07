import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, User, Calendar, Clock, ShieldCheck, CheckCircle2, Navigation, FileCheck } from 'lucide-react';

const BookVisitPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    location: 'The Royal Estate (OMR)'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage for Admin Dashboard
    const newVisit = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: 'TBD',
      location: formData.location,
      status: 'Pending'
    };
    
    const existingVisits = JSON.parse(localStorage.getItem('rsv_visits') || '[]');
    localStorage.setItem('rsv_visits', JSON.stringify([newVisit, ...existingVisits]));

    setSubmitted(true);
    setFormData({ name: '', phone: '', date: '', location: 'The Royal Estate (OMR)' });
  };


  return (
    <div className="book-visit-page-detailed">
      {/* Hero Section */}
      <section className="visit-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.95))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '5rem', color: 'white', marginBottom: '1rem' }}>Experience Before <br /><span className="highlight">You Invest.</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
               Book a curated site tour and witness the Greenfield quality firsthand. No obligations, just clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section style={{ padding: '10rem 0', background: '#fcfcfc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <span className="badge-premium">Your Visit Guide</span>
            <h2 className="section-title serif">What to <span className="highlight">Expect</span></h2>
          </div>

          <div className="booking-features-grid">
            {[
              { icon: <Navigation size={32} />, title: "Guided Site Tour", desc: "A personal walkthrough of the entire layout and amenities." },
              { icon: <Map size={32} />, title: "Layout Explanation", desc: "Detailed brief on plot markings, road widths, and future plans." },
              { icon: <TrendingUp size={32} />, title: "Investment Advice", desc: "Consultation on ROI potential and market trends in the area." },
              { icon: <FileCheck size={32} />, title: "Doc. Clarity", desc: "Review legal papers, DTCP approvals, and parent documents." }
            ].map((item, i) => (
              <div key={i} className="booking-feature-card">
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '5rem', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.08)', border: '1px solid #eee', position: 'relative' }}>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <CheckCircle2 size={80} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
                <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Visit Scheduled!</h2>
                <p style={{ color: 'var(--text-light)' }}>Our team will contact you shortly to confirm your visit details.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '2rem', color: 'var(--accent-gold)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Book another visit
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                      <User size={18} color="var(--accent-gold)" />
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        style={{ border: 'none', outline: 'none', width: '100%', font: 'inherit' }} 
                      />
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                      <Phone size={18} color="var(--accent-gold)" />
                      <input 
                        type="tel" 
                        required
                        placeholder="Phone Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        style={{ border: 'none', outline: 'none', width: '100%', font: 'inherit' }} 
                      />
                   </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                      <Calendar size={18} color="var(--accent-gold)" />
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        style={{ border: 'none', outline: 'none', width: '100%', font: 'inherit' }} 
                      />
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                      <MapPin size={18} color="var(--accent-gold)" />
                      <select 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        style={{ border: 'none', outline: 'none', width: '100%', font: 'inherit', background: 'transparent' }}
                      >
                         <option>The Royal Estate (OMR)</option>
                         <option>Emerald Valley (ECR)</option>
                         <option>Heritage West (GST)</option>
                      </select>
                   </div>
                </div>
                <button 
                  type="submit"
                  className="submit-btn" 
                  style={{ 
                    background: 'var(--primary-dark)', 
                    color: 'white', 
                    padding: '1.2rem', 
                    fontWeight: 700, 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                   CONFIRM SITE VISIT
                </button>
              </form>
            )}
          </div>
          <div>
            <span className="badge-premium">Special Assurance</span>
            <h2 className="serif" style={{ fontSize: '3.5rem', margin: '2rem 0' }}>No <span className="highlight">Obligation</span> Visit</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3rem' }}>
               We believe in the quality of our projects. That’s why we offer free site visits with zero pressure to buy. Our goal is to provide you with all the information you need to make an informed decision.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600 }}>
                  <CheckCircle2 color="var(--accent-gold)" /> Free Consultation
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600 }}>
                  <CheckCircle2 color="var(--accent-gold)" /> Transportation Assistance (On Request)
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600 }}>
                  <CheckCircle2 color="var(--accent-gold)" /> Comprehensive Legal Briefing
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Message (Trust Section) */}
      <section style={{ padding: '8rem 0', background: 'var(--primary-dark)', color: 'white', textAlign: 'center' }}>
         <div className="container">
            <h3 className="serif" style={{ fontSize: '2.5rem' }}>Safe & Secure <span className="highlight">Investment.</span></h3>
            <p style={{ marginTop: '1rem', opacity: 0.8, color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Over 500+ site visits organized every month across Chennai.</p>
         </div>
      </section>
    </div>
  );
};

const Map = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
  </svg>
);

const TrendingUp = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

export default BookVisitPage;

