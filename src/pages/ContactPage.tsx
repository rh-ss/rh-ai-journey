import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import PageTransition from '@/components/PageTransition';

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24" />
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
}
