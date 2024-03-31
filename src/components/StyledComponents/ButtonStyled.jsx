import { Button } from "@chakra-ui/react";

function ButtonStyled({ text, action, isLoading, textIsLoading}) {

  return (
    <>
      <Button
        className="main-font"
        onClick={action}
        color="white"
        widthMatch="true"
        size="md"
        pr={4}
        pl={4}
        pt={2}
        pb={2}
        bgGradient= "linear(to-r, pink.400, purple.500)"
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
