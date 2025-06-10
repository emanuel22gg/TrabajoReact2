import React, { useContext } from "react";
import { ProductContext } from "../hooks/productContext.jsx";

export default function CarruselProductos() {
  const { productos, loading, error } = useContext(ProductContext);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" /></div>;
  if (error) return null;
  if (!productos.length) return null;


  return (
    <div id="carouselProductos" className="carousel slide custom-carousel mb-5" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        {productos.map((prod, idx) => (
          <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={prod.id}>
            <div className="carousel-img-bg d-flex justify-content-center align-items-center">
              <img
                src={prod.image}
                className="d-block custom-carousel-img"
                alt={prod.title}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev custom-carousel-btn" type="button" data-bs-target="#carouselProductos" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next custom-carousel-btn" type="button" data-bs-target="#carouselProductos" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}