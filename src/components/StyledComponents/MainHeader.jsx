import React from "react";
import { Text } from "@chakra-ui/react";

function MainHeader({ text }) {
  return (
    <Text
      className="main-header"
      mb={3}
      textColor="#8c52fd"
      fontSize={["xl", "2xl", "3xl", "4xl"]}
    >
      {" "}
      {text}
    </Text>
  );
}

export default MainHeader;
