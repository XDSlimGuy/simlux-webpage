import ContactForm from "./contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact",
  description:
    "Contact Simlux Technology for LED strips, LED bulbs, decorative LED lighting, pricing, and product inquiries.",
};

export default async function ContactPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const product = resolvedSearchParams?.product || "";

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">Contact Simlux</p>
        <h1>Tell us what LED product or project you are sourcing.</h1>
        <p>
          Send your lighting need, product interest, and estimated quantity. Simlux will review your
          inquiry and follow up by email.
        </p>
      </section>

      <section className="section contact-layout">
        <ContactForm initialProduct={product} />

        <aside className="contact-panel">
          <h2>Direct contact</h2>
          <a href="mailto:sales@simluxtechnology.com">
            <Mail size={20} aria-hidden="true" />
            sales@simluxtechnology.com
          </a>
          <p>
            For a faster quotation, include product type, color temperature, estimated quantity,
            and where the lighting will be used.
          </p>
          <div className="contact-muted">
            <span>
              <Phone size={18} aria-hidden="true" />
              Phone number to be added
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              Company address to be added
            </span>
          </div>
        </aside>
      </section>
    </>
  );
}
