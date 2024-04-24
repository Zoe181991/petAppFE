import React, { createContext, useEffect, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContextInstance } from "./AuthContext";
import { PetsContextInstance } from "./PetsContext";
import { useToast } from "@chakra-ui/react";
import ToastBox from "../components/StyledComponents/ToastBox";

const UsersContextInstance = createContext({});

const UsersContext = ({ children }) => {
  const [errorMsgClient, setErrorMsgClient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const toast = useToast();

  const { loggedInUserID, setLoggedInUserID, setIsAdmin } =
    useContext(AuthContextInstance);
  const { setSavedPetsList, setFosteredPetsList, setAdoptedPetsList } =
    useContext(PetsContextInstance);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      fetchInfo(loggedInUserID);
    }
  }, []);

  const fetchInfo = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
        { withCredentials: true },
      );
      setLoggedInUser(res.data);
      setSavedPetsList(res.data.savedPets);
      if (res.data.role === "Admin") {
        setIsAdmin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${id}/savedpets`,
          { withCredentials: true },
        );
        setSavedPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdoptedPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${id}/adoptedpets`,
          { withCredentials: true },
        );
        setAdoptedPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFosteredPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/${id}/fosteredpets`,
          { withCredentials: true },
        );
        setFosteredPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginReq = async (userDetails) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        userDetails,
        { withCredentials: true },
      );
      if (res.data.ok) {
        localStorage.setItem("isLoggedin", res.data.id);
        setLoggedInUserID(res.data.id);
        setLoggedInUser(res.data);
        fetchInfo(res.data.id);
        navigate("/search");
      }
      setIsLoading(false);
    } catch (err) {
      toast({
        position: "bottom",
        status: "success",
        duration: 3000,
        render: () => <ToastBox text={err.response.data} />,
        isClosable: true,
      });
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <UsersContextInstance.Provider
      value={{
        errorMsgClient,
        setErrorMsgClient,
        fetchInfo,
        loggedInUser,
        setLoggedInUser,
        loginReq,
        fetchSavedPets,
        isLoading,
        setIsLoading,
        fetchAdoptedPets,
        fetchFosteredPets,
      }}
    >
      {children}
    </UsersContextInstance.Provider>
  );
};

export { UsersContextInstance };
export default UsersContext;
