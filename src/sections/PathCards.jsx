import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Tilt from '../components/Tilt';
import SectionLabel from '../components/SectionLabel';
import { projectsData } from '../data/projects';

const paths = [
  {
    code: "01",
    tag: "IT & CLOUD",
    intent: "I want a tech career",
    description: "Azure Data Engineering, DevOps with Multi-Cloud, Cyber Security and Digital Marketing — taught through real-time industry projects.",
    cta: "Explore IT Courses",
    link: "/courses/azure-data-engineering",
    image: projectsData[0].image,
  },
  {
    code: "02",
    tag: "HEALTHCARE",
    intent: "I want to work in healthcare",
    description: "Medical Billing and Medical Coding with AAPC & CPC certification focus, RCM workflow simulations and placement in top healthcare companies.",
    cta: "Explore Healthcare",
    link: "/courses/medical-coding",
    image: projectsData[4].image,
  },
  {
    code: "03",
    tag: "ENGINEERING & SKILLS",
    intent: "I want core skills and confidence",
    description: "Electrical Engineering with 36+ live industrial practicals and licence guidance, plus Spoken English for communication and interviews.",
    cta: "Explore Engineering",
    link: "/courses/electrical-engineering",
    image: projectsData[5].image,
  },
];

export default function PathCards() {
  return (
    <section className="py-24 sm:py-32 bg-surface/30 border-t border-line relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-20">
          <SectionLabel number="04" label="CHOOSE YOUR PATH" />
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] max-w-2xl leading-[1.08]">
            Start with one goal. <br />
            <span className="text-accent">Learn at your own pace.</span>
          </h2>
        </div>

        {/* 3 Tall Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((card) => (
            <Tilt
              as={Link}
              data-reveal
              max={8}
              key={card.code}
              to={card.link}
              className="group relative flex flex-col justify-between h-[480px] sm:h-[540px] rounded-3xl border border-line bg-surface overflow-hidden p-7 sm:p-8 transition-[border-color,box-shadow] duration-500 hover:border-accent shadow-[0_10px_30px_rgba(70,48,18,0.20)]"
            >
              {/* Background Image with overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={card.image}
                  alt={card.intent}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-bg via-bg/90 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
              </div>

              {/* Top metadata */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white drop-shadow">
                    {card.code}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white mt-1 drop-shadow">
                    {card.tag}
                  </span>
                </div>
                <div className="w-9 h-9 border border-line rounded-xl bg-bg/60 flex items-center justify-center text-muted group-hover:text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>

              {/* Bottom text */}
              <div className="relative z-10 space-y-3">
                <div className="font-mono text-xs text-accent uppercase tracking-wider">
                  "{card.intent}"
                </div>
                <p className="text-muted text-sm leading-relaxed font-normal">
                  {card.description}
                </p>
                <div className="pt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text font-semibold group-hover:text-accent transition-colors">
                  <span>{card.cta}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Accent hover bottom line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

