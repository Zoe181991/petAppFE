import React from 'react'
import { Card, Spacer, CardHeader, CardBody, CardFooter, Text, Button, SimpleGrid, } from '@chakra-ui/react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Stack, } from '@chakra-ui/react'
import { useEffect, useContext, useState } from 'react';
import { PetsContextInstance } from '../../contex/PetsContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faPenToSquare, } from '@fortawesome/free-solid-svg-icons'
import CountAnimation from '../User/CountAnimation';
import axios from 'axios';

function HomeAdmin() {

  const navigate = useNavigate();

  const { petsList } = useContext(PetsContextInstance);
  const { loggedInUser, isLoading, setIsLoading } = useContext(UsersContextInstance);

  const [countAdopted, setCountAdopted] = useState("")
  const [countUsers, setCountUsers] = useState("")
  const [countAvailable, setCountAvailable] = useState("")

  useEffect(() => {
    fetchAdopted();
    fetchAvailable()
    fetchAllUsers()
  }, [])

  const fetchAdopted = async () => {
    setIsLoading(true)

    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/adopted`, { withCredentials: true });
      setCountAdopted(res.data.length)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const fetchAvailable = async () => {
    setIsLoading(true)

    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/available`, { withCredentials: true });
      setCountAvailable(res.data.length)
      setIsLoading(false)

    } catch (err) {
      console.log(err)
      setIsLoading(false)

    }

  }

  const fetchAllUsers = async () => {
    setIsLoading(true)

    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, { withCredentials: true });
      setCountUsers(res.data.length)
      setIsLoading(false)

    } catch (err) {
      console.log(err)
      setIsLoading(false)

    }

  }



  return (
    <>

      <div className='dashboard-container'>

        <Stack ml="3em">
          <Text className='main-header' mb={3} textColor='red.800'
            fontSize={['3xl', '4xl', '4xl', '5xl']}> Admin HomePage</Text>

          <Text className='font-weird'
            fontSize='xl'
            mb={4}
          >
            Welcome {loggedInUser?.first_name} {loggedInUser?.last_name}
          </Text>

          <Stack width={['100%', '100%', '90%']}>

            <SimpleGrid className='main-font' maxChildHeight='400px' minChildWidth='220px' spacing='10px'
            >
              {/* templateColumns='repeat(auto-fill, minmax(200px, 3fr))'minChildWidth='150px' */}
              <NavLink to='/dashboard'>
                <Card bgColor='purple.50' _hover={{
                  bgGradient: 'linear(to-r, orange.200, pink.200)',
                }} >
                  <CardHeader className='header-card'>
                    <Text fontSize='3xl' className='font-weird'> Edit Pets
                    </Text>

                    <FontAwesomeIcon size='xl' icon={faPenToSquare} />

                  </CardHeader>

                  <CardBody>
                    <Text>View a summary of pets with edit options.


                    </Text>
                    {!isLoading &&
                      <Text fontSize='6xl' fontWeight='extrabold'>
                        <CountAnimation duration={"2000"} targetNumber={countAdopted}>
                        </CountAnimation></Text>}

                    <Text fontSize='xl' color='red.800' className='font-weird'>pets have found a new home!</Text>

                  </CardBody>
                  <CardFooter justify='center'>

                    <Button p={4} className='font-weird' onClick={(e) => { navigate('/dashboard') }} color='red.800' w='10em'
                      size="lg" bgColor='#f9de10' borderBlockEndWidth={4} _hover={{
                        bgGradient: 'linear(to-r, gray.200, gray.100)',
                        color: 'black'
                      }}
                    > View Pets</Button>

                  </CardFooter>
                </Card>
              </NavLink>

              <NavLink to='/admin/addpet'>
                <Card bgColor='purple.50' _hover={{
                  bgGradient: 'linear(to-r, orange.200, pink.200)',
                }} >
                  <CardHeader className='header-card'>
                    <Text fontSize='3xl' className='font-weird'> Add a new pet
                    </Text>
                    <FontAwesomeIcon size='xl' icon={faDog} />


                  </CardHeader>

                  <CardBody>
                    <Text>Add new pets that are waiting for a new home
                    </Text>



                  </CardBody>
                  <CardFooter justify='center'>

                    <Button p={4} className='font-weird' onClick={(e) => { navigate('/admin/addpet') }} color='red.800' w='10em'
                      size="lg" bgColor='#f9de10' borderBlockEndWidth={4} _hover={{
                        bgGradient: 'linear(to-r, gray.200, gray.100)',
                        color: 'black'
                      }}
                    > Add a new pet</Button>

                  </CardFooter>
                </Card>
              </NavLink>





              <NavLink to='/dashboard'>
                <Card bgColor='purple.50' _hover={{
                  bgGradient: 'linear(to-r, orange.200, pink.200)',
                }} >
                  <CardHeader className='header-card'>
                    <Text fontSize='3xl' className='font-weird'> View Users
                    </Text>
                    <FontAwesomeIcon size='xl' icon={faPenToSquare} />
                  </CardHeader>
                  <CardBody>
                    <Text>View users and edit roles
                    </Text>
                    <Text fontSize='6xl' fontWeight='extrabold'>
                      <CountAnimation duration={"1000"} targetNumber={countUsers}>
                      </CountAnimation></Text>
                    <Text fontSize='xl' color='red.800' className='font-weird'>people joined Pawsitive Adoptions!</Text>
                  </CardBody>
                  <CardFooter justify='center'>
                    <Button p={4} className='font-weird'
                      onClick={(e) => { navigate('/dashboard') }} color='red.800' w='10em'
                      size="lg" bgColor='#f9de10' borderBlockEndWidth={4} _hover={{
                        bgGradient: 'linear(to-r, gray.200, gray.100)',
                        color: 'black'
                      }}
                    > Edit users</Button>

                  </CardFooter>
                </Card>
              </NavLink>


            </SimpleGrid>
          </Stack>




        </Stack>
        <Spacer />




      </div>


    </>
  )
}

export default HomeAdmin