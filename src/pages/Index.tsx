
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PlanetExplorer from '../components/PlanetExplorer';
import FactsSection from '../components/FactsSection';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  // Apply a class to the body element when the component mounts
  useEffect(() => {
    document.body.classList.add('bg-space-black');
    return () => {
      document.body.classList.remove('bg-space-black');
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PlanetExplorer />
      <FactsSection />
      <Footer />
    </main>
  );
};

export default Index;
