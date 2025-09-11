import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/ventas')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div>Cargando...</div>;

  return (
    <div className="container">
      <h1>Perfil del Vendedor</h1>
      <div className="card">
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
        <p><strong>Turno:</strong> Mañana</p>
        <p><strong>Comisión:</strong> 5%</p>
        <h2>Estadísticas del Mes</h2>
        <ul>
          <li>Ventas realizadas: {stats.ventas}</li>
          <li>Total vendido: ${stats.totalVendido}</li>
          <li>Comisión ganada: ${stats.comision}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;