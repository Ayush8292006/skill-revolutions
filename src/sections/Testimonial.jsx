import { useEffect, useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { siteConfig, STORIES } from '../data/site';

export default function Testimonial() {
  const [i, setI] = useState(0);
  const s = STORIES[i];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % STORIES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-28 sm:py-36 bg-bg border-t border-line overflow-hidden">
      {/* Background classroom image */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteConfig.images.classroom}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <SectionLabel number="09" label="STUDENT SUCCESS STORIES" />
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-8 text-accent">
          {[...Array(5)].map((_, k) => (
            <Star key={k} className="w-5 h-5 fill-accent stroke-accent" />
          ))}
          <span className="ml-2 font-mono text-xs text-text/80 tracking-wider">PLACED IN TOP COMPANIES</span>
        </div>

        <div key={s.name} className="fade-up">
          <blockquote className="font-headline font-semibold text-2xl sm:text-4xl lg:text-5xl text-text tracking-tight leading-[1.2] mb-10 max-w-4xl mx-auto">
            “{s.q}”
          </blockquote>

          <div className="flex flex-col items-center gap-3">
            <img src={s.photo} alt={s.name} width="72" height="72" className="w-16 h-16 rounded-full object-cover border-2 border-accent" />
            <div className="font-headline font-extrabold text-lg sm:text-xl text-text">{s.name}</div>
            <div className="font-mono text-xs text-accent tracking-widest uppercase">{s.role}</div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Choose a story">
          {STORIES.map((st, k) => (
            <button
              key={st.name}
              role="tab"
              aria-selected={k === i}
              aria-label={st.name}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-10 bg-accent' : 'w-5 bg-text/20 hover:bg-text/40'}`}
            />
          ))}
        </div>

        <div className="mt-10">
          <a
            href={siteConfig.contact.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest px-4 py-2 border border-line rounded-xl bg-surface/50"
          >
            <span>More stories on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}
