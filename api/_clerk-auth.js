import { createClerkClient, verifyToken } from '@clerk/backend';

const ALLOWED_EMAILS = ['iamthewebkid@gmail.com', 'mahunahi@gmail.com', 'kid@thewebkid.com'];

export async function verifyAdminAuth(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: missing token' });
    return null;
  }

  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  if (!CLERK_SECRET_KEY) {
    console.error('CLERK_SECRET_KEY is not set');
    res.status(500).json({ error: 'Auth service not configured' });
    return null;
  }

  try {
    const payload = await verifyToken(token, { secretKey: CLERK_SECRET_KEY });
    const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY });
    const user = await clerk.users.getUser(payload.sub);

    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!ALLOWED_EMAILS.includes(email)) {
      res.status(403).json({ error: 'Forbidden: account not authorized for admin access' });
      return null;
    }

    return { userId: payload.sub, email };
  } catch (err) {
    console.error('Clerk token verification failed:', err.message);
    res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
    return null;
  }
}
