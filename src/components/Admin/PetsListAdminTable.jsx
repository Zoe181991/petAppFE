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


function PetsListAdminTable() {
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
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/petsadmin?page=${page}&limit=10`);
      if (res.request.status === 200) {
        setResults(res.data);
      }

      if (res.request.status === 204) {
        console.log("hello")
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

                  <Hide breakpoint='(max-width: 450px)'>
                    <Th>Image</Th>
                  </Hide>

                  <Th>Name</Th>

                  <Hide breakpoint='(max-width: 250px)'>
<Th>Type</Th>
</Hide>


<Hide breakpoint='(max-width: 900px)'>
                    <Th>Breed</Th>
                  </Hide>


                  <Hide breakpoint='(max-width: 1150px)'>
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

                    <Hide breakpoint='(max-width: 450px)'>
                      <Td width={['15px', '25px', '40px']}>
                        <Avatar name={pet.name} size='md' bg='#553C9A' src={pet?.picture} />
                      </Td>
                    </Hide>

                    
                    <Td>
                      {pet.name}
                    </Td>

                    <Hide breakpoint='(max-width: 250px)'>
                      <Td>{pet.type}</Td>
                      </Hide>


                      <Hide breakpoint='(max-width: 900px)'>
                      <Td>{pet.breed}</Td>
                    </Hide>

                    <Hide breakpoint='(max-width: 1150px)'>
                      <Td>{pet.height}</Td>
                      <Td>{pet.weight}</Td>
                    </Hide>


                    <Hide breakpoint='(max-width: 550px)'>
                      <Td>
                        <Tag colorScheme={pet.adoptionStatus === 'Available' ? 'green' : pet.adoptionStatus === 'Fostered' ? 'cyan' : 'purple'}> {pet.adoptionStatus}
                        </Tag>
                      </Td>
                    </Hide>

                    <Td>
                      <Button fontWeight='medium' size='sm' color='white' bgGradient='linear(to-r, teal.500, purple.500)'
                        _hover={{
                          bgGradient: 'linear(to-r, teal.200, purple.200)',
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

export default PetsListAdminTable