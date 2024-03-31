import { Button } from "@chakra-ui/react";

function ButtonStyled({ text, action, textIsLoading }) {

  return (
    <>
      <Button
        className="main-font"
        onClick={action}
        color="white"
        w="10em"
        size="md"

        bgGradient= "linear(to-r, pink.400, purple.500)"
        _hover={{
            bgGradient: "linear(to-r, purple.500, purple.500)",
            color: "white",
        }}
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
