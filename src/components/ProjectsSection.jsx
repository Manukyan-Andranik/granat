import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

const PROJECTS = [
  { name: 'Palyan', domain: 'palyan.am', logo: '/logos/palyan.png' },
  { name: 'ProfMonolith', domain: 'profmonolith.am', logo: '/logos/profmonolith.png' },
  { name: 'ProfProject', domain: 'profproject.am', logo: '/logos/profproject.png' },
  { name: 'ATL', domain: 'atl.am', logo: '/logos/atl.png' },
  { name: 'LogicLab', domain: 'logiclab.am', logo: '/logos/logiclab.png' },
  { name: 'Granat', domain: 'granat.am', logo: '/logos/granat.png' },
];

const PROJECT_THEMES = {
  Palyan: {
    accent: '#D4AF37', // Gold
    tagline: 'Exquisite Stonework & Jewelry Art',
    title: 'Palyan Stonework Showcase',
    desc: 'Handcrafted natural stone products and premium custom jewelry designed for timeless elegance.',
    bgGradient: 'from-stone-950 to-amber-950/40',
    details: 'Designed a high-end luxury catalog and 3D jewelry configurator interface. Integrated real-time stone selection filters and global logistics APIs.',
    tech: ['React', 'Three.js', 'Node.js', 'Tailwind', 'PostgreSQL'],
  },
  ProfMonolith: {
    accent: '#FF5A09', // Construction Orange
    tagline: 'Monolithic Concrete Foundations',
    title: 'ProfMonolith Construction',
    desc: 'High-durability concrete structures and monolithic foundation engineering for modern developments.',
    bgGradient: 'from-zinc-950 to-orange-950/30',
    details: 'Developed a robust client portal and concrete delivery tracking dashboard. Engineered automatic volume calculators and construction milestone reporting.',
    tech: ['Next.js', 'Node.js', 'Google Maps API', 'Tailwind', 'MongoDB'],
  },
  ProfProject: {
    accent: '#00D2FF', // Cyan
    tagline: 'Architectural Design & Planning',
    title: 'ProfProject Engineering',
    desc: 'State-of-the-art engineering blueprints, structural planning, and modern architectural projects.',
    bgGradient: 'from-slate-950 to-cyan-950/30',
    details: 'Built a collaborative CAD model viewer and blueprint sharing library. Integrated instant design annotations and document control pipelines.',
    tech: ['React', 'WebGL', 'AWS S3', 'Node.js', 'PostgreSQL'],
  },
  ATL: {
    accent: '#FFA000', // Amber
    tagline: 'Global Logistics & Shipping',
    title: 'ATL Freight Systems',
    desc: 'International transport routes, smart customs clearance, and real-time cargo monitoring dashboards.',
    bgGradient: 'from-blue-950/60 to-slate-950',
    details: 'Developed an automated supply chain optimization engine. Configured GPS container tracking and digital document vaults for customs clearing.',
    tech: ['React', 'Python', 'Docker', 'GraphQL', 'Redis'],
  },
  LogicLab: {
    accent: '#39FF14', // Neon Green
    tagline: 'AI Research & Custom Software',
    title: 'LogicLab Neural Networks',
    desc: 'Innovative software algorithms, machine learning models, and custom data processing labs.',
    bgGradient: 'from-black to-zinc-950',
    details: 'Deployed custom LLM support agents and computer vision models. Built data analytics pipelines processing millions of events daily.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'Kubernetes'],
  },
  Granat: {
    accent: '#D72638', // Garnet Red
    tagline: 'Digital Growth & IT Operations',
    title: 'Granat Creative Agency',
    desc: 'High-impact web development, branding assets, SMM operations, and performance marketing.',
    bgGradient: 'from-zinc-950 to-red-950/30',
    details: 'Engineered our flagship corporate site and custom marketing engine. Configured real-time ROI tracking, branding books, and media templates.',
    tech: ['React', 'Vite', 'Framer Motion', 'Tailwind', 'GitHub Actions'],
  },
};

export function ProjectsSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);

  const handleScrollToContact = () => {
    const container = document.querySelector('.it-page-container');
    if (container) {
      container.scrollTo({
        top: 4 * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
      }
    }, 4500); // Rotate every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    // <section className="scroll-section max-w-3xl !py-8 !px-8 md:!px-10 flex flex-col justify-between">
    <section className="scroll-section max-w-4xl !py-8 !px-8 md:!px-10 relative flex items-center justify-center p-4 lg:p-8">
      <div
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
        className="glass-card w-full h-[90vh] lg:h-[85vh] rounded-[2.5rem] p-6 lg:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden border border-white/10 dark:border-white/5"
      >
        {/* Single Column Stack Layout: No Right Panel */}
        <div className="flex flex-col justify-between h-full space-y-4 overflow-hidden w-full">
          
          {/* Top panel: Info & Tabs */}
          <div className="shrink-0 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-granat-red">
                  {t('it_projects_stat_label') || "Enterprise Portfolio"}
                </span>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-black dark:text-white tracking-tight mt-0.5">
                  {t('it_projects_title')}
                </h2>
              </div>
              <p className="text-black/50 dark:text-white/40 text-[9px] sm:text-[10px] max-w-md leading-relaxed">
                {t('it_projects_desc')}
              </p>
            </div>

            {/* Compact horizontal tabs menu */}
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar select-none">
              {PROJECTS.map((project, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={project.domain}
                    onClick={() => setActiveIndex(i)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-granat-red shrink-0 ${
                      isActive
                        ? 'bg-granat-red text-white border-transparent shadow-[0_4px_12px_rgba(215,38,56,0.3)]'
                        : 'bg-black/5 dark:bg-white/[0.02] border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/5'
                    }`}
                  >
                    <img src={project.logo} className="w-3 h-3 object-contain" />
                    <span>{project.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle panel: Dynamic Browser Hero Showcase */}
          <div className="flex-1 flex items-center justify-center w-full relative min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {(() => {
                const project = PROJECTS[activeIndex];
                const theme = PROJECT_THEMES[project.name];

                return (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -15 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full h-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/40 dark:bg-zinc-950/70 overflow-hidden flex flex-col shadow-xl relative"
                  >
                    {/* Browser Header */}
                    <div className="flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 px-4 py-2.5 bg-black/10 dark:bg-zinc-900/60 select-none shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                      <div className="mx-auto bg-black/10 dark:bg-black/50 text-[9px] text-black/60 dark:text-white/40 font-mono px-4 py-0.5 rounded-full border border-black/5 dark:border-white/5 truncate max-w-[200px] text-center">
                        https://{project.domain}
                      </div>
                      <div className="w-10" />
                    </div>

                    {/* Browser Content - Mock Project Hero Section */}
                    <div
                      className={`flex-1 relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-gradient-to-br ${theme.bgGradient} transition-all duration-700`}
                    >
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

                      {/* Mock Navbar */}
                      <div className="relative z-10 flex items-center justify-between opacity-50 text-[8px] uppercase font-bold tracking-wider text-white select-none">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 flex items-center justify-center bg-black/40 rounded p-0.5 border border-white/10">
                            <img src={project.logo} className="max-w-full max-h-full object-contain" />
                          </div>
                          <span className="font-heading">{project.name}</span>
                        </div>
                        <div className="flex gap-3">
                          <span>Home</span>
                          <span>Services</span>
                          <span>Contact</span>
                        </div>
                      </div>

                      {/* Mock Hero Content */}
                      <div className="relative z-10 my-auto max-w-lg space-y-3 pt-3">
                        <span
                          className="inline-block text-[8px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10"
                          style={{ color: theme.accent }}
                        >
                          {theme.tagline}
                        </span>
                        <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {theme.title}
                        </h1>
                        <p className="text-white/60 text-[11px] leading-relaxed max-w-sm font-light">
                          {theme.desc}
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                          <a
                            href={`https://${project.domain}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white font-bold text-[9px] uppercase tracking-wider px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 transition-all cursor-pointer"
                            style={{ backgroundColor: theme.accent }}
                          >
                            Launch Live Site ↗
                          </a>
                          <span className="text-white/40 text-[8px] uppercase tracking-wider font-bold hover:text-white transition-colors cursor-pointer select-none">
                            Case Study
                          </span>
                        </div>
                      </div>

                      {/* Mock Browser Status Bar */}
                      <div className="relative z-10 flex items-center justify-between opacity-35 text-[7px] font-mono text-white/50 border-t border-white/5 pt-3 select-none">
                        <span>Status: 200 OK</span>
                        <span>Load time: 110ms</span>
                        <span>Responsive: Yes</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Bottom panel: Active Case Study Insight Details & CTA */}
          {(() => {
            const project = PROJECTS[activeIndex];
            const theme = PROJECT_THEMES[project.name];

            return (
              <div className="shrink-0 pt-3 border-t border-black/5 dark:border-white/5 mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  
                  {/* Project details & insights */}
                  <div className="lg:col-span-6 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-granat-red shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-black/50 dark:text-white/40 shrink-0">
                        Project Insights
                      </span>
                      <span className="text-[10px] font-heading font-bold text-black dark:text-white shrink-0 ml-1">
                        {project.name}
                      </span>
                      <span className="text-[8px] font-mono text-granat-red shrink-0">
                        {project.domain}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={project.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-black/60 dark:text-white/50 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2"
                      >
                        {theme.details}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Tech stack badges */}
                  <div className="lg:col-span-3 space-y-1">
                    <div className="text-[8px] font-bold uppercase text-black/40 dark:text-white/30 tracking-wider">
                      Technologies Deployed
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap gap-1"
                      >
                        {theme.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* CTA Action */}
                  <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-1">
                    <span className="text-black/50 dark:text-white/40 text-[9px] leading-tight lg:text-right">
                      {t('it_projects_cta')}
                    </span>
                    <button
                      onClick={handleScrollToContact}
                      className="inline-flex items-center gap-1 text-granat-red hover:text-red-600 font-bold text-[9px] uppercase tracking-wider transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-granat-red"
                    >
                      {t('it_projects_start_build')} <span>→</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}