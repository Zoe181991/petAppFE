import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";

const AdminContextInstance = createContext({});

const AdminContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AdminContextInstance.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AdminContextInstance.Provider>
  );
};

export { AdminContextInstance };
export default AdminContext;
