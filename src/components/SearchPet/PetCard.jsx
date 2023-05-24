import React from 'react'
import { Tag, Card, ButtonGroup, CardHeader, CardBody, CardFooter, Image, Button, Stack, Heading } from '@chakra-ui/react'
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { ArrowForwardIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler,faShieldDog, faPaw, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core';


function PetCard({ pet}) {

  const [colorStatus, setColorStatus] = useState(false)
  const {petsList, savePet, removeSavedPet}=useContext(PetsContextInstance);
  const { loggedInUser } = useContext(UsersContextInstance);
  const [isFilled, setIsFilled] = useState(false);


  const navigate = useNavigate();
  const navigatePetsParams = () => {
    navigate(`/pets/${pet._id}`);
  };

  


  useEffect(()=>{
    if(loggedInUser.savedPets){
      for(let i=0; i<loggedInUser.savedPets.length;i++){
        if(loggedInUser.savedPets[i]===pet._id){
          setIsFilled(true)
        }
  
      }


    }
   
  },[])


  useEffect(() => {
    if (pet?.adoptionStatus === 'Available') {
      setColorStatus("green")
    }
    if (pet?.adoptionStatus === 'Fostered') {
      setColorStatus("blue")
    } if (pet?.adoptionStatus === 'Adopted') {
      setColorStatus("purple")
    }
  }, [pet]);


  const handleClick = () => {
    setIsFilled(!isFilled);
  };
  
  const handleSaveBtn = ()=>{
    if(!isFilled){
      const saveReq = {
        userId: loggedInUser._id,
        petId: pet._id,
        owner: pet.owner
    }

    savePet(saveReq)
    } else{
      removeSavedPet(pet._id)
    }
   

}



  return (
    <>
    
      <Card mt={5} className='font'  
       _hover={{
        bgGradient: 'linear(to-r, gray.100, purple.100)',
       cursor: 'pointer'
      }}

        direction={{ base: 'column', sm: 'column' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '400px', md: '380px', lg: '400px' }}
          minW={{ base: '100%', sm: '380px', md: '340px', lg: '250px' }}
          maxH={{ base: '100%', sm: '180px', md: '220px', lg: '220px' }}
          minH={{ base: '100%', sm: '150px', md: '200px', lg: '170px' }}

          src={pet.picture ? pet.picture :
            pet.type == 'Dog' ?
              "https://i.pinimg.com/564x/2c/ac/e1/2cace15889eb210ce4ab764d8e49848f.jpg"
              :

              "https://i.pinimg.com/564x/87/5d/a7/875da7e9bc315b93715186e0cf09667a.jpg"

          }
          alt={pet.type}
        />

        <Stack>
          <CardBody
          
          >
            <Heading size='md'> {pet.name}
              <Tag fontSize='0.8em' ml={4} colorScheme={colorStatus}>{pet?.adoptionStatus}</Tag>

            </Heading>
            {/* <Text py='2'>
             
            </Text> */}

            <Tag  size={['sm', 'sm', 'md', 'md']}  fontWeight='normal' mt={4} mr={2} > 
            <span className="icon-mgR" >
            <FontAwesomeIcon icon={faPaw} />
            </span>
            Type: {pet.type}
            </Tag>

            <Tag fontWeight='normal' mt={4} mr={2} size={['sm', 'sm', 'md', 'md']}>  
            <span className="icon-mgR" >
            <FontAwesomeIcon icon={faShieldDog} />
            </span>
            Breed: {pet.breed}
            </Tag>

            <Tag fontWeight='normal' mt={4} mr={2} size={['sm', 'sm', 'md', 'md']}>  
            <span className="icon-mgR" >
            <FontAwesomeIcon icon={faRuler} />
            </span>
            Height: {pet.height}</Tag>

            <Tag fontWeight='normal' mt={4} mr={2} size={['sm', 'sm', 'md', 'md']}>  
            <span className="icon-mgR" >
            <FontAwesomeIcon icon={faWeightScale} />
            </span>

            Weight: {pet.weight}</Tag>
       


          </CardBody>

          <CardFooter>
          <ButtonGroup spacing='3'>

          
          <Button rightIcon={ <InfoOutlineIcon/>} variant='outline' 
          size={['xs', 'xs', 'xs', 'sm']}
          
          colorScheme='purple' onClick={navigatePetsParams}>
              More info
             
            </Button>
            { !loggedInUser?

            <>
              <Button  onClick={(e)=>{navigate('/login')}}
              size={['xs', 'xs', 'xs', 'sm']}
              variant='ghost' colorScheme='pink'>  Save     
              <div className="heart"></div>
              </Button>
            </>

:

            <>
               <button onClick={handleClick} className={`heart-button ${isFilled ? 'filled' : 'empty'}`}>
              <Button               size={['xs', 'xs', 'xs', 'sm']}
onClick={handleSaveBtn} 
              variant='ghost' colorScheme='pink'>
              {isFilled? "Saved" : "Save"}          
              <div className="heart"></div>
              </Button>
              </button>



              </>
            }


            
            </ButtonGroup>

          </CardFooter>
        </Stack>
      </Card>
    </>
  )
}

export default PetCard