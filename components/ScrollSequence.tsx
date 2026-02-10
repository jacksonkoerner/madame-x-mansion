'use client';

import { useEffect, useRef, useState } from 'react';

const basePath = process.env.NODE_ENV === 'production' ? '/madame-x-mansion' : '';

const layers = [
  {
    src: `${basePath}/images/madame-x-study.jpg`,
    alt: 'Preparatory study sketch of Madame Gautreau by Sargent',
    text: 'In 1859, a girl was born in this mansion who would grow up to become the most scandalous woman in Paris.',
  },
  {
    src: `${basePath}/images/madame-x-painting.jpg`,
    alt: 'Portrait of Madame X by John Singer Sargent, 1884',
    text: 'She became the most scandalous woman in Paris.',
  },
  {
    src: `${basePath}/images/studio-photo.jpg`,
    alt: 'Sargent standing beside the Madame X painting in his studio',
    text: 'And the subject of one of America\'s most famous paintings.',
  },
];

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const totalScroll = containerHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacities: 3 phases (0-0.33, 0.33-0.66, 0.66-1.0)
  const getLayerOpacity = (index: number) => {
    const phase = progress * 3;
    if (index === 0) {
      // Study: full at start, fades out during phase 1
      if (phase <= 0.5) return 1;
      if (phase <= 1.5) return 1 - (phase - 0.5);
      return 0;
    }
    if (index === 1) {
      // Painting: fades in during phase 1, full during phase 2, fades out during phase 3
      if (phase <= 0.5) return 0;
      if (phase <= 1.0) return (phase - 0.5) * 2;
      if (phase <= 2.0) return 1;
      if (phase <= 2.5) return 1 - (phase - 2.0) * 2;
      return 0;
    }
    // Studio: fades in during phase 3
    if (phase <= 1.8) return 0;
    if (phase <= 2.5) return (phase - 1.8) / 0.7;
    return 1;
  };

  const getTextIndex = () => {
    if (progress < 0.3) return 0;
    if (progress < 0.65) return 1;
    return 2;
  };

  const getTextOpacity = () => {
    const ti = getTextIndex();
    const boundaries = [
      [0.05, 0.25],
      [0.35, 0.6],
      [0.7, 0.9],
    ];
    const [start, end] = boundaries[ti];
    const mid = (start + end) / 2;
    if (progress < start || progress > end + 0.05) return 0;
    if (progress < mid) return Math.min(1, (progress - start) / (mid - start));
    return Math.max(0, 1 - (progress - end) / 0.05);
  };

  return (
    <div ref={containerRef} className="scroll-sequence-container">
      <div className="scroll-sequence-sticky">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[var(--black)]" />

        {/* Image layers */}
        {layers.map((layer, i) => (
          <div
            key={i}
            className="scroll-sequence-layer"
            style={{ opacity: getLayerOpacity(i) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={layer.src}
              alt={layer.alt}
              className="w-full h-full object-cover"
              style={{ objectPosition: i === 2 ? 'center center' : 'center 15%' }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Text overlay */}
        <div className="scroll-text-overlay">
          <div
            className="scroll-text-panel"
            style={{ opacity: getTextOpacity() }}
          >
            <p className="font-display text-xl md:text-2xl font-light leading-relaxed text-[var(--ivory)] italic">
              {layers[getTextIndex()].text}
            </p>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="font-ui text-[0.7rem] tracking-[0.2em] uppercase text-[var(--gold)] opacity-50">
            Scroll to explore
          </div>
        </div>
      </div>
    </div>
  );
}
