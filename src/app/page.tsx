import AIReasoning from "../components/AIReasoning";
import CTA from "../components/CTA";
import Features from "../components/Feature";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Listing from "../components/Listing";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Listing />
      <AIReasoning />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  )
}
