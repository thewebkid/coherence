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
