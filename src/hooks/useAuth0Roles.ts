// hooks/useRoles.js
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwtDecode from 'jwt-decode';
import { environment } from '@/environments/environment';

const useAuth0Roles = () => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [roles, setRoles] = useState([]);
	// const [permissions, setPermissions] = useState([]);

	useEffect(() => {
		const fetchRoles = async () => {
			if (isAuthenticated) {
				try {
					const token = await getAccessTokenSilently({
						authorizationParams: {
							audience: environment.auth.authorizationParams.audience // Value in Identifier field for the API being called.
							// scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
						}
					});
					const decodedToken = jwtDecode(token);
					const userRoles = decodedToken['https://custom.ziniot.com/roles'] || [];
					// const userPermissions = decodedToken[`permissions`]; // Custom claim (if set)
					setRoles(userRoles);
				} catch (error) {
					console.error('Error fetching roles:', error);
				}
			}
		};

		if (isAuthenticated) {
			fetchRoles();
		}
	}, [isAuthenticated, getAccessTokenSilently]);

	return roles;
};

export default useAuth0Roles;
