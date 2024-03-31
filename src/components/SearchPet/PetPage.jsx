import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, } from 'react-router-dom';
import { Image, Button, Text, Stack, Heading, Skeleton } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import axios from 'axios';
import { Tag, Spacer, Card, CardBody, CardFooter, ButtonGroup } from '@chakra-ui/react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { faFaceFrownOpen, faPalette, faRuler, faQuestion, faShieldDog, faPen, faBowlFood, faPaw, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowBackIcon } from '@chakra-ui/icons'


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
        if (loggedInUser) {
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
            <Stack minW='10em' spacing={4} width={['80%', '70%', '75%', '60%']} justify='center'>

                <Text align='center' className='main-header' mb={3} textColor='red.800'
                    fontSize={['3xl', '4xl', '4xl', '5xl']}>  Meet {pet?.name}</Text>


                <Skeleton isLoaded={!isLoading} >
                    {pet &&
                        <Card direction={{ base: 'column', md: 'row' }}
                            overflow='hidden' className='main-font'
                            variant='outline'
                        >

                            <Image objectFit='cover'
                                maxW={{ base: '100%', md: '280px' }}
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
                                        <Text
                                            fontSize={['lg', 'xl', '2xl', '3xl']}
                                            fontWeight='semibold'
                                            className='font-weird'
                                        >
                                            Hi I'm {pet?.name}!
                                        </Text>


                                        <Spacer />
                                        <Tag className='main-font' size={['lg', 'lg', 'lg', 'xl']}
                                             p={3}
                                             fontWeight='semibold' mr={3}
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
                                        Height: {pet.height} cm</Tag>

                                    <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                        <span className="icon-mgR" >
                                            <FontAwesomeIcon icon={faWeightScale} />
                                        </span>

                                        Weight: {pet.weight} kg</Tag>

                                    <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                        <span className="icon-mgR" >
                                            <FontAwesomeIcon icon={faPalette} />                                    </span>

                                        Color: {pet?.color}</Tag>

                                    <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                        <span className="icon-mgR" >
                                            <FontAwesomeIcon icon={faQuestion} />
                                        </span>
                                        Hypoallergnic: {pet?.hypoallergnic === true ? "Yes" : "No"}</Tag>


                                    <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                        <span className="icon-mgR" >
                                            <FontAwesomeIcon icon={faBowlFood} />
                                        </span>
                                        Dietery: {pet?.dietery ? pet?.dietery.join(", ") : "none"}</Tag>

                                    <Tag fontWeight='normal' mt={4} mr={2} size='lg'>
                                        <span className="icon-mgR" >
                                            <FontAwesomeIcon icon={faPen} />
                                        </span>
                                        Bio: {pet?.bio}</Tag>

                                </CardBody>
                                <CardFooter >


                                    <ButtonGroup spacing='2' className='font-weird'>



                                        {!loggedInUser ?

                                            <>

                                                <Button onClick={(e) => { navigate('/login') }}
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
                                                                    colorScheme='gray'
                                                                    leftIcon={<FontAwesomeIcon icon={faFaceFrownOpen} />}
                                                                >
                                                                    Return to Shelter

                                                                </Button>

                                                                \

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
                                                                    colorScheme='gray'
                                                                    leftIcon={<FontAwesomeIcon icon={faFaceFrownOpen} />}
                                                                >
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


                </Skeleton>


                <Button className='font-weird' onClick={(e) => navigate(-1)} color='white'
                    leftIcon={<ArrowBackIcon />} bgColor='red.800' borderBlockEndWidth={4}
                    _hover={{ bgGradient: 'linear(to-r, gray.200, gray.100)', color: 'black' }}
                >
                    Go Back</Button>


            </Stack>

        </div>




    )


}

export default PetPage
