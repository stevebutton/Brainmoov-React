import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const uploadPlugin = {
  name: 'asset-upload-api',
  configureServer(server) {
    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const dir = path.resolve('public/uploads');
          fs.mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
          cb(null, `${base}-${Date.now()}${ext}`);
        },
      }),
    });

    server.middlewares.use('/api/upload', (req, res, next) => {
      if (req.method !== 'POST') return next();
      upload.single('image')(req, res, (err) => {
        if (err || !req.file) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'No file' }));
          return;
        }
        const url = `/uploads/${req.file.filename}`;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ url }));
      });
    });

    server.middlewares.use('/api/save-config', (req, res, next) => {
      if (req.method !== 'POST') return next();
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const config = JSON.parse(body);
          const configPath = path.resolve('public/asset-config.json');
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    });
  },
};

export default defineConfig({
  plugins: [react(), uploadPlugin],
  server: {
    port: 3000,
    open: true
  }
})
