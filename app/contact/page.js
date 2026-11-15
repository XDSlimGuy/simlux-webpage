import site from "@/content/site.json";
import ContactForm from "./contact-form";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact",
  description:
    "Contact Simlux Technology Limited for LED strips, LED bulbs, decorative LED lighting, pricing, and product inquiries.",
};

export default async function ContactPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const product = resolvedSearchParams?.product || "";

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">Contact Simlux</p>
        <h1 data-studio-field="contact.heading">{site.contact.heading}</h1>
        <p data-studio-field="contact.intro">
          {site.contact.intro}
        </p>
      </section>

      <section className="section contact-layout">
        <ContactForm initialProduct={product} />

        <aside className="contact-panel">
          <h2>Direct contact</h2>
          <a href={`mailto:${site.contact.email}`}>
            <Mail size={20} aria-hidden="true" />
            <span data-studio-field="contact.email">{site.contact.email}</span>
          </a>
          <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
            <Phone size={20} aria-hidden="true" />
            <span data-studio-field="contact.phone">{site.contact.phone}</span>
          </a>
          <a href="https://www.simluxled.com">
            <Globe2 size={20} aria-hidden="true" />
            www.simluxled.com
          </a>
          <p data-studio-field="contact.helper">
            {site.contact.helper}
          </p>
          <div className="contact-muted">
            <span>
              <MapPin size={18} aria-hidden="true" />
              <span data-studio-field="contact.address">{site.contact.address}</span>
            </span>
          </div>
        </aside>
      </section>
    </>
  );
}

