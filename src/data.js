export const links = {
  github: "https://github.com/victor-asenjo",
  linkedin: "https://www.linkedin.com/in/victorasenjo/",
  email: "mailto:victorasenj@gmail.com?subject=Hello Víctor",
  playStoreDev: "https://play.google.com/store/apps/dev?id=7628959347884936338",
  cv: "/VictorAsenjoCarvajalCV.pdf",
};

export const experience = [
  {
    id: 1,
    role: "Lead Software Engineer",
    company: "Clarivate",
    companyUrl: "https://clarivate.com/",
    team: "AI Life Sciences & Healthcare Innovation",
    period: "Mar 2026 – Present",
    location: "Barcelona, Spain",
    description:
      "Leading software engineering efforts within the AI innovation team in Clarivate's Life Sciences & Healthcare division. Building intelligent solutions that accelerate drug discovery, regulatory intelligence, and patient outcomes using cutting-edge AI and data technologies. Clarivate (NYSE: CLVT) is a global leader in transformative intelligence.",
    tags: ["AI", "Life Sciences", "Healthcare", "Innovation", "Data Intelligence"],
    current: true,
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Oracle Health",
    companyUrl: "https://www.oracle.com/health/",
    team: "International Support",
    period: "Dec 2023 – Feb 2026",
    location: "Barcelona, Spain",
    description:
      "Contributed to Oracle's technology ecosystem working on enterprise-grade software solutions. Responsible for custom code development and maintenance, code quality oversight, architecture decisions, technical roadmap development, and software risk analysis.",
    tags: ["Java", "Cloud", "Enterprise Software", "Oracle Cloud"],
    current: false,
  },
  {
    id: 3,
    role: "Associate University Professor",
    company: "UPC",
    companyUrl: "https://www.upc.edu/",
    team: "Universitat Politècnica de Catalunya",
    period: "Sep 2023 – Present",
    location: "Barcelona, Spain",
    description:
      "Teaching 'Project of Software Engineering' at the Faculty of Informatics (FIB). Educating the next generation of engineers in real software project management, systems architecture, and modern computing paradigms at one of Spain's top technical universities.",
    tags: ["Education", "Computer Science", "Software Engineering", "Academia"],
    current: true,
  },
  {
    id: 4,
    role: "R&D Support Staff",
    company: "UPC DTIM Group",
    companyUrl: "https://dtim.upc.edu/",
    team: "Research and Development",
    period: "Jan 2023 – Nov 2023",
    location: "Barcelona, Spain",
    description:
      "Supported research and development activities within the DTIM research group at UPC. Contributed to academic and applied research projects in computing and technology.",
    tags: ["Research", "R&D", "Academia"],
    current: false,
  },
  {
    id: 5,
    role: "Data Analyst Intern",
    company: "SDG Group",
    companyUrl: "https://www.sdggroup.com/",
    team: "",
    period: "2022 – 2023",
    location: "Barcelona, Spain",
    description:
      "Data analysis and business intelligence projects for enterprise clients. Worked with data pipelines, reporting tools, and analytical frameworks.",
    tags: ["Data Analysis", "Business Intelligence", "SQL"],
    current: false,
  },
  {
    id: 6,
    role: "Monitor & Animator",
    company: "Fundesplai / Cellnex / Xanascat",
    team: "",
    period: "Summers 2021 – 2022",
    location: "Catalonia, Spain",
    description:
      "Youth camp monitor and animator during summers, working with children and teenagers in educational and recreational activities.",
    tags: ["Education", "Youth Work"],
    current: false,
  },
  {
    id: 7,
    role: "Wheelchair Basketball National Referee",
    company: "FEDDF",
    team: "Federación Española de Deportes de Personas con Discapacidad Física",
    period: "2022 – Aug 2025",
    location: "Spain",
    description:
      "National-level referee for wheelchair basketball competitions under the Spanish federation for people with physical disabilities.",
    tags: ["Sports", "Refereeing", "Accessibility"],
    current: false,
  },
  {
    id: 8,
    role: "Basketball Referee",
    company: "FCBQ",
    team: "Federació Catalana de Basquetbol",
    period: "2019 – Aug 2025",
    location: "Catalonia, Spain",
    description:
      "Licensed basketball referee for the Catalan Basketball Federation. Officiated games at various competitive levels across Catalonia.",
    tags: ["Sports", "Refereeing"],
    current: false,
  },
  {
    id: 9,
    role: "Basketball Point Scorer",
    company: "FCBQ",
    team: "Federació Catalana de Basquetbol",
    period: "2017 – Aug 2025",
    location: "Catalonia, Spain",
    description:
      "Official table scorer for basketball games under the Catalan Basketball Federation.",
    tags: ["Sports"],
    current: false,
  },
];

export const projects = [
  {
    id: 1,
    title: "Impostor — Juego del Espía",
    emoji: "🕵️",
    type: "Mobile Game · Android",
    description:
      "A social deduction party game for 3–24 players on a single device. Players receive a secret word — except the Impostor, who must bluff their way through. Features 13+ categories, 2600+ words, special roles, and a sleek dark UI. Perfect for parties, dinners, and social gatherings.",
    tags: ["Flutter", "Dart", "Game Design", "Mobile"],
    playStore: "https://play.google.com/store/apps/details?id=com.elpages.impostor&hl=es",
    highlights: ["3–24 players", "13+ categories", "2600+ words", "Dark UI"],
    featured: true,
  },
  {
    id: 2,
    title: "Alertas de Pisos VPO y HPO",
    emoji: "🏠",
    type: "Social Impact App · Android",
    description:
      "A social-impact app that helps people in Catalonia find affordable public housing (VPO/HPO). Aggregates and monitors official listings from the Agència de l'Habitatge de Catalunya and notifies users instantly when new housing opportunities match their criteria. Centralizing scattered, time-sensitive information to help people access affordable housing.",
    tags: ["Flutter", "Dart", "Push Notifications", "Real-time Alerts"],
    playStore: "https://play.google.com/store/apps/details?id=com.elpages.alertas_vpo&hl=es",
    highlights: ["Real-time alerts", "Official data", "Zero data collection", "Configurable filters"],
    featured: true,
  },
  {
    id: 3,
    title: "Celia",
    emoji: "🌾",
    type: "Health App · iOS & Android",
    description:
      "A community-driven mobile app that helps people with celiac disease and gluten intolerance navigate safe eating using AI technology combined with verified community data. Features product scanning, restaurant finder with 2,400+ verified venues, curated recipes, an AI assistant, and contamination alerts. Eat safe. Anywhere.",
    tags: ["Flutter", "AI", "Health", "Community"],
    website: "https://www.celia-life.com/",
    highlights: ["4.8★ rating", "2,400+ restaurants", "AI-powered", "5 languages"],
    featured: true,
  },
  {
    id: 4,
    title: "LAMP",
    emoji: "💡",
    type: "Mobile App · Android",
    description:
      "A utility app from the #elPagès developer portfolio. Simple, focused, and built with Flutter.",
    tags: ["Flutter", "Dart", "Mobile"],
    playStore: "https://play.google.com/store/apps/details?id=com.elPages.lamp.lamp",
    featured: false,
  },
  {
    id: 5,
    title: "El Rarito",
    emoji: "🤪",
    type: "Party Game · Android",
    description:
      "A fun party game from the #elPagès developer portfolio. Part of a growing collection of social games for groups.",
    tags: ["Flutter", "Dart", "Game Design"],
    playStore: "https://play.google.com/store/apps/details?id=com.elpages.rarito.el_rarito",
    featured: false,
  },
];

export const skills = [
  { category: "Languages", items: ["Java", "Python", "Dart", "JavaScript", "C++", "SQL", "Ruby"] },
  { category: "Mobile", items: ["Flutter", "Android", "Firebase"] },
  { category: "Cloud & DevOps", items: ["Kubernetes", "Docker", "Oracle Cloud", "AWS", "Linux", "Git"] },
  { category: "AI & Data", items: ["Machine Learning", "Data Intelligence", "REST APIs", "MongoDB"] },
  { category: "Web", items: ["React", "HTML5", "CSS3", "Spring Boot", "Node.js"] },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech, Software Engineering",
    institution: "UPC — FIB (Faculty of Computer Science of Barcelona)",
    institutionUrl: "https://www.fib.upc.edu/",
    period: "2019 – 2023",
    location: "Barcelona, Spain",
    details: "OAS Scholarship recipient. Graduated from one of Spain's top technical universities.",
  },
  {
    id: 2,
    degree: "Science & Technology Baccalaureate",
    institution: "INS Mercè Rodoreda",
    institutionUrl: "https://agora.xtec.cat/ies-merce-rodoreda/",
    period: "2017 – 2019",
    location: "Barcelona, Spain",
    details: "",
  },
];

export const certifications = [
  {
    name: "Oracle Certified Professional, Java SE 21 Developer",
    issuer: "Oracle",
    icon: "java",
    date: "Feb 2026",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    issuer: "Oracle",
    icon: "oracle",
    date: "Jan 2026",
  },
];
