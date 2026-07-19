import Features from "../components/Feature";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Listing from "../components/Listing";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Listing />
      <Stats />
      <HowItWorks />
    </div>
  )
}
