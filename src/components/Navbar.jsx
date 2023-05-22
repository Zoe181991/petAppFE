import React from 'react'
import { Box, Button, SimpleGrid, ButtonGroup, Menu, MenuItem, MenuGroup, MenuDivider, MenuButton, MenuList } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { UsersContextInstance } from '../contex/UsersContext';
import { useEffect, useContext } from 'react'
import { useNavigate, NavLink, } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons'
import { Avatar, AvatarGroup } from '@chakra-ui/react'
import { AuthContextInstance } from '../contex/AuthContext';
import { Flex, Stack, Spacer, Show, Hide } from '@chakra-ui/react'
import axios from 'axios';


function Navbar({ onOpen }) {

  const { loggedInUser, setLoggedInUser, fetchInfo } = useContext(UsersContextInstance);
  const { setLoggedInUserID, loggedInUserID, isAdmin } = useContext(AuthContextInstance);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(loggedInUser)
  }, [])


  const handleSignout = async () => {
    //ROUTE TO LOG OUT CLEAR COOKIES RES.CLEAR.COOKIES
    try {
      const res = await axios.get(`http://localhost:8080/users/logout`, { withCredentials: true });
      if (res.data) {
        setLoggedInUser("");
        setLoggedInUserID("")
        localStorage.clear();
        navigate('/');
      }

    } catch (err) {
      console.log(err)
    }

  };

  return (
    <>
        <Box bg='#EDF2F7'  h='20%' width={['100%', '100%', '100%']} 
        wrap='false'
        align='center'
          display={{ base: 'flex', md: 'flex' }}
          // pr={{ base:6, md: 15}} pl={{ base: 6, md: 15 }}
          pt={{ base: 6,  lg: 8 }} pb={{ base: 6, lg: 8}}

          color='white' alignItems='center'>
          {/* <nav className='NavContainer'> */}
          <Box
            fontSize={['sm', 'md', 'lg', 'lg']}
            ml={{base: 2, sm: 2, md: 12, lg: 30}}
          >
            <NavLink to={isAdmin ? '/admin' : '/'}>
              {({ isActive }) => (
                <span className={isActive ? "active-page" : "navLink"}>Home</span>
              )}
            </NavLink>

            <NavLink to='/search'>
              {({ isActive }) => (
                <span className={isActive ? "active-page" : "navLink"}>Search</span>
              )}
            </NavLink>
            {!loggedInUser ?
              <></>
              :
              <NavLink to='/mypets'>
                {({ isActive }) => (
                  <span className={isActive ? "active-page" : "navLink"}>My pets</span>
                )}
              </NavLink>
            }
          </Box>

          <Spacer />
          {/* <Box w='30%'>
            <Input variant='filled' bg='white' placeholder='Search for your new best friend...' />
          </Box> */}



          <Stack direction='row' justify='right' align='center'
            fontSize={['sm', 'sm', 'md', 'md']}
            mr={{base: 5, md: 15, lg: 30}}

            >


            {!loggedInUser ?
              <></>
              :
              <>
                <NavLink to='/userprofile/edit'
                  >
                  <AvatarGroup >
                    <Avatar bg='#553C9A' src={loggedInUser.picture} />
                  </AvatarGroup>
                </NavLink>

                <Menu className='font'
                
                >
                  {loggedInUser &&
                    <MenuButton as={Button} color='black' colorScheme='gray' rightIcon={<SettingsIcon />}>
                      <Show above='md'> {loggedInUser.first_name}'s Profile</Show>
                    </MenuButton>
                  }

                  <MenuList color='black'>
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
              fontSize={['sm', 'md', 'lg', 'xl']}>
                <Button ml={3} bgGradient='linear(to-r, teal.500, purple.500)'
                  _hover={{
                    bgGradient: 'linear(to-r, teal.200, purple.200)',
                  }}

                  onClick={onOpen}>
                  <span>Login</span>
                </Button>
              </NavLink>
              :

              <>
                <Hide below='lg'>

                  <Button 
                  size='sm'
                  mr={{base: 1, lg:2}} ml={{base: 1, lg:2}}
                  bgGradient='linear(to-r, orange.500, pink.500)'
                  _hover={{
                    bgGradient: 'linear(to-r, orange.200, pink.200)',
                  }}

                  onClick={handleSignout}>
                  <span>Sign Out</span>
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