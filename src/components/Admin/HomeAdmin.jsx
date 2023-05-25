import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, Button, Heading, SimpleGrid, GridItem, Grid, Flex } from '@chakra-ui/react'
import { useNavigate, NavLink } from 'react-router-dom';
import {Box, Stack,} from '@chakra-ui/react'
import { useEffect, useContext } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Spacer,
} from '@chakra-ui/react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { AddIcon } from '@chakra-ui/icons'
import PetsListAdminTable from './PetsListAdminTable'
import UsersListAdminTable from './UsersListAdminTable'

function HomeAdmin() {

  const navigate = useNavigate();

  const { petsList } = useContext(PetsContextInstance);
  const { loggedInUser, setLoggedInUser, fetchInfo } = useContext(UsersContextInstance);


  return (
    <>

<div className='dashboard-container'>

    <Flex ml="7em"  mr="7em"  mt={6} justify='left'>

      <Stack>
   
      <Text  className='main-header' mb={3} textColor='red.800' 
      fontSize={['xl', '2xl', '3xl', '5xl']}> Admin Dashboard</Text>


      <Text className='font-weird' 
        fontSize='xl'
        mb={4}
      >
        Welcome {loggedInUser?.first_name} {loggedInUser?.last_name}
      </Text>
      </Stack>
      <Spacer />
      <Button   bgGradient='linear(to-r, green.300, teal.300)'
                  _hover={{
                    bgGradient: 'linear(to-r, green.100, teal.200)',
                  }} color="cyan.50"
                  onClick={(e) => navigate('/admin/addpet')} mt={6} leftIcon={<AddIcon />} >
        Add a new pet</Button>
      </Flex>


    <div className='main-container'>



      <Stack width={['100%', '95%', '90%']} >
        <Accordion defaultIndex={[0]} allowMultiple >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
              

                  <Text  className='main-header' mb={3} textColor='red.800' 
      fontSize={['lg', 'xl', '2xl', '3xl']}> View Pets</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>

              <PetsListAdminTable />

            </AccordionPanel>
          </AccordionItem>


          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
              

                  <Text  className='main-header' mb={3} textColor='red.800' 
      fontSize={['lg', 'xl', '2xl', '3xl']}> View Users</Text>

                  
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>

            <UsersListAdminTable />


            </AccordionPanel>
          </AccordionItem>
        </Accordion>


      </Stack>


    </div>
    </div>
    </>
  )
}

export default HomeAdmin