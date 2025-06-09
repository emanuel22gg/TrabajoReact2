import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.slice(6,12 )); 
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar los productos");
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ productos, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}