import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { Card, IconButton, CardHeader, CardBody, CardFooter, Text, SimpleGrid, Stack } from '@chakra-ui/react'
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faHeart, faGear } from '@fortawesome/free-solid-svg-icons'
import CountAnimation from './CountAnimation';
import { ArrowRightIcon } from '@chakra-ui/icons'
import axios from 'axios';
import ButtonStyled2 from "../StyledComponents/ButtonStyled2";
import MainHeader from "../StyledComponents/MainHeader";
import PrivateRouteUser from "./PrivateRouteUser";
import HomeAdmin from "../Admin/HomeAdmin";
import {AuthContextInstance} from "../../contex/AuthContext";


function HomeLoggedIn() {
  const { loggedInUser, isLoading, setIsLoading } = useContext(UsersContextInstance);
  const { isAdmin  } = useContext(AuthContextInstance);

  const navigate = useNavigate();

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
      {
        isAdmin?
            <>
              <PrivateRouteUser>
                <HomeAdmin/>
              </PrivateRouteUser>
            </>
            :
            <div className='main-container'>
              <MainHeader text={`Hello ${loggedInUser?.first_name} ${loggedInUser?.last_name}`}/>
              <Stack width={['100%', '100%', '90%']}>

                <SimpleGrid className='main-font' minChildWidth='220px' spacing='10px'>
                  <NavLink to='/mypets'>
                    <Card bgColor='purple.50' _hover={{
                      bgGradient: 'linear(to-r, orange.200, pink.200)',
                    }}>
                      <CardHeader className='header-card'>
                        <Text fontSize='3xl' className='font-weird'> My Pets
                        </Text>
                        <FontAwesomeIcon size='xl' icon={faHeart}/>
                      </CardHeader>

                      <CardBody>
                        <Text>View a summary of all your pets.

                          <IconButton ml={3} bgColor='#f9de10' icon={<ArrowRightIcon/>} p={2} size='xs'
                                      onClick={(e) => {
                                        navigate('/mypets')
                                      }}></IconButton>

                        </Text>
                        {!isLoading &&
                            <Text fontSize='6xl' fontWeight='extrabold'>
                              <CountAnimation duration={"2000"} targetNumber={countAdopted}>
                              </CountAnimation></Text>}
                        <Text fontSize='xl' color='red.800' className='font-weird'>pets have found a new home!</Text>
                      </CardBody>
                      <CardFooter justify='center'>
                        <ButtonStyled2 text={"View My Pets"} action={() => navigate('/mypets')}/>
                      </CardFooter>
                    </Card>
                  </NavLink>


                  <NavLink to='/search'>
                    <Card bgColor='purple.50' _hover={{
                      bgGradient: 'linear(to-r, orange.200, pink.200)',
                    }}>
                      <CardHeader className='header-card'>
                        <Text fontSize='3xl' className='font-weird'> Adopt a pet!
                        </Text>

                        <FontAwesomeIcon size='xl' icon={faPaw}/>
                      </CardHeader>
                      <CardBody>
                        <Text>Search for your perfect match

                          <IconButton ml={3} bgColor='#f9de10' icon={<ArrowRightIcon/>} p={2} size='xs'
                                      onClick={(e) => {
                                        navigate('/search')
                                      }}></IconButton>


                        </Text>

                        <Text fontSize='6xl' fontWeight='extrabold'>
                          <CountAnimation duration={"2000"} targetNumber={countAvailable}>
                          </CountAnimation></Text>
                        <Text fontSize='xl' color='red.800' className='font-weird'>pets are waiting to find a new
                          home!</Text>


                      </CardBody>
                      <CardFooter justify='center'>
                        <ButtonStyled2 text={"Find your furry friend"} action={(e) => {
                          navigate('/search')
                        }}/>
                      </CardFooter>
                    </Card>
                  </NavLink>


                  <NavLink to='./userprofile/edit'>
                    <Card bgColor='purple.50' _hover={{
                      bgGradient: 'linear(to-r, orange.200, pink.200)',
                    }}>
                      <CardHeader className='header-card'>
                        <Text fontSize='3xl' className='font-weird'> My profile
                        </Text>
                        <FontAwesomeIcon size='xl' icon={faGear}/>
                      </CardHeader>
                      <CardBody>
                        <Text>Set your profile

                          <IconButton ml={3} bgColor='#f9de10' icon={<ArrowRightIcon/>} p={2} size='xs'
                                      onClick={(e) => {
                                        navigate('/userprofile/edit')
                                      }}></IconButton>

                        </Text>

                        <Text fontSize='6xl' fontWeight='extrabold'>
                          <CountAnimation duration={"1000"} targetNumber={countUsers}>
                          </CountAnimation></Text>
                        <Text fontSize='xl' color='red.800' className='font-weird'>people joined Pawsitive
                          Adoptions!</Text>
                      </CardBody>
                      <CardFooter justify='center'>
                        <ButtonStyled2 text={"Edit your profile"} action={(e) => {
                          navigate('/userprofile/edit')
                        }}/>

                      </CardFooter>
                    </Card>
                  </NavLink>
                </SimpleGrid>
              </Stack>
            </div>
      }
      </>
  )
}

export default HomeLoggedIn