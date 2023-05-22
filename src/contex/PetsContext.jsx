import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useContext } from "react";
import { AuthContextInstance } from './AuthContext';


const PetsContextInstance = createContext({});

const PetsContext = ({ children }) => {
  const [petsList, setPetsList] = useState([]);
  const [savedPetsList, setSavedPetsList] = useState([]);
  const [fosteredPetsList, setFosteredPetsList] = useState([]);
  const [adoptedPetsList, setAdoptedPetsList] = useState([]);
  const [messageClient, setMessageClient] = useState("")


  const { loggedInUserID } = useContext(AuthContextInstance);
  const navigate = useNavigate();


  const savePet = async (savePetToUser) => {
    try {
      if(savePetToUser.owner === savePetToUser.userId){
        console.log("you have already adopted/fostered this pet")
        return
      }
      const res = await axios.post(`http://localhost:8080/pets/save`, savePetToUser, { withCredentials: true });
      setSavedPetsList(res.data.savedPets)
    }

    catch (err) {
      console.log(err);
    }

  }


  const removeSavedPet = async (petId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/pets/${petId}/removesaved/${loggedInUserID}`, { withCredentials: true });
        const updateList = savedPetsList.filter((pet) => pet._id !== petId);
        setSavedPetsList(updateList);
    } catch (err) {
      console.log(err)
    }
  }

  const fosterPet = async (petId) => {
    try {
      const res = await axios.put(`http://localhost:8080/pets/${petId}/foster/${loggedInUserID}`, { withCredentials: true });
      setFosteredPetsList(res.data.fosteredPets)
      removeSavedPet(petId)
      const updateList = savedPetsList.filter((pet) => pet._id !== petId);
      setSavedPetsList(updateList);
      
    } catch (err) {
      console.log(err)
    }
  }

  const removeFosteredPet = async (petId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/pets/${petId}/removefoster/${loggedInUserID}`, { withCredentials: true });
      const updateList = fosteredPetsList.filter((pet) => pet._id !== petId);
      setFosteredPetsList(updateList);
      
    } catch (err) {
      console.log(err)
    }
  }

  const adoptPet = async (petId) => {
    try {
      const res = await axios.put(`http://localhost:8080/pets/${petId}/adopt/${loggedInUserID}`, { withCredentials: true });
      setAdoptedPetsList(res.data.adoptedPets)
      removeSavedPet(petId)

      const updateSaveList = savedPetsList.filter((pet) => pet._id !== petId);
      setSavedPetsList(updateSaveList);

      const updateList = fosteredPetsList.filter((pet) => pet._id !== petId);
      setFosteredPetsList(updateList);
      
    } catch (err) {
      console.log(err)
    }
  }

  const removeAdoptedPet = async (petId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/pets/${petId}/removeadopt/${loggedInUserID}`, { withCredentials: true });
  
      const updateList = adoptedPetsList.filter((pet) => pet._id !== petId);
      setAdoptedPetsList(updateList);
      
    } catch (err) {
      console.log(err)
    }
  }




return (

  <PetsContextInstance.Provider value={{
    petsList, setPetsList, 
     
    savedPetsList, setSavedPetsList, 
    adoptedPetsList, setAdoptedPetsList,
    fosteredPetsList, setFosteredPetsList,
    removeSavedPet, savePet,
    messageClient, setMessageClient,
    fosterPet, removeFosteredPet,
    adoptPet, removeAdoptedPet
  }}>
    {children}
  </PetsContextInstance.Provider>
);

};

export { PetsContextInstance }
export default PetsContext

