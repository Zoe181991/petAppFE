import React from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import SavedPetCard from './SavedPetCard'
import {  useContext } from 'react';


function SavedPetsList() {
  const {savedPetsList}=useContext(PetsContextInstance);

  return (

          <div>
              {savedPetsList.map((pet) => (<SavedPetCard key={pet._id} pet={pet}/>))}
          </div>
  )
}

export default SavedPetsList