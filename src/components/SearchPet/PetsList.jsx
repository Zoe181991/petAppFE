import { PetsContextInstance } from '../../contex/PetsContext';
import PetCard from './PetCard'
import { useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react'

function PetsList() {
  const { petsList } = useContext(PetsContextInstance);

  return (

    <div>
      <SimpleGrid minChildWidth={['200px', '230px', '250px']}
        spacing='15px'>
        {petsList.map((pet) => (<PetCard key={pet._id} pet={pet} />))}
      </SimpleGrid>

    </div>
  )
}

export default PetsList