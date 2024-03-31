import React from "react";
import {
  Box,
  Image,
  Button,
  Menu,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuButton,
  MenuList, Text
} from "@chakra-ui/react";
import { UsersContextInstance } from "../contex/UsersContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { AuthContextInstance } from "../contex/AuthContext";
import { Stack, Spacer, Show, Hide } from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faPaw,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png"
import NavbarButton from "./StyledComponents/NavbarButton";

function Navbar({ onOpen }) {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContextInstance);
  const { setLoggedInUserID, isAdmin, setIsAdmin } = useContext(
    AuthContextInstance
  );

  const navigate = useNavigate();
  useEffect(() => {
    console.log(loggedInUser);
  }, []);


  const handleSignout = async () => {
    //ROUTE TO LOG OUT CLEAR COOKIES RES.CLEAR.COOKIES
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/logout`,
        { withCredentials: true }
      );
      if (res.data) {
        setLoggedInUser("");
        setLoggedInUserID("");
        setIsAdmin(false);
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        color="white"
        w="100%"
        h="20vh"
        wrap="false"
        display="flex"
        justifyContent="center"
        pt={{ base: 4, lg: 10 }}
        pl={{ base: 8, lg: 40 }}
        pr={{ base: 8, lg: 40 }}
        alignItems='center'
      >

        <Stack
            display='flex'
            direction="row"
            spacing={4}
            alignItems="center"
            width={["90%", "80%", "65%", "60%"]}
        >
          <NavLink to={isAdmin ? "/admin" : "/"}>
            <Box  boxSize={{base: '120px', lg:"180px"}} overflow="hidden"  >
            <Image
                objectFit='cover'
                src={logo}
                alt='Pawsitive Adoptions'
            />            </Box>



          </NavLink>
          <Stack  direction='row'>
            {isAdmin && (
                <NavLink to="/dashboard">
                  {({ isActive }) => (
                      <>
                <span className={isActive ? "active-page" : "nav-link"}>
                  <FontAwesomeIcon className="icon-nav" icon={faGaugeHigh} />
                  <Hide below="md">Dashboard</Hide>
                </span>
                      </>
                  )}
                </NavLink>
            )}
            {loggedInUser && (
                <NavLink to="/mypets">
                  {({ isActive }) => (
                      <span className={isActive ? "active-page" : "nav-link"}>
                <FontAwesomeIcon className="icon-nav" icon={faPaw} />
                <Hide below="md">My pets</Hide>
              </span>
                  )}
                </NavLink>
            )}
          </Stack>
        </Stack>










        <Spacer />


          {loggedInUser && (
            <>

              <Menu>
                {loggedInUser && (
                    <>
                  <MenuButton
                    className="main-font"
                    as={Button}
                    pr={4}
                    pl={4}
                    pt={2}
                    pb={2}
                    color="blackAlpha.700"
                    bgColor="blackAlpha.200"
                    matchWidth={true}
                    matchHeight={true}
                    rightIcon={<SettingsIcon />}
                  >
                    <Stack direction="row" verticalAlign={true} spacing={2}>
                    <Show above="lg"> <Text fontSize="sm">{loggedInUser.first_name}'s Profile</Text> </Show>
                      <Hide above="lg">                     <Avatar mr={2} bg="gray" size='sm' src={loggedInUser.picture} />
                      </Hide>

                    </Stack>
                  </MenuButton>
                    </>
                )}

                <MenuList textColor="blackAlpha.700" className="main-font">
                  <MenuGroup color="#d700d3" title="Profile">
                    <NavLink to="/userprofile/edit">
                      <MenuItem>Edit Profile</MenuItem>
                    </NavLink>

                    <NavLink to="/userprofile/updatepassword">
                      <MenuItem>Update your password</MenuItem>
                    </NavLink>

                    <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup color="#d700d3" title="Pets">
                    <NavLink to="/mypets">
                      <MenuItem>My Pets </MenuItem>
                    </NavLink>
                    <NavLink to="/search">
                      <MenuItem>Search for a pet</MenuItem>
                    </NavLink>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </>
          )}

          {!loggedInUser ? (
              <>
            <NavLink onClick={onOpen} to="/login">
              <NavbarButton textIsLoading='blah' text='Login'></NavbarButton>

            </NavLink>
              <NavLink onClick={onOpen} to="/signup">
                <NavbarButton textIsLoading='' text='Sign up'></NavbarButton>
              </NavLink>
              </>
          ) : (
            <>
              <Hide below="lg">
                <NavbarButton action={handleSignout} text={"Sign Out"}></NavbarButton>
              </Hide>
            </>
          )}
      </Box>
    </>
  );
}

export default Navbar;
