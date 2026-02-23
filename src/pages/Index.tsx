import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AIFeaturesSection from '../components/AIFeaturesSection';
import MakersSection from '../components/MakersSection';
import PortfolioSection from '../components/PortfolioSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import FloatingContactButtons from '../components/FloatingContactButtons';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="snap-section"><HeroSection /></div>
        <div className="snap-section"><ServicesSection /></div>
        <div className="snap-section"><AIFeaturesSection /></div>
        <div className="snap-section"><MakersSection /></div>
        <div className="snap-section"><PortfolioSection /></div>
        <div className="snap-section"><WhyChooseSection /></div>
        <div className="snap-section"><ContactSection /></div>
        <Footer />
        <FloatingContactButtons />
      </div>
    </PageTransition>
  );
};

export default Index;
