'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Ornament from '@/components/Ornament';

const storyBeats = [
  {
    date: '1859',
    title: 'Born in New Orleans',
    text: 'Virginie Amélie Avegno entered the world at 927 Toulouse Street, daughter of Anatole Placide Avegno — an Italian-French Creole — and Marie Virginie de Ternant, descended from French nobility raised at Parlange Plantation.',
    bg: 'painting',
  },
  {
    date: '1862',
    title: 'A Father Lost at Shiloh',
    text: 'Major Avegno commanded the Avegno Zouaves — a famously cosmopolitan Confederate battalion of French, Spanish, Mexican, Irish, Italian, Chinese, German, Dutch, and Filipino soldiers. He was killed at the Battle of Shiloh. Amélie was three years old.',
    bg: 'painting',
  },
  {
    date: '1867',
    title: 'Paris Beckoned',
    text: 'At eight years old, Amélie and her mother fled the ruins of post-war New Orleans for Paris, settling into an apartment at 45 Rue Cambon. She would never truly return. Her sister Valentine had already been claimed by yellow fever the year before.',
    bg: 'lachaume',
  },
  {
    date: '1878',
    title: 'La Belle Madame Gautreau',
    text: 'At nineteen, she married Pierre Gautreau, a banker twice her age. Then she became Paris\'s most conspicuous beauty — powdering her skin with lavender, consuming arsenic for pallor, dyeing her hair with henna. The press called her "a professional beauty." She worked hard at it.',
    bg: 'study',
  },
  {
    date: '1883',
    title: 'Sargent\'s Obsession',
    text: 'John Singer Sargent, a young American expatriate desperate to make his name, sought her out. He wrote to a mutual friend: "I have a great desire to paint her portrait… you might tell her that I am a man of prodigious talent." He offered to paint her for free. Two ambitious Americans, both betting everything on one canvas.',
    bg: 'studio',
  },
  {
    date: '1884',
    title: 'The Scandal of 1884',
    text: 'At the Paris Salon, the portrait ignited fury. The fallen shoulder strap, the bare skin, the deathly pallor — critics said standing before it, one "would hear every curse word in the French language." Le Charivari published mocking caricatures. Gautreau\'s mother begged Sargent to remove it. He refused. Both were driven into hiding.',
    bg: 'painting',
  },
  {
    date: '1884–1916',
    title: 'A Masterpiece in Exile',
    text: 'Sargent repainted the strap, fled to London, and kept the painting for over thirty years. When he finally sold it to the Metropolitan Museum of Art, he had one instruction: "I should prefer that the picture should not be called by her name." He called it simply "the best thing I have done."',
    bg: 'studio',
  },
  {
    date: 'Today',
    title: 'The New Orleans Mona Lisa',
    text: 'Now one of America\'s most famous paintings — sometimes called "The New Orleans Mona Lisa" — it hangs on permanent display at the Met. And it all began here, at 927 Toulouse Street, in the heart of the French Quarter.',
    bg: 'painting',
  },
];

const bgImages: Record<string, string> = {
  painting: '/madame-x-mansion/images/madame-x-painting.jpg',
  study: '/madame-x-mansion/images/madame-x-study.jpg',
  studio: '/madame-x-mansion/images/studio-photo.jpg',
  lachaume: '/madame-x-mansion/images/lachaume-ad.jpg',
};

export default function StoryPage() {
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgLayersRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // Set initial background
    Object.entries(bgLayersRef.current).forEach(([name, el]) => {
      if (el) el.style.opacity = name === 'painting' ? '1' : '0';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal card
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            (entry.target as HTMLElement).style.transform = 'translateY(0)';

            // Switch background
            const bg = (entry.target as HTMLElement).dataset.bg;
            if (bg) {
              Object.entries(bgLayersRef.current).forEach(([name, el]) => {
                if (el) el.style.opacity = name === bg ? '1' : '0';
              });
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    beatsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed background images */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {Object.entries(bgImages).map(([name, src]) => (
          <div
            key={name}
            ref={(el) => { bgLayersRef.current[name] = el; }}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: name === 'painting' ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'brightness(0.2) blur(2px)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Content over backgrounds */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section className="pt-40 pb-8 text-center max-w-[800px] mx-auto px-8">
          <Ornament />
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.05em] mb-6">
            The Story of Madame X
          </h1>
          <p className="text-xl italic text-[var(--lavender)] leading-relaxed">
            In 1859, a girl was born in this mansion who would grow up to become the most scandalous woman in Paris — and the subject of one of America&apos;s most famous paintings.
          </p>
        </section>

        <section className="max-w-[700px] mx-auto px-8 py-16 pb-32">
          {storyBeats.map((beat, i) => (
            <div
              key={i}
              ref={(el) => { beatsRef.current[i] = el; }}
              data-bg={beat.bg}
              className="mb-[10vh] opacity-0"
              style={{
                transform: 'translateY(40px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <div className="beat-card">
                <span className="font-display text-[0.85rem] font-semibold tracking-[0.3em] uppercase text-[var(--gold)] block mb-3">
                  {beat.date}
                </span>
                <h3 className="font-display text-[1.8rem] font-normal text-[var(--ivory)] mb-4 leading-tight">
                  {beat.title}
                </h3>
                <p className="text-[1.05rem] text-[rgba(245,240,232,0.85)] leading-relaxed">
                  {beat.text}
                </p>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="font-display text-2xl font-light italic text-[var(--lavender)] mb-8">
              Her mansion still stands. Come see it.
            </p>
            <Link href="/building" className="btn-gold-lg">
              Explore the Building →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
