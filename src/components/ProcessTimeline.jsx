import { useLanguage } from '../LanguageContext';

const STEPS = [
  { num: 1 },
  { num: 2 },
  { num: 3 },
  { num: 4 },
  { num: 5 },
  { num: 6 },
];

export default function ProcessTimeline({ processCardRef }) {
  const { t } = useLanguage();

  return (
    <section id="process" className="horizontal-track pos-center overflow-hidden">
      <div
        ref={processCardRef}
        className="content-card"
        style={{ transform: 'translateX(-120%)', willChange: 'transform' }}
      >
        <h2 className="text-3xl font-heading font-semibold text-white tracking-tight mb-2">
          {t('it_process_title')}
        </h2>
        <p className="text-white/50 text-base mb-6 leading-relaxed">
          {t('it_process_desc')}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-black/5 dark:bg-white/3 hover:bg-black/10 dark:hover:bg-white/8 p-4 rounded-2xl flex items-center gap-3.5 font-semibold text-base border border-black/10 dark:border-white/5 transition-all duration-300 cursor-default"
            >
              <span className="bg-gradient-to-br from-granat-red to-granat-dark-red w-8 h-8 flex items-center justify-center rounded-full font-bold text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.5)] text-white-keep shrink-0">
                {step.num}
              </span>
              <span className="text-white">{t(`it_process_step_${step.num}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
