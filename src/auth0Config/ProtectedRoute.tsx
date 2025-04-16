"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          // returnTo: router.pathname || '/',
          returnTo: window.location.pathname || "/", // default redirect
        },
      });
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    //TODO Loading Spinner to be added 
    return <div className="text-center mt-10">Loading...</div>; // or a spinner
  }

  return <>{children}</>;
}
