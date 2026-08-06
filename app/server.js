import express from 'express';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// Serve static React production build files from /dist or /public
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// API Routes
app.get('/api/status', (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  res.json({
    status: 'online',
    service: 'Azure Student Terraform React Server',
    nodeVersion: process.version,
    platform: `${os.type()} ${os.release()} (${os.arch()})`,
    hostname: os.hostname(),
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    memoryUsage: {
      freeMB: Math.round(os.freemem() / (1024 * 1024)),
      totalMB: Math.round(os.totalmem() / (1024 * 1024)),
      heapUsedMB: Math.round(process.memoryUsage().heapUsed / (1024 * 1024))
    },
    cpus: os.cpus().length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', healthy: true });
});

// Fallback all SPA routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 React + Express server running on port ${PORT}`);
});
