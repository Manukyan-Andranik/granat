import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { useLanguage } from '../LanguageContext';

const SERVICES = [
  { key: 'nav_marketing', fallback: 'Digital Marketing' },
  { key: 'nav_smm', fallback: 'SMM' },
  { key: 'nav_it', fallback: 'IT Solutions' },
  { key: 'nav_branding', fallback: 'Branding' },
  { key: 'nav_dooh', fallback: 'DOOH' }
];
const SOCIALS = ['LinkedIn', 'Facebook', 'Instagram'];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative pt-24 sm:pt-32 pb-10 border-t border-white/5">
      {/* Top divider gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-lg h-[1px] bg-gradient-to-r from-transparent via-granat-red/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 mb-16 sm:mb-24"
        >
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="GRANAT"
                className="footer-logo h-9 w-auto brightness-0 invert"
              />
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                GRANAT
              </span>
            </div>
            <p className="text-white/30 max-w-sm text-sm font-light leading-relaxed">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-granat-red mb-6 sm:mb-8">
              {t('footer_services')}
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <motion.li
                  key={service.key}
                  whileHover={{ x: 5, color: '#FFFFFF' }}
                  className="text-sm text-white/30 font-medium cursor-pointer transition-colors"
                >
                  {t(service.key)}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-granat-red mb-6 sm:mb-8">
              {t('footer_contact')}
            </h4>
            <ul className="space-y-3 text-sm text-white/30 font-medium">
              <motion.li whileHover={{ x: 5, color: '#FFFFFF' }} className="cursor-pointer">
                info@granat.am
              </motion.li>
              <motion.li whileHover={{ x: 5, color: '#FFFFFF' }} className="cursor-pointer">
                +374 (00) 00-00-00
              </motion.li>
              <motion.li whileHover={{ x: 5, color: '#FFFFFF' }} className="cursor-pointer">
                {t('footer_yerevan')}
              </motion.li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/15 gap-6">
          <p>© {new Date().getFullYear()} GRANAT. {t('footer_rights_short')}</p>
          <div className="flex gap-8 sm:gap-12">
            {SOCIALS.map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ y: -2, color: '#D72638' }}
                className="hover:text-granat-red transition-all cursor-pointer"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
