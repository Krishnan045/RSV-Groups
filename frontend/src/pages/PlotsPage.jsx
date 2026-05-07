import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Ruler, IndianRupee, ShieldCheck, Map, ArrowRight, Filter, CheckCircle2, ChevronDown } from 'lucide-react';

const PlotsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const [allPlots, setAllPlots] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
    // Filter for properties that are 'land' or 'buy' category and are 'available'
    const dynamicPlots = saved.filter(p => 
      (p.type === 'land' || p.category === 'buy') && 
      p.status === 'available' && 
      !p.isSoldLeased
    ).map(p => ({
      id: p.id,
      name: p.title,
      location: p.location,
      size: p.size,
      price: p.price,
      tag: "New Listing",
      image: p.img || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
      approval: p.surveyNumber ? `Survey: ${p.surveyNumber}` : "Verified"
    }));

    const featuredPlots = [
      {
        id: 'f1',
        name: "The Royal Estate",
        location: "OMR, Chennai",
        size: "1200 - 2400 Sq.ft",
        price: "45L",
        tag: "Hot Location",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
        approval: "DTCP Approved"
      },
      {
        id: 'f2',
        name: "Emerald Valley",
        location: "ECR, Chennai",
        size: "1500 - 3000 Sq.ft",
        price: "85L",
        tag: "Limited Units",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        approval: "CMDA Approved"
      }
    ];

    setAllPlots([...featuredPlots, ...dynamicPlots]);
  }, []);

  return (
    <div className="plots-page-detailed">
      {/* Hero Section */}
      <section className="plots-hero" style={{ 
        height: '70vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,26,17,0.9), transparent)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <span className="badge-premium" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Residential Excellence</span>
            <h1 className="serif" style={{ fontSize: '4.5rem', color: 'white', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Find Your Perfect <br /><span className="highlight">Villa Plot</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
              Carefully curated plots in Chennai’s top-performing investment corridors. 
              100% legally verified and ready for immediate registration.
            </p>
            <div className="trust-badges-row" style={{ display: 'flex', gap: '2rem' }}>
              <div className="badge-item"><ShieldCheck className="icon" size={20} /> 100% Legally Verified</div>
              <div className="badge-item"><CheckCircle2 className="icon" size={20} /> Ready for Registration</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Filters Sticky Bar */}
      <div className="sticky-filter-wrapper" style={{ position: 'sticky', top: '80px', zIndex: 100, background: 'white', borderBottom: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div className="container" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="filter-group" style={{ display: 'flex', gap: '2rem' }}>
            <div className="filter-select">
              <label style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>Location</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                Chennai West <ChevronDown size={16} />
              </div>
            </div>
            <div className="filter-select">
              <label style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>Budget</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                25L - 1.5Cr <ChevronDown size={16} />
              </div>
            </div>
            <div className="filter-select">
              <label style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>Plot Size</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                1200+ Sq.ft <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <button className="btn-primary" style={{ padding: '0.8rem 2rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={18} /> Apply Filters
          </button>
        </div>
      </div>

      {/* Value Strip */}
      <section className="value-strip" style={{ background: 'var(--primary-dark)', padding: '4rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[
            { title: "Clear Titles", desc: "No legal hassles" },
            { title: "Transparent Pricing", desc: "No hidden charges" },
            { title: "Expert Guidance", desc: "Post-purchase support" },
            { title: "Immediate Appr.", desc: "DTCP/CMDA Ready" }
          ].map((item, i) => (
            <div key={i} className="value-item" style={{ textAlign: 'center', color: 'white' }}>
              <CheckCircle2 color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
              <h4 className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plot Listings Grid */}
      <section className="listings-section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title serif">Available <span className="highlight">Villa Plots</span></h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px' }}>Explore our handpicked collection of premium residential plots in prime corridors.</p>
          </div>

          <div className="projects-grid">
            {allPlots.map((plot) => (
              <motion.div 
                key={plot.id}
                whileHover={{ y: -10 }}
                className="project-card"
              >
                <div className="card-image" style={{ height: '300px', position: 'relative' }}>
                  <img src={plot.image} alt={plot.name} />
                  <span className="card-tag" style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--accent-gold)', color: 'white', padding: '5px 15px', fontSize: '0.7rem', fontWeight: 700, borderRadius: '100px' }}>
                    {plot.tag}
                  </span>
                </div>
                <div className="card-content" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    <MapPin size={14} /> {plot.location}
                  </div>
                  <h3 className="project-title serif" style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>{plot.name}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                      <Ruler size={16} /> {plot.size}
                    </div>
                  </div>
                  <div className="price-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                    <div className="price" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                      ₹{plot.price}<span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#999', marginLeft: '5px' }}>onwards</span>
                    </div>
                    <button style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Prefer Us */}
      <section className="why-us" style={{ background: '#fcfcfc', padding: '8rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div className="image-side">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              alt="Community" 
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}
            />
          </div>
          <div className="content-side">
            <span className="badge-premium">The RSV Groups Advantage</span>
            <h2 className="section-title serif" style={{ fontSize: '3rem', margin: '1.5rem 0' }}>Why Investors <span className="highlight">Choose Us?</span></h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              We simplify land buying with complete legal clarity, prime location selection, and dedicated support at every step. 
              Our commitment to quality has earned us the trust of over 1500+ happy families.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                "100% Verified Documents",
                "High Value Appreciation Areas",
                "Ready-to-build Infrastructure",
                "Transparent Post-sale Support"
              ].map((text, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, color: 'var(--primary-dark)' }}>
                  <CheckCircle2 color="var(--accent-gold)" size={20} /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="serif" style={{ fontSize: '3rem' }}>Common <span className="highlight">Questions</span></h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { q: "Is the plot DTCP approved?", a: "Yes, 100% of our featured plots are DTCP or CMDA approved depends on the jurisdiction. We provide all approval documents during the site visit." },
              { q: "Can I build immediately?", a: "Absolutely. All our plots come with ready infrastructure including roads, street lights, and water supply, making them ready for immediate construction." },
              { q: "Is bank loan available?", a: "Yes, we have tie-ups with major nationalized and private banks. Loans up to 70-80% of the property value are easily available for our projects." }
            ].map((item, i) => (
              <div key={i} style={{ padding: '2rem', borderBottom: '1px solid #eee' }}>
                <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>{item.q}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wide CTA */}
      <section className="cta-wide" style={{ padding: '8rem 0', background: 'var(--primary-dark)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white' }}>
          <h2 className="serif" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Only a Few Premium <span className="highlight">Plots Remaining</span></h2>
          <p style={{ opacity: 0.7, fontSize: '1.2rem', marginBottom: '3rem' }}>Join the community of savvy investors before the prices appreciate again.</p>
          <button className="book-btn" style={{ background: 'var(--accent-gold)', padding: '1.2rem 3rem', fontSize: '1rem' }}>
            Book Your Site Visit Today
          </button>
        </div>
      </section>
    </div>
  );
};



export default PlotsPage;

