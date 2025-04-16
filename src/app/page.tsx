'use client';

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      // ✅ User is logged in → go to (employeeRewards)
      router.push("/employeeRewards");
    } else {
      // ❌ Not logged in → redirect to Auth0 login
      loginWithRedirect({
        appState: {
          returnTo: "/employeeRewards",
        },
      });
    }
  }, [isLoading, isAuthenticated]);

  return null; // or a spinner, or "Redirecting..."
}
