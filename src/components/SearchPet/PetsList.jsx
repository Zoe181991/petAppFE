import React, { useEffect } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import PetCard from './PetCard'
import {  useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react'

function PetsList() {
  const {petsList}=useContext(PetsContextInstance);

  return (

          <div>
            <SimpleGrid minChildWidth='300px' spacing='20px'>
            {petsList.map((pet) => (<PetCard key={pet._id} pet={pet} />))}
</SimpleGrid>
              
          </div>
  )
}

export default PetsList