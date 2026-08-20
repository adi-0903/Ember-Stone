import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'menu' | 'link'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth cursor follower lag
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on fine pointer (desktop mouse) devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor-hover]'
      );

      if (interactiveElement) {
        setIsHovered(true);
        if (interactiveElement.tagName === 'BUTTON' || interactiveElement.getAttribute('role') === 'button') {
          setHoverType('button');
        } else if (interactiveElement.closest('#menu') || interactiveElement.classList.contains('group')) {
          setHoverType('menu');
        } else {
          setHoverType('link');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        id="custom-cursor-follower"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: isHovered ? (hoverType === 'button' ? 56 : 46) : 28,
          height: isHovered ? (hoverType === 'button' ? 56 : 46) : 28,
          backgroundColor: isHovered
            ? 'rgba(201, 151, 62, 0.12)'
            : 'rgba(201, 151, 62, 0.02)',
          borderColor: isHovered ? '#c9973e' : 'rgba(201, 151, 62, 0.45)',
          borderWidth: isHovered ? '1.5px' : '1px',
          boxShadow: isHovered
            ? '0 0 20px rgba(201, 151, 62, 0.35)'
            : '0 0 0px transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Inner Pinpoint Dot */}
      <motion.div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#c9973e] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 4 : 5,
          height: isHovered ? 4 : 5,
          opacity: isHovered ? 0.9 : 1,
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </>
  );
}
