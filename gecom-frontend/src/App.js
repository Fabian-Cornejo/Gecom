import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // mientras no hay base de datos real, usamos el endpoint dummy
    fetch('http://localhost:4000/ventas')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div>Cargando...</div>;

  return (
    <div className="container">
      {/* Menú lateral */}
      <aside className="sidebar">
        <h2>GECOM</h2>
        <nav>
          <ul>
            <li className="active">Vendedor</li>
            <li>Logout</li>
            <li>Módulo de Ventas</li>
            <li>Módulo de Clientes</li>
            <li>Arqueo de Caja</li>
            <li>Consulta de Stock</li>
            <li>Pedidos de Insumos</li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="content">
        <h1>Perfil del Vendedor</h1>
        <div className="card">
          <div className="info">
            <p><strong>Nombre Completo:</strong> Juan Pérez</p>
            <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
            <p><strong>ID Vendedor:</strong> V001</p>
            <p><strong>Email:</strong> juan.perez@gecom.com</p>
            <p><strong>Turno:</strong> Mañana</p>
            <p><strong>Comisión:</strong> 5%</p>
          </div>

          <h2>Estadísticas del Mes</h2>
          <div className="stats">
            <div className="stat green">
              <span>Ventas Realizadas</span>
              <strong>{stats.ventas}</strong>
            </div>
            <div className="stat blue">
              <span>Total Vendido</span>
              <strong>${stats.totalVendido}</strong>
            </div>
            <div className="stat green">
              <span>Comisión Ganada</span>
              <strong>${stats.comision}</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;