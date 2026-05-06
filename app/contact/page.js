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
          <a href="mailto:sales@simluxled.com">
            <Mail size={20} aria-hidden="true" />
            sales@simluxled.com
          </a>
          <a href="tel:+85293485095">
            <Phone size={20} aria-hidden="true" />
            +852 93485095
          </a>
          <a href="tel:+8613164705570">
            <Phone size={20} aria-hidden="true" />
            +86 13164705570
          </a>
          <a href="https://www.simluxled.com">
            <Globe2 size={20} aria-hidden="true" />
            www.simluxled.com
          </a>
          <p>
            For a faster quotation, include product type, color temperature, estimated quantity,
            and where the lighting will be used.
          </p>
          <div className="contact-muted">
            <span>
              <MapPin size={18} aria-hidden="true" />
              RM1007, 10F, Sterling CTR, Cheung Yue St., Lai Chi Kok, Hong Kong
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              Rm402, Flat 20, New Times Garden, Dong Chen Road 6, Qingyuan City, Guang Dong province, China.
            </span>
          </div>
        </aside>
      </section>
    </>
  );
}
