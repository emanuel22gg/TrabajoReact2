// Ejemplo en App.jsx
import React from "react";
import  ProductProvider  from "./features/landing/hooks/productContext.jsx";
import Body from "./features/landing/pages/body.jsx";
import Header from "./features/landing/pages/Header.jsx";
import Footer from "./features/landing/pages/footer.jsx";
import './shared/styles/App.css';


export default function App() {
  return (
    <ProductProvider>
      <Header />
      <Body />
      <Footer />
    </ProductProvider>
  );
}

