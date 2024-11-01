import AboutUs from "./_components/sections/AboutUs";
import ContactSection from "./_components/sections/ContactSection";
import CounterSection from "./_components/sections/CounterSection";
import FAQSection from "./_components/sections/FAQSection";
import Features from "./_components/sections/Features";
import FeaturesBrief from "./_components/sections/FeaturesBrief";
import Footer from "./_components/sections/Footer";
import LandingPage from "./_components/sections/LandingPage";
import ProductFeatures from "./_components/sections/ProductFeatures";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <FeaturesBrief />
      <Features />
      <CounterSection />
      <ProductFeatures />
      {/* <ContactSection /> */}
      <FAQSection />
      <AboutUs />
      <Footer />
    </div>
  );
}
