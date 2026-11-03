// Skill Revolution — content from skillrevolution.in (Home, About, Courses, Certifications, Placements, Contact)
export const CDN = 'https://res.cloudinary.com/deyfsl3w8/image/upload/';
export const img = (path, t = 'f_auto,q_auto') => `${CDN}${t}/${path}`;
export const US = (id, w = 1400) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const siteConfig = {
  name: 'Skill Revolution',
  shortName: 'Skill Revolution',
  tagline: 'AI cannot beat Skill Revolution',
  description:
    'Skill Revolution provides industry-oriented training programs designed to help students and professionals build successful careers in IT, Healthcare, Engineering, and Digital Technologies.',
  foundedYear: 2015,
  logo: img('v1781027902/logo_skill_oudfjs.jpg', 'f_auto,q_auto,h_90'),

  images: {
    students: US('photo-1523240795612-9a054b0db644'),
    about: US('photo-1522202176988-66273c2fd55f'),
    classroom: US('photo-1517048676732-d65bc937f952'),
  },

  contact: {
    address: '1st Floor, Ramakrishna Nivas, Flat #103 (beside Vyjayanthi Hospitals, SR Nagar), Hyderabad, Telangana, India',
    addressShort: 'SR Nagar, Hyderabad',
    phonePrimary: '+91 73372 80838',
    phoneSecondary: '',
    phoneDisplay: '+91 73372 80838',
    email: 'info@sredu.tech',
    whatsapp: '917337280838',
    whatsappLink: 'https://wa.me/917337280838?text=Hi%20Skill%20Revolution%2C%20I%20would%20like%20to%20know%20about%20your%20courses.',
    mapUrl: 'https://maps.google.com/?q=Vyjayanthi+Hospitals+SR+Nagar+Hyderabad',
    googleReviewsUrl: 'https://www.instagram.com/skill_revolution_07/',
  },

  socials: {
    instagram: 'https://www.instagram.com/skill_revolution_07/',
    facebook: 'https://www.facebook.com/profile.php?id=61587118714811',
    linkedin: 'https://www.linkedin.com/company/skill-revolution/',
  },

  stats: [
    { id: 'trained', label: 'STUDENTS TRAINED', value: 2000, prefix: '', suffix: '+', description: 'Students have built careers in top healthcare and IT companies across India.' },
    { id: 'placed', label: 'STUDENTS PLACED', value: 1200, prefix: '', suffix: '+', description: 'Placed through resume building, mock interviews and job referrals.' },
    { id: 'partners', label: 'HIRING PARTNERS', value: 100, prefix: '', suffix: '+', description: 'Leading healthcare, IT and multinational companies hire our learners.' },
    { id: 'package', label: 'AVERAGE PACKAGE', value: 6, prefix: '', suffix: ' LPA', description: '100% placement assistance with dedicated career support.' },
  ],
};

const face = 'f_auto,q_auto,w_240,h_240,c_fill,g_face';
export const STORIES = [
  { name: 'Ashwini Shetty', role: 'Placed at Optum', photo: img('v1773044844/7_u2zwuh.png', face), q: "The trainers explained every concept clearly and the placement team guided me throughout the interview process. I'm grateful for the support and mentorship." },
  { name: 'Ambika', role: 'Placed at Cognizant', photo: img('v1773044843/6_modmhu.png', face), q: 'Excellent learning environment with practical sessions and real-time projects. The training boosted my confidence and technical skills significantly.' },
  { name: 'Prathap Chowdary', role: 'Placed at Accenture', photo: img('v1773044842/5_fe7u2i.png', face), q: 'The mock interviews and resume preparation sessions helped me crack multiple interviews. A great place to start your career journey.' },
  { name: 'Anwar Syed', role: 'Placed at HCL', photo: img('v1773044841/4_zhtpyu.jpg', face), q: 'The faculty members are highly experienced and always ready to help. Their industry insights made learning much more effective.' },
  { name: 'Acharya', role: 'Placed at Wipro', photo: img('v1773044840/3_hhm0cp.png', face), q: 'I joined with very little knowledge, but the structured curriculum and hands-on training helped me secure a job in a reputed company.' },
  { name: 'Guru Naik', role: 'Placed at HCL', photo: img('v1773044839/2_cwgwpx.png', face), q: 'The institute provided excellent career guidance, technical training, and interview preparation. It played a major role in my success.' },
  { name: 'Devi Goud', role: 'Placed at Accenture', photo: img('v1773044631/1_bb19i1.png', face), q: 'From training to placement support, everything was handled professionally. The mentors genuinely care about student growth and success.' },
];

export const ROLE_STORIES = [
  { name: 'Rahul Kumar', role: 'Medical Coder · AGS Healthcare', q: 'I had a fantastic experience at Skill Revolution. The curriculum is incredibly practical and aligned perfectly with current industry standards.' },
  { name: 'Priya Sharma', role: 'Associate Data Engineer · Accenture', q: 'Excellent institute with a well-structured curriculum and highly professional trainers. The hands-on assignments made learning easier.' },
  { name: 'Vinay', role: 'Cyber Security Analyst · Infosys', q: 'The trainers are highly knowledgeable, patient, and bring genuine industry expertise to the classroom.' },
  { name: 'Mani Kumar', role: 'AWS DevOps Engineer · Infosys', q: 'The learning environment is incredibly supportive. Mentors provide excellent guidance throughout the journey.' },
  { name: 'Shiva Kumar Yadav', role: 'Azure DevOps Engineer · HCL', q: 'The batch sizes are well-managed, ensuring every student gets personal attention and support.' },
  { name: 'Akshita', role: 'RCM Specialist · Optum Healthcare', q: 'Great institute with an excellent learning environment. Trainers are highly knowledgeable and friendly.' },
  { name: 'Deepika', role: 'Azure Data Engineer · Infosys', q: 'The training quality is top-notch, and mentors genuinely care about student progress.' },
  { name: 'Satyarth', role: 'Electrical Engineer · Symed Labs', q: 'Perfect place for beginners. Complex topics are broken down into simple step-by-step modules.' },
];

export const PLACEMENT = {
  lead: 'We help students transform their skills into successful careers through industry-focused training and placement assistance.',
  stats: [
    { id: 'placed', label: 'STUDENTS PLACED', value: 1200, suffix: '+' },
    { id: 'companies', label: 'HIRING COMPANIES', value: 80, suffix: '+' },
    { id: 'assist', label: 'PLACEMENT ASSISTANCE', value: 100, suffix: '%' },
    { id: 'pkg', label: 'AVERAGE PACKAGE', value: 6, suffix: ' LPA' },
  ],
  process: [
    { t: 'Skill Training', d: 'Industry-focused training with expert trainers and real-time projects.' },
    { t: 'Resume Building', d: 'Professional resume and LinkedIn profile optimization.' },
    { t: 'Mock Interviews', d: 'Technical and HR mock interviews with career guidance.' },
    { t: 'Job Placement', d: 'Job referrals and placement assistance with hiring partners.' },
  ],
  topPartners: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant', 'Tech Mahindra', 'HCL'],
};

export const ABOUT = {
  lead: 'Empowering students and professionals with industry-ready skills, practical experience, and career opportunities.',
  who: [
    'At Skill Revolution, we are committed to shaping successful careers through high-quality, industry-focused training and professional development. With over 10 years of experience, we empower learners with real-world skills.',
    'Our programs bridge academic learning and industry expectations with practical training.',
    'We offer courses in Medical Billing & Coding, Azure Data Engineering, DevOps, Cyber Security, and Electrical Engineering.',
    'We mentor, guide, and support learners throughout their career journey to ensure long-term success.',
  ],
  pillars: [
    { t: 'Our Mission', d: 'To deliver industry-focused training that builds job-ready skills through practical learning and expert mentorship.' },
    { t: 'Our Vision', d: 'To become a trusted global training institute empowering learners to achieve career excellence through innovation.' },
    { t: 'Our Goal', d: 'To create a skilled workforce by delivering high-quality training and career opportunities for long-term success.' },
  ],
  values: [
    { t: 'Excellence', d: 'We strive for excellence in training, mentoring, and student success.' },
    { t: 'Integrity', d: 'We deliver ethical, transparent, and responsible training with trust and honesty.' },
    { t: 'Commitment', d: 'Dedicated support and continuous guidance for every learner’s success.' },
    { t: 'Growth Mindset', d: 'Continuous improvement and innovation to keep learners future-ready.' },
    { t: 'Quality', d: 'Industry-standard training with practical, job-ready skills.' },
    { t: 'Collaboration', d: 'Strong partnerships with learners and companies for shared success.' },
  ],
  stats: [
    { id: 'trained', label: 'STUDENTS TRAINED', value: 2000, suffix: '+' },
    { id: 'partners', label: 'HIRING PARTNERS', value: 100, suffix: '+' },
    { id: 'courses', label: 'PROFESSIONAL COURSES', value: 50, suffix: '+' },
    { id: 'sat', label: 'STUDENT SATISFACTION', value: 95, suffix: '%' },
  ],
};

export const CERTS = {
  lead: 'Earn industry-recognized certifications that validate your skills and enhance your career opportunities.',
  why: 'Our certifications are awarded after successful completion of training, projects, and assessments. They demonstrate practical skills and industry readiness to employers.',
  features: [
    { t: 'Industry Relevant', d: 'Designed according to current industry standards and employer expectations.' },
    { t: 'Project Based', d: 'Certifications reflect practical knowledge gained through real-world projects.' },
    { t: 'Career Focused', d: 'Helps strengthen resumes and improve job opportunities.' },
  ],
  benefits: [
    { t: 'Resume Value', d: 'Add credibility and professional recognition.' },
    { t: 'Skill Validation', d: 'Demonstrate your practical expertise confidently.' },
    { t: 'Better Opportunities', d: 'Improve your chances of securing interviews.' },
    { t: 'Career Growth', d: 'Stand out in competitive job markets.' },
  ],
};
