import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);          // guarda el usuario logueado
  const [form, setForm] = useState({ email:'', password:'' }); // formulario login
  const [stats, setStats] = useState(null);        // estadísticas de ventas

  // traer estadísticas cuando hay user logueado
  useEffect(() => {
    if (user) {
      fetch('http://localhost:4000/ventas')
        .then(res => res.json())
        .then(data => setStats(data));
    }
  }, [user]);

  // manejo inputs login
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // envío login
  const handleLogin = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setUser(data);   // guarda datos usuario devueltos por backend
  };

  // si no hay user → mostrar login
  if (!user) {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          /><br/>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          /><br/>
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  // si hay user logueado → mostrar perfil y estadísticas
  return (
    <div className="container">
      <h1>Perfil del Vendedor</h1>
      <button onClick={() => { setUser(null); setStats(null); }}>
        Cerrar sesión
      </button>

      <div className="card">
        <p><strong>Nombre:</strong> {user.user}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
        <p><strong>Turno:</strong> Mañana</p>
        <p><strong>Comisión:</strong> 5%</p>

        {stats ? (
          <>
            <h2>Estadísticas del Mes</h2>
            <ul>
              <li>Ventas realizadas: {stats.ventas}</li>
              <li>Total vendido: ${stats.totalVendido}</li>
              <li>Comisión ganada: ${stats.comision}</li>
            </ul>
          </>
        ) : (
          <p>Cargando estadísticas...</p>
        )}
      </div>
    </div>
  );
}

export default App;