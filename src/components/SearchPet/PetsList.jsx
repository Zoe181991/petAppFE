import React, { useEffect } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import PetCard from './PetCard'
import {  useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react'

function PetsList() {
  const {petsList}=useContext(PetsContextInstance);

  return (

          <div>
            <SimpleGrid minChildWidth= {['base: 150px', '180px', '200px', '250px' ]}
            maxChildWidth={['base: 180px', '220px', '250px', '300px' ]} spacing='15px'>
            {petsList.map((pet) => (<PetCard key={pet._id} pet={pet} />))}
</SimpleGrid>
              
          </div>
  )
}

export default PetsList