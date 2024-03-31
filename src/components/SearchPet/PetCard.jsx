import React from 'react'
import { Hide, Tag, Card, Text, ButtonGroup, CardBody, CardFooter, Image, Button, Stack, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { InfoOutlineIcon, EditIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faShieldDog, faPaw, faWeightScale } from '@fortawesome/free-solid-svg-icons'


function PetCard({ pet }) {

  const [colorStatus, setColorStatus] = useState(false)
  const { savePet, removeSavedPet } = useContext(PetsContextInstance);
  const { loggedInUser } = useContext(UsersContextInstance);
  const [isFilled, setIsFilled] = useState(false);

  const navigate = useNavigate();
  const navigatePetsParams = () => {
    navigate(`/pets/${pet._id}`);
  };


  useEffect(() => {
    if (loggedInUser.savedPets) {
      for (let i = 0; i < loggedInUser.savedPets.length; i++) {
        if (loggedInUser.savedPets[i] === pet._id) {
          setIsFilled(true)
        }
      }
    }
  }, [])




  useEffect(() => {
    if (pet?.adoptionStatus === 'Available') {
      setColorStatus("yellow")
    }
    if (pet?.adoptionStatus === 'Fostered') {
      setColorStatus("teal")
    } if (pet?.adoptionStatus === 'Adopted') {
      setColorStatus("red")
    }
  }, [pet]);


  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  const handleSaveBtn = () => {
    if (!isFilled) {
      const saveReq = {
        userId: loggedInUser._id,
        petId: pet._id,
        owner: pet.owner,
        petName: pet.name
      }
      savePet(saveReq)
    } else {
      removeSavedPet(pet._id, pet.name)
    }
  }



  return (
    <>

      <Card mt={3} className='main-font'

        _hover={{
          bgGradient: 'linear(to-r, yellow.100, gray.100)',
          cursor: 'pointer'
        }}
        direction={{ base: 'column', sm: 'column' }}
        overflow='hidden'
        variant='outline'
      >
        <Image onClick={navigatePetsParams}
          objectFit='cover'
          maxH={['180px', '200px', '220px']}
          src={pet.picture ? pet.picture :
            pet.type == 'Dog' ?
              "https://i.pinimg.com/564x/2c/ac/e1/2cace15889eb210ce4ab764d8e49848f.jpg"
              :
              "https://i.pinimg.com/564x/87/5d/a7/875da7e9bc315b93715186e0cf09667a.jpg"
          }
          alt={pet.type}
        />

        <Stack>
          <CardBody ml={2} onClick={navigatePetsParams}>
            <Stack direction='row'>
              <Text fontSize={['lg', 'lg', 'xl', '2xl']} className='font-weird'>{pet.name}</Text>
              <Tag fontWeight='semibold' fontSize='0.8em' ml={4} colorScheme={colorStatus}>{pet?.adoptionStatus}</Tag>

            </Stack>


            <Tag size={['sm', 'sm', 'md', 'md']} fontWeight='normal' mt={4} mr={2} >
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
              Height: {pet.height} cm</Tag>

            <Tag fontWeight='normal' mt={4} mr={2} size={['sm', 'sm', 'md', 'md']}>
              <span className="icon-mgR" >
                <FontAwesomeIcon icon={faWeightScale} />
              </span>

              Weight: {pet.weight} kg</Tag>

          </CardBody>

          <CardFooter
            position='-webkit-sticky'
            bottom='1'
            alignItems='end'
            justify='space-between'
            flexWrap='wrap'
          >

            <ButtonGroup
              pr={2} pl={2}
              size={['base: sm', 'sm', 'xs', 'sm', 'sm']} spacing={2} className='font-weird'>
              {loggedInUser.role === 'Admin' &&

                <Button className='font-weird'

                  color='black' colorScheme='gray'
                  leftIcon={<EditIcon />}
                  _hover={{
                    bgGradient: 'linear(to-r, gray.200, gray.100)',
                  }}
                  onClick={(e) => navigate(`/admin/editpet/${pet._id}`)}>
                </Button>}

              <Button leftIcon={<InfoOutlineIcon />}
                p={2}
                colorScheme='yellow' onClick={navigatePetsParams}>
                <Hide below='lg'>
                  More info
                </Hide>
              </Button>



              {!loggedInUser ?
                <>
                  <Button
                    onClick={(e) => { navigate('/login') }}
                    variant='ghost' colorScheme='pink' bgColor='pink.50'>
                    Save
                    <div className="heart"></div>
                  </Button>
                </>

                :

                <>
                  <div onClick={handleClick} className={`heart-button ${isFilled ? 'filled' : 'empty'}`}>
                    <Button size={['base: sm', 'sm', 'xs', 'sm', 'sm']}
                      onClick={handleSaveBtn} bgColor='pink.50'
                      variant='ghost' colorScheme='pink'>
                      {isFilled ? "Saved" : "Save"}
                      <div className="heart"></div>
                    </Button>
                  </div>

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