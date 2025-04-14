export interface CurrentUser {
	email: string;
	firstName: string;
	lastName: string;
	ssoId: string;
	ssoProvider: string;
	roles: string[];  // Array of roles that the user has, e.g. ['org-admin', 'rps-admin', 'user']
  }