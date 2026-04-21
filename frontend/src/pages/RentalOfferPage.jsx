import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Phone, MapPin, ArrowRight, Home, Building } from 'lucide-react';
import logoImg from '../images/LOGO.png';

const RentalOfferPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    mobile: '', 
    phone: '', 
    address: '', 
    location: '', 
    city: '', 
    landPrice: '',
    message: '', 
    region: 'Select Nearest Branch',
    captchaAnswer: ''
  });

  // Dynamic Captcha State
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, operator: '+', result: 0 });

  const generateCaptcha = () => {
    const isAddition = Math.random() > 0.5;
    const n1 = Math.floor(Math.random() * 20) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    
    if (isAddition) {
      setCaptcha({ num1: n1, num2: n2, operator: '+', result: n1 + n2 });
    } else {
      // Ensure n1 >= n2 for positive subtraction result
      const max = Math.max(n1, n2);
      const min = Math.min(n1, n2);
      setCaptcha({ num1: max, num2: min, operator: '-', result: max - min });
    }
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.captchaAnswer) !== captcha.result) {
      alert(`Verification failed. ${captcha.num1} ${captcha.operator} ${captcha.num2} is not ${formData.captchaAnswer}. Please try again.`);
      generateCaptcha();
      setFormData(prev => ({ ...prev, captchaAnswer: '' }));
      return;
    }
    
    // Save to localStorage for admin approval
    const newProperty = {
      id: Date.now(),
      title: formData.name ? `${formData.name}'s Property` : 'New Rental Submission',
      ownerName: formData.name,
      email: formData.email,
      phone: formData.mobile || formData.phone,
      address: formData.address,
      location: formData.location || 'Chennai',
      city: formData.city || 'Chennai',
      message: formData.message,
      landPrice: formData.landPrice,
      type: 'rental',
      status: 'pending',
      date: new Date().toLocaleDateString(),
      // Use a default premium image for rentals
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      rent: "Contact for Rent", // Default text
      bedrooms: "Contact for Info",
      sqft: "N/A"
    };

    const existingProps = JSON.parse(localStorage.getItem('user_properties') || '[]');
    localStorage.setItem('user_properties', JSON.stringify([...existingProps, newProperty]));

    setShowPopup(true);
    setFormData({ 
      name: '', 
      email: '', 
      mobile: '', 
      phone: '', 
      address: '', 
      location: '', 
      city: '', 
      landPrice: '',
      message: '', 
      region: 'Select Nearest Branch',
      captchaAnswer: ''
    });
    generateCaptcha();
  };

  return (
    <div className="page-container" style={{ background: '#f9f9f9' }}>
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
        <div className="hero-bg-overlay" style={{ background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1, position: 'absolute', inset: 0 }}></div>

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
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>Offer Your <span className="highlight">Property.</span></h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>List your premium property directly with us.</h2>
          </motion.div>
        </div>
      </section>

      {/* Two-Column Layout Section */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Sidebar */}
          <div className="sidebar" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Property Listing Links */}
            <div style={{ background: 'var(--primary-dark)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <h3 className="serif" style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>Property Listing</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['OMR Corridor', 'ECR Coastal', 'Anna Nagar', 'Guindy / City', 'Velachery', 'Adyar / Besant Nagar', 'West Tambaram'].map((city, idx) => (
                  <li key={idx}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}>
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#" style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.95rem', color: 'white', fontWeight: 600, borderBottom: '1px solid var(--accent-gold)' }}>
                View All Sold/Leased Deals
              </a>
            </div>

            {/* Sold/Leased Highlight */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <h3 className="serif" style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>SOLD/LEASED PROPERTIES</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Rented Out! 3000 Sq.ft 5BHK Independent House at 2nd Street, Valasaravakkam. Rented For Rs.1,00,000...
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                <span>Jagadeesan M</span>
                <span>Magesh R</span>
                <span>Ruban L</span>
              </div>
            </div>

            {/* Promo Cards */}
            <div style={{ borderRadius: '15px', overflow: 'hidden', height: '180px', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" alt="Thoughts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h4 className="serif" style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>Leader's Book of Thoughts</h4>
              </div>
            </div>

            <div style={{ borderRadius: '15px', overflow: 'hidden', height: '180px', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" alt="Training Session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h4 className="serif" style={{ color: 'white', fontSize: '1.2rem', margin: 0 }}>Realtor Training Session</h4>
              </div>
            </div>

          </div>

          {/* Right Main Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }} 
             whileInView={{ opacity: 1, x: 0 }} 
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             style={{ flex: '2 1 600px', background: 'white', borderRadius: '20px', padding: '3rem', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}
          >
            <h2 className="serif" style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '1rem', display: 'inline-block' }}>Offered</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', marginBottom: '3rem', marginTop: '1rem' }}>Please fill out the form below to submit your property details to our verified network.</p>

            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Your Name</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Your Email</label>
                  <input type="email" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Your Mobile</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Your Phone</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Address</label>
                <textarea rows="3" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem', resize: 'vertical' }} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Location</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>City</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Land Price</label>
                <input type="text" placeholder="e.g. 50 Lakhs or 1.2 Cr" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem' }} value={formData.landPrice} onChange={(e) => setFormData({...formData, landPrice: e.target.value})} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Property Images</label>
                <div style={{ width: '100%', padding: '2.5rem 2rem', border: '2px dashed #d0d0d0', borderRadius: '8px', textAlign: 'center', background: '#fafbfc', cursor: 'pointer', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#d0d0d0'}>
                  <input type="file" multiple accept="image/*" style={{ opacity: 0, position: 'absolute', width: '1px', height: '1px' }} id="property-images" />
                  <label htmlFor="property-images" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '2rem' }}>📷</span>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.95rem' }}>Click to upload property images</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>(Max 5 images, up to 5MB each)</span>
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Your Message</label>
                <textarea rows="4" style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem', resize: 'vertical' }} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>Nearest Branch</label>
                <select style={{ width: '100%', padding: '12px 16px', background: '#f5f7f5', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.95rem', cursor: 'pointer' }} value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})}>
                  <option>Select Nearest Branch</option>
                  <option>OMR Branch</option>
                  <option>ECR Branch</option>
                  <option>Anna Nagar Branch</option>
                  <option>Guindy Headquarters</option>
                </select>
              </div>

              <div style={{ marginTop: '1.5rem', background: 'var(--primary-dark)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem', width: 'fit-content' }}>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Human Verification</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>{captcha.num1} {captcha.operator} {captcha.num2} =</span>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      placeholder="Answer" 
                      style={{ padding: '8px 40px 8px 12px', width: '180px', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }} 
                      value={formData.captchaAnswer}
                      onChange={(e) => setFormData({...formData, captchaAnswer: e.target.value})}
                      required 
                    />
                    <div style={{ position: 'absolute', right: '10px', fontSize: '1.1rem' }}>
                      {formData.captchaAnswer !== '' && (
                        parseInt(formData.captchaAnswer) === captcha.result ? 
                        <span style={{ color: '#4CAF50' }}>✅</span> : 
                        <span style={{ color: '#FF5252' }}>❌</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button type="submit" style={{ background: 'var(--accent-gold)', color: 'white', fontWeight: 700, padding: '1rem 3rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', transition: '0.3s' }}>
                  Send
                </button>
              </div>

            </form>
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
                A representative will contact you shortly regarding your property listing.
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
    </div>
  );
};

export default RentalOfferPage;
