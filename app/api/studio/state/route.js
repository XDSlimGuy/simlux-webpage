import { editorAccess, readState, responseError } from '@/lib/studio-server';
export const dynamic='force-dynamic';
export async function GET(request) {
  const access=await editorAccess(request); if(access.error)return Response.json({error:access.error},{status:access.status,headers:{'Cache-Control':'no-store'}});
  try {return Response.json(await readState(),{headers:{'Cache-Control':'no-store'}});} catch(error) {return responseError(error);}
}
