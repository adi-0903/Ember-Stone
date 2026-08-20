import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  id?: string;
}

export default function GoldUnderlineHeading({
  children,
  className = '',
  subtitle,
  alignment = 'left',
  id
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const alignClass = alignment === 'center' ? 'text-center items-center' : alignment === 'right' ? 'text-right items-end' : 'text-left items-start';

  return (
    <div ref={ref} id={id} className={`flex flex-col ${alignClass} ${className}`}>
      {subtitle && (
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#c9973e] mb-2 font-medium">
          {subtitle}
        </span>
      )}
      <div className="relative inline-block">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-[#f5f0e8]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {children}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            originX: alignment === 'center' ? 0.5 : alignment === 'right' ? 1 : 0,
            backgroundColor: '#c9973e',
            height: '1.5px',
            width: '100%',
            marginTop: '10px',
          }}
        />
      </div>
    </div>
  );
}
