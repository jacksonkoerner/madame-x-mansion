'use client';

import { useState } from 'react';
import Ornament from '@/components/Ornament';

const basePath = typeof window !== 'undefined' && window.location.pathname.includes('/madame-x-mansion') ? '/madame-x-mansion' : '';

type Category = 'all' | 'artwork' | 'building' | 'courtyard' | 'interiors';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: Category;
  tall?: boolean;
}

const images: GalleryImage[] = [
  {
    src: `${basePath}/images/madame-x-painting.jpg`,
    alt: 'Portrait of Madame X by John Singer Sargent, 1884',
    caption: 'Portrait of Madame X, 1884',
    category: 'artwork',
    tall: true,
  },
  {
    src: `${basePath}/images/studio-photo.jpg`,
    alt: 'John Singer Sargent standing beside the Madame X painting in his studio',
    caption: 'Sargent in His Studio',
    category: 'artwork',
  },
  {
    src: `${basePath}/images/madame-x-study.jpg`,
    alt: 'Preparatory study of Madame Gautreau by Sargent, Tate collection',
    caption: 'Study of Mme Gautreau, c. 1884',
    category: 'artwork',
  },
  {
    src: `${basePath}/images/lachaume-ad.jpg`,
    alt: 'Vintage Lachaume Parisian florist advertisement',
    caption: 'Period Parisian Typography',
    category: 'artwork',
  },
  // Placeholder building/courtyard/interior images
  {
    src: '',
    alt: 'Building exterior — coming soon',
    caption: 'Building Exterior',
    category: 'building',
  },
  {
    src: '',
    alt: 'Courtyard — coming soon',
    caption: 'Courtyard & Water Feature',
    category: 'courtyard',
  },
  {
    src: '',
    alt: 'Interior — coming soon',
    caption: 'Unit Interior',
    category: 'interiors',
  },
];

const tabs: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'artwork', label: 'Artwork' },
  { id: 'building', label: 'Building' },
  { id: 'courtyard', label: 'Courtyard' },
  { id: 'interiors', label: 'Interiors' },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filtered = images.filter((img) => {
    if (activeTab === 'all') return img.src !== ''; // Only show real images in "all"
    return img.category === activeTab;
  });

  return (
    <>
      <section className="pt-40 pb-8 px-8 text-center">
        <Ornament />
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.05em] mb-4">
          Gallery
        </h1>
        <p className="text-lg italic text-[var(--lavender)] mb-8">
          A visual journey through art, architecture, and nearly two centuries of history.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-ui text-[0.8rem] tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-all cursor-pointer
                ${activeTab === tab.id
                  ? 'bg-[var(--gold)] text-[var(--black)] border-[var(--gold)]'
                  : 'bg-transparent text-[var(--lavender)] border-[rgba(197,165,90,0.25)] hover:border-[var(--gold)] hover:text-[var(--gold)]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-20 px-8">
        <div className="max-w-[1100px] mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((img, i) => (
                img.src ? (
                  <div key={i} className={`gallery-item ${img.tall ? 'md:row-span-2' : ''}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="gallery-caption font-ui text-[0.8rem] tracking-[0.15em] uppercase text-[var(--ivory)]">
                      {img.caption}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-center justify-center bg-[rgba(245,240,232,0.03)] border border-[rgba(197,165,90,0.1)] rounded-sm min-h-[250px]">
                    <div className="text-center px-8">
                      <p className="font-ui text-[0.85rem] tracking-[0.1em] text-[var(--lavender)] mb-2">{img.caption}</p>
                      <p className="font-ui text-[0.7rem] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.3)]">Photos Coming Soon</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-ui text-[0.85rem] tracking-[0.1em] text-[var(--lavender)]">
                Photos coming soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
