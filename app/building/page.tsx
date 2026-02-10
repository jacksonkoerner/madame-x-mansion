import Link from 'next/link';
import Ornament from '@/components/Ornament';

export default function BuildingPage() {
  const stats = [
    { value: 'c. 1825', label: 'Year Built' },
    { value: '8,500', label: 'Square Feet' },
    { value: '3', label: 'Stories' },
    { value: '7', label: 'Apartments' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(92,26,26,0.15)] via-[var(--black)] to-[var(--black)]" />
        <div className="relative z-10 px-8">
          <Ornament />
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.05em] mb-6">
            The Building
          </h1>
          <p className="text-lg text-[rgba(245,240,232,0.85)] max-w-[700px] mx-auto leading-relaxed">
            Built between 1825 and 1830, this three-story masonry townhouse is a masterwork of Creole architecture.
            Its porte-cochère once welcomed carriages into the private courtyard beyond. Today, it welcomes a new
            generation of residents to one of the most storied addresses in the French Quarter.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8 border-t border-b border-[rgba(197,165,90,0.2)]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-[var(--gold)] leading-none mb-2">
                {stat.value}
              </div>
              <div className="font-ui text-[0.75rem] tracking-[0.2em] uppercase text-[var(--lavender)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-2xl font-normal text-[var(--gold)] mb-5 tracking-[0.05em]">
              Architecture
            </h2>
            <ul className="space-y-0">
              {[
                'Masonry Porte-Cochère Creole Townhouse',
                'Pilasters at façade ends and between upper-floor openings',
                'Refined dormers with unusual second-floor balcony railing',
                'Toulouse Street-facing balconies on second & third floors',
                'Rear balconies overlooking the courtyard',
                'Carriageway entrance to private courtyard',
              ].map((item) => (
                <li key={item} className="py-2 pl-5 relative text-[0.95rem] text-[rgba(245,240,232,0.8)] border-b border-[rgba(197,165,90,0.08)]">
                  <span className="absolute left-0 text-[var(--gold)] font-bold">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-normal text-[var(--gold)] mb-5 tracking-[0.05em]">
              Modern Updates
            </h2>
            <ul className="space-y-0">
              {[
                'New slate roof installed 2023',
                'Full renovation completed 2012',
                'Updated electrical, plumbing & HVAC',
                'Independent meters per unit',
                'Property security lighting',
                'Shared courtyard with pond & water feature',
                'Gated parking for 5+ vehicles',
              ].map((item) => (
                <li key={item} className="py-2 pl-5 relative text-[0.95rem] text-[rgba(245,240,232,0.8)] border-b border-[rgba(197,165,90,0.08)]">
                  <span className="absolute left-0 text-[var(--gold)] font-bold">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-8 border-t border-[rgba(197,165,90,0.15)]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display text-2xl font-normal text-[var(--gold)] mb-6 tracking-[0.05em] text-center">
            Location
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="text-center md:text-left">
              <p className="font-display text-xl text-[var(--ivory)] mb-4">
                927 Toulouse Street<br />
                Between Dauphine &amp; Burgundy<br />
                French Quarter, New Orleans
              </p>
              <ul className="space-y-2 text-[0.9rem] text-[var(--lavender)]">
                <li>Heart of the French Quarter</li>
                <li>Half block from Bourbon Street</li>
                <li>0.2 miles from N. Rampart St. transit</li>
                <li>Near Louis Armstrong Park &amp; Jackson Square</li>
                <li>Walker&apos;s paradise</li>
                <li>16 miles from MSY Airport</li>
              </ul>
            </div>
            <div className="rounded overflow-hidden border border-[rgba(197,165,90,0.15)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d863.0!2d-90.067636!3d29.959067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z29.959067%2C-90.067636!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="927 Toulouse Street map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <Link href="/apartments" className="btn-gold-lg">
          View Available Apartments →
        </Link>
      </section>
    </>
  );
}
