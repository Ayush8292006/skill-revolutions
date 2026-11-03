import { useMemo, useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import RollingCounter from '../components/RollingCounter';
import Button from '../components/Button';
import { projectsData } from '../data/projects';
import { Check } from 'lucide-react';

/* Career Planner — same interactive "engine" layout as the original cost
   estimator: pick a domain, a program, your background and a batch, and the
   right-hand panel rolls the numbers for that program. */

const DOMAINS = ['IT & Cloud', 'Healthcare', 'Engineering', 'Digital & Communication'];
const BACKGROUNDS = ['B.Tech / Degree', 'Diploma', 'ITI', 'Working professional'];
const BATCHES = ['Weekday', 'Weekend', 'Online'];

const weeksOf = (c) => {
  const d = c.course.meta.find(([k]) => /duration/i.test(k));
  if (!d) return 8;
  const nums = d[1].match(/\d+/g) || ['8'];
  return Number(nums[nums.length - 1]);
};

export default function CostEstimator() {
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [slug, setSlug] = useState(projectsData[0].slug);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [batch, setBatch] = useState(BATCHES[0]);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const options = projectsData.filter((p) => p.category === domain);
  const selected = options.find((p) => p.slug === slug) || options[0];
  const c = selected.course;

  const numbers = useMemo(() => {
    const modules = (c.modules?.items || c.includes?.items || []).length;
    const projects = (c.projects?.items || []).length;
    const roles = (c.careers || c.placement?.items || []).length;
    return { weeks: weeksOf(selected), modules, projects, roles };
  }, [c, selected]);

  // learning-time split shown as the allocation bar
  const split = c.projects ? [45, 30, 15, 10] : [55, 20, 15, 10];
  const legend = ['Concept training', 'Projects & labs', 'Certification prep', 'Interview & placement'];
  const colors = ['bg-accent', 'bg-[#e8565d]', 'bg-accent-2', 'bg-[#c9b07a]'];

  const pickDomain = (d) => {
    setDomain(d);
    const first = projectsData.find((p) => p.category === d);
    if (first) setSlug(first.slug);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 10) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-bg border-t border-line relative overflow-hidden" id="career-planner">
      <div className="bp-floor opacity-70" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#16192A 1px, transparent 1px), linear-gradient(90deg, #16192A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <SectionLabel number="05" label="CAREER PLANNER" />
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.05]">
              Which course <br />
              <span className="text-accent">fits your career?</span>
            </h2>
          </div>
          <p className="text-muted text-sm sm:text-base max-w-md font-mono">
            // Pick a domain and program to see duration, modules, projects and career roles.
          </p>
        </div>

        <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-surface/60 border border-line rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(70,48,18,0.18)]">
          {/* Inputs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="font-mono text-xs text-muted uppercase tracking-widest">01. CHOOSE A DOMAIN</div>
              <div className="grid grid-cols-2 gap-2.5">
                {DOMAINS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => pickDomain(d)}
                    className={`p-3.5 rounded-xl border font-mono text-left text-xs uppercase transition-all ${
                      domain === d ? 'border-accent bg-accent/10 text-text font-bold' : 'border-line bg-bg/50 text-muted hover:border-lineLight'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-muted uppercase tracking-widest">02. SELECT A PROGRAM</span>
                <span className="text-accent font-bold text-sm">{options.length} available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setSlug(p.slug)}
                    className={`p-3.5 rounded-xl border font-mono text-left transition-all ${
                      selected.slug === p.slug ? 'border-accent bg-accent/10 text-text' : 'border-line bg-bg/50 text-muted hover:border-lineLight'
                    }`}
                  >
                    <div className="text-xs uppercase font-bold text-accent">{p.id}</div>
                    <div className="text-[12px] text-text/90 mt-1">{p.name}</div>
                  </button>
                ))}
              </div>
              <p className="font-mono text-[11px] text-muted/90 leading-relaxed pt-1">{selected.blurb}</p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs text-muted uppercase tracking-widest">03. YOUR BACKGROUND</div>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBackground(b)}
                    className={`px-3.5 py-2 rounded-full border font-mono text-[11px] uppercase tracking-wider transition-all ${
                      background === b ? 'border-accent bg-accent text-white' : 'border-line bg-bg/50 text-muted hover:border-lineLight'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-line flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-text font-bold uppercase tracking-wider">04. PREFERRED BATCH</span>
                <span className="font-mono text-[11px] text-muted">Classroom at SR Nagar or live online sessions</span>
              </div>
              <div className="flex gap-1.5">
                {BATCHES.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBatch(b)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider border transition-all ${
                      batch === b ? 'bg-text text-bg border-text' : 'border-line text-muted hover:border-lineLight'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-bg/70 border border-line rounded-xl p-6 sm:p-8 relative">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-muted mb-2">
                <span>WEEKS TO JOB-READY</span>
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 border border-accent/20">{selected.category.toUpperCase()}</span>
              </div>

              <div className="py-4 border-b border-line">
                <div className="flex items-baseline gap-3">
                  <RollingCounter value={numbers.weeks} className="font-headline font-extrabold text-5xl sm:text-6xl lg:text-7xl text-text tracking-[-0.03em]" />
                  <span className="font-mono text-xl sm:text-2xl text-accent font-bold">WEEKS</span>
                </div>
                <div className="font-mono text-xs text-muted mt-2">
                  {selected.fullName} · {batch} batch · {background}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 py-5 border-b border-line">
                {[
                  ['MODULES', numbers.modules],
                  ['PROJECTS', numbers.projects],
                  ['CAREER ROLES', numbers.roles],
                ].map(([l, v]) => (
                  <div key={l}>
                    <RollingCounter value={v} className="font-headline font-extrabold text-3xl text-text" />
                    <div className="font-mono text-[10px] tracking-widest text-muted mt-1">{l}</div>
                  </div>
                ))}
              </div>

              <div className="py-6 space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted flex justify-between">
                  <span>LEARNING TIME ALLOCATION</span>
                  <span className="text-text">PRACTICAL FIRST</span>
                </div>
                <div className="w-full h-3 bg-surfaceLight flex overflow-hidden border border-line">
                  {split.map((w, i) => (
                    <div key={i} style={{ width: `${w}%` }} className={`${colors[i]} h-full transition-all duration-500`} title={legend[i]} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                  {legend.map((l, i) => (
                    <div key={l} className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 inline-block ${colors[i]}`} />
                      <span className="text-muted">{l}:</span>
                      <span className="text-text font-bold">{split[i]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-line mt-4">
              {submitted ? (
                <div className="p-4 bg-accent/10 border border-accent/40 rounded-xl font-mono text-xs text-text flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0" />
                  <span>Thanks! A counsellor will call you about {selected.name} batch timings and fees.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="font-mono text-[11px] text-muted uppercase tracking-wider">GET BATCH TIMINGS & FEES ON CALL</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="flex-1 bg-surface/60 border border-line px-4 py-3 font-mono text-xs text-text placeholder:text-muted/60 rounded-xl focus:outline-none focus:border-accent"
                    />
                    <Button type="submit" variant="primary" size="md" icon="diagonal">
                      Request Call
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
