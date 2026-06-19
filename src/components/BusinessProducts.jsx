import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const PRODUCTS = [
  {
    icon: '🤖',
    name: 'Granat Automator',
    desc: 'A smart workflow engine that reduces manual data entry by 80%.',
  },
  {
    icon: '💬',
    name: 'LLM Chat Engine',
    desc: 'Deploy custom-trained customer support agents on your website.',
  },
  {
    icon: '👁️',
    name: 'Vision API',
    desc: 'Plug into our video and image generation models via REST API.',
  },
  {
    icon: '📊',
    name: 'Predictive Dashboard',
    desc: 'Real-time analytics predicting market trends using your raw data.',
  },
];

export default function BusinessProducts() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 60, damping: 18 },
    },
  };

  return (
    <section id="products" className="scroll-section pos-left">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={containerVariants}
        className="content-card"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-heading font-semibold text-white tracking-tight mb-2"
        >
          {t('it_products_title')}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/50 text-base mb-6"
        >
          {t('it_products_desc')}
        </motion.p>

        <div className="flex flex-col gap-3">
          {PRODUCTS.map((prod, i) => (
            <motion.div
              key={prod.name}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="bg-black/5 dark:bg-white/3 hover:bg-black/10 dark:hover:bg-white/8 p-[18px] px-5 rounded-[16px] border border-transparent hover:border-black/10 dark:hover:border-white/8 transition-all duration-300 cursor-default flex flex-col justify-center"
            >
              <h4 className="m-0 text-lg font-semibold flex items-center gap-2.5 text-white mb-2">
                {t(`it_product_${i + 1}_title`)}
              </h4>
              <p className="m-0 text-white/50 text-[0.95rem] leading-normal font-light">
                {t(`it_product_${i + 1}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
