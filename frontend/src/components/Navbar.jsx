import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../images/LOGO.png';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    {
      name: 'Buy', id: 'buy',
      dropdown: [
        { name: 'Residential', id: 'buy-residential' },
        { name: 'Commercial', id: 'buy-commercial' },
        { name: 'Land', id: 'buy-land' }
      ]
    },
    {
      name: 'Sell', id: 'sell',
      dropdown: [
        { name: 'Residential', id: 'sell-residential' },
        { name: 'Commercial', id: 'sell-commercial' },
        { name: 'Land', id: 'sell-land' }
      ]
    },
    {
      name: 'Rental property', id: 'rental-property',
      dropdown: [
        { name: 'Wanted', id: 'rental-wanted' },
        { name: 'Offer', id: 'rental-offer' }
      ]
    },
    { name: 'Sold & Leased', id: 'sold-leased' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
    setDropdownOpen(null);
  };

  // Determine if the link (or any of its dropdown items) matches the current page
  const isLinkActive = (link) => {
    if (currentPage === link.id) return true;
    if (link.dropdown && link.dropdown.some(item => currentPage === item.id)) return true;
    if (currentPage.startsWith(link.id)) return true;
    return false;
  };

  const isLightPage = ['sell', 'admin'].some(page => currentPage.startsWith(page));

  return (
    <nav className={`navbar ${isScrolled || isLightPage ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`} style={{ zIndex: 1100 }}>
      <div className="container nav-content">
        <div className="logo-section" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="RSV GROUPS logo" className="navbar-logo" />
          <div className="brand-text">
            <span className="brand-main">RSV</span>
            <span className="brand-sub">GROUPS</span>
          </div>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`} style={{ gap: '2rem' }}>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={link.dropdown ? 'dropdown-parent' : ''}
              onMouseEnter={() => setDropdownOpen(link.id)}
              onMouseLeave={() => setDropdownOpen(null)}
              style={link.dropdown ? { position: 'relative' } : {}}
            >
              <button
                onClick={(e) => {
                  if (link.dropdown) {
                    e.preventDefault();
                    setDropdownOpen(dropdownOpen === link.id ? null : link.id);
                  } else {
                    handleNavClick(link.id);
                  }
                }}
                className={`nav-link-btn ${isLinkActive(link) ? 'active' : ''}`}
                style={{ fontSize: '0.85rem' }}
              >
                {link.name} {link.dropdown && <span style={{ fontSize: '0.7em', marginLeft: '6px', opacity: 0.6 }}>▼</span>}
              </button>
              {link.dropdown && dropdownOpen === link.id && (
                <div className="dropdown-menu">
                  {link.dropdown.map(drop => (
                    <button
                      key={drop.id}
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(drop.id);
                      }}
                    >
                      {drop.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="book-btn hide-mobile"
            onClick={() => handleNavClick('book-visit')}
          >
            Book Site Visit
          </button>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <X size={24} color="white" />
            ) : (
              <Menu size={24} color="white" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

