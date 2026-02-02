const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 8765;

app.use(express.json());
app.use(express.static('public'));

const CONFIG_PATH = path.join(os.homedir(), '.openclaw', 'openclaw.json');
const CACHE_DIR = path.join(__dirname, 'cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

app.get('/api/status', async (req, res) => {
  try {
    await fetch('http://127.0.0.1:18789/api/status', { timeout: 2000 });
    res.json({ running: true, status: 'OpenClaw 服务运行中' });
  } catch (error) {
    res.json({ running: false, status: 'OpenClaw 服务未运行' });
  }
});

app.get('/api/config', (req, res) => {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return res.status(404).json({ error: '配置文件不存在' });
    }
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: '读取配置文件失败' });
  }
});

app.post('/api/config', (req, res) => {
  try {
    const config = req.body;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '写入配置文件失败' });
  }
});

function getCachePath(provider) {
  return path.join(CACHE_DIR, `${provider}.json`);
}

app.get('/api/cache/:provider', (req, res) => {
  const { provider } = req.params;
  const cachePath = getCachePath(provider);
  
  if (fs.existsSync(cachePath)) {
    try {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      res.json(cache);
    } catch (error) {
      res.status(500).json({ error: '读取缓存失败' });
    }
  } else {
    res.json(null);
  }
});

app.post('/api/cache/:provider', (req, res) => {
  const { provider } = req.params;
  const cachePath = getCachePath(provider);
  
  try {
    fs.writeFileSync(cachePath, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '保存缓存失败' });
  }
});

app.delete('/api/cache/:provider', (req, res) => {
  const { provider } = req.params;
  const cachePath = getCachePath(provider);
  
  if (fs.existsSync(cachePath)) {
    fs.unlinkSync(cachePath);
  }
  res.json({ success: true });
});

app.delete('/api/cache', (req, res) => {
  if (fs.existsSync(CACHE_DIR)) {
    const files = fs.readdirSync(CACHE_DIR);
    files.forEach(file => {
      fs.unlinkSync(path.join(CACHE_DIR, file));
    });
  }
  res.json({ success: true });
});

app.get('/api/cache', (req, res) => {
  if (!fs.existsSync(CACHE_DIR)) {
    return res.json([]);
  }
  const files = fs.readdirSync(CACHE_DIR);
  const providers = files.map(file => file.replace('.json', ''));
  res.json(providers);
});

app.get('/open-config', (req, res) => {
  res.json({ url: 'http://127.0.0.1:18789/config' });
});

app.listen(PORT, () => {
  console.log(`OpenClaw Config Manager running at http://localhost:${PORT}`);
});
