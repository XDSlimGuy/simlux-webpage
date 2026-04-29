# Simlux Technology Website

A modern product-led website prototype for Simlux Technology, an LED supplier focused on affordable quality lighting for indoor decoration and commercial spaces.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact form email

The contact route validates submissions and supports Resend email delivery when these environment variables are set:

```bash
CONTACT_TO_EMAIL=sales@simluxtechnology.com
CONTACT_FROM_EMAIL=website@simluxtechnology.com
RESEND_API_KEY=your_resend_key
```

Without `RESEND_API_KEY`, the form still succeeds in prototype mode and logs the inquiry on the server.
