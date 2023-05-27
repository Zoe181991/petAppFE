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
      fontSize={['3xl', '4xl', '4xl', '5xl']}> Admin HomePage</Text>

      <Text className='font-weird' 
        fontSize='xl'
        mb={4}
      >
        Welcome {loggedInUser?.first_name} {loggedInUser?.last_name}
      </Text>
      </Stack>
      <Spacer />

    
      </Flex>


    <div className='main-container'>



    </div>
    </div>
    </>
  )
}

export default HomeAdmin