//src>app>page.tsx

import LandingNavbar from "./landing/LandingNavbar";
import Hero from "./landing/Hero";
import HowItWorksPage from "./landing/how-it-works/page"; // ✅ Correct import
import FeaturesPage from "./landing/features/page"; // ✅ Correct import
import FAQPage from "./landing/testimonials/page"; // ✅ Correct import
import CTASection from "./landing/cta/page";
import Footer from "./landing/footer/page"; // ✅ Correct import

export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <Hero />
      <FeaturesPage />
      <HowItWorksPage />
      <FAQPage />
      <CTASection /> {/* ✅ CTA section added */}
      <Footer /> {/* ✅ Footer added */}
    </div>
  );
}
