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
  MenuList, InputGroup, Select,
} from "@chakra-ui/react";
import { UsersContextInstance } from "../contex/UsersContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Text, AvatarGroup } from "@chakra-ui/react";
import { AuthContextInstance } from "../contex/AuthContext";
import { Stack, Spacer, Show, Hide } from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faPaw,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png"
import NavbarBuuton from "./StyledComponents/NavbarButton";

function Navbar({ onOpen }) {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContextInstance);
  const { setLoggedInUserID, isAdmin, setIsAdmin } = useContext(
    AuthContextInstance
  );
  const [type, setType] = useState("");

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
        h="10rem"
        wrap="false"
        display="flex"
        justifyContent="center"
        pt={{ base: 4, lg: 10 }}
        pl={{ base: 8, lg: 60 }}
        pr={{ base: 8, lg: 60 }}
        alignItems='center'
      >
          <NavLink to={isAdmin ? "/admin" : "/"}>
            <Box boxSize={{base: '120px', lg:"150px"}} overflow="hidden"  >
            <Image
                objectFit='cover'
                src={logo}
                alt='Pawsitive Adoptions'
            />
            </Box>

            <Text fontWeight="bold" className="mainFont" color="blackAlpha.700">
              <Hide below="2xl">Pawsitive Adoptions</Hide>
            </Text>
          </NavLink>

        <Spacer />

        <Stack
          direction="row"
          alignItems="center"
          spacing={4}
          width={["90%", "80%", "65%", "60%"]}
        >

        </Stack>

        {isAdmin && (
          <NavLink to="/dashboard">
            {({ isActive }) => (
              <>
                <span className={isActive ? "active-page" : "navLink"}>
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
              <span className={isActive ? "active-page" : "navLink"}>
                <FontAwesomeIcon className="icon-nav" icon={faPaw} />
                <Hide below="md">My pets</Hide>
              </span>
            )}
          </NavLink>
        )}

        <Spacer />


          {loggedInUser && (
            <>
              <Stack>
                <Hide below="xl">
                  <NavLink to="/userprofile/edit">
                    <AvatarGroup mr={3} mb={0}>
                      <Avatar bg="gray" src={loggedInUser.picture} />
                    </AvatarGroup>
                  </NavLink>
                </Hide>
              </Stack>

              <Menu>
                {loggedInUser && (
                  <MenuButton
                    size={["sm", "md", "md"]}
                    className="mainFont"
                    as={Button}
                    colorScheme="yellow"
                    color="red.800"
                    rightIcon={<SettingsIcon />}
                  >
                    <Show above="lg"> {loggedInUser.first_name}'s Profile</Show>
                  </MenuButton>
                )}

                <MenuList textColor="red.800" className="mainFont">
                  <MenuGroup title="Profile">
                    <NavLink to="/userprofile/edit">
                      <MenuItem>Edit Profile</MenuItem>
                    </NavLink>

                    <NavLink to="/userprofile/updatepassword">
                      <MenuItem>Update your password</MenuItem>
                    </NavLink>

                    <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Pets">
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
              <NavbarBuuton textIsLoading='blah' text='Login'></NavbarBuuton>

            </NavLink>
              <NavLink onClick={onOpen} to="/signup">
                <NavbarBuuton textIsLoading='blah' text='Sign up'></NavbarBuuton>
              </NavLink>
              </>
          ) : (
            <>
              <Hide below="lg">
                <Button
                  ml={5}
                  className="mainFont"
                  fontSize={["sm", "md", "lg"]}
                  mr={{ base: 1, lg: 2 }}
                  bgGradient="linear(to-r, orange.500, pink.500)"
                  _hover={{
                    bgGradient: "linear(to-r, orange.200, pink.200)",
                  }}
                  onClick={handleSignout}
                >
                  Sign Out
                </Button>
              </Hide>
            </>
          )}
      </Box>
    </>
  );
}

export default Navbar;
