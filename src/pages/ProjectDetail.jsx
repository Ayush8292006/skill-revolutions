import { useRef as useRevealRef } from 'react';
import { useReveal3D } from '../hooks/useReveal3D';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import Tilt from '../components/Tilt';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const Block = ({ label, title, children }) => (
  <div data-reveal className="space-y-5">
    <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-accent" />
      <span>{label}</span>
    </div>
    {title && <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-text tracking-[-0.03em]">{title}</h2>}
    {children}
  </div>
);

const Ticks = ({ items }) => (
  <div className="space-y-3 font-mono text-xs text-text/90">
    {items.map((h) => (
      <div key={h} className="flex items-start gap-3 p-3.5 bg-surface/60 border border-line rounded-xl">
        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <span className="leading-relaxed">{h}</span>
      </div>
    ))}
  </div>
);

const Chips = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((x) => (
      <span key={x} className="px-3.5 py-2 rounded-full border border-line bg-white/60 font-mono text-[11px] uppercase tracking-wider text-text/85">
        {x}
      </span>
    ))}
  </div>
);

export default function ProjectDetail() {
  const revealRef = useRevealRef(null);
  useReveal3D(revealRef);
  const { slug } = useParams();
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="pt-40 pb-24 text-center max-w-lg mx-auto px-4">
        <h1 className="font-headline font-extrabold text-3xl mb-4">Course not found</h1>
        <Button to="/courses" variant="primary">See all courses</Button>
      </div>
    );
  }

  const c = project.course;
  const next = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div ref={revealRef} className="pt-28 sm:pt-36 pb-24 bg-bg text-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/courses" className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent uppercase tracking-wider mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all courses</span>
        </Link>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <SectionLabel number={project.id} label={project.category} />
            <h1 className="font-headline font-extrabold text-4xl sm:text-6xl text-text tracking-[-0.03em] leading-[1.05]">{project.fullName}</h1>
            <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl leading-relaxed">{project.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" variant="primary" icon="diagonal">Enroll in this course</Button>
              <Button href={`tel:+917337280838`} size="lg" variant="outline" icon="right">Call +91 73372 80838</Button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-surface/60 border border-line rounded-3xl p-6 space-y-4 font-mono text-xs">
            {c.meta.map(([k, v], i) => (
              <div key={k} className={`flex items-center justify-between gap-4 ${i < c.meta.length - 1 ? 'border-b border-line pb-3' : ''}`}>
                <span className="text-muted uppercase">{k}</span>
                <span className={`font-bold text-right ${i === 0 ? 'text-accent' : 'text-text'}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <Tilt max={4} className="rounded-3xl overflow-hidden border border-line bg-surface mb-16 shadow-[0_20px_50px_rgba(70,48,18,0.24)]">
          <img src={project.image} alt={project.name} className="w-full h-[320px] sm:h-[520px] object-cover" />
        </Tilt>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-7 space-y-14">
            {c.modules && (
              <Block label={c.modules.title} title="What you will learn.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {c.modules.items.map((m, i) => (
                    <div key={m} className="flex items-start gap-3 p-3.5 bg-surface/60 border border-line rounded-xl font-mono text-xs">
                      <span className="text-accent font-bold">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-text/90 leading-relaxed">{m}</span>
                    </div>
                  ))}
                </div>
              </Block>
            )}
            {c.audience && (
              <Block label="Who can join?">
                <Chips items={c.audience} />
              </Block>
            )}
            {c.projects && (
              <Block label={c.projects.title} title="Hands-on, real-time projects.">
                {c.projects.intro && <p className="text-muted leading-relaxed">{c.projects.intro}</p>}
                <Ticks items={c.projects.items} />
                {c.projects.outro && <p className="font-mono text-xs text-text/80">// {c.projects.outro}</p>}
              </Block>
            )}
            {c.includes && (
              <Block label={c.includes.title}>
                <Ticks items={c.includes.items} />
              </Block>
            )}
            {c.industries && (
              <Block label="Industries hiring">
                <Chips items={c.industries} />
              </Block>
            )}
            {c.limited && (
              <p className="font-mono text-xs text-muted">// Batch timings and the full curriculum are shared during your free counselling call.</p>
            )}
          </div>

          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
            {c.placement && (
              <Block label="Placement assistance">
                <p className="text-muted text-sm leading-relaxed">{c.placement.intro}</p>
                <div className="border border-line rounded-xl overflow-hidden bg-surface font-mono text-xs">
                  {c.placement.items.map((v, idx) => (
                    <div key={v} className={`flex items-center gap-3 p-3.5 ${idx ? 'border-t border-line' : ''}`}>
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-text">{v}</span>
                    </div>
                  ))}
                </div>
              </Block>
            )}
            {c.careers && (
              <Block label="Career opportunities">
                <Chips items={c.careers} />
                {c.note && <p className="font-mono text-xs text-text/80">// {c.note}</p>}
              </Block>
            )}
            {c.certs && (
              <Block label="Certification guidance">
                <Ticks items={c.certs} />
              </Block>
            )}
          </div>
        </div>

        {/* Next course */}
        <div className="pt-12 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to={`/courses/${next.slug}`} className="group flex items-center gap-4 text-left">
            <div className="w-12 h-12 border border-line rounded-xl bg-surface flex items-center justify-center text-muted group-hover:text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300">
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest">NEXT COURSE ({next.id})</div>
              <div className="font-headline font-extrabold text-xl text-text group-hover:text-accent transition-colors">{next.name} →</div>
            </div>
          </Link>
          <Button to="/contact" size="md" variant="primary" icon="diagonal">Book Free Counselling</Button>
        </div>
      </div>
    </div>
  );
}
