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

function AdminDashboard() {

  const navigate = useNavigate();

  const { petsList } = useContext(PetsContextInstance);
  const { loggedInUser, setLoggedInUser, fetchInfo,  } = useContext(UsersContextInstance);


  return (
    <>

<div className='dashboard-container'>

<Stack width={['110%', '95%', '90%']} >
    <Flex    mt={6} justify='left'>
      <Stack>  
      <Text  className='main-header' mb={3} textColor='red.800' 
      fontSize={['3xl', '4xl', '4xl', '5xl']}> Admin Dashboard</Text>

      <Text className='font-weird' 
        fontSize='xl'
        mb={4}
      >
        Welcome {loggedInUser?.first_name} {loggedInUser?.last_name}
      </Text>
      </Stack>
      <Spacer />

        <Button className='font-weird' 
        
        onClick={(e) => navigate('/admin/addpet')}  color='white' w='10em' 
            size="lg"
            leftIcon={<AddIcon />}
bgColor='red.800'
borderBlockEndWidth={4}
            _hover={{
                bgGradient: 'linear(to-r, gray.200, gray.100)',
                color: 'black'
              }}
           
              variant='outline'
            
            >
              Add a new pet</Button>
      </Flex>





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
    </>
  )
}

export default AdminDashboard