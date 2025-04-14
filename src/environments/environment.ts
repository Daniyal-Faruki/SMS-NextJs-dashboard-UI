// import { domain, clientId } from '../app/modules/auth/Auth_0/auth_config.json';//auth_config.json

export const environment = {
	production: false,
	apiUrl: 'https://localhost:7192', //https://localhost:7192/api
	//featureFlag: true,
	auth: {
		domain: 'zin.auth0.com', //'dev-rv8uvmdpk6y01img.us.auth0.com',
		clientId: '5HxtgYDvrkArUMyiXE2rzjSRJPMwCu6v',
		authorizationParams: {
			redirect_uri: window.location.origin,
			audience: 'https://localhost-win:7192'
			//RoleClaimType: "https://custom.ziniot.com/roles"
		}
	},
	httpInterceptor: {
		allowedList: [`https://localhost:7192/*`]
	}
};
