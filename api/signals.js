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

function fuzzCoordinates(lat, lng) {
  const gridSize = 0.5;
  const fuzzedLat = Math.round(lat / gridSize) * gridSize + (Math.random() - 0.5) * 0.3;
  const fuzzedLng = Math.round(lng / gridSize) * gridSize + (Math.random() - 0.5) * 0.3;
  return {
    lat: Math.max(-85, Math.min(85, fuzzedLat)),
    lng: ((fuzzedLng + 180) % 360) - 180,
  };
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
    const { lat, lng } = req.body || {};

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'lat and lng are required numbers' });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'lat/lng out of bounds' });
    }

    const fuzzed = fuzzCoordinates(lat, lng);
    const id = crypto.randomUUID();

    await redisCmd('GEOADD', 'signals', String(fuzzed.lng), String(fuzzed.lat), id);

    return res.status(201).json({
      success: true,
      signal: { id, lat: fuzzed.lat, lng: fuzzed.lng },
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
