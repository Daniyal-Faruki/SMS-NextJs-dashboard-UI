export const environment = {
	production: false,
	apiUrl: 'http://localhost:5261',
	auth: {
		domain: 'zin.auth0.com',
		clientId: '5HxtgYDvrkArUMyiXE2rzjSRJPMwCu6v',
		authorizationParams: {
			redirect_uri: window.location.origin,
			audience: 'https://localhost-win:7192'
		}
	},
	httpInterceptor: {
		allowedList: [`http://localhost:5261/*`]
	}
};
