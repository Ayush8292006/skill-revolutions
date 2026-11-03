// "Services" in the original codebase = Skill Revolution's training & career-support offer.
import { US, img } from './site';

export const servicesData = [
  {
    id: 'training',
    code: '01',
    tabLabel: 'TRAINING',
    title: 'Industry-Focused Training',
    tagline: 'Learn from people who do the job.',
    description:
      'Industry-oriented programs in IT, Healthcare, Engineering and Digital Technologies. Learn from experienced mentors and certified experts, with courses designed according to current market demands.',
    deliverables: [
      'Expert trainers with real-world industry experience',
      'Curriculum built around current employer expectations',
      'Online and offline (classroom) training',
      'Weekday and weekend batches',
    ],
    image: US('photo-1523240795612-9a054b0db644', 1200),
    stat: 'Expert Trainers',
  },
  {
    id: 'projects',
    code: '02',
    tabLabel: 'LIVE PROJECTS',
    title: 'Real-Time Projects & Practical Labs',
    tagline: 'Build a portfolio before your first interview.',
    description:
      'Gain practical, hands-on experience through real-time industry projects designed to simulate actual business environments — from cloud pipelines to medical billing cycles and industrial control panels.',
    deliverables: [
      'Azure Data Factory, Synapse & Databricks projects',
      'Kubernetes, CI/CD, Terraform & Ansible automation',
      'Vulnerability analysis & incident response simulations',
      'Mock billing projects, RCM workflows & 36+ industrial practicals',
    ],
    image: img('v1780923497/devop_2_rwia8z.jpg', 'f_auto,q_auto,w_1200'),
    stat: 'Hands-on Learning',
  },
  {
    id: 'certification',
    code: '03',
    tabLabel: 'CERTIFICATION',
    title: 'Industry-Recognised Certification Guidance',
    tagline: 'Proof of skill that employers trust.',
    description:
      'Certifications are awarded after successful completion of training, projects, and assessments. They demonstrate practical skills and industry readiness to employers.',
    deliverables: [
      'DP-203 Azure Data Engineering preparation',
      'CompTIA Security+, ISC2 CC, CISSP & CCSP guidance',
      'CPC (AAPC) coding and billing certification focus',
      '33 kV / 11 kV Supervisor and Wireman licence guidance',
    ],
    image: img('v1773044102/medical-banner-with-doctor-working-laptop_yeavvt.jpg', 'f_auto,q_auto,w_1200'),
    stat: 'Project Based',
  },
  {
    id: 'resume',
    code: '04',
    tabLabel: 'RESUME & LINKEDIN',
    title: 'Resume Building & LinkedIn Optimization',
    tagline: 'Get noticed by recruiters.',
    description:
      'Our placement team turns your training and projects into a professional resume and LinkedIn profile that stand out in competitive job markets.',
    deliverables: [
      'Professional resume building',
      'LinkedIn profile optimization',
      'Project portfolio for interviews',
      'Career guidance sessions',
    ],
    image: US('photo-1460925895917-afdab827c52f', 1200),
    stat: 'Resume Value',
  },
  {
    id: 'interviews',
    code: '05',
    tabLabel: 'MOCK INTERVIEWS',
    title: 'Mock Technical & HR Interviews',
    tagline: 'Walk into interviews prepared.',
    description:
      'Mock technical interviews and interview preparation with domain experts help students crack multiple interviews with confidence.',
    deliverables: [
      'Mock technical interviews',
      'Interview preparation with domain experts',
      'Mock certification tests',
      'Communication and fluency practice',
    ],
    image: US('photo-1517048676732-d65bc937f952', 1200),
    stat: 'Interview Ready',
  },
  {
    id: 'placement',
    code: '06',
    tabLabel: 'PLACEMENT',
    title: 'Job Referrals & Placement Assistance',
    tagline: 'From classroom to job offer.',
    description:
      'Dedicated support for interviews, resumes, and job placement — 1200+ students placed with 100% placement assistance and an average package of 6 LPA.',
    deliverables: [
      'Job referrals with hiring partners',
      '100% placement assistance',
      'Foreign country job preparation (Electrical)',
      'Self-employment guidance',
    ],
    image: img('v1780923339/cyber_iqly9f.jpg', 'f_auto,q_auto,w_1200'),
    stat: '1200+ Placed',
  },
];
