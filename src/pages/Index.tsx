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

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <ServicesSection />
        <AIFeaturesSection />
        <MakersSection />
        <PortfolioSection />
        <WhyChooseSection />
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
