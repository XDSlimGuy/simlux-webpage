"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const initialState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  productInterest: "",
  message: "",
};

export default function ContactForm({ initialProduct = "" }) {
  const [form, setForm] = useState({ ...initialState, productInterest: initialProduct });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: result.error || "Please check the form and try again." });
        return;
      }

      setStatus({
        type: "success",
        message: result.emailConfigured
          ? "Thanks. Your inquiry has been sent to Simlux."
          : "Thanks. Prototype submission received. Email delivery can be enabled with production credentials.",
      });
      setForm({ ...initialState, productInterest: "" });
    } catch (error) {
      setStatus({ type: "error", message: "The form could not be submitted. Please email sales@simluxled.com directly." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <div>
        <p className="eyebrow">Inquiry form</p>
        <h2>Request product information</h2>
        <p className="form-helper">Required fields are marked with an asterisk.</p>
      </div>
      <label>
        <span className="label-text">Name <strong aria-hidden="true">*</strong></span>
        <input name="name" value={form.name} onChange={updateField} required autoComplete="name" aria-required="true" />
      </label>
      <label>
        <span className="label-text">Company <strong aria-hidden="true">*</strong></span>
        <input
          name="company"
          value={form.company}
          onChange={updateField}
          required
          autoComplete="organization"
          aria-required="true"
        />
      </label>
      <label>
        <span className="label-text">Email <strong aria-hidden="true">*</strong></span>
        <input
          name="email"
          value={form.email}
          onChange={updateField}
          required
          type="email"
          autoComplete="email"
          aria-required="true"
        />
      </label>
      <label>
        <span className="label-text">Phone</span>
        <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" />
      </label>
      <label>
        <span className="label-text">Product interest</span>
        <input
          name="productInterest"
          value={form.productInterest}
          onChange={updateField}
          placeholder="LED strip, LED bulb, decorative LED..."
        />
      </label>
      <label>
        <span className="label-text">Message <strong aria-hidden="true">*</strong></span>
        <textarea
          name="message"
          value={form.message}
          onChange={updateField}
          required
          aria-required="true"
          rows={6}
          placeholder="Tell us the lighting use, estimated quantity, and any target specification."
        />
      </label>
      <button className="button primary form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : "Send inquiry"}
        <Send size={18} aria-hidden="true" />
      </button>
      {status.message ? (
        <p className={`form-status ${status.type}`} role={status.type === "error" ? "alert" : "status"} aria-live="polite">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
