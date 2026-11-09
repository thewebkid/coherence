## ADDED Requirements

### Requirement: Admin sign-in uses Google via Clerk
The system SHALL provide a sign-in flow at `/admin/sign-in` using Clerk's `<SignIn>` component configured for Google as the only provider. Only users whose primary email is in the allowlist `['iamthewebkid@gmail.com', 'mahunahi@gmail.com']` SHALL be granted access.

#### Scenario: Allowed admin signs in with Google
- **WHEN** an admin visits `/admin`, is not signed in, signs in with Google using an allowlisted email, and is redirected back
- **THEN** the admin panel is rendered and functional

#### Scenario: Non-allowlisted Google account is rejected
- **WHEN** a user signs in with a Google account whose email is not in the allowlist
- **THEN** they are signed out and shown an "Access denied" message; the admin panel is not rendered

#### Scenario: Unauthenticated visitor is redirected to sign-in
- **WHEN** an unauthenticated visitor navigates to `/admin`
- **THEN** they are redirected to `/admin/sign-in`

### Requirement: Admin API routes verify Clerk session server-side
Every admin serverless API endpoint SHALL verify the Clerk session token from the `Authorization: Bearer <token>` request header using `CLERK_SECRET_KEY`, resolve the user's primary email, and return HTTP 403 if the email is not in the allowlist, before processing any request.

#### Scenario: Valid admin token grants access to admin API
- **WHEN** an admin API request includes a valid Clerk session token for an allowlisted email
- **THEN** the request is processed and data is returned

#### Scenario: Missing or invalid token returns 401
- **WHEN** an admin API request has no Authorization header or an invalid token
- **THEN** the API returns HTTP 401 and no data is returned

#### Scenario: Valid token but non-allowlisted email returns 403
- **WHEN** an admin API request includes a valid Clerk session token for an email not in the allowlist
- **THEN** the API returns HTTP 403 and no data is returned

### Requirement: Admin route is excluded from static site generation
The system SHALL configure `vite-ssg` to exclude `/admin` and `/admin/sign-in` from static pre-rendering, ensuring these routes are served as client-side-rendered SPA routes only.

#### Scenario: Admin route not pre-rendered
- **WHEN** the site is built with `npm run build`
- **THEN** no static HTML file is generated for `/admin` or `/admin/sign-in`
