import React from 'react'
import SavedPetsList from './SavedPetsList';
import FosteredPetsList from './FosteredPetsList';
import AdoptedPetsList from './AdoptedPetsList';
import { UsersContextInstance } from '../../contex/UsersContext';
import { AuthContextInstance } from '../../contex/AuthContext';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Skeleton } from '@chakra-ui/react'
import {
  Stack, Text,
} from '@chakra-ui/react'
import { useEffect, useContext } from 'react';
import MainHeader from "../StyledComponents/MainHeader";


function MyPets() {

  const { fetchSavedPets, fetchAdoptedPets, fetchFosteredPets } = useContext(UsersContextInstance);
  const { loggedInUserID } = useContext(AuthContextInstance);
  const { fetchInfo, isLoading, setIsLoading } = useContext(UsersContextInstance);


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




      <MainHeader text={"My Pets"}/>


      <Stack width={['100%', '80%', '65%', '55%']}>
        <Tabs isFitted variant='enclosed-colored' color='#d700d3' colorScheme='purple' >
          <TabList className=" font-weird" as="span" flex='1' textAlign='center' mb='1em'>
            <Tab fontSize={['md', 'lg', 'xl', '2xl']}>
              Saved Pets
            </Tab>
            <Tab fontSize={['md', 'lg', 'xl', '2xl']}>
              Fostered Pets
            </Tab>
            <Tab fontSize={['md', 'lg', 'xl', '2xl']}>
              Adopted Pets
            </Tab>
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

