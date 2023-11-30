const express = require('express');
const app = express();
const port = 3000;
const { createServer } = require('node:http');
const { join } = require('node:path');
const server = createServer(app);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});