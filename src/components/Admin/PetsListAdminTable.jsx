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
import { Avatar, Spinner, AvatarGroup } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { UsersContextInstance } from '../../contex/UsersContext';


function PetsListAdminTable() {
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
    const fetchPetsList = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets`);
        setTotalResults(res.data.length)
      } catch (err) {
        console.log(err);
      }
    };
    fetchPetsList();
  }, []);


  const fetchResults = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/petsadmin?page=${page}&limit=10`);
      if (res.request.status === 200) {
        setResults(res.data);
        setCountResults(res.data.length)
        setIsLoading(false)

      }

      if (res.request.status === 204) {
        setIsLoading(false)
        setDisableBtn(true)
        setEndResults("You have reached the end of the search results")
      }
    } catch (error) {
      setIsLoading(false)
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
                <Table bgColor='white' className='main-font' size="sm"
                       minW={['15em', '20em', '30em', '50em']}
                       variant='striped' colorScheme='gray'>
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Hide breakpoint='(max-width: 900px)'>
                        <Th>Type</Th>
                      </Hide>

                      <Hide breakpoint='(max-width: 1100px)'>
                        <Th>Breed</Th>
                      </Hide>

                      <Hide breakpoint='(max-width: 1300px)'>
                        <Th>Height (Cm)</Th>
                        <Th>Weight (Kg)</Th>
                      </Hide>

                      <Hide breakpoint='(max-width: 550px)'>
                        <Th>Adoption Status</Th>
                      </Hide>

                      <Th> Edit</Th>
                    </Tr>
                  </Thead>
                  <Tbody>

                    {results && results.map((pet) => (

                      <Tr key={pet._id}>
                        <Td width={['15px', '25px', '40px']}>
                          <Avatar name={pet.name} size='md' bg='#553C9A' src={pet?.picture} />
                        </Td>

                        <Td>
                          {pet.name}
                        </Td>

                        <Hide breakpoint='(max-width: 900px)'>
                          <Td>{pet.type}</Td>
                        </Hide>


                        <Hide breakpoint='(max-width: 1100px)'>
                          <Td>{pet.breed}</Td>
                        </Hide>

                        <Hide breakpoint='(max-width: 1300px)'>
                          <Td>{pet.height}</Td>
                          <Td>{pet.weight}</Td>
                        </Hide>


                        <Hide breakpoint='(max-width: 550px)'>
                          <Td>
                            <Tag colorScheme={pet.adoptionStatus === 'Available' ? 'yellow' : pet.adoptionStatus === 'Fostered' ? 'teal' : 'red'}> {pet.adoptionStatus}
                            </Tag>
                          </Td>
                        </Hide>

                        <Td>
                          <Button className='font-weird' size='sm' color='black' colorScheme='gray'
                            leftIcon={<EditIcon />}
                            _hover={{
                              bgGradient: 'linear(to-r, gray.200, gray.100)',
                            }}
                            onClick={(e) => navigate(`/admin/editpet/${pet._id}`)}>

                            Edit pet</Button>
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
              {/* <Text className='font'> Page number {page}</Text> */}
              <Text className='main-font'> Displaying {([page - 1] * 10) + countResults} out of {totalResults} pets</Text>
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

export default PetsListAdminTable