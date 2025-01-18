import { createContext, useContext, useState } from "react";

export const AddressContext = createContext();
export const SetAddressContext = createContext();

export const useAddress = () => useContext(AddressContext);
export const useSetAddress = () => useContext(SetAddressContext);

export const AddressProvider = ({ children }) => {    
  const [address, setAddress] = useState({});
  return (
    <AddressContext.Provider value={address}>
      <SetAddressContext.Provider value={setAddress}>
        {children}
      </SetAddressContext.Provider>
    </AddressContext.Provider>
  );
};