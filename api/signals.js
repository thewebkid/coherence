import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL,
  token: process.env.UPSTASH_KV_REST_API_TOKEN,
});

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
    const results = await redis.geosearch(
      'signals',
      { type: 'FROMLONLAT', coordinate: { lon: 0, lat: 0 } },
      { type: 'BYRADIUS', radius: 20038, radiusType: 'KM' },
      'ASC',
      { withCoord: true }
    );

    const signals = results.map((item) => ({
      id: item.member,
      lng: item.coord?.long ?? 0,
      lat: item.coord?.lat ?? 0,
    }));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
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

    await redis.geoadd('signals', {
      member: id,
      longitude: fuzzed.lng,
      latitude: fuzzed.lat,
    });

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
