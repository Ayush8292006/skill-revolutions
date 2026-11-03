import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { servicesData } from '../data/services';
import Tilt from '../components/Tilt';

export default function Specializations() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  const currentService = servicesData.find((s) => s.id === activeTab) || servicesData[0];

  return (
    <section className="py-24 sm:py-32 bg-surface/40 border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SectionLabel number="06" label="HOW WE TRAIN" />
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.06]">
            One institute. <br />
            <span className="text-accent">Every step to your job.</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
            From your first class to your first offer letter — training, live projects, certification, resume, mock interviews and placement under one roof.
          </p>
        </div>

        {/* Tab Buttons (Terminal Style) */}
        <div className="flex overflow-x-auto pb-4 mb-8 sm:mb-12 border-b border-line gap-2 sm:gap-4 no-scrollbar">
          {servicesData.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative shrink-0 px-4 py-3 font-mono text-xs uppercase tracking-widest transition-all ${
                  isActive ? 'text-accent font-bold' : 'text-muted hover:text-text'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] opacity-60">{item.code}</span>
                  <span>{item.tabLabel}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeSpecializationUnderline"
                    className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body with Image Left and Info Right */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-surface/60 border border-line rounded-3xl p-6 sm:p-10"
          >
            {/* Left Image with Clip Reveal */}
            <Tilt max={8} className="lg:col-span-6 overflow-hidden rounded-2xl border border-line aspect-[4/3] bg-bg [perspective:900px]">
              <motion.img
                key={currentService.image}
                initial={{ scale: 1.15, opacity: 0, rotateY: -28, rotateX: 6 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={currentService.image}
                alt={currentService.title}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute top-3 left-3 bg-bg/80 px-2.5 py-1 font-mono text-[10px] text-accent uppercase tracking-widest border border-line">
                {currentService.stat}
              </div>
            </Tilt>

            {/* Right Information */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                <span>{currentService.code} // {currentService.tabLabel}</span>
              </div>

              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text tracking-[-0.03em]">
                {currentService.title}
              </h3>

              <div className="font-mono text-xs text-text/80 italic">
                "{currentService.tagline}"
              </div>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {currentService.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  WHAT YOU GET:
                </div>
                <div className="grid grid-cols-1 gap-2 font-mono text-xs text-text/90">
                  {currentService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button to="/placements" variant="primary" size="md" icon="diagonal">
                  Placement & Career Support
                </Button>
                <Link
                  to="/contact"
                  className="font-mono text-xs text-muted hover:text-accent transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                >
                  <span>Book Free Counselling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

