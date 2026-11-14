import { auth, clerkClient } from '@clerk/nextjs/server';
export const dynamic='force-dynamic';
export async function POST(request) {
  if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Request not allowed.'},{status:403});
  const {sessionId}=await auth();
  if(sessionId) {const client=await clerkClient(); await client.sessions.revokeSession(sessionId);}
  return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
}
