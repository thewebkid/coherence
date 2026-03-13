const UPSTASH_URL = process.env.UPSTASH_KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_KV_REST_API_TOKEN;

async function redisCmd(...args) {
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}


async function handleGet(res) {
  try {
    const members = await redisCmd('ZRANGE', 'signals', '0', '-1');

    if (!Array.isArray(members) || members.length === 0) {
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
      return res.status(200).json([]);
    }

    const positions = await redisCmd('GEOPOS', 'signals', ...members);

    const signals = [];
    for (let i = 0; i < members.length; i++) {
      const coord = positions[i];
      if (Array.isArray(coord) && coord[0] != null && coord[1] != null) {
        signals.push({
          id: members[i],
          lng: parseFloat(coord[0]),
          lat: parseFloat(coord[1]),
        });
      }
    }

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(signals);
  } catch (err) {
    console.error('GET /api/signals error:', err);
    return res.status(500).json({ error: 'Failed to fetch signals', detail: err.message });
  }
}

async function handlePost(req, res) {
  try {
    const { lat, lng, id: existingId } = req.body || {};

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'lat and lng are required numbers' });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'lat/lng out of bounds' });
    }

    let id;
    if (existingId && typeof existingId === 'string' && existingId.length > 0) {
      const pos = await redisCmd('GEOPOS', 'signals', existingId);
      if (!Array.isArray(pos) || pos[0] == null || pos[1] == null) {
        return res.status(404).json({ error: 'Signal not found', detail: 'Cannot update: signal id not found.' });
      }
      id = existingId;
    } else {
      id = crypto.randomUUID();
    }

    await redisCmd('GEOADD', 'signals', String(lng), String(lat), id);

    return res.status(existingId ? 200 : 201).json({
      success: true,
      signal: { id, lat, lng },
    });
  } catch (err) {
    console.error('POST /api/signals error:', err);
    return res.status(500).json({ error: 'Failed to place signal', detail: err.message });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method === 'GET') {
    return handleGet(res);
  }
  if (req.method === 'POST') {
    return handlePost(req, res);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
