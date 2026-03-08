import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/submit-observation' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const { project, context, whatShifted, whatDidNotShift, whereCoherent, whereResistant, notes, geography } = data;

                if (!project || !context || !whatShifted) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    error: 'Missing required fields: project, context, and whatShifted are required' 
                  }));
                  return;
                }

                if (!['Observation', 'Behavioral Ecology', 'Conversational Recursion'].includes(project)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    error: 'Invalid project value. Must be one of: Observation, Behavioral Ecology, Conversational Recursion' 
                  }));
                  return;
                }

                const POSTGRES_URL = process.env.POSTGRES_URL;
                
                if (!POSTGRES_URL) {
                  console.error('POSTGRES_URL environment variable is not set');
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    error: 'Database connection not configured. Please contact the site administrator.' 
                  }));
                  return;
                }

                const sql = neon(POSTGRES_URL);
                
                await sql`
                  INSERT INTO observations (
                    project,
                    context,
                    what_shifted,
                    what_did_not_shift,
                    where_coherent,
                    where_resistant,
                    notes,
                    geography
                  ) VALUES (
                    ${project},
                    ${context},
                    ${whatShifted},
                    ${whatDidNotShift || null},
                    ${whereCoherent || null},
                    ${whereResistant || null},
                    ${notes || null},
                    ${geography || null}
                  )
                `;
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('API middleware error:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to store observation. Please try again.' }));
              }
            });
          } else if (req.url === '/api/signals') {
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

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method === 'GET') {
              try {
                if (!UPSTASH_URL || !UPSTASH_TOKEN) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Upstash not configured' }));
                  return;
                }

                const members = await redisCmd('ZRANGE', 'signals', '0', '-1');

                if (!Array.isArray(members) || members.length === 0) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
                  res.end(JSON.stringify([]));
                  return;
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

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
                res.end(JSON.stringify(signals));
              } catch (error) {
                console.error('GET /api/signals error:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch signals', detail: error.message }));
              }
            } else if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Upstash not configured' }));
                    return;
                  }

                  const data = JSON.parse(body);
                  const { lat, lng } = data || {};

                  if (typeof lat !== 'number' || typeof lng !== 'number') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'lat and lng are required numbers' }));
                    return;
                  }
                  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'lat/lng out of bounds' }));
                    return;
                  }

                  const fuzzed = fuzzCoordinates(lat, lng);
                  const id = crypto.randomUUID();

                  await redisCmd('GEOADD', 'signals', String(fuzzed.lng), String(fuzzed.lat), id);

                  res.statusCode = 201;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    signal: { id, lat: fuzzed.lat, lng: fuzzed.lng },
                  }));
                } catch (error) {
                  console.error('POST /api/signals error:', error);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Failed to place signal', detail: error.message }));
                }
              });
            } else {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          } else {
            next();
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
});
