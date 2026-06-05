import Activities from "./components/Activities";
import BirthdayOffers from "./components/BirthdayOffers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LocationMap from "./components/LocationMap";
import OpeningHours from "./components/OpeningHours";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import SpaceRental from "./components/SpaceRental";
import VideosSection from "./components/VideosSection";
import { useEffect } from "react";

const HASH_SCROLL_DELAYS_MS = [120, 360, 700];
const HASH_SCROLL_OFFSET = 112;

function scrollToHashTarget() {
  const hash = window.location.hash;
  if (!hash) return;

  const targetId = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(targetId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - HASH_SCROLL_OFFSET;
  window.scrollTo({ behavior: "smooth", top: Math.max(top, 0) });
}

function scheduleHashScroll() {
  return HASH_SCROLL_DELAYS_MS.map((delay) =>
    window.setTimeout(() => {
      window.requestAnimationFrame(scrollToHashTarget);
    }, delay),
  );
}

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollTimeoutIds = scheduleHashScroll();

    const handleHashChange = () => {
      scheduleHashScroll();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      scrollTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden text-ranch-navy">
      <Header />
      <main>
        <Hero />
        <Activities />
        <VideosSection />
        <Pricing />
        <OpeningHours />
        <BirthdayOffers />
        <Reviews />
        <LocationMap />
        <SpaceRental />
      </main>
      <Footer />
    </div>
  );
}
