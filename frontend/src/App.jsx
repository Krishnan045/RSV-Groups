import React, { useState, useEffect } from 'react';
import './App.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import PlotsPage from './pages/PlotsPage';
import LocationsPage from './pages/LocationsPage';
import ProjectsPage from './pages/ProjectsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookVisitPage from './pages/BookVisitPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import RentalPage from './pages/RentalPage';
import RentalOfferPage from './pages/RentalOfferPage';
import SoldLeasedPage from './pages/SoldLeasedPage';
const API = import.meta.env.VITE_API_URL;

function App() {
  // Initialize state from localStorage to persist after refresh
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('rsv_current_page') || 'home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => sessionStorage.getItem('rsv_admin_auth') === 'true');

  // Handle persistence and URL-hash synchronization
  useEffect(() => {
    // Only persist non-admin pages to localStorage
    if (currentPage !== 'admin') {
      localStorage.setItem('rsv_current_page', currentPage);
    }
    sessionStorage.setItem('rsv_admin_auth', isAdminAuthenticated.toString());
    // Cleanup legacy localStorage auth if it exists
    localStorage.removeItem('rsv_admin_auth');
    
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '' && currentPage === 'admin') {
        setCurrentPage('home');
      }
    };
    
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentPage, isAdminAuthenticated]);

  const renderPage = () => {
    if (currentPage.startsWith('buy')) {
      const category = currentPage.split('-')[1] || 'all';
      return <BuyPage category={category} />;
    }
    
    if (currentPage.startsWith('sell')) {
      const category = currentPage.split('-')[1] || '';
      return <SellPage category={category} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'plots':
        return <PlotsPage />;
      case 'locations':
        return <LocationsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'amenities':
        return <AmenitiesPage />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'rental-property':
      case 'rental-wanted':
        return <RentalPage />;
      case 'rental-offer':
        return <RentalOfferPage />;
      case 'book-visit':
        return <BookVisitPage />;
      case 'sold-leased':
        return <SoldLeasedPage />;
      case 'admin':
        if (!isAdminAuthenticated) {
          return <AdminLogin 
            onLogin={() => setIsAdminAuthenticated(true)} 
            onBack={() => setCurrentPage('home')}
          />;
        }
        return <AdminDashboard onLogout={() => {
          setIsAdminAuthenticated(false);
          setCurrentPage('home');
        }} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;

