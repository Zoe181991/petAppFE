import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { AuthContextInstance } from "./AuthContext";
import { useToast } from "@chakra-ui/react";
import ToastBox from "../components/StyledComponents/ToastBox";

const PetsContextInstance = createContext({});

const PetsContext = ({ children }) => {
  const [petsList, setPetsList] = useState([]);
  const [savedPetsList, setSavedPetsList] = useState([]);
  const [fosteredPetsList, setFosteredPetsList] = useState([]);
  const [adoptedPetsList, setAdoptedPetsList] = useState([]);
  const [messageClient, setMessageClient] = useState("");
  const [isLoadingPets, setIsLoadingPets] = useState(false);

  const { loggedInUserID } = useContext(AuthContextInstance);
  const toast = useToast();

  const savePet = async (savePetToUser) => {
    setIsLoadingPets(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/pets/save`,
        savePetToUser,
        { withCredentials: true },
      );
      setSavedPetsList(res.data.savedPets);
      setIsLoadingPets(false);
      toast({
        position: "bottom",
        status: "success",
        duration: 3000,
        render: () => (
          <ToastBox
            text={`${savePetToUser.petName} was saved successfully! ❤️`}
          />
        ),
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setIsLoadingPets(false);
    }
  };

  const removeSavedPet = async (id, name) => {
    try {
      setIsLoadingPets(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}/removesaved/${loggedInUserID}`,
        { withCredentials: true },
      );
      const updateList = savedPetsList.filter((pet) => pet._id !== id);
      setSavedPetsList(updateList);
      setIsLoadingPets(false);

      toast({
        position: "bottom",
        status: "success",
        duration: 3000,
        render: () => (
          <ToastBox text={`${name} was removed from Saved Pets 💔`} />
        ),
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setIsLoadingPets(false);
    }
  };

  const fosterPet = async (id, name) => {
    setIsLoadingPets(true);

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}/foster/${loggedInUserID}`,
        { withCredentials: true },
      );
      setFosteredPetsList(res.data.fosteredPets);
      removeSavedPet(id, name);
      const updateList = savedPetsList.filter((pet) => pet._id !== id);
      setSavedPetsList(updateList);
      setIsLoadingPets(false);
      toast({
        position: "bottom",
        status: "success",
        duration: 3000,
        render: () => (
          <ToastBox
            text={`Congratulations! ${name} was fostered successfully.`}
          />
        ),
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setIsLoadingPets(false);
    }
  };

  const removeFosteredPet = async (id, name) => {
    setIsLoadingPets(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}/removefoster/${loggedInUserID}`,
        { withCredentials: true },
      );
      const updateList = fosteredPetsList.filter((pet) => pet._id !== id);
      setFosteredPetsList(updateList);
      setIsLoadingPets(false);
      if (res.status === 200) {
        toast({
          position: "bottom",
          status: "success",
          duration: 3000,
          render: () => (
            <ToastBox text={`${name} has been returned to the shelter 😥`} />
          ),
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      setIsLoadingPets(false);
    }
  };

  const adoptPet = async (id, name) => {
    setIsLoadingPets(true);

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}/adopt/${loggedInUserID}`,
        { withCredentials: true },
      );
      setAdoptedPetsList(res.data.adoptedPets);
      removeSavedPet(id, name);
      const updateSaveList = savedPetsList.filter((pet) => pet._id !== id);
      setSavedPetsList(updateSaveList);

      const updateList = fosteredPetsList.filter((pet) => pet._id !== id);
      setFosteredPetsList(updateList);
      setIsLoadingPets(false);

      toast({
        position: "bottom",
        status: "success",
        duration: 3000,
        render: () => (
          <ToastBox text={`${name} has a new home thanks to you! 🐕`} />
        ),
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setIsLoadingPets(false);
    }
  };

  const removeAdoptedPet = async (id, name) => {
    setIsLoadingPets(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}/removeadopt/${loggedInUserID}`,
        { withCredentials: true },
      );
      const updateList = adoptedPetsList.filter((pet) => pet._id !== id);
      setAdoptedPetsList(updateList);
      setIsLoadingPets(false);

      toast({
        position: "bottom",
        status: "success",
        duration: 3000,
        render: () => (
          <ToastBox text={`${name} has been returned to the shelter 😥`} />
        ),
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setIsLoadingPets(false);
    }
  };

  return (
    <PetsContextInstance.Provider
      value={{
        petsList,
        setPetsList,
        setIsLoadingPets,
        isLoadingPets,
        savedPetsList,
        setSavedPetsList,
        adoptedPetsList,
        setAdoptedPetsList,
        fosteredPetsList,
        setFosteredPetsList,
        removeSavedPet,
        savePet,
        messageClient,
        setMessageClient,
        fosterPet,
        removeFosteredPet,
        adoptPet,
        removeAdoptedPet,
      }}
    >
      {children}
    </PetsContextInstance.Provider>
  );
};

export { PetsContextInstance };
export default PetsContext;
