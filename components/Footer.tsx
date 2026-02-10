import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 px-8 bg-[#050505] text-center">
      <div className="max-w-[600px] mx-auto">
        <div className="font-display text-2xl font-normal tracking-[0.1em] uppercase text-[var(--gold)] mb-2">
          Madame X Mansion
        </div>
        <p className="font-ui text-[0.8rem] tracking-[0.2em] text-[var(--lavender)] mb-8">
          Est. 1825 · French Quarter · New Orleans
        </p>

        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { href: '/story', label: 'Story' },
            { href: '/building', label: 'Building' },
            { href: '/apartments', label: 'Apartments' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/apply', label: 'Apply' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.4)]! hover:text-[var(--gold)]!"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-[0.8rem] text-[rgba(245,240,232,0.5)] mb-4">
          927 Toulouse Street, New Orleans, LA 70112<br />
          <a href="tel:+15045551825" className="text-[rgba(245,240,232,0.5)]! hover:text-[var(--gold)]!">
            (504) 555-1825
          </a>{' · '}
          <a href="mailto:leasing@madamexmansion.com" className="text-[rgba(245,240,232,0.5)]! hover:text-[var(--gold)]!">
            leasing@madamexmansion.com
          </a>
        </p>

        <div className="w-10 h-[1px] bg-[var(--gold)] mx-auto mb-8 opacity-40" />

        <p className="text-[0.75rem] text-[rgba(245,240,232,0.35)] leading-relaxed mb-3">
          Equal Housing Opportunity. All information deemed reliable but not guaranteed. Contact us for current availability and pricing.
        </p>
        <p className="text-[0.7rem] text-[rgba(245,240,232,0.25)]">
          &copy; 2025 Madame X LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
