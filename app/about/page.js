import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Building2, Lightbulb, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Learn about Simlux Technology, an LED supplier focused on affordable quality lighting for indoor decoration and commercial spaces.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div>
          <p className="eyebrow">About Simlux</p>
          <h1>Supplying LED lighting that helps interiors look better without stretching the budget.</h1>
          <p>
            Simlux Technology sells LED strips, bulbs, and decorative lighting products for companies,
            contractors, shops, hospitality spaces, and indoor decoration projects.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1100&q=80"
          alt="Warm interior LED lighting"
          width={1100}
          height={880}
          sizes="(max-width: 980px) 100vw, 44vw"
        />
      </section>

      <section className="section intro-grid">
        <div>
          <p className="eyebrow">Company focus</p>
          <h2>Quality products, affordable cost, clear product choices.</h2>
        </div>
        <div className="story-copy">
          <p>
            Simlux Technology supports customers who need dependable LED products for interior spaces.
            The company focuses on practical lighting categories that are used often in commercial
            decoration: flexible LED strips, efficient LED bulbs, and clean decorative lighting options.
          </p>
          <p>
            The goal is simple: make good LED lighting easier to source by balancing product quality,
            price, and suitability for real installation needs.
          </p>
        </div>
      </section>

      <section className="section band">
        <div className="value-list four">
          <article>
            <Lightbulb size={25} aria-hidden="true" />
            <h3>LED focused</h3>
            <p>Product selection centered on commonly requested indoor LED lighting formats.</p>
          </article>
          <article>
            <ShieldCheck size={25} aria-hidden="true" />
            <h3>Quality minded</h3>
            <p>Lighting options chosen for useful brightness, stable performance, and everyday projects.</p>
          </article>
          <article>
            <BadgeDollarSign size={25} aria-hidden="true" />
            <h3>Affordable supply</h3>
            <p>Cost-conscious choices for businesses buying for decoration or fit-out work.</p>
          </article>
          <article>
            <Building2 size={25} aria-hidden="true" />
            <h3>Commercial ready</h3>
            <p>Suitable for offices, retail stores, showrooms, hotels, and interior contractors.</p>
          </article>
        </div>
      </section>

      <section className="cta-strip">
        <div>
          <h2>Need help matching products to a lighting project?</h2>
          <p>Share the installation area, lighting style, and estimated quantity to begin an inquiry.</p>
        </div>
        <Link className="button primary" href="/contact">
          Contact Simlux <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
