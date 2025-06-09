// Ejemplo en App.jsx
import React from "react";
import  ProductProvider  from "./comps/hooks/productContext.jsx";
import Body from "./comps/body.jsx";
import Header from "./comps/Header.jsx";
import Footer from "./comps/footer.jsx";
import './App.css';


export default function App() {
  return (
    <ProductProvider>
      <Header />
      <Body />
      <Footer />
    </ProductProvider>
  );
}

