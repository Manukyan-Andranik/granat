import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const TECH_STACK = [
  'AI Systems',
  'Automation',
  'Web Platforms',
  'Cloud',
  'APIs',
  'Data Intelligence',
];

export default function Hero() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 18,
      },
    },
  };

  const handleScrollToSection = (index) => {
    const container = document.querySelector('.it-page-container');
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="scroll-section pos-left relative flex items-center min-h-screen py-10"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="content-card max-w-3xl !py-8 !px-8 md:!px-10 flex flex-col justify-between"
      >
        <div>
          {/* Top Label */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-granat-red animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/70">
                {t('it_hero_label')}
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-4 mb-4 font-heading font-bold leading-[1.0] tracking-tight"
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-white">
              {t('it_hero_we_engineer')}
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl gradient-text my-0.5">
              {t('it_hero_ai_systems')}
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl text-white">
              {t('it_hero_digital_products')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-sm sm:text-base text-white/55 leading-relaxed mb-5"
          >
            {t('it_hero_desc')}
          </motion.p>

          {/* Terminal */}
          <motion.div
            variants={itemVariants}
            className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2 bg-zinc-950/40">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-2.5 text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 font-mono">
                {t('it_hero_terminal_title')}
              </span>
            </div>

            <div className="p-3.5 font-mono text-[10px] sm:text-xs leading-6 space-y-0.5 select-none">
              <div className="text-green-400">
                &gt; {t('it_hero_terminal_init')}
              </div>
              <div className="text-cyan-300">
                &gt; {t('it_hero_terminal_connect')}
              </div>
              <div className="text-white/60">
                &gt; {t('it_hero_terminal_deploy')}
              </div>
              <div className="text-granat-red animate-pulse">
                &gt; {t('it_hero_terminal_ready')}
              </div>
            </div>
          </motion.div>

          {/* Tech Chips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-5"
          >
            {TECH_STACK.map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[9px] uppercase tracking-wider font-bold text-white/60 backdrop-blur-lg"
              >
                {item}
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mb-6"
          >
            <button
              onClick={() => handleScrollToSection(1)}
              className="bg-granat-red text-white px-6 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(215,38,56,0.3)] hover:bg-red-600 transition-colors cursor-pointer"
            >
              {t('it_hero_explore')}
            </button>

            <button
              onClick={() => handleScrollToSection(4)}
              className="border border-white/10 bg-white/5 backdrop-blur-xl text-white px-6 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-colors cursor-pointer"
            >
              {t('it_hero_start')}
            </button>
          </motion.div>
        </div>

        {/* Metrics */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5"
        >
          {[
            {
              value: '50+',
              label: t('it_hero_stat_delivered'),
            },
            {
              value: '24/7',
              label: t('it_hero_stat_automations'),
            },
            {
              value: '10M+',
              label: t('it_hero_stat_requests'),
            },
            {
              value: '99.9%',
              label: t('it_hero_stat_reliability'),
            },
          ].map((item) => (
            <div key={item.label} className="bg-white/[0.01] border border-white/5 p-2.5 rounded-xl">
              <div className="text-lg sm:text-xl font-heading font-bold text-white">
                {item.value}
              </div>
              <div className="mt-0.5 text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-white/30 leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}