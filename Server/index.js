// client/server.js

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Todas las rutas que no coincidan con un archivo en 'dist' serán redirigidas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
