import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { Tag, Hide, Button, Spacer, Text } from '@chakra-ui/react';
import {
  Table, Spinner, Thead, Tbody, Tfoot, Flex,
  Tr, Th, Td, TableContainer,
} from '@chakra-ui/react'
import axios from 'axios';
import { Avatar, } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons'
import { UsersContextInstance } from '../../contex/UsersContext';


function UsersListAdminTable() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [endResults, setEndResults] = useState('');
  const [totalResults, setTotalResults] = useState('');
  const [countResults, setCountResults] = useState('');

  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(UsersContextInstance);


  useEffect(() => {
    fetchResults();
  }, [page]);

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
        setTotalResults(res.data.length)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsersList();
  }, []);


  const fetchResults = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/usersadmin?page=${page}&limit=5`);
      if (res.request.status === 200) {
        setResults(res.data);
        setCountResults(res.data.length)

      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextPage = () => {
    if (page * 10 > totalResults - countResults) {
      setDisableBtn(true)
      setEndResults("You have reached the end of the search results")
    } else {
      setPage(page + 1);
    }
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


        {isLoading ?

          <>
            <Spinner
              thickness='8px'
              speed='0.65s'
              emptyColor='gray.200'
              color='red.800'
              size='xl'
            />


          </>

          :

          <>

            {endResults === '' ?

              <>
                <Table className='main-font' bgColor='white' size="sm" variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>

                      <Hide breakpoint='(max-width: 950px)'>
                        <Th>Adopted Pets</Th>
                        <Th>Saved Pets</Th>
                      </Hide>


                      <Hide breakpoint='(max-width: 1350px)'>
                        <Th>Email</Th>
                      </Hide>

                      <Hide breakpoint='(max-width: 1500px)'>

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

                        <Hide breakpoint='(max-width: 950px)'>
                          <Td>{user.adoptedPets.length}</Td>
                          <Td>{user.savedPets.length}</Td>
                        </Hide>

                        <Hide breakpoint='(max-width: 1350px)'>
                          <Td>{user.email}</Td>
                        </Hide>

                        <Hide breakpoint='(max-width: 1500px)'>
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
                <Text fontSize={['xs', 'md', 'lg', '2xl']} className='main-font'> {endResults} </Text>
              </Flex>

            }

            <Flex mt={3} >
              <Button leftIcon={<ArrowBackIcon />} size={['0.5xs', 'xs', 'sm', 'sm']} onClick={handlePreviousPage} disabled={page === 1}>
                <Hide below='sm'>
                  Previous Page
                </Hide>
              </Button>
              <Spacer />
              <Text className='main-font'> Displaying {([page - 1] * 5) + countResults} out of {totalResults} users</Text>

              <Spacer />

              <Button size={['0.5xs', 'xs', 'sm', 'sm']} isDisabled={disableBtn} onClick={handleNextPage} rightIcon={<ArrowForwardIcon />}>
                <Hide below='sm'>
                  Next Page
                </Hide>

              </Button>
            </Flex>
          </>}

      </TableContainer>
    </>

  )
}

export default UsersListAdminTable