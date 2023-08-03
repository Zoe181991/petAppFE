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
  MenuList,
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
  faHomeUser,
  faMagnifyingGlass,
  faPaw,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import ButtonStyled from "./StyledComponents/ButtonStyled";

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

  // async function getPetbyType(e) {
  //   try {
  //     setLoading(true)
  //     const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/search/${type}`, { withCredentials: true });
  //     setPetsList(res.data)
  //     setNumResultsS(res.data.length)
  //     setLoading(false)

  //   } catch (err) {
  //     console.log(err)
  //     setErrorMsgClient(err)
  //     setLoading(false)
  //   }

  // }

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
        className="navBar"
        h={"-webkit-fit-content"}
        wrap="false"
        display={{ base: "flex", md: "flex" }}
        justifyContent="center"
        pt={{ base: 6, lg: 8 }}
        pb={{ base: 6, lg: 8 }}
        color="white"
      >
        <Stack mr="5" ml={{ base: "0.5em", md: "2em", lg: "10em" }}>
          <NavLink to={isAdmin ? "/admin" : "/"}>
            <div className="dog-logo"></div>
            <Text fontWeight="bold" className="font" color="blackAlpha.700">
              <Hide below="2xl">Pawsitive Adoptions</Hide>
            </Text>
          </NavLink>
        </Stack>

        <Spacer />

        <Stack
          direction="row"
          alignItems="center"
          spacing={4}
          width={["90%", "80%", "65%", "60%"]}
        >
          {" "}
          <NavLink to={isAdmin ? "/admin" : "/"}>
            {({ isActive }) => (
              <>
                <span className={isActive ? "active-page" : "navLink"}>
                  <FontAwesomeIcon className="icon-nav" icon={faHomeUser} />
                  <Hide below="md"> Home </Hide>
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/search">
            {({ isActive }) => (
              <>
                <span className={isActive ? "active-page" : "navLink"}>
                  <FontAwesomeIcon
                    className="icon-nav"
                    icon={faMagnifyingGlass}
                  />
                  <Hide below="md">Search</Hide>
                </span>
              </>
            )}
          </NavLink>
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

        <Stack
          direction="row"
          justify="right"
          alignItems="center"
          fontSize={["sm", "sm", "md", "md"]}
          mr={{ base: "0.5em", md: "2em", lg: "10em" }}
        >
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
                    className="font"
                    as={Button}
                    colorScheme="yellow"
                    color="red.800"
                    rightIcon={<SettingsIcon />}
                  >
                    <Show above="lg"> {loggedInUser.first_name}'s Profile</Show>
                  </MenuButton>
                )}

                <MenuList textColor="red.800" className="font">
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
            <NavLink onClick={onOpen} to="/login">
              <Button
                fontSize={["sm", "md", "lg", "2xl"]}
                className="font-weird"
                ml="5"
                color="white"
                colorScheme="purple"
                bgGradient="linear(to-r, pink.400, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, white, white)",
                  color: "purple.500",
                }}
                onClick={onOpen}
              >
                Login
              </Button>
            </NavLink>
          ) : (
            <>
              <Hide below="lg">
                <Button
                  ml={5}
                  className="font"
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
        </Stack>
      </Box>
    </>
  );
}

export default Navbar;
