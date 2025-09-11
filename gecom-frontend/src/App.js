import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({email:'', password:''});

  const handleChange = e => {
    setForm({...form, [e.target.name]:e.target.value});
  };

  const handleLogin = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setUser(data);
  };

  if(!user){
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input name="email" placeholder="Email" onChange={handleChange} /><br/>
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} /><br/>
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Bienvenido {user.user}</h1>
      <p>Rol: {user.role}</p>
      <button onClick={()=>setUser(null)}>Cerrar sesión</button>
    </div>
  );
}

export default App;