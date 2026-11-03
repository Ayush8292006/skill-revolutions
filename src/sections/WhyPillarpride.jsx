import { useEffect, useRef, useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import RollingCounter from '../components/RollingCounter';
import { siteConfig } from '../data/site';
import { ShieldCheck, Clock, FileCheck2, Award } from 'lucide-react';

const benefits = [
  {
    number: "01",
    title: "Expert Trainers",
    headline: "Learn from industry professionals.",
    description: "Learn from experienced industry professionals and certified experts with real-world experience, who explain every concept clearly and guide you through the interview process.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Real-Time Projects",
    headline: "Practical exposure through hands-on work.",
    description: "Real-time industry projects and practical labs simulate actual business environments, so you build an industry-ready portfolio and the confidence to use it.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Industry Curriculum",
    headline: "Courses designed for current market demands.",
    description: "Programs bridge academic learning and industry expectations, with certification guidance for DP-203, CompTIA Security+, CPC and more.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Placement Assistance",
    headline: "Dedicated support until you are placed.",
    description: "Resume building, LinkedIn optimization, mock interviews, career guidance and job referrals — 100% placement assistance with 100+ hiring partners.",
    icon: Award,
  },
];

export default function WhyPillarpride() {
  const [activeBenefit, setActiveBenefit] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-bg border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 sm:mb-20">
          <SectionLabel number="07" label="WHY SKILL REVOLUTION" />
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] max-w-2xl leading-[1.05]">
            Where results <br />
            <span className="text-accent">speak for themselves.</span>
          </h2>
        </div>

        {/* 4 Stats with Big Rolling Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.id}
              data-reveal className="p-6 sm:p-7 bg-surface/60 border border-line rounded-xl flex flex-col justify-between hover:border-accent/40 transition-colors group"
            >
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4 flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="w-1 h-1 bg-accent group-hover:scale-150 transition-transform" />
              </div>

              <div className="my-2">
                <RollingCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text"
                />
              </div>

              <p className="text-muted text-xs leading-relaxed mt-2 font-mono">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Numbered Benefits 01-04 list with Scroll Highlighting (Terminal Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">
              THE SKILL REVOLUTION STANDARD
            </span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-text tracking-[-0.03em]">
              Four pillars that turn learning into a career.
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Learn from industry experts, earn globally recognised certifications, and receive complete placement assistance to launch your dream career.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.number}
                  onMouseEnter={() => setActiveBenefit(idx)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    activeBenefit === idx
                      ? 'border-accent bg-surface/90 shadow-[0_10px_30px_rgba(214,42,51,0.1)]'
                      : 'border-line bg-surface/40 hover:border-lineLight'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-lg font-bold ${activeBenefit === idx ? 'text-accent' : 'text-muted'}`}>
                        {b.number}
                      </span>
                      <h4 className="font-headline font-extrabold text-lg sm:text-xl text-text">
                        {b.title}
                      </h4>
                    </div>
                    <div className={`p-2 rounded-xl ${activeBenefit === idx ? 'text-accent bg-accent/10' : 'text-muted'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-mono text-xs text-text/80 mb-2 font-medium">
                    {b.headline}
                  </div>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

