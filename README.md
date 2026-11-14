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

Open `/admin/index.html` and sign in with the shared editor account. You can edit selected page text, displayed contact details, product categories, products, and images. This preserves the existing page layout; some fixed labels and marketing copy remain in the page source. A sign-in check is required for every editor API request, and the GitHub token remains on the server.

Publish creates one commit on `main` and triggers a Vercel production build. The editor refuses to overwrite changes made since sign-in. Confirm the deployment succeeded after publishing. Editing the displayed contact email does not change the contact form's configured recipient (`CONTACT_TO_EMAIL`); update that environment variable separately if needed.

## Shared sign-in setup (staging only)

The shared-sign-in version replaces the browser GitHub-token prompt with a Clerk account and a server-side GitHub credential. It requires a production Clerk instance for `www.simluxled.com`, Clerk username/password sign-in enabled, and a single user created with username `simlux-editor`. Enable invite-only access. The account's Clerk user ID must match `STUDIO_CLERK_USER_ID`; all editor data and write endpoints deny other accounts even if they sign in.

Configure Vercel Production variables before deploying this version: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `STUDIO_CLERK_USER_ID`, and `STUDIO_GITHUB_TOKEN`. Store the last three as Vercel Secrets. The GitHub token should be fine-grained, restricted to this repository, and have Contents read/write. Never put token or password values in the repository, browser code, or chat. `STUDIO_LOGIN_USERNAME` optionally overrides the default public username. Clerk may require verification on a new device. Do not deploy the new editor until the production instance, allowed account, DNS, and environment variables are configured and tested.

Uploads are limited to 2 MB per image; file data is written to GitHub as an unreferenced blob first and then committed with the content only when Publish succeeds. This leaves the live site unchanged if a publish fails. A shared account does not distinguish who made a change. Rotate the GitHub token or revoke the Clerk sessions if access is compromised.
