import Marquee from '../components/Marquee';
import SectionLabel from '../components/SectionLabel';
import { tieUpPartners, bankPartners } from '../data/partners';

export default function LogoMarquee() {
  return (
    <section className="py-20 sm:py-28 bg-surface/50 border-y border-line overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <SectionLabel number="02" label="TRUSTED BY INDUSTRY LEADERS" />
        <h2 className="font-headline font-extrabold text-2xl sm:text-4xl text-text tracking-[-0.03em] max-w-2xl">
          Our hiring partners — leading healthcare, IT and multinational companies.
        </h2>
      </div>

      {/* Tilted 3D plane carrying both marquee rows */}
      <div className="[perspective:1100px]">
      <div className="[transform:rotateX(22deg)_rotateZ(-3deg)] [transform-style:preserve-3d] origin-center [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      {/* Row 1: Construction & Material Brands */}
      <div className="mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <span className="font-mono text-[11px] text-muted tracking-widest uppercase">
            IT · CLOUD · MULTINATIONAL
          </span>
        </div>
        <Marquee speed="40s">
          {tieUpPartners.map((partner) => (
            <div
              key={'a'+partner.id}
              className="group flex items-center justify-center px-6 py-4 rounded-2xl bg-white/95 border border-line shadow-[0_18px_40px_-22px_rgba(70,48,18,0.35)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(214,42,51,0.45)] transition-all duration-300 min-w-[170px] sm:min-w-[200px] h-20"
            >
              <img
                src={partner.image}
                alt={partner.name}
                loading="lazy"
                className="max-h-10 sm:max-h-12 w-auto object-contain  group-hover:scale-105 transition-all duration-300 opacity-80 group-hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Row 2: Bank Partners in Reverse Direction */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <span className="font-mono text-[11px] text-muted tracking-widest uppercase">
            HEALTHCARE · RCM · ENGINEERING
          </span>
        </div>
        <Marquee speed="45s" reverse>
          {bankPartners.map((bank) => (
            <div
              key={'b'+bank.id}
              className="group flex items-center justify-center px-6 py-4 rounded-2xl bg-white/95 border border-line shadow-[0_18px_40px_-22px_rgba(70,48,18,0.35)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(214,42,51,0.45)] transition-all duration-300 min-w-[170px] sm:min-w-[200px] h-20"
            >
              <img
                src={bank.image}
                alt={bank.name}
                loading="lazy"
                className="max-h-10 sm:max-h-12 w-auto object-contain  group-hover:scale-105 transition-all duration-300 opacity-80 group-hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </div>
      </div>
      </div>
    </section>
  );
}

