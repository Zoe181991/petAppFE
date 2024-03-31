import { Button } from "@chakra-ui/react";
import { UsersContextInstance } from "../../contex/UsersContext";
import { useContext } from "react";

function ButtonStyled({ text, action, textIsLoading }) {

  return (
    <>
      <Button
        className="main-font"
        onClick={action}
        color="white"
        w="10em"
        size="md"
        bgColor="#733e87"
        // bgGradient= 'linear(to-r, gray.200, purple.400)'

        _hover={{
          bgGradient: "linear(to-r, gray.200, purple.300)",
          color: "#733e87",
        }}
        // isLoading={isLoading}
        loadingText={textIsLoading ? textIsLoading : "Loading"}
        colorScheme="purple"
        variant="ghost"
        spinnerPlacement="start"
      >
        {text}
      </Button>
    </>
  );
}

export default ButtonStyled;
