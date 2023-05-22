import React from 'react'
import { Card, ButtonGroup, CardBody, CardFooter, Image, Button, Text, Stack, Heading } from '@chakra-ui/react'
import { Badge, Tag } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { ArrowForwardIcon } from '@chakra-ui/icons'


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
                    <CardBody>
                        <Heading size='md'> {pet.name}
                            <Tag fontSize='0.8em' ml={4} colorScheme={colorStatus}>{pet?.adoptionStatus}</Tag>
                        </Heading>
                   
                        
                        <Text py='2'>
                            Type: {pet.type}
                        </Text>
                        <Text>
                            Breed: {pet.breed}
                        </Text>

                        <Text>
                            Height: {pet.height}
                        </Text>
                    </CardBody>

                    <CardFooter>
                    <Button variant='outline' size='sm' colorScheme='purple' onClick={navigatePetsParams}>
                            More info
                            <ArrowForwardIcon />
                        </Button>

                        <Button ml={5} size='sm' color='white' bgGradient='linear(to-r, teal.500, purple.500)'
                        _hover={{
                          bgGradient: 'linear(to-r, teal.200, purple.200)',
                        }}
                        onClick={(e) => navigate(`/admin/editpet/${pet._id}`)}>

                        Edit pet</Button>
                    </CardFooter>
                </Stack>
            </Card>
        </>
    )
}

export default PetCardAdminView