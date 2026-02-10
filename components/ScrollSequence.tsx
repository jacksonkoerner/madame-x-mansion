'use client';

import { useEffect, useRef, useState } from 'react';

const layers = [
  {
    src: '/madame-x-mansion/images/madame-x-study.jpg',
    alt: 'Preparatory study sketch of Madame Gautreau by Sargent',
    text: 'In 1859, a girl was born in this mansion who would grow up to become the most scandalous woman in Paris.',
  },
  {
    src: '/madame-x-mansion/images/madame-x-painting.jpg',
    alt: 'Portrait of Madame X by John Singer Sargent, 1884',
    text: 'She became the most scandalous woman in Paris.',
  },
  {
    src: '/madame-x-mansion/images/studio-photo.jpg',
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
      // Progress: 0 when top of container hits top of viewport,
      // 1 when bottom of container hits bottom of viewport
      const scrolled = -rect.top;
      const totalScroll = containerHeight - viewportHeight;
      if (totalScroll <= 0) return;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Opacity calculations per the spec:
  // 0-25%: Study full, fading
  // 25-50%: Study → Painting crossfade
  // 50-75%: Painting → Studio crossfade
  // 75-100%: Studio full
  const getLayerOpacity = (index: number) => {
    if (index === 0) {
      // Study: full until 20%, fades out 20-45%
      if (progress <= 0.20) return 1;
      if (progress <= 0.45) return 1 - (progress - 0.20) / 0.25;
      return 0;
    }
    if (index === 1) {
      // Painting: fades in 20-45%, full 45-55%, fades out 55-80%
      if (progress <= 0.20) return 0;
      if (progress <= 0.45) return (progress - 0.20) / 0.25;
      if (progress <= 0.55) return 1;
      if (progress <= 0.80) return 1 - (progress - 0.55) / 0.25;
      return 0;
    }
    // Studio: fades in 55-80%, full after 80%
    if (progress <= 0.55) return 0;
    if (progress <= 0.80) return (progress - 0.55) / 0.25;
    return 1;
  };

  // Text: show each caption during its image's peak visibility
  const getActiveText = () => {
    if (progress < 0.30) return 0;
    if (progress < 0.65) return 1;
    return 2;
  };

  const getTextOpacity = () => {
    const idx = getActiveText();
    // Fade text in and out within each phase
    const ranges = [
      [0.03, 0.25],  // study text
      [0.33, 0.58],  // painting text
      [0.68, 0.92],  // studio text
    ];
    const [start, end] = ranges[idx];
    const fadeIn = start + (end - start) * 0.2;
    const fadeOut = end - (end - start) * 0.15;

    if (progress < start) return 0;
    if (progress < fadeIn) return (progress - start) / (fadeIn - start);
    if (progress < fadeOut) return 1;
    if (progress < end) return 1 - (progress - fadeOut) / (end - fadeOut);
    return 0;
  };

  return (
    <div
      ref={containerRef}
      style={{ height: '250vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Dark base layer */}
        <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />

        {/* Image layers */}
        {layers.map((layer, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: getLayerOpacity(i),
              willChange: 'opacity',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={layer.src}
              alt={layer.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: i === 2 ? 'center center' : 'center 15%',
              }}
            />
            {/* Dark overlay for readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
          </div>
        ))}

        {/* Text overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'rgba(10, 10, 10, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '2rem 3rem',
              border: '1px solid rgba(197, 165, 90, 0.2)',
              maxWidth: '500px',
              textAlign: 'center',
              opacity: getTextOpacity(),
              willChange: 'opacity',
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 300,
                lineHeight: 1.7,
                color: '#f5f0e8',
                fontStyle: 'italic',
              }}
            >
              {layers[getActiveText()].text}
            </p>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            opacity: progress < 0.1 ? 0.5 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <div
            className="font-ui"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c5a55a',
            }}
          >
            Scroll to explore
          </div>
        </div>
      </div>
    </div>
  );
}
