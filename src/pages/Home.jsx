import Hero3D from '../sections/Hero3D';
import LogoMarquee from '../sections/LogoMarquee';
import AboutIntro from '../sections/AboutIntro';
import PathCards from '../sections/PathCards';
import CostEstimator from '../sections/CostEstimator';
import Specializations from '../sections/Specializations';
import WhyPillarpride from '../sections/WhyPillarpride';
import ProjectsShowcase from '../sections/ProjectsShowcase';
import Testimonial from '../sections/Testimonial';
import ContactSection from '../sections/ContactSection';
import FAQSection from '../sections/FAQSection';
import FinalCTA from '../sections/FinalCTA';
import { useRef } from 'react';
import { useReveal3D } from '../hooks/useReveal3D';

export default function Home() {
  const ref = useRef(null);
  useReveal3D(ref);
  return (
    <main ref={ref} className="w-full text-text">
      {/* 01. Scroll-driven 3D Hero */}
      <Hero3D />

      {/* 02. Hiring Partner Marquee */}
      <LogoMarquee />

      {/* 03. Welcome & Philosophy */}
      <AboutIntro />

      {/* 04. Choose Your Path Cards */}
      <PathCards />

      {/* 05. Interactive Career Planner */}
      <CostEstimator />

      {/* 06. Specializations (One Team Platform) */}
      <Specializations />

      {/* 07. Why Skill Revolution & Rolling Counters */}
      <WhyPillarpride />

      {/* 08. 3D Courses Gallery */}
      <ProjectsShowcase />

      {/* 09. Student Stories */}
      <Testimonial />

      {/* 10. Consultation & Booking Form */}
      <ContactSection />

      {/* 11. Tabbed FAQ */}
      <FAQSection />

      {/* 12. Final Call to Action */}
      <FinalCTA />
    </main>
  );
}

