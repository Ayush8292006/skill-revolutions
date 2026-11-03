import { useRef as useRevealRef } from 'react';
import { useReveal3D } from '../hooks/useReveal3D';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { projectsData } from '../data/projects';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const categories = ['ALL', 'IT & CLOUD', 'HEALTHCARE', 'ENGINEERING', 'DIGITAL & COMMUNICATION'];

export default function Projects() {
  const revealRef = useRevealRef(null);
  useReveal3D(revealRef);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === 'ALL') return true;
    return p.category.toUpperCase() === activeCategory;
  });

  return (
    <div ref={revealRef} className="pt-28 sm:pt-36 pb-24 bg-bg text-text">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <SectionLabel number="01" label="PROFESSIONAL TRAINING PROGRAMS" />
        <h1 className="font-headline font-extrabold text-4xl sm:text-6xl lg:text-7xl text-text tracking-tighter leading-[1.02] max-w-4xl">
          Courses that <br />
          <span className="text-accent">get you hired.</span>
        </h1>
        <p className="mt-6 text-muted text-lg sm:text-xl max-w-3xl leading-relaxed">
          Industry-focused training programs designed to help students and professionals build successful careers with practical skills, certification guidance, and placement support.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-8 border-b border-line pb-4 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all tracking-wider ${
                activeCategory === cat
                  ? 'bg-accent text-white font-bold'
                  : 'bg-surface/60 border border-line text-muted hover:text-text hover:border-lineLight'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/courses/${project.slug}`}
              className="group relative flex flex-col justify-between h-[520px] rounded-3xl border border-line bg-surface overflow-hidden p-7 hover:border-accent transition-[border-color,box-shadow] duration-500 shadow-[0_15px_40px_rgba(70,48,18,0.20)]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-bg via-bg/90 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="font-mono text-2xl font-bold text-white drop-shadow">
                    {project.id}
                  </span>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white mt-1 drop-shadow">
                    {project.category}
                  </div>
                </div>
                <div className="w-10 h-10 border border-line rounded-xl bg-bg/70 flex items-center justify-center text-muted group-hover:text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 space-y-2">
                <div className="font-mono text-xs text-accent uppercase tracking-wider">
                  {project.location} · {project.area}
                </div>
                <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-text tracking-[-0.03em] group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted text-xs line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>
                <div className="pt-2 flex items-center gap-1.5 font-mono text-xs text-text font-semibold uppercase tracking-wider group-hover:text-accent">
                  <span>View Course Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

