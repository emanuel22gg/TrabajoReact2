import React from 'react';
import Logo from "../../../assets/img/logo.png"; 
import { CartButton } from '../../cart/components/CartButton';


export default function Header() {
  return (
    <header className="bg-primary text-white py-3 shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" style={{ height: "40px", marginRight: "12px" }} />
          <h1 className="h3 mb-0">EmaO</h1>
        </div>
        <nav>
          <a href="#" className="text-white me-3 text-decoration-none">Inicio</a>
          <a href="#" className="text-white me-3 text-decoration-none">Productos</a>
          <a href="#" className="text-white text-decoration-none">Contacto</a>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}