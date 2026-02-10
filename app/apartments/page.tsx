import Link from 'next/link';
import Ornament from '@/components/Ornament';
import apartments from '@/data/apartments.json';

export default function ApartmentsPage() {
  const amenities = [
    'Hardwood Floors', 'Granite Countertops', 'Stainless Appliances',
    'Central AC & Heat', 'Washer & Dryer', 'Water & Trash Included',
    'Security Lighting', 'Independent Meters', 'Non-Smoking Property',
    'Pets Considered', 'Crown Molding', 'Chandelier Lighting',
  ];

  return (
    <>
      <section className="pt-40 pb-12 px-8 text-center">
        <Ornament />
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.05em] mb-4">
          The Apartments
        </h1>
        <p className="text-lg italic text-[var(--lavender)] max-w-[600px] mx-auto">
          Seven distinct residences, each with its own character — from courtyard-facing retreats to balconied perches overlooking Toulouse Street.
        </p>
      </section>

      {/* Cards */}
      <section className="py-12 px-8">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-8">
          {apartments.map((apt) => (
            <div key={apt.unit} className={`apartment-card p-8 flex flex-col ${apt.featured ? 'featured' : ''}`}>
              <div className="flex justify-between items-baseline mb-6 pb-4 border-b border-[rgba(197,165,90,0.15)]">
                <span className="font-display text-xl font-medium text-[var(--gold)]">Unit {apt.unit}</span>
                <span className="font-ui text-[0.8rem] tracking-[0.15em] uppercase text-[var(--lavender)]">{apt.type}</span>
              </div>
              <p className="font-ui text-[0.8rem] tracking-[0.1em] text-[var(--lavender)] mb-4">{apt.sqft}</p>
              <ul className="list-none mb-8 flex-grow space-y-1">
                {apt.features.map((f) => (
                  <li key={f} className="py-1 pl-4 relative text-[0.9rem] text-[rgba(245,240,232,0.75)]">
                    <span className="absolute left-0 text-[var(--gold)] opacity-50 text-[0.7rem]">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-4 border-t border-[rgba(197,165,90,0.1)]">
                <span className="font-ui text-[0.8rem] tracking-[0.1em] text-[var(--lavender)]">{apt.price}</span>
                <Link href="/apply" className="btn-gold">Inquire</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-12 px-8 border-t border-[rgba(197,165,90,0.15)]">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="font-display text-2xl font-normal text-[var(--gold)] mb-6 tracking-[0.05em]">
            Common Amenities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {amenities.map((a) => (
              <span key={a} className="font-ui text-[0.8rem] tracking-[0.1em] px-5 py-2 border border-[rgba(197,165,90,0.2)] text-[rgba(245,240,232,0.7)] rounded-sm">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <Link href="/apply" className="btn-gold-lg">
          Apply Now →
        </Link>
      </section>
    </>
  );
}
