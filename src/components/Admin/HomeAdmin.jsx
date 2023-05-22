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

    <Flex ml="7em"  mr="7em"  mt={6} justify='left'>

      <Stack>
      <Text
        bgGradient='linear(to-r, teal.500, purple.500)'
        bgClip='text'
        fontSize='4xl'
        fontWeight='extrabold'
        mb={2}
      >
        Admin Dashboard
      </Text>
      <Text className=' font' 
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
                  <Text

                    color='teal.400'
                    fontSize='2xl'
                    fontWeight='extrabold'
                    mb={6}
                  >
                    View Pets
                  </Text>
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
                  <Text
                    color='purple.400'
                    fontSize='2xl'
                    fontWeight='extrabold'
                    mb={6}
                  >
                    View Users
                  </Text>
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

export default HomeAdmin