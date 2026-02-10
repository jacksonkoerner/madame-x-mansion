import Link from 'next/link';
import ScrollSequence from '@/components/ScrollSequence';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background painting — contained like a gallery piece */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/madame-x-mansion/images/madame-x-study.jpg"
            alt="Study of Madame Gautreau"
            className="max-h-[85%] w-auto opacity-15 blur-[2px]"
            style={{ filter: 'blur(2px) brightness(0.7)' }}
          />
          {/* Radial vignette — fades painting into the dark background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 50% 60% at center, transparent 0%, var(--black) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 px-8">
          <div className="text-[var(--gold)] text-sm tracking-[0.5em] opacity-60 mb-4">✦</div>
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-light tracking-[0.06em] leading-[1.1] text-[var(--ivory)]" style={{ textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
            The Madame X<br />Mansion
          </h1>
          <p className="font-ui text-[clamp(0.8rem,2vw,1rem)] font-light tracking-[0.25em] uppercase text-[var(--gold)] mt-6">
            927 Toulouse Street · French Quarter · New Orleans
          </p>
          <p className="font-body text-[clamp(1rem,2.5vw,1.3rem)] italic text-[var(--lavender)] mt-3">
            Where scandal meets splendor. Est. 1825.
          </p>
          <div className="text-[var(--gold)] text-sm tracking-[0.5em] opacity-60 mt-4">✦</div>
        </div>

        <div className="absolute bottom-8 z-10 text-center" style={{ animation: 'fadeInUp 1.5s ease 1s both' }}>
          <span className="font-ui text-[0.75rem] tracking-[0.2em] uppercase text-[var(--gold)] opacity-60">
            Discover the story
          </span>
          <div className="text-[1.2rem] text-[var(--gold)] mt-2 opacity-60" style={{ animation: 'bobDown 2s ease infinite' }}>
            ↓
          </div>
        </div>
      </section>

      {/* SCROLL IMAGE SEQUENCE */}
      <ScrollSequence />

      {/* TEASER CARDS */}
      <section className="py-32 px-8 bg-[var(--black)]">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-3 gap-8">
          <Link href="/story" className="teaser-card group block">
            <div className="text-[var(--gold)] text-2xl mb-4 opacity-60">✦</div>
            <h3 className="font-display text-2xl font-light text-[var(--ivory)] mb-3">Her Story</h3>
            <p className="text-[0.95rem] text-[rgba(245,240,232,0.6)] mb-6 leading-relaxed">
              From New Orleans Creole royalty to the scandal that shook the Paris Salon of 1884.
            </p>
            <span className="font-ui text-[0.75rem] tracking-[0.2em] uppercase text-[var(--gold)] group-hover:tracking-[0.3em] transition-all">
              Read Her Story →
            </span>
          </Link>

          <Link href="/apartments" className="teaser-card group block">
            <div className="text-[var(--gold)] text-2xl mb-4 opacity-60">✦</div>
            <h3 className="font-display text-2xl font-light text-[var(--ivory)] mb-3">The Apartments</h3>
            <p className="text-[0.95rem] text-[rgba(245,240,232,0.6)] mb-6 leading-relaxed">
              Seven distinct residences in the heart of the French Quarter. From $600 to 1,150 sq ft.
            </p>
            <span className="font-ui text-[0.75rem] tracking-[0.2em] uppercase text-[var(--gold)] group-hover:tracking-[0.3em] transition-all">
              View Available Units →
            </span>
          </Link>

          <Link href="/building" className="teaser-card group block">
            <div className="text-[var(--gold)] text-2xl mb-4 opacity-60">✦</div>
            <h3 className="font-display text-2xl font-light text-[var(--ivory)] mb-3">The Building</h3>
            <p className="text-[0.95rem] text-[rgba(245,240,232,0.6)] mb-6 leading-relaxed">
              A three-story Creole townhouse with porte-cochère, courtyard, and nearly two centuries of history.
            </p>
            <span className="font-ui text-[0.75rem] tracking-[0.2em] uppercase text-[var(--gold)] group-hover:tracking-[0.3em] transition-all">
              Explore the Building →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
