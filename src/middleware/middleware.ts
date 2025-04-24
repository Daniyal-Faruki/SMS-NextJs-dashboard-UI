// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode
// import { JwtPayload } from 'jwt-decode'; // Import JwtPayload type from jwt-decode
// import { auth0 } from './lib/auth0';

// // Define a type for the decoded JWT with roles
// interface CustomJwtPayload extends JwtPayload {
//   'https://custom.ziniot.com/roles'?: string[];  // Custom roles claim
// }

// // Helper function to check user roles
// function checkRole(userRoles: string[], allowedRoles: string[]): boolean {
//   return allowedRoles.some(role => userRoles.includes(role));
// }

// export async function middleware(req: NextRequest) {
//   const session = await auth0.getSession(req);
//   const user = session?.user;

//   const { pathname } = req.nextUrl;

// // ✅ Console to check if middleware runs at all
// console.log('[Middleware] Running for path:', pathname);
// debugger
//   // Get the JWT token from the Authorization header (or cookies if you store it there)
//   const token = req.headers.get('Authorization')?.split(' ')[1] || req.cookies.get('authToken')?.value; // Use .value to extract the string

//   if (!token) {
//     console.log('[Middleware]aaa No token found');
//     // If no token, redirect to unauthorized page
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }
//   try {
//       // Decode the JWT token to extract user roles
//       const decodedToken = jwtDecode<CustomJwtPayload>(token); // Use jwtDecode here
      
//       // Access custom claims with proper types
//       const userRoles = decodedToken['https://custom.ziniot.com/roles'] || []; // Extract roles from the token
//       console.log('[Middleware] User roles:', userRoles);

//       // Define protected routes and their allowed roles
//     const protectedRoutes = [
//       { path: '/employees', roles: ['org-admin', 'rps-admin', 'sys-admin'] },
//       { path: '/employeeRewards', roles: ['org-admin', 'rps-admin', 'sys-admin', 'user'] },
//     ];

//     // Check if the user is trying to access a protected route
//     const route = protectedRoutes.find(route => pathname.startsWith(route.path));

//     if (route && !checkRole(userRoles, route.roles)) {
//       console.log('[Middleware] Role not allowed. Redirecting to /unauthorized');
//       // Redirect unauthorized users
//       // return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }

//   } catch (error) {
//     console.error('[Middleware] Error decoding token:', error);
//     // Redirect if token decoding fails (e.g., invalid token)
//     // return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   console.log('[Middleware] Access granted');
//   // Allow access if the user has the correct role or the route is not protected
//   return NextResponse.next();
// }
