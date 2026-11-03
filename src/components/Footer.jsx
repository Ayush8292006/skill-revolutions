import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Star, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/site';
import { projectsData } from '../data/projects';

export default function Footer() {
  return (
    <footer className="bg-surface relative z-10 hairline-t overflow-hidden">
      {/* Blueprint Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#EEF1F7 1px, transparent 1px), linear-gradient(90deg, #EEF1F7 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 hairline-b">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex bg-white rounded-xl px-3 py-2">
              <img
                src={siteConfig.logo}
                alt="Skill Revolution"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-sm">
              India's trusted training academy offering Medical Billing & Coding, Azure Data Engineering, DevOps with Multi-Cloud, and Cybersecurity programs.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-line rounded-xl flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors bg-bg/50"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-line rounded-xl flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors bg-bg/50"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 h-10 border border-line rounded-xl text-xs font-mono text-muted hover:text-accent hover:border-accent transition-colors bg-bg/50"
                aria-label="LinkedIn"
              >
                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
              <span className="w-1 h-1 bg-accent" />
              <span>NAVIGATION</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-muted">
              {['Home', 'Courses', 'About', 'Placements', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="hover:text-text transition-colors flex items-center gap-1 group py-0.5"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-accent transition-opacity">›</span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Portfolio */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
              <span className="w-1 h-1 bg-accent" />
              <span>OUR COURSES</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-muted">
              {projectsData.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/courses/${project.slug}`}
                    className="hover:text-accent transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>{project.name}</span>
                    <span className="text-[10px] text-muted/50 group-hover:text-accent">
                      {project.id}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
              <span className="w-1 h-1 bg-accent" />
              <span>GET IN TOUCH</span>
            </div>
            <div className="space-y-3 text-xs text-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <div className="flex flex-col font-mono">
                  <a href={`tel:${siteConfig.contact.phonePrimary}`} className="hover:text-text">
                    {siteConfig.contact.phonePrimary}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="font-mono hover:text-text">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Dark Styled Map */}
        <div className="py-8 hairline-b">
          <div className="rounded-3xl overflow-hidden border border-line h-48 sm:h-56 w-full relative">
            <iframe
              title="Skill Revolution location"
              src="https://maps.google.com/maps?q=Vyjayanthi%20Hospitals%2C%20SR%20Nagar%2C%20Hyderabad&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'sepia(18%) saturate(85%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-3 left-3 bg-bg/90 px-3 py-1.5 border border-line rounded-xl font-mono text-[10px] uppercase tracking-wider text-text flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span>SR Nagar · Hyderabad</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted/70">
          <div>
            © {new Date().getFullYear()} Skill Revolution. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>INDUSTRY-FOCUSED TRAINING</span>
            <span>CERTIFICATION · PLACEMENT</span>
            <span className="text-accent/80">AI CANNOT BEAT SKILL REVOLUTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

