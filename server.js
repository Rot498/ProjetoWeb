// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'produtos.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// util: ler/escrever produtos
function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}
function writeProducts(produtos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2), 'utf8');
}

// Endpoints
app.get('/api/produtos', (req, res) => {
  const produtos = readProducts();
  res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produtos = readProducts();
  const p = produtos.find(x => x.id === id);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(p);
});

app.post('/api/produtos', (req, res) => {
  const produtos = readProducts();
  const novo = req.body;
  novo.id = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
  produtos.push(novo);
  writeProducts(produtos);
  res.status(201).json(novo);
});

app.put('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produtos = readProducts();
  const idx = produtos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
  produtos[idx] = { ...produtos[idx], ...req.body, id };
  writeProducts(produtos);
  res.json(produtos[idx]);
});

app.delete('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  let produtos = readProducts();
  if (!produtos.some(p => p.id === id)) return res.status(404).json({ error: 'Produto não encontrado' });
  produtos = produtos.filter(p => p.id !== id);
  writeProducts(produtos);
  res.json({ message: 'Produto removido' });
});

// opcional: servir frontend (se você quiser servir a pasta public)
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`API Express rodando em http://localhost:${PORT}`));
