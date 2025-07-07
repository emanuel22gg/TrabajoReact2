import React from 'react';
import * as scroll from 'react-scroll';
const { Link } = scroll;
import Logo from "../../../assets/img/logo.png"; 
import { CartButton } from '../../cart/components/cartButton';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" style={{ height: "40px", marginRight: "12px" }} />
          <h1 className="h3 mb-0">EmaO</h1>
        </div>
        <nav>
          <Link to="inicio" smooth={true} duration={500} className="text-white me-3 text-decoration-none">Inicio</Link>
          <Link to="productos" smooth={true} duration={500} className="text-white me-3 text-decoration-none">Productos</Link>
          <Link to="dudas" smooth={true} duration={500} className="text-white me-3 text-decoration-none">Preguntas</Link>
          <CartButton />
          {!isAuthenticated ? (
            <button className="btn btn-outline-light ms-2" onClick={() => navigate('/login')}>
              Iniciar sesión
            </button>
          ) : (
            <button className="btn btn-outline-light ms-2" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}