import AboutUs from "./_components/sections/AboutUs";
import CollaboartionSection from "./_components/sections/CollaboartionSection";
import CounterSection from "./_components/sections/CounterSection";
import FAQSection from "./_components/sections/FAQSection";
import Features from "./_components/sections/Features";
import FeaturesBrief from "./_components/sections/FeaturesBrief";
import Footer from "./_components/sections/Footer";
import LandingPage from "./_components/sections/LandingPage";
import ProductFeatures from "./_components/sections/ProductFeatures";
import StreamSection from "./_components/sections/StreamSection";

export default function Home() {


  const response = fetch(`${process.env.NEXT_PUBLIC_BACKEND}/`,{
    cache:'no-store'
  })

  return (
    <div>
      <LandingPage />
      <FeaturesBrief />
      {/* <Features /> */}
      {/* <StreamSection />  */}
      {/* <CounterSection /> */}
      <ProductFeatures />
      {/* <ContactSection /> */}
      {/* <FAQSection /> */}
      <CollaboartionSection />
      <AboutUs />
      <Footer />
    </div>
  );
}
