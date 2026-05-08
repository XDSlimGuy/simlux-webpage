import { NextResponse } from "next/server";
import { Resend } from "resend";

const requiredFields = ["name", "company", "email", "message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactToEmail = process.env.CONTACT_TO_EMAIL || "simlux01@outlook.com";
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || "Simlux Website <website@simluxled.com>";
const minimumCompletionMs = 2500;

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missingField = requiredFields.find((field) => !String(payload[field] || "").trim());
  if (missingField) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (!emailPattern.test(payload.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (isLikelySpam(payload)) {
    console.info("Spam-like contact inquiry ignored.");
    return NextResponse.json({ ok: true, emailConfigured: Boolean(process.env.RESEND_API_KEY) });
  }

  const inquiry = {
    name: payload.name.trim(),
    company: payload.company.trim(),
    email: payload.email.trim(),
    phone: String(payload.phone || "").trim(),
    productInterest: String(payload.productInterest || "").trim(),
    message: payload.message.trim(),
  };

  const emailConfigured = Boolean(process.env.RESEND_API_KEY);

  if (!emailConfigured) {
    console.info("Prototype contact inquiry received:", inquiry);
    return NextResponse.json({ ok: true, emailConfigured: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: contactFromEmail,
    to: [contactToEmail],
    replyTo: inquiry.email,
    subject: `New Simlux inquiry from ${inquiry.company}`,
    text: formatInquiry(inquiry),
  });

  if (error) {
    console.error("Resend contact email failed:", error);
    return NextResponse.json(
      { error: "The inquiry could not be emailed. Please try direct email instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, emailConfigured: true });
}

function formatInquiry(inquiry) {
  return [
    "New Simlux Technology website inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Product interest: ${inquiry.productInterest || "Not provided"}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

function isLikelySpam(payload) {
  const submittedAt = Number(payload.submittedAt || 0);
  const elapsedMs = Date.now() - submittedAt;
  const filledTrap = Boolean(String(payload.website || "").trim());
  const completedTooFast = !submittedAt || elapsedMs < minimumCompletionMs;
  const randomTextFields = [payload.name, payload.company, payload.message, payload.productInterest].filter(looksRandom);

  return filledTrap || completedTooFast || randomTextFields.length >= 2;
}

function looksRandom(value) {
  const text = String(value || "").trim();

  if (text.length < 12 || /\s/.test(text)) {
    return false;
  }

  const letters = text.replace(/[^a-z]/gi, "");
  const upper = (letters.match(/[A-Z]/g) || []).length;
  const lower = (letters.match(/[a-z]/g) || []).length;
  const vowels = (letters.match(/[aeiou]/gi) || []).length;

  return letters.length >= 12 && upper >= 3 && lower >= 3 && vowels / letters.length < 0.35;
}
