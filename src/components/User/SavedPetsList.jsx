import React from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import SavedPetCard from './SavedPetCard'
import { useContext } from 'react';
import { SimpleGrid, Button, Text, Stack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function SavedPetsList() {
  const { savedPetsList } = useContext(PetsContextInstance);
  const navigate = useNavigate();

  return (

    <>
      {savedPetsList.length < 1 &&

        <NavLink to='/search'>
          <Stack alignContent='center' direction='row' align='center'>
            <Text className='font-weird' color='red.800' fontSize={['md', 'lg', 'xl']}>
              You don't have any saved pets in your wishlist yet!



              <Button ml={3} mt={3} className='font-weird' onClick={(e) => { navigate('/search') }} color='white' w='10em'
                size={['sm', 'md']} bgColor='red.800' borderBlockEndWidth={4} _hover={{
                  bgGradient: 'linear(to-r, gray.200, gray.100)',
                  color: 'black'
                }}

                spinnerPlacement='start'> Search for a pet 😻</Button>
            </Text>
          </Stack>
        </NavLink>
      }


      <SimpleGrid minChildWidth={['300px']}
        maxChildWidth={['base: 180px', '220px', '250px', '300px']} spacing='15px'>
        <div>
          {savedPetsList.map((pet) => (<SavedPetCard key={pet._id} pet={pet} />))}
        </div>
      </SimpleGrid>
    </>
  )
}

export default SavedPetsList