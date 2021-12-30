import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const cartShowHandler = () => {
    setShowCart(true);
  }

  const cartHideHandler = () => {
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={cartHideHandler} />}
      <Header onShowCart={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
