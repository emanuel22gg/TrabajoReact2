import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} EmaO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}