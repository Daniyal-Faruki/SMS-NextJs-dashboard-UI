'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { environment } from '@/environments/environment';
import LoadingSplash from '@/components/shared/LoadingSplash';

interface CustomJwtPayload extends JwtPayload {
  'https://custom.ziniot.com/roles'?: string[];
}

type ProtectedRouteProps = {
  requiredRoles: string[];
  children: React.ReactNode;
};

export default function ProtectedRoute({
  requiredRoles = [],
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0();
  const [accessChecked, setAccessChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkRoles = async () => {
      if (!isAuthenticated) {
        setAccessChecked(true);
        setHasAccess(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: environment.auth.authorizationParams.audience,
          },
        });

        const decoded = jwtDecode<CustomJwtPayload>(token);
        const userRoles = decoded['https://custom.ziniot.com/roles'] || [];

        const matched = requiredRoles.some((role) => userRoles.includes(role));
        setHasAccess(matched);
      } catch (error) {
        console.error('Token decode error:', error);
        setHasAccess(false);
      } finally {
        setAccessChecked(true);
      }
    };

    checkRoles();
  }, [isAuthenticated, getAccessTokenSilently, requiredRoles]);

  if (!accessChecked || isLoading) {
    return <LoadingSplash></LoadingSplash>;
  }

  if (!hasAccess) { // Must be showing an Error Page here 
    console.log("You do not have access to this page. (ProtectedRoute)");
    
    setTimeout(() => {
      loginWithRedirect();
    }, 5000);
    // return <div>You do not have access to this page. "ProtectedRoute"</div>;
  }

  // ✅ Only render children when access is confirmed
  return <>{children}</>;
}
