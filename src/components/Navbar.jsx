import React from 'react'
import { Box, Image, Button, Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList } from '@chakra-ui/react'
import { UsersContextInstance } from '../contex/UsersContext';
import { useEffect, useContext } from 'react'
import { useNavigate, NavLink, } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons'
import { Avatar, Text, AvatarGroup } from '@chakra-ui/react'
import { AuthContextInstance } from '../contex/AuthContext';
import { Stack, Spacer, Show, Hide } from '@chakra-ui/react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeUser, faMagnifyingGlass, faPaw, faGaugeHigh } from '@fortawesome/free-solid-svg-icons'

function Navbar({ onOpen }) {

  const { loggedInUser, setLoggedInUser, } = useContext(UsersContextInstance);
  const { setLoggedInUserID, isAdmin, setIsAdmin } = useContext(AuthContextInstance);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(loggedInUser)
  }, [])


  const handleSignout = async () => {
    //ROUTE TO LOG OUT CLEAR COOKIES RES.CLEAR.COOKIES
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/logout`, { withCredentials: true });
      if (res.data) {
        setLoggedInUser("");
        setLoggedInUserID("")
        setIsAdmin(false)
        localStorage.clear();
        navigate('/');
      }

    } catch (err) {
      console.log(err)
    }

  };

  return (
    <>

      <Box className='navBar' h='20%' wrap='false' display={{ base: 'flex', md: 'flex' }}
        justifyContent='center' pt={{ base: 6, lg: 8 }} pb={{ base: 6, lg: 8 }} color='white' >


        <Stack className='font' direction='row' alignItems='baseline' fontSize={['sm', 'md', 'lg', '3lg']}
          ml={{ base: '1em', sm: '2em', md: '2em', lg: '3em' }}>


          <NavLink to={isAdmin ? '/admin' : '/'}>

            <Image
              className='logo-navbar'
              src="https://res.cloudinary.com/dwhknzktx/image/upload/v1685119482/logoNavBar_ifohh7.png" />

            {/* <Box alignContent='baseline'
            fontSize={['sm', 'md', 'lg', 'xl']}
            ml={{ base: 2, sm: 8, md: 12, lg: 30 }}> */}
            <Text fontWeight='extrabold'
              className='font' color='#f9de10'>
              <Hide below='xl'>
                Pawsitive Adoptions
              </Hide>
            </Text>
          </NavLink>


          <NavLink to={isAdmin ? '/admin' : '/'}>
            {({ isActive }) => (
              <>
                <span className={isActive ? "active-page" : "navLink"}>
                  <FontAwesomeIcon className='icon-nav'
                    icon={faHomeUser} />
                  <Hide below='md'> Home  </Hide>
                </span>

              </>
            )}
          </NavLink>

          <NavLink to='/search'>
            {({ isActive }) => (
              <>
                <span className={isActive ? "active-page" : "navLink"}>
                  <FontAwesomeIcon className='icon-nav' icon={faMagnifyingGlass} />
                  <Hide below='md'>
                    Search
                  </Hide>
                </span>
              </>
            )}
          </NavLink>

          {isAdmin &&
            <NavLink to='/dashboard'>
              {({ isActive }) => (
                <>
                  <span className={isActive ? "active-page" : "navLink"}>
                    <FontAwesomeIcon className='icon-nav' icon={faGaugeHigh} />
                    <Hide below='md'>
                      Dashboard
                    </Hide>
                  </span>
                </>
              )}
            </NavLink>
          }




          {!loggedInUser ?
            <></>
            :
            <NavLink to='/mypets'>
              {({ isActive }) => (

                <span className={isActive ? "active-page" : "navLink"}>
                  <FontAwesomeIcon className='icon-nav' icon={faPaw} />
                  <Hide below='md'>My pets</Hide></span>
              )}
            </NavLink>
          }
          {/* </Box> */}
        </Stack>

        <Spacer />



        <Stack direction='row' justify='right'
          alignItems='center'
          fontSize={['sm', 'sm', 'md', 'md']}
          mr={{ base: "0.5em", md: "1em", lg: "3em" }}>

          {loggedInUser &&
            <>
              <Stack >
                <Hide below='xl'>
                  <NavLink to='/userprofile/edit'>
                    <AvatarGroup mr={3} mb={0}>
                      <Avatar bg='gray' src={loggedInUser.picture} />
                    </AvatarGroup>
                  </NavLink>
                </Hide>
              </Stack>

              <Menu>
                {loggedInUser &&
                  <MenuButton size={['sm', 'md', 'md']} className='font' as={Button}
                    colorScheme='yellow' color='red.800' rightIcon={<SettingsIcon />}>
                    <Show above='lg'> {loggedInUser.first_name}'s Profile</Show>
                  </MenuButton>
                }

                <MenuList textColor='red.800' className='font'>
                  <MenuGroup title='Profile'>
                    <NavLink to='/userprofile/edit'>
                      <MenuItem>Edit Profile</MenuItem>
                    </NavLink>

                    <NavLink to='/userprofile/updatepassword'>
                      <MenuItem>Update your password</MenuItem>
                    </NavLink>


                    <MenuItem onClick={handleSignout}>Sign Out</MenuItem>

                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title='Pets'>
                    <NavLink to='/mypets'>
                      <MenuItem>My Pets </MenuItem>
                    </NavLink>
                    <NavLink to='/search'>
                      <MenuItem>Search for a pet</MenuItem>
                    </NavLink>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </>
          }


          {!loggedInUser ?
            <NavLink onClick={onOpen} to='/login'
            >
              <Button fontSize={['sm', 'md', 'lg', '3xl']}
                className="font" color='#8B0404' ml={3}
                bgGradient='linear(to-r, yellow.300, white)'
                _hover={{
                  bgGradient: 'linear(to-r, yellow.100, white)',
                }}

                onClick={onOpen}>
                Login
              </Button>
            </NavLink>
            :

            <>
              <Hide below='lg'>
                <Button ml={5}
                  className='font'
                  fontSize={['sm', 'md', 'lg']}
                  mr={{ base: 1, lg: 2 }}
                  bgGradient='linear(to-r, orange.500, pink.500)'
                  _hover={{
                    bgGradient: 'linear(to-r, orange.200, pink.200)',
                  }}

                  onClick={handleSignout}>
                  Sign Out
                </Button>
              </Hide>
            </>

          }
        </Stack>
      </Box>
    </>
  )
}

export default Navbar