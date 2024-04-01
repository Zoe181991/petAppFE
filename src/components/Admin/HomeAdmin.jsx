import React from 'react'
import { Card, Spacer, CardHeader, CardBody, CardFooter, Text, Button, SimpleGrid, } from '@chakra-ui/react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Stack, } from '@chakra-ui/react'
import { useEffect, useContext, useState } from 'react';
import { UsersContextInstance } from '../../contex/UsersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faPenToSquare, } from '@fortawesome/free-solid-svg-icons'
import CountAnimation from '../User/CountAnimation';
import axios from 'axios';
import MainHeader from "../StyledComponents/MainHeader";
import ButtonStyled2 from "../StyledComponents/ButtonStyled2";
import DashboardCard from "../StyledComponents/DashboardCard";

function HomeAdmin() {

  const navigate = useNavigate();

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

        <div className='main-container'>
          <MainHeader text={"Admin Home Page"} />
          <Text fontSize='xl' className='font-weird' mb={5}>
            Welcome {loggedInUser?.first_name} {loggedInUser?.last_name}
          </Text>
          <Stack width={['100%', '100%', '90%']}>
            <SimpleGrid className='main-font' maxChildHeight='400px' minChildWidth='220px' spacing='10px'
            >
              <NavLink to='/admin/dashboard'>
                    <DashboardCard isLoading={isLoading} header={"Edit Pets"} icon={faDog} description={"View a summary of pets with edit options."} targetNumber={countAdopted} boldStatement={"pets have found a new home!"} buttonText={"View Pets"} buttonAction={()=>navigate('/admin/dashboard')} />
              </NavLink>

              <NavLink to='/admin/dashboard/#users'>
                <DashboardCard isLoading={isLoading} header={"View Users"} icon={faPenToSquare} description={"View users and edit roles"} targetNumber={countUsers} boldStatement={"people joined Pawsitive Adoptions!"} buttonText={"Edit users"} buttonAction={()=>navigate('/admin/dashboard')} />
              </NavLink>

              <NavLink to='/admin/addpet'>
                <DashboardCard isLoading={isLoading} header={"Add a new pet"} icon={faDog}  description={"Add new pets that are waiting for a new home"} buttonText={"Add a new pet"} buttonAction={()=>navigate('/admin/addpet')} />
              </NavLink>


            </SimpleGrid>
          </Stack>

        <Spacer />

      </div>


    </>
  )
}

export default HomeAdmin