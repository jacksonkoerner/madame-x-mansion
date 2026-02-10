import Ornament from '@/components/Ornament';

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-[1000px] mx-auto text-center">
          <Ornament />
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light tracking-[0.05em] mb-10">
            Contact
          </h1>

          <div className="grid md:grid-cols-2 gap-12 text-left items-start">
            <div className="md:text-left text-center">
              <p className="font-display text-xl text-[var(--ivory)] leading-relaxed mb-6">
                927 Toulouse Street<br />
                New Orleans, LA 70112<br />
                French Quarter
              </p>

              <div className="text-[0.95rem] text-[rgba(245,240,232,0.8)] leading-loose mb-6">
                <p>
                  <span className="font-ui text-[0.75rem] tracking-[0.1em] uppercase text-[var(--gold)]">Phone: </span>
                  <a href="tel:+15045551825">(504) 555-1825</a>
                </p>
                <p>
                  <span className="font-ui text-[0.75rem] tracking-[0.1em] uppercase text-[var(--gold)]">Email: </span>
                  <a href="mailto:leasing@madamexmansion.com">leasing@madamexmansion.com</a>
                </p>
              </div>

              <div className="text-[0.85rem] text-[var(--lavender)] leading-relaxed space-y-1">
                <p>Heart of the French Quarter</p>
                <p>Half block from Bourbon Street</p>
                <p>0.2 miles from N. Rampart St. transit</p>
                <p>Near Louis Armstrong Park &amp; Jackson Square</p>
                <p>16 miles from MSY Airport</p>
              </div>
            </div>

            <div className="rounded overflow-hidden border border-[rgba(197,165,90,0.15)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d863.0!2d-90.067636!3d29.959067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z29.959067%2C-90.067636!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
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
    </>
  );
}
