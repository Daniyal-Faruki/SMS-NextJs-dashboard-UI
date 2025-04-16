// src/utils/authUtils.js
import { environment } from '@/environments/environment';
import { useAuth0 } from '@auth0/auth0-react'; // Import the useAuth0 hook

// Utility function to fetch authorization headers
export const useAuthHeaders = () => {
	const { getAccessTokenSilently } = useAuth0(); // Get the getAccessTokenSilently method from useAuth0

	const getAuthHeaders = async () => {
		try {
			// Fetch the access token using getAccessTokenSilently from the Auth0 context
			const token = await getAccessTokenSilently({
				authorizationParams: {
					audience: environment.auth.authorizationParams.audience // Value from your config
				}
			});
			console.log("Token From 'useAuthHeaders': ", token);
			return {
				Authorization: `Bearer ${token}` // Return headers with Bearer token
			};
		} catch (error) {
			console.error('Error fetching token:', error);
			throw error; // Handle error appropriately
		}
	};

	return { getAuthHeaders };
};
