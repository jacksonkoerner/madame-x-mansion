'use client';

import { useState } from 'react';
import Ornament from '@/components/Ornament';

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <section className="relative pt-40 pb-20 px-8 min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--burgundy-deep)] via-[rgba(61,16,16,0.5)] to-[var(--black)] opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-[700px] mx-auto text-center">
          <Ornament light />
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light tracking-[0.05em] mb-4">
            Make 927 Toulouse Your Home
          </h1>
          <p className="text-[1.05rem] text-[rgba(245,240,232,0.8)] mb-10 leading-relaxed">
            Living at the Madame X Mansion means becoming part of a story nearly two centuries in the making.
            Inquire about available units and begin your application today.
          </p>

          <form onSubmit={handleSubmit} className="text-left space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[var(--gold)] mb-2 block">
                  Full Name
                </label>
                <input type="text" required className="form-input" />
              </div>
              <div>
                <label className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[var(--gold)] mb-2 block">
                  Email
                </label>
                <input type="email" required className="form-input" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[var(--gold)] mb-2 block">
                  Phone
                </label>
                <input type="tel" className="form-input" />
              </div>
              <div>
                <label className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[var(--gold)] mb-2 block">
                  Unit Preference
                </label>
                <select className="form-input cursor-pointer">
                  <option value="">No preference</option>
                  <option value="1br-street">1 BR — Street Facing</option>
                  <option value="2br-balcony">2 BR — Balcony</option>
                  <option value="1br-courtyard">1 BR — Courtyard</option>
                  <option value="any">Any Available</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[var(--gold)] mb-2 block">
                Desired Move-In Date
              </label>
              <input type="date" className="form-input" />
            </div>

            <div>
              <label className="font-ui text-[0.75rem] tracking-[0.15em] uppercase text-[var(--gold)] mb-2 block">
                Message
              </label>
              <textarea rows={4} className="form-input resize-y" placeholder="Tell us about yourself..." />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-4 font-ui text-[0.85rem] tracking-[0.25em] uppercase border cursor-pointer transition-all
                ${submitted
                  ? 'bg-[var(--gold)] text-[var(--black)] border-[var(--gold)]'
                  : 'bg-transparent text-[var(--gold)] border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)]'
                }`}
            >
              {submitted ? 'Thank You — We\'ll Be in Touch' : 'Submit Inquiry'}
            </button>
          </form>

          {/* Phase 2 note */}
          <div className="mt-16 pt-8 border-t border-[rgba(197,165,90,0.15)]">
            <p className="font-ui text-[0.75rem] tracking-[0.1em] text-[rgba(245,240,232,0.35)]">
              Full lease application with employment verification, references, and document upload coming in Phase 2.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
