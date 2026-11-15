'use strict';
/* Uses the actual site pages in a same-origin frame. Draft data stays in the editor tab. */
window.SimluxPreview = {
  create({ getData, onSelect, onNotice }) {
    const frame = document.querySelector('#site-preview');
    const stage = document.querySelector('#preview-stage');
    const canvas = document.querySelector('#preview-canvas');
    const placeholder = document.querySelector('#preview-placeholder');
    const hint = document.querySelector('#preview-hint');
    const label = document.querySelector('#preview-page-label');
    const desktop = document.querySelector('#preview-desktop');
    const mobile = document.querySelector('#preview-mobile');
    const panel = document.querySelector('.preview-panel');
    const expand = document.querySelector('#preview-expand');
    const routes = { home:'/', about:'/about', productsPage:'/products', contact:'/contact', footer:'/', categories:'/', products:'/studio-preview/product' };
    const labels = {home:'Home page',about:'About page',productsPage:'Products page',contact:'Contact page',footer:'Footer on the home page',categories:'Categories on the home page',products:'Product details'};
    let route = '', ready = false, activeKey = '', selectedSize = window.matchMedia('(max-width: 850px)').matches ? 'phone' : 'desktop', scrollAfterLoad = false, expanded = false;
    let frameDocument = null, previewId = '', loaded = false, hydrated = false, loadTimer;
    const styleText = `
      [data-studio-field] { outline:2px dashed rgba(22,93,66,.48); outline-offset:3px; cursor:pointer !important; }
      [data-studio-field]:hover, [data-studio-field]:focus, [data-studio-field][data-studio-active] { outline:4px solid #11805a !important; outline-offset:4px; }
      [data-studio-field]:focus { scroll-margin:24px; }
      [data-studio-field]:empty { min-height:1em; min-width:3em; display:inline-block; }
      .studio-preview-tick { color:#11805a; font-weight:700; flex:none; }
      .viewport-fade { pointer-events:none !important; }
      html { scroll-behavior:auto !important; }
    `;
    function readable(key) {
      const node = [...document.querySelectorAll('[data-preview-key]')].find(el => el.dataset.previewKey === key);
      return node?.closest('.field')?.querySelector('label')?.textContent || 'this part';
    }
    function asset(path, data) { return data.queued.get(path)?.preview || data.previews.get(path) || path || ''; }
    function text(node, value) { const next=String(value ?? ''); if(node.textContent!==next) node.textContent=next; }
    function image(node, path, data) {
      const next=asset(path,data); if(!next) return;
      node.removeAttribute('srcset'); node.removeAttribute('sizes');
      if(node.getAttribute('src')!==next) node.setAttribute('src',next);
    }
    function setMarker(node,key) { node.setAttribute('data-studio-field',key); }
    function createCard(doc, product, featured, data) {
      const card=doc.createElement('a'); card.className='product-card'; card.href=`/products/${encodeURIComponent(product.slug)}`;
      card.setAttribute('data-studio-product',product.slug);
      const img=doc.createElement('img'); img.width=900;img.height=675;img.alt=`${product.name} product scene`;
      setMarker(img,`catalog.product.${product.slug}.image`); image(img,product.image,data);card.append(img);
      const info=doc.createElement('div');
      for(const [tag,key,value] of [['span','category',product.categoryName],['h3','name',product.name],['p','summary',product.summary]]) {
        const child=doc.createElement(tag);setMarker(child,`catalog.product.${product.slug}.${key}`);text(child,value);info.append(child);
      }
      if(!featured){const link=doc.createElement('strong');link.className='card-link';link.textContent='View details →';info.append(link);}
      card.append(info);return card;
    }
    function syncCards(doc, data) {
      for(const grid of doc.querySelectorAll('[data-studio-catalog]')) {
        const items=grid.dataset.studioCatalog==='featured' ? data.catalog.products.slice(0,3) : data.catalog.products;
        const signature=JSON.stringify(items.map(p=>[p.slug,p.name,p.summary,p.categoryName,p.image,asset(p.image,data)]));
        if(grid.dataset.studioSignature===signature)continue;
        grid.dataset.studioSignature=signature;
        grid.replaceChildren(...items.map(p=>createCard(doc,p,grid.dataset.studioCatalog==='featured',data)));
      }
    }
    function syncProduct(doc, product, data) {
      if(!product) return;
      for(const node of doc.querySelectorAll('[data-studio-field]')) {
        const key=node.dataset.studioField;
        if(key==='product.name') text(node,product.name);
        else if(key==='product.summary') text(node,product.summary);
        else if(key==='product.category') text(node,product.categoryName);
        else if(key==='product.image') { image(node,product.image,data);node.alt=`${product.name} lighting application`; }
        else if(key==='product.features') {
          const items=product.features || []; const signature=JSON.stringify(items);
          if(node.dataset.studioSignature!==signature){node.dataset.studioSignature=signature;node.replaceChildren(...items.map(item=>{const li=doc.createElement('li'); const tick=doc.createElement('span');tick.className='studio-preview-tick';tick.setAttribute('aria-hidden','true');tick.textContent='✓';li.append(tick,doc.createTextNode(item));return li;}));}
        } else if(key==='product.specs') {
          const entries=Object.entries(product.specs||{});const signature=JSON.stringify(entries);
          if(node.dataset.studioSignature!==signature){node.dataset.studioSignature=signature;node.replaceChildren(...entries.map(([name,value])=>{const row=doc.createElement('div'),dt=doc.createElement('dt'),dd=doc.createElement('dd');text(dt,name);text(dd,value);row.append(dt,dd);return row;}));}
        } else if(key==='product.applications') {
          const items=product.applications||[];const signature=JSON.stringify(items);
          if(node.dataset.studioSignature!==signature){node.dataset.studioSignature=signature;node.replaceChildren(...items.map(item=>{const span=doc.createElement('span');text(span,item);return span;}));}
        }
      }
      const gallery=doc.querySelector('[data-studio-gallery]');
      if(gallery) {
        const items=product.gallery||[];const signature=JSON.stringify(items.map(x=>[x.src,x.alt,asset(x.src,data)]));
        if(gallery.dataset.studioSignature!==signature){
          gallery.dataset.studioSignature=signature;
          gallery.replaceChildren(...items.map((item,index)=>{const fig=doc.createElement('figure');if(index===0)fig.className='feature';const img=doc.createElement('img');img.alt=item.alt||'';img.width=index===0?1200:720;img.height=index===0?800:540;setMarker(img,`product.gallery.${index}.src`);image(img,item.src,data);const caption=doc.createElement('figcaption');setMarker(caption,`product.gallery.${index}.alt`);text(caption,item.alt);fig.append(img,caption);return fig;}));
          gallery.closest('.product-gallery-section').hidden=items.length===0;
        }
      }
    }
    function makeTargetsAccessible(doc) {
      for(const node of doc.querySelectorAll('[data-studio-field]')) {
        if(!node.hasAttribute('tabindex'))node.setAttribute('tabindex','0');
        node.setAttribute('role','button');
        const key=node.dataset.studioField;
        node.setAttribute('aria-label',`Edit ${readable(key)}`);
      }
    }
    function applyData() {
      if(!ready || !frameDocument)return;
      const data=getData();if(!data.site||!data.catalog)return;
      const doc=frameDocument;
      const values={};
      for(const [group,fields] of Object.entries(data.site))for(const [name,value] of Object.entries(fields))values[`${group}.${name}`]=value;
      for(const category of data.catalog.categories){values[`category.${category.id}.name`]=category.name;values[`category.${category.id}.summary`]=category.summary;}
      syncCards(doc,data);
      for(const node of doc.querySelectorAll('[data-studio-field]')) {
        const key=node.dataset.studioField;
        if(Object.prototype.hasOwnProperty.call(values,key)) {
          if(node.tagName==='IMG'){image(node,values[key],data);if(key==='about.image')node.alt=data.site.about.imageAlt||'';}
          else text(node,values[key]);
        }
      }
      if(data.tab==='products')syncProduct(doc,data.catalog.products[data.selected],data);
      makeTargetsAccessible(doc);markActive(false);
    }
    function markActive(scroll) {
      if(!ready||!frameDocument)return;
      let chosen=null;
      for(const node of frameDocument.querySelectorAll('[data-studio-field]')) {
        const match=!!activeKey && (node.dataset.studioField===activeKey || node.dataset.studioAlternate===activeKey);
        node.toggleAttribute('data-studio-active',match);if(match&&!chosen)chosen=node;
      }
      if(chosen && scroll)chosen.scrollIntoView({block:'center',inline:'nearest',behavior:'auto'});
      if(activeKey) hint.textContent=chosen ? `Highlighted on the page: ${readable(activeKey)}.` : 'This setting does not have a visible position in this preview.';
    }
    function resize() {
      const width=selectedSize==='phone'?390:1280;
      const scale=Math.min(1,Math.max(0.1,(stage.clientWidth-2)/width));
      canvas.style.width=`${Math.round(width*scale)}px`;
      frame.style.width=`${width}px`;
      frame.style.height=`${Math.ceil(stage.clientHeight/scale)}px`;
      frame.style.transform=`scale(${scale})`;
    }
    function activateSize(size) { selectedSize=size;desktop.setAttribute('aria-pressed',String(size==='desktop'));mobile.setAttribute('aria-pressed',String(size==='phone'));resize(); }
    function setExpanded(next) {
      expanded=next;panel.classList.toggle('is-enlarged',expanded);document.body.classList.toggle('preview-expanded',expanded);
      expand.textContent=expanded?'Close large preview':'Make bigger';expand.setAttribute('aria-expanded',String(expanded));
      if(expanded){panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Large website preview');}else{panel.removeAttribute('role');panel.removeAttribute('aria-modal');panel.removeAttribute('aria-label');}
      resize();
    }
    expand.addEventListener('click',()=>setExpanded(!expanded));
    document.addEventListener('keydown',event=>{
      if(!expanded)return;
      if(event.key==='Escape'){setExpanded(false);expand.focus();}
      if(event.key==='Tab'){
        const controls=[desktop,mobile,expand,frame];
        if(event.shiftKey&&document.activeElement===controls[0]){event.preventDefault();frame.focus();}
        else if(!event.shiftKey&&document.activeElement===frame){event.preventDefault();desktop.focus();}
      }
    });
    desktop.addEventListener('click',()=>activateSize('desktop'));
    mobile.addEventListener('click',()=>activateSize('phone'));
    new ResizeObserver(resize).observe(stage);activateSize(selectedSize);
    function finishLoad() {
      if(!loaded || !hydrated || !frameDocument)return;
      const style=frameDocument.createElement('style');style.textContent=styleText;frameDocument.head.append(style);
      frameDocument.querySelectorAll('video').forEach(video=>video.pause());
      frameDocument.querySelector('.hero-media[aria-hidden]')?.removeAttribute('aria-hidden');
      clearTimeout(loadTimer);ready=true;placeholder.hidden=true;resize();applyData();
      if(scrollAfterLoad){markActive(true);scrollAfterLoad=false;}
    }
    window.addEventListener('message',event=>{
      if(event.origin!==window.location.origin || event.source!==frame.contentWindow || event.data?.type!=='simlux-preview-ready' || event.data.id!==previewId)return;
      hydrated=true;finishLoad();
    });
    frame.addEventListener('load',()=>{
      if(!route)return;
      try {
        frameDocument=frame.contentDocument;
        if(!frameDocument || !frameDocument.querySelector('main')) throw new Error('The preview page is unavailable.');
        frameDocument.addEventListener('submit',event=>event.preventDefault(),true);
        frameDocument.addEventListener('click',event=>{
          const target=event.target instanceof frame.contentWindow.Element ? event.target.closest('[data-studio-field]') : null;
          event.preventDefault();event.stopPropagation();
          if(target) onSelect(target.dataset.studioField);
          else {hint.textContent='That part is not editable here. Choose an outlined part of the page.';onNotice?.();}
        },true);
        frameDocument.addEventListener('keydown',event=>{
          if(expanded&&event.key==='Escape'){event.preventDefault();setExpanded(false);expand.focus();return;}
          if(expanded&&event.key==='Tab'){
            const controls=[...frameDocument.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(node=>node.getClientRects().length);
            if(event.shiftKey&&event.target===controls[0]){event.preventDefault();expand.focus();return;}
            if(!event.shiftKey&&event.target===controls[controls.length-1]){event.preventDefault();desktop.focus();return;}
          }
          if(event.key!=='Enter'&&event.key!==' ')return;
          const target=event.target instanceof frame.contentWindow.Element ? event.target.closest('[data-studio-field]') : null;
          if(target){event.preventDefault();event.stopPropagation();onSelect(target.dataset.studioField);}
        },true);
        loaded=true;finishLoad();
      } catch {ready=false;placeholder.hidden=false;placeholder.textContent='The preview could not load. Reload this page to try again.';}
    });
    return {
      show(tab) {
        const next=routes[tab]||'/';label.textContent=labels[tab]||'Website';
        const data=getData();
        if(tab==='products'&&!data.catalog.products.length){ready=false;frameDocument=null;placeholder.hidden=false;placeholder.textContent='Add a product to see its preview.';route='';frame.removeAttribute('src');return;}
        if(route!==next){route=next;ready=false;loaded=false;hydrated=false;frameDocument=null;previewId=crypto.randomUUID();placeholder.textContent='Loading your preview…';placeholder.hidden=false;clearTimeout(loadTimer);loadTimer=setTimeout(()=>{if(!ready){placeholder.textContent='The preview could not load. Reload this page to try again.';}},15000);frame.src=`${next}?studio_preview=${encodeURIComponent(previewId)}`;}
        else applyData();
        resize();
      },
      update(){applyData();},
      select(key,{scroll=true}={}){activeKey=key||'';if(!ready)scrollAfterLoad=scroll;else markActive(scroll);},
      clear(){activeKey='';markActive(false);},
      collapse(){if(expanded)setExpanded(false);},
      reset(){if(expanded)setExpanded(false);activeKey='';route='';ready=false;loaded=false;hydrated=false;clearTimeout(loadTimer);frameDocument=null;frame.removeAttribute('src');placeholder.hidden=false;placeholder.textContent='Loading your preview…';},
    };
  },
};
