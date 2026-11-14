import { auth } from '@clerk/nextjs/server';
import { createHmac, timingSafeEqual } from 'node:crypto';

const BASE = 'https://api.github.com/repos/XDSlimGuy/simlux-webpage';
const HEAD_PATTERN = /^[a-f0-9]{40}$/;
const UPLOAD_PATH = /^\/uploads\/[a-f0-9-]{36}\.(jpg|png|webp|avif)$/;

export async function editorAccess(request, modifying = false) {
  if (modifying) {
    const expected = new URL(request.url).origin;
    if (request.headers.get('origin') !== expected) return { error: 'Request not allowed.', status: 403 };
  }
  const { userId } = await auth();
  if (!userId) return { error: 'Please sign in.', status: 401 };
  if (!process.env.STUDIO_CLERK_USER_ID || userId !== process.env.STUDIO_CLERK_USER_ID) return { error: 'This account cannot edit the website.', status: 403 };
  if (!process.env.STUDIO_GITHUB_TOKEN) return { error: 'The editor is not configured yet.', status: 503 };
  return { userId };
}

export async function github(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, { ...options, cache:'no-store', headers: {
    Accept:'application/vnd.github+json', Authorization:`Bearer ${process.env.STUDIO_GITHUB_TOKEN}`,
    'X-GitHub-Api-Version':'2022-11-28', ...(options.body ? {'Content-Type':'application/json'} : {}),
  }});
  const data = await response.json().catch(()=>({}));
  if (!response.ok) { const error=new Error('GitHub could not complete the request.'); error.status=response.status; throw error; }
  return data;
}
export async function readState() {
  const ref=await github('/git/ref/heads/main'); const head=ref.object.sha;
  const read=async path=>{ const file=await github(`/contents/${path}?ref=${head}`); return JSON.parse(Buffer.from(file.content,'base64').toString('utf8')); };
  const [site,catalog]=await Promise.all([read('content/site.json'),read('content/products.json')]);
  return {head,site,catalog};
}
export function validHead(sha) { return typeof sha === 'string' && HEAD_PATTERN.test(sha); }
export function uploadSignature(path, sha, userId) { return createHmac('sha256',process.env.STUDIO_GITHUB_TOKEN).update(`${userId}\n${path}\n${sha}`).digest('hex'); }
export function validUpload(item,userId) {
  if (!item || !UPLOAD_PATH.test(item.path) || !validHead(item.sha) || typeof item.proof!=='string' || !/^[a-f0-9]{64}$/.test(item.proof)) return false;
  return timingSafeEqual(Buffer.from(item.proof,'hex'),Buffer.from(uploadSignature(item.path,item.sha,userId),'hex'));
}
export function goodImage(path) { return typeof path==='string' && (/^\/(products|about|uploads)\/[a-zA-Z0-9_.-]+$/.test(path) || path.startsWith('https://images.unsplash.com/')); }
export function goodContent(site,catalog) {
  if (!site || !catalog || JSON.stringify(site).length>50000 || JSON.stringify(catalog).length>500000) return false;
  const fields={home:['eyebrow','heading','intro','heroImage','valueHeading','categoryHeading','featuredHeading','useHeading','useIntro','ctaHeading','ctaText'],about:['heading','intro','image','imageAlt','focusHeading','story1','story2','ctaHeading','ctaText'],productsPage:['heading','intro'],contact:['heading','intro','email','phone','address','helper'],footer:['description']};
  for(const [group,keys] of Object.entries(fields)) for(const key of keys) if(typeof site[group]?.[key]!=='string' || site[group][key].length>5000) return false;
  if(!goodImage(site.home.heroImage)||!goodImage(site.about.image)||!site.contact.email.includes('@')) return false;
  if(!Array.isArray(catalog.categories)||!catalog.categories.length||catalog.categories.length>50||!Array.isArray(catalog.products)||catalog.products.length>150) return false;
  const ids=new Set();
  for(const c of catalog.categories) { if(!c || !/^[a-z0-9-]{1,100}$/.test(c.id)||typeof c.name!=='string'||!c.name.trim()||typeof c.summary!=='string'||ids.has(c.id))return false;ids.add(c.id); }
  const slugs=new Set();
  for(const p of catalog.products) {
    if(!p||typeof p.slug!=='string'||!/^[a-z0-9-]{1,100}$/.test(p.slug)||slugs.has(p.slug)||!ids.has(p.category)||typeof p.name!=='string'||!p.name.trim()||typeof p.summary!=='string'||!p.summary.trim()||typeof p.categoryName!=='string'||!goodImage(p.image))return false;
    slugs.add(p.slug);
    if(!Array.isArray(p.features)||!Array.isArray(p.applications)||!Array.isArray(p.gallery)||p.gallery.length>30||!p.specs||typeof p.specs!=='object'||Array.isArray(p.specs))return false;
    if(![...p.features,...p.applications,...Object.values(p.specs)].every(x=>typeof x==='string'&&x.length<=5000))return false;
    if(!p.gallery.every(x=>x&&goodImage(x.src)&&typeof x.alt==='string'&&x.alt.length<=5000))return false;
  }
  return true;
}
export function responseError(error) { return Response.json({error:error?.status===409 || error?.status===422 ? 'The site changed while you were editing. Reconnect to load the latest version.' : 'The request could not be completed. Please try again.'},{status:error?.status===409 || error?.status===422 ? 409 : 502,headers:{'Cache-Control':'no-store'}}); }
