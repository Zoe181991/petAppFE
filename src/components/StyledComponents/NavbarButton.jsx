import { Button } from "@chakra-ui/react";

function NavbarButton({ text, action, textIsLoading }) {

  return (
    <>
      <Button
          className="main-font"
          ml="3"
          pr={2}
          pl={2}
          size={["sm", "sm", "md", "md"]}
          matchWidth={true}
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

export default NavbarButton;
