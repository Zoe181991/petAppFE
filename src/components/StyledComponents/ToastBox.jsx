import React from "react";
import { Box } from "@chakra-ui/react";

function ToastBox({ text }) {
  return (
    <Box
      className="font-weird"
      borderRadius={"5px"}
      color="blackAlpha.700"
      p={3}
      bg="gray.200"
    >
      {text}
    </Box>
  );
}

export default ToastBox;
