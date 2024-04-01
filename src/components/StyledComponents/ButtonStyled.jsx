import { Button } from "@chakra-ui/react";

function ButtonStyled({ text, action, isLoading, textIsLoading, icon }) {
  return (
    <>
      <Button
        className="main-font"
        onClick={action}
        color="white"
        widthMatch="true"
        minWidth="10em"
        pr={4}
        pl={4}
        pt={2}
        pb={2}
        leftIcon={icon}
        bgGradient="linear(to-r, pink.400, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, purple.500, purple.500)",
          color: "white",
        }}
        isLoading={isLoading}
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
