// src/app/providers/AuthProvider.tsx
'use client';

import { environment } from '@/environments/environment';
import { Auth0Provider } from '@auth0/auth0-react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
    domain={environment.auth.domain} //{process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    clientId={environment.auth.clientId}//{process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
    authorizationParams={{
      redirect_uri: typeof window !== "undefined" ? window.location.origin : "",// redirect_uri: window.location.origin used this in VITE & Angular
    }}
    >
      {children}
    </Auth0Provider>
  );
}
