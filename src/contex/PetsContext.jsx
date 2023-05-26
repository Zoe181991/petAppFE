import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useContext } from "react";
import { AuthContextInstance } from './AuthContext';
import { useToast } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


const PetsContextInstance = createContext({});

const PetsContext = ({ children }) => {
  const [petsList, setPetsList] = useState([]);
  const [savedPetsList, setSavedPetsList] = useState([]);
  const [fosteredPetsList, setFosteredPetsList] = useState([]);
  const [adoptedPetsList, setAdoptedPetsList] = useState([]);
  const [messageClient, setMessageClient] = useState("")
  const [isLoadingPets, setIsLoadingPets] = useState(false)


  const { loggedInUserID } = useContext(AuthContextInstance);
  const navigate = useNavigate();
  const toast = useToast()


  const savePet = async (savePetToUser) => {
    setIsLoadingPets(true)
    try {
    
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pets/save`, savePetToUser, { withCredentials: true });
      setSavedPetsList(res.data.savedPets)
      setIsLoadingPets(false)
      toast({
        position: 'bottom',
        status: 'success',
        duration: 3000,
        render: () => (
          <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
            {savePetToUser.petName} was saved successfuly! ❤️
          </Box>
        ),
        isClosable: true,
      })

    }

    catch (err) {
      console.log(err);
      setIsLoadingPets(false)

    }

  }


  const removeSavedPet = async (id, name) => {
    try {
      setIsLoadingPets(true)
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/pets/${id}/removesaved/${loggedInUserID}`, { withCredentials: true });
        const updateList = savedPetsList.filter((pet) => pet._id !== id);
        setSavedPetsList(updateList);
        setIsLoadingPets(false)
        
        toast({
          position: 'bottom',
          status: 'success',
          duration: 3000,
          render: () => (
            <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
              {name} was removed from Saved Pets 💔
            </Box>
          ),
          isClosable: true,
        })

    } catch (err) {
      console.log(err)
      setIsLoadingPets(false)

    }
  }

  const fosterPet = async (id, name) => {
    setIsLoadingPets(true)

    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pets/${id}/foster/${loggedInUserID}`, { withCredentials: true });
      setFosteredPetsList(res.data.fosteredPets)
      removeSavedPet(id, name)
      const updateList = savedPetsList.filter((pet) => pet._id !== id);
      setSavedPetsList(updateList);
      setIsLoadingPets(false)
      toast({
        position: 'bottom',
        status: 'success',
        duration: 3000,
        render: () => (
          <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
            Congratulations! {name} was fostered successfuly. 🐾
          </Box>
        ),
        isClosable: true,
      })

      
    } catch (err) {
      console.log(err)
      setIsLoadingPets(false)

    }
  }

  const removeFosteredPet = async (id, name) => {
    setIsLoadingPets(true)
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/pets/${id}/removefoster/${loggedInUserID}`, { withCredentials: true });
      const updateList = fosteredPetsList.filter((pet) => pet._id !== id);
      setFosteredPetsList(updateList);
      setIsLoadingPets(false)

      toast({
        position: 'bottom',
        status: 'success',
        duration: 3000,
        render: () => (
          <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
            {name} has been returned to the shelter 😥
          </Box>
        ),
        isClosable: true,
      })
    
      
    } catch (err) {
      console.log(err)
      setIsLoadingPets(false)

    }
  }

  const adoptPet = async (id, name) => {
    setIsLoadingPets(true)

    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pets/${id}/adopt/${loggedInUserID}`, { withCredentials: true });
      setAdoptedPetsList(res.data.adoptedPets)
      removeSavedPet(id, name)
      const updateSaveList = savedPetsList.filter((pet) => pet._id !== id);
      setSavedPetsList(updateSaveList);

      const updateList = fosteredPetsList.filter((pet) => pet._id !== id);
      setFosteredPetsList(updateList);
      setIsLoadingPets(false)

      toast({
        position: 'bottom',
        status: 'success',
        duration: 3000,
        render: () => (
          <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
            {name} has a new home thanks to you! 🐕
          </Box>
        ),
        isClosable: true,
      })

      
    } catch (err) {
      console.log(err)
      setIsLoadingPets(false)

    }
  }

  const removeAdoptedPet = async (id, name) => {
    setIsLoadingPets(true)
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/pets/${id}/removeadopt/${loggedInUserID}`, { withCredentials: true });
      const updateList = adoptedPetsList.filter((pet) => pet._id !== id);
      setAdoptedPetsList(updateList);
      setIsLoadingPets(false)

      
        toast({
          position: 'bottom',
          status: 'success',
          duration: 3000,
          render: () => (
            <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
              {name} has been returned to the shelter 😥
            </Box>
          ),
          isClosable: true,
        })
      
      
    } catch (err) {
      console.log(err)
      setIsLoadingPets(false)

    }
  }




return (

  <PetsContextInstance.Provider value={{
    petsList, setPetsList, 
    setIsLoadingPets, isLoadingPets,
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

