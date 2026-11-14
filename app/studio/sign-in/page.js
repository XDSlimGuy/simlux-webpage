import { ClerkProvider, SignIn } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

export default function EditorSignIn() {
  const loginUsername = process.env.STUDIO_LOGIN_USERNAME || 'simlux-editor';
  return (
    <ClerkProvider>
      <main style={{minHeight:'80vh',display:'grid',placeItems:'center',padding:'2rem'}}>
        <SignIn routing="hash" forceRedirectUrl="/admin/index.html" initialValues={{username:loginUsername}} />
      </main>
    </ClerkProvider>
  );
}
