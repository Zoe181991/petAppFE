import React, { useEffect } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import PetCard from '../SearchPet/PetCard'
import { useContext, useState } from 'react';
import { Tag, Hide, Show, Button, Spacer, Text } from '@chakra-ui/react';
import {
  Table, Thead, Tbody, Tfoot, Box, Stack, ListItem, List, Flex,
  Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react'
import axios from 'axios';
import { Avatar, AvatarGroup } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons'


function UsersListAdminTable() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [endResults, setEndResults] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchResults();
  }, [page]);

  useEffect(() => {
    fetchResults();
  }, []);


  const fetchResults = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/usersadmin?page=${page}&limit=10`);
      if (res.request.status === 200) {
        setResults(res.data);
      }

      if (res.request.status === 204) {
        setDisableBtn(true)
        setEndResults("You have reached the end of the search results")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setEndResults('')
    setDisableBtn(false)
    if (page > 1) {
      setPage(page - 1);
    }
  };



  return (
    <>
      <TableContainer>
        {endResults === '' ?

          <>
            <Table className='font' size="sm" variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>

                  <Hide breakpoint='(max-width: 900px)'>
                    <Th>Adopted Pets</Th>
                    <Th>Saved Pets</Th>
                  </Hide>


                  <Hide breakpoint='(max-width: 1150px)'>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                  </Hide>

                  <Hide breakpoint='(max-width: 550px)'>
                    <Th>Role</Th>
                  </Hide>

                  <Th>View Profile</Th>
                </Tr>
              </Thead>
              <Tbody>

                {results && results.map((user) => (

                  <Tr key={user._id}>

                    <Td width={['15px', '25px', '40px']}>
                      <Avatar name={user.name} size='md' bg='#553C9A' src={user?.picture} />
                    </Td>
                    <Td>
                      {user.first_name}  {user.last_name}
                    </Td>

                    <Hide breakpoint='(max-width: 900px)'>
                      <Td>{user.adoptedPets.length}</Td>
                      <Td>{user.savedPets.length}</Td>
                    </Hide>

                    <Hide breakpoint='(max-width: 1150px)'>
                      <Td>{user.email}</Td>
                      <Td>{user.phone_number}</Td>
                    </Hide>


                    <Hide breakpoint='(max-width: 550px)'>
                      <Td>
                        <Tag colorScheme={user.role === 'Admin' ? 'purple' : 'cyan'}> {user.role}
                        </Tag>
                      </Td>
                    </Hide>

                    <Td>
                    
                        <Button className='font-weird' size='sm' color='black' colorScheme='gray'
                       leftIcon={<ViewIcon />}
                        _hover={{
                          bgGradient: 'linear(to-r, gray.200, gray.100)',
                        }}
                        onClick={(e) => navigate(`/admin/viewuser/${user._id}`)}>

View Profile</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
              </Tfoot>
            </Table>
          </>

          :

          <Flex justify='center' mb={4} mt={5}>
            <Text fontSize={['xs', 'md', 'lg', '2xl']} className='font'> {endResults} </Text>
          </Flex>

        }

        <Flex mt={3} >
          <Button leftIcon={<ArrowBackIcon />} size={['0.5xs', 'xs', 'sm', 'sm']} onClick={handlePreviousPage} disabled={page === 1}>
          <Hide below='sm'>
 Previous Page
 </Hide>
          </Button>
          <Spacer />
          <Text className='font'> Page number {page}</Text>
          <Spacer />

          <Button size={['0.5xs', 'xs', 'sm', 'sm']} isDisabled={disableBtn} onClick={handleNextPage} rightIcon={<ArrowForwardIcon />}>
          <Hide below='sm'>
            Next Page
            </Hide>

            </Button>
        </Flex>


      </TableContainer>
    </>

  )
}

export default UsersListAdminTable