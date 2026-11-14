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


## Simlux Studio: editing the website

After this version is deployed, open `/admin/index.html` on the website. Simlux Studio can edit selected page text, displayed contact details, product categories, products, and images. It preserves the existing page layout; it is not a drag-and-drop page builder. Some fixed labels and marketing copy remain in the page source.

To connect, sign in to GitHub as `XDSlimGuy` and create a **fine-grained personal access token** limited to this repository with **Contents: Read and write** permission. Enter the token in the editor itself, never in chat or email. The token and unpublished edits remain only in the current browser tab and are lost when it closes. The editor page is publicly visible, but GitHub authorizes every change. Anyone with a valid write-capable token can change the repository, so protect and revoke tokens if necessary.

Publish creates one commit on `main`. It uploads selected images (JPG, PNG, WebP or AVIF, up to 4 MB each) and updates the content JSON together. GitHub/Vercel then builds and deploys the website. The editor detects an intervening change to `main` and refuses to overwrite it. Confirm the Vercel deployment succeeded after publishing. Changes to the displayed contact email do not change the contact form's configured receiving email (`CONTACT_TO_EMAIL`); update that environment variable separately if needed.
