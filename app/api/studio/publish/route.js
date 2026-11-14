import { editorAccess, github, goodContent, readState, responseError, validHead, validUpload } from '@/lib/studio-server';
export const dynamic='force-dynamic';
export async function POST(request) {
  const access=await editorAccess(request,true); if(access.error)return Response.json({error:access.error},{status:access.status});
  try {
    const {head,site,catalog,uploads}=await request.json();
    if(!validHead(head)||!goodContent(site,catalog)||!Array.isArray(uploads)||uploads.length>100||!uploads.every(x=>validUpload(x,access.userId))||new Set(uploads.map(x=>x.path)).size!==uploads.length) return Response.json({error:'Please check the content and try again.'},{status:400});
    const current=await readState(); if(current.head!==head)return Response.json({error:'The site changed since you signed in. Copy your edits somewhere safe, then reconnect.'},{status:409});
    const parent=await github(`/git/commits/${head}`); const tree=uploads.map(({path,sha})=>({path:`public${path}`,mode:'100644',type:'blob',sha}));
    for(const [path,content] of [['content/site.json',site],['content/products.json',catalog]]) {const blob=await github('/git/blobs',{method:'POST',body:JSON.stringify({content:Buffer.from(JSON.stringify(content,null,2)+'\n').toString('base64'),encoding:'base64'})});tree.push({path,mode:'100644',type:'blob',sha:blob.sha});}
    const next=await github('/git/trees',{method:'POST',body:JSON.stringify({base_tree:parent.tree.sha,tree})});
    const commit=await github('/git/commits',{method:'POST',body:JSON.stringify({message:'Update website content from Simlux Studio',tree:next.sha,parents:[head]})});
    await github('/git/refs/heads/main',{method:'PATCH',body:JSON.stringify({sha:commit.sha,force:false})});
    return Response.json({head:commit.sha},{headers:{'Cache-Control':'no-store'}});
  } catch(error) {return responseError(error);}
}
