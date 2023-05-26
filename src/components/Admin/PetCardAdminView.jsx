import React from 'react'
import { Card, ButtonGroup, CardBody, CardFooter, Image, Button, Text, Stack, Heading } from '@chakra-ui/react'
import { Badge, Tag } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler,faShieldDog, faPaw, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { EditIcon } from '@chakra-ui/icons'

function PetCardAdminView({ pet }) {

    const [colorStatus, setColorStatus] = useState(false)
    const { loggedInUser } = useContext(UsersContextInstance);


    const navigate = useNavigate();
    const navigatePetsParams = () => {
        navigate(`/pets/${pet._id}`);
    };


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


 


    return (
        <>
            <Card mt={5}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >

            <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}

          src={pet.picture ? pet.picture :
            pet.type == 'Dog' ?
              "https://i.pinimg.com/564x/2c/ac/e1/2cace15889eb210ce4ab764d8e49848f.jpg"
              :
              "https://i.pinimg.com/564x/87/5d/a7/875da7e9bc315b93715186e0cf09667a.jpg"
          }
          alt={pet.type}
        />



                <Stack>
                  <CardBody ml={2}>
            <Stack  direction='row'> 
            <Text  fontSize={['lg', 'lg', 'xl', '2xl']} className='font-weird'>{pet.name}</Text>
              <Tag fontWeight='semibold' fontSize='0.8em' ml={4} colorScheme={colorStatus}>{pet?.adoptionStatus}</Tag>

            </Stack>
       

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

          <ButtonGroup spacing={4} className='font-weird'>
          <Button rightIcon={ <InfoOutlineIcon/>} 
          size={['base: sm', 'sm', 'xs', 'sm', 'sm']}
          
          colorScheme='yellow' onClick={navigatePetsParams}>
              More info
            </Button>


<Button className='font-weird' size='sm' color='black' colorScheme='gray'
                       leftIcon={<EditIcon />}
                        _hover={{
                          bgGradient: 'linear(to-r, gray.200, gray.100)',
                        }}
                        onClick={(e) => navigate(`/admin/editpet/${pet._id}`)}>

                        Edit pet</Button>
           


            
            </ButtonGroup>

          </CardFooter>



                 
                </Stack>
            </Card>
        </>
    )
}

export default PetCardAdminView