import { useRef as useRevealRef } from 'react';
import { useReveal3D } from '../hooks/useReveal3D';
import { useEffect } from 'react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { servicesData } from '../data/services';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RollingCounter from '../components/RollingCounter';
import LogoMarquee from '../sections/LogoMarquee';
import { PLACEMENT, ROLE_STORIES, CERTS } from '../data/site';
import { projectsData } from '../data/projects';

export default function Services() {
  const revealRef = useRevealRef(null);
  useReveal3D(revealRef);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={revealRef} className="pt-28 sm:pt-36 pb-24 bg-bg text-text">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <SectionLabel number="01" label="PLACEMENTS & CAREER SUPPORT" />
        <h1 className="font-headline font-extrabold text-4xl sm:text-6xl lg:text-7xl text-text tracking-tighter leading-[1.02] max-w-4xl">
          Skills that turn <br />
          <span className="text-accent">into job offers.</span>
        </h1>
        <p className="mt-6 text-muted text-lg sm:text-xl max-w-3xl leading-relaxed">
          {PLACEMENT.lead}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14">
          {PLACEMENT.stats.map((st) => (
            <div key={st.id} data-reveal className="p-6 bg-surface/60 border border-line rounded-xl">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4">{st.label}</div>
              <RollingCounter value={st.value} suffix={st.suffix} className="font-headline font-extrabold text-3xl sm:text-5xl text-text" />
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span>OUR PLACEMENT PROCESS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLACEMENT.process.map((st, i) => (
              <div key={st.t} data-reveal className="relative p-6 rounded-3xl border border-line bg-surface/40">
                <div className="font-mono text-3xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-3 font-headline font-extrabold text-xl text-text">{st.t}</div>
                <p className="mt-2 text-muted text-sm leading-relaxed">{st.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List: One Block Per Discipline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-surface/60 border border-line rounded-3xl p-6 sm:p-12"
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 relative rounded-xl overflow-hidden border border-line aspect-[4/3] bg-bg ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-bg/85 px-3 py-1 font-mono text-[10px] text-accent uppercase tracking-widest border border-line">
                  {service.stat}
                </div>
              </div>

              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent" />
                  <span>STEP {service.code} // {service.tabLabel}</span>
                </div>

                <h2 className="font-headline font-extrabold text-2xl sm:text-4xl text-text tracking-[-0.03em]">
                  {service.title}
                </h2>

                <p className="font-mono text-xs text-text/80 italic">
                  "{service.tagline}"
                </p>

                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2.5 pt-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    WHAT YOU GET:
                  </div>
                  <div className="space-y-2 font-mono text-xs text-text/90">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <Button to="/contact" variant="primary" size="md" icon="diagonal">
                    Book Free Counselling
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Certification tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <SectionLabel number="02" label="CERTIFICATIONS" />
        <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.06] max-w-3xl">
          Certified skills. <br />
          <span className="text-accent">Stronger careers.</span>
        </h2>
        <p className="mt-4 text-muted text-base sm:text-lg max-w-3xl leading-relaxed">{CERTS.why}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projectsData.filter((p) => p.course.certs).map((p) => (
            <Link key={p.slug} to={`/courses/${p.slug}`} data-reveal className="group p-6 sm:p-8 rounded-3xl border border-line bg-surface/50 hover:border-accent transition-colors">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-widest uppercase">
                <span className="text-accent">{p.id} · {p.category}</span>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="mt-3 font-headline font-extrabold text-xl sm:text-2xl text-text">{p.fullName} Certification</h3>
              <div className="mt-4 space-y-2 font-mono text-xs text-text/90">
                {p.course.certs.map((x) => (
                  <div key={x} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CERTS.benefits.map((b) => (
            <div key={b.t} data-reveal className="p-5 rounded-xl border border-line bg-bg">
              <div className="font-headline font-extrabold text-lg text-text">{b.t}</div>
              <p className="mt-1 text-muted text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <SectionLabel number="03" label="STUDENT SUCCESS STORIES" />
        <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.06]">
          Placed in <span className="text-accent">top companies.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {ROLE_STORIES.map((st) => (
            <figure key={st.name} data-reveal className="m-0 p-6 rounded-3xl border border-line bg-surface/50 flex flex-col gap-4">
              <div className="text-accent tracking-[3px] text-sm" aria-label="5 out of 5">★★★★★</div>
              <blockquote className="m-0 text-text/85 text-sm leading-relaxed">“{st.q}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent/10 text-accent font-headline font-extrabold flex items-center justify-center">{st.name[0]}</span>
                <span>
                  <span className="block font-headline font-extrabold text-sm text-text">{st.name}</span>
                  <span className="block font-mono text-[10px] tracking-wider uppercase text-muted">{st.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2 font-mono text-xs">
          {PLACEMENT.topPartners.map((t) => (
            <span key={t} className="px-4 py-2 rounded-full border border-line bg-white/60 text-text/85 uppercase tracking-wider">{t}</span>
          ))}
        </div>
      </section>

      <div className="mt-24">
        <LogoMarquee />
      </div>
    </div>
  );
}
