import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const PROJECTS = [
  { name: 'Palyan', domain: 'palyan.am', logo: '/logos/palyan.png' },
  { name: 'ProfMonolith', domain: 'profmonolith.am', logo: '/logos/profmonolith.png' },
  { name: 'ProfProject', domain: 'profproject.am', logo: '/logos/profproject.png' },
  { name: 'ATL', domain: 'atl.am', logo: '/logos/atl.png' },
  { name: 'LogicLab', domain: 'logiclab.am', logo: '/logos/logiclab.png' },
  { name: 'Granat', domain: 'granat.am', logo: '/logos/granat.png' },
];

export function ProjectsSection() {
  const { t } = useLanguage();
  const handleScrollToContact = () => {
    const container = document.querySelector('.it-page-container');
    if (container) {
      container.scrollTo({
        top: 4 * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="scroll-section pos-left relative py-20">
      <div className="content-card !py-8 !px-8 md:!px-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto no-scrollbar">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2"
          >
            {t('it_projects_title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/50 mb-6 text-xs sm:text-sm leading-relaxed"
          >
            {t('it_projects_desc')}
          </motion.p>

          {/* Logo Grid: Horizontal Rows in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {PROJECTS.map((project, i) => (
              <motion.a
                key={project.domain}
                href={`https://${project.domain}`}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.02 }}
                className="
                  group relative flex items-center gap-3
                  rounded-xl border border-white/8
                  bg-white/[0.02] backdrop-blur-xl
                  p-3.5 transition-all duration-300
                  hover:border-granat-red/40
                  hover:bg-white/[0.05]
                "
              >
                {/* Logo */}
                <div className="w-20 h-20 flex items-center justify-center bg-black/30 rounded-xl p-0.2 shrink-0 border border-white/5">
                  <img
                    src={project.logo}
                    alt={project.name}
                    className="max-w-full max-h-full object-contain opacity-75 group-hover:opacity-100 transition duration-300"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <div className="text-white font-bold text-xs truncate group-hover:text-granat-red transition-colors duration-300">
                    {project.name}
                  </div>
                  <div className="text-white/30 text-[8px] sm:text-[9px] font-mono mt-0.5 truncate tracking-wider">
                    {project.domain}
                  </div>
                </div>

                {/* Arrow */}
                <div className="ml-auto text-white/20 group-hover:text-granat-red text-xs transition-colors duration-300">
                  ↗
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(215,38,56,0.12), transparent 70%)',
                  }}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <span className="text-white/40 text-[10px] sm:text-[11px] text-center sm:text-left">
            {t('it_projects_cta')}
          </span>
          <button
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-1.5 text-granat-red hover:text-white font-bold text-[10px] uppercase tracking-wider transition-colors duration-300 cursor-pointer"
          >
            {t('it_projects_start_build')} <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}