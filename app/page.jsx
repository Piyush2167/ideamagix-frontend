import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import TrustBar from '../components/landing/TrustBar';
import HowItWorks from '../components/landing/HowItWorks';
import PatientSection from '../components/landing/PatientSection';
import DoctorSection from '../components/landing/DoctorSection';
import Specialties from '../components/landing/Specialties';
import SecuritySection from '../components/landing/SecuritySection';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-canvas">
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <PatientSection />
      <DoctorSection />
      <Specialties />
      <SecuritySection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
