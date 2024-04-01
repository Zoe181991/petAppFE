import React, { useContext } from "react";
import { Box, Image, Stack } from "@chakra-ui/react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import { AuthContextInstance } from "../contex/AuthContext";

function Footer() {
  const { isAdmin } = useContext(AuthContextInstance);

  return (
    <>
      <Box
        alignItems="center"
        bgColor="#8c52fd"
        w="100%"
        h="8em"
        display="flex"
        justifyContent="center"
        color={"white"}
        className="main-font"
        pt="2"
        pb="6"
      >
        <Stack display="flex" direction="column" alignItems="center">
          <NavLink to={isAdmin ? "/admin" : "/"}>
            <Image
              objectFit="cover"
              w="100px"
              src={logo}
              alt="Pawsitive Adoptions"
            />
          </NavLink>
          <Box
            className="main-font"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            mb="0"
          >
            © Copyright 2023 by Zoe Barkan
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default Footer;
