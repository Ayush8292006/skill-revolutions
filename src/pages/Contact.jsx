import { useRef as useRevealRef } from 'react';
import { useReveal3D } from '../hooks/useReveal3D';
import { useEffect } from 'react';
import SectionLabel from '../components/SectionLabel';
import ContactSection from '../sections/ContactSection';
import FAQSection from '../sections/FAQSection';
import { siteConfig } from '../data/site';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const revealRef = useRevealRef(null);
  useReveal3D(revealRef);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={revealRef} className="pt-28 sm:pt-36 bg-bg text-text">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionLabel number="01" label="CONTACT US" />
        <h1 className="font-headline font-extrabold text-4xl sm:text-6xl lg:text-7xl text-text tracking-tighter leading-[1.02] max-w-4xl">
          Let’s talk about <br />
          <span className="text-accent">your career.</span>
        </h1>
        <p className="mt-6 text-muted text-lg sm:text-xl max-w-3xl leading-relaxed">
          We'd love to hear from you. Visit our SR Nagar institute or call us for free counselling, batch timings and course details.
        </p>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 font-mono text-xs">
          <div className="p-6 bg-surface/60 border border-line rounded-3xl space-y-3">
            <div className="w-10 h-10 border border-line rounded-xl bg-bg flex items-center justify-center text-accent">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-accent font-bold tracking-wider uppercase">ADDRESS</div>
            <p className="text-muted leading-relaxed">
              {siteConfig.contact.address}
            </p>
          </div>

          <div className="p-6 bg-surface/60 border border-line rounded-3xl space-y-3">
            <div className="w-10 h-10 border border-line rounded-xl bg-bg flex items-center justify-center text-accent">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-accent font-bold tracking-wider uppercase">PHONE & EMAIL</div>
            <p className="text-muted leading-relaxed flex flex-col gap-1">
              <a href={`tel:${siteConfig.contact.phonePrimary}`} className="hover:text-text">
                {siteConfig.contact.phonePrimary}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-text">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          <div className="p-6 bg-surface/60 border border-line rounded-3xl space-y-3">
            <div className="w-10 h-10 border border-line rounded-xl bg-bg flex items-center justify-center text-accent">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-accent font-bold tracking-wider uppercase">BATCHES</div>
            <p className="text-muted leading-relaxed">
              Online and classroom training<br />
              Weekday and weekend batches
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Form */}
      <ContactSection />

      {/* Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
}

