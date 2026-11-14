import { editorAccess, github, uploadSignature, responseError } from '@/lib/studio-server';
export const dynamic='force-dynamic';
export async function POST(request) {
  const access=await editorAccess(request,true); if(access.error)return Response.json({error:access.error},{status:access.status});
  try {
    const {base64,type,path}=await request.json();
    const extensions={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'};
    if(!extensions[type]||typeof path!=='string'||!new RegExp(`^/uploads/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}\\.${extensions[type]}$`).test(path)||typeof base64!=='string'||base64.length>2800000||!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) return Response.json({error:'Choose an image no larger than 2 MB.'},{status:400});
    const bytes=Buffer.from(base64,'base64'); if(!bytes.length||bytes.length>2*1024*1024) return Response.json({error:'Choose an image no larger than 2 MB.'},{status:400});
    const good=type==='image/jpeg' ? bytes.subarray(0,3).equals(Buffer.from([0xff,0xd8,0xff])) : type==='image/png' ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : type==='image/webp' ? bytes.subarray(0,4).toString()==='RIFF' && bytes.subarray(8,12).toString()==='WEBP' : bytes.subarray(4,12).toString().startsWith('ftyp');
    if(!good)return Response.json({error:'The file is not a valid supported image.'},{status:400});
    const blob=await github('/git/blobs',{method:'POST',body:JSON.stringify({content:base64,encoding:'base64'})});
    return Response.json({path,sha:blob.sha,proof:uploadSignature(path,blob.sha,access.userId)},{headers:{'Cache-Control':'no-store'}});
  } catch(error) {return responseError(error);}
}
