import { createContext, useContext, useState } from "react";

export const CartContext = createContext();
export const SetCartContext = createContext();

export const useCart = () => useContext(CartContext);
export const useSetCart = () => useContext(SetCartContext);

export const CartProvider = ({ children }) => {    
  const [Cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={Cart}>
      <SetCartContext.Provider value={setCart}>
        {children}
      </SetCartContext.Provider>
    </CartContext.Provider>
  );
};