import React from "react";
import {
    Box, Flex, Image, Stack, Text
} from "@chakra-ui/react";
import logo from "../images/logo.png"


function Footer() {


  return (
    <>
      <Box
          alignItems='center'
          bgColor="#8c52fd"
          w="100%"
          h="12rem"
          display="inline-flex"
          justifyContent="center"
          color={"white"}
          className='main-font' pt="4" pb="6"
      >
          <Stack display="flex" direction="column" alignItems="center"  >
              <Image
                  objectFit='cover'
                  w="150px"
                  src={logo}
                  alt='Pawsitive Adoptions'
              />
          <Box
              className="main-font"
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
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
