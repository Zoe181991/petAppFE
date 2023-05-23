import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, } from 'react-router-dom';
import { Image, Button, Text, Stack, Heading, Skeleton } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import axios from 'axios';
import { Tag, Spacer, Card, CardBody, CardFooter, ButtonGroup } from '@chakra-ui/react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { faRuler, faShieldDog, faPen, faBowlFood, faPaw, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function PetPage() {

    const params = useParams()
    const navigate = useNavigate();

    const [pet, setPet] = useState("");
    const [change, setchange] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [colorStatus, setColorStatus] = useState(false)
    const [isFilled, setIsFilled] = useState(false);


    const { loggedInUser, } = useContext(UsersContextInstance);
    const { savePet, removeSavedPet, fosterPet, removeFosteredPet, adoptPet, removeAdoptedPet } = useContext(PetsContextInstance)


    useEffect(() => {

        setIsLoading(true)
        console.log("petsID", params.petId)
        fetchPet(params.petId);
        setIsLoading(false)

    }, []);

    useEffect(() => {
        setIsLoading(true)
        if(loggedInUser){
            for (let i = 0; i < loggedInUser.savedPets.length; i++) {
                if (loggedInUser.savedPets[i] === pet._id) {
                    setIsFilled(true)
                }
            }
        }
        
        setIsLoading(false)
    }, [])


    useEffect(() => {
        fetchPet(params.petId);
    }, [change]);


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

    const handleSaveBtn = () => {
        if (!isFilled) {
            const saveReq = {
                userId: loggedInUser._id,
                petId: pet._id,
                owner: pet.owner
            }

            savePet(saveReq)
        } else {
            setchange("removeSaved")
            removeSavedPet(pet._id)
        }

    }



    const fetchPet = async (petIdUrl) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/${petIdUrl}`);
            console.log(res.data);
            setPet(res.data);
        } catch (err) {
            console.log(err);
        }
    };




    return (

        <div className='main-container'>
            <Skeleton isLoaded={!isLoading}>
            <Stack spacing={4} width='60%' justify='center' >

                {pet &&
                    <Card direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden' className='font' 
                        variant='outline'
                    >



                        <Image objectFit='cover'
                            maxW={{ base: '100%', sm: '200px' }}
                            src={pet?.picture ?
                                pet?.picture :
                                pet?.type == 'Dog' ?
                                    "https://i.pinimg.com/564x/2c/ac/e1/2cace15889eb210ce4ab764d8e49848f.jpg"
                                    :

                                    "https://i.pinimg.com/564x/87/5d/a7/875da7e9bc315b93715186e0cf09667a.jpg"

                            }
                            alt={pet?.type}
                            borderRadius='lg'
                        />

                        <Stack>
                            <CardBody>

                                <Stack direction='row'>
                                    <Text className='font'
                                        fontSize='1.5em'
                                        fontWeight='semibold'
                                    >
                                        Hi I'm {pet?.name}!
                                    </Text>
                                    <Spacer />
                                    <Tag className='font' fontSize='1.2em' mr={3}
                                        colorScheme={colorStatus}>
                                        {pet?.adoptionStatus}</Tag>
                                </Stack>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    <span className="icon-mgR" >
                                        <FontAwesomeIcon icon={faPaw} />
                                    </span>
                                    Type: {pet.type}
                                </Tag>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    <span className="icon-mgR" >
                                        <FontAwesomeIcon icon={faShieldDog} />
                                    </span>
                                    Breed: {pet.breed}
                                </Tag>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    <span className="icon-mgR" >
                                        <FontAwesomeIcon icon={faRuler} />
                                    </span>
                                    Height: {pet.height}</Tag>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    <span className="icon-mgR" >
                                        <FontAwesomeIcon icon={faWeightScale} />
                                    </span>

                                    Weight: {pet.weight}</Tag>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    Color: {pet?.color}</Tag>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    Hypoallergnic: {pet?.hypoallergnic}</Tag>


                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    <span className="icon-mgR" >
                                        <FontAwesomeIcon icon={faBowlFood} />
                                    </span>
                                    Dietery: {pet?.dietery}</Tag>

                                <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                    <span className="icon-mgR" >
                                        <FontAwesomeIcon icon={faPen} />
                                    </span>
                                    Bio: {pet?.bio}</Tag>

                            </CardBody>
                            <CardFooter >

                               
                                <ButtonGroup spacing='2'>



                                    {!loggedInUser? 
                                    
                                <>
                                
                                <Button  onClick={(e)=>{navigate('/login')}}
              size='sm' variant='ghost' colorScheme='pink'>  Save     
              <div className="heart"></div>
              </Button>
                                
                                
                                
                                </>
                                :
                                
                                <>
                                  {pet.adoptionStatus === "Available" &&
                                        <>

                                            <Button ml={3} size='sm' color='white' onClick={() => {
                                                adoptPet(pet._id)
                                                setchange("adoptPet")
                                            }
                                            }
                                                bgGradient='linear(to-r, purple.500, purple.300)'
                                                _hover={{
                                                    bgGradient: 'linear(to-r, purple.400, purple.200)',
                                                }}>
                                                Adopt me

                                            </Button>


                                            <Button ml={3} size='sm' color='white' onClick={() => {
                                                fosterPet(pet._id)
                                                setchange("fosterPet")
                                            }
                                            }
                                                bgGradient='linear(to-r, teal.400, blue.400)'
                                                _hover={{
                                                    bgGradient: 'linear(to-r, teal.200, blue.200)',
                                                }}>
                                                Foster

                                            </Button>

                                            {!isLoading &&
                                                <button onClick={handleClick} className={`heart-button ${isFilled ? 'filled' : 'empty'}`}>
                                                    <Button onClick={handleSaveBtn}
                                                        size='sm' variant='ghost' colorScheme='pink'>
                                                        {isFilled ? "Saved" : "Save"}
                                                        <div className="heart"></div>
                                                    </Button>
                                                </button>

                                            }

                                        </>
                                    }

                                    {pet.adoptionStatus === "Fostered" &&
                                        <>
                                            {pet.owner === loggedInUser._id ?
                                                <>
                                                    <Button ml={3} size='sm' color='white' onClick={() => {
                                                        setchange("adoptPet")

                                                        adoptPet(pet._id)
                                                    }}
                                                        bgGradient='linear(to-r, purple.500, purple.300)'
                                                        _hover={{
                                                            bgGradient: 'linear(to-r, purple.400, purple.200)',
                                                        }}>
                                                        Adopt me

                                                    </Button>


                                                    <Button ml={3} size='sm' variant='outline' onClick={() => {

                                                        removeFosteredPet(pet._id)
                                                        setchange("RemoveFostered")
                                                    }}
                                                        colorScheme='gray.400'>
                                                        Return to Shelter

                                                    </Button>

                                                </>
                                                :
                                                <>
                                                    {!isLoading &&
                                                        <button onClick={handleClick} className={`heart-button ${isFilled ? 'filled' : 'empty'}`}>
                                                            <Button onClick={handleSaveBtn}
                                                                size='sm' variant='ghost' colorScheme='pink'>
                                                                {isFilled ? "Saved" : "Save"}
                                                                <div className="heart"></div>
                                                            </Button>
                                                        </button>

                                                    }
                                                </>


                                            }

                                        </>

                                    }

                                    {pet.adoptionStatus === "Adopted" &&
                                        <>

                                            {pet.owner === loggedInUser._id ?

                                                <>

                                                    <Button ml={3} size='sm' variant='outline' onClick={() => {
                                                        removeAdoptedPet(pet._id)
                                                        setchange("removeAdopted")
                                                    }
                                                    }
                                                        colorScheme='gray.400'>
                                                        Return to Shelter
                                                    </Button>

                                                </>
                                                :
                                                <>


                                                    {!isLoading &&
                                                        <button onClick={handleClick} className={`heart-button ${isFilled ? 'filled' : 'empty'}`}>
                                                            <Button onClick={handleSaveBtn}
                                                                size='sm' variant='ghost' colorScheme='pink'>
                                                                {isFilled ? "Saved" : "Save"}
                                                                <div className="heart"></div>
                                                            </Button>
                                                        </button>
                                                    }

                                                </>

                                            }



                                        </>





                                    }
                                
                                
                                </>}

                                  
                                    


                                </ButtonGroup>
                            </CardFooter>
                        </Stack>
                    </Card>
                }
            </Stack>
            </Skeleton>
        </div>




    )


}

export default PetPage
