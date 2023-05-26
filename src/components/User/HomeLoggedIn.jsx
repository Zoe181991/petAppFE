import React from 'react'
import { useContext } from 'react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { Card, CardHeader, CardBody, CardFooter, Text, Button, Heading, SimpleGrid, GridItem, Grid, Stack } from '@chakra-ui/react'
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContextInstance } from '../../contex/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faShieldDog, faPaw, faWeightScale, faHeart, faGear } from '@fortawesome/free-solid-svg-icons'
import CountAnimation from './CountAnimation';

function HomeLoggedIn() {
  const { loggedInUser, setLoggedInUser, fetchInfo } = useContext(UsersContextInstance);
  const { loggedInUserID, } = useContext(AuthContextInstance);
  const navigate = useNavigate();





  return (
    <div className='main-container'>
 
        <Text className='main-header' mb={3} textColor='red.800'
                    fontSize={['3xl', '4xl', '4xl', '5xl']}>  Hello {loggedInUser?.first_name} {loggedInUser?.last_name}</Text>


      <Stack >
        <SimpleGrid className='font' mt={6} spacing={4} templateColumns='repeat(3, minmax(200px, 3fr))'
        >
          {/* templateColumns='repeat(auto-fill, minmax(200px, 3fr))'minChildWidth='150px' */}
          <NavLink to='/mypets'>
            <Card bgColor='purple.50' _hover={{
              bgGradient: 'linear(to-r, orange.200, pink.200)',
            }} >
              <CardHeader className='header-card'>
                <Heading size='md'> My Pets
                </Heading>
                <FontAwesomeIcon size='xl' icon={faHeart} />
              </CardHeader>

              <CardBody>
                <Text>View a summary of all your pets.</Text>
                <Text fontSize='6xl' fontWeight='extrabold'> 
                <CountAnimation duration={"30000"} targetNumber={"100"}>
</CountAnimation></Text> 

<Text>pets were adopted so far</Text>

               
              
              
              </CardBody>
              <CardFooter justify='center'>
                <Button onClick={(e) => { navigate('/mypets') }}>View here</Button>
              </CardFooter>
            </Card>
          </NavLink>


       


          <NavLink to='/search'>
            <Card bgColor='purple.50' _hover={{
              bgGradient: 'linear(to-r, orange.200, pink.200)',
            }} >

              <CardHeader className='header-card'>
                <Heading size='md'> Adopt a pet!</Heading>

                <FontAwesomeIcon size='xl' icon={faPaw} />
              </CardHeader>
              <CardBody>
                <Text>Search for your perfect match</Text>
                <Text fontSize='6xl' fontWeight='extrabold'> 
                <CountAnimation duration={"30000"} targetNumber={"67"}>
</CountAnimation></Text> 
<Text>pets are waiting to find a new home!</Text>


              </CardBody>
              <CardFooter justify='center'>
                <Button onClick={(e) => { navigate('/search') }} >Find a pet</Button>
              </CardFooter>
            </Card>
          </NavLink>


          <NavLink to='./userprofile/edit'>
            <Card bgColor='purple.50' _hover={{
              bgGradient: 'linear(to-r, orange.200, pink.200)',
            }} >
              <CardHeader className='header-card'>
                <Heading size='md'> My profile</Heading>
                <FontAwesomeIcon size='xl' icon={faGear} />
              </CardHeader>
              <CardBody>
                <Text>Set your profile</Text>

                <Text fontSize='6xl' fontWeight='extrabold'> 
                <CountAnimation duration={"30000"} targetNumber={"4"}>
</CountAnimation></Text> 
<Text>pepole have joined Pawsitive Adoptions so far</Text>
              </CardBody>
              <CardFooter justify='center'>
                <Button onClick={(e) => { navigate('/userprofile/edit') }} >Edit profile</Button>
              </CardFooter>
            </Card>
          </NavLink>


        </SimpleGrid>
      </Stack>
    </div>
  )
}

export default HomeLoggedIn