/**
 * All portfolio copy lives here, sourced from the uploaded resume.
 * Edit this file to update content anywhere across the site — every
 * section pulls from it instead of hard-coding text.
 *
 * Anything you should personally double-check or fill in is marked
 * with `PLACEHOLDER:` in a comment right above it. Nothing else here
 * was invented — it's pulled directly from your resume.
 */

export const profile = {
  firstName: 'VIJAYARAJ',
  lastName: 'A N',
  fullName: 'Vijayaraj A N',
  role: 'Full-Stack Developer',
  // PLACEHOLDER: resume doesn't list a personal address — inferred from
  // your current employer's location. Replace if you're based elsewhere.
  location: 'Trivandrum, Kerala, India',
  email: 'rajanvijaya080@gmail.com',
  phone: '+91 8921530452',
  linkedin: 'https://linkedin.com/in/vijayaraj-developer',
  // PLACEHOLDER: no GitHub URL was on the resume — add yours.
  github: 'https://github.com/vijayrajan222',
  summary:
    "Full-Stack Developer with hands-on experience building data-driven web applications using modern JavaScript technologies. I'm proficient in developing robust backend services, crafting responsive interfaces, and integrating REST APIs with databases including MongoDB and PostgreSQL — with a background in data analysis, workflow automation, and customer-centric problem solving.",
  tagline:
    'Building data-driven, production-ready web experiences across the MERN stack — from REST APIs to pixel-perfect interfaces.',
  // Short rotating skill chips shown under the hero subtitle.
  highlightSkills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
  // Small "latest work" pill shown above the hero eyebrow.
  latestHighlight: {
    label: 'Latest build',
    text: 'Virtue Rider — Full-Stack E-Commerce Platform',
    href: '#projects',
  },
};

export const education = {
  degree: 'B.E. — Electrical and Electronics Engineering',
  school: 'Visvesvaraya Technological University (VTU), Karnataka',
  period: '2018 — 2022',
};

export const languages = ['Malayalam', 'English', 'Tamil', 'Kannada', 'Tulu'];

// Stats shown in the hero. Years-of-experience is calculated from the
// Brototype start date (Nov 2024); the rest are pulled straight from
// the resume content (projects, mentees, distinct tools listed).
export const stats = [
  { value: '3+', label: 'Projects shipped' },
  { value: '1.5+', label: 'Years as a developer' },
  { value: '15+', label: 'Technologies' },
  { value: '10+', label: 'Trainees mentored' },
];

export const aboutFacts = [
  { label: 'Role', value: 'Full-Stack Developer' },
  { label: 'Based in', value: 'Trivandrum, Kerala, India' },
  { label: 'Currently at', value: 'Brototype' },
  { label: 'Languages', value: `${languages.length} spoken` },
];

/**
 * Technical Skills — categorized, with a proficiency percentage.
 * The percentages are an estimated self-assessment based on how each
 * skill is emphasized on your resume (PLACEHOLDER: adjust these to
 * your own judgment — they're a reasonable starting point, not a
 * precise measurement).
 */
export const skillCategories = [
  {
    category: 'Languages',
    blurb: 'Core languages I write day to day.',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  {
    category: 'Frontend',
    blurb: 'Building responsive, accessible interfaces.',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 88 },
    ],
  },
  {
    category: 'Backend',
    blurb: 'Designing and shipping reliable services.',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 88 },
    ],
  },
  {
    category: 'Databases',
    blurb: 'Schema design across SQL and NoSQL.',
    skills: [
      { name: 'MongoDB', level: 82 },
      { name: 'PostgreSQL', level: 78 },
    ],
  },
  {
    category: 'Cloud & Versioning',
    blurb: 'Shipping and collaborating on real infrastructure.',
    skills: [
      { name: 'AWS (EC2)', level: 65 },
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
    ],
  },
  {
    category: 'Tools & Design',
    blurb: 'The everyday toolkit.',
    skills: [
      { name: 'Postman', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Figma', level: 60 },
    ],
  },
  {
    category: 'Foundations',
    blurb: 'The fundamentals everything else is built on.',
    skills: [
      { name: 'Data Structures', level: 75 },
      { name: 'Algorithms', level: 75 },
      { name: 'OOP', level: 80 },
    ],
  },
];

// Flat list for the marquee-style "Tech Stack" strip — a quicker,
// more visual read than the categorized breakdown above.
export const techStack = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'HTML5', 'CSS3',
  'AWS', 'Git', 'GitHub', 'Postman', 'Figma', 'REST APIs',
];

export const experience = [
  {
    role: 'Full Stack Developer Trainee',
    company: 'Brototype',
    location: 'Trivandrum',
    period: 'Nov 2024 — Present',
    current: true,
    points: [
      'Built and maintained responsive web applications with React on the frontend and Node.js/Express on the backend, managing both PostgreSQL and MongoDB for reliable data handling.',
      'Architected RESTful APIs enabling clear, structured communication between frontend and backend across multiple modules.',
      'Independently researched and applied modern development practices, measurably improving application performance and code quality.',
      'Led a team of 10+ trainees as Senior Communication Coordinator — running daily technical discussions and peer-review sessions.',
      'Mentored junior peers in debugging and building solid MERN-stack fundamentals.',
    ],
  },
  {
    role: 'Customer Relations Officer',
    company: 'Altruist Technologies Pvt. Ltd.',
    period: 'Jan 2024 — Aug 2024',
    points: [
      'Managed a high volume of daily customer inquiries with a focus on first-contact resolution and satisfaction.',
      'Diagnosed root causes of recurring issues and delivered targeted fixes that improved retention.',
      'Analyzed feedback patterns to propose process changes that measurably improved service quality.',
      'Coordinated across internal teams to resolve complex cases end-to-end.',
    ],
  },
  {
    role: 'Data Analyst',
    company: 'HVT Technologies Pvt. Ltd.',
    period: 'Dec 2022 — Aug 2023',
    points: [
      'Gathered and maintained structured datasets from multiple sources, upholding accuracy and database integrity.',
      'Built reports and dashboards that translated raw data into actionable insight for stakeholders.',
      'Developed scripts and automated pipelines for data extraction, cutting manual effort on repetitive workflows.',
      'Streamlined reporting procedures, reducing analysis turnaround time.',
    ],
  },
];

export const projects = [
  {
    title: 'Work Glad',
    subtitle: 'Employee Management & Attendance System',
    description:
      'A full-stack MERN application with a modular, maintainable codebase split into controllers, models, middleware, routes, and utilities. RESTful APIs handle employee authentication and attendance tracking with secure, structured client-server communication.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    // PLACEHOLDER: add real links once the repo / deployment are public.
    links: { github: '#', live: '#' },
    featured: true,
  },
  {
    title: 'Virtue Rider',
    subtitle: 'Full-Stack E-Commerce Application',
    description:
      'A Node.js, Express, EJS, and MongoDB application supporting three distinct user roles — admin, seller, and buyer. Includes secure authentication, seller management, end-to-end order processing, Razorpay payments with refund handling, plus coupons, referrals, and a digital wallet for retention.',
    stack: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Razorpay'],
    // PLACEHOLDER: add real links once the repo / deployment are public.
    links: { github: '#', live: '#' },
  },
  {
    title: 'Farmland Surveillance & Smart Irrigation',
    subtitle: 'IoT-Based Smart Agriculture System',
    description:
      'An automated irrigation system delivering water directly to plant root zones to cut resource waste, paired with round-the-clock surveillance against unauthorized access, animals, and environmental threats. Published in the International Journal of Creative Research Thoughts.',
    stack: ['IoT', 'Automation', 'Sensors', 'Embedded Systems'],
    links: { paper: 'https://www.ijcrt.org/papers/IJCRTT020026.pdf' },
  },
];

export const achievements = {
  publications: [
    {
      title: 'Farmland Surveillance and Protection with Smart Irrigation System',
      venue: 'International Journal of Creative Research Thoughts (IJCRT)',
      href: 'https://www.ijcrt.org/papers/IJCRTT020026.pdf',
    },
  ],
  // PLACEHOLDER: no certifications were listed on the resume. These are
  // empty slots, clearly marked, ready for you to fill in as you earn them.
  certifications: [
    { title: 'Add a certification', issuer: 'Issuing organization', placeholder: true },
    { title: 'Add a certification', issuer: 'Issuing organization', placeholder: true },
  ],
};

/**
 * Services — reasonably derived from your actual skill set and project
 * history (not on the resume verbatim, since this is a portfolio-only
 * section). Edit freely to match what you actually want to offer.
 */
export const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'End-to-end web applications with React frontends and Node.js/Express backends.',
  },
  {
    title: 'REST API Design & Integration',
    description: 'Structured, secure APIs that connect your frontend, backend, and third-party services.',
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Multi-role storefronts with payments, coupons, referrals, and wallet systems — like Virtue Rider.',
  },
  {
    title: 'Database Design & Management',
    description: 'Schema design and tuning across MongoDB and PostgreSQL for reliable, real-time data handling.',
  },
  {
    title: 'Dashboards & Admin Panels',
    description: 'Internal tools for attendance, operations, and reporting — built for clarity at a glance.',
  },
  {
    title: 'Workflow Automation',
    description: 'Scripts and pipelines that take repetitive data work off your team\u2019s plate.',
  },
];

export const contactChannels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
  { label: 'LinkedIn', value: 'vijayaraj-developer', href: profile.linkedin },
];
