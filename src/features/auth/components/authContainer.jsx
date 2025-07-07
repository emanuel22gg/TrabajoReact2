import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AuthContainer() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login({ name: username });
    }
  };

  if (isAuthenticated) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h4>Bienvenido, {user?.name}!</h4>
        <button className="btn btn-danger mt-3" onClick={logout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <form className="p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h4>Iniciar sesión</h4>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Nombre de usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button className="btn btn-primary w-100" type="submit">Ingresar</button>
    </form>
  );
}