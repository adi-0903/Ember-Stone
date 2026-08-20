import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for fluid editorial scroll indication
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      id="viewport-scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-transparent"
    >
      {/* Background track glow line */}
      <div className="absolute inset-0 bg-[#0d0905]/40 backdrop-blur-[1px]" />

      {/* Dynamic Gold Gradient Progress Bar */}
      <motion.div
        id="viewport-scroll-progress-bar"
        className="h-full origin-left bg-gradient-to-r from-[#8a5d1e] via-[#c9973e] to-[#f6df9d] shadow-[0_0_12px_rgba(201,151,62,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
