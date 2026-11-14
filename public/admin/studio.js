'use strict';
(() => {
  const $ = (selector) => document.querySelector(selector);
  const el = (tag, text, cls) => { const node = document.createElement(tag); if (text != null) node.textContent = text; if (cls) node.className = cls; return node; };
  const fieldMap = {
    home: { label: 'Home page', description: 'Edit the main messages and hero image visitors see first.', fields: [ ['eyebrow','Small heading'],['heading','Main heading'],['intro','Introduction','long'],['heroImage','Hero image','image'],['valueHeading','Why choose Simlux heading'],['categoryHeading','Product categories heading'],['featuredHeading','Featured products heading'],['useHeading','Applications heading'],['useIntro','Applications description','long'],['ctaHeading','Bottom heading'],['ctaText','Bottom description','long'] ] },
    about: { label:'About page', description:'Tell customers about your business.', fields:[['heading','Main heading'],['intro','Introduction','long'],['image','Showroom image','image'],['imageAlt','Showroom image description'],['focusHeading','Company focus heading'],['story1','Company story','long'],['story2','Company mission','long'],['ctaHeading','Bottom heading'],['ctaText','Bottom description','long']] },
    productsPage: {label:'Products page',description:'Edit the introduction above your product catalog.',fields:[['heading','Page heading'],['intro','Introduction','long']]},
    contact: {label:'Contact details',description:'Update the contact page and the details in your footer. This does not change the email address receiving form submissions.',fields:[['heading','Page heading'],['intro','Introduction','long'],['email','Displayed email'],['phone','Displayed phone'],['address','Displayed address','long'],['helper','Quotation advice','long']]},
    footer: {label:'Footer',description:'Edit the short description at the bottom of every page.',fields:[['description','Company description','long']]}
  };
  let site, catalog, loadedHead = '', tab = 'home', selected = 0, dirty = false, busy = false, demoMode = false;
  let queued = new Map(), previews = new Map();
  const setStatus = (text, error=false) => { const node=$('#status'); node.textContent=text; node.classList.toggle('error-state',error); };
  const markDirty = () => { dirty=true; setStatus('You have unpublished changes. They stay in this tab until you publish.'); };
  async function api(path, options={}) {
    const response=await fetch(`/api/studio/${path}`,{...options,headers:{...(options.body ? {'Content-Type':'application/json'} : {})}});
    const body=await response.json().catch(()=>({}));
    if(!response.ok) {const error=new Error(body.error || 'The editor could not complete the request.');error.status=response.status;throw error;} return body;
  }
  async function connect() {
    try { const data=await api('state'); site=data.site;catalog=data.catalog;loadedHead=data.head;
      if (!site.home || !Array.isArray(catalog.products) || !Array.isArray(catalog.categories)) throw new Error('The website content is not in the expected format.');
      demoMode=false; $('#welcome').hidden=true;$('#editor').hidden=false;tab='home';render();
    } catch(error) { if(error.status!==401) $('#connect-error').textContent=error.message; }
  }
  connect();
  $('#try-demo').addEventListener('click', async () => {
    try { const response=await fetch('/admin/demo.json'); if(!response.ok) throw new Error('Demo unavailable'); const data=await response.json(); site=data.site; catalog=data.catalog; demoMode=true; dirty=false; tab='home'; $('#welcome').hidden=true; $('#editor').hidden=false; render(); setStatus('Demo mode: explore and edit sample content. Nothing will be published.'); }
    catch(err) { $('#connect-error').textContent=err.message; }
  });
  function formField(parent, object, key, label, kind='text', onUpdate) {
    const wrap=el('div',null,'field'); const id=`f-${crypto.randomUUID()}`; const caption=el('label',label,'field-label'); caption.htmlFor=id; wrap.append(caption);
    const input=el(kind==='long' ? 'textarea' : 'input'); input.id=id; input.value=object[key] ?? ''; if (kind!=='long') input.type='text';
    input.addEventListener('input',()=>{object[key]=input.value; markDirty(); if(onUpdate) onUpdate();}); wrap.append(input); parent.append(wrap); return wrap;
  }
  function imageField(parent, object, key, label) {
    const wrap=el('div',null,'field'); const title=el('label',label,'field-label'); const id=`img-${crypto.randomUUID()}`; title.htmlFor=id; wrap.append(title);
    const img=el('img',null,'image-preview'); img.alt='Current selected image'; img.src=queued.get(object[key])?.preview || previews.get(object[key]) || object[key] || ''; wrap.append(img);
    const upload=el('input'); upload.id=id; upload.type='file'; upload.accept='image/jpeg,image/png,image/webp,image/avif'; wrap.append(upload);
    const help=el('p','Choose a JPG, PNG, WebP or AVIF image, up to 2 MB. The image is uploaded when you publish.','field-help'); wrap.append(help);
    upload.addEventListener('change',async()=>{ const file=upload.files[0]; if(!file)return; if(!['image/jpeg','image/png','image/webp','image/avif'].includes(file.type) || file.size>2*1024*1024) { setStatus('Choose a JPG, PNG, WebP or AVIF image no larger than 2 MB.',true); upload.value=''; return; }
      try { const encoded=await new Promise((resolve,reject)=>{const reader=new FileReader(); reader.onload=()=>resolve(reader.result); reader.onerror=()=>reject(new Error('Could not read image')); reader.readAsDataURL(file);});
        const extension={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'}[file.type]; const path=`/uploads/${crypto.randomUUID()}.${extension}`; queued.set(path,{base64:encoded.split(',')[1],preview:encoded,type:file.type}); object[key]=path; img.src=encoded; markDirty();
      } catch(err) {setStatus(err.message,true);} }); parent.append(wrap);
  }
  function listField(parent, object, key, label) { const proxy={value:(object[key]||[]).join('\n')}; const wrap=formField(parent,proxy,'value',label,'long',()=>{object[key]=proxy.value.split('\n').map(x=>x.trim()).filter(Boolean);}); wrap.append(el('p','One item per line.','field-help')); }
  function renderProductFields(root,p) {
    formField(root,p,'name','Product name');
    const wrap=el('div',null,'field'); const lab=el('label','Category','field-label'); const select=el('select'); select.id=`f-${crypto.randomUUID()}`; lab.htmlFor=select.id; wrap.append(lab,select);
    for(const c of catalog.categories) { const option=el('option',c.name); option.value=c.id; option.selected=c.id===p.category; select.append(option); }
    select.addEventListener('change',()=>{p.category=select.value;p.categoryName=catalog.categories.find(c=>c.id===select.value)?.name||'';markDirty();}); root.append(wrap);
    formField(root,p,'summary','Product description','long'); imageField(root,p,'image','Main product image'); listField(root,p,'features','Features'); listField(root,p,'applications','Applications');
    const specText=Object.entries(p.specs||{}).map(([k,v])=>`${k}: ${v}`).join('\n'); const proxy={value:specText}; const s=formField(root,proxy,'value','Specifications','long',()=>{p.specs=Object.fromEntries(proxy.value.split('\n').map(line=>{let i=line.indexOf(':'); return i<0?[line.trim(),'']:[line.slice(0,i).trim(),line.slice(i+1).trim()];}).filter(([key])=>key));}); s.append(el('p','One per line, using “Label: value”.','field-help'));
    const title=el('h3','Product image gallery'); root.append(title); const gallery=el('div'); root.append(gallery); (p.gallery||[]).forEach((item,index)=>{ const card=el('div',null,'subsection'); imageField(card,item,'src',`Image ${index+1}`); formField(card,item,'alt','Image description'); const remove=el('button','Remove image','danger'); remove.type='button'; remove.addEventListener('click',()=>{p.gallery.splice(index,1);markDirty();render();});card.append(remove);gallery.append(card);});
    const add=el('button','+ Add gallery image','secondary'); add.type='button'; add.addEventListener('click',()=>{p.gallery ||= [];p.gallery.push({src:p.image,alt:p.name});markDirty();render();}); root.append(add);
  }
  function renderProducts(root) {
    const toolbar=el('div',null,'toolbar'); toolbar.append(el('p',`${catalog.products.length} products in your catalog`)); const add=el('button','+ Add product','secondary'); add.type='button'; toolbar.append(add); root.append(toolbar);
    add.addEventListener('click',()=>{ const c=catalog.categories[0]; catalog.products.push({slug:`product-${crypto.randomUUID().slice(0,8)}`,name:'New product',category:c.id,categoryName:c.name,image:'/products/led-application-collage.jpg',gallery:[],summary:'',features:[],specs:{},applications:[]});selected=catalog.products.length-1;markDirty();render(); });
    if (!catalog.products.length) {root.append(el('p','Add a product to get started.','empty')); return;}
    selected=Math.min(selected,catalog.products.length-1); const tabs=el('div',null,'product-tabs'); catalog.products.forEach((p,i)=>{const b=el('button',p.name || 'Untitled product',i===selected?'selected':'');b.type='button';b.addEventListener('click',()=>{selected=i;render();});tabs.append(b);}); root.append(tabs);
    const p=catalog.products[selected], panel=el('div',null,'subsection'); renderProductFields(panel,p); root.append(panel);
    const remove=el('button','Remove this product','danger'); remove.type='button'; remove.addEventListener('click',()=>{if(window.confirm(`Remove “${p.name}” from your website? This takes effect when you publish.`)){catalog.products.splice(selected,1);selected=Math.max(0,selected-1);markDirty();render();}});root.append(remove);
  }
  function renderCategories(root) { root.append(el('p','Category names and descriptions appear on the website. Products remain linked to their category.','field-help')); catalog.categories.forEach(c=>{const panel=el('div',null,'subsection'); panel.append(el('h3',c.name));formField(panel,c,'name','Category name','text',()=>{catalog.products.filter(p=>p.category===c.id).forEach(p=>p.categoryName=c.name);});formField(panel,c,'summary','Category description','long');root.append(panel);}); }
  function render() {
    document.querySelectorAll('.sidebar [data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab)); const root=$('#fields');root.replaceChildren();
    const info=fieldMap[tab] || (tab==='products'?{label:'Products',description:'Add and update products, specifications, and images.'}:{label:'Categories',description:'Keep your catalog clear and easy to browse.'}); $('#section-title').textContent=info.label;$('#section-description').textContent=info.description;
    if (tab==='products') return renderProducts(root); if(tab==='categories') return renderCategories(root);
    for(const [key,label,kind] of info.fields) { if(kind==='image') imageField(root,site[tab],key,label); else formField(root,site[tab],key,label,kind); }
  }
  document.querySelectorAll('.sidebar [data-tab]').forEach(button=>button.addEventListener('click',()=>{tab=button.dataset.tab;render();}));
  $('#disconnect').addEventListener('click',async()=>{if(dirty && !confirm('Discard unpublished changes and sign out?'))return; if(!demoMode){try {await api('logout',{method:'POST'});}catch(error){setStatus(error.message,true);return;}}site=null;catalog=null;queued.clear();previews.clear();dirty=false;demoMode=false;$('#editor').hidden=true;$('#welcome').hidden=false;});
  window.addEventListener('beforeunload', e=>{if(dirty){e.preventDefault();e.returnValue='';}});
  function usedPaths() {const text=JSON.stringify({site,catalog});return [...queued.keys()].filter(path=>text.includes(JSON.stringify(path)));}
  function validate() {if(!site.contact.email || !site.contact.email.includes('@')) throw new Error('Enter a valid displayed email address.'); if(!catalog.categories.length) throw new Error('At least one category is required.'); for(const p of catalog.products){if(!p.name.trim()||!p.summary.trim()||!p.image) throw new Error('Every product needs a name, description, and main image.'); if(!catalog.categories.some(c=>c.id===p.category)) throw new Error(`Choose a valid category for ${p.name}.`);} for(const c of catalog.categories) if(!c.name.trim()) throw new Error('Category names cannot be empty.');}
  $('#publish').addEventListener('click',async()=>{
    if(busy)return; if(demoMode){setStatus('This is a demo. Sign in to publish real changes.');return;} if(!dirty){setStatus('There are no unpublished changes.');return;}
    try { validate(); } catch(e) {setStatus(e.message,true);return;}
    if(!confirm('Publish these changes to your website? Vercel will build the updated site after the changes are saved.'))return;
    busy=true;const button=$('#publish');button.disabled=true;setStatus('Publishing your changes. Please keep this tab open…');
    try {
      const uploads=[];
      for(const path of usedPaths()){const image=queued.get(path);uploads.push(await api('upload',{method:'POST',body:JSON.stringify({path,base64:image.base64,type:image.type})}));}
      const result=await api('publish',{method:'POST',body:JSON.stringify({head:loadedHead,site,catalog,uploads})});
      loadedHead=result.head;for(const [path,image] of queued) previews.set(path,image.preview);queued.clear();dirty=false;setStatus('Changes saved to GitHub. Vercel should now build and publish your website; this can take a few minutes.');render();
    } catch(e){setStatus(`Could not publish: ${e.message}`,true);} finally {busy=false;button.disabled=false;}
  });
})();
