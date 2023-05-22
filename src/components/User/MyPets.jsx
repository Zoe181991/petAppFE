import React from 'react'
import SavedPetsList from './SavedPetsList';
import FosteredPetsList from './FosteredPetsList';
import AdoptedPetsList from './AdoptedPetsList';
import { UsersContextInstance } from '../../contex/UsersContext';
import { AuthContextInstance } from '../../contex/AuthContext';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Skeleton } from '@chakra-ui/react'
import {
 Stack, Text,
  Box,
} from '@chakra-ui/react'
import { useEffect, useContext } from 'react';


function MyPets() {

  const {  fetchSavedPets, fetchAdoptedPets, fetchFosteredPets } = useContext(UsersContextInstance);
  const {  loggedInUserID } = useContext(AuthContextInstance);
  const {  fetchInfo, isLoading, setIsLoading } = useContext(UsersContextInstance);


  useEffect(() => {
    setIsLoading(true)
    fetchInfo(loggedInUserID)
    fetchSavedPets(loggedInUserID)
    fetchAdoptedPets(loggedInUserID)
    fetchFosteredPets(loggedInUserID)
    setIsLoading(false)

    // console.log(savedPetsList)
  }, [])


  return (
    <div className='main-container'>

    
      <Text 
  bgGradient='linear(to-r, teal.500, purple.500)'
  bgClip='text'
  fontSize='4xl'
  fontWeight='extrabold'
  mb={6}
>
My Pets
</Text>

      <Stack w="60%">

        <Tabs isFitted variant='line' colorScheme='purple' >
          <TabList mb='1em'>
            <Tab>   <Box className="font" as="span" flex='1' textAlign='center' fontSize='1.2em'>
              Saved Pets
            </Box></Tab>
            <Tab>   <Box className="font" as="span" flex='1' textAlign='center' fontSize='1.2em'>
              Fostered Pets
            </Box></Tab>
            <Tab>   <Box className="font" as="span" flex='1' textAlign='center' fontSize='1.2em'>
              Adopted Pets
            </Box></Tab>
          </TabList>
          <TabPanels>
            <TabPanel>

              <Skeleton isLoaded={!isLoading}>
              <SavedPetsList />
              </Skeleton>


            </TabPanel>
            <TabPanel>

            <Skeleton isLoaded={!isLoading}>
              <FosteredPetsList />
              </Skeleton>

            </TabPanel>
            <TabPanel>

            <Skeleton isLoaded={!isLoading}>
              <AdoptedPetsList />
              </Skeleton>

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>



    </div>


  )
}

export default MyPets


// <Stack w="60%">

// <Accordion defaultIndex={[0]} allowMultiple>
//   <AccordionItem>
//     <h2>
//       <AccordionButton>
//         <Box className="font" as="span" flex='1' textAlign='left' fontSize='1.5em'>
//           Saved Pets
//         </Box>
//         <AccordionIcon />
//       </AccordionButton>
//     </h2>
//     <AccordionPanel pb={4}>

//       <SavedPetsList />

//     </AccordionPanel>
//   </AccordionItem>

//   <AccordionItem>
//     <h2>
//       <AccordionButton>
//       <Box className="font" as="span" flex='1' textAlign='left' fontSize='1.5em'>
//       Fostered Pets
//         </Box>
//         <AccordionIcon />
//       </AccordionButton>
//     </h2>
//     <AccordionPanel pb={4}>
//     <FosteredPetsList />

//     </AccordionPanel>
//   </AccordionItem>


//   <AccordionItem>
//     <h2>
//       <AccordionButton>
//       <Box className="font" as="span" flex='1' textAlign='left' fontSize='1.5em'>
//       Adopted Pets
//         </Box>
//         <AccordionIcon />
//       </AccordionButton>
//     </h2>
//     <AccordionPanel pb={4}>
//     <AdoptedPetsList />

//     </AccordionPanel>
//   </AccordionItem>
// </Accordion>

// </Stack>