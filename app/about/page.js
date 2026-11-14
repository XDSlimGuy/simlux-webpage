import site from "@/content/site.json";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Building2, Lightbulb, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Learn about Simlux Technology Limited, an LED supplier focused on affordable quality lighting for indoor decoration and commercial spaces.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div>
          <p className="eyebrow">About Simlux</p>
          <h1>{site.about.heading}</h1>
          <p>
            {site.about.intro}
          </p>
        </div>
        <Image
          src={site.about.image}
          alt={site.about.imageAlt}
          width={1792}
          height={1024}
          quality={95}
          priority
          sizes="(max-width: 980px) 100vw, 44vw"
        />
      </section>

      <section className="section intro-grid">
        <div>
          <p className="eyebrow">Company focus</p>
          <h2>{site.about.focusHeading}</h2>
        </div>
        <div className="story-copy">
          <p>
            {site.about.story1}
          </p>
          <p>
            {site.about.story2}
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
          <h2>{site.about.ctaHeading}</h2>
          <p>{site.about.ctaText}</p>
        </div>
        <Link className="button primary" href="/contact">
          Contact Simlux <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}

