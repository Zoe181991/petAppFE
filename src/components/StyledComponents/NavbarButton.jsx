import { Button } from "@chakra-ui/react";

function NavbarBuuton({ text, action, textIsLoading }) {

  return (
    <>
      <Button
          fontSize={["sm", "sm", "md", "lg"]}
          className="main-font"
          ml="2"
          color="blackAlpha.700"
          colorScheme="purple"
          _hover={{
              bgGradient: "linear(to-r, pink.400, purple.500)",
              color: "white",
          }}

        onClick={action}
        loadingText={textIsLoading ? textIsLoading : "Loading"}
        variant="ghost"
        spinnerPlacement="start"
      >
        {text}
      </Button>
    </>
  );
}

export default NavbarBuuton;
