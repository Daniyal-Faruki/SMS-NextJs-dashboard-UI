import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode'; // Correct import using named export
import { environment } from '@/environments/environment';
import { JwtPayload } from 'jwt-decode'; // Import JwtPayload

// Define the type for the JWT payload
interface CustomJwtPayload extends JwtPayload {
  'https://custom.ziniot.com/roles'?: string[];  // Custom roles claim
  permissions?: string[];  // Custom permissions claim
}

const useAuth0Roles = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: environment.auth.authorizationParams.audience,
            },
          });

          // Decode the token with the custom type
          const decodedToken = jwtDecode<CustomJwtPayload>(token);

          // Access custom claims with proper types
          const userRoles = decodedToken['https://custom.ziniot.com/roles'] || [];
          const userPermissions = decodedToken['permissions'] || [];

          setRoles(userRoles);
          setPermissions(userPermissions);

        } catch (error) {
          console.error('Error fetching roles:', error);
          setError(error instanceof Error ? error : new Error('Unknown error'));
        }
      }
    };

    if (isAuthenticated) {
      fetchRoles();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return { roles, permissions, error };
};

export default useAuth0Roles;
