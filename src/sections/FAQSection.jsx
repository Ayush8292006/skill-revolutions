import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { faqData } from '../data/faqs';

export default function FAQSection() {
  const tabs = Object.keys(faqData);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [openIdx, setOpenIdx] = useState(0);

  const currentQuestions = faqData[activeTab] || [];

  return (
    <section className="py-24 sm:py-32 bg-bg border-t border-line relative overflow-hidden" id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <SectionLabel number="11" label="FREQUENTLY ASKED QUESTIONS" />
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.08]">
            Clear answers. <br />
            <span className="text-accent">Zero ambiguity.</span>
          </h2>
        </div>

        {/* Tab Buttons (Terminal Style) */}
        <div className="flex justify-center border-b border-line mb-10 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 sm:gap-6">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setOpenIdx(0);
                  }}
                  className={`relative px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive ? 'text-accent font-bold' : 'text-muted hover:text-text'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <motion.div
                      layoutId="faqActiveTab"
                      className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {currentQuestions.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl transition-colors duration-200 ${
                  isOpen ? 'border-accent/40 bg-surface' : 'border-line bg-surface/40 hover:border-lineLight'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none"
                >
                  <span className="font-headline font-semibold text-base sm:text-lg text-text">
                    {item.q}
                  </span>
                  <div className={`p-1.5 rounded-xl shrink-0 border ${isOpen ? 'border-accent text-accent' : 'border-line text-muted'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-muted text-sm sm:text-base leading-relaxed border-t border-line/40 pt-4 font-normal">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

