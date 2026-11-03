import { Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { siteConfig } from '../data/site';
import Tilt from '../components/Tilt';

export default function AboutIntro() {
  return (
    <section className="py-24 sm:py-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <SectionLabel number="03" label="WELCOME TO SKILL REVOLUTION" />
            
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-text tracking-[-0.03em] leading-[1.05]">
              Empowering careers <br />
              <span className="text-accent">through real skills.</span>
            </h2>

            <p className="text-muted text-base sm:text-lg leading-relaxed pt-2">
              Skill Revolution provides industry-oriented training programs designed to help students and professionals build successful careers in IT, Healthcare, Engineering, and Digital Technologies.
            </p>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              With over 10 years of experience, we bridge academic learning and industry expectations. Learn from experienced mentors, gain practical knowledge through real-time projects, and receive dedicated placement support.
            </p>

            {/* Architectural Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-text/90">
              <div className="flex items-center gap-2.5 p-3 bg-surface/70 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Expert Industry Trainers</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-surface/70 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Real-Time Projects & Labs</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-surface/70 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>Online, Offline & Weekend Batches</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-surface/70 border border-line rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>100% Placement Assistance</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button to="/about" variant="primary" size="md" icon="diagonal">
                Read Our Story
              </Button>
              <Button to="/courses" variant="outline" size="md" icon="right">
                Explore Courses
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Visual */}
          <div className="lg:col-span-5 relative">
            <Tilt max={7} className="group overflow-hidden rounded-3xl border border-line bg-surface">
              {/* Corner crosshairs like Terminal CAD */}
              <div className="absolute top-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-accent bg-bg/80 px-2 py-0.5 border border-line">
                SKILL REVOLUTION · CLASSROOM
              </div>
              <div className="absolute bottom-3 right-3 z-20 font-mono text-[9px] uppercase tracking-widest text-text/80 bg-bg/80 px-2 py-0.5 border border-line">
                SR NAGAR, HYDERABAD
              </div>

              <img
                src={siteConfig.images.students}
                alt="Students learning at Skill Revolution"
                loading="lazy"
                className="w-full h-[420px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent pointer-events-none" />
            </Tilt>
          </div>
        </div>

        {/* Big Call Strip */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-8 bg-surface/60 border border-line rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute left-0 top-0 w-1 h-full bg-accent" />
          <div className="flex flex-col text-left">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span>ADMISSIONS HOTLINE</span>
            </span>
            <span className="text-text text-sm sm:text-base font-medium">
              Not sure which course fits you? Talk to a counsellor today — it's free.
            </span>
          </div>

          <a
            href={`tel:${siteConfig.contact.phonePrimary}`}
            className="flex items-center gap-3 sm:gap-4 px-6 py-3.5 bg-bg/90 border border-accent/40 rounded-xl text-accent hover:border-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            <Phone className="w-5 h-5 shrink-0" />
            <div className="flex flex-col text-left font-mono">
              <span className="text-[10px] tracking-widest uppercase opacity-75">CALL US TODAY</span>
              <span className="text-base sm:text-xl font-bold tracking-tight text-inherit">
                {siteConfig.contact.phoneDisplay}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

