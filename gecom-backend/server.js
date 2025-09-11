const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  res.json({ 
    user: 'Juan Pérez', 
    role: 'vendedor', 
    token: '123abc' 
  });
});

app.get('/ventas', (req, res) => {
  res.json({
    ventas: 47,
    totalVendido: 125680,
    comision: 6284
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor backend en http://localhost:${PORT}`));