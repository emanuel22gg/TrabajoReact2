// Ejemplo en App.jsx
import React from "react";
import  ProductProvider  from "../hooks/productContext.jsx";
import Body from "../components/body.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/footer.jsx";
import '../../../shared/styles/App.css';

import { CartProvider } from "../../cart/hooks/cartContext";
import { Cart } from "../../cart/components/Cart";


export default function App() {
  return (
    <CartProvider>
    <ProductProvider>
      <Header />
      <Body />
      <Footer />
      <Cart />
    </ProductProvider>
    </CartProvider>
  );
}

