import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();
export const SetProductContext = createContext();

export const useProduct = () => useContext(ProductContext);
export const useSetProducts = () => useContext(SetProductContext);

export const ProductProvider = ({ children }) => {    
  const [Product, setProduct] = useState([]);
  return (
    <ProductContext.Provider value={Product}>
      <SetProductContext.Provider value={setProduct}>
        {children}
      </SetProductContext.Provider>
    </ProductContext.Provider>
  );
};