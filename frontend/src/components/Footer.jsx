import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import logo from '../images/LOGO.png';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo-section" style={{ marginBottom: '1.5rem', cursor: 'pointer', maxWidth: '140px' }} onClick={() => onNavigate('home')}>
            <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: 'auto' }} />
          </div>
          <p className="brand-desc" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '280px', fontSize: '0.85rem', lineHeight: '1.6' }}>
            Redefining luxury through curated plotted developments. 
            A legacy built on trust and architectural excellence.
          </p>
          <div className="social-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1.2rem' }}>
            <a href="#"><Facebook size={18} /></a>
            <a href="#"><Twitter size={18} /></a>
            <a href="#"><Instagram size={18} /></a>
            <a href="#"><Youtube size={18} /></a>
          </div>
        </div>

        <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 className="serif">Quick Links</h4>
          <ul>
            <li><button onClick={() => onNavigate('home')} className="footer-link-btn">Home</button></li>
            <li><button onClick={() => onNavigate('about')} className="footer-link-btn">About</button></li>
            <li><button onClick={() => onNavigate('sell')} className="footer-link-btn">Sell Property</button></li>
            <li><button onClick={() => onNavigate('buy')} className="footer-link-btn">Buy Property</button></li>
          </ul>
        </div>

        <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 className="serif">Company</h4>
          <ul>
            <li><button onClick={() => onNavigate('rental-property')} className="footer-link-btn">Rental Property</button></li>
            <li><button onClick={() => onNavigate('sold-leased')} className="footer-link-btn">Sold & Leased</button></li>
            <li><button onClick={() => onNavigate('contact')} className="footer-link-btn">Contact Us</button></li>
            <li><button onClick={() => onNavigate('book-visit')} className="footer-link-btn">Book Visit</button></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="serif">Newsletter</h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Subscribe to receive private invitations to new development launches.</p>
          <div className="newsletter-form" style={{ marginTop: '1.5rem', display: 'flex' }}>
            <input 
              type="email" 
              placeholder="Email Address" 
              style={{ padding: '10px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', flex: 1 }}
            />
            <button className="subscribe-btn" style={{ background: 'var(--accent-gold)', padding: '10px 15px', border: 'none', cursor: 'pointer' }}><Send size={18} /></button>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem 0', marginTop: '3rem' }}>
        <div className="container bottom-inner" style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.75rem', letterSpacing: '1px' }}>
          <p>© 2024 RSV GROUPS. ALL RIGHTS RESERVED.</p>
          <p>PRIVACY POLICY | TERMS OF SERVICE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

