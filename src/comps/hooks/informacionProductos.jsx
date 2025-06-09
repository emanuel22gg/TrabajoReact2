import React, { useContext } from "react";
import  {ProductContext}  from "./productContext.jsx";
import Products from "./products.jsx";

export default function InformacionProductos() {
  const { productos, loading, error } = useContext(ProductContext);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row g-4">
      {productos.map((prod) => (
        <div className="col-md-4" key={prod.id}>
          <Products {...prod} />
        </div>
      ))}
    </div>
  );
}