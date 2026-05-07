import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Send, CheckCircle } from 'lucide-react';
import mapImg from '../images/map1.jpeg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'OMR, Chennai',
    budget: '25L - 50L'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage for Admin Dashboard
    const newLead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      interest: `${formData.location} (Budget: ${formData.budget})`,
      status: 'New',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    const existingLeads = JSON.parse(localStorage.getItem('rsv_leads') || '[]');
    localStorage.setItem('rsv_leads', JSON.stringify([newLead, ...existingLeads]));

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', location: 'OMR, Chennai', budget: '25L - 50L' });
  };

  return (
    <div className="contact-page-detailed">
      {/* Hero Section */}
      <section className="contact-hero" style={{ 
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
            background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat',
            zIndex: 0
          }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.6), rgba(15,26,17,0.9))', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>Define Your <span className="highlight">Future.</span></h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>Get in touch with our experts for a personalized consultation.</h2>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '8rem 0', background: '#f9f9f9' }}>
        <div className="container">
          <div className="contact-cards-grid">
            {[
              { icon: <Phone size={32} />, title: "Call Us", val: "+91 98765 43210", desc: "Available Mon-Sat, 9AM-7PM" },
              { icon: <Mail size={32} />, title: "Email Us", val: "info@greenfield.com", desc: "Expect a reply within 24 hours" },
              { icon: <MapPin size={32} />, title: "Visit Us", val: "Anna Nagar, Chennai", desc: "Our corporate headquarters" }
            ].map((card, i) => (
              <div key={i} style={{ padding: '3.5rem', background: 'white', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', textAlign: 'center', border: '1px solid #eee' }}>
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
                <h3 className="serif" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{card.val}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section style={{ padding: '10rem 0', background: '#fdfdfd' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>Get a Quote</span>
            <h2 className="serif" style={{ fontSize: '3.5rem', margin: '2rem 0', lineHeight: 1.1 }}>Request <span className="highlight">Personalized</span> Details</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3.5rem' }}>
              Whether you're looking for an immediate investment or a long-term villa plot, our team will help you find the right fit based on your budget and preferred location.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.9rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-gold)' }}></div>
              <span>"We respond within 24 business hours"</span>
            </div>
          </div>
          <div style={{ background: 'white', padding: '5rem', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)' }}>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <CheckCircle size={60} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
                <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Inquiry Received</h3>
                <p style={{ color: 'var(--text-light)' }}>Our team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '2rem', color: 'var(--accent-gold)', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="input-group-modern">
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', font: 'inherit', fontSize: '0.95rem' }} 
                    />
                  </div>
                  <div className="input-group-modern">
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 00000 00000" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', font: 'inherit', fontSize: '0.95rem' }} 
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="input-group-modern">
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', font: 'inherit', fontSize: '0.95rem' }} 
                    />
                  </div>
                  <div className="input-group-modern">
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Preferred Location</label>
                    <select 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', font: 'inherit', background: 'transparent', fontSize: '0.95rem', cursor: 'pointer' }}
                    >
                      <option>OMR, Chennai</option>
                      <option>ECR, Chennai</option>
                      <option>GST Road, Chennai</option>
                      <option>Oragadam</option>
                    </select>
                  </div>
                </div>
                <div className="input-group-modern" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Investment Budget</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', font: 'inherit', background: 'transparent', fontSize: '0.95rem', cursor: 'pointer' }}
                  >
                    <option>25L - 50L</option>
                    <option>50L - 1Cr</option>
                    <option>Above 1Cr</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="submit-btn" 
                  style={{ background: '#0F1A11', color: 'white', padding: '1.4rem', fontWeight: 800, borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', border: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  <Send size={16} /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Branch Addresses & Building Section */}
      <section style={{ padding: '8rem 0', background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 className="serif" style={{ fontSize: 'var(--font-xl)', marginBottom: '2rem' }}>Our <span className="highlight">Offices</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}><MapPin size={24} /></div>
                <div>
                  <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Guindy Head Office</h3>
                  <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>12, RSV Tower, Industrial Estate,<br/>Guindy, Chennai 600032</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}><MapPin size={24} /></div>
                <div>
                  <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Tambaram Hub</h3>
                  <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>45, RSV Plaza, GST Road,<br/>Tambaram, Chennai 600045</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--primary-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}><MapPin size={24} /></div>
                <div>
                  <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>OMR Estate Branch</h3>
                  <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>88, RSV Coastal Tech Park, Rajiv Gandhi Salai (OMR),<br/>Navalur, Chennai 600130</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative' }}>
             <img 
               src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
               alt="RSV Groups Building" 
               style={{ width: '100%', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} 
             />
             <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'var(--primary-dark)', color: 'var(--accent-gold)', padding: '2rem', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <h3 className="serif" style={{ fontSize: 'var(--font-lg)', marginBottom: '5px' }}>RSV Groups</h3>
                <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: 0 }}>Corporate Headquarters</p>
             </div>
          </div>
        </div>
      </section>

      {/* Chennai Hubs Map Section */}
      <section style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
         <a 
           href="https://www.google.com/maps/search/Chennai" 
           target="_blank" 
           rel="noopener noreferrer" 
           style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
         >
           {/* Static Map Background */}
           <div style={{ 
             position: 'absolute', 
             inset: 0, 
             background: `url(${mapImg}) center/cover no-repeat`,
             transition: 'filter 0.3s ease'
           }} 
           />
           
           <div style={{ position: 'absolute', inset: 0, padding: '2rem' }}>
              <div className="container" style={{ height: '100%', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem', background: 'var(--primary-dark)', padding: '1.5rem', borderRadius: '15px', maxWidth: '400px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', transition: 'transform 0.3s' }}>
                  <h2 className="serif" style={{ color: 'white', fontSize: 'var(--font-lg)' }}>Our Chennai <span className="highlight">Hubs</span></h2>
                  <p style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Click to view on Google Maps</p>
                </div>
                
              </div>
           </div>
         </a>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: '6rem 0', background: 'var(--primary-dark)', color: 'white' }}>
         <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '4rem' }}>
            <button className="book-btn" style={{ gap: '12px' }}><Phone size={18} /> Call Now</button>
            <button className="book-btn" style={{ background: 'transparent', border: '1px solid #25D366', color: '#25D366', gap: '12px' }}>
               <MessageSquare size={18} /> WhatsApp Chat
            </button>
         </div>
      </section>

    </div>
  );
};

export default ContactPage;

