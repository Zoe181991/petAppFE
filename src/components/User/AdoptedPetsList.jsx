import React from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import SavedPetCard from './SavedPetCard'
import {  useContext } from 'react';


function FosteredPetsList() {
  const {adoptedPetsList}=useContext(PetsContextInstance);

  return (

          <div>
              {adoptedPetsList.map((pet) => (<SavedPetCard key={pet._id} pet={pet}/>))}
          </div>
  )
}

export default FosteredPetsList