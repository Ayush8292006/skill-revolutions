// Course content taken from skillrevolution.in (Home + Courses + Certifications pages).
const CDN = 'https://res.cloudinary.com/deyfsl3w8/image/upload/f_auto,q_auto,w_1200/'
const US = (id) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`

export const DOMAINS = ['IT & Cloud', 'Healthcare', 'Engineering', 'Digital & Communication']

export const COURSES = [
  {
    slug: 'azure-data-engineering',
    n: 'Azure Data Engineering',
    dom: 'IT & Cloud',
    img: US('photo-1451187580459-43490279c0fa'),
    blurb: 'Learn data pipelines, ETL, and cloud data solutions using Azure.',
    intro: 'Azure Data Engineering is one of the fastest-growing IT career fields. Learn to design, build, and manage scalable data solutions using Microsoft Azure.',
    meta: [['Duration', '06–08 Weeks'], ['Mode', 'Online'], ['Level', 'Beginner to Advanced'], ['Certification', 'DP-203 preparation']],
    industries: ['Banking & Finance', 'IT Companies', 'Logistics', 'Healthcare', 'Telecom', 'E-commerce', 'Retail'],
    modules: { title: 'Curriculum modules', items: ['Introduction to Azure Data Engineering', 'Azure Data Lake Storage', 'Azure Data Factory', 'Azure Synapse Analytics', 'Azure Databricks', 'Data Security & Governance', 'Real-Time Analytics', 'Performance Optimization', 'DP-203 Certification Preparation'] },
    projects: { title: 'Azure live industry projects', intro: 'Gain practical, hands-on experience through real-time Azure industry projects designed to simulate actual business environments.', items: ['Azure Data Factory Projects', 'Azure Synapse Analytics Solutions', 'Azure Databricks Implementations', 'Azure Data Lake Management', 'ETL & Data Integration Pipelines', 'Cloud Deployment & Data Engineering Projects'], outro: 'Build an industry-ready portfolio while strengthening problem-solving skills and gaining confidence.' },
    placement: { intro: 'Skill Revolution provides dedicated career support to help students launch successful data engineering careers.', items: ['Professional Resume Building', 'LinkedIn Profile Optimization', 'Mock Technical Interviews', 'Career Guidance Sessions', 'Job Referrals', 'Interview Preparation with Azure Experts'] },
    certs: ['Azure Data Factory', 'Azure Synapse Analytics', 'Azure Databricks', 'Data Lake Storage']
  },
  {
    slug: 'devops-multi-cloud',
    n: 'DevOps with Multi-Cloud',
    full: 'DevOps with Multi-Cloud (Azure, AWS and GCP)',
    dom: 'IT & Cloud',
    img: CDN + 'v1780923497/devop_2_rwia8z.jpg',
    blurb: 'Master CI/CD, Docker, Kubernetes and multi-cloud deployment.',
    intro: 'DevOps is all about automating software development & deployment, reducing manual work, faster application delivery, and continuous monitoring & updates. Multi-Cloud means using more than one cloud platform (AWS + Azure + GCP), avoiding dependency on a single provider, and achieving better flexibility & reliability.',
    meta: [['Duration', '06–08 Weeks'], ['Mode', 'Online'], ['Level', 'Beginner to Advanced'], ['Clouds', 'AWS · Azure · GCP']],
    industries: ['Banking & Finance', 'IT Companies', 'Healthcare', 'Telecom', 'E-commerce', 'Retail', 'Manufacturing'],
    modules: { title: 'Modules covered', items: ['Modern DevOps Fundamentals', 'Multi-Cloud Strategy', 'Cloud Operations Management', 'Docker', 'Kubernetes', 'CI/CD Automation', 'Terraform & Ansible', 'Python for Cloud Automation', 'Monitoring with Prometheus & Grafana', 'Cloud Migration & Optimization'] },
    projects: { title: 'Live industry projects', items: ['Multi-Cloud Infrastructure Deployment', 'Kubernetes Cluster Management', 'CI/CD Pipeline Implementation', 'Terraform & Ansible Automation', 'Cloud Monitoring Solutions'] },
    placement: { intro: 'Skill Revolution provides dedicated career support to help students secure opportunities in the DevOps & Cloud industry.', items: ['Resume Preparation', 'LinkedIn Optimization', 'Mock Technical Interviews', 'Career Guidance Sessions', 'Job Referrals & Placement Assistance'] },
    certs: ['CI/CD Pipelines', 'Docker & Kubernetes', 'Jenkins Automation', 'AWS & Azure Deployment']
  },
  {
    slug: 'cyber-security',
    n: 'Cyber Security',
    dom: 'IT & Cloud',
    img: CDN + 'v1780923339/cyber_iqly9f.jpg',
    blurb: 'Learn network security, ethical hacking, and system protection.',
    intro: 'Cybersecurity is the practice of protecting systems, networks, programs, devices, and data from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money, or interrupting business operations.',
    meta: [['Duration', '06–08 Weeks'], ['Mode', 'Online'], ['Level', 'Beginner to Advanced'], ['Focus', 'Labs + case studies']],
    industries: ['Banking & Finance', 'IT Companies', 'Healthcare', 'Telecom', 'Government Sector', 'E-commerce', 'Retail'],
    modules: { title: 'Topics covered', items: ['Cyber Security Fundamentals', 'Networking Fundamentals', 'Operating System Security', 'Ethical Hacking', 'Vulnerability Assessment', 'Incident Response', 'Cloud Security', 'Data Protection', 'Security Tools & Technologies', 'Career Preparation'] },
    projects: { title: 'Live projects & practical labs', items: ['Network Security Assessments', 'Vulnerability Analysis Projects', 'Security Monitoring Exercises', 'Incident Response Simulations', 'Cloud Security Implementations', 'Real-World Cyber Security Case Studies'] },
    placement: { intro: 'Skill Revolution provides dedicated career support including:', items: ['Resume Development', 'LinkedIn Optimization', 'Mock Interviews', 'Career Mentorship', 'Job Referrals & Placement Assistance'] },
    certs: ['CompTIA Security+', 'ISC2 Certified in Cybersecurity (CC)', 'EC-Council Certified SOC Analyst (CSA)', 'GIAC Certified Incident Handler (GCIH)', 'OffSec Offensive Security Certified Professional (OSCP)', 'ISC2 CISSP', 'ISC2 CCSP']
  },
  {
    slug: 'medical-billing',
    n: 'Medical Billing',
    dom: 'Healthcare',
    img: CDN + 'v1780923943/billing_8_kmf9gh.jpg',
    blurb: 'Learn billing, claims processing, and revenue cycle management.',
    intro: "Medical billing isn't just sending a single invoice; it is a multi-step cycle designed to ensure insurance companies pay fairly and patients are billed accurately.",
    meta: [['Duration', '06 Weeks'], ['Mode', 'Online / Classroom'], ['Level', 'Beginner to Advanced'], ['Certification focus', 'AAPC']],
    modules: { title: 'Course coverage', items: ['Introduction to Medical Billing and Revenue Cycle Management', 'Healthcare Insurance Fundamentals', 'Claim Life Cycle Management', 'Charge Entry and Claim Submission', 'Payment Posting and Reconciliation', 'Denial Analysis and AR Follow-Ups', 'HIPAA Compliance', 'Real-Time Medical Billing Case Studies'] },
    includes: { title: 'Training includes', items: ['Live Interactive Training Sessions', 'Practical Medical Billing Exercises', 'Mock Billing Projects', 'RCM Workflow Simulations', 'Expert Mentorship'] },
    careers: ['Medical Billing Executive', 'RCM Analyst', 'AR Caller', 'Denial Management Specialist', 'Healthcare Billing Analyst']
  },
  {
    slug: 'medical-coding',
    n: 'Medical Coding',
    dom: 'Healthcare',
    img: CDN + 'v1773044102/medical-banner-with-doctor-working-laptop_yeavvt.jpg',
    blurb: 'AAPC & AHIMA aligned coding with real-time practice.',
    intro: 'Medical coding is the process of taking that complex medical narrative and transforming it into standardized, alphanumeric codes.',
    meta: [['Duration', '08 Weeks'], ['Mode', 'Online / Classroom'], ['Level', 'Beginner to Advanced'], ['Certification focus', 'CPC']],
    includes: { title: 'Industry-focused training', items: ['Interactive Live Training Sessions', 'Real-Time Medical Coding Practice', 'Medical Case Study Analysis', 'ICD-10-CM, CPT and HCPCS Exercises', 'Mock Certification Tests', 'Industry Expert Mentorship'] },
    careers: ['Medical Coder', 'Certified Professional Coder', 'Risk Adjustment Coder', 'Coding Quality Analyst', 'Medical Coding Auditor'],
    certs: ['ICD-10 Coding', 'CPT Coding', 'HCPCS Standards', 'Healthcare Documentation']
  },
  {
    slug: 'electrical-engineering',
    n: 'Electrical Engineering',
    full: 'Electrical Engineering Training',
    dom: 'Engineering',
    img: US('photo-1581092921461-eab62e97a780'),
    blurb: 'Core electrical concepts, circuits, and practical applications.',
    intro: 'Build your electrical career with real industrial practicals. SR Electrical Training Center provides practical-oriented industrial electrical training designed for B.Tech, Diploma, ITI Electrical students, freshers, and professionals who want to gain industry-ready skills.',
    meta: [['Modules', '45+ Industrial'], ['Practicals', '36+ Live'], ['Learning', '100% Practical'], ['Licence guidance', '33 kV · 11 kV · Wireman']],
    audience: ['B.Tech Electrical Students', 'Diploma Electrical Students', 'ITI Electrician Students', 'Freshers & Job Seekers', 'Electrical Technicians', 'Working Professionals', 'Self-Employment Aspirants', 'Overseas Job Aspirants'],
    modules: { title: 'Training methodology', items: ['Electrical Components Working Principles', 'Industrial Diagram Explanation', 'DOL & Star Delta Starters', 'Forward Reverse Control Circuits', 'VFD Wiring & Applications', 'Control Panel Wiring', 'Industrial Power Circuits', 'Troubleshooting & Fault Rectification', 'Real-Time Live Industrial Practicals'] },
    projects: { title: 'Live industrial practicals', intro: 'Students perform practicals exactly as used in industries, helping them gain confidence and real-world troubleshooting skills.', items: ['36+ Live Industrial Practicals', 'Contactors, Relays & Timers', 'MCCB, MCB & Protection Systems', 'Transformers & Motors', 'VFD Practical Applications', 'Industrial Control Panel Wiring', 'Fault Finding & Rectification'], outro: 'Gain hands-on industrial exposure and become job-ready with practical electrical engineering skills.' },
    placement: { intro: 'We provide complete career support to help students secure jobs in industries, maintenance departments, projects, and overseas opportunities.', items: ['Resume Building Support', 'Mock Technical Interviews', 'Placement Guidance', 'Job Referrals', 'Foreign Country Job Preparation', 'Self-Employment Guidance', 'Industry-Oriented Certification'] },
    careers: ['Electrical Maintenance Engineer', 'Electrical Technician', 'Panel Wiring Technician', 'Industrial Electrician', 'Electrical Supervisor', 'Service Engineer', 'Automation Technician', 'Project Site Engineer'],
    note: 'Students can also start their own electrical service business and create self-employment opportunities after completing the training.',
    certs: ['For B.Tech Electrical Students – 33 kV Supervisor Licence', 'For Diploma Electrical Students – 11 kV Supervisor Licence', 'For ITI Electrical Students – Wireman Licence']
  },
  {
    slug: 'digital-marketing',
    n: 'Digital Marketing',
    dom: 'Digital & Communication',
    img: US('photo-1460925895917-afdab827c52f'),
    blurb: 'SEO, social media marketing, and online branding strategies.',
    intro: 'Digital Marketing is one of the fastest-growing career fields. Learn SEO, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, and Analytics to build successful online marketing campaigns.',
    meta: [['Duration', '06–08 Weeks'], ['Mode', 'Offline'], ['Level', 'Beginner to Advanced'], ['Focus', 'Live campaigns']],
    industries: ['E-Commerce', 'IT Companies', 'Healthcare', 'Education', 'Retail', 'Real Estate', 'Media & Entertainment'],
    modules: { title: 'Curriculum modules', items: ['Digital Marketing Fundamentals', 'Search Engine Optimization (SEO)', 'Google Ads & PPC Campaigns', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Google Analytics', 'Lead Generation Strategies', 'Marketing Automation'] },
    projects: { title: 'Live marketing projects', intro: 'Gain practical experience through real-time projects and campaigns used by businesses.', items: ['SEO Optimization Projects', 'Google Ads Campaign Management', 'Social Media Strategy Projects', 'Content Marketing Campaigns', 'Lead Generation Projects', 'Analytics & Reporting Dashboards'], outro: 'Build a professional portfolio and gain confidence with real-world marketing experience.' },
    placement: { intro: 'Dedicated career support to help students start successful careers in Digital Marketing.', items: ['Resume Building', 'LinkedIn Profile Optimization', 'Mock Interviews', 'Career Guidance Sessions', 'Job Referrals', 'Interview Preparation'] }
  },
  {
    slug: 'spoken-english',
    n: 'Spoken English',
    full: 'Spoken English Classes',
    dom: 'Digital & Communication',
    img: US('photo-1517048676732-d65bc937f952'),
    blurb: 'Improve communication, fluency, and interview skills.',
    intro: 'Improve communication, fluency, and interview skills with guided practice from experienced trainers, in online or offline batches.',
    meta: [['Mode', 'Online / Offline'], ['Batches', 'Weekday · Weekend'], ['Focus', 'Fluency & interviews'], ['Level', 'All levels']],
    includes: { title: 'What you will build', items: ['Everyday communication confidence', 'Fluency through guided speaking practice', 'Interview and HR round preparation', 'Mock interviews with feedback'] },
    limited: true
  }
]

export const courseBySlug = (slug) => COURSES.find((c) => c.slug === slug)
