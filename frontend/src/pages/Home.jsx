import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedProjects from '../components/FeaturedProjects';
import Amenities from '../components/Amenities';
import Locations from '../components/Locations';
import Testimonials from '../components/Testimonials';
import SoldShowcase from '../components/SoldShowcase';

const Home = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <SearchBar onSearch={() => onNavigate('buy')} />
      <FeaturedProjects />
      <SoldShowcase />
      <Amenities />
      <Locations onSelectLocation={() => onNavigate('locations')} />
      <Testimonials />
    </>
  );
};

export default Home;
