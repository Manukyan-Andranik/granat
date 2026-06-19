import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function ContactCTA() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9\s\-+\(\)]{5,20}$/;
    if (formState.phone && !phoneRegex.test(formState.phone)) {
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="scroll-section pos-right">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="content-card"
      >
        <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight mb-6 leading-normal">
          {t('it_contact_title')}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            id="it-contact-name"
            value={formState.name}
            onChange={handleChange}
            placeholder={t('contact_placeholder_name')}
            aria-label={t('contact_placeholder_name')}
            required
            className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-base placeholder:text-white/30 focus:outline-none focus:border-granat-red focus:bg-black/60 focus:ring-3 focus:ring-granat-red/20 transition-all duration-300"
          />

          <input
            type="email"
            name="email"
            id="it-contact-email"
            value={formState.email}
            onChange={handleChange}
            placeholder={t('contact_placeholder_email')}
            aria-label={t('contact_placeholder_email')}
            required
            className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-base placeholder:text-white/30 focus:outline-none focus:border-granat-red focus:bg-black/60 focus:ring-3 focus:ring-granat-red/20 transition-all duration-300"
          />

          <input
            type="tel"
            name="phone"
            id="it-contact-phone"
            value={formState.phone}
            onChange={handleChange}
            placeholder={t('contact_placeholder_phone')}
            aria-label={t('contact_placeholder_phone')}
            pattern="[0-9\s\-\+\(\)]{5,20}"
            title={t('contact_placeholder_phone')}
            className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-base placeholder:text-white/30 focus:outline-none focus:border-granat-red focus:bg-black/60 focus:ring-3 focus:ring-granat-red/20 transition-all duration-300"
          />

          <textarea
            name="message"
            id="it-contact-message"
            value={formState.message}
            onChange={handleChange}
            placeholder={t('contact_placeholder_msg')}
            aria-label={t('contact_placeholder_msg')}
            required
            rows="4"
            className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-base placeholder:text-white/30 focus:outline-none focus:border-granat-red focus:bg-black/60 focus:ring-3 focus:ring-granat-red/20 resize-vertical min-h-[120px] transition-all duration-300"
          />

          <motion.button
            type="submit"
            disabled={submitted}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-granat-red text-white py-4 rounded-full font-semibold text-base shadow-[0_4px_14px_rgba(215,38,56,0.4)] hover:shadow-[0_6px_20px_rgba(215,38,56,0.6)] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-2"
          >
            {submitted ? t('contact_sending') : t('it_contact_btn')}
          </motion.button>

          <AnimatePresence>
            {showSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-xs font-bold text-center mt-4"
              >
                {t('it_contact_success')}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}
