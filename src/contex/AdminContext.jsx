import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useContext } from "react";
import { AuthContextInstance } from './AuthContext';


const AdminContextInstance = createContext({});

const AdminContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { loggedInUserID } = useContext(AuthContextInstance);


  const navigate = useNavigate();


return (

  <AdminContextInstance.Provider value={{
    isLoading, setIsLoading,
  }}>
    {children}
  </AdminContextInstance.Provider>
);

};

export { AdminContextInstance }
export default AdminContext

