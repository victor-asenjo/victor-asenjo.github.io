// All copy and data for the portfolio lives here. Facts come from each project's README / pubspec.
// Visible copy avoids em dashes on purpose; use a hyphen or restructure.

export const links = {
  github: "https://github.com/victor-asenjo",
  linkedin: "https://www.linkedin.com/in/victorasenjo/",
  email: "victorasenj@gmail.com",
  playStoreDev: "https://play.google.com/store/apps/dev?id=7628959347884936338",
  cv: "VictorAsenjoCarvajalCV.pdf",
};

const play = (id) => `https://play.google.com/store/apps/details?id=${id}`;
const img = (slug, file) => `${import.meta.env.BASE_URL}apps/${slug}/${file}`;

// kind: "game" | "tool"
export const apps = [
  {
    slug: "impostor",
    name: "Impostor",
    kind: "game",
    tagline: "Social deduction for one phone and a group of friends.",
    description:
      "Everyone gets a secret word except the impostor, who has to bluff. Three modes, four difficulties, and custom word packs you can share on WhatsApp with a short code.",
    facts: ["Almost 3,000 words in 24 categories", "Classic, Mysterious and Chaos modes", "No ads, no accounts, no data collection"],
    stack: ["Flutter", "Dart", "Firebase"],
    play: play("com.elpages.impostor"),
    icon: img("impostor", "icon.webp"),
    shots: [1, 2, 3, 4].map((n) => img("impostor", `shot-${n}.webp`)),
    featured: true,
  },
  {
    slug: "skein",
    name: "Skein",
    kind: "tool",
    tagline: "A serverless visual board for notes, shared device to device.",
    description:
      "Kanban lanes with sticky notes you drag around. Boards are local first. Sharing is peer to peer and end-to-end encrypted, so there is no account and no server that stores your data.",
    facts: ["Peer to peer, end-to-end encrypted", "Drag and drop with haptics", "Flutter web build served on your local network"],
    stack: ["Flutter", "Dart", "Encryption", "Firebase"],
    play: play("com.elpages.skein"),
    icon: img("skein", "icon.webp"),
    feature: img("skein", "feature.webp"),
    shots: [1, 2, 3, 4].map((n) => img("skein", `shot-${n}.webp`)),
    featured: true,
  },
  {
    slug: "sushin",
    name: "Sushin",
    kind: "tool",
    tagline: "The sushi counter for the whole table.",
    description:
      "One tap per piece. Twenty sushi characters evolve as you eat, and every meal ends with statistics and a story-ready image to share.",
    facts: ["Works offline, no account", "7 languages", "Collection and per-meal statistics"],
    stack: ["Flutter", "Dart", "Firebase"],
    play: play("com.elpages.sushin"),
    site: "https://sushin-elpages.web.app",
    icon: img("sushin", "icon.webp"),
    feature: img("sushin", "feature.webp"),
    shots: [1, 2, 3, 4].map((n) => img("sushin", `shot-${n}.webp`)),
  },
  {
    slug: "altitude",
    name: "Altitude",
    kind: "game",
    tagline: "Climb a rope to the Sun, then dig to the center of the Earth.",
    description:
      "A minimalist climbing game about the real scale of our world. Pass the Eiffel Tower, Everest and the Moon, burn up at the Sun, and come back as a Phoenix to dig through the crust and the core.",
    facts: ["Real heights, from landmarks to the Sun", "Two phases: climb, then dig", "6 languages"],
    stack: ["Flutter", "Dart", "Firebase"],
    play: play("com.elpages.altitude"),
    icon: img("altitude", "icon.webp"),
    feature: img("altitude", "feature.webp"),
    shots: [1, 2, 3, 4].map((n) => img("altitude", `shot-${n}.webp`)),
  },
  {
    slug: "alertas",
    name: "Alertas VPO",
    kind: "tool",
    tagline: "A push notification when a new protected-housing announcement matches you.",
    description:
      "Watches the Catalan registry of HPO/VPO applicants and tells you the moment a new announcement matches your filters. Built for people for whom a missed notice can mean a missed home.",
    facts: ["Accent-insensitive whole-word matching", "Background sync with WorkManager", "Built on the official public registry"],
    stack: ["Flutter", "Dart", "Web scraping", "WorkManager"],
    play: play("com.elpages.alertas_vpo"),
    icon: img("alertas", "icon.webp"),
  },
  {
    slug: "rarito",
    name: "El Rarito",
    kind: "game",
    tagline: "A party game to prove who is the weirdest.",
    description: "Pass the phone around and find out which of your friends is the real rarito.",
    facts: ["Made for groups", "Single device"],
    stack: ["Flutter", "Dart"],
    play: play("com.elpages.rarito.el_rarito"),
    icon: img("rarito", "icon.webp"),
  },
  {
    slug: "lamp",
    name: "LAMP",
    kind: "tool",
    tagline: "A small, focused utility app.",
    description: "Simple and built with Flutter.",
    facts: [],
    stack: ["Flutter", "Dart"],
    play: play("com.elPages.lamp.lamp"),
    icon: null,
  },
];

export const platform = {
  name: "FCBQbot",
  headline: "A Telegram bot and web platform for Catalan basketball referees.",
  intro:
    "Send the designation PDF and the bot reads every game: teams, colours, venue and refereeing team. Then it adds them to Google Calendar. It runs in production with paid plans, a user site and an admin site.",
  bot: "https://t.me/FCBQbot",
  site: "https://celia-life.com",
  shots: [1, 2, 3].map((n) => img("fcbq", `shot-${n}.webp`)),
  groups: [
    {
      title: "Bot",
      items: [
        "Layout-aware PDF parser, since the federation site blocks scrapers",
        "Calendar sync with undo, reminders and WhatsApp groups per refereeing team",
        "Season Wrapped images in three styles",
      ],
    },
    {
      title: "Web",
      items: [
        "Public landing and legal pages in Catalan and Spanish",
        "User site with history, statistics and a venue hotspot map",
        "Admin site with usage, parsing quality and audited database tools",
      ],
    },
    {
      title: "Engineering",
      items: [
        "Python, FastAPI, SQLAlchemy and Alembic migrations on PostgreSQL",
        "pytest with a coverage gate of 85 percent, plus browser tests and axe accessibility checks",
        "CI on GitHub Actions with a self-hosted runner and forced-command deploys",
      ],
    },
  ],
  stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "CI/CD", "Telegram"],
};

export const experience = [
  {
    id: "clarivate",
    role: "Lead Software Engineer",
    company: "Clarivate",
    team: "AI Innovation, Life Sciences & Healthcare",
    period: "Mar 2026 - Present",
    current: true,
    description:
      "Leading engineering in the AI innovation team of Clarivate's Life Sciences & Healthcare division. The stack is AI end to end: AWS and Azure provisioned with Terraform, IAM configuration, MCP servers for LLM agents, and Python, Java, React and SQL services.",
    tags: ["AI", "MCP", "AWS", "Azure", "Terraform", "IAM", "Python", "Java", "React", "SQL"],
  },
  {
    id: "upc",
    role: "Associate University Professor",
    company: "UPC, Faculty of Informatics",
    team: "Universitat Politècnica de Catalunya",
    period: "Sep 2023 - Present",
    current: true,
    description:
      "Teaching Project of Software Engineering: real project management, systems architecture and modern computing, to the next generation of engineers.",
    tags: ["Teaching", "Software Engineering"],
  },
  {
    id: "oracle",
    role: "Software Engineer",
    company: "Oracle Health",
    team: "International Support",
    period: "Dec 2023 - Feb 2026",
    description:
      "Custom code development and maintenance for enterprise software, code quality oversight, architecture decisions, technical roadmap and software risk analysis.",
    tags: ["Java", "Python", "SQL", "Oracle Cloud", "AI"],
  },
  {
    id: "dtim",
    role: "R&D Support Staff",
    company: "UPC DTIM Group",
    team: "Research and Development",
    period: "Jan 2023 - Nov 2023",
    description: "Supported applied research projects in computing within the DTIM research group.",
    tags: ["Research"],
  },
  {
    id: "sdg",
    role: "Data Analyst Intern",
    company: "SDG Group",
    team: "",
    period: "2022 - 2023",
    description: "Data pipelines, reporting and business intelligence projects for enterprise clients.",
    tags: ["SQL", "Business Intelligence"],
  },
];

export const manifesto =
  "I build software where AI, cloud and people meet. Drug discovery tooling at work, a classroom of future engineers at UPC, and games that make a whole table laugh.";
export const manifestoAccent = ["AI,", "cloud", "people", "laugh."];

export const marqueeWords = ["Flutter", "Python", "AWS", "Terraform", "MCP", "Azure", "Java", "React", "SQL", "Docker", "Dart", "Firebase"];

export const beyond = [
  "Basketball referee for FCBQ (2019 to Aug 2025) and table scorer (2017 to Aug 2025)",
  "Wheelchair basketball national referee for FEDDF (2022 to Aug 2025)",
  "Youth camp monitor with Fundesplai, Cellnex and Xanascat (summers 2021 and 2022)",
];

export const education = [
  {
    title: "B.Tech in Software Engineering",
    place: "UPC, FIB",
    period: "2019 - 2023",
    note: "OAS Scholarship recipient.",
  },
  {
    title: "Science & Technology Baccalaureate",
    place: "INS Mercè Rodoreda",
    period: "2017 - 2019",
    note: "",
  },
];

export const certifications = [
  { name: "Oracle Certified Professional, Java SE 21 Developer", issuer: "Oracle", date: "Feb 2026" },
  { name: "OCI 2025 Generative AI Professional", issuer: "Oracle", date: "Jan 2026" },
];

// Skills double as filters for the project explorer. Names must match `stack` entries to link up.
export const skills = [
  { group: "Mobile", items: ["Flutter", "Dart", "Firebase", "Encryption", "WorkManager"] },
  { group: "AI", items: ["AI", "MCP"] },
  { group: "Cloud & DevOps", items: ["AWS", "Azure", "Terraform", "IAM", "Docker", "CI/CD", "Oracle Cloud", "Kubernetes", "Linux"] },
  { group: "Backend & Web", items: ["Python", "Java", "FastAPI", "PostgreSQL", "SQL", "React", "Telegram", "Web scraping"] },
  { group: "Other languages", items: ["JavaScript", "C++"] },
];
