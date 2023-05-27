import React from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import SavedPetCard from './SavedPetCard'
import {  useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react'


function SavedPetsList() {
  const {savedPetsList}=useContext(PetsContextInstance);

  return (
    <SimpleGrid minChildWidth= {[ '300px' ]}
    maxChildWidth={['base: 180px', '220px', '250px', '300px' ]} spacing='15px'>
          <div>

              {savedPetsList.map((pet) => (<SavedPetCard key={pet._id} pet={pet}/>))}
          </div>
        </SimpleGrid>
  )
}

export default SavedPetsList