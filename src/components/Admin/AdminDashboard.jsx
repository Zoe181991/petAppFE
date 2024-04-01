import React, {useEffect} from 'react'
import { Text, Flex } from '@chakra-ui/react'
import {useNavigate, useParams,} from 'react-router-dom';
import { Box, Stack, } from '@chakra-ui/react'
import { useContext } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Spacer,
} from '@chakra-ui/react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { AddIcon } from '@chakra-ui/icons'
import PetsListAdminTable from './PetsListAdminTable'
import UsersListAdminTable from './UsersListAdminTable'
import MainHeader from "../StyledComponents/MainHeader";
import ButtonStyled from "../StyledComponents/ButtonStyled";

function AdminDashboard() {

  const navigate = useNavigate();


  const { loggedInUser } = useContext(UsersContextInstance);


  return (
    <>

      <div className='dashboard-container'>
<Stack w={"75%"} >
          <Flex mt={6} justify='left'>
            <Stack>
            <MainHeader text={"Admin Dashboard"} />
              <Text className='font-weird'
                fontSize='xl'
                mb={4}
              >
                Welcome {loggedInUser?.first_name} {loggedInUser?.last_name}
              </Text>
            </Stack>
            <Spacer />

            <ButtonStyled
              action={(e) => navigate('/admin/addpet')}
              text={"Add a new pet"}
              icon={<AddIcon />}

            >
              </ButtonStyled>
          </Flex>


          <Accordion defaultIndex={[0]} allowMultiple w={"100%"} >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                      <Text className='main-header' mb={3} textColor='#8c52fd'
                            fontSize={['xl', 'xl', 'xl', '2xl']}> View Pets</Text>
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

                      <Text className='main-header' mb={3} textColor='#8c52fd'
                            fontSize={['xl', 'xl', 'xl', '2xl']}> View Users</Text>
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