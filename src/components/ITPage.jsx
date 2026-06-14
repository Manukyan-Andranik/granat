import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ServiceCards from './ServiceCards';
import BusinessProducts from './BusinessProducts';
import ProcessTimeline from './ProcessTimeline';
import ContactCTA from './ContactCTA';
import { ProjectsSection } from './ProjectsSection';

const timeNodes = [0.00, 3.00, 6.04, 8.31, 10.00];

export default function ITPage() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const processCardRef = useRef(null);
  const hudRef = useRef(null);
  const scrollEngineRef = useRef({ targetTime: 0, currentTime: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const resetVideo = () => {
        video.currentTime = 0;
      };
      video.addEventListener('loadedmetadata', resetVideo);
      return () => video.removeEventListener('loadedmetadata', resetVideo);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll <= 0) return;
      const scrollProgress = Math.max(0, Math.min(1, container.scrollTop / maxScroll));
      
      const totalChunks = timeNodes.length - 1;
      const mappedProgress = scrollProgress * totalChunks;
      const currentIndex = Math.floor(mappedProgress);
      
      if (currentIndex >= totalChunks) {
        scrollEngineRef.current.targetTime = timeNodes[totalChunks];
        return;
      }
      
      const nextIndex = currentIndex + 1;
      const chunkProgress = mappedProgress - currentIndex;
      const startTime = timeNodes[currentIndex];
      const endTime = timeNodes[nextIndex];
      
      scrollEngineRef.current.targetTime = startTime + chunkProgress * (endTime - startTime);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let frameId;
    const animate = () => {
      const engine = scrollEngineRef.current;
      engine.currentTime += (engine.targetTime - engine.currentTime) * 0.04;
      
      if (videoRef.current && videoRef.current.readyState >= 2) {
        videoRef.current.currentTime = engine.currentTime;
      }
      
      if (processCardRef.current) {
        const processProgress = Math.max(0, Math.min(1, (engine.currentTime - 6.50) / (8.31 - 6.50)));
        const x = -120 + processProgress * 120;
        processCardRef.current.style.transform = `translateX(${x}%)`;
      }
      
      if (hudRef.current) {
        const sec = engine.currentTime.toFixed(2);
        const ms = Math.round((engine.currentTime % 1) * 100).toString().padStart(2, '0');
        hudRef.current.textContent = `${sec}s | ${ms}`;
      }
      
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="it-page-wrapper relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Navbar */}
      <Navbar currentPage="it" />

      {/* Background Video */}
      <div className="it-page-video-bg fixed inset-0 z-0 bg-black pointer-events-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60 light-invert"
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/it-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Debug HUD */}
      {/* <div
        ref={hudRef}
        className="fixed bottom-6 right-6 z-50 bg-black/50 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full font-mono text-[11px] text-white/50 tracking-wider"
      >
        0.00s | 00
      </div> */}

      {/* Snap Scroll Container */}
      <div ref={containerRef} className="it-page-container relative z-10">
        <Hero />
        <ServiceCards />
        <ProjectsSection />
        <ProcessTimeline processCardRef={processCardRef} />
        <ContactCTA />
      </div>
    </div>
  );
}
