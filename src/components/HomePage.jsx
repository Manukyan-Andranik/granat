import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import { useLanguage } from '../LanguageContext';

const SERVICES = [
  {
    id: 'marketing',
    icon: '📊',
    title: 'Marketing',
    tagline: 'Data-driven scale & ROI',
    desc: 'Data-driven marketing strategies that increase search visibility, acquire high-value customers, and maximize advertising returns.',
    accent: '#8B5CF6',
    features: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click Advertising (PPC)',
      'Data Analytics & Custom Dashboards',
      'Conversion Rate Optimization (CRO)',
    ],
  },
  {
    id: 'smm',
    icon: '📱',
    title: 'SMM',
    tagline: 'Viral growth & brand trust',
    desc: 'Creative and community-focused campaigns across primary platforms to generate active user engagement, brand awareness, and customer trust.',
    accent: '#EC4899',
    features: [
      'Content Planning & Strategy',
      'Targeted Social Advertising',
      'Influencer Matchmaking',
      'Analytics & Sentiment Monitoring',
    ],
  },
  {
    id: 'it',
    icon: '💻',
    title: 'IT',
    tagline: 'Cinematic Video Scroll',
    desc: 'Custom web development, programmatic AI media generation, and robust technical infrastructure. Click to view our cinematic video-scroll overview page.',
    accent: '#3B82F6',
    isIT: true,
    features: [
      'High-Performance Web Applications',
      'AI Integration & Automation workflows',
      'Custom API & Backend Architecture',
      'Programmatic Media Synthesis',
    ],
  },
  {
    id: 'dooh',
    icon: '🏢',
    title: 'DOOH',
    tagline: 'High-impact outdoor media',
    desc: 'Modern LED billboard display planning and dynamic digital out-of-home campaigns triggered in real-time based on local conditions.',
    accent: '#10B981',
    features: [
      'Real-time content updates',
      'Campaign performance tracking',
      'Flexible trigger conditions',
      'High-traffic screen networks',
    ],
  },
  {
    id: 'branding',
    icon: '🎨',
    title: 'Branding',
    tagline: 'Visual identity & voice',
    desc: 'Establish a memorable brand presence with complete logo assets, premium visual guidelines, and consistent cross-platform messaging.',
    accent: '#F59E0B',
    features: [
      'Logo & Graphic Asset Creation',
      'Brand Book & Usage Guidelines',
      'Copywriting & Voice Strategy',
      'Multi-channel Design Consistency',
    ],
  },
];

const INFINITE_SERVICES = [...SERVICES, ...SERVICES, ...SERVICES];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const getReadableAccent = (accent, isLight) => {
  if (!isLight) return accent;
  const lightColors = {
    '#8B5CF6': '#6D28D9', // Darker Purple
    '#EC4899': '#BE185D', // Darker Pink
    '#3B82F6': '#1D4ED8', // Darker Blue
    '#10B981': '#047857', // Darker Green
    '#F59E0B': '#B45309', // Darker Amber / Brown
  };
  return lightColors[accent] || accent;
};

function ServiceVideoCard({ service, index, baseX, itemWidth, cardWidth, scaleFactor, isDragging, isActive, isLight }) {
  const videoRef = useRef(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const playVideo = () => {
      if (!isMounted) return;
      video.currentTime = 0;
      video.play().catch(() => { });
    };

    if (isActive || isCardHovered) {
      if (video.readyState >= 1) {
        playVideo();
      } else {
        video.addEventListener('loadedmetadata', playVideo, { once: true });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      isMounted = false;
      video.removeEventListener('loadedmetadata', playVideo);
    };
  }, [isActive, isCardHovered]);

  const setWidth = SERVICES.length * itemWidth;
  const initialX = (index - SERVICES.length) * itemWidth;

  const x = useTransform(baseX, (latest) => {
    const rawX = initialX + latest;
    return wrap(-setWidth * 1, setWidth * 1, rawX);
  });

  const distance = useTransform(x, (v) => v);
  const scale = useTransform(
    distance,
    [-itemWidth * 2, -itemWidth, 0, itemWidth, itemWidth * 2],
    [0.7, 0.85, scaleFactor, 0.85, 0.7],
    { clamp: true }
  );
  const opacity = useTransform(
    distance,
    [-itemWidth * 2, -itemWidth, 0, itemWidth, itemWidth * 2],
    [0, 0.35, 1, 0.35, 0],
    { clamp: true }
  );
  const blurValue = useTransform(
    distance,
    [-itemWidth * 2, -itemWidth, 0, itemWidth, itemWidth * 2],
    [8, 4, 0, 4, 8],
    { clamp: true }
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const baseZIndex = useTransform(distance, (v) => (Math.abs(v) < 100 ? 10 : 1));
  const pointerEvents = useTransform(distance, (v) => (Math.abs(v) > itemWidth * 1.5 ? 'none' : 'auto'));

  const borderColor = useTransform(
    distance,
    [-itemWidth, 0, itemWidth],
    [
      'rgba(255, 255, 255, 0.08)',
      service.isIT ? '#D72638' : 'rgba(255, 255, 255, 0.25)',
      'rgba(255, 255, 255, 0.08)'
    ],
    { clamp: true }
  );

  const boxShadow = useTransform(
    distance,
    [-itemWidth, 0, itemWidth],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      service.isIT
        ? '0px 0px 30px rgba(215, 38, 56, 0.2)'
        : '0px 20px 40px rgba(0, 0, 0, 0.4)',
      '0px 0px 0px rgba(0,0,0,0)'
    ],
    { clamp: true }
  );

  return (
    <motion.div
      onHoverStart={() => setIsCardHovered(true)}
      onHoverEnd={() => setIsCardHovered(false)}
      style={{
        x,
        scale,
        opacity,
        filter,
        borderColor,
        boxShadow,
        width: cardWidth,
        position: 'absolute',
        // Immediately bring hovered card to the absolute front layer
        zIndex: isCardHovered ? 50 : baseZIndex,
        pointerEvents,
      }}
      whileHover={{
        scale: scaleFactor, // Force max scale
        opacity: 1,         // Force full visibility
        filter: "blur(0px)", // Force zero blur
        borderColor: service.isIT ? '#D72638' : 'rgba(255, 255, 255, 0.4)',
        boxShadow: service.isIT
          ? '0px 0px 40px rgba(215, 38, 56, 0.4)'
          : '0px 20px 60px rgba(0, 0, 0, 0.6)',
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      tabIndex={0}
      onFocus={() => setIsCardHovered(true)}
      onBlur={() => setIsCardHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isDragging) return;
          if (service.isIT) {
            window.location.hash = '#/it';
          } else if (service.id) {
            window.location.hash = `/${service.id}`;
          }
        }
      }}
      onClick={() => {
        if (isDragging) return;
        if (service.isIT) {
          window.location.hash = '#/it';
        } else if (service.id) {
          window.location.hash = `/${service.id}`;
        }
      }}
      className="service-video-card h-[380px] sm:h-[510px] cursor-pointer relative shrink-0 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-zinc-950/70 border flex flex-col justify-between group p-8 sm:p-10"
    >
      <video
        ref={videoRef}
        src={`/videos/card-${service.id}.mp4`}
        muted
        autoPlay
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-35 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none light-invert"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />

      <div className="relative z-20 flex justify-between items-start">
        <div className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transform transition-transform duration-300 group-hover:scale-110">
          {service.icon}
        </div>
        {service.isIT && (
          <span className="bg-granat-red text-white-keep text-[7px] sm:text-[8px] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-1 rounded-full animate-pulse shadow-[0_2px_10px_rgba(215,38,56,0.4)]">
            Live Experience
          </span>
        )}
      </div>

      <div className="relative z-20 space-y-2 sm:space-y-3">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
            {service.title}
          </h3>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider font-mono" style={{ color: getReadableAccent(service.accent, isLight) }}>
            {service.tagline}
          </span>
        </div>
        <p className="text-white group-hover:text-white/80 transition-colors duration-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-3 sm:line-clamp-none rounded-[2rem] bg-white/20 p-3">
          {service.desc}
        </p>
        <div
          className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 transform translate-x-0 group-hover:translate-x-1.5 pt-1 sm:pt-2"
          style={{ color: getReadableAccent(service.accent, isLight) }}
        >
          {service.isIT ? 'Open IT Cinematic Page' : 'View Details'} <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

function MobileServiceReelCard({ service, isLight, setActiveModal, t }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      onClick={() => {
        if (service.isIT) {
          window.location.hash = '#/it';
        } else {
          setActiveModal(service);
        }
      }}
      className="w-full max-w-[390px] mx-auto h-[520px] rounded-[2rem] overflow-hidden border bg-zinc-950/75 relative cursor-pointer group shadow-xl flex flex-col justify-between p-8 sm:p-10 select-none transition-transform duration-300"
      style={{
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 30px ${service.accent}15`,
        borderColor: `${service.accent}30`
      }}
    >
      <video
        ref={videoRef}
        src={`/videos/card-${service.id}.mp4`}
        muted
        autoPlay
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-50 transition-opacity duration-500 pointer-events-none light-invert"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Bar: Icon and Live Tag */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {service.icon}
        </div>
        {service.isIT && (
          <span className="bg-granat-red text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse shadow-[0_2px_10px_rgba(215,38,56,0.4)]">
            Live Experience
          </span>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-20 space-y-4 mt-auto">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-white/50" style={{ color: getReadableAccent(service.accent, isLight) }}>
            {service.tagline}
          </span>
          <h3 className="font-heading text-3xl font-bold text-white tracking-tight mt-0.5">
            {service.title}
          </h3>
        </div>

        <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
          {service.desc}
        </p>

        {/* Deliverables List */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {service.features.slice(0, 3).map((feat) => (
            <span
              key={feat}
              className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 font-bold"
            >
              {feat}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider pt-2"
          style={{ color: getReadableAccent(service.accent, isLight) }}
        >
          {service.isIT ? 'Open IT Cinematic Page' : 'View Details'} <span>→</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ initialService }) {
  const { t } = useLanguage();
  const { isMobile } = useWindowSize();
  const heroVideoRef = useRef(null);

  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light');
    }
    return false;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    handleThemeChange();

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  // Explicit load on isLight is removed, resolved declaratively with keys below

  const translatedServices = SERVICES.map(service => ({
    ...service,
    title: t(`srv_${service.id}_title`),
    tagline: t(`srv_${service.id}_tagline`),
    desc: t(`srv_${service.id}_desc`),
    features: [
      t(`srv_${service.id}_feat_1`),
      t(`srv_${service.id}_feat_2`),
      t(`srv_${service.id}_feat_3`),
      t(`srv_${service.id}_feat_4`),
    ]
  }));
  const translatedInfiniteServices = [...translatedServices, ...translatedServices, ...translatedServices];

  const pingPongRef = useRef({
    rafId: null,
    lastTimestamp: null,
    direction: 1,
    tick: null,
    startPingPong: null,
    startIntro: null,
  });

  const [activeModal, setActiveModal] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showFormSuccess, setShowFormSuccess] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isHovered = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const mobileScrollRef = useRef(null);
  const isMobilePaused = useRef(false);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      const container = mobileScrollRef.current;
      if (container && !isMobilePaused.current) {
        const cardHeight = container.clientHeight;
        const currentScroll = container.scrollTop;
        const nextIndex = Math.round(currentScroll / cardHeight) + 1;
        const targetIndex = nextIndex % SERVICES.length;
        container.scrollTo({
          top: targetIndex * cardHeight,
          behavior: 'smooth',
        });
      }
    }, 4500); // Auto scroll every 4.5 seconds
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  useEffect(() => {
    if (initialService) {
      const srv = translatedServices.find(s => s.id === initialService);
      if (srv) setActiveModal(srv);

      // Auto-scroll down to services when routed from IT Page or direct link
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActiveModal(null);
    }
  }, [initialService]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const LOOP_START = 8.4;
    const LOOP_END = 10.0;
    const state = pingPongRef.current;

    const tick = (timestamp) => {
      if (state.lastTimestamp === null) {
        state.lastTimestamp = timestamp;
        state.rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((timestamp - state.lastTimestamp) / 1000, 0.1);
      state.lastTimestamp = timestamp;

      if (state.direction === 1) {
        // Playing forward natively (including intro from 0 to 7.9, and loops from 5.0 to 7.9)
        if (video.paused) {
          video.play().catch(() => { });
        }
        if (video.currentTime >= LOOP_END) {
          state.direction = -1;
          video.pause();
        }
      } else {
        // Going backward via manual seek (7.9 to 5.0)
        let newTime = video.currentTime - dt;
        if (newTime <= LOOP_START) {
          newTime = LOOP_START;
          state.direction = 1;
          video.currentTime = newTime;
          video.play().catch(() => { });
        } else {
          video.currentTime = newTime;
        }
      }

      state.rafId = requestAnimationFrame(tick);
    };

    const startIntro = () => {
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
      }

      video.currentTime = 0;
      state.direction = 1;
      state.lastTimestamp = null;
      video.play().catch(() => { });

      state.rafId = requestAnimationFrame(tick);
    };

    state.startIntro = startIntro;

    const handleLoadedMetadata = () => {
      startIntro();
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    }

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isLight]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if ((!hash || hash === '#/') && pingPongRef.current.startIntro) {
        pingPongRef.current.startIntro();
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const cardWidth = isMobile ? 320 : 400;
  const gap = isMobile ? 40 : 80;
  const itemWidth = cardWidth + gap;
  const scaleFactor = isMobile ? 1.25 : 1.45;

  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: isMobile ? 120 : 160,
    damping: isMobile ? 35 : 40,
    mass: 1,
    restDelta: 0.01,
  });

  useEffect(() => {
    let rafId;
    const autoscrollSpeed = isMobile ? 0.5 : 1.5;

    const loop = () => {
      if (!isHovered.current && !isDragging) {
        x.set(x.get() - autoscrollSpeed);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [x, isDragging, isMobile]);

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const index = Math.round(-latest / itemWidth) % SERVICES.length;
      const normalizedIndex = index < 0 ? index + SERVICES.length : index;
      if (normalizedIndex !== activeIndex) {
        setActiveIndex(normalizedIndex);
      }
    });
    return () => unsubscribe();
  }, [activeIndex, x, itemWidth]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) < 10) {
      setIsDragging(false);
      return;
    }
    const velocity = info.velocity.x;
    const currentX = x.get();
    const predictedX = currentX + velocity * 0.25;
    const snapX = Math.round(predictedX / itemWidth) * itemWidth;
    x.set(snapX);
    setTimeout(() => {
      setIsDragging(false);
    }, 200);
  };

  const scrollTrack = (direction) => {
    const currentX = x.get();
    const step = direction === 'left' ? 1 : -1;
    x.set(currentX + step * itemWidth);
  };

  const carouselRef = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        x.set(x.get() - e.deltaX);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [x]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setFormSubmitted(false);
      setShowFormSuccess(true);
      setTimeout(() => setShowFormSuccess(false), 5000);
    }, 800);
  };

  const closeModal = () => {
    setActiveModal(null);
    window.location.hash = '';
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative overflow-x-hidden font-sans">
      <Navbar currentPage="home" />

      {/* <section className="relative min-h-[95vh] flex items-center pt-24 lg:pt-0 pb-12 overflow-hidden">
        <video
          ref={heroVideoRef}
          src={isLight ? '/videos/home-hero-light.mp4' : '/videos/home-hero-dark-new.mp4'}
          muted
          playsInline
          preload="auto"
          className="absolute z-0 w-full h-full object-cover opacity-100"
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F5F5F7] via-transparent to-[#F5F5F7] dark:from-black dark:via-transparent dark:to-black pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-white/10 dark:bg-black/40 pointer-events-none" />

        <div className="absolute pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-granat-red/5 rounded-full blur-[140px] -mr-[150px] -mt-[150px]" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-granat-dark-red/15 rounded-full blur-[130px] -ml-[120px] -mb-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-20">
          <div className="lg:col-span-12 space-y-6">
            <motion.div initial={{ opacity: 1, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-granat-red bg-granat-red/8 border border-granat-red/20 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-granat-red rounded-full animate-pulse" />
                {t('hero_digital_agency')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-3xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.1] tracking-tight"
            >
              {t('hero_we_build')} <span className="gradient-text">{t('hero_digital')}</span><br />{t('hero_impact')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-xl"
            >
              {t('hero_desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a href="#services" className="bg-granat-red text-white font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(215,38,56,0.3)] hover:shadow-[0_6px_30px_rgba(215,38,56,0.5)] hover:bg-red-600 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-granat-red">
                {t('hero_explore')}
              </a>
              <a href="#contact" className="border border-black/15 dark:border-white/15 text-black dark:text-white font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-granat-red">
                {t('nav_start_project')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-8 pt-6 border-t border-white/5 max-w-md"
            >
              {[
                { value: '250+', label: t('hero_stat_projects') },
                { value: '98%', label: t('hero_stat_satisfaction') },
                { value: '3.7x', label: t('hero_stat_roi') },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-white font-heading font-bold text-lg sm:text-xl">{stat.value}</div>
                  <div className="text-white/30 text-[9px] uppercase tracking-wider font-bold mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section> */}

      <section id="services" className="py-16 sm:py-28 border-t border-white/5 relative z-10 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-granat-red">{t('services_capabilities')}</span> */}
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white mt-3 tracking-tight">{t('services_our_services')}</h2>
              {/* <p className="text-white/40 mt-3 text-sm sm:text-base font-light max-w-xl ">
                {t('services_desc')}
              </p> */}
            </div>
            <div className="hidden md:flex gap-3 self-start md:self-end">
              <button onClick={() => scrollTrack('left')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-black dark:text-white text-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-granat-red">←</button>
              <button onClick={() => scrollTrack('right')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-black dark:text-white text-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-granat-red">→</button>
            </div>
          </div>

          {!isMobile ? (
            <motion.div
              ref={carouselRef}
              onMouseEnter={() => { isHovered.current = true; }}
              onMouseLeave={() => { isHovered.current = false; }}
              onPanStart={handleDragStart}
              onPan={(event, info) => {
                x.set(x.get() + info.delta.x);
              }}
              onPanEnd={handleDragEnd}
              className="relative w-full h-[520px] sm:h-[760px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center justify-center relative w-full h-full pointer-events-none">
                {translatedInfiniteServices.map((srv, idx) => (
                  <ServiceVideoCard
                    key={`${srv.id}-${idx}`}
                    service={srv}
                    index={idx}
                    baseX={springX}
                    itemWidth={itemWidth}
                    cardWidth={cardWidth}
                    scaleFactor={scaleFactor}
                    isDragging={isDragging}
                    isActive={idx % SERVICES.length === activeIndex}
                    isLight={isLight}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* Mobile "Reel List" Layout with Snap Scrolling & Full Card Height */
            <div
              ref={mobileScrollRef}
              onTouchStart={() => { isMobilePaused.current = true; }}
              onTouchEnd={() => {
                setTimeout(() => {
                  isMobilePaused.current = false;
                }, 3000);
              }}
              onMouseDown={() => { isMobilePaused.current = true; }}
              onMouseUp={() => {
                setTimeout(() => {
                  isMobilePaused.current = false;
                }, 3000);
              }}
              className="flex flex-col w-full h-[80vh] overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth"
            >
              {translatedServices.map((srv) => (
                <div key={srv.id} className="snap-start snap-always shrink-0 w-full h-full flex items-center justify-center p-3">
                  <MobileServiceReelCard
                    service={srv}
                    isLight={isLight}
                    setActiveModal={setActiveModal}
                    t={t}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-xl mx-auto px-6">
          <div className="glass-card p-8 sm:p-10 rounded-[2rem]">
            <h3 className="font-heading text-2xl font-bold text-white mb-2 text-center">{t('contact_init_project')}</h3>
            <p className="text-white/40 text-sm text-center mb-8 font-light">{t('contact_desc')}</p>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                id="home-contact-name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder={t('contact_placeholder_name')}
                aria-label={t('contact_placeholder_name')}
                required
                className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-sm focus:outline-none focus:border-granat-red transition-all"
              />
              <input
                type="email"
                id="home-contact-email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder={t('contact_placeholder_email')}
                aria-label={t('contact_placeholder_email')}
                required
                className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-sm focus:outline-none focus:border-granat-red transition-all"
              />
              <textarea
                id="home-contact-message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder={t('contact_placeholder_msg')}
                aria-label={t('contact_placeholder_msg')}
                required
                rows="3"
                className="w-full p-4 rounded-xl border border-white/8 bg-black/40 text-white font-sans text-sm focus:outline-none focus:border-granat-red resize-none transition-all"
              />
              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full bg-granat-red text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all cursor-pointer mt-2"
              >
                {formSubmitted ? t('contact_sending') : t('contact_send_message')}
              </button>
              {showFormSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-xs font-bold text-center mt-4"
                >
                  {t('contact_success')}
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 relative z-10 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <span className="font-heading font-bold tracking-tight text-white">GRANAT IT SOLUTIONS</span>
          <p className="text-white/30 text-xs font-light">
            © {new Date().getFullYear()} Granat. All rights reserved. Developed for high-growth enterprises.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950/90 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 max-w-lg w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] glow-red"
              style={{ '--glow-color': activeModal.accent }}
            >
              <button onClick={closeModal} className="absolute top-6 right-6 text-white/40 hover:text-white text-xl p-2 cursor-pointer">✕</button>
              <div className="text-5xl mb-6">{activeModal.icon}</div>
              <h3 className="font-heading text-3xl font-bold text-white mb-2">{activeModal.title}</h3>
              <p className="text-sm uppercase tracking-widest font-bold mb-4" style={{ color: getReadableAccent(activeModal.accent, isLight) }}>{activeModal.tagline}</p>
              <p className="text-white/60 text-base mb-6 leading-relaxed font-light">{activeModal.desc}</p>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-3">{t('modal_deliverables')}</h4>
              <ul className="space-y-2.5 mb-6">
                {activeModal.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-white/50">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeModal.accent }} />
                    {feat}
                  </li>
                ))}
              </ul>
              <button onClick={closeModal} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer">
                {t('modal_close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}