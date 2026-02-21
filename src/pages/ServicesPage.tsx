import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ContactSection from '@/components/ContactSection';
import PageTransition from '@/components/PageTransition';

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24" />
        <ServicesSection />
        <WhyChooseSection />
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
