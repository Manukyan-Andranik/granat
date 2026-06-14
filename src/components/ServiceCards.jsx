import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const IT_SERVICES = [
  { icon: '🧠', title: 'Custom AI Solutions',      desc: 'Machine learning models and automated workflows for enterprise.' },
  { icon: '💻', title: 'Advanced Web Development', desc: 'High-performance, scalable websites and progressive web apps (PWAs).' },
  { icon: '🎬', title: 'AI Video Generation',      desc: 'Programmatic, cinematic video content generated at scale.' },
  { icon: '🖼️', title: 'AI Image Synthesis',       desc: 'High-quality asset generation and intelligent image processing.' },
  { icon: '⚙️', title: 'Tech Consulting',          desc: 'Digital transformation, API integrations, and system architecture.' },
];

const TOTAL    = IT_SERVICES.length;
const RADIUS   = 300;
const STEP_DEG = 360 / TOTAL;

// The "focus point" angle — 180° = left side (9 o'clock)
const FOCUS_DEG = 300;

// Given a wheel rotation, which card index is closest to the focus point?
const getActiveIndex = (rotDeg) => {
  const normalized = ((rotDeg % 360) + 360) % 360;
  // Card i sits at: i * STEP_DEG + rotDeg (mod 360)
  // We want the card whose position is closest to FOCUS_DEG
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < TOTAL; i++) {
    const cardAngle = ((i * STEP_DEG + normalized) % 360 + 360) % 360;
    const dist = Math.min(
      Math.abs(cardAngle - FOCUS_DEG),
      360 - Math.abs(cardAngle - FOCUS_DEG)
    );
    if (dist < bestDist) { bestDist = dist; best = i; }
  }
  return best;
};

export default function ServiceCards() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(300);
  const [isMobile, setIsMobile] = useState(false);
  
  const rotationDeg  = useMotionValue(0);
  const springRot    = useSpring(rotationDeg, { stiffness: 40, damping: 18, mass: 1.2 });
  const autoSpinRef  = useRef(null);
  const isPausedRef  = useRef(false);
  const resumeTimerRef = useRef(null);

  // Responsive layout listener
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 480) {
        setRadius(130);
      } else if (w < 768) {
        setRadius(180);
      } else {
        setRadius(300);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Auto-spin: advances rotationDeg continuously ────────────────────────
  useEffect(() => {
    const SPEED_DEG_PER_SEC = 25; // degrees per second
    let last = performance.now();

    const tick = (now) => {
      if (!isPausedRef.current) {
        const dt = (now - last) / 800;
        const next = rotationDeg.get() + SPEED_DEG_PER_SEC * dt;
        rotationDeg.set(next);
        setActiveIndex(getActiveIndex(next));
      }
      last = now;
      autoSpinRef.current = requestAnimationFrame(tick);
    };

    autoSpinRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoSpinRef.current);
  }, [rotationDeg]);

  // ── Snap to a card: pause auto-spin, animate to target, resume ──────────
  const snapToCard = (index) => {
    isPausedRef.current = true;
    clearTimeout(resumeTimerRef.current);

    // Target rotation: card[index] should sit at FOCUS_DEG
    // card[i] natural angle = i * STEP_DEG
    // wheel rotation needed = FOCUS_DEG - i * STEP_DEG
    const current = rotationDeg.get();
    const rawTarget = FOCUS_DEG - index * STEP_DEG;

    // Find shortest path from current (unwrapped) to rawTarget
    const currentMod = ((current % 360) + 360) % 360;
    let diff = ((rawTarget - currentMod) % 360 + 360) % 360;
    if (diff > 180) diff -= 360; // take shorter arc

    const target = current + diff;

    animate(rotationDeg, target, {
      type: 'spring',
      stiffness: 80,
      damping: 22,
      mass: 1,
      onUpdate: (v) => setActiveIndex(getActiveIndex(v)),
      onComplete: () => {
        setActiveIndex(index);
        // Resume auto-spin after 2.5s idle
        resumeTimerRef.current = setTimeout(() => {
          isPausedRef.current = false;
        }, 2500);
      },
    });
  };

  return (
    <section
      id="services"
      className="scroll-section relative flex items-center overflow-hidden select-none"
      style={{ minHeight: '100vh' }}
    >


      {/* ── SPINNING CIRCLE PANEL ──────────────────────────────── */}
      <div className="absolute inset-y-0 w-full lg:w-[60%] right-0 flex items-center justify-center pointer-events-none">
        
        {/* Orbit ring — static, just visual */}
        <div
          className="absolute rounded-full border border-white/6"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {/* Subtle radial glow at center */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: isMobile ? 120 : 200,
            height: isMobile ? 120 : 200,
            background: 'radial-gradient(circle, rgba(215,38,56,0.12) 0%, transparent 70%)',
          }}
        />

        {/* The spinning hub — cards orbit around this */}
        <motion.div
          className="absolute"
          style={{
            width: radius * 2,
            height: radius * 2,
            rotate: springRot,
          }}
        >
          {(() => {
            const translatedServices = IT_SERVICES.map((service, idx) => ({
              ...service,
              title: t(`it_service_${idx + 1}_title`),
              desc: t(`it_service_${idx + 1}_desc`),
            }));
            return translatedServices.map((service, i) => {
              const angleDeg = i * STEP_DEG; // 0° = top
              const angleRad = ((angleDeg - 90) * Math.PI) / 180;
              const cx = radius + radius * Math.cos(angleRad);
              const cy = radius + radius * Math.sin(angleRad);

              return (
                <motion.div
                  key={service.title}
                  style={{
                    position:   'absolute',
                    left:       cx,
                    top:        cy,
                    translateX: '-50%',
                    translateY: '-50%',
                    // Counter-rotate so card text always stays upright
                    rotate: useTransform(springRot, (r) => -r),
                    pointerEvents: 'auto',
                  }}
                  onClick={() => snapToCard(i)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      snapToCard(i);
                    }
                  }}
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-granat-red rounded-2xl"
                >
                  <ServiceCard service={service} isActive={i === activeIndex} isMobile={isMobile} />
                </motion.div>
              );
            });
          })()}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isActive, isMobile }) {
  const cardScale = isMobile
    ? (isActive ? 1.05 : 0.65)
    : (isActive ? 1.5 : 0.78);
  const cardWidth = isMobile ? 120 : 172;
  const cardPadding = isMobile ? 'p-3' : 'p-5';
  const cardBg = isActive 
    ? 'rgba(215,38,56,0.09)' 
    : (isMobile ? 'rgba(18,18,20,0.92)' : 'rgba(18,18,20,0.75)');

  return (
    <motion.div
      animate={{
        scale:   cardScale,
        opacity: isActive ? 1    : 0.38,
      }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative rounded-2xl border backdrop-blur-xl ${cardPadding}`}
      style={{
        width:       cardWidth,
        background:  cardBg,
        borderColor: isActive ? 'rgba(215,38,56,0.4)'  : 'rgba(255,255,255,0.07)',
        boxShadow:   isActive ? '0 0 40px rgba(215,38,56,0.18)' : 'none',
      }}
    >
      {/* Active card: accent top bar */}
      {isActive && (
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #D72638, transparent)' }}
        />
      )}

      <div className="text-2xl mb-2">{service.icon}</div>
      <h4 className="text-[11px] font-bold text-white leading-snug tracking-wide uppercase">
        {service.title}
      </h4>

      {isActive && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mt-2 text-[10px] text-white/45 leading-relaxed font-light ${isMobile ? 'line-clamp-3' : ''}`}
        >
          {service.desc}
        </motion.p>
      )}
    </motion.div>
  );
}