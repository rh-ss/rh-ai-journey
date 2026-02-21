import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import MakersSection from '../components/MakersSection';
import PortfolioSection from '../components/PortfolioSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <HeroSection />
          <ServicesSection />
          <MakersSection />
          <PortfolioSection />
          <WhyChooseSection />
          <ContactSection />
          <Footer />
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
